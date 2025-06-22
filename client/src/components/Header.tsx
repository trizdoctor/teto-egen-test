import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTest } from '@/contexts/TestContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Globe, Heart } from 'lucide-react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { resetTest } = useTest();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resetTest();
    // Reset URL to clean state
    window.history.pushState({}, '', window.location.href.split('?')[0].split('#')[0]);
  };

  const handleLanguageToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLanguage();
  };

  const handleThemeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleHomeClick}>
            <div className="w-10 h-10 bg-gradient-teto-estrogen rounded-lg flex items-center justify-center">
              <Heart className="text-white h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('테토-에겐 테스트', 'Teto-Egen Test')}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              type="button"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleThemeToggle}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
              type="button"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}