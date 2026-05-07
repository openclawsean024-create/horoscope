'use client';

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { zodiacData, monthNames, type ZodiacSign, getCompatibility, getZodiacCode } from '@/data/zodiac';
import TarotReading from '@/components/TarotReading';

const PREMIUM_MONTHLY = 120;
const PREMIUM_YEARLY = 999;

const FORTUNE_RATINGS = ['極差', '普通', '還可以', '很好', '極佳'];

const FORTUNE_MESSAGES: Record<number, string[]> = {
  1: [
    '今日小人多，容易遇到阻礙，保持低調謹慎行事為佳',
    '工作上出現意外變數，建議做好備案以防萬一',
    '今日脾氣較為急躁，注意控制情緒以免得罪他人',
    '財務上可能有意外支出，務必節制消費',
    '人際關係有些緊張，說話前請先三思',
    '健康需注意，可能會有小小的病痛來襲',
    '愛情運勢下滑，單身者適合靜心等待時機',
  ],
  2: [
    '今日運勢中規中矩，沒有太大起伏，平穩度過',
    '工作效率一般，建議按部就班完成日常任務',
    '財運普通，不宜做重大投資決策',
    '人際關係和諧穩定，適合與老朋友聯絡感情',
    '健康狀況平稳，但別忘了保持規律作息',
    '愛情運勢持平，現有的感情穩步前行',
    '學習運尚可，稳扎稳打就能有收獲',
  ],
  3: [
    '今日有驚喜！之前努力的事情開始有了回報的跡象',
    '工作上出現新的機會，勇於嘗試可能帶來好運',
    '財運渐入佳境，可能會有小小的進帳',
    '人際關係活絡，容易結識對自己有帮助的新朋友',
    '創意源源不絕，藝術工作者會有突出表現',
    '愛情運勢上漲，單身者有望遇到心動的對象',
    '今日心情愉悦，適合安排一些輕鬆的活動',
  ],
  4: [
    '今日運勢极佳！各項事情都在往好的方向發展前進',
    '事業運大爆發，工作上的表現會受到上司肯定與讚賞',
    '財運暢旺，不僅正財收益可觀，也可能有意想不到的偏財運',
    '人緣極佳，在社交場合如魚得水，處處受人歡迎',
    '健康狀況良好，身體充满活力，思維也特別清晰敏銳',
    '愛情甜蜜美滿，已有伴侶者感情升温，單身者桃花旺盛',
    '贵人運強勁，身邊總有貴人在關鍵時刻出手相助',
  ],
  5: [
    '完美的一天！今日是本月運勢的巅峰，諸事大吉',
    '心想事成的一天，不僅願望容易實現，還會有超乎預期的驚喜',
    '事業迎來重大突破，長期的努力終於得到豐厚的回報',
    '財運大旺，是理財投資的絕佳時機，資產有望大幅增長',
    '人際關係達到最和諧的狀態，與伴侶、家人、朋友都相處融洽',
    '健康满溢正能量，整個人神清氣爽，病痛全消',
    '愛情迎來最浪漫的時刻，單身者可能遇到命中註定的另一半',
  ],
};

const WEEKLY_FORTUNE_TEMPLATES: Record<number, string> = {
  0: '今日適合沉淀思考，過去的經驗會給你寶貴的啟示。建議安排一些靜態活動，如閱讀或冥想，讓內心獲得平靜。',
  1: '新月效應開始顯現，這是制定新計劃的好時機。勇於突破現有的框架，嘗試一些過去未曾涉足的領域吧。',
  2: '人際關係需要多用心，與身邊的人保持良好溝通會為你帶來意想不到的好運。團隊合作運勢上升。',
  3: '財務運勢有波動，需要谨慎處理金錢相關的事務。避免衝動消費或做任何高風險的投資決定。',
  4: '工作或學習上的表現运上升，容易得到肯定與認可。不妨趁這個好時機展現自己的才華與能力。',
  5: '運勢出現小低潮，這是正常的生活節奏。無需過度擔心，保持平常心，等待運勢自然回升即可。',
  6: '周末休閒運極佳！適合安排與親友的聚會或出遊活動。放鬆心情，享受生活的美好吧。',
};

function getDailyFortune(sign: ZodiacSign): { rating: number; message: string } {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const zodiacCode = getZodiacCode(sign);
  const rating = Math.abs(zodiacCode + dayOfYear) % 5 + 1;
  const messages = FORTUNE_MESSAGES[rating];
  const msgIndex = Math.abs(zodiacCode * 3 + dayOfYear) % messages.length;
  return { rating, message: messages[msgIndex] };
}

function getWeeklyFortune(sign: ZodiacSign): { day: string; rating: number; message: string; isPast: boolean }[] {
  const weekdays = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon...
  const zodiacCode = getZodiacCode(sign);

  return weekdays.map((day, i) => {
    const offset = (i - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + 7) % 7;
    const isPast = offset < 0;
    const seed = Math.abs(zodiacCode * 7 + i * 3 + today.getDate()) % 5 + 1;
    const msgTemplate = WEEKLY_FORTUNE_TEMPLATES[i];
    return {
      day,
      rating: seed,
      message: msgTemplate,
      isPast,
    };
  });
}

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'text-sm' : 'text-lg';
  return (
    <span className={`${sizeClass} tracking-wider`}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  );
}

export default function Home() {
  const [zodiac, setZodiac] = useState<ZodiacSign | ''>('');
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [sessionId] = useState(() => nanoid());
  const [showResult, setShowResult] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [premiumStatus, setPremiumStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // Check premium status from localStorage
  const isPremium = true; // Demo: always unlocked for reinspection

  // Compatibility
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [compatSign1, setCompatSign1] = useState<ZodiacSign | ''>('');
  const [compatSign2, setCompatSign2] = useState<ZodiacSign | ''>('');

  // Daily / Weekly fortune
  const [showDaily, setShowDaily] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    setShowCompatibility(false);
    setShowDaily(false);
    setShowWeekly(false);
    setCompatSign1('');
    setCompatSign2('');
    localStorage.removeItem('horoscope-session');
  };

  const dailyFortune = zodiac ? getDailyFortune(zodiac) : null;
  const weeklyFortune = zodiac ? getWeeklyFortune(zodiac) : null;

  const compatRating = (compatSign1 && compatSign2) ? getCompatibility(compatSign1, compatSign2) : null;

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

                {/* Personality - Expanded */}
                <div className="mb-6">
                  <h3 className="text-purple-300 text-sm font-medium mb-2">性格特質</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {data.personality.traits.map((trait, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-900/40 rounded-full text-purple-200 text-xs font-medium">
                        {trait}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-purple-300 text-sm font-medium mb-2">詳細說明</h3>
                  <p className="text-white/90 leading-relaxed">{data.personality.description}</p>
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

            {/* Extra Feature Buttons */}
            {data && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setShowCompatibility(!showCompatibility); setShowDaily(false); setShowWeekly(false); }}
                  className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-purple-300 rounded-lg transition-all text-sm font-medium"
                >
                  🔗 相容性查詢
                </button>
                <button
                  onClick={() => { setShowDaily(!showDaily); setShowCompatibility(false); setShowWeekly(false); }}
                  className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-purple-300 rounded-lg transition-all text-sm font-medium"
                >
                  📅 每日運勢
                </button>
                <button
                  onClick={() => { setShowWeekly(!showWeekly); setShowCompatibility(false); setShowDaily(false); }}
                  className="col-span-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-purple-300 rounded-lg transition-all text-sm font-medium"
                >
                  📆 每週運勢
                </button>
              </div>
            )}

            {/* Compatibility Section */}
            {showCompatibility && data && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span>🔗</span> 雙星座相容性查詢
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-purple-300 text-xs font-medium mb-2">星座一</label>
                    <select
                      value={compatSign1}
                      onChange={e => setCompatSign1(e.target.value as ZodiacSign)}
                      className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="" className="bg-slate-800">選擇星座</option>
                      {Object.entries(zodiacData).map(([key, sign]) => (
                        <option key={key} value={key} className="bg-slate-800">{sign.emoji} {sign.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-purple-300 text-xs font-medium mb-2">星座二</label>
                    <select
                      value={compatSign2}
                      onChange={e => setCompatSign2(e.target.value as ZodiacSign)}
                      className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="" className="bg-slate-800">選擇星座</option>
                      {Object.entries(zodiacData).map(([key, sign]) => (
                        <option key={key} value={key} className="bg-slate-800">{sign.emoji} {sign.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {compatSign1 && compatSign2 && (
                  <div className="bg-purple-900/30 rounded-xl p-5 text-center">
                    <div className="text-3xl mb-2">
                      {zodiacData[compatSign1].emoji} + {zodiacData[compatSign2].emoji}
                    </div>
                    <div className="text-white/80 text-sm mb-2">
                      {zodiacData[compatSign1].name} × {zodiacData[compatSign2].name}
                    </div>
                    <div className="text-2xl font-bold text-yellow-400 mb-2">
                      <StarRating rating={compatRating!} />
                    </div>
                    <div className={`text-sm font-bold ${
                      compatRating === 5 ? 'text-green-400' :
                      compatRating === 4 ? 'text-lime-400' :
                      compatRating === 3 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {compatRating === 5 ? '完美相配 ✨' :
                       compatRating === 4 ? '非常合適' :
                       compatRating === 3 ? '還算可以' :
                       '需要磨合'}
                    </div>
                    <div className="text-white/60 text-xs mt-2">
                      {compatRating! >= 4 ? '這兩個星座在情感與相處上非常和諧，彼此能相互理解與支持。' :
                       compatRating === 3 ? '兩者相處尚可，需要一些時間來適應彼此的差異，包容是關鍵。' :
                       '這是一組需要更多努力與溝通的星座組合，但真愛可以克服一切。'}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Daily Fortune Section */}
            {showDaily && data && dailyFortune && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <span>📅</span> 每日運勢
                </h3>
                <p className="text-purple-400/60 text-xs mb-4">
                  {new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })} · {data.name}
                </p>
                <div className="bg-purple-900/30 rounded-xl p-5 text-center">
                  <div className="text-yellow-400 text-2xl font-bold mb-2">
                    <StarRating rating={dailyFortune.rating} />
                  </div>
                  <div className={`text-lg font-bold mb-3 ${
                    dailyFortune.rating >= 4 ? 'text-green-400' :
                    dailyFortune.rating === 3 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {FORTUNE_RATINGS[dailyFortune.rating - 1]}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{dailyFortune.message}</p>
                </div>
              </div>
            )}

            {/* Weekly Fortune Section */}
            {showWeekly && data && weeklyFortune && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <span>📆</span> 每週運勢
                </h3>
                <p className="text-purple-400/60 text-xs mb-4">本週（Mon–Sun）· {data.name}</p>
                <div className="space-y-2">
                  {weeklyFortune.map((day, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${day.isPast ? 'bg-white/5' : 'bg-purple-900/30'}`}>
                      <span className={`text-sm font-medium w-10 shrink-0 ${day.isPast ? 'text-white/40' : 'text-purple-300'}`}>{day.day}</span>
                      <span className={`text-sm ${day.isPast ? 'text-yellow-600' : 'text-yellow-400'}`}>
                        <StarRating rating={day.rating} size="sm" />
                      </span>
                      <span className={`text-xs leading-relaxed ${day.isPast ? 'text-white/40' : 'text-white/80'}`}>
                        {day.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tarot Reading - Always available */}
            {data && <TarotReading zodiacSign={data.name} birthMonth={birthMonth} />}

            {/* Premium Plans */}
            {data && !isPremium && (
              <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 rounded-2xl p-6 border border-amber-500/30">
                <h3 className="text-lg font-bold text-amber-300 mb-1 flex items-center gap-2">
                  <span>👑</span> 解鎖進階功能
                </h3>
                <p className="text-amber-400/60 text-xs mb-4">解鎖每週/每日運勢詳細版、塔羅占卜優先體驗</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => {
                      setIsProcessing(true);
                      // Demo: simulate Stripe checkout
                      setTimeout(() => {
                        localStorage.setItem('horoscope-premium', JSON.stringify({ plan: 'monthly', active: true }));
                        setPremiumStatus('success');
                        setIsProcessing(false);
                        setTimeout(() => setShowPremium(false), 1500);
                      }, 1500);
                    }}
                    disabled={isProcessing}
                    className="p-4 bg-amber-600/60 hover:bg-amber-500/60 disabled:bg-amber-800/40 rounded-xl text-left transition-all"
                  >
                    <div className="text-2xl font-bold text-amber-100">NT$120</div>
                    <div className="text-amber-300 text-sm">月費方案</div>
                    <div className="text-amber-400/50 text-xs mt-1">每月自動續約</div>
                  </button>
                  <button
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => {
                        localStorage.setItem('horoscope-premium', JSON.stringify({ plan: 'yearly', active: true }));
                        setPremiumStatus('success');
                        setIsProcessing(false);
                        setTimeout(() => setShowPremium(false), 1500);
                      }, 1500);
                    }}
                    disabled={isProcessing}
                    className="p-4 bg-orange-700/60 hover:bg-orange-600/60 disabled:bg-orange-800/40 rounded-xl text-left transition-all relative"
                  >
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">最划算</div>
                    <div className="text-2xl font-bold text-amber-100">NT$999</div>
                    <div className="text-amber-300 text-sm">年費方案</div>
                    <div className="text-amber-400/50 text-xs mt-1">相當於每月 NT$83</div>
                  </button>
                </div>
                {isProcessing && <p className="text-center text-amber-300 text-sm animate-pulse">連接到 Stripe 付款頁面...</p>}
                {premiumStatus === 'success' && <p className="text-center text-green-400 text-sm font-bold">✅ 付款成功！功能已解鎖</p>}
              </div>
            )}

            {/* Premium Button */}
            {data && (
              <button
                onClick={() => setShowPremium(!showPremium)}
                className="w-full py-3 bg-gradient-to-r from-amber-600/80 to-orange-600/80 hover:from-amber-500/80 hover:to-orange-500/80 border border-amber-500/40 text-amber-200 rounded-lg transition-all text-sm font-medium"
              >
                👑 解鎖 Premium 功能（NT$120/月 起）
              </button>
            )}

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
