import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { zodiacData, COMPATIBILITY, ELEMENT_COLORS } from '@/lib/data';

const ZODIAC_ORDER = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

export function generateStaticParams() {
  return ZODIAC_ORDER.map((sign) => ({ sign }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sign: string }>;
}): Promise<Metadata> {
  const { sign } = await params;
  const data = zodiacData[sign];
  if (!data) return {};

  const title = `${data.name}（${data.nameEN}）| Stella Chart 星座命盤`;
  const description = `深入了解${data.name}（${data.nameEN}）的完整星座分析：性格特質、命運走向、相容星座與每日運勢。${data.description.slice(0, 80)}…`;

  return {
    title,
    description,
    openGraph: {
      title: `${data.nameEN} — Stella Chart`,
      description,
      type: 'website',
      locale: 'zh_TW',
    },
    twitter: {
      card: 'summary',
      title: `${data.nameEN} — Stella Chart`,
      description,
    },
  };
}

function getDailyHoroscope(sign: string): { love: string; career: string; money: string; health: string } {
  const seed = sign.charCodeAt(0) + new Date().getDate();
  const fortunes = [
    { love: "今日單身者有意外邂逅的機會，已有伴者感情升溫。", career: "工作上嶄露頭角，有貴人相助。", money: "有意外之財，但宜低調處理。", health: "注意腸胃保健，避免暴飲暴食。" },
    { love: "愛情運勢良好，適合與伴侶共度時光。", career: "保持現狀，穩扎穩打地前進。", money: "財務狀況平穩，適合儲蓄。", health: "身體狀況不錯，精神充沛。" },
    { love: "爛桃花警訊，與異性來往宜保持距離。", career: "小人運旺，須謹言慎行以防口舌是非。", money: "有破財之兆，投資理財應保守為上。", health: "舊疾可能復發，應多休息。" },
    { love: "暗戀者迎來心動信號，勇於表達会有好結果。", career: "事業邁入新階段，迎來轉機。", money: "偏財運佳，可能有小額獎金入帳。", health: "體力充沛，但注意交通安全。" },
    { love: "與伴侶溝通順暢，感情更加穩固。", career: "創造力爆棚，提案有望獲得青睞。", money: "金錢運普通，應避免衝動消費。", health: "健康運佳，適合戶外活動。", },
    { love: "單身者眼光過高，需調整心態才能遇見正緣。", career: "上司對你印象良好，升遷有望。", money: "正財運穩定，偏財則不宜強求。", health: "压力大時可透過冥想舒緩。", },
    { love: "容易因為小事與伴侶起爭執，宜多忍讓。", career: "團隊合作順利，專案進度超前。", money: "金錢流動順暢，有利於談判。", health: "睡眠品質不佳，宜早起早睡。", },
    { love: "桃花運爆棚，社交場合備受矚目。", career: "工作充滿熱情，效率大幅提升。", money: "有貴人指點，投資運上升。", health: "視力保健需注意，長時間用眼應休息。", },
    { love: "適合重新審視舊關係，修復破裂的情感。", career: "腳踏實地會有回報，不宜投機取巧。", money: "財庫穩固，可考慮長期理財規劃。", health: "免疫系統需加强，預防季節性疾病。", },
    { love: "浪漫氛圍浓厚，適合安排約會或婚嫁之事。", career: "事業壓力較大，需適時放鬆調節。", money: "有損耗之兆，避免借貸或作保。", health: "舊傷需特別留意，天氣變化時有不適。", },
    { love: "對感情有新的領悟，內心更加堅定。", career: "突破瓶頸，過去的付出開始展現成果。", money: "財運大開，正偏財均有斬獲。", health: "身心和諧，整體狀態達到高峰。", },
    { love: "内斂低調，不善表達者可能錯失良緣。", career: "低調行事可避開小人，穩步前進。", money: "收支平衡，學習理財知識的好時機。", health: "注意呼吸系統保養，空氣品質要留意。", },
  ];
  return fortunes[seed % fortunes.length];
}

export default async function SignPage({
  params,
}: {
  params: Promise<{ sign: string }>;
}) {
  const { sign } = await params;
  const data = zodiacData[sign];
  if (!data) notFound();

  const compatSigns = data.compatibleSigns.map((s) => ({
    key: s,
    ...zodiacData[s],
  }));

  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const daily = getDailyHoroscope(sign);

  return (
    <div className="detail-page">
      <div className="container">
        <Link href="/" className="detail-back">← 返回首頁</Link>
      </div>

      <div className="detail-hero">
        <span className="detail-emoji">{data.emoji}</span>
        <h1 className="detail-name">{data.name}</h1>
        <div
          className="detail-element-badge"
          style={{ borderColor: ELEMENT_COLORS[data.element] + '40' }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: ELEMENT_COLORS[data.element],
              display: 'inline-block',
            }}
          />
          {data.element}象星座
        </div>
      </div>

      <div className="detail-content">
        {/* Description */}
        <div className="detail-section-title">性格解析</div>
        <p className="detail-description">{data.description}</p>

        {/* Traits */}
        <div className="detail-section-title">性格特質</div>
        <div className="traits-grid">
          {data.personality.traits.map((trait) => (
            <span key={trait} className="trait-tag">{trait}</span>
          ))}
        </div>

        {/* Lucky Info */}
        <div className="detail-section-title">幸運資訊</div>
        <div className="lucky-grid">
          <div className="lucky-card">
            <div className="lucky-label">幸運色</div>
            <div className="lucky-value small">{data.luckyColor}</div>
          </div>
          <div className="lucky-card">
            <div className="lucky-label">幸運數字</div>
            <div className="lucky-value">{data.luckyNumber}</div>
          </div>
          <div className="lucky-card">
            <div className="lucky-label">幸運方向</div>
            <div className="lucky-value small">{data.luckyDirection}</div>
          </div>
          <div className="lucky-card">
            <div className="lucky-label">守護元素</div>
            <div className="lucky-value small">{data.element}</div>
          </div>
        </div>

        {/* Daily Horoscope */}
        <div className="detail-section-title">每日運勢 · {dateStr}</div>
        <div className="daily-grid">
          <div className="daily-card daily-love">
            <div className="daily-icon">❤️</div>
            <div className="daily-category">愛情</div>
            <div className="daily-text">{daily.love}</div>
          </div>
          <div className="daily-card daily-career">
            <div className="daily-icon">💼</div>
            <div className="daily-category">事業</div>
            <div className="daily-text">{daily.career}</div>
          </div>
          <div className="daily-card daily-money">
            <div className="daily-icon">💰</div>
            <div className="daily-category">財運</div>
            <div className="daily-text">{daily.money}</div>
          </div>
          <div className="daily-card daily-health">
            <div className="daily-icon">🏥</div>
            <div className="daily-category">健康</div>
            <div className="daily-text">{daily.health}</div>
          </div>
        </div>
        <div className="daily-footer">
          <span>每日運勢由星象能量推演，僅供參考</span>
        </div>

        {/* Care Points */}
        <div className="detail-section-title">保養重點</div>
        <ul className="care-list">
          {data.carePoints.map((point) => (
            <li key={point} className="care-item">{point}</li>
          ))}
        </ul>

        {/* Compatible Signs */}
        <div className="detail-section-title">最佳相容</div>
        <div className="compat-grid">
          {compatSigns.map((s) => (
            <Link key={s.key} href={`/${s.key}`} className="compat-card">
              <span className="compat-emoji">{s.emoji}</span>
              <span className="compat-name">{s.name}</span>
            </Link>
          ))}
        </div>

        {/* Compatibility with others */}
        <div className="detail-section-title">與各星座相容度</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 64 }}>
          {ZODIAC_ORDER.map((otherKey) => {
            const score = COMPATIBILITY[`${sign}-${otherKey}`] ?? COMPATIBILITY[`${otherKey}-${sign}`] ?? 2;
            const label = score >= 5 ? '極佳' : score >= 4 ? '很好' : score >= 3 ? '中等' : '差異';
            return (
              <div
                key={otherKey}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.9rem',
                }}
              >
                <span>{zodiacData[otherKey].emoji}</span>
                <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{zodiacData[otherKey].name}</span>
                <span style={{
                  color: score >= 4 ? 'var(--gold)' : score >= 3 ? 'var(--text-secondary)' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                }}>
                  {score}/5 {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}