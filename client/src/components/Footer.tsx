
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto sticky bottom-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            developed by Dunkin
          </p>
        </div>
      </div>
    </footer>
  );
}
