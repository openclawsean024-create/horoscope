export interface ZodiacSign {
  name: string;
  emoji: string;
  element: '火' | '土' | '風' | '水';
  description: string;
  luckyColor: string;
  luckyNumber: number;
  luckyDirection: string;
  personality: {
    traits: string[];
  };
  carePoints: string[];
  compatibleSigns: string[];
}

export const zodiacData: Record<string, ZodiacSign> = {
  aries: {
    name: "牡羊座",
    emoji: "♈",
    element: "火",
    description: "牡羊座是十二星座中最充滿活力的先驅者，猶如春天的第一道陽光，總是迫不及待地率先行動。他們是天生的領導者，擁有難以阻擋的衝勁與勇氣，面對挑戰時從不退縮。牡羊座的人熱情洋溢，對生活充滿無限的期待與好奇心，勇於冒險的精神讓他們常常成為開創新局的先鋒。他們說話直接、做事果斷，不喜歡拖泥帶水，討厭猶豫不決的態度。獨立自主是牡羊的核心特質，他們偏好靠自己闖出一片天，不過有時也因為過於急切而顯得缺乏耐心。強烈的競爭心驅使他們不斷追求勝利與成就，但在感情上也有柔軟細膩的一面，只是較少輕易展露。",
    luckyColor: "紅色",
    luckyNumber: 9,
    luckyDirection: "東方",
    personality: {
      traits: ["自信", "勇敢", "行動力強", "領導力", "冒險精神", "積極", "熱情", "果斷", "獨立", "競爭心"]
    },
    carePoints: ["注意頭部及面部保養", "避免過度疲勞", "控制脾氣"],
    compatibleSigns: ["leo", "sagittarius", "gemini"]
  },
  taurus: {
    name: "金牛座",
    emoji: "♉",
    element: "土",
    description: "金牛座的人如同大地般堅實可靠，是十二星座中最具穩定力量的存在。他們腳踏實地、務實穩重，無論面對工作還是感情，都以踏實的態度一步一腳印地前進。忠誠是金牛最閃亮的標誌，一旦認定了的人事物便不會輕易改變，這份專一讓他們在感情中成為最可靠的伴侶。金牛座天生具有藝術品味，對美的事物有敏銳的觀察力，無論是音樂、美術還是美食，都能欣賞並享受其中的樂趣。他們注重生活品質，偏好舒適的環境與精緻的物質享受，不過有時可能顯得過於重視外在條件。在理財方面，金牛座有獨到的天賦，善於累積與管理財富，雖然固執的個性有時會讓他們顯得難以變通，但那份不放棄的毅力正是他們成功的關鍵。",
    luckyColor: "綠色",
    luckyNumber: 6,
    luckyDirection: "北方",
    personality: {
      traits: ["穩重", "忠誠", "耐心", "務實", "可靠的", "固執", "物質主義", "享受主義", "藝術感", "理財高手"]
    },
    carePoints: ["喉嚨保養", "避免暴飲暴食", "注重頸部舒緩"],
    compatibleSigns: ["virgo", "capricorn", "cancer"]
  },
  gemini: {
    name: "雙子座",
    emoji: "♊",
    element: "風",
    description: "雙子座是風象星座中最活潑靈動的存在，擁有如水銀般靈活多變的思維。他們好奇心旺盛，對世界上一切事物都抱持著強烈的興趣，恨不得自己能夠同時體驗所有有趣的事情。雙子座是天生的溝通高手，語言能力出眾，總能輕鬆與各種人建立聯繫，機智幽默的談吐讓身邊的人感到愉快。他們思維敏捷、反應快速，腦中永遠轉著無數的新點子，多才多藝的特質讓他們能在不同領域都有所涉獵。適應力極強是雙子座的優勢，無論環境如何變化都能從容應對。不過雙子座的多變也可能讓人難以捉摸，有時顯得有些不夠專一或缺乏恆心。他們熱愛資訊與知識的交流，腦中裝著五花八門的資訊，聊天時總能帶來新奇有趣的話題，是朋友圈中最受歡迎的開心果。",
    luckyColor: "黃色",
    luckyNumber: 5,
    luckyDirection: "東方",
    personality: {
      traits: ["機智", "好奇", "善變", "溝通高手", "多才多藝", "社交活躍", "適應力強", "思維敏捷", "幽默風趣", "資訊愛好者"]
    },
    carePoints: ["手部及手臂保養", "呼吸系統護理", "保持充足睡眠"],
    compatibleSigns: ["libra", "aquarius", "aries"]
  },
  cancer: {
    name: "巨蟹座",
    emoji: "♋",
    element: "水",
    description: "巨蟹座是十二星座中最具母性光輝的存在，如同大海容納萬物般，總是給人身邊的人溫暖與安全感。他們情感世界豐富而細膩，對於在乎的人會全心全意地付出與關懷，是最忠誠體貼的夥伴與伴侶。家庭在巨蟹座心中佔據最核心的位置，他們會不惜一切保護並守護自己的家人，平時低調內斂，但需要的時候永遠是第一個站出來的人。巨蟹座的直覺能力非常敏銳，往往能感受到別人察覺不到的情感波動，這份敏感讓他們在照顧他人情緒方面特別在行。他們或許不善於直接表達自己的感受，但會用實際行動來證明關心。巨蟹座忠誠度極高，一旦建立了深厚的情感連結，便不會輕易放棄。害羞低調的特質讓他們有時顯得較為低調，但內心其實非常渴望被愛與被理解。",
    luckyColor: "銀色",
    luckyNumber: 2,
    luckyDirection: "北方",
    personality: {
      traits: ["溫柔", "體貼", "情感豐富", "家庭導向", "直覺敏銳", "守護者", "害羞", "敏感", "忠誠", "記憶力強"]
    },
    carePoints: ["胸部及胃部保養", "情緒管理", "充足睡眠"],
    compatibleSigns: ["scorpio", "pisces", "taurus"]
  },
  leo: {
    name: "獅子座",
    emoji: "♌",
    element: "火",
    description: "獅子座是王者之星，天生自帶光環走到哪裡都是焦點所在。他們自信滿滿、魅力四射，身邊的人往往會被那種獨特的氣場所吸引，不自覺地想要靠近。獅子座喜歡成為中心，戲劇化的表達方式與生俱來，無論是歡笑還是感動都能帶給周遭滿滿的能量。他們慷慨大方，對朋友與親人毫不吝嗇，願意分享自己所有的一切，是那種會為重要的人一擲千金的豪爽類型。作為天生的領導者，獅子座有著激勵人心的魅力，能讓團隊充滿鬥志向前邁進。自尊心較強是獅子座的特質，他們需要被肯定與讚賞，但不能接受虛假的奉承。忠誠是獅子最閃亮的優點之一，對於真心對待自己的人會以同樣的真誠回報。創造力十足的獅子座在藝術與表演方面常有出色的表現，那份開朗大方的處世態度讓他們活出了生命中最璀璨的光彩。",
    luckyColor: "金色",
    luckyNumber: 1,
    luckyDirection: "北方",
    personality: {
      traits: ["自信", "慷慨", "魅力四射", "領導者", "戲劇化", "忠誠", "創造力強", "自尊心高", "開朗大方", "行動力十足"]
    },
    carePoints: ["背部及心臟保養", "曬後修護", "眼部護理"],
    compatibleSigns: ["aries", "sagittarius", "gemini"]
  },
  virgo: {
    name: "處女座",
    emoji: "♍",
    element: "土",
    description: "處女座是完美主義者的代表，對任何事情都有極高的標準，追求精益求精是他們的人生信念。他們心思細密、觀察入微，總能注意到被別人忽略的細節，這份細心讓他們在處理事務時很少出錯，是天生的品質把關者。分析力是處女座最銳利的武器，無論多複雜的問題都能抽絲剝繭地找出關鍵所在，理性務實的態度讓他們在工作中值得信賴。勤奮努力的特質使處女座願意在幕後默默付出，做事有條有理、腳踏實地，是那種默默耕耘的實力派。他們對健康與生活環境的整潔非常注重，相信好的生活作息是成功的基礎。處女座有著強烈的服務精神，樂於幫助他人改善缺點，不過有時過度的批評性會讓人感到壓力。謙遜低調的處女座不善於炫耀自己，但他們的可靠與專業終究會被看見，細水長流的成功方式正是他們的處世哲學。",
    luckyColor: "棕色",
    luckyNumber: 5,
    luckyDirection: "南方",
    personality: {
      traits: ["細心", "完美主義", "分析力強", "勤奮", "實用主義", "善於批評", "謙遜", "有條理", "健康導向", "服務精神"]
    },
    carePoints: ["腸道保養", "皮膚護理", "避免過度焦慮"],
    compatibleSigns: ["taurus", "capricorn", "cancer"]
  },
  libra: {
    name: "天秤座",
    emoji: "♎",
    element: "風",
    description: "天秤座是優雅與和諧的化身，如同秋日午后的微風般舒適宜人。他們天生具有卓越的社交能力，能在各色各樣的人群中游刃有餘，是派對與洽談場合中最迷人的存在。天秤座極度重視公平正義，對於任何不公平的事情都會站出來發聲，是正義的守護者。他們渴望和諧的人際關係，會努力調解身邊的衝突與矛盾，是天生的外交官與調解者。浪漫主義的天秤座對美有著執著的追求，無論是藝術品還是生活品味都有獨到的眼光，審美觀極佳。理性與邏輯思維是他們決策的重要依據，不會輕易被情感冲昏頭腦。天秤座在愛情中浪漫而體貼，願意為伴侶營造美好的生活體驗。猶豫不決是他們最大的弱點，面對重大決策時常常左右為難，無法果斷地做出選擇，需要仰賴身邊的人給予建議與支持。",
    luckyColor: "粉色",
    luckyNumber: 6,
    luckyDirection: "西方",
    personality: {
      traits: ["優雅", "公正", "和諧至上", "社交高手", "猶豫不決", "浪漫主義", "審美觀佳", "外交能力強", "理性", "調解者"]
    },
    carePoints: ["腰部及腎臟保養", "保持心情愉快", "充足水分"],
    compatibleSigns: ["gemini", "aquarius", "leo"]
  },
  scorpio: {
    name: "天蠍座",
    emoji: "♏",
    element: "水",
    description: "天蠍座是十二星座中最具深度與神秘感的存在，如同深海般難以探測。他們洞察力極強，擁有看穿人心思的本能，別人的一舉一動都很難逃過天蠍的眼睛。意志力頑強是天蠍最驚人的特質，一旦立下目標就會全力以赴，不達目的絕不罷休，那份執著與決心令人敬畏。情感世界豐富而激烈，天蠍的愛恨都很分明，對於在乎的人會以全部的熱情去守護，但一旦受到背叛，強烈的報復心也可能會顯露出來。忠誠度極高的天蠍在感情中是最認真投入的星座，一旦確認了關係便會完全奉獻自己，是個專一且用情的伴侶。直覺敏銳讓天蠍在很多場合能預知事情的發展，成為團隊中不可或缺的策略家。他們低調神秘不善交際，但身邊的人會感受到那份深沉的保護欲，天蠍願意為了重要的人赴湯蹈火，在低調中展現最堅定的支持。",
    luckyColor: "黑色",
    luckyNumber: 8,
    luckyDirection: "南方",
    personality: {
      traits: ["神秘", "洞察力強", "意志力堅定", "情感激烈", "占有欲強", "忠誠", "復仇心重", "直覺準確", "執著", "保護者"]
    },
    carePoints: ["生殖系統保養", "情緒釋放", "排毒護理"],
    compatibleSigns: ["cancer", "pisces", "virgo"]
  },
  sagittarius: {
    name: "射手座",
    emoji: "♐",
    element: "火",
    description: "射手座是永遠的探索者與冒險家，靈魂中燃燒著對自由的渴望，猶如一支永不回頭的箭。他們天生樂觀開朗，即使面對困境也能保持正向的心態，身邊的人常會被那份積極的能量所感染。熱愛旅行與探索是射手座最明顯的特徵，他們渴望走遍世界的每一個角落，體驗不同文化的洗禮與刺激。直率而坦誠是射手的處事風格，說話不喜歡拐彎抹角，有什麼就說什麼，有時可能顯得有些白目但內心真誠。好奇心旺盛的射手永遠在學習新事物的路上，對哲學、知識與真理有著執著的追求，頭腦中裝著五花八門的見識。慷慨大方的特質讓他們樂於與人分享，結交各路朋友。獨立自主的他們需要空間與自由，討厭被束縛或被困在任何框架中。有時略帶粗心大意，可能忽略了一些重要的細節，但整體而言射手座是個能為周遭帶來歡笑與正能量的存在，是朋友圈中最受歡迎的開心果與心靈導師。",
    luckyColor: "紫色",
    luckyNumber: 3,
    luckyDirection: "南方",
    personality: {
      traits: ["樂觀", "自由奔放", "愛冒險", "直率", "好奇心旺", "慷慨", "獨立", "粗心大意", "追求真理", "幽默"]
    },
    carePoints: ["肝臟保養", "臀部及大腿護理", "避免過度消耗"],
    compatibleSigns: ["aries", "leo", "libra"]
  },
  capricorn: {
    name: "摩羯座",
    emoji: "♑",
    element: "土",
    description: "摩羯座是土象星座中最具企圖心的存在，他們如同登山者般，一步一腳印地向著山頂前進，從不放棄。他們務實踏實，不相信捷徑，只相信努力與紀律，自律甚嚴是達成目標的關鍵。責任感強的特質讓摩羯在職場與生活中都是最可靠的人選，交辦的事情一定會盡心盡力完成，是那種讓人安心的存在。野心勃勃的他們胸懷大志，不甘於平凡，渴望在社會上取得成就與地位，是天生的工作狂人。傳統而嚴肅的態度讓摩羯在處事上顯得較為謹慎，不會做出輕率的決定，每一步都是經過深思熟慮的。耐心是摩羯最大的武器之一，他們願意等待，為了長遠的目標可以忍受暫時的挫折與不順。策略思考讓他們在競爭中總能發現突破口，穩健踏實地朝著目標前進。摩羯座不善於表達情感，但內心深處其實比誰都渴望被人理解與肯定，那份對成功的執著追求正是他们生命的最大動力。",
    luckyColor: "灰色",
    luckyNumber: 4,
    luckyDirection: "南方",
    personality: {
      traits: ["務實", "有毅力", "責任心強", "野心勃勃", "自律", "耐心", "傳統主義", "嚴肅", "有抱負", "策略思考"]
    },
    carePoints: ["關節及骨骼保養", "皮膚保濕", "適度放鬆"],
    compatibleSigns: ["taurus", "virgo", "scorpio"]
  },
  aquarius: {
    name: "水瓶座",
    emoji: "♒",
    element: "風",
    description: "水瓶座是十二星座中最具前瞻性與創新思維的存在，彷彿是來自未來的使者，總是想在時代的前端。他們獨立自主，極度珍視個人的自由與空間，不喜歡被傳統規範束縛，敢於挑戰既有的框架與觀念。博愛精神是水瓶座最溫暖的特質，他們真心關懷社會、關心弱勢群體，對於推動人道主義事業有著強烈的使命感。理性客觀的特質讓水瓶在分析問題時能跳脫主觀情感，給出公正合理的判斷，是天生的改革者與發明家。水瓶座的思維跳躍而獨特，有時想法會被認為怪異前衛，但這些超前的點子往往能開創全新的可能。他們固執已見，一旦相信某件事就很難被說服改變，這是優點也是缺點。社交活躍的水瓶座擁有廣泛的人脈，樂於與不同背景的人交流思想，在群體中往往扮演著啟發者的角色。水瓶守護著自己內心那片不受干擾的天地，在獨處中思考、創新，為世界帶來一個又一個令人驚喜的發明與想法。",
    luckyColor: "藍色",
    luckyNumber: 7,
    luckyDirection: "東方",
    personality: {
      traits: ["創新", "獨立", "博愛", "怪異", "理性", "人道主義", "固執已見", "社交活躍", "發明家", "客觀"]
    },
    carePoints: ["小腿及血液循環保養", "眼神經", "保持創意思維"],
    compatibleSigns: ["gemini", "libra", "sagittarius"]
  },
  pisces: {
    name: "雙魚座",
    emoji: "♓",
    element: "水",
    description: "雙魚座是十二星座中最富有詩意與浪漫情懷的存在，如同清晨霧中的海洋，朦朧而美麗，令人充滿無限遐想。他們擁有豐富的想像力與敏銳的感受力，藝術氣息與創造力渾然天成，在藝術與音樂的領域常展現出過人的天賦。敏感纖細是雙魚與生俱來的特質，身邊人的情緒波動他們都能細微地感受到，這份同理心讓他們成為最溫暖的傾聽者與安慰者。直覺力驚人的雙魚有時能感知到許多超越現實的事情，常在關鍵時刻爆發出準確的預感。浪漫主義的雙魚渴望童話般的愛情，願意為愛付出所有，是十二星座中最能奉獻犧牲的伴侶。適應力極強讓雙魚能在各種環境中生存，無論順境逆境都能找到生存的方式。他們有點情緒化，容易被外界的變化影響心情，需要學會情緒管理。雙魚是夢想家，腦中永遠充滿著綺麗的幻想，有時候太過活在夢中而忽略了現實，但那份對世界的慈悲與大愛，讓雙魚座成為人間最美的天使。",
    luckyColor: "海綠色",
    luckyNumber: 12,
    luckyDirection: "西方",
    personality: {
      traits: ["浪漫", "敏感", "富有想像力", "藝術氣息", "直覺力強", "適應力佳", "奉獻精神", "情緒化", "夢想家", "慈悲為懷"]
    },
    carePoints: ["足部及淋巴保養", "過敏體質護理", "心理調適"],
    compatibleSigns: ["cancer", "scorpio", "taurus"]
  }
};

export const COMPATIBILITY: Record<string, number> = {
  "aries-leo": 5, "aries-sagittarius": 5, "aries-gemini": 4, "aries-scorpio": 3, "aries-aquarius": 3,
  "aries-taurus": 2, "aries-virgo": 2, "aries-libra": 2, "aries-cancer": 2, "aries-capricorn": 2, "aries-pisces": 2,
  "taurus-virgo": 5, "taurus-capricorn": 5, "taurus-cancer": 4, "taurus-pisces": 4, "taurus-scorpio": 3,
  "taurus-gemini": 2, "taurus-libra": 2, "taurus-aquarius": 2, "taurus-aries": 2, "taurus-leo": 2, "taurus-sagittarius": 2,
  "gemini-libra": 5, "gemini-aquarius": 5, "gemini-sagittarius": 4, "gemini-aries": 4, "gemini-leo": 3,
  "gemini-virgo": 2, "gemini-cancer": 2, "gemini-taurus": 2, "gemini-capricorn": 2, "gemini-scorpio": 2, "gemini-pisces": 2,
  "cancer-scorpio": 5, "cancer-pisces": 5, "cancer-taurus": 4, "cancer-virgo": 4, "cancer-capricorn": 3,
  "cancer-gemini": 2, "cancer-libra": 2, "cancer-aries": 2, "cancer-leo": 2, "cancer-sagittarius": 2, "cancer-aquarius": 2,
  "leo-sagittarius": 5, "leo-aries": 5, "leo-gemini": 4, "leo-libra": 3, "leo-aquarius": 3,
  "leo-taurus": 2, "leo-virgo": 2, "leo-scorpio": 2, "leo-pisces": 2, "leo-cancer": 2, "leo-capricorn": 2,
  "virgo-capricorn": 5, "virgo-taurus": 5, "virgo-cancer": 4, "virgo-scorpio": 4, "virgo-pisces": 3,
  "virgo-gemini": 2, "virgo-libra": 2, "virgo-aries": 2, "virgo-leo": 2, "virgo-sagittarius": 2, "virgo-aquarius": 2,
  "libra-aquarius": 5, "libra-gemini": 5, "libra-sagittarius": 4, "libra-leo": 3,
  "libra-aries": 2, "libra-taurus": 2, "libra-virgo": 2, "libra-scorpio": 2, "libra-pisces": 2, "libra-cancer": 2, "libra-capricorn": 2,
  "scorpio-pisces": 5, "scorpio-cancer": 5, "scorpio-virgo": 4, "scorpio-capricorn": 4, "scorpio-taurus": 3, "scorpio-aries": 3,
  "scorpio-gemini": 2, "scorpio-libra": 2, "scorpio-leo": 2, "scorpio-sagittarius": 2, "scorpio-aquarius": 2,
  "sagittarius-aries": 5, "sagittarius-leo": 5, "sagittarius-libra": 4, "sagittarius-gemini": 4, "sagittarius-aquarius": 3,
  "sagittarius-taurus": 2, "sagittarius-virgo": 2, "sagittarius-scorpio": 2, "sagittarius-pisces": 2, "sagittarius-cancer": 2, "sagittarius-capricorn": 2,
  "capricorn-virgo": 5, "capricorn-taurus": 5, "capricorn-scorpio": 4, "capricorn-cancer": 3, "capricorn-pisces": 3,
  "capricorn-gemini": 2, "capricorn-libra": 2, "capricorn-aries": 2, "capricorn-leo": 2, "capricorn-sagittarius": 2, "capricorn-aquarius": 2,
  "aquarius-libra": 5, "aquarius-gemini": 5, "aquarius-sagittarius": 4, "aquarius-aries": 3, "aquarius-leo": 3,
  "aquarius-taurus": 2, "aquarius-virgo": 2, "aquarius-scorpio": 2, "aquarius-pisces": 2, "aquarius-cancer": 2, "aquarius-capricorn": 2,
  "pisces-scorpio": 5, "pisces-cancer": 5, "pisces-taurus": 4, "pisces-virgo": 3, "pisces-capricorn": 3,
  "pisces-gemini": 2, "pisces-libra": 2, "pisces-aries": 2, "pisces-leo": 2, "pisces-sagittarius": 2, "pisces-aquarius": 2,
};

export function getCompatibility(sign1: string, sign2: string): number {
  const key1 = `${sign1}-${sign2}`;
  const key2 = `${sign2}-${sign1}`;
  return COMPATIBILITY[key1] ?? COMPATIBILITY[key2] ?? 2;
}

export const ELEMENT_COLORS: Record<string, string> = {
  "火": "#e07040",
  "土": "#8b6f47",
  "風": "#6a9fb5",
  "水": "#4a7a9b"
};

export const ELEMENT_ICONS: Record<string, string> = {
  "火": "🔥",
  "土": "🌍",
  "風": "💨",
  "水": "💧"
};
