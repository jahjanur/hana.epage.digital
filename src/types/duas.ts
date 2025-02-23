export interface DuaContent {
  arabic: string[];
  transliteration: string[];
  translation: string[];
}

export interface Dua {
  id: string;
  title: string;
  contents?: DuaContent[];
}

export interface DuaResponse {
  duas: Dua[];
} 