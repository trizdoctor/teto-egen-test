import { useState, useEffect } from 'react';
import { useTest } from '@/contexts/TestContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { personalityTypes } from '@/data/personalityTypes';
import { getIntensityLabel, getIntensityColor } from '@/lib/intensityLabels';
import { getPersonalizedMessage } from '@/lib/personalizedMessages';
import { getStaticShareUrl } from '@/lib/staticShare';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Share2, RotateCcw, CheckCircle, MessageCircle } from 'lucide-react';

export function ResultScreen() {
  const { testResults, resetTest } = useTest();
  const { language, t } = useLanguage();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Generate static share URL when test results are available
  useEffect(() => {
    if (testResults) {
      console.log("=== RESULT SCREEN DEBUG ===");
      console.log("testResults:", testResults);
      console.log("type:", testResults.type);
      console.log("intensity:", testResults.intensity);  
      console.log("gender:", testResults.gender);
      
      // Parse type to extract personality type only (remove gender)
      const personalityType = testResults.type.includes('teto') ? 'teto' : 'estrogen';
      console.log("Parsed personality type:", personalityType);
      console.log("=== END RESULT SCREEN DEBUG ===");
      
      const staticSharePath = getStaticShareUrl(personalityType, testResults.intensity, testResults.gender);
      const fullShareUrl = `${window.location.origin}${staticSharePath}`;
      setShareUrl(fullShareUrl);
      console.log("Final static share URL:", fullShareUrl);
    }
  }, [testResults]);

  if (!testResults) {
    return (
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {t('결과를 불러오는 중...', 'Loading results...')}
        </p>
      </div>
    );
  }

  const typeData = personalityTypes[language][testResults.type as keyof typeof personalityTypes['ko']];

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
    // Reset URL to clean state
    window.history.pushState({}, '', window.location.href.split('?')[0]);
  };

  return (
    <div className="animate-slide-up">
      {/* Background image based on intensity */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${typeData.intensityImages?.[testResults.intensity] || typeData.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="relative z-10 text-center mb-8">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-white shadow-xl overflow-hidden">
          <img
            src={typeData.intensityImages?.[testResults.intensity] || typeData.image}
            alt="Personality type"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = typeData.image;
            }}
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('당신의 성격 유형', 'Your Personality Type')}
        </h2>
        <div className={`inline-flex items-center px-6 py-3 text-white rounded-full font-bold text-xl shadow-lg ${getIntensityColor(testResults.intensity)}`}>
          {getIntensityLabel(testResults.intensity, language)} {typeData.title}
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg">
          {getPersonalizedMessage(testResults.type, testResults.intensity, language)}
        </p>
      </div>

      {/* Percentage breakdown */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            {t('성향 분석', 'Tendency Analysis')}
          </h3>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {t('테토 성향', 'Teto Tendency')}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {testResults.tetoPercentage}%
                  </span>
                </div>
                <Progress value={testResults.tetoPercentage} className="h-3 bg-gray-200 dark:bg-gray-700">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${testResults.tetoPercentage}%` }}
                  />
                </Progress>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {t('에겐 성향', 'Estrogen Tendency')}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-red-600 dark:text-red-400">
                    {testResults.estrogenPercentage}%
                  </span>
                </div>
                <Progress value={testResults.estrogenPercentage} className="h-3 bg-gray-200 dark:bg-gray-700">
                  <div 
                    className="h-full bg-red-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${testResults.estrogenPercentage}%` }}
                  />
                </Progress>
              </div>
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
            {(typeData.characteristics?.[testResults.intensity] || typeData.characteristics || []).map((characteristic: string, index: number) => (
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
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80';
                }}
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

      {/* AdSense Banner */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg mb-8">
        <CardContent className="p-6 text-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            <p>{t('광고 영역', 'Advertisement Area')}</p>
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
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                  onClick={() => {
                    const shareText = language === 'ko' 
                      ? `테토-에겐 성격 유형 테스트

[ 나는 ${getIntensityLabel(testResults.intensity, language)} ${typeData.title}! ]
- 테토 성향 ${testResults.tetoPercentage}%, 에겐 성향 ${testResults.estrogenPercentage}%
- ${typeData.description}

[여러분도 나의 성향을 테스트해보세요]
${shareUrl}`
                      : `Teto-Estrogen Personality Test

[ I am ${getIntensityLabel(testResults.intensity, language)} ${typeData.title}! ]
- Teto Tendency ${testResults.tetoPercentage}%, Estrogen Tendency ${testResults.estrogenPercentage}%
- ${typeData.description}

[Take the personality test yourself]
${shareUrl}`;

                    if (navigator.share) {
                      navigator.share({
                        title: language === 'ko' ? '테토-에겐 성격 유형 테스트' : 'Teto-Estrogen Personality Test',
                        text: shareText
                      }).catch((error) => {
                        console.error("Native share failed:", error);
                      });
                    } else {
                      navigator.clipboard.writeText(shareText).then(() => {
                        alert(t('공유 내용이 복사되었습니다! 카카오톡에 붙여넣기 해주세요.', 'Share content copied! Please paste it in KakaoTalk.'));
                      }).catch((clipboardError) => {
                        console.error("Clipboard write failed:", clipboardError);
                        window.open(`https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
                      });
                    }
                    setShowShareModal(false);
                  }}
                >
                  <MessageCircle className="mr-3 h-4 w-4" />
                  {t('카카오톡에 공유', 'Share to KakaoTalk')}
                </Button>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
                    setShowShareModal(false);
                  }}
                >
                  {t('페이스북에 공유', 'Share to Facebook')}
                </Button>
                <Button
                  className="w-full bg-blue-400 hover:bg-blue-500"
                  onClick={() => {
                    const shareText = language === 'ko' 
                      ? `나는 ${getIntensityLabel(testResults.intensity, language)} ${typeData.title}! - 테토-에겐 성격 유형 테스트`
                      : `I am ${getIntensityLabel(testResults.intensity, language)} ${typeData.title}! - Teto-Estrogen Personality Test`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
                    setShowShareModal(false);
                  }}
                >
                  {t('트위터에 공유', 'Share to Twitter')}
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
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