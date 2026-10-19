import emailjs from '@emailjs/browser';

// constants
import { FALLBACK_EMAIL_ADDRESS } from '@/constants/channel';
import { BASE_URL } from '@/constants/meta';
import { PATHS } from '@/constants/paths';

// ----------------------------------------------------------------------

export enum NotifyResult {
  SENT = 'sent',
  THROTTLED = 'throttled',
  ERROR = 'error',
}

// ----------------------------------------------------------------------

const COOLDOWN_KEY = 'missing-config-notified-at';
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Sends email notification via EmailJS. Throttled client-side with a
 * localStorage cooldown to prevent repeat sends.
 *
 * @returns Result string: 'sent', 'throttled', or 'error'
 */
export async function sendEmailjsNotification(): Promise<NotifyResult> {
  try {
    const last = Number(localStorage.getItem(COOLDOWN_KEY) ?? 0);
    if (Date.now() - last < COOLDOWN_MS) return NotifyResult.THROTTLED;
  } catch {
    // localStorage may be unavailable (private mode, etc.), carry on
  }

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        to_email: FALLBACK_EMAIL_ADDRESS,
        studio_url: `${BASE_URL}${PATHS.studio.config}`,
      },
      { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
    );

    try {
      localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    } catch {
      // ignore
    }

    return NotifyResult.SENT;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to send notification:', error);
    return NotifyResult.ERROR;
  }
}
