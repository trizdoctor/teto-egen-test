import { useState, useEffect } from 'react';
import { useTest } from '@/contexts/TestContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Flame, Heart } from 'lucide-react';
import { getRandomHeroImage } from '@/data/heroImages';

export function WelcomeScreen() {
  const { setCurrentScreen } = useTest();
  const { t } = useLanguage();
  const [heroImage, setHeroImage] = useState(getRandomHeroImage());

  useEffect(() => {
    setHeroImage(getRandomHeroImage());
  }, []);

  const handleStartTest = () => {
    setCurrentScreen('gender');
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center">
        <div className="relative mb-8">
          <img
            src={heroImage.url}
            alt={heroImage.alt}
            className="rounded-2xl shadow-2xl mx-auto w-full max-w-2xl h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center leading-tight">
              {t('나의 성격 유형을 발견하세요', 'Discover Your Personality Type')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg opacity-90 text-center max-w-lg">
              {t('테토-에겐 이론으로 알아보는 연애 스타일', 'Dating style through Teto-Estrogen theory')}
            </p>
          </div>
        </div>

        <Button
          onClick={handleStartTest}
          size="lg"
          className="bg-gradient-teto-estrogen text-white px-12 py-4 text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-bounce-subtle mb-8"
        >
          <Play className="mr-3 h-5 w-5" />
          {t('테스트 시작하기', 'Start Test')}
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teto to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flame className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('테토 타입', 'Teto Type')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('강한 추진력과 리더십을 가진 적극적인 성향', 'Active nature with strong drive and leadership')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-estrogen to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('에겐 타입', 'Estrogen Type')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('감수성이 풍부하고 세심한 배려를 하는 성향', 'Rich sensitivity and thoughtful caring nature')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}