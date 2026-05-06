'use client';

import Link from 'next/link';
import { useState } from 'react';
import { zodiacData } from '@/lib/data';

function getSunSign(month: number, day: number): string {
  const signs: [string, number][] = [
    ['aries', 20], ['taurus', 20], ['gemini', 21], ['cancer', 22],
    ['leo', 22], ['virgo', 22], ['libra', 23], ['scorpio', 22],
    ['sagittarius', 21], ['capricorn', 20], ['aquarius', 19], ['pisces', 20],
  ];
  const idx = month === 0 ? 10 : month === 1 ? 10 : month === 2 ? (day < 21 ? 0 : 1) : month === 3 ? (day < 21 ? 1 : 2) :
    month === 4 ? (day < 21 ? 2 : 3) : month === 5 ? (day < 22 ? 3 : 4) : month === 6 ? (day < 22 ? 4 : 5) :
    month === 7 ? (day < 22 ? 5 : 6) : month === 8 ? (day < 23 ? 6 : 7) : month === 9 ? (day < 23 ? 7 : 8) :
    month === 10 ? (day < 22 ? 8 : 9) : (day < 20 ? 9 : 10);
  // Simplified approach
  const dateKey = month * 100 + day;
  if (dateKey < 120) return 'capricorn';
  if (dateKey < 219) return 'aquarius';
  if (dateKey < 321) return 'pisces';
  if (dateKey < 420) return 'aries';
  if (dateKey < 521) return 'taurus';
  if (dateKey < 621) return 'gemini';
  if (dateKey < 722) return 'cancer';
  if (dateKey < 823) return 'leo';
  if (dateKey < 923) return 'virgo';
  if (dateKey < 1023) return 'libra';
  if (dateKey < 1122) return 'scorpio';
  if (dateKey < 1221) return 'sagittarius';
  return 'capricorn';
}

function getMoonSign(month: number, day: number, hour: number): string {
  // Simplified lunar sign approximation based on date + hour seed
  const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
  const seed = (month * 31 + day + hour) % 12;
  return signs[seed];
}

function getRisingSign(sunSign: string, hour: number): string {
  // Simplified rising sign - in reality depends on exact birth time and location
  const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
  const sunIdx = signs.indexOf(sunSign);
  const risingIdx = (sunIdx + (hour % 12)) % 12;
  return signs[risingIdx];
}

function getSignDescription(sign: string): string {
  const descs: Record<string, string> = {
    aries: '牡羊座的你充滿行動力與衝勁，如同春天的第一道陽光，總是迫不及待地率先行動。',
    taurus: '金牛座的你腳踏實地、務實穩定，是十二星座中最具穩定力量的存在。',
    gemini: '雙子座的你思維敏捷、好奇心旺盛，擁有如水銀般靈活多變的適應力。',
    cancer: '巨蟹座的你情感細膩、富有同情心，如同大海容納萬物，總是給人身邊的人溫暖與安全感。',
    leo: '獅子座的你自信滿滿、魅力四射，天生自帶光環走到哪裡都是焦點所在。',
    virgo: '處女座的你心思細密、追求完美，是天生的品質把關者與分析專家。',
    libra: '天秤座的你優雅公正、社交能力出眾，是天生的外交官與調解者。',
    scorpio: '天蠍座的你洞察力極強、意志力頑強，如同深海般難以探測卻充滿力量。',
    sagittarius: '射手座的你天生樂觀、熱愛自由，如同永不回頭的箭，渴望走遍世界。',
    capricorn: '摩羯座的你務實有毅力，如同登山者般一步一腳印地向著山頂前進。',
    aquarius: '水瓶座的你獨立創新、前瞻性強，彷彿是來自未來的使者，總是想在時代的前端。',
    pisces: '雙魚座的你浪漫敏感、富有想像力，如同清晨霧中的海洋，朦朧而美麗。',
  };
  return descs[sign] || '';
}

export default function ChartPage() {
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthHour, setBirthHour] = useState('');
  const [result, setResult] = useState<{
    sun: string; moon: string; rising: string;
    sunDesc: string; moonDesc: string; risingDesc: string;
  } | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = () => {
    const m = parseInt(birthMonth);
    const d = parseInt(birthDay);
    const h = parseInt(birthHour || '12');

    if (!birthMonth || !birthDay || m < 1 || m > 12 || d < 1 || d > 31) {
      setError('請輸入有效的出生日期');
      return;
    }
    if (h < 0 || h > 23) {
      setError('請輸入有效的出生時間（0-23點）');
      return;
    }

    setError('');
    const sun = getSunSign(m - 1, d);
    const moon = getMoonSign(m, d, h);
    const rising = getRisingSign(sun, h);

    setResult({
      sun,
      moon,
      rising,
      sunDesc: getSignDescription(sun),
      moonDesc: getSignDescription(moon),
      risingDesc: getSignDescription(rising),
    });
  };

  return (
    <div className="chart-page">
      <div className="container">
        <Link href="/" className="detail-back">← 返回首頁</Link>
      </div>

      <div className="chart-hero">
        <div className="section-label">Natal Chart</div>
        <h1 className="chart-title">個人化命盤</h1>
        <div className="section-ornament">
          <span className="section-ornament-line" />
          <span className="section-ornament-star">✦</span>
          <span className="section-ornament-line" />
        </div>
        <p className="chart-subtitle">輸入出生日期與時間，解讀你的三大行星配置</p>
      </div>

      <div className="chart-content">
        {!result ? (
          <div className="chart-form-section">
            <div className="chart-form-card">
              <div className="chart-form-header">
                <div className="chart-form-icon">✦</div>
                <h2>出生資訊</h2>
                <p>請輸入你的出生日期與時間，獲得三大行星配置分析</p>
              </div>
              <div className="chart-form-grid">
                <div className="chart-form-group">
                  <label className="chart-form-label">出生月份</label>
                  <select
                    className="chart-form-select"
                    value={birthMonth}
                    onChange={e => setBirthMonth(e.target.value)}
                  >
                    <option value="">選擇月份</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i + 1}>{i + 1} 月</option>
                    ))}
                  </select>
                </div>
                <div className="chart-form-group">
                  <label className="chart-form-label">出生日期</label>
                  <select
                    className="chart-form-select"
                    value={birthDay}
                    onChange={e => setBirthDay(e.target.value)}
                  >
                    <option value="">選擇日期</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={i + 1}>{i + 1} 日</option>
                    ))}
                  </select>
                </div>
                <div className="chart-form-group">
                  <label className="chart-form-label">出生時辰（可選）</label>
                  <select
                    className="chart-form-select"
                    value={birthHour}
                    onChange={e => setBirthHour(e.target.value)}
                  >
                    <option value="">大約即可</option>
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{i.toString().padStart(2, '0')}:00</option>
                    ))}
                  </select>
                </div>
              </div>
              {error && <div className="chart-form-error">{error}</div>}
              <button className="chart-generate-btn" onClick={handleGenerate}>
                <span>✦ 生成命盤 ✦</span>
              </button>
              <p className="chart-form-note">
                💡 出生時間影響上升星座與月亮星座的準確度，若不記得可點「生成命盤」獲得大致分析
              </p>
            </div>

            <div className="chart-info-card">
              <h3 className="chart-info-title">什麼是三大行星？</h3>
              <div className="chart-info-items">
                <div className="chart-info-item">
                  <span className="chart-info-emoji">☀️</span>
                  <div>
                    <div className="chart-info-name">太陽星座</div>
                    <div className="chart-info-desc">你的核心本質、生命力的來源。代表你最基本的性格特徵與人生方向。</div>
                  </div>
                </div>
                <div className="chart-info-item">
                  <span className="chart-info-emoji">☽</span>
                  <div>
                    <div className="chart-info-name">月亮星座</div>
                    <div className="chart-info-desc">你的情感核心、直覺與潛意識。代表你內心世界的需求與情感反應模式。</div>
                  </div>
                </div>
                <div className="chart-info-item">
                  <span className="chart-info-emoji">⭐</span>
                  <div>
                    <div className="chart-info-name">上升星座</div>
                    <div className="chart-info-desc">你的外在表現、給他人的第一印象。代表你在世間行走時的面具與風格。</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="chart-result-section">
            <div className="chart-result-header">
              <h2 className="chart-result-title">你的三大行星配置</h2>
              <p className="chart-result-subtitle">命盤分析（注意：此為簡化版本，專業命盤需精確出生時間與地點）</p>
            </div>
            <div className="chart-three-signs">
              <div className="chart-sign-card sun">
                <div className="chart-sign-emoji">{zodiacData[result.sun].emoji}</div>
                <div className="chart-sign-type">太陽星座</div>
                <div className="chart-sign-name">{zodiacData[result.sun].name}</div>
                <div className="chart-sign-name-en">{zodiacData[result.sun].nameEN}</div>
                <div className="chart-sign-symbol">{zodiacData[result.sun].symbol}</div>
                <p className="chart-sign-desc">{result.sunDesc}</p>
                <div className="chart-sign-element">{zodiacData[result.sun].element}元素</div>
              </div>
              <div className="chart-sign-card moon">
                <div className="chart-sign-emoji">{zodiacData[result.moon].emoji}</div>
                <div className="chart-sign-type">月亮星座</div>
                <div className="chart-sign-name">{zodiacData[result.moon].name}</div>
                <div className="chart-sign-name-en">{zodiacData[result.moon].nameEN}</div>
                <div className="chart-sign-symbol">{zodiacData[result.moon].symbol}</div>
                <p className="chart-sign-desc">{result.moonDesc}</p>
                <div className="chart-sign-element">{zodiacData[result.moon].element}元素</div>
              </div>
              <div className="chart-sign-card rising">
                <div className="chart-sign-emoji">{zodiacData[result.rising].emoji}</div>
                <div className="chart-sign-type">上升星座</div>
                <div className="chart-sign-name">{zodiacData[result.rising].name}</div>
                <div className="chart-sign-name-en">{zodiacData[result.rising].nameEN}</div>
                <div className="chart-sign-symbol">{zodiacData[result.rising].symbol}</div>
                <p className="chart-sign-desc">{result.risingDesc}</p>
                <div className="chart-sign-element">{zodiacData[result.rising].element}元素</div>
              </div>
            </div>

            <div className="chart-reading-card">
              <h3 className="chart-reading-title">命盤解讀</h3>
              <p className="chart-reading-text">
                你的太陽星座是<strong>{zodiacData[result.sun].name}</strong>，這是你生命中最核心的驅動力。
                月亮星座<strong>{zodiacData[result.moon].name}</strong>則代表你內心深處的情感需求與直覺反應。
                上升星座<strong>{zodiacData[result.rising].name}</strong>是你面對世界時的外在表現。
              </p>
              <p className="chart-reading-text">
                當<strong>{zodiacData[result.sun].element}</strong>元素的太陽，
                遇上<strong>{zodiacData[result.moon].element}</strong>元素的月亮，
                以及<strong>{zodiacData[result.rising].element}</strong>元素的上升，
                你的生命課題是整合這三種能量的互動，找到內在與外在的平衡點。
              </p>
            </div>

            <div className="chart-result-actions">
              <button className="chart-retry-btn" onClick={() => setResult(null)}>
                ← 重新輸入
              </button>
              <Link href={`/${result.sun}`} className="chart-detail-link">
                查看完整星座分析 →
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="chart-footer-note">
        命盤分析僅供參考，專業占星需考慮更多星體位置與宮位。
      </div>
    </div>
  );
}
