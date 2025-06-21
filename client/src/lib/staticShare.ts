
// Static share URL generator helper
export function generateStaticShareUrl(type: string, intensity: string, gender: string): string {
  // Create abbreviated code based on type, intensity, and gender
  const typeCode = type.includes('teto') ? 't' : 'e';
  const intensityCode = intensity === 'very_strong' ? 'v' : 
                       intensity === 'strong' ? 's' : 
                       intensity === 'moderate' ? 'm' : 'w';
  const genderCode = gender === 'male' ? 'm' : 'f';
  
  const code = `${typeCode}${intensityCode}${genderCode}`;
  
  return `/s/${code}.html`;
}

// Get static share URL mapping
export const staticShareMapping: Record<string, string> = {
  'teto-very_strong-male': 'tvm',
  'teto-strong-male': 'tsm',
  'teto-moderate-male': 'tmm',
  'teto-weak-male': 'twm',
  'estrogen-very_strong-male': 'evm',
  'estrogen-strong-male': 'esm',
  'estrogen-moderate-male': 'emm',
  'estrogen-weak-male': 'ewm',
  'teto-very_strong-female': 'tvf',
  'teto-strong-female': 'tsf',
  'teto-moderate-female': 'tmf',
  'teto-weak-female': 'twf',
  'estrogen-very_strong-female': 'evf',
  'estrogen-strong-female': 'esf',
  'estrogen-moderate-female': 'emf',
  'estrogen-weak-female': 'ewf'
};

export function getStaticShareUrl(type: string, intensity: string, gender: string): string {
  const key = `${type}-${intensity}-${gender}`;
  const code = staticShareMapping[key];
  
  if (!code) {
    console.warn(`No static share URL found for ${key}`);
    return '/';
  }
  
  return `/s/${code}.html`;
}
