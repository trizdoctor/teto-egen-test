import { useState } from 'react';
import { useTest } from '@/contexts/TestContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { personalityTypes } from '@/data/personalityTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Share2, RotateCcw, CheckCircle } from 'lucide-react';

export function ResultScreen() {
  const { testResults, resetTest } = useTest();
  const { language, t } = useLanguage();
  const [showShareModal, setShowShareModal] = useState(false);

  if (!testResults) {
    return (
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {t('결과를 불러오는 중...', 'Loading results...')}
        </p>
      </div>
    );
  }

  const typeData = personalityTypes[language][testResults.type];

  if (!typeData) {
    return (
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {t('결과를 찾을 수 없습니다', 'Results not found')}
        </p>
      </div>
    );
  }

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleRetake = () => {
    resetTest();
  };

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-white shadow-xl overflow-hidden">
          <img
            src={typeData.image}
            alt="Personality type"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('당신의 성격 유형', 'Your Personality Type')}
        </h2>
        <div className="inline-flex items-center px-4 py-2 bg-gradient-teto-estrogen text-white rounded-full font-semibold text-lg">
          {typeData.title}
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {typeData.subtitle}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg">
          {typeData.description}
        </p>
      </div>

      {/* Percentage breakdown */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('성향 분석', 'Tendency Analysis')}
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  {t('테토 성향', 'Teto Tendency')}
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {testResults.tetoPercentage}%
                </span>
              </div>
              <Progress value={testResults.tetoPercentage} className="h-3 bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-full bg-gradient-to-r from-teto to-purple-600 rounded-full transition-all duration-1000"
                  style={{ width: `${testResults.tetoPercentage}%` }}
                />
              </Progress>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  {t('에겐 성향', 'Estrogen Tendency')}
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {testResults.estrogenPercentage}%
                </span>
              </div>
              <Progress value={testResults.estrogenPercentage} className="h-3 bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-full bg-gradient-to-r from-estrogen to-pink-600 rounded-full transition-all duration-1000"
                  style={{ width: `${testResults.estrogenPercentage}%` }}
                />
              </Progress>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Characteristics */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('주요 특성', 'Key Characteristics')}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {typeData.characteristics.map((characteristic, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>{characteristic}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compatible match */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('어울리는 짝', 'Compatible Match')}
          </h3>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
              <img
                src={typeData.compatibleImage}
                alt="Compatible type"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {typeData.compatibleType}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {typeData.compatibleDescription}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleShare}
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600"
        >
          <Share2 className="mr-2 h-4 w-4" />
          {t('결과 공유하기', 'Share Results')}
        </Button>
        <Button
          onClick={handleRetake}
          variant="secondary"
          className="flex items-center justify-center"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          {t('다시 테스트하기', 'Retake Test')}
        </Button>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="m-4 max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('결과 공유하기', 'Share Results')}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowShareModal(false)}
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                    setShowShareModal(false);
                  }}
                >
                  {t('페이스북에 공유', 'Share to Facebook')}
                </Button>
                <Button
                  className="w-full bg-blue-400 hover:bg-blue-500"
                  onClick={() => {
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(t('테토-에겐 성격 유형 테스트 결과', 'Teto-Estrogen Personality Test Result'))}&url=${encodeURIComponent(window.location.href)}`, '_blank');
                    setShowShareModal(false);
                  }}
                >
                  {t('트위터에 공유', 'Share to Twitter')}
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert(t('링크가 복사되었습니다!', 'Link copied!'));
                    setShowShareModal(false);
                  }}
                >
                  {t('링크 복사', 'Copy Link')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
