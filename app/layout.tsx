import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '星座分析 | Horoscope',
  description: '探索你的星座命盤，分析性格、幸運資訊、保養重點與塔羅占卜',
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
              <a href="/" className="nav-logo">星座分析</a>
              <ul className="nav-links">
                <li><a href="/#zodiac">星座命盤</a></li>
                <li><a href="/#compat">相容度</a></li>
              </ul>
            </div>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="footer-logo">星座分析</div>
          <p>探索星辰，認識自我</p>
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
