import { useEffect } from 'react';
import { useTest } from '@/contexts/TestContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { calculatePersonalityType } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  const {
    answers,
    shuffledQuestions,
    selectedGender,
    setTestResults,
    setCurrentScreen,
  } = useTest();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedGender && answers.length > 0 && shuffledQuestions.length > 0) {
        const results = calculatePersonalityType(answers, shuffledQuestions, selectedGender);
        setTestResults({
          ...results,
          gender: selectedGender,
        });
        setCurrentScreen('result');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [answers, shuffledQuestions, selectedGender, setTestResults, setCurrentScreen]);

  return (
    <div className="animate-fade-in">
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-teto-estrogen rounded-full flex items-center justify-center mx-auto mb-8">
          <Loader2 className="text-white h-8 w-8 animate-spin" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t('결과를 분석하고 있습니다...', 'Analyzing your results...')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t('잠시만 기다려주세요', 'Please wait a moment')}
        </p>
      </div>
    </div>
  );
}
