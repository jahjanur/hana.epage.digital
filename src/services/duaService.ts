import duasData from '../data/duas.json';
import { Dua, DuasData } from '../types/duas';

export const getDuas = async (): Promise<Dua[]> => {
  try {
    // Validate the data structure
    if (!duasData?.duas || !Array.isArray(duasData.duas)) {
      throw new Error('Invalid duas data format');
    }

    // Type assertion with validation
    const typedDuasData: DuasData = {
      duas: duasData.duas.map((dua: any) => {
        if (!dua.id || !dua.translations) {
          throw new Error(`Invalid dua structure: missing required fields`);
        }

        // Validate translations structure
        Object.entries(dua.translations).forEach(([lang, translation]: [string, any]) => {
          if (!translation.title || !Array.isArray(translation.content)) {
            throw new Error(`Invalid translation structure for language: ${lang}`);
          }
        });

        return {
          id: dua.id,
          translations: dua.translations
        };
      })
    };

    return typedDuasData.duas;
  } catch (error) {
    console.error('Error processing duas:', error instanceof Error ? error.message : 'Unknown error');
    throw new Error('Failed to load duas');
  }
};

// Helper function to ensure consistent array format
const ensureArray = <T>(value: T | T[]): T[] => {
  return Array.isArray(value) ? value : [value];
};

// Remove or comment out unused mockDuas
// const mockDuas = { ... }; 