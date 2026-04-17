export type ZodiacSign = 
  | 'aries' | 'taurus' | 'gemini' | 'cancer' 
  | 'leo' | 'virgo' | 'libra' | 'scorpio' 
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export interface HoroscopeData {
  name: string;
  emoji: string;
  element: string;
  personality: string;
  luckyColor: string;
  luckyNumber: number;
  luckyDirection: string;
  carePoints: string[];
  compatibleSigns: ZodiacSign[];
}

export const zodiacData: Record<ZodiacSign, HoroscopeData> = {
  aries: {
    name: '牡羊座', emoji: '♈', element: '火',
    personality: '積極、主動、充滿熱情，勇於冒險，喜歡領導。',
    luckyColor: '紅色', luckyNumber: 9, luckyDirection: '東方',
    carePoints: ['注意頭部及面部保養', '避免過度疲勞', '控制脾氣'],
    compatibleSigns: ['leo', 'sagittarius', 'gemini'],
  },
  taurus: {
    name: '金牛座', emoji: '♉', element: '土',
    personality: '穩重、忠誠、有耐心，務實且重視物質享受。',
    luckyColor: '綠色', luckyNumber: 6, luckyDirection: '北方',
    carePoints: ['喉嚨保養', '避免暴飲暴食', '注重頸部舒緩'],
    compatibleSigns: ['virgo', 'capricorn', 'cancer'],
  },
  gemini: {
    name: '雙子座', emoji: '♊', element: '風',
    personality: '機智、好奇、善於溝通，興趣廣泛但有時缺乏耐心。',
    luckyColor: '黃色', luckyNumber: 5, luckyDirection: '東方',
    carePoints: ['手部及手臂保養', '呼吸系統護理', '保持充足睡眠'],
    compatibleSigns: ['libra', 'aquarius', 'aries'],
  },
  cancer: {
    name: '巨蟹座', emoji: '♋', element: '水',
    personality: '溫柔、細膩、富有同情心，重視家庭與情感連結。',
    luckyColor: '銀色', luckyNumber: 2, luckyDirection: '北方',
    carePoints: ['胸部及胃部保養', '情緒管理', '充足睡眠'],
    compatibleSigns: ['scorpio', 'pisces', 'taurus'],
  },
  leo: {
    name: '獅子座', emoji: '♌', element: '火',
    personality: '自信、慷慨、充滿魅力，喜歡成為焦點。',
    luckyColor: '金色', luckyNumber: 1, luckyDirection: '北方',
    carePoints: ['背部及心臟保養', '曬後修護', '眼部護理'],
    compatibleSigns: ['aries', 'sagittarius', 'gemini'],
  },
  virgo: {
    name: '處女座', emoji: '♍', element: '土',
    personality: '細心、完美主義、善於分析，重視健康與整潔。',
    luckyColor: '棕色', luckyNumber: 5, luckyDirection: '南方',
    carePoints: ['腸道保養', '皮膚護理', '避免過度焦慮'],
    compatibleSigns: ['taurus', 'capricorn', 'cancer'],
  },
  libra: {
    name: '天秤座', emoji: '♎', element: '風',
    personality: '優雅、公正、和諧，追求平衡與美感。',
    luckyColor: '粉色', luckyNumber: 6, luckyDirection: '西方',
    carePoints: ['腰部及腎臟保養', '保持心情愉快', '充足水分'],
    compatibleSigns: ['gemini', 'aquarius', 'leo'],
  },
  scorpio: {
    name: '天蠍座', emoji: '♏', element: '水',
    personality: '神秘、深沉、洞察力強，情感強烈且忠誠。',
    luckyColor: '黑色', luckyNumber: 8, luckyDirection: '南方',
    carePoints: ['生殖系統保養', '情緒釋放', '排毒護理'],
    compatibleSigns: ['cancer', 'pisces', 'virgo'],
  },
  sagittarius: {
    name: '射手座', emoji: '♐', element: '火',
    personality: '樂觀、自由、愛冒險，熱愛旅行與探索。',
    luckyColor: '紫色', luckyNumber: 3, luckyDirection: '南方',
    carePoints: ['肝臟保養', '臀部及大腿護理', '避免過度消耗'],
    compatibleSigns: ['aries', 'leo', 'libra'],
  },
  capricorn: {
    name: '摩羯座', emoji: '♑', element: '土',
    personality: '務實、有毅力、負責任，追求成就與地位。',
    luckyColor: '灰色', luckyNumber: 4, luckyDirection: '南方',
    carePoints: ['關節及骨骼保養', '皮膚保濕', '適度放鬆'],
    compatibleSigns: ['taurus', 'virgo', 'scorpio'],
  },
  aquarius: {
    name: '水瓶座', emoji: '♒', element: '風',
    personality: '創新、独立、博愛，重視人道主義與自由。',
    luckyColor: '藍色', luckyNumber: 7, luckyDirection: '東方',
    carePoints: ['小腿及血液循環保養', '眼神經', '保持創意思維'],
    compatibleSigns: ['gemini', 'libra', 'sagittarius'],
  },
  pisces: {
    name: '雙魚座', emoji: '♓', element: '水',
    personality: '浪漫、敏感、富有想像力，藝術氣息濃厚。',
    luckyColor: '海綠色', luckyNumber: 12, luckyDirection: '西方',
    carePoints: ['足部及淋巴保養', '過敏體質護理', '心理調適'],
    compatibleSigns: ['cancer', 'scorpio', 'taurus'],
  },
};

export const monthNames = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月'
];
