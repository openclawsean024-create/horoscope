import { createContext, useContext, useState, ReactNode } from 'react';

interface SubscriptionState {
  isPremium: boolean;
  plan: 'free' | 'monthly' | 'yearly' | null;
  setPremium: (plan: 'monthly' | 'yearly') => void;
}

const SubscriptionContext = createContext<SubscriptionState>({
  isPremium: false,
  plan: null,
  setPremium: () => {},
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [plan, setPlan] = useState<SubscriptionState['plan']>(null);

  return (
    <SubscriptionContext.Provider
      value={{
        isPremium,
        plan,
        setPremium: (p) => { setIsPremium(true); setPlan(p); },
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
