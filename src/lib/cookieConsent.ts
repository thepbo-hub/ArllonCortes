export interface CookieConsentSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

const STORAGE_KEY = 'arllon_cookie_consent_v1';

export const DEFAULT_CONSENT: CookieConsentSettings = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: '',
};

export function getStoredConsent(): CookieConsentSettings | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentSettings;
  } catch {
    return null;
  }
}

export function saveStoredConsent(settings: {
  analytics: boolean;
  marketing: boolean;
}): CookieConsentSettings {
  const fullConsent: CookieConsentSettings = {
    necessary: true,
    analytics: settings.analytics,
    marketing: settings.marketing,
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullConsent));
  } catch {
    // Storage access might be blocked by privacy mode
  }

  // Notifica ouvintes caso haja integração futura de analytics
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('arllon_cookie_consent_updated', { detail: fullConsent })
    );
  }

  return fullConsent;
}

export function clearStoredConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('arllon_cookie_consent_updated', { detail: null }));
  }
}
