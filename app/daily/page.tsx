import Link from 'next/link';
import { Metadata } from 'next';
import { zodiacData } from '@/lib/data';
import PaywallGate from '@/app/components/PaywallGate';

export const metadata: Metadata = {
  title: '每日運勢 | Stella Chart 星座命盤',
  description: '查看今日十二星座愛情、事業、財運、健康每日運勢，由星象能量推演，每日更新。',
  openGraph: {
    title: '每日運勢 — Stella Chart',
    description: '查看今日十二星座愛情、事業、財運、健康每日運勢，由星象能量推演，每日更新。',
    type: 'website',
    locale: 'zh_TW',
  },
};

const ZODIAC_ORDER = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const FORTUNES = [
  { love: '單身者有意外邂逅的機會，已有伴者感情升溫。', career: '工作上嶄露頭角，有貴人相助。', money: '有意外之財，但宜低調處理。', health: '注意腸胃保健，避免暴飲暴食。' },
  { love: '愛情運勢良好，適合與伴侶共度時光。', career: '保持現狀，穩扎穩打地前進。', money: '財務狀況平穩，適合儲蓄。', health: '身體狀況不錯，精神充沛。' },
  { love: '爛桃花警訊，與異性來往宜保持距離。', career: '小人運旺，須謹言慎行以防口舌是非。', money: '有破財之兆，投資理財應保守為上。', health: '舊疾可能復發，應多休息。' },
  { love: '暗戀者迎來心動信號，勇於表達會有好結果。', career: '事業邁入新階段，迎來轉機。', money: '偏財運佳，可能有小額獎金入帳。', health: '體力充沛，但注意交通安全。' },
  { love: '與伴侶溝通順暢，感情更加穩固。', career: '創造力爆棚，提案有望獲得青睞。', money: '金錢運普通，應避免衝動消費。', health: '健康運佳，適合戶外活動。' },
  { love: '單身者眼光過高，需調整心態才能遇見正緣。', career: '上司對你印象良好，升遷有望。', money: '正財運穩定，偏財則不宜強求。', health: '壓力大時可透過冥想舒緩。' },
  { love: '容易因為小事與伴侶起爭執，宜多忍讓。', career: '團隊合作順利，專案進度超前。', money: '金錢流動順暢，有利於談判。', health: '睡眠品質不佳，宜早起早睡。' },
  { love: '桃花運爆棚，社交場合備受矚目。', career: '工作充滿熱情，效率大幅提升。', money: '有貴人指點，投資運上升。', health: '視力保健需注意，長時間用眼應休息。' },
  { love: '適合重新審視舊關係，修復破裂的情感。', career: '腳踏實地會有回報，不宜投機取巧。', money: '財庫穩固，可考慮長期理財規劃。', health: '免疫系統需加強，預防季節性疾病。' },
  { love: '浪漫氛圍濃郁，適合安排約會或婚嫁之事。', career: '事業壓力較大，需適時放鬆調節。', money: '有損耗之兆，避免借貸或作保。', health: '舊傷需特別留意，天氣變化時有不適。' },
  { love: '對感情有新的領悟，內心更加堅定。', career: '突破瓶頸，過去的付出開始展現成果。', money: '財運大開，正偏財均有斬獲。', health: '身心和諧，整體狀態達到高峰。' },
  { love: '內斂低調，不善表達者可能錯失良緣。', career: '低調行事可避開小人，穩步前進。', money: '收支平衡，學習理財知識的好時機。', health: '注意呼吸系統保養，空氣品質要留意。' },
];

function getDaily(sign: string) {
  const seed = sign.charCodeAt(0) + new Date().getDate();
  return FORTUNES[seed % FORTUNES.length];
}

export default function DailyPage() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][today.getDay()];

  return (
    <div className="daily-page">
      <div className="container">
        <Link href="/" className="detail-back">← 返回首頁</Link>
      </div>

      <div className="daily-hero">
        <div className="section-label">Daily Horoscope</div>
        <h1 className="daily-title">每日運勢</h1>
        <div className="section-ornament">
          <span className="section-ornament-line" />
          <span className="section-ornament-star">✦</span>
          <span className="section-ornament-line" />
        </div>
        <p className="daily-date">{dateStr} 星期{dayOfWeek}</p>
      </div>

      <div className="daily-content">
        <div className="daily-overview-grid">
          {ZODIAC_ORDER.map((key) => {
            const sign = zodiacData[key];
            const fortune = getDaily(key);
            return (
              <div key={key} className="daily-overview-card">
                <div className="daily-overview-header">
                  <span className="daily-overview-emoji">{sign.emoji}</span>
                  <div>
                    <div className="daily-overview-name">{sign.name}</div>
                    <div className="daily-overview-name-en">{sign.nameEN}</div>
                  </div>
                </div>
                <PaywallGate featureName={`${sign.name}每日運勢`} description="解鎖完整每日運勢">
                  <div className="daily-items">
                    <div className="daily-item">
                      <span className="daily-item-icon">❤️</span>
                      <span className="daily-item-text">{fortune.love}</span>
                    </div>
                    <div className="daily-item">
                      <span className="daily-item-icon">💼</span>
                      <span className="daily-item-text">{fortune.career}</span>
                    </div>
                    <div className="daily-item">
                      <span className="daily-item-icon">💰</span>
                      <span className="daily-item-text">{fortune.money}</span>
                    </div>
                    <div className="daily-item">
                      <span className="daily-item-icon">🏥</span>
                      <span className="daily-item-text">{fortune.health}</span>
                    </div>
                  </div>
                </PaywallGate>
              </div>
            );
          })}
        </div>
      </div>

      <div className="daily-footer-note">
        每日運勢由星象能量推演而生，僅供參考，不代表任何宿命論。
      </div>
    </div>
  );
}