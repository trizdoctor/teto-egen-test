import { useTest } from '@/contexts/TestContext';
import { Header } from '@/components/Header';
import { WelcomeScreen } from '@/components/test/WelcomeScreen';
import { GenderSelection } from '@/components/test/GenderSelection';
import { QuestionScreen } from '@/components/test/QuestionScreen';
import { LoadingScreen } from '@/components/test/LoadingScreen';
import { ResultScreen } from '@/components/test/ResultScreen';
import { ShareModal } from '@/components/test/ShareModal';

export default function Test() {
  const { currentScreen } = useTest();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'gender':
        return <GenderSelection />;
      case 'question':
        return <QuestionScreen />;
      case 'loading':
        return <LoadingScreen />;
      case 'result':
        return <ResultScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {renderScreen()}
        
        {/* AdSense Banner - Add your AdSense code here when ready */}
        {currentScreen === 'welcome' && (
          <div className="mt-8 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                {/* Google AdSense Banner will be displayed here */}
                {/* <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="auto"></ins> */}
                <p>광고 영역 (Advertisement Area)</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <ShareModal />
    </div>
  );
}
