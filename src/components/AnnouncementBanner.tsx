'use client';
import { useSiteSettings } from '@/context/SiteSettingsContext';

export default function AnnouncementBanner() {
  const settings = useSiteSettings();

  if (settings['banner.enabled'] === 'false') return null;
  const text = settings['banner.text'];
  if (!text) return null;

  const bg = settings['banner.bg_color'] || '#be123c';

  return (
    <div
      className="w-full text-white text-xs font-medium text-center py-2 px-4"
      style={{ backgroundColor: bg }}
    >
      {text}
    </div>
  );
}
