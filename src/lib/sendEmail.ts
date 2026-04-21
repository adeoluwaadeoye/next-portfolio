'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  // Honeypot protection
  const honeypot = formData.get('website_url') as string | null
  if (honeypot && honeypot.length > 0) {
    return { success: true } // Silent fail for bots
  }

  const name = (formData.get('fullName') as string)?.trim()
  const email = (formData.get('emailAddress') as string)?.trim()
  const type = (formData.get('projectType') as string)?.trim() || 'Not specified'
  const message = (formData.get('details') as string)?.trim()

  if (!name || !email || !message) {
    return { success: false, error: 'Missing required fields' }
  }

  const brandColor = '#2563eb'

  try {
    // 1. Email to YOU (Admin)
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['adeoluadeoye7@gmail.com'],
      replyTo: email,
      subject: `🚀 New Inquiry: ${type} from ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 620px; margin: 40px auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
          <div style="background: #0f172a; padding: 32px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 22px;">New Project Inquiry</h2>
          </div>
          <div style="padding: 32px; background: white; color: #334155;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="padding: 12px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Name</td><td style="padding: 12px 0; font-weight: 600; text-align: right; border-bottom: 1px solid #f1f5f9;">${name}</td></tr>
              <tr><td style="padding: 12px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Email</td><td style="padding: 12px 0; font-weight: 600; text-align: right; border-bottom: 1px solid #f1f5f9;">${email}</td></tr>
              <tr><td style="padding: 12px 0; color: #64748b;">Project Type</td><td style="padding: 12px 0; font-weight: 600; text-align: right; color: ${brandColor};">${type}</td></tr>
            </table>

            <div style="background: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 12px; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase;">Message:</p>
              <p style="white-space: pre-wrap; line-height: 1.7; margin: 0;">${message}</p>
            </div>
          </div>
        </div>
      `
    })

    // 2. Auto-reply to Client
    await resend.emails.send({
      from: 'Adeolu Adeoye <onboarding@resend.dev>',
      to: [email],
      subject: `Thanks for reaching out, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 30px auto; padding: 40px 30px; color: #334155;">
          <h2 style="color: ${brandColor};">Thank you for your message!</h2>
          <p>Hi ${name},</p>
          <p>I've received your inquiry about <strong>${type}</strong>. I'll review your details and get back to you within 24-48 hours.</p>
          <br/>
          <p>Best regards,<br/>
          <strong>Adeolu Adeoye</strong><br/>
          Full-Stack Engineer
          </p>
        </div>
      `
    })

    return { success: true }

  } catch (error) {
    console.error('Resend error:', error)
    return { 
      success: false, 
      error: 'Failed to send email. Please try again later.' 
    }
  }
}