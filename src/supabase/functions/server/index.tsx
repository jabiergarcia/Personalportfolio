import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-df6fcedb/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form endpoint
app.post("/make-server-df6fcedb/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return c.json({ error: "Todos los campos son obligatorios" }, 400);
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Email inválido" }, 400);
    }

    // Create contact entry
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const contactData = {
      id: contactId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Store in KV store
    await kv.set(contactId, contactData);

    // Send email notification using Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      
      if (resendApiKey) {
        const emailData = {
          from: 'Portfolio <onboarding@resend.dev>',
          to: ['garciasanz.j@gmail.com'],
          subject: `🔔 Nuevo mensaje de contacto: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fffbf8;">
              <div style="background: linear-gradient(135deg, #10252a 0%, #2d5367 100%); padding: 30px; border-radius: 16px; margin-bottom: 20px;">
                <h1 style="color: #d8f878; margin: 0; font-size: 24px;">📧 Nuevo Mensaje de Contacto</h1>
                <p style="color: #fffbf8; margin: 10px 0 0 0; opacity: 0.9;">Has recibido un nuevo mensaje desde tu portfolio</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 16px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #10252a; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Remitente</h3>
                  <p style="color: #2d5367; margin: 0; font-size: 18px; font-weight: 600;">${name}</p>
                  <p style="color: #70b8ba; margin: 5px 0 0 0; font-size: 16px;">${email}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #10252a; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Asunto</h3>
                  <p style="color: #2d5367; margin: 0; font-size: 18px; font-weight: 600;">${subject}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #10252a; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</h3>
                  <div style="background: #fffbf8; padding: 20px; border-radius: 12px; border: 1px solid #ffccb6;">
                    <p style="color: #10252a; margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #10252a; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Fecha y Hora</h3>
                  <p style="color: #70b8ba; margin: 0; font-size: 16px;">${new Date(contactData.timestamp).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Madrid'
                  })}</p>
                </div>
              </div>
              
              <div style="background: #d8f878; padding: 20px; border-radius: 16px; text-align: center;">
                <h3 style="color: #10252a; margin: 0 0 10px 0;">💡 Responder</h3>
                <p style="color: #2d5367; margin: 0 0 15px 0;">Puedes responder directamente a este email o usar el enlace de abajo:</p>
                <a href="mailto:${email}?subject=Re: ${subject}" 
                   style="display: inline-block; background: #10252a; color: #d8f878; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                  Responder a ${name}
                </a>
              </div>
              
              <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #70b8ba; font-size: 14px; margin: 0;">
                  Portfolio de Jabier García Sanz - UX/UI Designer
                </p>
                <p style="color: #70b8ba; font-size: 12px; margin: 5px 0 0 0;">
                  ID del mensaje: ${contactId}
                </p>
              </div>
            </div>
          `
        };

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        });

        if (emailResponse.ok) {
          console.log('Email notification sent successfully via Resend');
        } else {
          const errorText = await emailResponse.text();
          console.error('Failed to send email via Resend:', errorText);
        }
      } else {
        console.log('Resend API key not configured, skipping email notification');
      }
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Don't fail the contact form if email fails
    }

    console.log('Contact form submission received:', {
      id: contactId,
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      timestamp: contactData.timestamp
    });

    return c.json({ 
      success: true, 
      message: "Mensaje recibido correctamente",
      contactId: contactId 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return c.json({ 
      error: "Error interno del servidor. Por favor, inténtalo de nuevo." 
    }, 500);
  }
});

// Get contact messages (for admin use)
app.get("/make-server-df6fcedb/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact_');
    return c.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return c.json({ error: "Error al obtener mensajes de contacto" }, 500);
  }
});

// Analytics reset endpoint (creates a reset marker)
app.post("/make-server-df6fcedb/analytics/reset", async (c) => {
  try {
    // Create a reset marker with current timestamp
    const resetPoint = {
      timestamp: new Date().toISOString(),
      type: 'analytics_reset'
    };
    
    await kv.set('analytics_reset_point', resetPoint);
    
    console.log('Analytics reset point created:', resetPoint.timestamp);
    
    return c.json({ 
      success: true,
      message: 'Punto de reset creado correctamente',
      resetPoint: resetPoint.timestamp
    });
  } catch (error) {
    console.error('Error creating analytics reset point:', error);
    return c.json({ error: "Error al crear punto de reset" }, 500);
  }
});

// TEMPORARY: Clear all analytics data (use once before production)
app.post("/make-server-df6fcedb/analytics/clear-all", async (c) => {
  try {
    // Get all analytics entries
    const analytics = await kv.getByPrefix('analytics_');
    
    console.log(`Clearing ${analytics?.length || 0} analytics entries...`);
    
    // Delete all analytics entries
    if (analytics && analytics.length > 0) {
      const ids = analytics.map(entry => entry.id);
      await kv.mdel(...ids);
    }
    
    // Also delete the reset point if it exists
    await kv.del('analytics_reset_point');
    
    console.log('All analytics data cleared successfully');
    
    return c.json({ 
      success: true,
      message: 'Todos los datos de analytics han sido eliminados',
      clearedCount: analytics?.length || 0
    });
  } catch (error) {
    console.error('Error clearing analytics data:', error);
    return c.json({ error: "Error al limpiar datos de analytics" }, 500);
  }
});

// Analytics endpoint
app.post("/make-server-df6fcedb/analytics", async (c) => {
  try {
    const body = await c.req.json();
    const { event_type, page, project, timestamp, user_agent, viewport, session_id } = body;

    console.log('📊 [Server] Analytics event received:', { event_type, page, project, session_id });

    // Validate required fields
    if (!event_type || !timestamp || !session_id) {
      console.error('❌ [Server] Analytics validation failed: Missing required fields');
      return c.json({ error: "Campos requeridos faltantes" }, 400);
    }

    // Create analytics entry
    const analyticsId = `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const analyticsData = {
      id: analyticsId,
      event_type,
      page: page || null,
      project: project || null,
      timestamp,
      user_agent: user_agent || null,
      viewport: viewport || null,
      session_id,
      created_at: new Date().toISOString()
    };

    // Store in KV store
    try {
      await kv.set(analyticsId, analyticsData);
      console.log('✅ [Server] Analytics event stored:', analyticsId);
    } catch (kvError) {
      console.error('❌ [Server] KV store error:', kvError);
      throw kvError;
    }

    return c.json({ success: true, id: analyticsId });

  } catch (error) {
    console.error('❌ [Server] Error processing analytics event:', error);
    return c.json({ error: "Error interno del servidor" }, 500);
  }
});

// Get analytics data (for admin use)
app.get("/make-server-df6fcedb/analytics", async (c) => {
  try {
    console.log('📊 [Server] Fetching analytics data...');
    const analytics = await kv.getByPrefix('analytics_');
    
    console.log(`📊 [Server] Found ${analytics?.length || 0} analytics events in database`);
    
    // No filtering - show all events since last cleanup
    const events = analytics || [];
    
    // Basic analytics aggregation
    const totalEvents = events.length;
    const uniqueSessions = new Set(events.map(e => e.session_id)).size;
    const pageViews = events.filter(e => e.event_type === 'page_view').length;
    const projectViews = events.filter(e => e.event_type === 'project_view').length;
    const contactOpens = events.filter(e => e.event_type === 'contact_open').length;
    const cvDownloads = events.filter(e => e.event_type === 'cv_download').length;
    
    console.log(`📊 [Server] Analytics summary: ${totalEvents} events, ${uniqueSessions} sessions, ${pageViews} page views`);
    
    // Popular pages
    const pageViewsMap = {};
    events.filter(e => e.event_type === 'page_view').forEach(e => {
      pageViewsMap[e.page] = (pageViewsMap[e.page] || 0) + 1;
    });
    
    // Popular projects
    const projectViewsMap = {};
    events.filter(e => e.event_type === 'project_view').forEach(e => {
      projectViewsMap[e.project] = (projectViewsMap[e.project] || 0) + 1;
    });

    const summary = {
      totalEvents,
      uniqueSessions,
      pageViews,
      projectViews,
      contactOpens,
      cvDownloads,
      popularPages: Object.entries(pageViewsMap).sort(([,a], [,b]) => b - a).slice(0, 5),
      popularProjects: Object.entries(projectViewsMap).sort(([,a], [,b]) => b - a).slice(0, 5),
      recentEvents: events.slice(-20).reverse()
    };

    console.log('✅ [Server] Analytics data prepared successfully');

    return c.json({ 
      summary,
      events: events.slice(-100) // Last 100 events for detailed view
    });
  } catch (error) {
    console.error('❌ [Server] Error fetching analytics:', error);
    return c.json({ error: "Error al obtener datos de analytics" }, 500);
  }
});

Deno.serve({ port: 8000 }, app.fetch);