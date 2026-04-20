import Link from 'next/link';
import { notFound } from 'next/navigation';
import { zodiacData, COMPATIBILITY, ELEMENT_COLORS } from '@/lib/data';

const ZODIAC_ORDER = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

export function generateStaticParams() {
  return ZODIAC_ORDER.map((sign) => ({ sign }));
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
