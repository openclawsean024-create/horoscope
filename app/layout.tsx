import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Stella Chart | Zodiac Archive',
    template: '%s | Stella Chart',
  },
  description: 'Explore your zodiac identity through an elegant lens — deep, precise, timeless. 十二星座完整性格分析、每日運勢與相容度計算。',
  keywords: ['星座', ' zodiac', ' horoscope', '星座運勢', '每日運勢', '相容度', '占星'],
  authors: [{ name: 'Stella Chart' }],
  openGraph: {
    title: 'Stella Chart | Zodiac Archive',
    description: 'Explore your zodiac identity through an elegant lens — deep, precise, timeless.',
    url: 'https://horoscope-lake-eight.vercel.app',
    siteName: 'Stella Chart',
    type: 'website',
    locale: 'zh_TW',
    images: [{
      url: 'https://horoscope-lake-eight.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Stella Chart — The cosmos speaks in patterns.',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stella Chart | Zodiac Archive',
    description: 'Explore your zodiac identity through an elegant lens — deep, precise, timeless.',
    images: ['https://horoscope-lake-eight.vercel.app/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        <div className="starfield" aria-hidden="true" />
        <nav className="nav" id="mainNav">
          <div className="container">
            <div className="nav-inner">
              <a href="/" className="nav-logo">Stella Chart</a>
              <ul className="nav-links">
                <li><a href="/daily">每日運勢</a></li>
                <li><a href="/weekly">每週運勢</a></li>
                <li><a href="/compatibility">相容度</a></li>
                <li><a href="/#zodiac">Zodiac</a></li>
              </ul>
            </div>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="footer-logo">Stella Chart</div>
          <p>The cosmos speaks in patterns.</p>
        </footer>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var nav = document.getElementById('mainNav');
            if (!nav) return;
            window.addEventListener('scroll', function() {
              if (window.scrollY > 50) {
                nav.classList.add('scrolled');
              } else {
                nav.classList.remove('scrolled');
              }
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
