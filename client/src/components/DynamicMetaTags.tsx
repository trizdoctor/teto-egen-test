
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { personalityTypes } from '@/data/personalityTypes';
import { getIntensityLabel } from '@/lib/intensityLabels';

export function DynamicMetaTags() {
  const [location] = useLocation();

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const intensity = urlParams.get('intensity');
    const teto = urlParams.get('teto');
    const estrogen = urlParams.get('estrogen');

    if (type && intensity && teto && estrogen) {
      // Get type data
      const typeData = personalityTypes['ko'][type as keyof typeof personalityTypes['ko']];
      
      if (typeData && typeData.intensityImages) {
        const featuredImage = typeData.intensityImages[intensity as keyof typeof typeData.intensityImages];
        const timestamp = Date.now();
        const imageWithCache = `${featuredImage}?cache=${timestamp}`;
        
        // Create meta tag content
        const resultTitle = `${getIntensityLabel(intensity, 'ko')} ${typeData.title} - 테토-에겐 성격 유형 테스트`;
        const resultDescription = `나는 ${getIntensityLabel(intensity, 'ko')} ${typeData.title}입니다! 테토 성향 ${teto}%, 에겐 성향 ${estrogen}%`;
        const currentUrl = window.location.href;
        
        // Set document title
        document.title = resultTitle;
        
        // Remove all existing meta tags
        const metaSelectors = [
          'meta[property="og:title"]',
          'meta[property="og:description"]',
          'meta[property="og:image"]',
          'meta[property="og:image:width"]',
          'meta[property="og:image:height"]',
          'meta[property="og:url"]',
          'meta[property="og:type"]',
          'meta[name="twitter:card"]',
          'meta[name="twitter:title"]',
          'meta[name="twitter:description"]',
          'meta[name="twitter:image"]',
          'meta[name="description"]',
          'link[rel="canonical"]'
        ];
        
        metaSelectors.forEach(selector => {
          const existing = document.querySelector(selector);
          if (existing) {
            existing.remove();
          }
        });
        
        // Create new meta tags
        const metaTags = [
          { tag: 'meta', attr: 'property', key: 'og:title', value: resultTitle },
          { tag: 'meta', attr: 'property', key: 'og:description', value: resultDescription },
          { tag: 'meta', attr: 'property', key: 'og:image', value: imageWithCache },
          { tag: 'meta', attr: 'property', key: 'og:image:width', value: '1200' },
          { tag: 'meta', attr: 'property', key: 'og:image:height', value: '630' },
          { tag: 'meta', attr: 'property', key: 'og:url', value: currentUrl },
          { tag: 'meta', attr: 'property', key: 'og:type', value: 'website' },
          { tag: 'meta', attr: 'name', key: 'twitter:card', value: 'summary_large_image' },
          { tag: 'meta', attr: 'name', key: 'twitter:title', value: resultTitle },
          { tag: 'meta', attr: 'name', key: 'twitter:description', value: resultDescription },
          { tag: 'meta', attr: 'name', key: 'twitter:image', value: imageWithCache },
          { tag: 'meta', attr: 'name', key: 'description', value: resultDescription }
        ];
        
        metaTags.forEach(({ tag, attr, key, value }) => {
          const element = document.createElement(tag);
          element.setAttribute(attr, key);
          element.setAttribute('content', value);
          document.head.appendChild(element);
        });
        
        // Add canonical link
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = currentUrl;
        document.head.appendChild(canonical);
        
        console.log("Dynamic meta tags set for shared URL:", currentUrl);
        console.log("Featured image:", imageWithCache);
      }
    } else {
      // Reset to default meta tags if no parameters
      const defaultTitle = '테토-에겐 성격 유형 테스트';
      const defaultDescription = '테토-에겐 이론으로 알아보는 나의 성격 유형과 연애 스타일';
      const defaultImage = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630';
      
      document.title = defaultTitle;
      
      // Reset meta tags to default
      const metaTags = [
        { attr: 'property', key: 'og:title', value: defaultTitle },
        { attr: 'property', key: 'og:description', value: defaultDescription },
        { attr: 'property', key: 'og:image', value: defaultImage },
        { attr: 'name', key: 'twitter:title', value: defaultTitle },
        { attr: 'name', key: 'twitter:description', value: defaultDescription },
        { attr: 'name', key: 'twitter:image', value: defaultImage },
        { attr: 'name', key: 'description', value: defaultDescription }
      ];
      
      metaTags.forEach(({ attr, key, value }) => {
        const existing = document.querySelector(`meta[${attr}="${key}"]`);
        if (existing) {
          existing.setAttribute('content', value);
        }
      });
    }
  }, [location]);

  return null; // This component doesn't render anything
}
