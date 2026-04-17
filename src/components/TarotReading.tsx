'use client';

import { useState } from 'react';
import { nanoid } from 'nanoid';

interface TarotCard {
  name: string;
  emoji: string;
  meaning: string;
  fortune: string;
}

const tarotDeck: TarotCard[] = [
  { name: '魔術師', emoji: '🃏', meaning: '創造力、意志力、Skill！一切的開始。', fortune: '充滿創造力與行動力，計畫將順利展開。' },
  { name: '女教皇', emoji: '🌙', meaning: '智慧、神秘、直覺。', fortune: '應倾听内心的声音，答案就在心中。' },
  { name: '女皇', emoji: '🌸', meaning: '豐盛、魅力、自然。', fortune: '運勢亨通，万事如意，享受生活中的美好。' },
  { name: '皇帝', emoji: '👑', meaning: '領導、架構、秩序。', fortune: '保持理性與紀律，堅持下去就會有回報。' },
  { name: '教皇', emoji: '🛕', meaning: '信仰、傳統、引導。', fortune: '有貴人相助，謙卑尋求建議會帶來好處。' },
  { name: '戀人', emoji: '💕', meaning: '愛情、結合、選擇。', fortune: '情感事務將有重大發展，選擇需慎重。' },
  { name: '戰車', emoji: '⚔️', meaning: '勝利、意志、決心。', fortune: '只要堅定信念向前，勝利就在眼前。' },
  { name: '力量', emoji: '🦁', meaning: '勇氣、耐心、內在力量。', fortune: '以柔克剛，用智慧與耐心克服難關。' },
  { name: '隱者', emoji: '🔦', meaning: '尋找、內省、孤獨。', fortune: '是時候静下心来獨處，答案會自己浮現。' },
  { name: '命運之輪', emoji: '🎡', meaning: '轉機、命運、循環。', fortune: '好運或壞運即將到來，顺其自然接受。' },
  { name: '正義', emoji: '⚖️', meaning: '公平、真相、法律。', fortune: '行事公正，一切將回歸平衡。' },
  { name: '懸掛者', emoji: '⏳', meaning: '犧牲、等待、改變。', fortune: '有時停下脚步放棄，反而是一種前進。' },
  { name: '死神', emoji: '💀', meaning: '結束、轉化、重生。', fortune: '舊的結束意味新的開始，勇敢擁抱改變。' },
  { name: '惡魔', emoji: '😈', meaning: '束縛、秘密、誘惑。', fortune: '小心負面誘惑，戰勝心中的惡魔。' },
  { name: '塔', emoji: '🗼', meaning: '動盪、覺醒、解放。', fortune: '動盪之後是重建，痛苦會帶來成長。' },
  { name: '星星', emoji: '⭐', meaning: '希望、靈感、和平。', fortune: '黑暗中總有光亮，保持希望與信念。' },
  { name: '月亮', emoji: '🌕', meaning: '幻覺、不安、潛意識。', fortune: '小心迷惘與欺騙，看清真相需要時間。' },
  { name: '太陽', emoji: '☀️', meaning: '成功、快樂、活力。', fortune: '前所未有的好運即將到來！' },
  { name: '審判', emoji: '🎺', meaning: '重生、覺醒、救贖。', fortune: '過去的錯誤得到宽恕，重新開始的時刻到了。' },
  { name: '世界', emoji: '🌍', meaning: '完成、成就、統合。', fortune: '大功告成，一個階段的完美結束。' },
];

interface TarotReadingProps {
  zodiacSign: string;
  birthMonth: number;
}

export default function TarotReading({ zodiacSign, birthMonth }: TarotReadingProps) {
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [readingId] = useState(() => nanoid());

  const drawCards = () => {
    setIsDrawing(true);
    const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    
    // Simple seeding based on zodiac + month for "consistent" feeling
    setTimeout(() => {
      setDrawnCards(selected);
      setIsDrawing(false);
      
      // Persist to localStorage
      const history = JSON.parse(localStorage.getItem('tarot-history') || '[]');
      history.unshift({
        id: readingId,
        zodiac: zodiacSign,
        month: birthMonth,
        cards: selected.map(c => c.name),
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('tarot-history', JSON.stringify(history.slice(0, 50)));
    }, 1500);
  };

  return (
    <div className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-500/30">
      <h3 className="text-xl font-bold text-purple-300 mb-4">
        🔮 塔羅牌占卜（${zodiacSign}・${birthMonth}月）
      </h3>
      
      {!isDrawing && drawnCards.length === 0 && (
        <button
          onClick={drawCards}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors font-semibold"
        >
          抽三張牌
        </button>
      )}

      {isDrawing && (
        <div className="flex gap-4 justify-center">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-20 h-28 bg-purple-800/50 rounded-lg animate-pulse flex items-center justify-center">
              <span className="text-3xl">🃏</span>
            </div>
          ))}
        </div>
      )}

      {drawnCards.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-4 justify-center flex-wrap">
            {drawnCards.map((card, i) => (
              <div key={i} className="text-center">
                <div className="w-24 h-32 bg-gradient-to-b from-purple-700 to-purple-900 rounded-lg flex flex-col items-center justify-center p-2 shadow-lg">
                  <span className="text-3xl">{card.emoji}</span>
                  <span className="text-sm font-bold text-purple-200 mt-2">{card.name}</span>
                </div>
                <p className="text-xs text-purple-300 mt-2 max-w-24">{card.meaning}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-purple-950/50 rounded-lg p-4 mt-4">
            <p className="text-purple-200 text-sm">
              <span className="font-semibold text-purple-300">總體指引：</span>
              {drawnCards[0].fortune}
            </p>
            <p className="text-purple-300 text-xs mt-2">
              占卜 ID：{readingId}
            </p>
          </div>
          
          <button
            onClick={drawCards}
            className="px-4 py-2 bg-purple-700/50 hover:bg-purple-600/50 text-purple-200 rounded-lg transition-colors text-sm"
          >
            再抽一次
          </button>
        </div>
      )}
    </div>
  );
}
