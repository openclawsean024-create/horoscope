'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSubscription } from '@/lib/hooks/useSubscription';

// Extended tarot card type
interface TarotCard {
  name: string;
  nameZh: string;
  arcana: 'major' | 'minor';
  suit: string | null;
  element?: string;
  meaning: string;
  keywords?: string[];
}

// 22 Major Arcana
const MAJOR_ARCANA: TarotCard[] = [
  { name: 'The Fool', nameZh: '愚者', arcana: 'major', suit: null, meaning: '嶄新的開始、無邪、天真、冒險、信任。代表即將踏上的旅程，充滿未知與可能。', keywords: ['嶄新開始', '天真', '冒險', '信任', '自由'] },
  { name: 'The Magician', nameZh: '魔術師', arcana: 'major', suit: null, meaning: '意志力、創造力、溝通、技能、展現。將潛能轉化為實際行動，萬事皆有可能。', keywords: ['意志力', '創造力', '溝通', '技能', '顯化'] },
  { name: 'The High Priestess', nameZh: '女祭司', arcana: 'major', suit: null, meaning: '直覺、神秘、內在知識、隱藏的真相。倾听內心的聲音，信任你的直覺。', keywords: ['直覺', '神秘', '靈性', '潛意識', '真相'] },
  { name: 'The Empress', nameZh: '皇后', arcana: 'major', suit: null, meaning: '豐盛、魅力、自然、母親、創造力。享受生命的美好，接收大自然的滋養。', keywords: ['豐盛', '魅力', '自然', '創造力', '母性'] },
  { name: 'The Emperor', nameZh: '皇帝', arcana: 'major', suit: null, meaning: '權威、架構、穩定、領導力、紀律。透過紀律與自律建立秩序與成就。', keywords: ['權威', '穩定', '領導', '紀律', '父親'] },
  { name: 'The Hierophant', nameZh: '教皇', arcana: 'major', suit: null, meaning: '傳統、精神指引、團體、信念、教育。遵循傳統與精神價值觀，找到生命的道路。', keywords: ['傳統', '精神', '信仰', '教育', '團體'] },
  { name: 'The Lovers', nameZh: '戀人', arcana: 'major', suit: null, meaning: '愛情、選擇、和諧、價值觀、吸引力。重大選擇時刻，跟隨心的指引。', keywords: ['愛情', '選擇', '和諧', '價值觀', '結合'] },
  { name: 'The Chariot', nameZh: '戰車', arcana: 'major', suit: null, meaning: '勝利、意志力、決心、征服、凱旋。以堅定意志克服障礙，成功在望。', keywords: ['勝利', '意志', '決心', '克服', '凱旋'] },
  { name: 'Strength', nameZh: '力量', arcana: 'major', suit: null, meaning: '勇氣、耐心、內在力量、慈悲、韌性。以溫柔的力量展現真正的勇敢。', keywords: ['勇氣', '耐心', '力量', '慈悲', '韌性'] },
  { name: 'The Hermit', nameZh: '隱者', arcana: 'major', suit: null, meaning: '內省、孤獨、引導、靈性尋求、內在探索。退出外在喧囂，向內尋找答案。', keywords: ['內省', '孤獨', '靈性', '引導', '探索'] },
  { name: 'Wheel of Fortune', nameZh: '命運之輪', arcana: 'major', suit: null, meaning: '運氣、轉折點、命運循環、機會、改變。命運之輪轉動，好運即將來臨。', keywords: ['命運', '轉折', '好運', '循環', '改變'] },
  { name: 'Justice', nameZh: '正義', arcana: 'major', suit: null, meaning: '公平、正義、真相、法律、因果。行為有其後果，堅持公正與真相。', keywords: ['正義', '公平', '真相', '因果', '法律'] },
  { name: 'The Hanged Man', nameZh: '吊人', arcana: 'major', suit: null, meaning: '暫停、犧牲、新的視角、投降、等待。暫停腳步，從不同角度看待事情。', keywords: ['暫停', '犧牲', '視角', '臣服', '等待'] },
  { name: 'Death', nameZh: '死神', arcana: 'major', suit: null, meaning: '結束、轉化、蛻變、放下、釋放。舊的不去新的不來，擁抱生命的蛻變。', keywords: ['結束', '轉化', '蛻變', '放下', '釋放'] },
  { name: 'Temperance', nameZh: '節制', arcana: 'major', suit: null, meaning: '平衡、調和、耐心、目的、和合。找到內在的平衡點，修復與調和小我與自我。', keywords: ['平衡', '調和', '耐心', '康復', '中庸'] },
  { name: 'The Devil', nameZh: '惡魔', arcana: 'major', suit: null, meaning: '束縛、執念、物質主義、誘惑、依附。檢視讓你無法自由的執念與依附。', keywords: ['束縛', '執念', '誘惑', '物質', '依附'] },
  { name: 'The Tower', nameZh: '塔', arcana: 'major', suit: null, meaning: '突發的改變、破壞、解放、覺醒、揭露。摧毁舊結構為新建設讓路，痛苦但必要。', keywords: ['突變', '破壞', '覺醒', '解放', '揭露'] },
  { name: 'The Star', nameZh: '星星', arcana: 'major', suit: null, meaning: '希望、靈感、平靜、療癒、信心。暴風雨後的寧靜，重新找到方向與希望。', keywords: ['希望', '靈感', '平靜', '療癒', '信心'] },
  { name: 'The Moon', nameZh: '月亮', arcana: 'major', suit: null, meaning: '幻象、恐懼、焦慮、潛意識、直覺。面對內心的恐懼與焦慮，信任直覺的指引。', keywords: ['幻象', '恐懼', '焦慮', '潛意識', '不安'] },
  { name: 'The Sun', nameZh: '太陽', arcana: 'major', suit: null, meaning: '快樂、成功、活力、生命力、歡笑。生命中最美好的時光，享受成功的喜悅。', keywords: ['快樂', '成功', '活力', '生命力', '歡笑'] },
  { name: 'Judgement', nameZh: '審判', arcana: 'major', suit: null, meaning: '覺醒、反省、寬恕、復活、重生。內心的呼喚，準備好接受生命的召喚。', keywords: ['覺醒', '反省', '寬恕', '重生', '召喚'] },
  { name: 'The World', nameZh: '世界', arcana: 'major', suit: null, meaning: '完成、成就、統合、圓滿、勝利。完成一個重要的生命週期，達到和諧與圓滿。', keywords: ['完成', '成就', '圓滿', '統合', '勝利'] },
];

// Minor Arcana — each suit with 14 cards
interface MinorCard {
  name: string;
  nameZh: string;
  meaning: string;
  keywords: string[];
}

const WANDS: MinorCard[] = [
  { name: 'Ace of Wands', nameZh: '權杖王牌', meaning: '嶄新的創造力、靈感、潛力、起步。新的創造計畫即將展開。', keywords: ['創意', '靈感', '潛力', '起步'] },
  { name: 'Two of Wands', nameZh: '權杖二', meaning: '決策、發现、預見、未來規劃。站在門檻上，規劃未來的方向。', keywords: ['決策', '預見', '規劃'] },
  { name: 'Three of Wands', nameZh: '權杖三', meaning: '建設、擴展、等待、貿易、探索。努力即將得到回報，繼續擴展。', keywords: ['擴展', '貿易', '探索'] },
  { name: 'Four of Wands', nameZh: '權杖四', meaning: '慶祝、和諧、休息、歸屬、社群。享受和平安寧，收割努力的成果。', keywords: ['慶祝', '和諧', '歸屬'] },
  { name: 'Five of Wands', nameZh: '權杖五', meaning: '衝突、競爭、差異、多樣性、創意之戰。多種觀點碰撞，需要協調與包容。', keywords: ['衝突', '競爭', '多樣性'] },
  { name: 'Six of Wands', nameZh: '權杖六', meaning: '勝利、成功、公共關係、認可。克服挑戰，贏得榮耀與認可。', keywords: ['勝利', '成功', '認可'] },
  { name: 'Seven of Wands', nameZh: '權杖七', meaning: '挑戰、堅守、防禦、信念、韌性。保護你的立場，堅守信念不退讓。', keywords: ['挑戰', '防禦', '韌性'] },
  { name: 'Eight of Wands', nameZh: '權杖八', meaning: '快速行動、效率、訊息、旅行。事情進展迅速，保持靈活與行動力。', keywords: ['快速', '效率', '行動'] },
  { name: 'Nine of Wands', nameZh: '權杖九', meaning: '韌性、持久、經驗、測試、警覺。經歷風雨依然站立，最後的挑戰即將過去。', keywords: ['韌性', '持久', '警覺'] },
  { name: 'Ten of Wands', nameZh: '權杖十', meaning: '負擔、責任、辛勞、成功、代價。承擔重責但即將迎來完成的時刻。', keywords: ['負擔', '責任', '辛勞'] },
  { name: 'Page of Wands', nameZh: '權杖侍者', meaning: '探索、發現、測試、自由、熱情。帶著好奇心與熱情踏上新的旅程。', keywords: ['探索', '熱情', '自由'] },
  { name: 'Knight of Wands', nameZh: '權杖騎士', meaning: '行動、勇氣、熱情、衝動、獨立。充滿行動力的使者，即將展開冒險。', keywords: ['行動', '勇氣', '冒險'] },
  { name: 'Queen of Wands', nameZh: '權杖皇后', meaning: '自信、魅力、獨立、溫暖、活力。充滿魅力與自信的女性能量。', keywords: ['自信', '魅力', '溫暖'] },
  { name: 'King of Wands', nameZh: '權杖國王', meaning: '領導力、願景、決心、冒險、尊重。充滿魄力與遠見的領袖。', keywords: ['領導', '願景', '決心'] },
];

const CUPS: MinorCard[] = [
  { name: 'Ace of Cups', nameZh: '聖杯王牌', meaning: '新感情、情感豐富、愛、喜悅、直覺。愛與情感的新開始。', keywords: ['新感情', '愛', '喜悅'] },
  { name: 'Two of Cups', nameZh: '聖杯二', meaning: '結合、愛、合作、關係、友誼。兩人的連結，愛情的萌芽。', keywords: ['結合', '愛情', '友誼'] },
  { name: 'Three of Cups', nameZh: '聖杯三', meaning: '友誼、社群、慶祝、創造力、豐盛。三人的連結，美好的社交時光。', keywords: ['友誼', '慶祝', '豐盛'] },
  { name: 'Four of Cups', nameZh: '聖杯四', meaning: '悔恨、厭倦、不滿、拒絕、自省。對現狀不滿，需要重新審視內心。', keywords: ['悔恨', '厭倦', '自省'] },
  { name: 'Five of Cups', nameZh: '聖杯五', meaning: '失落、悲傷、遺憾、寬恕、接受。面對失落，學習寬恕與接受。', keywords: ['失落', '悲傷', '寬恕'] },
  { name: 'Six of Cups', nameZh: '聖杯六', meaning: '懷舊、童年、回顧、純真、給予。美好的回憶，純真的情感。', keywords: ['懷舊', '童年', '純真'] },
  { name: 'Seven of Cups', nameZh: '聖杯七', meaning: '幻想、選擇、願望、幻象、分散。面對多種選擇，需要專注與決斷。', keywords: ['幻想', '選擇', '願望'] },
  { name: 'Eight of Cups', nameZh: '聖杯八', meaning: '離開、拋棄、尋求、追隨、失望。離開不再適合你的事物，尋求更深層的意義。', keywords: ['離開', '尋求', '失望'] },
  { name: 'Nine of Cups', nameZh: '聖杯九', meaning: '願望實現、快樂、滿足、感恩、圓滿。願望即將實現，享受豐盛。', keywords: ['願望', '快樂', '滿足'] },
  { name: 'Ten of Cups', nameZh: '聖杯十', meaning: '和諧、圓滿、家庭、幸福、忠誠。家庭和諧，情感上的完全滿足。', keywords: ['和諧', '家庭', '幸福'] },
  { name: 'Page of Cups', nameZh: '聖杯侍者', meaning: '創意、浪漫、直覺、好奇心、可能性。藝術家與夢想家的能量降臨。', keywords: ['創意', '浪漫', '直覺'] },
  { name: 'Knight of Cups', nameZh: '聖杯騎士', meaning: '浪漫、想像、魅力、邀請、理想的追尋。浪漫的使者，帶著愛的訊息。', keywords: ['浪漫', '想像', '魅力'] },
  { name: 'Queen of Cups', nameZh: '聖杯皇后', meaning: '慈悲、直覺、情感、溫柔、敏感。充滿同理心與直覺的女性能量。', keywords: ['慈悲', '溫柔', '敏感'] },
  { name: 'King of Cups', nameZh: '聖杯國王', meaning: '情緒平衡、寬恕、掌控、寬容、智慧。情緒成熟，富有智慧與包容。', keywords: ['平衡', '寬容', '智慧'] },
];

const SWORDS: MinorCard[] = [
  { name: 'Ace of Swords', nameZh: '寶劍王牌', meaning: '突破、清晰、新想法、力量、勝利。新的思維帶來突破與勝利。', keywords: ['突破', '清晰', '勝利'] },
  { name: 'Two of Swords', nameZh: '寶劍二', meaning: '僵局、困難的選擇、協議、停滯、需要決斷。停滯不前，需要勇敢做出選擇。', keywords: ['僵局', '選擇', '停滯'] },
  { name: 'Three of Swords', nameZh: '寶劍三', meaning: '心碎、悲傷、分離、痛苦、拒絕。情感上的痛苦，但也是療癒的開始。', keywords: ['心碎', '悲傷', '分離'] },
  { name: 'Four of Swords', nameZh: '寶劍四', meaning: '休息、康復、恢復、隱居、內省。暫時退出，修復身心靈。', keywords: ['休息', '康復', '內省'] },
  { name: 'Five of Swords', nameZh: '寶劍五', meaning: '衝突、失敗、勝利、掠奪、怨恨。衝突的後果，贏了戰役失去更多。', keywords: ['衝突', '失敗', '怨恨'] },
  { name: 'Six of Swords', nameZh: '寶劍六', meaning: '過渡、離開、康復、恢復、前進。離開困境，邁向更好的未來。', keywords: ['過渡', '離開', '前進'] },
  { name: 'Seven of Swords', nameZh: '寶劍七', meaning: '策略、欺騙、隱藏、背叛、計畫。需要誠實面對自己的意圖與行動。', keywords: ['策略', '欺騙', '計畫'] },
  { name: 'Eight of Swords', nameZh: '寶劍八', meaning: '限制、困境、受害者心態、無力、囚禁。感受被困但實際上有更多選擇。', keywords: ['限制', '困境', '無力'] },
  { name: 'Nine of Swords', nameZh: '寶劍九', meaning: '焦慮、恐懼、擔憂、失眠、災難。過度的焦慮，需要面對並釋放恐懼。', keywords: ['焦慮', '恐懼', '失眠'] },
  { name: 'Ten of Swords', nameZh: '寶劍十', meaning: '失敗、終結、痛苦、最低點、重新開始。最黑暗的時刻，也是黎明前的黑暗。', keywords: ['失敗', '終結', '重新開始'] },
  { name: 'Page of Swords', nameZh: '寶劍侍者', meaning: '好奇、溝通、思考、學習、正義。思維敏捷的年輕人，渴望學習與成長。', keywords: ['好奇', '思考', '正義'] },
  { name: 'Knight of Swords', nameZh: '寶劍騎士', meaning: '行動、野心、正義、攻擊、驅動。充滿野心與行動力的使者。', keywords: ['行動', '野心', '攻擊'] },
  { name: 'Queen of Swords', nameZh: '寶劍皇后', meaning: '智慧、獨立、果斷、正義、清晰。頭腦清晰的女性，獨立而智慧。', keywords: ['智慧', '果斷', '清晰'] },
  { name: 'King of Swords', nameZh: '寶劍國王', meaning: '權威、真理、原則、果斷、意識形態。權威與智慧的結合，追求真理。', keywords: ['權威', '真理', '原則'] },
];

const PENTACLES: MinorCard[] = [
  { name: 'Ace of Pentacles', nameZh: '錢幣王牌', meaning: '新機會、繁榮、禮物、豐盛、物質。財務或事業上的新機會即將到來。', keywords: ['新機會', '繁榮', '豐盛'] },
  { name: 'Two of Pentacles', nameZh: '錢幣二', meaning: '平衡、優先順序、多任務、適應、優先次序。忙碌中保持平衡，灵活應對。', keywords: ['平衡', '適應', '優先'] },
  { name: 'Three of Pentacles', nameZh: '錢幣三', meaning: '團隊合作、協作、技能、工作、價值。通過團隊合作完成偉大的工作。', keywords: ['合作', '技能', '價值'] },
  { name: 'Four of Pentacles', nameZh: '錢幣四', meaning: '安全感、保守、占有、穩定、擔憂。對物質的執著，需要學會放手。', keywords: ['安全感', '保守', '占有'] },
  { name: 'Five of Pentacles', nameZh: '錢幣五', meaning: '困難、孤独、財務困難、被拒絕、支持。看似黑暗但仍有希望在遠處。', keywords: ['困難', '孤独', '支持'] },
  { name: 'Six of Pentacles', nameZh: '錢幣六', meaning: '給予、接受、分享、平衡、慈善。財務上的給予與接受需要平衡。', keywords: ['給予', '分享', '慈善'] },
  { name: 'Seven of Pentacles', nameZh: '錢幣七', meaning: '耐心、獎勵、投資、努力、可持續性。等待播種的作物生長，需要耐心。', keywords: ['耐心', '獎勵', '投資'] },
  { name: 'Eight of Pentacles', nameZh: '錢幣八', meaning: '技能、工藝、奉獻、努力、質量。專注於技能培養，追求卓越。', keywords: ['技能', '工藝', '質量'] },
  { name: 'Nine of Pentacles', nameZh: '錢幣九', meaning: '獨立、繁榮、自給自足、獎勵、優雅。享受獨立帶來的繁榮與優雅。', keywords: ['獨立', '繁榮', '優雅'] },
  { name: 'Ten of Pentacles', nameZh: '錢幣十', meaning: '財富、遺產、家庭、根源、成功。家庭與財務上的雙重成功與繁榮。', keywords: ['財富', '遺產', '家庭'] },
  { name: 'Page of Pentacles', nameZh: '錢幣侍者', meaning: '承諾、野心、渴望、應用、責任。腳踏實地的年輕人，專注於目標。', keywords: ['承諾', '野心', '責任'] },
  { name: 'Knight of Pentacles', nameZh: '錢幣騎士', meaning: '效率、穩定、責任、耐心、傳統。腳踏實地的工作者，穩步前進。', keywords: ['效率', '穩定', '耐心'] },
  { name: 'Queen of Pentacles', nameZh: '錢幣皇后', meaning: '繁榮、慷慨、安全、理家、實用。照顧者與實際的女性能量。', keywords: ['繁榮', '慷慨', '實用'] },
  { name: 'King of Pentacles', nameZh: '錢幣國王', meaning: '富足、商人、安全、繁榮、野心。財務上的成功，富有但腳踏實地。', keywords: ['富足', '繁榮', '野心'] },
];

const SUITS = [
  { name: 'Wands', nameZh: '權杖', element: '火', cards: WANDS },
  { name: 'Cups', nameZh: '聖杯', element: '水', cards: CUPS },
  { name: 'Swords', nameZh: '寶劍', element: '風', cards: SWORDS },
  { name: 'Pentacles', nameZh: '錢幣', element: '土', cards: PENTACLES },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function drawRandomCard(): TarotCard {
  const useMajor = Math.random() > 0.5;
  if (useMajor) {
    return pickRandom(MAJOR_ARCANA);
  }
  const suit = pickRandom(SUITS);
  const minor = pickRandom(suit.cards);
  return {
    name: minor.name,
    nameZh: minor.nameZh,
    arcana: 'minor',
    suit: suit.name,
    element: suit.element,
    meaning: minor.meaning,
    keywords: minor.keywords,
  };
}

interface DrawnCard {
  card: TarotCard;
  position: string;
  positionZh: string;
}

function doThreeCardSpread(): DrawnCard[] {
  const positions = [
    { position: 'past', positionZh: '過去' },
    { position: 'present', positionZh: '現在' },
    { position: 'future', positionZh: '未來' },
  ];
  return positions.map(pos => ({ card: drawRandomCard(), position: pos.position, positionZh: pos.positionZh }));
}

function doSingleDraw(): DrawnCard[] {
  return [{ card: drawRandomCard(), position: 'single', positionZh: '單張指引' }];
}

export default function TarotPage() {
  const [spread, setSpread] = useState<'three' | 'single'>('three');
  const [drawnCards, setDrawnCards] = useState<DrawnCard[] | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isPremium } = useSubscription();

  const handleDraw = () => {
    if (!isPremium) {
      const lastDraw = typeof window !== 'undefined' ? localStorage.getItem('tarot_last_draw') : null;
      const today = new Date().toDateString();
      if (lastDraw === today) {
        const modal = document.querySelector('.tarot-free-limit-modal') as HTMLElement;
        if (modal) modal.style.display = 'flex';
        return;
      }
      localStorage.setItem('tarot_last_draw', today);
    }

    setIsAnimating(true);
    setHasDrawn(false);
    setTimeout(() => {
      setDrawnCards(spread === 'three' ? doThreeCardSpread() : doSingleDraw());
      setHasDrawn(true);
      setIsAnimating(false);
    }, 1200);
  };

  return (
    <div className="tarot-page">
      <div className="container">
        <Link href="/" className="detail-back">← 返回首頁</Link>
      </div>

      <div className="tarot-hero">
        <div className="section-label">Tarot Divination</div>
        <h1 className="tarot-title">塔羅占卜</h1>
        <div className="section-ornament">
          <span className="section-ornament-line" />
          <span className="section-ornament-star">✦</span>
          <span className="section-ornament-line" />
        </div>
        <p className="tarot-subtitle">78張萊德·偉特塔羅牌 · 透過牌面解讀你的過去、現在與未來</p>
      </div>

      <div className="tarot-content">
        {/* Spread selector */}
        <div className="tarot-spread-selector">
          <button
            className={`tarot-spread-btn ${spread === 'three' ? 'active' : ''}`}
            onClick={() => { setSpread('three'); setHasDrawn(false); setDrawnCards(null); }}
          >
            <div className="tarot-spread-icon">🂡</div>
            <div className="tarot-spread-name">三牌陣</div>
            <div className="tarot-spread-desc">過去 · 現在 · 未來</div>
          </button>
          <button
            className={`tarot-spread-btn ${spread === 'single' ? 'active' : ''}`}
            onClick={() => { setSpread('single'); setHasDrawn(false); setDrawnCards(null); }}
          >
            <div className="tarot-spread-icon">🂱</div>
            <div className="tarot-spread-name">單張占卜</div>
            <div className="tarot-spread-desc">快速指引 · 當下課題</div>
          </button>
        </div>

        {/* Draw area */}
        {!hasDrawn && (
          <div className="tarot-draw-area">
            <div className="tarot-deck-visual">
              <div className={`tarot-deck-stack ${isAnimating ? 'shuffling' : ''}`}>
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="tarot-deck-card" style={{ transform: `rotate(${(i - 2) * 2}deg) translateY(${i * 1}px)` }} />
                ))}
              </div>
            </div>
            <p className="tarot-draw-hint">集中精神，選擇你的占卜方式</p>
            <button className="tarot-draw-btn" onClick={handleDraw}>
              <span>✦ 抽取塔羅牌 ✦</span>
            </button>
            {!isPremium && (
              <p className="tarot-free-note">免費用戶每日可抽取一次 · 升級 Premium 無限占卜</p>
            )}
          </div>
        )}

        {/* Revealed cards */}
        {hasDrawn && drawnCards && (
          <div className="tarot-reveal">
            <div className="tarot-cards-display">
              {drawnCards.map((item, idx) => (
                <div key={idx} className="tarot-card-result">
                  <div className="tarot-card-position-badge">{item.positionZh}</div>
                  <div className="tarot-card-revealed">
                    <div className="tarot-card-inner">
                      <div className="tarot-card-front">
                        <div className="tarot-card-symbol">✦</div>
                        <div className="tarot-card-name-zh">{item.card.nameZh}</div>
                        <div className="tarot-card-name-en">{item.card.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="tarot-card-meaning-section">
                    <div className="tarot-card-name-full">{item.card.nameZh} — {item.card.name}</div>
                    <div className="tarot-card-keywords">
                      {item.card.arcana === 'major' && item.card.keywords?.map((kw, ki) => (
                        <span key={ki} className="tarot-keyword-tag">{kw}</span>
                      ))}
                    </div>
                    <p className="tarot-card-full-meaning">{item.card.meaning}</p>
                    <div className="tarot-card-position-meaning">
                      <div className="tarot-position-label">位置意義：{item.positionZh}</div>
                      <div className="tarot-position-desc">
                        {item.position === 'past' ? '這張牌代表影響你現狀的過去能量——某個已發生的事件、決定或經歷，正在塑造你今天的處境。' :
                         item.position === 'present' ? '這張牌呈現你當下正在經歷的能量——這是此刻最核心的主題，需要你全心關注與面對。' :
                         item.position === 'single' ? '這張牌是你此刻最需要關注的課題，無論過去或未來，此刻的你需要聽見它的指引。' :
                         '這張牌指向可能的未來走向——不是宿命，而是如果你持續走在當前道路上，最可能發生的發展。'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="tarot-draw-again">
              <button className="tarot-draw-btn secondary" onClick={() => { setHasDrawn(false); setDrawnCards(null); }}>
                ✦ 再次抽取 ✦
              </button>
            </div>
          </div>
        )}

        {/* Deck info */}
        <div className="tarot-deck-info">
          <div className="section-label">The Rider-Waite Tarot</div>
          <div className="tarot-arcana-grid">
            <div className="tarot-arcana-item">
              <div className="tarot-arcana-num">22</div>
              <div className="tarot-arcana-label">大阿卡納</div>
              <div className="tarot-arcana-desc">代表人生主要課題與精神旅程</div>
            </div>
            <div className="tarot-arcana-item">
              <div className="tarot-arcana-num">56</div>
              <div className="tarot-arcana-label">小阿卡納</div>
              <div className="tarot-arcana-desc">對應日常生活各層面的具體能量</div>
            </div>
          </div>
          <div className="tarot-suits-intro">
            {SUITS.map(suit => (
              <div key={suit.name} className="tarot-suit-intro-item">
                <span className="tarot-suit-name">{suit.nameZh} {suit.name}</span>
                <span className="tarot-suit-element"> · {suit.element}元素</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Free limit modal */}
      <div className="tarot-free-limit-modal" style={{ display: 'none' }}>
        <div className="tarot-modal-content">
          <div className="tarot-modal-icon">✦</div>
          <h3>今日免費抽取次數已用完</h3>
          <p>免費用戶每日可抽取一次塔羅牌</p>
          <p>升級 Premium 可享有每日無限次占卜</p>
          <Link href="/daily" className="tarot-modal-cta">升級 Premium 解鎖無限占卜</Link>
          <button className="tarot-modal-close" onClick={(e) => (e.currentTarget as HTMLElement).style.display = 'none'}>×</button>
        </div>
      </div>

      <div className="tarot-footer-note">
        塔羅占卜僅供參考，不代表任何宿命論。命運掌握在自己手中。
      </div>
    </div>
  );
}
