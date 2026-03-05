import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function HashGenerator() {
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const generateHash = async () => {
    if (!password) {
      toast.error('Escribe una contraseña primero');
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setHash(hashHex);
      toast.success('¡Hash generado correctamente!');
    } catch (error) {
      toast.error('Error al generar el hash');
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    toast.success('Hash copiado al portapapeles ✓');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="p-8 max-w-2xl w-full shadow-xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">🔐 Generador de Hash Admin</h1>
          <p className="text-muted-foreground">
            Genera el hash SHA-256 de tu contraseña para configurar el acceso al panel de administración.
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Escribe tu contraseña de administrador:
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateHash()}
                placeholder="Ej: MiContraseñaSegura2026!"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              💡 Usa una contraseña segura que solo tú conozcas
            </p>
          </div>

          <Button onClick={generateHash} className="w-full" size="lg">
            Generar Hash SHA-256
          </Button>

          {hash && (
            <div className="mt-6 space-y-4 animate-in fade-in duration-500">
              <div className="h-px bg-border" />
              
              <div>
                <label className="text-sm font-medium mb-2 block text-green-600 dark:text-green-400">
                  ✅ Tu hash generado (copia esto a Supabase):
                </label>
                <div className="flex gap-2">
                  <Input
                    value={hash}
                    readOnly
                    className="font-mono text-xs bg-muted/50"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <Button onClick={copyToClipboard} variant="outline" size="icon" className="flex-shrink-0">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Card className="p-4 bg-secondary/10 border-secondary/20">
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  📋 Instrucciones para configurar en Supabase:
                </p>
                <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                  <li className="pl-2">
                    <strong className="text-foreground">Copia el hash</strong> de arriba usando el botón de copiar
                  </li>
                  <li className="pl-2">
                    Ve a <strong className="text-foreground">Supabase Dashboard</strong> → <code className="bg-muted px-1 rounded text-xs">Project Settings</code> → <code className="bg-muted px-1 rounded text-xs">Edge Functions</code>
                  </li>
                  <li className="pl-2">
                    Busca la sección <strong className="text-foreground">"Environment Variables"</strong> o <strong className="text-foreground">"Secrets"</strong>
                  </li>
                  <li className="pl-2">
                    Añade una nueva variable:
                    <div className="ml-6 mt-1 space-y-1">
                      <div>• Name: <code className="bg-muted px-2 py-0.5 rounded text-xs">ADMIN_PASSWORD_HASH</code></div>
                      <div>• Value: <span className="text-xs">(pega el hash)</span></div>
                    </div>
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Guarda</strong> los cambios y <strong className="text-foreground">redeploy</strong> la Edge Function si es necesario
                  </li>
                  <li className="pl-2">
                    Ahora podrás acceder al admin presionando <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Shift</kbd> 3 veces e ingresando tu contraseña original
                  </li>
                </ol>
              </Card>

              <Card className="p-3 bg-destructive/5 border-destructive/20">
                <p className="text-xs text-destructive font-medium">
                  ⚠️ <strong>Importante:</strong> Guarda tu contraseña en un lugar seguro. El hash no se puede revertir. Si olvidas tu contraseña, tendrás que generar un nuevo hash.
                </p>
              </Card>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
