import React, { createContext, useContext, useState } from 'react';

type SupportedLanguages = 'sq' | 'en' | 'tr' | 'mk' | 'it' | 'de';

interface Translations {
  [key: string]: {
    // Prayer names
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    taraweeh: string;
    
    // UI elements
    dailyPrayers: string;
    taraweehPrayer: string;
    quranReading: string;
    submitSelectedPrayers: string;
    submitTaraweehPrayer: string;
    submitQuranReading: string;
    pagesReadToday: string;
    completed: string;
    selected: string;
    iPrayedTaraweeh: string;
    trackYourJourney: string;
    getStarted: string;
    signInToTrack: string;
    
    // Additional translations
    welcome: string;
    daily: string;
    weekly: string;
    monthly: string;
    today: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    untilIftar: string;
    untilSyfyr: string;
    acceptancePrayer: string;
    poweredBy: string;
    nijetTitle: string;
    nijetTransliteration: string;
    nijetTranslation: string;
    iftarDuaTitle: string;
    iftarDuaTransliteration: string;
    iftarDuaTranslation: string;
    laylatulQadr: string;
    startTracking: string;
    enterEmail: string;
    loading: string;
    retry: string;
    error: string;
    
    // Add location-related keys
    macedonia: string;
    kosovo: string;
    austria: string;
    switzerland: string;
    germany: string;
    
    // Add notification-related keys
    syfyr: string;
    iftar: string;
    enableNotifications: string;
    disableNotifications: string;
    save: string;
  }
}

const translations: Translations = {
  'sq': {
    // Albanian translations
    fajr: 'Sabah',
    dhuhr: 'Dreka',
    asr: 'Ikindia',
    maghrib: 'Akshami',
    isha: 'Jacia',
    taraweeh: 'Teravia',
    dailyPrayers: 'Namazet Ditore',
    taraweehPrayer: 'Namazi i Teravisë',
    quranReading: 'Leximi i Kuranit',
    submitSelectedPrayers: 'Ruaj Namazet e Zgjedhura',
    submitTaraweehPrayer: 'Ruaj Namazin e Teravisë',
    submitQuranReading: 'Ruaj Leximin e Kuranit',
    pagesReadToday: 'Faqet e Lexuara Sot (Max: 100)',
    completed: 'Përfunduar',
    selected: 'Zgjedhur',
    iPrayedTaraweeh: 'E fala Teravinë sot',
    trackYourJourney: 'Gjurmo Udhëtimin Tënd të Ramazanit',
    getStarted: 'Fillo',
    signInToTrack: 'Kyçu për të gjurmuar namazet, teravinë dhe leximin e Kuranit',
    
    // Additional translations
    welcome: 'Mirë se vini',
    daily: 'Ditore',
    weekly: 'Javore',
    monthly: 'Mujore',
    today: 'Sot',
    monday: 'E Hënë',
    tuesday: 'E Martë',
    wednesday: 'E Mërkurë',
    thursday: 'E Enjte',
    friday: 'E Premte',
    saturday: 'E Shtunë',
    sunday: 'E Diel',
    untilIftar: 'deri në Iftar',
    untilSyfyr: 'deri në Syfyr',
    acceptancePrayer: 'Allahu jua pranoftë agjërimin!',
    poweredBy: 'Mundësuar nga',
    nijetTitle: 'Nijeti',
    nijetTransliteration: 'Nevejtus savme gadin min šehri Ramadane',
    nijetTranslation: 'Kam për qëllim të agjëroj nesër në muajin e Ramazanit për hir të Allahut të Madhëruar.',
    iftarDuaTitle: 'Duaja e Iftarit',
    iftarDuaTransliteration: 'Allahumme leke sumtu ve bike amentu ve ala rizkike eftertu ve alejke tevekkeltu',
    iftarDuaTranslation: 'O Allah, për Ty agjërova, në Ty besova, me furnizimin Tënd e prisha agjërimin dhe në Ty u mbështeta.',
    laylatulQadr: 'Nata e Kadrit',
    startTracking: 'Fillo Gjurmimin',
    enterEmail: 'Shkruani email-in tuaj',
    loading: 'Duke u ngarkuar...',
    retry: 'Provo përsëri',
    error: 'Gabim',
    
    // Add location-related translations
    macedonia: 'Macedonia',
    kosovo: 'Kosovo',
    austria: 'Austria',
    switzerland: 'Switzerland',
    germany: 'Germany',
    
    // Add notification-related translations
    syfyr: 'Suhoor',
    iftar: 'Iftar',
    enableNotifications: 'Enable notifications',
    disableNotifications: 'Disable notifications',
    save: 'Save'
  },
  'en': {
    // English translations
    fajr: 'Fajr',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    taraweeh: 'Taraweeh',
    dailyPrayers: 'Daily Prayers',
    taraweehPrayer: 'Taraweeh Prayer',
    quranReading: 'Quran Reading',
    submitSelectedPrayers: 'Submit Selected Prayers',
    submitTaraweehPrayer: 'Submit Taraweeh Prayer',
    submitQuranReading: 'Submit Quran Reading',
    pagesReadToday: 'Pages Read Today (Max: 100)',
    completed: 'Completed',
    selected: 'Selected',
    iPrayedTaraweeh: 'I prayed Taraweeh today',
    trackYourJourney: 'Track Your Ramadan Journey',
    getStarted: 'Get Started',
    signInToTrack: 'Sign in to start tracking your daily prayers, taraweeh, and Quran reading',

    // Add missing translations
    welcome: 'Welcome',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    today: 'Today',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    untilIftar: 'until Iftar',
    untilSyfyr: 'until Suhoor',
    acceptancePrayer: 'May Allah accept your fasting!',
    poweredBy: 'Powered by',
    nijetTitle: 'Niyyah',
    nijetTransliteration: 'Nawaitu sawma ghadin...',
    nijetTranslation: 'I intend to fast tomorrow in the month of Ramadan...',
    iftarDuaTitle: 'Iftar Dua',
    iftarDuaTransliteration: 'Allahumma laka sumtu...',
    iftarDuaTranslation: 'O Allah, I fasted for You and I believe in You...',
    laylatulQadr: 'Laylatul Qadr',
    startTracking: 'Start Tracking',
    enterEmail: 'Enter your email',
    loading: 'Loading...',
    retry: 'Retry',
    error: 'Error',
    
    // Add location-related translations
    macedonia: 'Macedonia',
    kosovo: 'Kosovo',
    austria: 'Austria',
    switzerland: 'Switzerland',
    germany: 'Germany',
    
    // Add notification-related translations
    syfyr: 'Suhoor',
    iftar: 'Iftar',
    enableNotifications: 'Enable notifications',
    disableNotifications: 'Disable notifications',
    save: 'Save'
  },
  'tr': {
    // Prayer names
    fajr: 'Sabah',
    dhuhr: 'Öğle',
    asr: 'İkindi',
    maghrib: 'Akşam',
    isha: 'Yatsı',
    taraweeh: 'Teravih',
    
    // UI elements
    dailyPrayers: 'Günlük Namazlar',
    taraweehPrayer: 'Teravih Namazı',
    quranReading: 'Kuran Okuma',
    submitSelectedPrayers: 'Seçili Namazları Kaydet',
    submitTaraweehPrayer: 'Teravih Namazını Kaydet',
    submitQuranReading: 'Kuran Okumayı Kaydet',
    pagesReadToday: 'Bugün Okunan Sayfalar (Maks: 100)',
    completed: 'Tamamlandı',
    selected: 'Seçildi',
    iPrayedTaraweeh: 'Bugün teravih namazını kıldım',
    trackYourJourney: 'Ramazan Yolculuğunuzu Takip Edin',
    getStarted: 'Başla',
    signInToTrack: 'Namazlarınızı, teravih ve Kuran okumalarınızı takip etmek için giriş yapın',
    
    // Additional translations
    welcome: 'Hoş Geldiniz',
    daily: 'Günlük',
    weekly: 'Haftalık',
    monthly: 'Aylık',
    today: 'Bugün',
    monday: 'Pazartesi',
    tuesday: 'Salı',
    wednesday: 'Çarşamba',
    thursday: 'Perşembe',
    friday: 'Cuma',
    saturday: 'Cumartesi',
    sunday: 'Pazar',
    untilIftar: 'İftara kalan',
    untilSyfyr: 'Sahura kalan',
    acceptancePrayer: 'Allah orucunuzu kabul etsin!',
    poweredBy: 'Destekleyen',
    nijetTitle: 'Niyet',
    nijetTransliteration: 'Neveytü en esume ğaden...',
    nijetTranslation: 'Yarın Ramazan ayının orucunu tutmaya niyet ettim...',
    iftarDuaTitle: 'İftar Duası',
    iftarDuaTransliteration: 'Allahümme leke sumtü...',
    iftarDuaTranslation: "Allah`ım! Senin için oruç tuttum, sana inandım, senin rızkınla iftar açtım ve sana tevekkül ettim.",
    laylatulQadr: 'Kadir Gecesi',
    startTracking: 'Takibe Başla',
    enterEmail: 'E-posta adresinizi girin',
    loading: 'Yükleniyor...',
    retry: 'Tekrar Dene',
    error: 'Hata',
    
    // Location-related translations
    macedonia: 'Makedonya',
    kosovo: 'Kosova',
    austria: 'Avusturya',
    switzerland: 'İsviçre',
    germany: 'Almanya',
    
    // Notification-related translations
    syfyr: 'Sahur',
    iftar: 'İftar',
    enableNotifications: 'Bildirimleri aç',
    disableNotifications: 'Bildirimleri kapat',
    save: 'Kaydet'
  },
  'de': {
    // Prayer names
    fajr: 'Fadschr',
    dhuhr: 'Dhuhur',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Ischa',
    taraweeh: 'Tarawih',
    
    // UI elements
    dailyPrayers: 'Tägliche Gebete',
    taraweehPrayer: 'Tarawih-Gebet',
    quranReading: 'Koran-Lesung',
    submitSelectedPrayers: 'Ausgewählte Gebete speichern',
    submitTaraweehPrayer: 'Tarawih-Gebet speichern',
    submitQuranReading: 'Koran-Lesung speichern',
    pagesReadToday: 'Heute gelesene Seiten (Max: 100)',
    completed: 'Abgeschlossen',
    selected: 'Ausgewählt',
    iPrayedTaraweeh: 'Ich habe heute Tarawih gebetet',
    trackYourJourney: 'Verfolgen Sie Ihre Ramadan-Reise',
    getStarted: 'Beginnen',
    signInToTrack: 'Melden Sie sich an, um Ihre Gebete, Tarawih und Koran-Lesung zu verfolgen',
    
    // Additional translations
    welcome: 'Willkommen',
    daily: 'Täglich',
    weekly: 'Wöchentlich',
    monthly: 'Monatlich',
    today: 'Heute',
    monday: 'Montag',
    tuesday: 'Dienstag',
    wednesday: 'Mittwoch',
    thursday: 'Donnerstag',
    friday: 'Freitag',
    saturday: 'Samstag',
    sunday: 'Sonntag',
    untilIftar: 'bis Iftar',
    untilSyfyr: 'bis Suhur',
    acceptancePrayer: 'Möge Allah Ihr Fasten annehmen!',
    poweredBy: 'Unterstützt von',
    nijetTitle: 'Niyya',
    nijetTransliteration: 'Nawaitu sauma ghadin...',
    nijetTranslation: 'Ich beabsichtige morgen im Monat Ramadan zu fasten...',
    iftarDuaTitle: 'Iftar-Bittgebet',
    iftarDuaTransliteration: 'Allahumma laka sumtu...',
    iftarDuaTranslation: 'Oh Allah, für Dich habe ich gefastet, an Dich habe ich geglaubt, mit Deiner Versorgung breche ich mein Fasten und auf Dich vertraue ich.',
    laylatulQadr: 'Laylat al-Qadr',
    startTracking: 'Tracking starten',
    enterEmail: 'E-Mail-Adresse eingeben',
    loading: 'Wird geladen...',
    retry: 'Erneut versuchen',
    error: 'Fehler',
    
    // Location-related translations
    macedonia: 'Mazedonien',
    kosovo: 'Kosovo',
    austria: 'Österreich',
    switzerland: 'Schweiz',
    germany: 'Deutschland',
    
    // Notification-related translations
    syfyr: 'Suhur',
    iftar: 'Iftar',
    enableNotifications: 'Benachrichtigungen aktivieren',
    disableNotifications: 'Benachrichtigungen deaktivieren',
    save: 'Speichern'
  },
  // Add other languages here...
};

interface LanguageContextType {
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
  t: (key: keyof Translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguages>(() => {
    const saved = localStorage.getItem('language') as SupportedLanguages;
    return saved || 'sq';
  });

  const handleLanguageChange = (newLang: SupportedLanguages) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: keyof Translations['en']) => {
    return translations[language]?.[key] || translations['en'][key];
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleLanguageChange, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 