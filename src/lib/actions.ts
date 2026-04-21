'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type BookingResult =
  | { success: true }
  | { success: false; error: string }

export async function sendBookingEmail(formData: FormData): Promise<BookingResult> {
  const name    = (formData.get('name')    as string | null)?.trim()
  const email   = (formData.get('email')   as string | null)?.trim()
  const date    = (formData.get('date')    as string | null)?.trim()
  const time    = (formData.get('time')    as string | null)?.trim()
  const service = (formData.get('service') as string | null)?.trim()
  const message = (formData.get('message') as string | null)?.trim() ?? ''

  if (!name || !email || !date || !time || !service) {
    return { success: false, error: 'Missing required fields.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email address.' }
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Bookings <onboarding@resend.dev>',
      to: ['adeoluadeoye7@gmail.com'],
      replyTo: email,
      subject: `New Session Request — ${name} · ${service}`,
      html: adminEmailHtml({ name, email, date, time, service, message }),
    })

    return { success: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown server error'
    console.error('[sendBookingEmail]', msg)
    return { success: false, error: msg }
  }
}

function adminEmailHtml({
  name, email, date, time, service, message,
}: {
  name: string; email: string; date: string
  time: string; service: string; message: string
}) {
  const details = [
    { label: 'Client Name', value: name, icon: '👤' },
    { label: 'Email',       value: email, icon: '📧' },
    { label: 'Service',     value: service, icon: '⚡' },
    { label: 'Date',        value: date, icon: '📅' },
    { label: 'Time (GMT+1)',value: time, icon: '🕐' },
    ...(message ? [{ label: 'Notes', value: message, icon: '💬' }] : []),
  ]

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Booking — ${name}</title>
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
                <td style="background:linear-gradient(135deg,#1d4ed8 0%,#4f46e5 50%,#7c3aed 100%);padding:40px 44px 36px;">
                  <table cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="background:rgba(255,255,255,0.15);border-radius:14px;padding:10px 14px;margin-bottom:20px;">
                        <span style="font-size:11px;font-weight:800;letter-spacing:0.18em;color:rgba(255,255,255,0.9);text-transform:uppercase;">
                          🗓&nbsp;&nbsp;New Booking Request
                        </span>
                      </td>
                    </tr>
                  </table>
                  <h1 style="margin:16px 0 6px;font-size:28px;font-weight:800;color:#ffffff;line-height:1.15;letter-spacing:-0.02em;">
                    ${name} wants to<br/>book a session
                  </h1>
                  <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.7);line-height:1.5;">
                    Submitted via your portfolio contact form
                  </p>
                </td>
              </tr>
            </table>

            <!-- Details -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding:36px 44px 0;">
                  <p style="margin:0 0 20px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#475569;text-transform:uppercase;">
                    Booking Details
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #1e293b;border-radius:16px;overflow:hidden;">
                    ${details.map(({ label, value, icon }, i) => `
                    <tr style="background:${i % 2 === 0 ? '#0a0f1e' : '#0f172a'};">
                      <td style="padding:16px 20px;width:44px;font-size:18px;vertical-align:top;">${icon}</td>
                      <td style="padding:16px 0;width:130px;vertical-align:top;">
                        <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;color:#475569;text-transform:uppercase;">${label}</span>
                      </td>
                      <td style="padding:16px 20px 16px 8px;vertical-align:top;">
                        <span style="font-size:14px;font-weight:600;color:#e2e8f0;line-height:1.5;">${value}</span>
                      </td>
                    </tr>`).join('')}
                  </table>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding:28px 44px 40px;">
                  <table cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="border-radius:12px;background:linear-gradient(135deg,#1d4ed8,#4f46e5);">
                        <a href="https://calendar.google.com" style="display:inline-block;padding:14px 28px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.04em;">
                          Open Google Calendar &rarr;
                        </a>
                      </td>
                      <td style="padding-left:12px;">
                        <a href="mailto:${email}" style="display:inline-block;padding:14px 24px;font-size:13px;font-weight:700;color:#94a3b8;text-decoration:none;border:1px solid #1e293b;border-radius:12px;letter-spacing:0.04em;">
                          Reply to Client
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
