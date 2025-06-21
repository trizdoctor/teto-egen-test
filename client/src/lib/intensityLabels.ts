export const intensityLabels = {
  ko: {
    very_strong: '초강력',
    strong: '뚜렷한',
    moderate: '살짝',
    weak: '약한'
  },
  en: {
    very_strong: 'Super Strong',
    strong: 'Distinct', 
    moderate: 'Barely',
    weak: 'Weak'
  }
};

export function getIntensityLabel(intensity: string, language: 'ko' | 'en'): string {
  return intensityLabels[language][intensity as keyof typeof intensityLabels['ko']] || '';
}

export function getIntensityColor(intensity: string): string {
  switch (intensity) {
    case 'ultra':
      return 'bg-gradient-to-r from-red-500 to-pink-600';
    case 'strong':
      return 'bg-gradient-to-r from-orange-500 to-red-500';
    case 'normal':
      return 'bg-gradient-teto-estrogen';
    case 'weak':
      return 'bg-gradient-to-r from-gray-400 to-gray-500';
    default:
      return 'bg-gradient-teto-estrogen';
  }
}