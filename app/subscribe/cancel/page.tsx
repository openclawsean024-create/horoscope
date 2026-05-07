import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '取消訂閱 | Stella Chart',
  description: '您的訂閱已取消，您仍可繼續使用免費功能。',
};

export default function SubscribeCancelPage() {
  return (
    <div className="subscribe-cancel-page">
      <div className="subscribe-cancel-container">
        <div className="subscribe-cancel-icon">✦</div>
        <div className="subscribe-cancel-eyebrow">Subscription Cancelled</div>
        <h1 className="subscribe-cancel-title">已取消訂閱</h1>
        <p className="subscribe-cancel-text">
          您的訂閱已成功取消。您仍可繼續使用免費功能直到本期結束。
        </p>
        <div className="subscribe-cancel-actions">
          <Link href="/" className="subscribe-cancel-btn-primary">
            返回首頁
          </Link>
          <Link href="/subscribe" className="subscribe-cancel-btn-secondary">
            重新訂閱
          </Link>
        </div>
      </div>
    </div>
  );
}
