'use client';

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { zodiacData, monthNames, type ZodiacSign } from '@/data/zodiac';
import TarotReading from '@/components/TarotReading';

export default function Home() {
  const [zodiac, setZodiac] = useState<ZodiacSign | ''>('');
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [sessionId] = useState(() => nanoid());
  const [showResult, setShowResult] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from localStorage
    const saved = localStorage.getItem('horoscope-session');
    if (saved) {
      const data = JSON.parse(saved);
      setZodiac(data.zodiac || '');
      setBirthMonth(data.birthMonth || 1);
      if (data.zodiac) setShowResult(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zodiac) return;
    
    const data = { zodiac, birthMonth, sessionId };
    localStorage.setItem('horoscope-session', JSON.stringify(data));
    setShowResult(true);
  };

  const handleReset = () => {
    setZodiac('');
    setBirthMonth(1);
    setShowResult(false);
    localStorage.removeItem('horoscope-session');
  };

  if (!mounted) return null;

  const data = zodiac ? zodiacData[zodiac] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            ✨ 星座分析 ✨
          </h1>
          <p className="text-purple-300 text-sm">探索你的星座命盤</p>
        </div>

        {/* Input Form */}
        {!showResult ? (
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            <div className="space-y-6">
              {/* Zodiac Select */}
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-3">選擇星座</label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {Object.entries(zodiacData).map(([key, sign]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setZodiac(key as ZodiacSign)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        zodiac === key
                          ? 'bg-purple-600 ring-2 ring-purple-400'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-2xl mb-1">{sign.emoji}</div>
                      <div className="text-xs font-medium">{sign.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Month Select */}
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-3">出生月份</label>
                <select
                  value={birthMonth}
                  onChange={e => setBirthMonth(Number(e.target.value))}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {monthNames.map((name, i) => (
                    <option key={i} value={i + 1} className="bg-slate-800">{name}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={!zodiac}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all"
              >
                分析我的星座 ✨
              </button>
            </div>
          </form>
        ) : (
          /* Results */
          <div className="space-y-6">
            {/* Main Card */}
            {data && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{data.emoji}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{data.name}</h2>
                    <p className="text-purple-300 text-sm">元素：{data.element}</p>
                  </div>
                </div>

                {/* Personality */}
                <div className="mb-6">
                  <h3 className="text-purple-300 text-sm font-medium mb-2">基本性格</h3>
                  <p className="text-white/90 leading-relaxed">{data.personality}</p>
                </div>

                {/* Lucky Info */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-1">🎨</div>
                    <div className="text-xs text-purple-300">幸運色</div>
                    <div className="font-semibold">{data.luckyColor}</div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-1">🔢</div>
                    <div className="text-xs text-purple-300">幸運數</div>
                    <div className="font-semibold">{data.luckyNumber}</div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-1">🧭</div>
                    <div className="text-xs text-purple-300">幸運方向</div>
                    <div className="font-semibold">{data.luckyDirection}</div>
                  </div>
                </div>

                {/* Care Points */}
                <div className="mb-6">
                  <h3 className="text-purple-300 text-sm font-medium mb-2">保養重點</h3>
                  <ul className="space-y-1">
                    {data.carePoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
                        <span>•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compatible Signs */}
                <div>
                  <h3 className="text-purple-300 text-sm font-medium mb-2">相配星座</h3>
                  <div className="flex gap-2 flex-wrap">
                    {data.compatibleSigns.map(sign => (
                      <span key={sign} className="px-3 py-1 bg-pink-900/30 rounded-full text-pink-300 text-sm">
                        {zodiacData[sign].emoji} {zodiacData[sign].name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tarot Reading */}
            {data && <TarotReading zodiacSign={data.name} birthMonth={birthMonth} />}

            {/* Session ID */}
            <div className="text-center text-purple-400/50 text-xs">
              Session ID：{sessionId}
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-purple-300 rounded-lg transition-all"
            >
              重新選擇星座
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
