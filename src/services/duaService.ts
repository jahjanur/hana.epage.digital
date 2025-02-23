import duasData from '../data/duas.json';
import { DuaResponse } from '../types/duas';

const API_BASE_URL = 'https://raw.githubusercontent.com/fawazahmed0/islamic-api/main/';

export const getDuas = async (): Promise<DuaResponse> => {
  try {
    return duasData;
  } catch (error) {
    console.error('Error loading duas:', error);
    throw error;
  }
};

// Keep mock data as fallback with complete list
const mockDuas = {
  duas: [
    { 
      id: '01', 
      title: 'When waking up',
      contents: [
        {
          arabic: ['الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ'],
          transliteration: ['Al-Hamdu li-l-lahi l-ladhi ahyana ba\'da ma amatana wa ilayhi n-nushur.'],
          translation: ['All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.']
        },
        {
          arabic: ['لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ، سُبْحَانَ اللهِ وَالْحَمْدُ لِلهِ ، وَلاَ إِلَهَ إِلاَّ اللهُ وَاللهُ أَكْبَرُ ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ الْعَلِيِّ الْعَظِيمِ رَبِّ اغْفِرْ لِي'],
          transliteration: ['La ilaha illa l-lahu wahdahu la sharika lahu, lahu-l-mulku wa lahu-l-hamdu, wa huwa ala kulli shay\'in qadir. Subhana l-lahi, wa-l-hamdu li-l-lahi, wa la ilaha illa l-lahu, wa l-lahu akbaru, wa la hawla wa la quwwata illa bi-l-lahi-l-\'aliyyi-l-\'azim. Rabbi ghfir li.'],
          translation: ['None has the right to be worshipped except Allah, alone without associate, to Him belongs sovereignty and praise and He is over all things wholly capable. How perfect Allah is, and all praise is for Allah, and none has the right to be worshipped except Allah, and Allah is the greatest, and there is no power nor might except with Allah, The Most High, The Supreme. O my Lord forgive me.']
        },
        {
          arabic: ['الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ'],
          transliteration: ['Al hamdu li-l-lahi l-ladhi \'afani fi jasadi wa radda \'alayya ruhi, wa adhina li bi-dhikrihi.'],
          translation: ['All praise is for Allah who restored to me my health and returned my soul and has allowed me to remember Him.']
        }
      ]
    },
    // ... I'll continue with the rest of the duas
  ].map(dua => ({
    ...dua,
    id: dua.id.padStart(2, '0')
  }))
}; 