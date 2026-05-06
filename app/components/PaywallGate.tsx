'use client';

import { useState } from 'react';
import SubscribeModal from './SubscribeModal';

interface PaywallGateProps {
  children: React.ReactNode;
  featureName: string;
  description?: string;
}

export default function PaywallGate({ children, featureName, description }: PaywallGateProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="paywall-gate"
        onClick={() => setShowModal(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setShowModal(true)}
        title={description ?? `解鎖 ${featureName}`}
      >
        <div className="paywall-gate-blur">{children}</div>
        <div className="paywall-gate-overlay">
          <div className="paywall-gate-icon">✦</div>
          <div className="paywall-gate-label">Premium</div>
          <div className="paywall-gate-cta">解鎖 {featureName}</div>
        </div>
      </div>
      <SubscribeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        featureContext={featureName}
      />
    </>
  );
}
