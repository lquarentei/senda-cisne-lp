import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Upload, Link2, Image, FileImage, LogOut, AlertCircle, Check, X, Eye, EyeOff, Trash2, History, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

// Verificar se as variáveis de ambiente estão configuradas
const hasSupabaseConfig = projectId && publicAnonKey;
const API_BASE_URL = hasSupabaseConfig ? `https://${projectId}.supabase.co/functions/v1/make-server-a977770f` : '';

// Tipos
interface SiteImage {
  id: string;
  image_key: string;
  image_type: string;
  url: string;
  is_active: boolean;
  created_at: string;
  storage_path: string;
}

interface SiteLink {
  id: string;
  link_key: string;
  url: string;
  label: string;
  open_in_new_tab: boolean;
  is_active: boolean;
  updated_at: string;
}

interface AuditLog {
  id: string;
  action: string;
  resource_type: string;
  created_at: string;
  details: any;
}

export const AdminPanel = () => {
  // Se não houver configuração do Supabase, mostrar mensagem de erro
  if (!hasSupabaseConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full p-8">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              Configuração Pendente
            </h1>
            <div className="text-left bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
              <p className="text-neutral-700 mb-4">
                As variáveis de ambiente do Supabase não estão configuradas.
              </p>
              <p className="font-mono text-sm text-neutral-600 mb-2">
                VITE_SUPABASE_PROJECT_ID: {projectId || '❌ não configurado'}
              </p>
              <p className="font-mono text-sm text-neutral-600">
                VITE_SUPABASE_ANON_KEY: {publicAnonKey ? '✅ configurado' : '❌ não configurado'}
              </p>
            </div>
            <div className="text-left space-y-4">
              <h2 className="font-semibold text-neutral-900">📋 Como configurar:</h2>
              
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-medium mb-2">🏠 Desenvolvimento Local:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-600">
                  <li>Crie um arquivo <code className="bg-neutral-100 px-2 py-1 rounded">.env.local</code> na raiz do projeto</li>
                  <li>Adicione as variáveis:</li>
                </ol>
                <pre className="bg-neutral-900 text-green-400 p-3 rounded mt-2 text-xs overflow-x-auto">
{`VITE_SUPABASE_PROJECT_ID=seu-project-id
VITE_SUPABASE_ANON_KEY=sua-anon-key`}
                </pre>
                <li className="text-sm text-neutral-600 mt-2">Reinicie o servidor (<code className="bg-neutral-100 px-2 py-1 rounded">npm run dev</code>)</li>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-medium mb-2">🚀 Produção (Netlify):</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-600">
                  <li>Acesse: Site settings → Environment variables</li>
                  <li>Adicione as mesmas variáveis</li>
                  <li>Faça um novo deploy</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  📖 Ver guia completo: <strong>NETLIFY_ENV_VARS.md</strong> ou <strong>START_HERE.md</strong>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // States para dados
  const [images, setImages] = useState<SiteImage[]>([]);
  const [links, setLinks] = useState<SiteLink[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Supabase client
  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );

  // Verificar sessão ao carregar
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session?.access_token) {
        setAccessToken(session.access_token);
        setIsAuthenticated(true);
        loadData(session.access_token);
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (session?.access_token) {
        setAccessToken(session.access_token);
        setIsAuthenticated(true);
        loadData(session.access_token);
      }
    } catch (error: any) {
      setLoginError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setAccessToken(null);
    setEmail('');
    setPassword('');
  };

  const loadData = async (token: string) => {
    await Promise.all([
      loadImages(token),
      loadLinks(token),
      loadAuditLogs(token),
    ]);
  };

  const loadImages = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/images`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }
  };

  const loadLinks = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/links`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setLinks(data.links || []);
      }
    } catch (error) {
      console.error('Erro ao carregar links:', error);
    }
  };

  const loadAuditLogs = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/audit-logs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setAuditLogs(data.logs || []);
      }
    } catch (error) {
      console.error('Erro ao carregar logs:', error);
    }
  };

  const handleImageUpload = async (imageType: string, imageKey: string, file: File) => {
    if (!accessToken) return;

    try {
      // Converter para base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64 = reader.result as string;

        const response = await fetch(`${API_BASE_URL}/admin/images/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageType,
            imageKey,
            file: base64,
            fileName: file.name,
          }),
        });

        const data = await response.json();

        if (data.success) {
          showNotification('success', 'Imagem enviada com sucesso!');
          loadImages(accessToken);
        } else {
          showNotification('error', data.error || 'Erro ao enviar imagem');
        }
      };
    } catch (error) {
      showNotification('error', 'Erro ao processar imagem');
    }
  };

  const toggleImageActive = async (imageId: string, currentStatus: boolean) => {
    if (!accessToken) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin/images/${imageId}/toggle`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      const data = await response.json();

      if (data.success) {
        showNotification('success', 'Status da imagem atualizado!');
        loadImages(accessToken);
      }
    } catch (error) {
      showNotification('error', 'Erro ao atualizar imagem');
    }
  };

  const deleteImage = async (imageId: string) => {
    if (!accessToken || !confirm('Tem certeza que deseja deletar esta imagem?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        showNotification('success', 'Imagem deletada com sucesso!');
        loadImages(accessToken);
      }
    } catch (error) {
      showNotification('error', 'Erro ao deletar imagem');
    }
  };

  const updateLink = async (linkId: string, updates: Partial<SiteLink>) => {
    if (!accessToken) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin/links/${linkId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (data.success) {
        showNotification('success', 'Link atualizado com sucesso!');
        loadLinks(accessToken);
      } else {
        showNotification('error', data.error || 'Erro ao atualizar link');
      }
    } catch (error) {
      showNotification('error', 'Erro ao atualizar link');
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-rose-500" />
            </div>
            <h1 className="text-3xl font-serif text-neutral-900 mb-2">Admin Panel</h1>
            <p className="text-neutral-600">Senda do Cisne</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pattydomingues.com"
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-2"
              />
            </div>

            {loginError && (
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Autenticando...' : 'Entrar'}
            </Button>
          </form>

          <p className="text-xs text-neutral-500 text-center mt-6">
            Acesso restrito apenas para administradores
          </p>
        </Card>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif text-neutral-900">Painel Administrativo</h1>
            <p className="text-sm text-neutral-600">Senda do Cisne</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Notifications */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top">
          <Alert variant={notification.type === 'success' ? 'default' : 'destructive'} className="bg-white shadow-lg">
            {notification.type === 'success' ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="images" className="gap-2">
              <Image className="w-4 h-4" />
              Imagens
            </TabsTrigger>
            <TabsTrigger value="links" className="gap-2">
              <Link2 className="w-4 h-4" />
              Links
            </TabsTrigger>
            <TabsTrigger value="logs" className="gap-2">
              <History className="w-4 h-4" />
              Logs
            </TabsTrigger>
          </TabsList>

          {/* IMAGES TAB */}
          <TabsContent value="images">
            <ImageManager
              images={images}
              onUpload={handleImageUpload}
              onToggle={toggleImageActive}
              onDelete={deleteImage}
            />
          </TabsContent>

          {/* LINKS TAB */}
          <TabsContent value="links">
            <LinkManager links={links} onUpdate={updateLink} />
          </TabsContent>

          {/* AUDIT LOGS TAB */}
          <TabsContent value="logs">
            <AuditLogsView logs={auditLogs} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// ==================================
// IMAGE MANAGER COMPONENT
// ==================================
interface ImageManagerProps {
  images: SiteImage[];
  onUpload: (imageType: string, imageKey: string, file: File) => void;
  onToggle: (imageId: string, currentStatus: boolean) => void;
  onDelete: (imageId: string) => void;
}

const ImageManager: React.FC<ImageManagerProps> = ({ images, onUpload, onToggle, onDelete }) => {
  const [uploadType, setUploadType] = useState('hero');
  const [uploadKey, setUploadKey] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile && uploadKey) {
      onUpload(uploadType, uploadKey, selectedFile);
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadKey('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <Card className="p-6">
        <h3 className="text-xl font-serif text-neutral-900 mb-6">Upload de Nova Imagem</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageType">Tipo de Imagem</Label>
              <select
                id="imageType"
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-neutral-300 rounded-md"
              >
                <option value="hero">Hero / Banner Principal</option>
                <option value="section">Imagem de Seção</option>
                <option value="logo">Logo</option>
                <option value="favicon">Favicon</option>
              </select>
            </div>

            <div>
              <Label htmlFor="imageKey">Identificador (Chave)</Label>
              <Input
                id="imageKey"
                value={uploadKey}
                onChange={(e) => setUploadKey(e.target.value)}
                placeholder="ex: hero_main, logo_header"
                className="mt-2"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Nome único para identificar esta imagem no código
              </p>
            </div>

            <div>
              <Label htmlFor="fileInput">Arquivo</Label>
              <Input
                id="fileInput"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleFileSelect}
                className="mt-2"
              />
            </div>

            <Button onClick={handleUpload} disabled={!selectedFile || !uploadKey} className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Enviar Imagem
            </Button>
          </div>

          <div>
            <Label>Preview</Label>
            <div className="mt-2 aspect-video bg-neutral-100 rounded-lg flex items-center justify-center border border-neutral-200">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <FileImage className="w-16 h-16 text-neutral-300" />
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Images List */}
      <div>
        <h3 className="text-xl font-serif text-neutral-900 mb-4">Imagens Cadastradas</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="p-4 relative">
              <div className="aspect-video bg-neutral-100 rounded-md mb-4 overflow-hidden">
                <img src={image.url} alt={image.image_key} className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-900">{image.image_key}</span>
                  <span className="text-xs px-2 py-1 bg-neutral-100 rounded">{image.image_type}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={image.is_active}
                      onCheckedChange={() => onToggle(image.id, image.is_active)}
                    />
                    <span className="text-xs text-neutral-600">
                      {image.is_active ? 'Ativa' : 'Inativa'}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(image.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-xs text-neutral-500">
                  {new Date(image.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================================
// LINK MANAGER COMPONENT
// ==================================
interface LinkManagerProps {
  links: SiteLink[];
  onUpdate: (linkId: string, updates: Partial<SiteLink>) => void;
}

const LinkManager: React.FC<LinkManagerProps> = ({ links, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<SiteLink>>({});

  const startEdit = (link: SiteLink) => {
    setEditingId(link.id);
    setEditData({
      url: link.url,
      label: link.label,
      open_in_new_tab: link.open_in_new_tab,
      is_active: link.is_active,
    });
  };

  const saveEdit = (linkId: string) => {
    onUpdate(linkId, editData);
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-xl font-serif text-neutral-900 mb-6">Gerenciar Links dos Botões</h3>
        
        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="p-4 border border-neutral-200 rounded-lg">
              {editingId === link.id ? (
                <div className="space-y-4">
                  <div>
                    <Label>Identificador</Label>
                    <Input value={link.link_key} disabled className="mt-2 bg-neutral-50" />
                  </div>

                  <div>
                    <Label>URL</Label>
                    <Input
                      value={editData.url || ''}
                      onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Texto do Botão</Label>
                    <Input
                      value={editData.label || ''}
                      onChange={(e) => setEditData({ ...editData, label: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={editData.open_in_new_tab || false}
                        onCheckedChange={(checked) => setEditData({ ...editData, open_in_new_tab: checked })}
                      />
                      <Label>Abrir em nova aba</Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch
                        checked={editData.is_active ?? true}
                        onCheckedChange={(checked) => setEditData({ ...editData, is_active: checked })}
                      />
                      <Label>Ativo</Label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => saveEdit(link.id)} size="sm">
                      <Check className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                    <Button onClick={() => setEditingId(null)} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium text-neutral-900">{link.link_key}</span>
                      <span className={`ml-2 text-xs px-2 py-1 rounded ${link.is_active ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-600'}`}>
                        {link.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <Button onClick={() => startEdit(link)} variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                  <p className="text-sm text-neutral-600 mb-1">{link.label}</p>
                  <p className="text-xs text-neutral-500 font-mono break-all">{link.url}</p>
                  {link.open_in_new_tab && (
                    <span className="text-xs text-neutral-400 mt-1 block">↗ Abre em nova aba</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ==================================
// AUDIT LOGS COMPONENT
// ==================================
interface AuditLogsViewProps {
  logs: AuditLog[];
}

const AuditLogsView: React.FC<AuditLogsViewProps> = ({ logs }) => {
  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      upload_image: 'Upload de Imagem',
      delete_image: 'Deletar Imagem',
      activate_image: 'Ativar Imagem',
      deactivate_image: 'Desativar Imagem',
      create_link: 'Criar Link',
      update_link: 'Atualizar Link',
      delete_link: 'Deletar Link',
    };
    return labels[action] || action;
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-serif text-neutral-900 mb-6">Histórico de Alterações</h3>
      
      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="p-4 bg-neutral-50 rounded-lg border border-neutral-100">
            <div className="flex items-start justify-between mb-2">
              <span className="font-medium text-neutral-900">{getActionLabel(log.action)}</span>
              <span className="text-xs text-neutral-500">
                {new Date(log.created_at).toLocaleString('pt-BR')}
              </span>
            </div>
            <p className="text-sm text-neutral-600">
              Recurso: <span className="font-mono text-xs">{log.resource_type}</span>
            </p>
            {log.details && Object.keys(log.details).length > 0 && (
              <details className="mt-2">
                <summary className="text-xs text-neutral-500 cursor-pointer hover:text-neutral-700">
                  Ver detalhes
                </summary>
                <pre className="text-xs bg-white p-2 rounded mt-2 overflow-auto">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};