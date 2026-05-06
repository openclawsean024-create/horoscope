'use client';

import Link from 'next/link';
import { useState } from 'react';
import { zodiacData, COMPATIBILITY } from '@/lib/data';

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

const DIMENSIONS = ['溝通', '信任', '情感', '價值觀', '性生活'];

function getDimensionScore(sign1: string, sign2: string, dim: number): number {
  const seed = sign1.charCodeAt(dim % sign1.length) + sign2.charCodeAt(dim % sign2.length);
  return 2 + (seed % 4);
}

export default function CompatibilityPage() {
  const [calc1, setCalc1] = useState('aries');
  const [calc2, setCalc2] = useState('leo');
  const [showResult, setShowResult] = useState(false);

  const score = getCompatScore(calc1, calc2);
  const compatLabel = getCompatLabel(score);

  return (
    <div className="compat-page">
      <div className="container">
        <Link href="/" className="detail-back">← 返回首頁</Link>
      </div>

      <div className="compat-hero">
        <div className="section-label">Synastry</div>
        <h1 className="compat-title">星座相容度</h1>
        <div className="section-ornament">
          <span className="section-ornament-line" />
          <span className="section-ornament-star">✦</span>
          <span className="section-ornament-line" />
        </div>
        <p className="compat-subtitle">選擇兩個星座，探索彼此的星象和諧度</p>
      </div>

      <div className="compat-content">
        <div className="compat-calculator-full">
          <div className="compat-selectors-full">
            <div className="compat-select-group-full">
              <label className="compat-select-label">第一星座</label>
              <div className="compat-sign-display">
                <span className="compat-sign-large">{zodiacData[calc1].emoji}</span>
                <span className="compat-sign-name">{zodiacData[calc1].name}</span>
              </div>
              <select
                className="compat-select-full"
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

            <div className="compat-vs-badge-large">×</div>

            <div className="compat-select-group-full">
              <label className="compat-select-label">第二星座</label>
              <div className="compat-sign-display">
                <span className="compat-sign-large">{zodiacData[calc2].emoji}</span>
                <span className="compat-sign-name">{zodiacData[calc2].name}</span>
              </div>
              <select
                className="compat-select-full"
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
            className="compat-btn-full"
            onClick={() => setShowResult(true)}
          >
            計算相容度
          </button>

          <div className={`compat-result-full ${showResult ? 'visible' : ''}`}>
            <div className="compat-result-header">
              <span className="compat-result-emoji">{zodiacData[calc1].emoji}</span>
              <span className="compat-result-vs">×</span>
              <span className="compat-result-emoji">{zodiacData[calc2].emoji}</span>
            </div>
            <div className="compat-score-large">
              {score}<span className="compat-score-max-large">/5</span>
            </div>
            <div className="compat-rating-full">{compatLabel.text}</div>
            <p className="compat-desc-full">{compatLabel.desc}</p>

            <div className="compat-dimensions">
              <div className="compat-dimensions-title">五維度分析</div>
              {DIMENSIONS.map((dim, i) => {
                const dimScore = getDimensionScore(calc1, calc2, i);
                return (
                  <div key={dim} className="compat-dimension-row">
                    <span className="compat-dimension-label">{dim}</span>
                    <div className="compat-dimension-bar-bg">
                      <div
                        className="compat-dimension-bar-fill"
                        style={{ width: `${(dimScore / 5) * 100}%` }}
                      />
                    </div>
                    <span className="compat-dimension-score">{dimScore}/5</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}