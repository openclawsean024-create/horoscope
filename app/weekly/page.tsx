import Link from 'next/link';
import { Metadata } from 'next';
import { zodiacData } from '@/lib/data';
import PaywallGate from '@/app/components/PaywallGate';

export const metadata: Metadata = {
  title: '每週運勢 | Stella Chart 星座命盤',
  description: '查看本週十二星座愛情、事業、財運、健康每週運勢預測，每週一更新。',
};

const ZODIAC_ORDER = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const WEEKLY_TEXTS: Record<string, { overall: string; love: string; career: string; money: string; health: string }> = {
  aries: {
    overall: '本週守護星火星與金星形成和諧相位，整體能量充沛，勇於行動將帶來正面回報。',
    love: '單身牡羊座有機會在工作場合或社交活動中遇見心動對象，已有伴者感情更加穩固。',
    career: '事業迎來突破期，過去的努力逐漸被看見，勇於表達想法會獲得認可。',
    money: '財運有驚喜，偏財運不錯，但切記保守理財，避免衝動投資。',
    health: '體力充沛但情緒波動較大，宜透過運動抒發精力，注意肝臟保健。',
  },
  taurus: {
    overall: '金星本週進駐財帛宮，金錢運勢上揚，理財規劃迎來好時機。',
    love: '感情運趨於穩定，已有伴侶者適合安排浪漫約會，單身者宜把握社交場合。',
    career: '工作節奏放緩，適合重新審視長期目標，穩紮穩打比冒進更有效。',
    money: '正財運穩定上升，有加薪或獎金機會，偏財可小試手氣。',
    health: '消化系統需多加留意，暴飲暴食易造成腸胃不適，宜規律飲食。',
  },
  gemini: {
    overall: '水星本週逆行前期，思維活躍但易有溝通誤會，重要決定宜延後。',
    love: '愛情運波動，單身者易被舊識吸引，已有伴者需多溝通避免冷戰。',
    career: '文書往返頻繁，易有電子郵件或行程疏漏，建議仔細核對每個細節。',
    money: '金錢運普通，意外支出較多，建議暫緩大型採購或投資決定。',
    health: '神經系統較為敏感，宜保持充足睡眠，避免過度使用電子產品。',
  },
  cancer: {
    overall: '月亮本週行經感情宮，情感需求增加，適合與親友深談或回顧過往。',
    love: '愛情運勢強勁，已有伴者適合討論未來計劃，單身者有望遇見正緣。',
    career: '工作上直覺敏銳，重要決定跟隨內心會有好的結果，注意人際關係。',
    money: '財務狀況平穩，有機會收到紅包或禮物，宜儲蓄而非消費。',
    health: '情緒起伏較大，宜透過瑜珈或冥想保持內在平靜，注意婦科保健。',
  },
  leo: {
    overall: '太陽本週能量充沛，自信心大增，各方面運勢都有不錯的表現。',
    love: '社交運極佳，單身者備受矚目，已有伴者則需多花時間陪伴對方。',
    career: '創造力爆發，適合發表創意或主導專案，有機會獲得上司賞識。',
    money: '財運大開，有貴人指點投資方向，偏財運尤其旺盛。',
    health: '精力充沛但易過度消耗，宜適時休息，避免熬夜與過度狂歡。',
  },
  virgo: {
    overall: '水星逆行影響深遠，本週適合整理思緒、檢視過往，而非開創新事。',
    love: '愛情運低沉，單身者難有突破，已有伴者則需注意溝通方式。',
    career: '工作上需更謹慎處理細節，文件來回修訂耗費心力，但最終會順利。',
    money: '財務運勢普通，沒有大進帳也沒有大支出，保持現狀為宜。',
    health: '消化系統依然需注意，同時需避免過度焦慮，影響睡眠品質。',
  },
  libra: {
    overall: '金星與木星形成良好相位，整體運勢上揚，人際關係和諧順遂。',
    love: '愛情運極佳，單身者桃花處處，已婚者與伴侶相處融洽美滿。',
    career: '談判或協調事務特別順利，適合處理合作關係或簽訂合約。',
    money: '財運上揚，有不錯的投資報酬機會，但需多做功課再下手。',
    health: '身心狀態良好，適合嘗試新的運動或戶外活動，煥發活力。',
  },
  scorpio: {
    overall: '冥王星本週能量深沉，適合內省與深度思考，表現在外則低調行事。',
    love: '情感深刻而真摯，已有伴者關係邁入新階段，單身者易暗戀心動。',
    career: '工作上迎來轉型期，過去的積累即將展現成果，宜保持耐心。',
    money: '財務有暗流湧動，大額支出需謹慎，但長遠來看是有益的投資。',
    health: '情緒敏感，身體跟隨心情波動，建議多接觸大自然以淨化能量。',
  },
  sagittarius: {
    overall: '木星本週帶來幸運能量，探索與冒ney精神旺盛，適合學習新事物。',
    love: '愛情運活潑，單身者有機會在旅行或進修中遇見志同道合的對象。',
    career: '事業上有海外或跨文化機會，勇於爭取將獲得意想不到的收穫。',
    money: '財運起伏不定，有意外之財也有意外支出，需保持平衡理財觀念。',
    health: '腿部與足部需特別注意，遠離危險性活動，長時間行走需休息。',
  },
  capricorn: {
    overall: '土星本週帶來結構與紀律的能量，事業野心重燃，腳踏實地前進。',
    love: '感情上較為嚴肅，已有伴者討論責任分擔，單身者事業心過重易忽略感情。',
    career: '職場地位穩固，有機會獲得升遷或承擔更大責任，貴人運不錯。',
    money: '正財運佳，穩定的理財規劃將帶來回報，不宜投機取巧。',
    health: '骨骼與關節需多加保養，適度補充鈣質，運動前務必熱身。',
  },
  aquarius: {
    overall: '天王星本週能量動盪，創新思維湧現，但也易有計畫外的變化。',
    love: '愛情運獨特且出人意料，單身者可能在社群或線上平台遇見特別的人。',
    career: '科技或網路相關領域傳來好消息，適合提出創新方案或轉換跑道。',
    money: '財務運波動大，有機會獲得比特幣或新興科技領域的收益。',
    health: '神經系統敏感，宜保持規律作息，避免咖啡因過量攝取。',
  },
  pisces: {
    overall: '海王星本週能量深沉，直覺發達，藝術與靈性層面有突出表現。',
    love: '愛情運浪漫且理想化，單身者易陷入迷戀，已有伴者則感情更加滋潤。',
    career: '創意產業或慈善領域有好消息，適合從事藝術創作或公益活動。',
    money: '財運略顯模糊，不宜在此時做重大財務決定，等待局勢更明朗。',
    health: '免疫力波動，注意季節性過敏，同時需避免藥物或酒精過量。',
  },
};

function getWeekRange(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return `${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}日`;
}

export default function WeeklyPage() {
  const weekRange = getWeekRange();

  return (
    <div className="weekly-page">
      <div className="container">
        <Link href="/" className="detail-back">← 返回首頁</Link>
      </div>

      <div className="weekly-hero">
        <div className="section-label">Weekly Horoscope</div>
        <h1 className="weekly-title">每週運勢</h1>
        <div className="section-ornament">
          <span className="section-ornament-line" />
          <span className="section-ornament-star">✦</span>
          <span className="section-ornament-line" />
        </div>
        <p className="weekly-date">{weekRange} 每週一更新</p>
      </div>

      <div className="weekly-content">
        <div className="weekly-overview-grid">
          {ZODIAC_ORDER.map((key) => {
            const sign = zodiacData[key];
            const text = WEEKLY_TEXTS[key];
            return (
              <div key={key} className="weekly-overview-card">
                <div className="weekly-overview-header">
                  <span className="weekly-overview-emoji">{sign.emoji}</span>
                  <div>
                    <div className="weekly-overview-name">{sign.name}</div>
                    <div className="weekly-overview-name-en">{sign.nameEN}</div>
                  </div>
                </div>

                <PaywallGate featureName={`${sign.name}每週運勢`} description="解鎖完整每週運勢">
                  <div className="weekly-items">
                    <div className="weekly-item weekly-overall">
                      <span className="weekly-item-icon">✦</span>
                      <span className="weekly-item-text">{text.overall}</span>
                    </div>
                    <div className="weekly-item">
                      <span className="weekly-item-icon">❤️</span>
                      <span className="weekly-item-text">{text.love}</span>
                    </div>
                    <div className="weekly-item">
                      <span className="weekly-item-icon">💼</span>
                      <span className="weekly-item-text">{text.career}</span>
                    </div>
                    <div className="weekly-item">
                      <span className="weekly-item-icon">💰</span>
                      <span className="weekly-item-text">{text.money}</span>
                    </div>
                    <div className="weekly-item">
                      <span className="weekly-item-icon">🏥</span>
                      <span className="weekly-item-text">{text.health}</span>
                    </div>
                  </div>
                </PaywallGate>
              </div>
            );
          })}
        </div>
      </div>

      <div className="weekly-footer-note">
        每週運勢由星象能量推演而生，僅供參考，不代表任何宿命論。
      </div>
    </div>
  );
}
