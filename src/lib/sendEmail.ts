'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  const honeypot = formData.get('website_url') as string | null
  if (honeypot && honeypot.length > 0) return { success: true }

  const name    = (formData.get('fullName')     as string)?.trim()
  const email   = (formData.get('emailAddress') as string)?.trim()
  const type    = (formData.get('projectType')  as string)?.trim() || 'Not specified'
  const message = (formData.get('details')      as string)?.trim()

  if (!name || !email || !message) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['adeoluadeoye7@gmail.com'],
      replyTo: email,
      subject: `New Inquiry: ${type} from ${name}`,
      html: contactEmailHtml({ name, email, type, message }),
    })

    return { success: true }
  } catch (error) {
    console.error('Resend error:', error)
    return { success: false, error: 'Failed to send email. Please try again later.' }
  }
}

function contactEmailHtml({
  name, email, type, message,
}: {
  name: string; email: string; type: string; message: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Inquiry — ${name}</title>
</head>
<body style="margin:0;padding:0;background:#060a14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;width:100%;">

        <!-- Logo bar -->
        <tr>
          <td style="padding-bottom:28px;text-align:center;">
            <span style="font-size:12px;font-weight:700;letter-spacing:0.2em;color:#475569;text-transform:uppercase;">
              Adeoluwa Adeoye · Portfolio
            </span>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:#0f172a;border-radius:24px;overflow:hidden;border:1px solid #1e293b;">

            <!-- Hero header -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="background:linear-gradient(135deg,#059669 0%,#0891b2 50%,#1d4ed8 100%);padding:40px 44px 36px;">
                  <table cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="background:rgba(255,255,255,0.15);border-radius:14px;padding:10px 14px;">
                        <span style="font-size:11px;font-weight:800;letter-spacing:0.18em;color:rgba(255,255,255,0.9);text-transform:uppercase;">
                          ✉️&nbsp;&nbsp;New Project Inquiry
                        </span>
                      </td>
                    </tr>
                  </table>
                  <h1 style="margin:16px 0 6px;font-size:28px;font-weight:800;color:#ffffff;line-height:1.15;letter-spacing:-0.02em;">
                    ${name} sent<br/>you a message
                  </h1>
                  <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.7);line-height:1.5;">
                    Via the contact form on your portfolio
                  </p>
                </td>
              </tr>
            </table>

            <!-- Sender info -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding:36px 44px 0;">
                  <p style="margin:0 0 20px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#475569;text-transform:uppercase;">
                    Sender Details
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #1e293b;border-radius:16px;overflow:hidden;">
                    <tr style="background:#0a0f1e;">
                      <td style="padding:16px 20px;width:44px;font-size:18px;vertical-align:top;">👤</td>
                      <td style="padding:16px 0;width:130px;vertical-align:top;">
                        <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;color:#475569;text-transform:uppercase;">Name</span>
                      </td>
                      <td style="padding:16px 20px 16px 8px;vertical-align:top;">
                        <span style="font-size:14px;font-weight:600;color:#e2e8f0;">${name}</span>
                      </td>
                    </tr>
                    <tr style="background:#0f172a;">
                      <td style="padding:16px 20px;font-size:18px;vertical-align:top;">📧</td>
                      <td style="padding:16px 0;vertical-align:top;">
                        <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;color:#475569;text-transform:uppercase;">Email</span>
                      </td>
                      <td style="padding:16px 20px 16px 8px;vertical-align:top;">
                        <a href="mailto:${email}" style="font-size:14px;font-weight:600;color:#60a5fa;text-decoration:none;">${email}</a>
                      </td>
                    </tr>
                    <tr style="background:#0a0f1e;">
                      <td style="padding:16px 20px;font-size:18px;vertical-align:top;">⚡</td>
                      <td style="padding:16px 0;vertical-align:top;">
                        <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;color:#475569;text-transform:uppercase;">Project Type</span>
                      </td>
                      <td style="padding:16px 20px 16px 8px;vertical-align:top;">
                        <span style="font-size:14px;font-weight:600;color:#a78bfa;">${type}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Message -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding:24px 44px 0;">
                  <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#475569;text-transform:uppercase;">
                    Message
                  </p>
                  <div style="background:#0a0f1e;border:1px solid #1e293b;border-radius:16px;padding:24px;">
                    <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.8;white-space:pre-wrap;">${message}</p>
                  </div>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding:28px 44px 40px;">
                  <table cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="border-radius:12px;background:linear-gradient(135deg,#059669,#0891b2);">
                        <a href="mailto:${email}" style="display:inline-block;padding:14px 28px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.04em;">
                          Reply to ${name} &rarr;
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Footer -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding:20px 44px;border-top:1px solid #1e293b;">
                  <p style="margin:0;font-size:11px;color:#334155;text-align:center;line-height:1.6;">
                    Sent automatically · adeoluwadeoye.vercel.app · Do not reply to this email
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
