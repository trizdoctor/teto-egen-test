import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function calculatePersonalityType(
  answers: number[],
  questions: any[],
  gender: 'male' | 'female'
): {
  type: string;
  tetoPercentage: number;
  estrogenPercentage: number;
  intensity: string;
} {
  let tetoScore = 0;
  let estrogenScore = 0;

  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex !== null && questions[questionIndex]) {
      const question = questions[questionIndex];
      const option = question.options[answerIndex];
      if (option && option.score) {
        tetoScore += option.score.teto || 0;
        estrogenScore += option.score.estrogen || 0;
      }
    }
  });

  const totalScore = tetoScore + estrogenScore;
  const tetoPercentage = totalScore > 0 ? Math.round((tetoScore / totalScore) * 100) : 50;
  const estrogenPercentage = 100 - tetoPercentage;

  let personalityType: string;
  let dominantPercentage: number;
  
  if (gender === 'male') {
    personalityType = tetoScore >= estrogenScore ? 'teto-male' : 'estrogen-male';
    dominantPercentage = tetoScore >= estrogenScore ? tetoPercentage : estrogenPercentage;
  } else {
    personalityType = tetoScore >= estrogenScore ? 'teto-female' : 'estrogen-female';
    dominantPercentage = tetoScore >= estrogenScore ? tetoPercentage : estrogenPercentage;
  }

  // Determine intensity based on dominant percentage
  let intensity: string;
  if (dominantPercentage >= 85) {
    intensity = 'ultra';
  } else if (dominantPercentage >= 70) {
    intensity = 'strong';
  } else if (dominantPercentage >= 55) {
    intensity = 'normal';
  } else {
    intensity = 'weak';
  }

  return {
    type: personalityType,
    tetoPercentage,
    estrogenPercentage,
    intensity,
  };
}
