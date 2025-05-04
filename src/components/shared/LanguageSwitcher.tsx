// src/components/shared/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changeLanguage('es')}
        className={i18n.language === 'es' ? 'text-primary' : 'text-muted-foreground'}
      >
        ES
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changeLanguage('en')}
        className={i18n.language === 'en' ? 'text-primary' : 'text-muted-foreground'}
      >
        EN
      </Button>
      <Globe className="h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default LanguageSwitcher;