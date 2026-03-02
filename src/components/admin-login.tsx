import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
}

/**
 * Componente de login para el panel de administración
 * Valida contraseña contra hash almacenado en variables de entorno
 */
export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      toast.error('Por favor, ingresa la contraseña');
      return;
    }

    setIsLoading(true);

    try {
      // Llamar al endpoint de autenticación
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-df6fcedb/admin/auth`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ password })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error de autenticación');
      }

      const data = await response.json();
      
      if (data.success && data.token) {
        // Guardar token en localStorage
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_token_expiry', data.expiry);
        
        toast.success('¡Acceso concedido!');
        onLoginSuccess(data.token);
      } else {
        throw new Error('Respuesta inválida del servidor');
      }

    } catch (error) {
      console.error('❌ Error de autenticación:', error);
      toast.error(error instanceof Error ? error.message : 'Contraseña incorrecta');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-foreground mb-2">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground">
            Ingresa la contraseña para acceder
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              autoFocus
              className="text-foreground"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Verificando...' : 'Ingresar'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>🔒 Acceso restringido al propietario del portfolio</p>
        </div>
      </Card>
    </div>
  );
}
