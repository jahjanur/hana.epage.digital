import { en } from './en';
import { sq } from './sq';
import { de } from './de';
import { tr } from './tr';

// Define supported languages first
export type SupportedLanguages = 'en' | 'sq' | 'de' | 'tr';

// Define the shape of our translations
export type TranslationType = {
  // Header
  welcome: string;
  
  // Navigation
  home: string;
  achievements: string;
  statistics: string;
  
  // Time periods
  untilIftar: string;
  untilSyfyr: string;
  
  // Prayer times
  syfyr: string;
  iftar: string;
  
  // Notifications
  enableNotifications: string;
  disableNotifications: string;
  
  // Cities
  gostivar: string;
  tetovo: string;
  skopje: string;
  
  // Time labels
  hours: string;
  minutes: string;
  seconds: string;
  
  // Ramadan status
  daysCompleted: string;
  daysRemaining: string;
  day: string;
  days: string;
  
  // Bottom Navigation
  duah: string;
  goals: string;
  books: string;
  
  // Common buttons/labels
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  selectCity: string;
  
  // Countries
  macedonia: string;
  kosovo: string;
  austria: string;
  switzerland: string;
  
  // Days of the week
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  
  // Time status
  timeUntil: string;
  timeLeft: string;
  completed: string;
  remaining: string;
  
  // Schedule
  schedule: string;
  ramadanDay: string;
  fajrTime: string;
  maghribTime: string;
  
  // Duas
  nijetTitle: string;
  nijetTransliteration: string;
  nijetTranslation: string;
  iftarDuaTitle: string;
  iftarDuaTransliteration: string;
  iftarDuaTranslation: string;
  acceptancePrayer: string;
  today: string;
  poweredBy: string;
  laylatulQadr: string;
  
  // Add to TranslationType
  germany: string;
};

export type TranslationKey = keyof TranslationType;

// Define the translations object
export const translations: Record<SupportedLanguages, TranslationType> = {
  en,
  sq,
  de,
  tr
}; 