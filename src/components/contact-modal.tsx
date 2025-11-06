import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogOverlay, DialogPortal } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from './ui/sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error('Por favor, introduce tu nombre');
      setSubmitStatus('Error: Introduce tu nombre');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Por favor, introduce tu email');
      setSubmitStatus('Error: Introduce tu email');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Por favor, introduce un email válido');
      setSubmitStatus('Error: Introduce un email válido');
      return false;
    }
    if (!formData.subject.trim()) {
      toast.error('Por favor, introduce un asunto');
      setSubmitStatus('Error: Introduce un asunto');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Por favor, introduce un mensaje');
      setSubmitStatus('Error: Introduce un mensaje');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-df6fcedb/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Error al enviar el mensaje');
      }

      toast.success('¡Mensaje enviado correctamente! Te responderé lo antes posible.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      onClose();
    } catch (error) {
      toast.error('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40 backdrop-blur-sm" />
        <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">¿Hablamos?</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Cuéntame qué tienes entre manos y te responderé lo antes posible.
          </DialogDescription>
        </DialogHeader>
        
        {/* Live region for form status */}
        <div 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
          className="sr-only"
        >
          {submitStatus}
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-foreground">
              Tu nombre completo *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="¿Cómo te llamas?"
              className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
              required
              aria-required="true"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-foreground">
              tu@mail.com *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Tu correo (prometo no hacer spam)"
              className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
              required
              aria-required="true"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject" className="text-foreground">
              ¿Qué tienes en mente? *
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Dispara: ¿qué quieres diseñar?"
              className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
              required
              aria-required="true"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-foreground">
              Abierto a ideas y nuevos retos *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Escríbeme y hablamos..."
              className="bg-input-background border-border text-foreground placeholder:text-muted-foreground min-h-[100px]"
              disabled={isLoading}
              required
              aria-required="true"
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="border-secondary text-foreground hover:bg-secondary/10 dark:hover:text-secondary-foreground"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar mensaje'}
          </Button>
        </div>
      </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}