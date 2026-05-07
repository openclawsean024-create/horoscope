import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '訂閱成功 | Stella Chart',
  description: '您已成功訂閱 Stella Chart Premium，感謝您的支持！',
};

export default function SubscribeSuccessPage() {
  return (
    <div className="subscribe-success-page">
      <div className="subscribe-success-container">
        <div className="subscribe-success-icon">✦</div>
        <div className="subscribe-success-eyebrow">Premium Activated</div>
        <h1 className="subscribe-success-title">感謝訂閱 Stella Chart</h1>
        <p className="subscribe-success-text">
          您已成功升級為 Premium 會員。所有付費內容現在已完全解鎖。
        </p>
        <div className="subscribe-success-features">
          <div className="subscribe-success-feature">
            <span className="subscribe-success-feature-icon">✦</span>
            <span>每日完整運勢解鎖</span>
          </div>
          <div className="subscribe-success-feature">
            <span className="subscribe-success-feature-icon">✦</span>
            <span>每週深度分析</span>
          </div>
          <div className="subscribe-success-feature">
            <span className="subscribe-success-feature-icon">✦</span>
            <span>塔羅占卜無限次</span>
          </div>
          <div className="subscribe-success-feature">
            <span className="subscribe-success-feature-icon">✦</span>
            <span>進階相容度分析</span>
          </div>
        </div>
        <div className="subscribe-success-actions">
          <Link href="/daily" className="subscribe-success-btn-primary">
            查看每日運勢
          </Link>
          <Link href="/" className="subscribe-success-btn-secondary">
            返回首頁
          </Link>
        </div>
        <p className="subscribe-success-note">
          付款收據已寄至您的電子郵件。如有問題請聯繫 support@stellachart.app
        </p>
      </div>
    </div>
  );
}
