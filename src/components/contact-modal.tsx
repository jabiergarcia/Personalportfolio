import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogOverlay, DialogPortal } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from './ui/sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useLanguage } from '../hooks/use-language';

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
  const { t } = useLanguage();
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
      toast.error(t.contact.validation.nameRequired);
      setSubmitStatus('Error: ' + t.contact.validation.nameRequired);
      return false;
    }
    if (!formData.email.trim()) {
      toast.error(t.contact.validation.emailRequired);
      setSubmitStatus('Error: ' + t.contact.validation.emailRequired);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error(t.contact.validation.emailInvalid);
      setSubmitStatus('Error: ' + t.contact.validation.emailInvalid);
      return false;
    }
    if (!formData.subject.trim()) {
      toast.error(t.contact.validation.subjectRequired);
      setSubmitStatus('Error: ' + t.contact.validation.subjectRequired);
      return false;
    }
    if (!formData.message.trim()) {
      toast.error(t.contact.validation.messageRequired);
      setSubmitStatus('Error: ' + t.contact.validation.messageRequired);
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
        throw new Error(errorData || t.contact.messages.error);
      }

      toast.success(t.contact.messages.success);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      onClose();
    } catch (error) {
      toast.error(t.contact.messages.error);
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
          <DialogTitle className="text-foreground">{t.contact.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t.contact.description}
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
              {t.contact.form.name.label}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder={t.contact.form.name.placeholder}
              className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
              required
              aria-required="true"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-foreground">
              {t.contact.form.email.label}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder={t.contact.form.email.placeholder}
              className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
              required
              aria-required="true"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject" className="text-foreground">
              {t.contact.form.subject.label}
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder={t.contact.form.subject.placeholder}
              className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
              required
              aria-required="true"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-foreground">
              {t.contact.form.message.label}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder={t.contact.form.message.placeholder}
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
            {t.contact.buttons.cancel}
          </Button>
          <Button 
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? t.contact.buttons.sending : t.contact.buttons.send}
          </Button>
        </div>
      </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}