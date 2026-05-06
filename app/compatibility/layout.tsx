import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '星座相容度 | Stella Chart',
  description: '探索十二星座之間的星象和諧度，透過五維度分析了解彼此的溝通、信任、情感、價值觀與性生活相容程度。',
  openGraph: {
    title: '星座相容度 — Stella Chart',
    description: '探索十二星座之間的星象和諧度，透過五維度分析了解彼此的相容程度。',
    type: 'website',
    locale: 'zh_TW',
  },
};

export default function CompatibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}