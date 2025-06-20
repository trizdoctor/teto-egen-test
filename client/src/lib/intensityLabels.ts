export const intensityLabels = {
  ko: {
    ultra: '초강력',
    strong: '강력',
    normal: '',
    weak: '겨우'
  },
  en: {
    ultra: 'Ultra',
    strong: 'Strong',
    normal: '',
    weak: 'Barely'
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