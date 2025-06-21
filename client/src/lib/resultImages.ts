
// 결과별 이미지 URL을 반환하는 헬퍼 함수
export function getResultImageUrl(type: string, intensity: string): string {
  // 로컬 이미지가 있는지 확인하고, 없으면 기본 Unsplash 이미지 사용
  const localImageUrl = `/images/results/${type}-${intensity}.jpg`;
  
  // 기본 이미지 매핑 (현재 Unsplash 이미지들)
  const defaultImages: Record<string, Record<string, string>> = {
    'teto-male': {
      'very_strong': 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'strong': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'moderate': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'weak': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    },
    'estrogen-male': {
      'very_strong': 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'strong': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'moderate': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'weak': 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    },
    'teto-female': {
      'very_strong': 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'strong': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'moderate': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'weak': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    },
    'estrogen-female': {
      'very_strong': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'strong': 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'moderate': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'weak': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    }
  };

  // 나중에 로컬 이미지 체크 로직을 추가할 수 있음
  // 현재는 기본 이미지 반환
  return defaultImages[type]?.[intensity] || defaultImages['teto-male']['moderate'];
}

// 이미지가 로컬에 존재하는지 확인하는 함수 (향후 사용)
export async function checkLocalImageExists(type: string, intensity: string): Promise<boolean> {
  try {
    const response = await fetch(`/images/results/${type}-${intensity}.jpg`, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
