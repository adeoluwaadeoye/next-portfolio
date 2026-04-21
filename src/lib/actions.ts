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
    // ── ADMIN NOTIFICATION ───────────────────────────────────────────
    await resend.emails.send({
      from: 'Portfolio Bookings <onboarding@resend.dev>',
      to: ['adeoluadeoye7@gmail.com'],
      subject: `🗓 New Session Request — ${name} · ${service}`,
      html: adminEmailHtml({ name, email, date, time, service, message }),
    })

    // ── CLIENT CONFIRMATION ──────────────────────────────────────────
    const { error } = await resend.emails.send({
      from: 'Adeolu Adeoye <onboarding@resend.dev>',
      to: [email],
      subject: `✅ Booking Confirmed — ${service} on ${date}`,
      html: clientEmailHtml({ name, date, time, service }),
    })

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown server error'
    console.error('[sendBookingEmail]', message)
    return { success: false, error: message }
  }
}

/* ─── Email Templates ─────────────────────────────────────────────────────── */

function adminEmailHtml({
  name, email, date, time, service, message,
}: {
  name: string; email: string; date: string
  time: string; service: string; message: string
}) {
  const rows = [
    ['Client',   name],
    ['Email',    email],
    ['Service',  service],
    ['Date',     date],
    ['Time',     time],
    ...(message ? [['Notes', message]] : []),
  ]

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;width:100%;border-radius:20px;overflow:hidden;border:1px solid #1e293b;background:#1e293b;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#3b82f6 0%,#6366f1 100%);padding:36px 40px;">
            <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:0.15em;color:rgba(255,255,255,0.7);text-transform:uppercase;">Adeolu Adeoye · Portfolio</p>
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">New Session Request</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 24px 0;font-size:14px;color:#94a3b8;line-height:1.6;">
              A new booking has been submitted through your portfolio. Review the details below and confirm the session.
            </p>

            <!-- Details table -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #334155;border-radius:12px;overflow:hidden;">
              ${rows.map(([label, value], i) => `
              <tr style="background:${i % 2 === 0 ? '#0f172a' : '#1a2744'}">
                <td style="padding:14px 20px;font-size:11px;font-weight:700;letter-spacing:0.08em;color:#64748b;text-transform:uppercase;white-space:nowrap;width:80px;">${label}</td>
                <td style="padding:14px 20px;font-size:14px;font-weight:600;color:#e2e8f0;">${value}</td>
              </tr>`).join('')}
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:28px;">
              <tr>
                <td>
                  <a href="https://calendar.google.com" style="display:inline-block;background:#3b82f6;color:#ffffff;font-size:13px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;letter-spacing:0.03em;">
                    Open Calendar →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #1e293b;">
            <p style="margin:0;font-size:11px;color:#334155;text-align:center;">
              Sent automatically from adeoluwaadeoye.dev · Do not reply to this email
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function clientEmailHtml({
  name, date, time, service,
}: {
  name: string; date: string; time: string; service: string
}) {
  const features = [
    '60-minute focused strategy session',
    'Personalised technical roadmap',
    'Architecture or code review notes',
    'Follow-up resources & next steps',
  ]

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;width:100%;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;background:#ffffff;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#3b82f6 0%,#6366f1 100%);padding:40px;text-align:center;">
            <div style="display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;background:rgba(255,255,255,0.2);border-radius:16px;margin-bottom:16px;">
              <span style="font-size:28px;">✅</span>
            </div>
            <h1 style="margin:0 0 6px 0;font-size:26px;font-weight:800;color:#ffffff;">Booking Confirmed!</h1>
            <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.8);">Your session has been secured, ${name}.</p>
          </td>
        </tr>

        <!-- Session card -->
        <tr>
          <td style="padding:32px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f0f7ff;border:1px solid #bfdbfe;border-radius:14px;overflow:hidden;">
              <tr>
                <td style="padding:20px 24px;border-bottom:1px solid #bfdbfe;">
                  <p style="margin:0 0 2px 0;font-size:10px;font-weight:700;letter-spacing:0.12em;color:#6b7280;text-transform:uppercase;">Service</p>
                  <p style="margin:0;font-size:15px;font-weight:700;color:#1e3a8a;">${service}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="width:50%;padding-right:12px;">
                        <p style="margin:0 0 2px 0;font-size:10px;font-weight:700;letter-spacing:0.12em;color:#6b7280;text-transform:uppercase;">Date</p>
                        <p style="margin:0;font-size:15px;font-weight:700;color:#1e40af;">${date}</p>
                      </td>
                      <td style="width:50%;padding-left:12px;border-left:1px solid #bfdbfe;">
                        <p style="margin:0 0 2px 0;font-size:10px;font-weight:700;letter-spacing:0.12em;color:#6b7280;text-transform:uppercase;">Time</p>
                        <p style="margin:0;font-size:15px;font-weight:700;color:#1e40af;">${time}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- What to expect -->
        <tr>
          <td style="padding:28px 40px 0;">
            <p style="margin:0 0 16px 0;font-size:12px;font-weight:700;letter-spacing:0.1em;color:#6b7280;text-transform:uppercase;">What&apos;s included</p>
            ${features.map(f => `
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:10px;">
              <tr>
                <td style="width:20px;vertical-align:top;padding-top:1px;">
                  <span style="font-size:14px;">✓</span>
                </td>
                <td style="font-size:14px;color:#374151;padding-left:10px;">${f}</td>
              </tr>
            </table>`).join('')}
          </td>
        </tr>

        <!-- Body text -->
        <tr>
          <td style="padding:24px 40px;">
            <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.7;">
              A calendar invite will be sent to this email address shortly. If you need to reschedule or have any questions,
              reply to this email and I will get back to you promptly.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;line-height:1.6;">
              <strong style="color:#374151;">Adeolu Adeoye</strong> · Full-Stack Engineer<br />
              <a href="https://adeoluwaadeoye.dev" style="color:#3b82f6;text-decoration:none;">adeoluwaadeoye.dev</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
