import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Share2, Link, Facebook, Twitter } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    onClose();
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(t('테토-에겐 성격 유형 테스트 결과를 확인해보세요!', 'Check out my Teto-Estrogen personality test results!'));
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    onClose();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert(t('링크가 복사되었습니다!', 'Link copied!'));
      onClose();
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="m-4 max-w-md w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('결과 공유하기', 'Share Results')}
            </h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <Button
              onClick={shareToFacebook}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Facebook className="mr-3 h-4 w-4" />
              {t('페이스북에 공유', 'Share to Facebook')}
            </Button>
            <Button
              onClick={shareToTwitter}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white"
            >
              <Twitter className="mr-3 h-4 w-4" />
              {t('트위터에 공유', 'Share to Twitter')}
            </Button>
            <Button
              onClick={copyLink}
              variant="secondary"
              className="w-full"
            >
              <Link className="mr-3 h-4 w-4" />
              {t('링크 복사', 'Copy Link')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Default export for use in other components
export default function ShareModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return <ShareModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
