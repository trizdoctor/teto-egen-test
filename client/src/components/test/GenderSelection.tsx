import { useTest } from '@/contexts/TestContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function GenderSelection() {
  const { setSelectedGender, setCurrentScreen, initializeQuestions } = useTest();
  const { language, t } = useLanguage();

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    initializeQuestions(language);
    setCurrentScreen('question');
  };

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('성별을 선택해주세요', 'Please select your gender')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('더 정확한 결과를 위해 필요합니다', 'Required for more accurate results')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-500 border-2 border-transparent">
          <CardContent className="p-8" onClick={() => handleGenderSelect('male')}>
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.5 11c1.93 0 3.5 1.57 3.5 3.5S11.43 18 9.5 18 6 16.43 6 14.5 7.57 11 9.5 11zm0-2C6.46 9 4 11.46 4 14.5S6.46 20 9.5 20s5.5-2.46 5.5-5.5c0-1.16-.36-2.23-.97-3.12L18 7.41V10h2V4h-6v2h2.59l-3.97 3.97C11.73 9.36 10.66 9 9.5 9z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
              {t('남성', 'Male')}
            </h3>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-pink-500 border-2 border-transparent">
          <CardContent className="p-8" onClick={() => handleGenderSelect('female')}>
            <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0-2C8.69 2 6 4.69 6 8s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 12c-1.1 0-2 .9-2 2v6h4v-6c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
              {t('여성', 'Female')}
            </h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
