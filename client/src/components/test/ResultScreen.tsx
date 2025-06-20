import { useState, useEffect } from 'react';
import { useTest } from '@/contexts/TestContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { personalityTypes } from '@/data/personalityTypes';
import { getIntensityLabel, getIntensityColor } from '@/lib/intensityLabels';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Share2, RotateCcw, CheckCircle, MessageCircle, Sparkles } from 'lucide-react';

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
  };

  // Update meta tags for social sharing with detailed results
  useEffect(() => {
    if (testResults && typeData) {
      const title = `${getIntensityLabel(testResults.intensity, language)} ${typeData.title} - 테토-에겐 성격 유형 테스트`;
      const description = `테토 성향 ${testResults.tetoPercentage}%, 에겐 성향 ${testResults.estrogenPercentage}% | ${typeData.description}`;
      const imageUrl = typeData.shareImage || typeData.image;
      const currentUrl = window.location.href;

      // Update document title
      document.title = title;

      // Update or create meta tags
      const updateMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      const updateMetaTagName = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      // Open Graph tags for Facebook and KakaoTalk
      updateMetaTag('og:title', title);
      updateMetaTag('og:description', description);
      updateMetaTag('og:image', imageUrl);
      updateMetaTag('og:image:width', '1200');
      updateMetaTag('og:image:height', '630');
      updateMetaTag('og:url', currentUrl);
      updateMetaTag('og:type', 'website');
      updateMetaTag('og:site_name', '테토-에겐 성격 유형 테스트');

      // Twitter Card tags
      updateMetaTagName('twitter:card', 'summary_large_image');
      updateMetaTagName('twitter:title', title);
      updateMetaTagName('twitter:description', description);
      updateMetaTagName('twitter:image', imageUrl);

      // KakaoTalk specific meta tags
      updateMetaTag('kakao:title', title);
      updateMetaTag('kakao:description', description);
      updateMetaTag('kakao:image', imageUrl);
      updateMetaTag('kakao:url', currentUrl);

      // General meta description
      updateMetaTagName('description', description);

      // Force refresh for social crawlers
      const refreshMetaTag = (name: string) => {
        const existing = document.querySelector(`meta[name="${name}"]`);
        if (existing) {
          existing.remove();
        }
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = new Date().getTime().toString();
        document.head.appendChild(meta);
      };
      refreshMetaTag('cache-control');
    }
  }, [testResults, typeData, language]);

  const getDetailedCompatibleMatch = (testResults: any, language: string) => {
    const tetoPercentage = testResults.tetoPercentage;
    const estrogenPercentage = testResults.estrogenPercentage;
    const gender = testResults.gender;

    // For males, recommend females; for females, recommend males
    if (gender === 'male') {
      if (estrogenPercentage > 80) {
        return t('초강력 에겐녀', 'Super Estrogen Woman');
      } else if (estrogenPercentage > 60) {
        return t('강력 에겐녀', 'Strong Estrogen Woman');
      } else if (tetoPercentage > 60) {
        return t('테토녀', 'Teto Woman');
      } else {
        return t('에겐녀', 'Estrogen Woman');
      }
    } else {
      if (tetoPercentage > 80) {
        return t('초강력 테토남', 'Super Teto Man');
      } else if (tetoPercentage > 60) {
        return t('강력 테토남', 'Strong Teto Man');
      } else if (estrogenPercentage > 60) {
        return t('에겐남', 'Estrogen Man');
      } else {
        return t('테토남', 'Teto Man');
      }
    }
  };

  const getCompatibleMatchReason = (testResults: any, language: string) => {
    const tetoPercentage = testResults.tetoPercentage;
    const estrogenPercentage = testResults.estrogenPercentage;
    const gender = testResults.gender;

    if (gender === 'male') {
      if (estrogenPercentage > 60) {
        return t('당신은 에겐 성향이 강해, 감성적이고 공감 능력이 뛰어난 여성과 잘 어울립니다.', 'You have a strong Estrogen tendency, so you get along well with emotional and empathetic women.');
      } else {
        return t('당신은 테토 성향이 강해, 활동적이고 에너지가 넘치는 여성과 잘 어울립니다.', 'You have a strong Teto tendency, so you get along well with active and energetic women.');
      }
    } else {
      if (tetoPercentage > 60) {
        return t('당신은 테토 성향이 강해, 리더십 있고 강인한 남성과 잘 어울립니다.', 'You have a strong Teto tendency, so you get along well with leadership and strong men.');
      } else {
        return t('당신은 에겐 성향이 강해, 감성적이고 배려심 있는 남성과 잘 어울립니다.', 'You have a strong Estrogen tendency, so you get along well with emotional and caring men.');
      }
    }
  };

  return (
    <div className="animate-slide-up relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20 -z-10"
        style={{ backgroundImage: `url(${typeData.backgroundImage})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-gray-900/90 dark:via-gray-900/95 dark:to-gray-900/90 -z-10" />

      {/* Hero Section */}
      <div className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-300/20 to-blue-400/20 rounded-3xl blur-3xl" />
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
          <div className="flex justify-center mb-6">
            <div className={`relative w-40 h-40 rounded-full border-4 ${testResults.tetoPercentage > testResults.estrogenPercentage ? 'border-blue-500' : 'border-red-500'} shadow-2xl overflow-hidden`}>
              <img
                src={typeData.image}
                alt="Personality type"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute top-2 right-2">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t('당신의 성격 유형', 'Your Personality Type')}
          </h2>

          <div className={`inline-flex items-center px-8 py-4 text-white rounded-full font-bold text-2xl shadow-2xl ${getIntensityColor(testResults.intensity)} transform hover:scale-105 transition-transform`}>
            {getIntensityLabel(testResults.intensity, language)} {typeData.title}
          </div>

          <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg font-medium">
            {typeData.subtitle}
          </p>

          <p className="text-gray-700 dark:text-gray-300 mt-4 text-xl leading-relaxed max-w-2xl mx-auto">
            {typeData.description}
          </p>
        </div>
      </div>

      {/* Percentage breakdown */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl mb-8 border border-white/50">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('성향 분석', 'Tendency Analysis')}
          </h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 flex items-center text-lg font-semibold">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-3 shadow-lg"></div>
                  {t('테토 성향', 'Teto Tendency')}
                </span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {testResults.tetoPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1500 shadow-lg"
                  style={{ width: `${testResults.tetoPercentage}%` }}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 flex items-center text-lg font-semibold">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded-full mr-3 shadow-lg"></div>
                  {t('에겐 성향', 'Estrogen Tendency')}
                </span>
                <span className="text-xl font-bold text-red-600 dark:text-red-400">
                  {testResults.estrogenPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-1500 shadow-lg"
                  style={{ width: `${testResults.estrogenPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Characteristics */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl mb-8 border border-white/50">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('주요 특성', 'Key Characteristics')}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {typeData.characteristics.map((characteristic: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-3 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-lg">{characteristic}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compatible match */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl mb-8 border border-white/50">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('어울리는 짝', 'Compatible Match')}
          </h3>
          <div className="flex items-center space-x-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-400 to-pink-400 shadow-xl flex-shrink-0">
              <img
                src={typeData.compatibleImage}
                alt="Compatible type"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80';
                }}
              />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {getDetailedCompatibleMatch(testResults, language)}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {getCompatibleMatchReason(testResults, language)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
        <Button
          onClick={handleShare}
          className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all"
        >
          <Share2 className="mr-3 h-5 w-5" />
          {t('결과 공유하기', 'Share Results')}
        </Button>
        <Button
          onClick={handleRetake}
          variant="secondary"
          className="flex items-center justify-center bg-white/90 hover:bg-white dark:bg-gray-700/90 dark:hover:bg-gray-700 border-2 border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 text-gray-900 dark:text-white px-8 py-4 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all"
        >
          <RotateCcw className="mr-3 h-5 w-5" />
          {t('다시 테스트하기', 'Retake Test')}
        </Button>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="m-4 max-w-md w-full bg-white/95 backdrop-blur-sm shadow-2xl border border-white/50">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('결과 공유하기', 'Share Results')}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowShareModal(false)}
                  className="text-2xl hover:bg-gray-100"
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-4">
                <Button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all"
                  onClick={() => {
                    const title = `${getIntensityLabel(testResults.intensity, language)} ${typeData.title}`;
                    const shareText = `나는 ${title}!\n\n테토 성향 ${testResults.tetoPercentage}%, 에겐 성향 ${testResults.estrogenPercentage}%\n\n${typeData.description}\n\n나의 테토-에겐 성격 유형 테스트 결과를 확인해보세요!`;
                    const url = window.location.href;
                    const imageUrl = typeData.shareImage || typeData.image;

                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

                    // Create formatted share text with clear structure
                    const formattedShareText = `[ 나는 ${title}! ]\n- 테토 성향 ${testResults.tetoPercentage}%, 에겐 성향 ${testResults.estrogenPercentage}%\n- ${typeData.description}\n\n[여러분도 나의 성향을 테스트해보세요]\n${url}`;

                    if (isMobile) {
                      // For mobile, try native sharing first
                      if (navigator.share) {
                        navigator.share({
                          title: title,
                          text: formattedShareText,
                          url: url
                        }).catch(() => {
                          // If native sharing fails, copy to clipboard
                          navigator.clipboard.writeText(formattedShareText).then(() => {
                            alert('공유 내용이 복사되었습니다!');
                          }).catch(() => {
                            alert('공유에 실패했습니다. 링크를 수동으로 복사해주세요.');
                          });
                        });
                      } else {
                        // Fallback to clipboard
                        navigator.clipboard.writeText(formattedShareText).then(() => {
                          alert('공유 내용이 복사되었습니다!');
                        }).catch(() => {
                          alert('공유에 실패했습니다. 링크를 수동으로 복사해주세요.');
                        });
                      }
                    } else {
                      // Desktop behavior
                      if (navigator.share) {
                        navigator.share({
                          title: title,
                          text: formattedShareText,
                          url: url
                        }).catch(() => {
                          navigator.clipboard.writeText(formattedShareText).then(() => {
                            alert('카카오톡 공유 내용이 복사되었습니다!');
                          });
                        });
                      } else {
                        navigator.clipboard.writeText(formattedShareText).then(() => {
                          alert('카카오톡 공유 내용이 복사되었습니다!');
                        });
                      }
                    }
                    setShowShareModal(false);
                  }}
                >
                  <MessageCircle className="mr-3 h-5 w-5" />
                  {t('카카오톡에 공유', 'Share to KakaoTalk')}
                </Button>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all"
                  onClick={() => {
                    const title = `${getIntensityLabel(testResults.intensity, language)} ${typeData.title}`;
                    const formattedShareText = `[ 나는 ${title}! ]\n- 테토 성향 ${testResults.tetoPercentage}%, 에겐 성향 ${testResults.estrogenPercentage}%\n- ${typeData.description}\n\n[여러분도 나의 성향을 테스트해보세요]\n${window.location.href}`;
                    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(formattedShareText)}`;
                    window.open(shareUrl, '_blank');
                    setShowShareModal(false);
                  }}
                >
                  {t('페이스북에 공유', 'Share to Facebook')}
                </Button>
                <Button
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all"
                  onClick={() => {
                    const title = `${getIntensityLabel(testResults.intensity, language)} ${typeData.title}`;
                    const formattedShareText = `[ 나는 ${title}! ]\n- 테토 성향 ${testResults.tetoPercentage}%, 에겐 성향 ${testResults.estrogenPercentage}%\n- ${typeData.description}\n\n[여러분도 나의 성향을 테스트해보세요]\n#테토에겐테스트 #성격유형테스트\n${window.location.href}`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(formattedShareText)}`, '_blank');
                    setShowShareModal(false);
                  }}
                >
                  {t('트위터에 공유', 'Share to Twitter')}
                </Button>
                <Button
                  variant="secondary"
                  className="w-full py-4 text-lg font-bold shadow-lg transform hover:scale-105 transition-all"
                  onClick={() => {
                    const title = `${getIntensityLabel(testResults.intensity, language)} ${typeData.title}`;
                    const formattedShareText = `[ 나는 ${title}! ]\n- 테토 성향 ${testResults.tetoPercentage}%, 에겐 성향 ${testResults.estrogenPercentage}%\n- ${typeData.description}\n\n[여러분도 나의 성향을 테스트해보세요]\n${window.location.href}`;
                    navigator.clipboard.writeText(formattedShareText);
                    alert(t('상세한 테스트 결과와 링크가 복사되었습니다!', 'Detailed test result and link copied!'));
                    setShowShareModal(false);
                  }}
                >
                  {t('상세 결과 복사', 'Copy Detailed Results')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Developer Credit */}
      <div className="text-center mt-16 mb-8">
        <p className="text-sm text-gray-400 dark:text-gray-600 font-light">
          developed by Dunkin
        </p>
      </div>
    </div>
  );
}