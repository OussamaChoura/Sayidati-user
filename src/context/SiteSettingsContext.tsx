'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type Settings = Record<string, string>;

const SiteSettingsContext = createContext<Settings>({});

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    fetch(`${API}/api/v1/settings`)
      .then((r) => r.ok ? r.json() : {})
      .then(setSettings)
      .catch(() => {});
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
