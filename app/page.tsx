'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { zodiacData, COMPATIBILITY, ELEMENT_COLORS } from '@/lib/data';

const ZODIAC_ORDER = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

function getCompatScore(sign1: string, sign2: string): number {
  const key1 = `${sign1}-${sign2}`;
  const key2 = `${sign2}-${sign1}`;
  return COMPATIBILITY[key1] ?? COMPATIBILITY[key2] ?? 2;
}

function getCompatLabel(score: number): { text: string; desc: string } {
  if (score >= 5) return { text: 'Ideal Match', desc: 'A celestial connection — you move in perfect resonance.' };
  if (score >= 4) return { text: 'Strong Harmony', desc: 'Natural understanding flows between you effortlessly.' };
  if (score >= 3) return { text: 'Moderate Sync', desc: 'Potential exists — harmony requires conscious cultivation.' };
  return { text: 'Dissonant Elements', desc: 'Fundamental differences demand patience and genuine effort.' };
}

export default function HomePage() {
  const [calc1, setCalc1] = useState('aries');
  const [calc2, setCalc2] = useState('leo');
  const [showResult, setShowResult] = useState(false);

  // Featured sign for daily horoscope preview — changes by day-of-week
  const [featuredSign, setFeaturedSign] = useState<string>('aries');
  useEffect(() => {
    const dayIndex = new Date().getDay();
    const signs = ['aries', 'leo', 'sagittarius', 'cancer', 'scorpio', 'pisces', 'libra'];
    setFeaturedSign(signs[dayIndex]);
  }, []);

  const featuredData = zodiacData[featuredSign];
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
  const dayOfWeek = dayNames[today.getDay()];
  const daySeed = featuredSign.charCodeAt(0) + today.getDate();
  const FORTUNES = [
    { love: '單身者有意外邂逅的機會，已有伴者感情升溫。', career: '工作上嶄露頭角，有貴人相助。', money: '有意外之財，但宜低調處理。', health: '注意腸胃保健，避免暴飲暴食。' },
    { love: '愛情運勢良好，適合與伴侶共度時光。', career: '保持現狀，穩扎穩打地前進。', money: '財務狀況平穩，適合儲蓄。', health: '身體狀況不錯，精神充沛。' },
    { love: '爛桃花警訊，與異性來往宜保持距離。', career: '小人運旺，須謹言慎行以防口舌是非。', money: '有破財之兆，投資理財應保守為上。', health: '舊疾可能復發，應多休息。' },
    { love: '暗戀者迎來心動信號，勇於表達會有好結果。', career: '事業邁入新階段，迎來轉機。', money: '偏財運佳，可能有小額獎金入帳。', health: '體力充沛，但注意交通安全。' },
    { love: '與伴侶溝通順暢，感情更加穩固。', career: '創造力爆棚，提案有望獲得青睞。', money: '金錢運普通，應避免衝動消費。', health: '健康運佳，適合戶外活動。' },
    { love: '單身者眼光過高，需調整心態才能遇見正緣。', career: '上司對你印象良好，升遷有望。', money: '正財運穩定，偏財則不宜強求。', health: '壓力大時可透過冥想舒緩。' },
  ];
  const dailyFortune = FORTUNES[daySeed % FORTUNES.length];

  const score = getCompatScore(calc1, calc2);
  const compatLabel = getCompatLabel(score);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-constellation hero-constellation-left" aria-hidden="true">
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="80" r="2" fill="#c8a96e" opacity="0.5"/>
            <circle cx="120" cy="40" r="1.5" fill="#c8a96e" opacity="0.35"/>
            <circle cx="200" cy="100" r="2" fill="#c8a96e" opacity="0.45"/>
            <circle cx="160" cy="180" r="1.5" fill="#c8a96e" opacity="0.3"/>
            <circle cx="80" cy="240" r="2" fill="#c8a96e" opacity="0.4"/>
            <circle cx="260" cy="200" r="1.5" fill="#c8a96e" opacity="0.35"/>
            <circle cx="40" cy="160" r="1.5" fill="#c8a96e" opacity="0.3"/>
            <line x1="60" y1="80" x2="120" y2="40" stroke="#c8a96e" strokeWidth="0.5" opacity="0.25"/>
            <line x1="120" y1="40" x2="200" y2="100" stroke="#c8a96e" strokeWidth="0.5" opacity="0.25"/>
            <line x1="200" y1="100" x2="160" y2="180" stroke="#c8a96e" strokeWidth="0.5" opacity="0.25"/>
            <line x1="160" y1="180" x2="80" y2="240" stroke="#c8a96e" strokeWidth="0.5" opacity="0.25"/>
            <line x1="80" y1="240" x2="40" y2="160" stroke="#c8a96e" strokeWidth="0.5" opacity="0.25"/>
            <line x1="40" y1="160" x2="60" y2="80" stroke="#c8a96e" strokeWidth="0.5" opacity="0.25"/>
            <line x1="200" y1="100" x2="260" y2="200" stroke="#c8a96e" strokeWidth="0.5" opacity="0.2"/>
            <line x1="160" y1="180" x2="260" y2="200" stroke="#c8a96e" strokeWidth="0.5" opacity="0.2"/>
          </svg>
        </div>
        <div className="hero-constellation hero-constellation-right" aria-hidden="true">
          <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="240" cy="60" r="2" fill="#c8a96e" opacity="0.45"/>
            <circle cx="180" cy="30" r="1.5" fill="#c8a96e" opacity="0.35"/>
            <circle cx="100" cy="80" r="2" fill="#c8a96e" opacity="0.5"/>
            <circle cx="60" cy="160" r="1.5" fill="#c8a96e" opacity="0.3"/>
            <circle cx="140" cy="220" r="2" fill="#c8a96e" opacity="0.45"/>
            <circle cx="220" cy="180" r="1.5" fill="#c8a96e" opacity="0.35"/>
            <line x1="240" y1="60" x2="180" y2="30" stroke="#c8a96e" strokeWidth="0.5" opacity="0.25"/>
            <line x1="180" y1="30" x2="100" y2="80" stroke="#c8a96e" strokeWidth="0.5" opacity="0.25"/>
            <line x1="100" y1="80" x2="60" y2="160" stroke="#c8a96e" strokeWidth="0.5" opacity="0.25"/>
            <line x1="60" y1="160" x2="140" y2="220" stroke="#c8a96e" strokeWidth="0.5" opacity="0.25"/>
            <line x1="140" y1="220" x2="220" y2="180" stroke="#c8a96e" strokeWidth="0.5" opacity="0.25"/>
            <line x1="220" y1="180" x2="240" y2="60" stroke="#c8a96e" strokeWidth="0.5" opacity="0.2"/>
          </svg>
        </div>

        <div className="hero-eyebrow">Astronomy · Divination</div>
        <h1 className="hero-title">
          <span className="hero-title-main">Stella</span>
          <span className="hero-title-sub">Chart</span>
        </h1>
        <div className="hero-rule" />
        <p className="hero-description">
          The cosmos speaks in patterns. Explore your zodiac identity
          through an elegant lens — deep, precise, timeless.
        </p>
        <div className="hero-divider-line" />
        <a href="#zodiac" className="hero-cta">
          Discover Your Sign
        </a>
        <div className="hero-scroll-indicator" aria-hidden="true">
          <div className="hero-scroll-dot" />
        </div>
      </section>

      {/* Zodiac Grid */}
      <section className="section" id="zodiac">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Twelve Signs</span>
            <h2 className="section-title">Zodiac Archive</h2>
            <div className="section-ornament" aria-hidden="true">
              <span className="section-ornament-line" />
              <span className="section-ornament-star">✦</span>
              <span className="section-ornament-line" />
            </div>
            <p className="section-desc">
              Select a sign to reveal its complete astrological profile
            </p>
          </div>
          <div className="zodiac-grid">
            {ZODIAC_ORDER.map((key) => {
              const sign = zodiacData[key];
              return (
                <Link
                  key={key}
                  href={`/${key}`}
                  className={`zodiac-card element-${sign.element}`}
                >
                  <div className="zodiac-symbol-wrap">
                    <span className="zodiac-symbol">{sign.symbol}</span>
                  </div>
                  <div className="zodiac-info">
                    <div className="zodiac-name-en">{sign.nameEN}</div>
                    <div className="zodiac-name-zh">{sign.name}</div>
                  </div>
                  <div className="zodiac-element-row">
                    <span
                      className="zodiac-element-dot"
                      style={{ background: ELEMENT_COLORS[sign.element] }}
                    />
                    <span className="zodiac-element-label">
                      {sign.element.charAt(0).toUpperCase() + sign.element.slice(1)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Daily Horoscope Preview */}
      <section className="section" id="daily">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Today's Focus</span>
            <h2 className="section-title">每日運勢精選</h2>
            <div className="section-ornament" aria-hidden="true">
              <span className="section-ornament-line" />
              <span className="section-ornament-star">✦</span>
              <span className="section-ornament-line" />
            </div>
            <p className="section-desc">
              {dateStr} 星期{dayOfWeek} · 今日主角：{featuredData.name}（{featuredData.nameEN}）
            </p>
          </div>
          <div className="daily-preview-card">
            <div className="daily-preview-header">
              <span className="daily-preview-emoji">{featuredData.emoji}</span>
              <div>
                <div className="daily-preview-name">{featuredData.name}</div>
                <div className="daily-preview-name-en">{featuredData.nameEN}</div>
              </div>
            </div>
            <div className="daily-preview-items">
              <div className="daily-preview-item">
                <span className="daily-preview-icon">❤️</span>
                <div>
                  <div className="daily-preview-cat">愛情</div>
                  <div className="daily-preview-text">{dailyFortune.love}</div>
                </div>
              </div>
              <div className="daily-preview-item">
                <span className="daily-preview-icon">💼</span>
                <div>
                  <div className="daily-preview-cat">事業</div>
                  <div className="daily-preview-text">{dailyFortune.career}</div>
                </div>
              </div>
              <div className="daily-preview-item">
                <span className="daily-preview-icon">💰</span>
                <div>
                  <div className="daily-preview-cat">財運</div>
                  <div className="daily-preview-text">{dailyFortune.money}</div>
                </div>
              </div>
              <div className="daily-preview-item">
                <span className="daily-preview-icon">🏥</span>
                <div>
                  <div className="daily-preview-cat">健康</div>
                  <div className="daily-preview-text">{dailyFortune.health}</div>
                </div>
              </div>
            </div>
            <div className="daily-preview-footer">
              <Link href={`/${featuredSign}`} className="daily-preview-cta">
                查看完整 {featuredData.name} 星座分析
              </Link>
            </div>
          </div>
          <div className="daily-view-all">
            <Link href="/daily" className="daily-view-all-link">
              查看所有星座今日運勢 →
            </Link>
          </div>
        </div>
      </section>

      {/* Compatibility Calculator */}
      <section className="section section-alt" id="compat">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Compatibility</span>
            <h2 className="section-title">Zodiac Synastry</h2>
            <div className="section-ornament" aria-hidden="true">
              <span className="section-ornament-line" />
              <span className="section-ornament-star">✦</span>
              <span className="section-ornament-line" />
            </div>
            <p className="section-desc">
              Compare two signs to uncover their astrological harmony
            </p>
          </div>
          <div className="compat-calculator">
            <div className="compat-selectors">
              <div className="compat-select-group">
                <label className="compat-select-label">First Sign</label>
                <select
                  className="compat-select"
                  value={calc1}
                  onChange={(e) => { setCalc1(e.target.value); setShowResult(false); }}
                >
                  {ZODIAC_ORDER.map((key) => (
                    <option key={key} value={key}>
                      {zodiacData[key].symbol} {zodiacData[key].nameEN}
                    </option>
                  ))}
                </select>
              </div>
              <div className="compat-vs-badge">×</div>
              <div className="compat-select-group">
                <label className="compat-select-label">Second Sign</label>
                <select
                  className="compat-select"
                  value={calc2}
                  onChange={(e) => { setCalc2(e.target.value); setShowResult(false); }}
                >
                  {ZODIAC_ORDER.map((key) => (
                    <option key={key} value={key}>
                      {zodiacData[key].symbol} {zodiacData[key].nameEN}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="compat-btn"
              onClick={() => setShowResult(true)}
            >
              Calculate Synastry
            </button>
            <div className={`compat-result ${showResult ? 'visible' : ''}`}>
              <div className="compat-result-inner">
                <div className="compat-signs-display">
                  <span className="compat-sign">{zodiacData[calc1].symbol}</span>
                  <span className="compat-vs-text">×</span>
                  <span className="compat-sign">{zodiacData[calc2].symbol}</span>
                </div>
                <div className="compat-score">{score}<span className="compat-score-max">/5</span></div>
                <div className="compat-rating">{compatLabel.text}</div>
                <p className="compat-desc">{compatLabel.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}