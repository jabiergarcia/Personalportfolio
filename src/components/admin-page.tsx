import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft, Mail, User, Calendar, MessageSquare, RefreshCw, BarChart3, Eye, MousePointer, Download, Trash2, Database } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { ScrollReveal } from './scroll-reveal';
import { StaggerContainer, StaggerItem, staggerItemVariants } from './stagger-container';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: string;
}

interface AnalyticsSummary {
  totalEvents: number;
  uniqueSessions: number;
  pageViews: number;
  projectViews: number;
  contactOpens: number;
  cvDownloads: number;
  popularPages: [string, number][];
  popularProjects: [string, number][];
  recentEvents: any[];
}

interface AdminPageProps {
  onNavigateHome: () => void;
}

export function AdminPage({ onNavigateHome }: AdminPageProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [activeTab, setActiveTab] = useState<'messages' | 'analytics'>('messages');
  const [isResetting, setIsResetting] = useState(false);
  const [isSettingUpStorage, setIsSettingUpStorage] = useState(false);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-df6fcedb/contacts`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener los mensajes');
      }

      const data = await response.json();
      const sortedMessages = data.contacts.sort((a: ContactMessage, b: ContactMessage) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setMessages(sortedMessages);
    } catch (error) {
      toast.error('Error al cargar los mensajes');
    }
  };

  const fetchAnalytics = async () => {
    try {
      console.log('📊 [Admin] Fetching analytics from server...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-df6fcedb/analytics`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [Admin] Failed to fetch analytics:', response.status, errorText);
        toast.error('Error al cargar analytics');
        return;
      }

      const data = await response.json();
      console.log('✅ [Admin] Analytics data received:', data.summary);
      setAnalytics(data.summary);
    } catch (error) {
      console.error('❌ [Admin] Error loading analytics:', error);
      toast.error('Error al cargar analytics');
    }
  };

  const resetAnalytics = async () => {
    if (!confirm('⚠️ ¿Estás seguro de que quieres resetear TODAS las métricas de analytics a 0? Esta acción no se puede deshacer.')) {
      return;
    }

    setIsResetting(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-df6fcedb/analytics/clear-all`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error al resetear analytics');
      }

      const data = await response.json();
      toast.success(`✅ ${data.message} (${data.clearedCount} eventos eliminados)`);
      
      // Resetear el estado de analytics localmente para mostrar 0s inmediatamente
      setAnalytics({
        totalEvents: 0,
        uniqueSessions: 0,
        pageViews: 0,
        projectViews: 0,
        contactOpens: 0,
        cvDownloads: 0,
        popularPages: [],
        popularProjects: [],
        recentEvents: []
      });
      
      toast.info('💡 Tip: Sal del panel y evita navegar para mantener las métricas en 0', { duration: 5000 });
    } catch (error) {
      console.error('Error al resetear analytics:', error);
      toast.error('Error al resetear las métricas de analytics');
    } finally {
      setIsResetting(false);
    }
  };

  const setupStorage = async () => {
    setIsSettingUpStorage(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-df6fcedb/setup-storage`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al configurar storage');
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success(`✅ ${data.message}`);
        toast.info(`📦 Bucket creado: ${data.bucketName} (Público: ${data.isPublic ? 'Sí' : 'No'})`, { duration: 6000 });
        if (data.note) {
          toast.info(`💡 ${data.note}`, { duration: 6000 });
        }
      }
    } catch (error: any) {
      console.error('Error al configurar storage:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSettingUpStorage(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchMessages(), fetchAnalytics()]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-foreground hover:bg-muted/30"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al portfolio
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-muted/30 p-1.5 rounded-lg gap-1">
              <Button
                variant={activeTab === 'messages' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('messages')}
                className={`flex items-center gap-2 ${activeTab !== 'messages' ? 'hover:bg-muted/50' : ''}`}
              >
                <Mail className="w-4 h-4" />
                Mensajes
              </Button>
              <Button
                variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-2 ${activeTab !== 'analytics' ? 'hover:bg-muted/50' : ''}`}
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={fetchData}
              disabled={isLoading}
              className="flex items-center gap-2 hover:bg-muted/30"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
          </div>
        </div>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Panel de Analytics</h1>
            <p className="text-muted-foreground">
              {activeTab === 'messages' 
                ? 'Gestiona los mensajes de contacto recibidos desde el portfolio'
                : 'Visualiza las métricas de uso y analytics del portfolio'
              }
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <ScrollReveal direction="up" delay={0.2}>
          {activeTab === 'messages' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Messages List */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-secondary" />
                  <h2 className="text-xl font-semibold">Mensajes de Contacto</h2>
                  <Badge variant="secondary" className="ml-auto">
                    {messages.length} mensajes
                  </Badge>
                </div>

                {isLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Cargando mensajes...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">No hay mensajes aún</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-3 pb-2 pt-1 px-1">
                      {messages.map((message) => (
                        <Card
                          key={message.id}
                          className={`p-4 cursor-pointer transition-all duration-200 ${
                            selectedMessage?.id === message.id 
                              ? 'ring-2 ring-secondary border-secondary shadow-lg' 
                              : 'hover:border-secondary/50 hover:shadow-md'
                          }`}
                          onClick={() => setSelectedMessage(message)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <User className="w-4 h-4 text-secondary flex-shrink-0" />
                                <p className="font-medium text-card-foreground truncate">
                                  {message.name}
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2 truncate">
                                {message.email}
                              </p>
                              <p className="font-medium text-card-foreground mb-2 line-clamp-1">
                                {message.subject}
                              </p>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {message.message}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {formatDate(message.timestamp)}
                              </div>
                              <Badge 
                                variant={message.status === 'pending' ? 'secondary' : 'outline'}
                                className="text-xs"
                              >
                                {message.status === 'pending' ? 'Nuevo' : 'Leído'}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </Card>

              {/* Message Detail */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Detalle del Mensaje</h2>
                
                {selectedMessage ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Remitente</label>
                      <p className="text-card-foreground font-medium">{selectedMessage.name}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-card-foreground">{selectedMessage.email}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Fecha</label>
                      <p className="text-card-foreground">{formatDate(selectedMessage.timestamp)}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Asunto</label>
                      <p className="text-card-foreground font-medium">{selectedMessage.subject}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Mensaje</label>
                      <ScrollArea className="h-[200px] mt-2">
                        <p className="text-card-foreground whitespace-pre-wrap leading-relaxed">
                          {selectedMessage.message}
                        </p>
                      </ScrollArea>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex gap-2">
                      <Button 
                        className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                        onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                      >
                        Responder por Email
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(selectedMessage.email)}
                      >
                        Copiar Email
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Selecciona un mensaje para ver los detalles
                    </p>
                  </div>
                )}
              </Card>
            </div>
          ) : (
            /* Analytics Section */
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Cargando analytics...</p>
                </div>
              ) : analytics ? (
                <>
                  {/* Debug Info */}
                  <Card className="p-4 bg-accent/5 border-accent/20">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                        <BarChart3 className="w-4 h-4 text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground mb-1">Estado del Sistema Analytics</p>
                        <p className="text-sm text-muted-foreground">
                          📊 Total eventos: <span className="font-semibold text-foreground">{analytics.totalEvents}</span> {' | '}
                          🔄 Último refresh: <span className="font-semibold text-foreground">{new Date().toLocaleTimeString('es-ES')}</span>
                        </p>
                        {analytics.recentEvents && analytics.recentEvents.length > 0 && (
                          <p className="text-sm text-muted-foreground mt-1">
                            📅 Último evento: <span className="font-semibold text-foreground">
                              {new Date(analytics.recentEvents[0].timestamp).toLocaleString('es-ES', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            {analytics.recentEvents[0].project && (
                              <> {' | '} Proyecto: <span className="font-semibold text-foreground">{analytics.recentEvents[0].project}</span></>
                            )}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          💡 Tip: Abre la consola del navegador (F12) para ver logs detallados de eventos. Si no ves cambios, sal del panel y navega por el portfolio.
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Eye className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Vistas de página</p>
                          <p className="font-semibold text-2xl">{analytics.pageViews}</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary/10 rounded-lg">
                          <MousePointer className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Sesiones únicas</p>
                          <p className="font-semibold text-2xl">{analytics.uniqueSessions}</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <BarChart3 className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Vistas de proyectos</p>
                          <p className="font-semibold text-2xl">{analytics.projectViews}</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted/10 rounded-lg">
                          <Download className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Descargas CV</p>
                          <p className="font-semibold text-2xl">{analytics.cvDownloads}</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Reset Analytics Button */}
                  <Card className="p-4 bg-destructive/5 border-destructive/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-destructive/10 rounded-lg">
                          <Trash2 className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Resetear métricas</p>
                          <p className="text-sm text-muted-foreground">Elimina todos los eventos de analytics y resetea las métricas a 0</p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={resetAnalytics}
                        disabled={isResetting}
                        className="flex items-center gap-2"
                      >
                        {isResetting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Reseteando...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4" />
                            Resetear todo
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>

                  {/* Setup Storage Button */}
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Database className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Configurar almacenamiento</p>
                          <p className="text-sm text-muted-foreground">Crea el bucket público 'portfolio-assets' en Supabase Storage para las imágenes</p>
                        </div>
                      </div>
                      <Button
                        variant="default"
                        onClick={setupStorage}
                        disabled={isSettingUpStorage}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                      >
                        {isSettingUpStorage ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Configurando...
                          </>
                        ) : (
                          <>
                            <Database className="w-4 h-4" />
                            Configurar Storage
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>

                  {/* Popular Pages and Projects */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Páginas más visitadas
                      </h3>
                      <div className="space-y-2">
                        {analytics.popularPages.length > 0 ? analytics.popularPages.map(([page, views], index) => (
                          <div key={page} className="flex items-center justify-between py-2 px-3 bg-muted/20 rounded-lg">
                            <span className="font-medium capitalize">{page}</span>
                            <Badge variant="secondary">{views} vistas</Badge>
                          </div>
                        )) : (
                          <p className="text-muted-foreground text-center py-4">No hay datos de páginas aún</p>
                        )}
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Proyectos más vistos
                      </h3>
                      <div className="space-y-2">
                        {analytics.popularProjects.length > 0 ? analytics.popularProjects.map(([project, views], index) => (
                          <div key={project} className="flex items-center justify-between py-2 px-3 bg-muted/20 rounded-lg">
                            <span className="font-medium capitalize">{project}</span>
                            <Badge variant="secondary">{views} vistas</Badge>
                          </div>
                        )) : (
                          <p className="text-muted-foreground text-center py-4">No hay datos de proyectos aún</p>
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* Recent Events */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Actividad reciente
                    </h3>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {analytics.recentEvents.length > 0 ? analytics.recentEvents.map((event, index) => (
                          <div key={event.id || index} className="flex items-center justify-between py-2 px-3 bg-muted/10 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="text-xs">
                                {event.event_type}
                              </Badge>
                              <span className="text-sm">
                                {event.page && `Página: ${event.page}`}
                                {event.project && `Proyecto: ${event.project}`}
                                {!event.page && !event.project && 'Evento general'}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(event.timestamp)}
                            </span>
                          </div>
                        )) : (
                          <p className="text-muted-foreground text-center py-4">No hay eventos recientes</p>
                        )}
                      </div>
                    </ScrollArea>
                  </Card>
                </>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No hay datos de analytics disponibles</p>
                </div>
              )}
            </div>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}

export default AdminPage;