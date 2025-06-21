
export const getPersonalizedMessage = (type: string, intensity: string, language: string) => {
  const messages = {
    ko: {
      'teto-male': {
        very_strong: [
          "당신은 타고난 리더! 강력한 카리스마와 추진력으로 모든 일을 이끌어가는 타입입니다.",
          "절대적인 자신감과 결단력을 가진 당신, 어떤 도전도 두려워하지 않는 진정한 알파형입니다.",
          "천부적인 지배력과 리더십을 지닌 당신은 주변 사람들에게 강한 영향력을 미치는 존재입니다."
        ],
        strong: [
          "확실한 추진력과 자기주장이 돋보이는 당신, 목표를 향해 거침없이 나아가는 적극적인 성향입니다.",
          "뚜렷한 남성적 매력과 주도성을 가진 당신은 그룹에서 자연스럽게 중심이 되는 타입입니다.",
          "강한 의지력과 실행력을 바탕으로 원하는 것을 얻어내는 능력이 뛰어난 당신입니다."
        ],
        moderate: [
          "적당한 리더십과 추진력을 가진 균형잡힌 성향으로, 상황에 따라 유연하게 대처하는 스타일입니다.",
          "때로는 주도하고 때로는 협력하는, 상황 판단력이 뛰어난 현실적인 성격입니다.",
          "겸손함과 자신감이 적절히 조화된, 안정적이면서도 추진력 있는 매력적인 성향입니다."
        ],
        weak: [
          "차분하고 신중한 성향으로, 급하게 판단하기보다 깊이 생각하고 행동하는 타입입니다.",
          "온화하고 협력적인 성격으로, 다른 사람의 의견을 존중하며 조화를 중시하는 스타일입니다.",
          "부드러운 카리스마를 가진 당신은 강압적이지 않으면서도 사람들에게 신뢰감을 주는 매력이 있습니다."
        ]
      },
      'estrogen-male': {
        very_strong: [
          "예술적 감성과 섬세한 감수성이 뛰어난 당신은 깊이 있는 내면의 세계를 가진 매력적인 성향입니다.",
          "뛰어난 공감능력과 따뜻한 마음을 가진 당신은 사람들에게 위로와 힐링을 주는 특별한 존재입니다.",
          "풍부한 감성과 창의적 사고로 세상을 아름답게 바라보는 당신만의 독특한 매력이 있습니다."
        ],
        strong: [
          "감성적이고 세심한 당신은 다른 사람의 마음을 잘 이해하고 배려하는 따뜻한 성격입니다.",
          "예술적 취향과 미적 감각이 발달한 당신은 트렌드에 민감하고 스타일리시한 매력을 가지고 있습니다.",
          "부드러운 카리스마와 섬세한 감수성으로 사람들에게 편안함을 주는 특별한 능력이 있습니다."
        ],
        moderate: [
          "적당한 감수성과 현실감각을 모두 갖춘 균형잡힌 성향으로, 상황에 맞게 유연하게 대응합니다.",
          "때로는 감성적이고 때로는 이성적인, 다양한 면모를 가진 흥미로운 성격입니다.",
          "섬세함과 강인함이 조화된 당신은 예측하기 어려운 매력적인 반전 캐릭터입니다."
        ],
        weak: [
          "현실적이고 실용적인 성향이 강한 당신은 안정적이고 믿음직한 파트너가 될 수 있는 타입입니다.",
          "차분하고 이성적인 판단력을 가진 당신은 감정보다 논리를 우선시하는 현실주의자입니다.",
          "꾸준하고 성실한 성격으로, 한번 시작한 일은 끝까지 해내는 책임감 있는 스타일입니다."
        ]
      },
      'teto-female': {
        very_strong: [
          "강력한 에너지와 카리스마를 가진 당신은 어떤 상황에서도 주도권을 잡는 진정한 리더형입니다.",
          "독립적이고 자유로운 영혼을 가진 당신은 자신만의 길을 개척해나가는 개척자 타입입니다.",
          "불타는 열정과 추진력으로 목표를 향해 직진하는 당신은 모든 일을 성취해내는 강인한 여성입니다."
        ],
        strong: [
          "활발하고 에너지 넘치는 당신은 주변 사람들에게 긍정적인 영향을 미치는 밝은 성격입니다.",
          "자기주장이 분명하고 추진력 있는 당신은 자신의 의견을 당당하게 표현하는 현대적인 여성입니다.",
          "도전정신이 강하고 경쟁력 있는 당신은 어떤 어려움도 극복해내는 강한 의지력을 가지고 있습니다."
        ],
        moderate: [
          "적절한 추진력과 여성스러움이 조화된 균형잡힌 매력을 가진 당신은 상황에 맞게 유연한 모습을 보입니다.",
          "때로는 강하고 때로는 부드러운, 다면적인 매력을 가진 흥미로운 성격입니다.",
          "현실적 판단력과 추진력을 모두 갖춘 당신은 실용적이면서도 매력적인 스타일입니다."
        ],
        weak: [
          "온화하고 협력적인 성향으로, 조화를 중시하며 평화로운 관계를 선호하는 따뜻한 성격입니다.",
          "신중하고 배려심 많은 당신은 다른 사람의 의견을 존중하며 함께 성장하는 것을 중요하게 생각합니다.",
          "부드러운 카리스마로 사람들에게 편안함을 주는 당신은 자연스럽게 신뢰를 얻는 매력이 있습니다."
        ]
      },
      'estrogen-female': {
        very_strong: [
          "완벽한 여성스러움과 우아한 매력을 가진 당신은 클래식한 아름다움의 정석을 보여주는 스타일입니다.",
          "섬세한 감수성과 예술적 감각이 뛰어난 당신은 로맨틱하고 감성적인 세계의 주인공입니다.",
          "따뜻한 마음과 배려심으로 주변 사람들에게 위로와 사랑을 전하는 천사 같은 존재입니다."
        ],
        strong: [
          "우아하고 세련된 매력을 가진 당신은 패션과 뷰티에 대한 뛰어난 감각을 지니고 있습니다.",
          "감성적이고 로맨틱한 성향으로, 아름다운 것들을 사랑하고 추구하는 예술적인 영혼입니다.",
          "부드럽고 따뜻한 카리스마로 사람들에게 편안함과 행복을 주는 특별한 능력을 가지고 있습니다."
        ],
        moderate: [
          "전통적인 여성스러움과 현대적 감각이 조화된 균형잡힌 매력을 가진 스타일입니다.",
          "때로는 감성적이고 때로는 현실적인, 상황에 맞게 유연하게 대응하는 지혜로운 성격입니다.",
          "섬세함과 강인함을 모두 갖춘 당신은 예측할 수 없는 매력적인 반전을 가지고 있습니다."
        ],
        weak: [
          "현실적이고 실용적인 성향이 강한 당신은 안정적이고 믿음직한 동반자가 될 수 있는 타입입니다.",
          "차분하고 이성적인 판단력을 가진 당신은 감정보다 논리를 우선시하는 현명한 여성입니다.",
          "꾸준하고 성실한 성격으로, 맡은 일에 책임감을 가지고 끝까지 해내는 신뢰할 수 있는 스타일입니다."
        ]
      }
    },
    en: {
      'teto-male': {
        very_strong: [
          "You're a born leader! With powerful charisma and drive, you're the type who leads everything forward.",
          "With absolute confidence and decisiveness, you're a true alpha who fears no challenge.",
          "With natural dominance and leadership, you're someone who has a strong influence on those around you."
        ],
        strong: [
          "With clear drive and self-assertion, you're an active type who moves forward relentlessly toward goals.",
          "With distinct masculine charm and initiative, you're naturally the center of any group.",
          "Based on strong willpower and execution ability, you excel at getting what you want."
        ],
        moderate: [
          "With moderate leadership and drive, you're a balanced type who flexibly adapts to situations.",
          "Sometimes leading, sometimes cooperating - you're a realistic personality with excellent situational judgment.",
          "With humility and confidence properly harmonized, you have an attractive, stable yet driven nature."
        ],
        weak: [
          "With a calm and careful nature, you're the type who thinks deeply before acting rather than making hasty judgments.",
          "With a gentle and cooperative personality, you respect others' opinions and value harmony.",
          "With soft charisma, you have the charm of gaining people's trust without being forceful."
        ]
      },
      'estrogen-male': {
        very_strong: [
          "With excellent artistic sensibility and delicate sensitivity, you have an attractive nature with a deep inner world.",
          "With outstanding empathy and a warm heart, you're a special being who brings comfort and healing to people.",
          "With rich emotions and creative thinking, you have your own unique charm of seeing the world beautifully."
        ],
        strong: [
          "Emotional and meticulous, you have a warm personality that understands and cares for others' hearts well.",
          "With developed artistic taste and aesthetic sense, you're sensitive to trends and have stylish charm.",
          "With soft charisma and delicate sensitivity, you have the special ability to make people feel comfortable."
        ],
        moderate: [
          "With both moderate sensitivity and realistic sense, you're a balanced type who responds flexibly to situations.",
          "Sometimes emotional, sometimes rational - you're an interesting personality with various aspects.",
          "With delicacy and strength harmonized, you're an attractive character with unpredictable reversals."
        ],
        weak: [
          "With strong realistic and practical tendencies, you're a type who can be a stable and reliable partner.",
          "With calm and rational judgment, you're a realist who prioritizes logic over emotion.",
          "With a steady and sincere personality, you're a responsible style who sees things through to the end once started."
        ]
      },
      'teto-female': {
        very_strong: [
          "With powerful energy and charisma, you're a true leader type who takes the initiative in any situation.",
          "With an independent and free spirit, you're a pioneer type who carves your own path.",
          "With burning passion and drive moving straight toward goals, you're a strong woman who achieves everything."
        ],
        strong: [
          "Active and energetic, you have a bright personality that positively influences those around you.",
          "With clear self-assertion and drive, you're a modern woman who confidently expresses your opinions.",
          "With strong challenging spirit and competitiveness, you have strong willpower to overcome any difficulty."
        ],
        moderate: [
          "With appropriate drive and femininity harmonized, you show flexible aspects suitable to situations.",
          "Sometimes strong, sometimes soft - you're an interesting personality with multifaceted charm.",
          "With both realistic judgment and drive, you're a practical yet attractive style."
        ],
        weak: [
          "With a gentle and cooperative nature, you have a warm personality that values harmony and prefers peaceful relationships.",
          "Careful and considerate, you respect others' opinions and value growing together.",
          "With soft charisma that makes people comfortable, you naturally earn trust."
        ]
      },
      'estrogen-female': {
        very_strong: [
          "With perfect femininity and elegant charm, you're a style that shows the essence of classic beauty.",
          "With excellent delicate sensitivity and artistic sense, you're the protagonist of a romantic and emotional world.",
          "With a warm heart and consideration, you're an angel-like being who delivers comfort and love to those around you."
        ],
        strong: [
          "With elegant and refined charm, you have excellent sense in fashion and beauty.",
          "With emotional and romantic tendencies, you're an artistic soul who loves and pursues beautiful things.",
          "With soft and warm charisma, you have the special ability to bring comfort and happiness to people."
        ],
        moderate: [
          "With traditional femininity and modern sense harmonized, you're a style with balanced charm.",
          "Sometimes emotional, sometimes realistic - you're a wise personality who responds flexibly to situations.",
          "With both delicacy and strength, you have attractive unpredictable reversals."
        ],
        weak: [
          "With strong realistic and practical tendencies, you're a type who can be a stable and reliable companion.",
          "With calm and rational judgment, you're a wise woman who prioritizes logic over emotion.",
          "With a steady and sincere personality, you're a trustworthy style who takes responsibility and sees things through to the end."
        ]
      }
    }
  };

  const typeMessages = messages[language]?.[type]?.[intensity];
  if (!typeMessages || typeMessages.length === 0) {
    return language === 'ko' ? '특별한 성향을 가지고 있습니다.' : 'You have a special personality.';
  }

  const randomIndex = Math.floor(Math.random() * typeMessages.length);
  return typeMessages[randomIndex];
};
