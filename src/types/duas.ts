export interface DuaContent {
  arabic: string[];
  transliteration: string[];
  translation: string[];
}

export interface DuaTranslation {
  title: string;
  content: DuaContent[];
}

export interface Dua {
  id: string;
  translations: {
    [key: string]: DuaTranslation;
  };
}

export interface DuasData {
  duas: Dua[];
} 