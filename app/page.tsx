'use client';

import Link from 'next/link';
import { useState } from 'react';
import { zodiacData, COMPATIBILITY, ELEMENT_COLORS, type ZodiacSign } from '@/lib/data';

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
  if (score >= 5) return { text: '極佳匹配', desc: '你們是天生一對，默契十足。' };
  if (score >= 4) return { text: '非常契合', desc: '彼此理解溝通順暢，感情發展順利。' };
  if (score >= 3) return { text: '中等契合', desc: '需要一些磨合期，但潛力無限。' };
  return { text: '差異較大', desc: '兩人特質迥異，需要更多包容與理解。' };
}

export default function HomePage() {
  const [calc1, setCalc1] = useState('aries');
  const [calc2, setCalc2] = useState('leo');
  const [showResult, setShowResult] = useState(false);

  const score = getCompatScore(calc1, calc2);
  const compatLabel = getCompatLabel(score);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        {/* Constellation SVG decorations */}
        <div className="hero-constellation hero-constellation-left" aria-hidden="true">
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="80" r="2" fill="#d4af37" opacity="0.6"/>
            <circle cx="120" cy="40" r="1.5" fill="#d4af37" opacity="0.4"/>
            <circle cx="200" cy="100" r="2" fill="#d4af37" opacity="0.5"/>
            <circle cx="160" cy="180" r="1.5" fill="#d4af37" opacity="0.3"/>
            <circle cx="80" cy="240" r="2" fill="#d4af37" opacity="0.5"/>
            <circle cx="260" cy="200" r="1.5" fill="#d4af37" opacity="0.4"/>
            <circle cx="40" cy="160" r="1.5" fill="#d4af37" opacity="0.3"/>
            <line x1="60" y1="80" x2="120" y2="40" stroke="#d4af37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="120" y1="40" x2="200" y2="100" stroke="#d4af37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="200" y1="100" x2="160" y2="180" stroke="#d4af37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="160" y1="180" x2="80" y2="240" stroke="#d4af37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="80" y1="240" x2="40" y2="160" stroke="#d4af37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="40" y1="160" x2="60" y2="80" stroke="#d4af37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="200" y1="100" x2="260" y2="200" stroke="#d4af37" strokeWidth="0.5" opacity="0.25"/>
            <line x1="160" y1="180" x2="260" y2="200" stroke="#d4af37" strokeWidth="0.5" opacity="0.25"/>
          </svg>
        </div>
        <div className="hero-constellation hero-constellation-right" aria-hidden="true">
          <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="240" cy="60" r="2" fill="#d4af37" opacity="0.5"/>
            <circle cx="180" cy="30" r="1.5" fill="#d4af37" opacity="0.4"/>
            <circle cx="100" cy="80" r="2" fill="#d4af37" opacity="0.6"/>
            <circle cx="60" cy="160" r="1.5" fill="#d4af37" opacity="0.3"/>
            <circle cx="140" cy="220" r="2" fill="#d4af37" opacity="0.5"/>
            <circle cx="220" cy="180" r="1.5" fill="#d4af37" opacity="0.4"/>
            <line x1="240" y1="60" x2="180" y2="30" stroke="#d4af37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="180" y1="30" x2="100" y2="80" stroke="#d4af37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="100" y1="80" x2="60" y2="160" stroke="#d4af37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="60" y1="160" x2="140" y2="220" stroke="#d4af37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="140" y1="220" x2="220" y2="180" stroke="#d4af37" strokeWidth="0.5" opacity="0.3"/>
            <line x1="220" y1="180" x2="240" y2="60" stroke="#d4af37" strokeWidth="0.5" opacity="0.25"/>
          </svg>
        </div>

        <span className="hero-badge">Celestial Wisdom</span>
        <h1 className="hero-title">
          <em>星座</em> 命盤
        </h1>
        <div className="celestial-ornament" aria-hidden="true">
          <span className="celestial-ornament-symbol">✦</span>
        </div>
        <p className="hero-subtitle">
          探索十二星座的神秘力量，解讀性格特質、幸運密碼與生命課題。
          在星辰之間，找尋屬於你的宇宙指引。
        </p>
        <div className="hero-divider" />
        <a href="#zodiac" className="hero-cta">
          開始探索
        </a>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span>向下</span>
        </div>
      </section>

      {/* Zodiac Grid */}
      <section className="section" id="zodiac">
        <div className="container">
          <div className="section-header">
            <div className="section-ornament" aria-hidden="true">
              <span className="section-ornament-star" />
              <span className="section-ornament-star large" />
              <span className="section-ornament-star" />
            </div>
            <span className="section-label">The Twelve Signs</span>
            <h2 className="section-title">選擇你的星座</h2>
            <div className="celestial-ornament" aria-hidden="true">
              <span className="celestial-ornament-symbol">✦</span>
            </div>
            <p className="section-desc">
              點擊任意星座，探索完整的命盤分析
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
                  <span className="zodiac-emoji">{sign.emoji}</span>
                  <div className="zodiac-name">{sign.name}</div>
                  <div className="zodiac-element">
                    <span
                      className="zodiac-element-dot"
                      style={{ background: ELEMENT_COLORS[sign.element] }}
                    />
                    {sign.element}象
                  </div>
                  <span className="zodiac-arrow">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compatibility Calculator */}
      <section className="section" id="compat">
        <div className="container">
          <div className="section-header">
            <div className="section-ornament" aria-hidden="true">
              <span className="section-ornament-star" />
              <span className="section-ornament-star large" />
              <span className="section-ornament-star" />
            </div>
            <span className="section-label">Compatibility</span>
            <h2 className="section-title">星座相容度</h2>
            <div className="celestial-ornament" aria-hidden="true">
              <span className="celestial-ornament-symbol">✦</span>
            </div>
            <p className="section-desc">
              選擇兩個星座，探索他們之間的契合程度
            </p>
          </div>
          <div className="calc-section">
            <div className="calc-selectors">
              <select
                className="calc-select"
                value={calc1}
                onChange={(e) => { setCalc1(e.target.value); setShowResult(false); }}
              >
                {ZODIAC_ORDER.map((key) => (
                  <option key={key} value={key}>{zodiacData[key].emoji} {zodiacData[key].name}</option>
                ))}
              </select>
              <span className="calc-vs">VS</span>
              <select
                className="calc-select"
                value={calc2}
                onChange={(e) => { setCalc2(e.target.value); setShowResult(false); }}
              >
                {ZODIAC_ORDER.map((key) => (
                  <option key={key} value={key}>{zodiacData[key].emoji} {zodiacData[key].name}</option>
                ))}
              </select>
            </div>
            <button
              className="calc-btn"
              onClick={() => setShowResult(true)}
            >
              查看契合度
            </button>
            <div className={`calc-result ${showResult ? 'visible' : ''}`}>
              <div className="calc-score">{score}/5</div>
              <div className="calc-rating">{compatLabel.text}</div>
              <p className="calc-detail">{compatLabel.desc}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
