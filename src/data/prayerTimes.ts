interface PrayerTime {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface CityAdjustment {
  name: string;      // German name (default)
  nameAlb: string;   // Albanian name
  nameEn: string;    // English name
  nameTr: string;    // Turkish name
  adjustment: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  }
}

interface RamadanDay {
  date: string;      // "2025-03-11"
  weekday: string;   // "E Hënë"
  fajr: string;      // "04:45"
  dhuhr: string;     // "12:15"
  asr: string;       // "15:15"
  maghrib: string;   // "17:45"
  isha: string;      // "19:15"
  special?: string;  // Optional property for special days like "laylatulQadr"
}

// Base times for Gostivar
export const ramadanTimes = [
  { "date": "2025-03-01", "weekday": "Shtunë", "fajr": "4:34", "dhuhr": "11:56", "asr": "14:59", "maghrib": "17:32", "isha": "18:58" },
  { "date": "2025-03-02", "weekday": "Diel", "fajr": "4:32", "dhuhr": "11:55", "asr": "14:59", "maghrib": "17:33", "isha": "18:59" },
  { "date": "2025-03-03", "weekday": "Hënë", "fajr": "4:30", "dhuhr": "11:55", "asr": "15:00", "maghrib": "17:34", "isha": "19:01" },
  { "date": "2025-03-04", "weekday": "Martë", "fajr": "4:29", "dhuhr": "11:55", "asr": "15:01", "maghrib": "17:35", "isha": "19:02" },
  { "date": "2025-03-05", "weekday": "Mërkurë", "fajr": "4:27", "dhuhr": "11:55", "asr": "15:02", "maghrib": "17:36", "isha": "19:03" },
  { "date": "2025-03-06", "weekday": "Enjte", "fajr": "4:25", "dhuhr": "11:55", "asr": "15:03", "maghrib": "17:38", "isha": "19:04" },
  { "date": "2025-03-07", "weekday": "Premte", "fajr": "4:24", "dhuhr": "11:54", "asr": "15:03", "maghrib": "17:39", "isha": "19:05" },
  { "date": "2025-03-08", "weekday": "Shtunë", "fajr": "4:22", "dhuhr": "11:54", "asr": "15:04", "maghrib": "17:40", "isha": "19:06" },
  { "date": "2025-03-09", "weekday": "Diel", "fajr": "4:20", "dhuhr": "11:54", "asr": "15:05", "maghrib": "17:41", "isha": "19:08" },
  { "date": "2025-03-10", "weekday": "Hënë", "fajr": "4:19", "dhuhr": "11:54", "asr": "15:06", "maghrib": "17:42", "isha": "19:09" },
  { "date": "2025-03-11", "weekday": "Martë", "fajr": "4:17", "dhuhr": "11:53", "asr": "15:06", "maghrib": "17:44", "isha": "19:10" },
  { "date": "2025-03-12", "weekday": "Mërkurë", "fajr": "4:15", "dhuhr": "11:53", "asr": "15:07", "maghrib": "17:45", "isha": "19:11" },
  { "date": "2025-03-13", "weekday": "Enjte", "fajr": "4:13", "dhuhr": "11:53", "asr": "15:08", "maghrib": "17:46", "isha": "19:12" },
  { "date": "2025-03-14", "weekday": "Premte", "fajr": "4:12", "dhuhr": "11:53", "asr": "15:08", "maghrib": "17:47", "isha": "19:14" },
  { "date": "2025-03-15", "weekday": "Shtunë", "fajr": "4:10", "dhuhr": "11:52", "asr": "15:09", "maghrib": "17:48", "isha": "19:15" },
  { "date": "2025-03-16", "weekday": "Diel", "fajr": "4:08", "dhuhr": "11:52", "asr": "15:10", "maghrib": "17:49", "isha": "19:16" },
  { "date": "2025-03-17", "weekday": "Hënë", "fajr": "4:06", "dhuhr": "11:52", "asr": "15:10", "maghrib": "17:50", "isha": "19:17" },
  { "date": "2025-03-18", "weekday": "Martë", "fajr": "4:04", "dhuhr": "11:51", "asr": "15:11", "maghrib": "17:52", "isha": "19:19" },
  { "date": "2025-03-19", "weekday": "Mërkurë", "fajr": "4:02", "dhuhr": "11:51", "asr": "15:11", "maghrib": "17:53", "isha": "19:20" },
  { "date": "2025-03-20", "weekday": "Enjte", "fajr": "4:01", "dhuhr": "11:51", "asr": "15:12", "maghrib": "17:54", "isha": "19:21" },
  { "date": "2025-03-21", "weekday": "Premte", "fajr": "3:59", "dhuhr": "11:51", "asr": "15:13", "maghrib": "17:55", "isha": "19:22" },
  { "date": "2025-03-22", "weekday": "Shtunë", "fajr": "3:57", "dhuhr": "11:50", "asr": "15:13", "maghrib": "17:56", "isha": "19:24" },
  { "date": "2025-03-23", "weekday": "Diel", "fajr": "3:55", "dhuhr": "11:50", "asr": "15:14", "maghrib": "17:57", "isha": "19:25" },
  { "date": "2025-03-24", "weekday": "Hënë", "fajr": "3:53", "dhuhr": "11:50", "asr": "15:14", "maghrib": "17:58", "isha": "19:26" },
  { "date": "2025-03-25", "weekday": "Martë", "fajr": "3:51", "dhuhr": "11:49", "asr": "15:15", "maghrib": "17:59", "isha": "19:27" },
  { "date": "2025-03-26", "weekday": "Mërkurë", "fajr": "3:49", "dhuhr": "11:49", "asr": "15:15", "maghrib": "18:01", "isha": "19:29", "special": "   Nata e Kadrit" },
  { "date": "2025-03-27", "weekday": "Enjte", "fajr": "3:47", "dhuhr": "11:49", "asr": "15:16", "maghrib": "18:02", "isha": "19:30" },
  { "date": "2025-03-28", "weekday": "Premte", "fajr": "3:45", "dhuhr": "11:49", "asr": "15:16", "maghrib": "18:03", "isha": "19:31" },
  { "date": "2025-03-29", "weekday": "Shtunë", "fajr": "3:43", "dhuhr": "11:48", "asr": "15:17", "maghrib": "16:19", "isha": "19:33" }
]


// Time adjustments for each city relative to Gostivar
export const cityAdjustments: Record<string, CityAdjustment> = {
  tetovo: {
    name: "Tetovo",
    nameAlb: "Tetovë",
    nameEn: "Tetovo",
    nameTr: "Tetovo",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  kercovo: {
    name: "Kicevo",
    nameAlb: "Kërçovë",
    nameEn: "Kicevo",
    nameTr: "Kicevo",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  gostivar: {
    name: "Gostivar",
    nameAlb: "Gostivar",
    nameEn: "Gostivar",
    nameTr: "Gostivar",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  resen: {
    name: "Resen",
    nameAlb: "Resen",
    nameEn: "Resen",
    nameTr: "Resen",
    adjustment: {
      fajr: -1,
      dhuhr: -1,
      asr: -1,
      maghrib: -1,
      isha: -1
    }
  },
  manastir: {
    name: "Manastir",
    nameAlb: "Manastir",
    nameEn: "Manastir",
    nameTr: "Manastir",
    adjustment: {
      fajr: -1,
      dhuhr: -1,
      asr: -1,
      maghrib: -1,
      isha: -1
    }
  },
  skopje: {
    name: "Skopje",
    nameAlb: "Shkup",
    nameEn: "Skopje",
    nameTr: "Skopje",
    adjustment: {
      fajr: -2,
      dhuhr: -2,
      asr: -2,
      maghrib: -2,
      isha: -2
    }
  },
  prilep: {
    name: "Prilep",
    nameAlb: "Prilep",
    nameEn: "Prilep",
    nameTr: "Prilep",
    adjustment: {
      fajr: -3,
      dhuhr: -3,
      asr: -3,
      maghrib: -3,
      isha: -3
    }
  },
  kumanovo: {
    name: "Kumanovo",
    nameAlb: "Kumanovë",
    nameEn: "Kumanovo",
    nameTr: "Kumanovo",
    adjustment: {
      fajr: -3,
      dhuhr: -3,
      asr: -3,
      maghrib: -3,
      isha: -3
    }
  },
  veles: {
    name: "Veles",
    nameAlb: "Veles",
    nameEn: "Veles",
    nameTr: "Veles",
    adjustment: {
      fajr: -4,
      dhuhr: -4,
      asr: -4,
      maghrib: -4,
      isha: -4
    }
  },
  ohrid: {
    name: "Ohrid",
    nameAlb: "Ohrid",
    nameEn: "Ohrid",
    nameTr: "Ohrid",
    adjustment: {
      fajr: +3,
      dhuhr: +3,
      asr: +3,
      maghrib: +3,
      isha: +3
    }
  },
  diber: {
    name: "Dibër",
    nameAlb: "Dibër",
    nameEn: "Dibër",
    nameTr: "Dibër",
    adjustment: {
      fajr: +3,
      dhuhr: +3,
      asr: +3,
      maghrib: +3,
      isha: +3
    }
  },
  struga: {
    name: "Struga",
    nameAlb: "Strugë",
    nameEn: "Struga",
    nameTr: "Struga",
    adjustment: {
      fajr: +3,
      dhuhr: +3,
      asr: +3,
      maghrib: +3,
      isha: +3
    }
  }
};

// Helper function to adjust time by minutes
const adjustTime = (time: string, minutes: number): string => {
  const [hours, mins] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, mins + minutes);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

// Function to get prayer times for a specific city
export const getCityPrayerTimes = (cityId: string, date: string): PrayerTime | null => {
  
   // Check which country's data to use
   const isKosovoCity = Object.keys(kosovoCityAdjustments).includes(cityId);
const isSwissCity = Object.keys(swissCityAdjustments).includes(cityId);
const isAustrianCity = Object.keys(austriaCityAdjustments).includes(cityId); // Check for Austrian cities
const isGermanCity = Object.keys(germanCityAdjustments).includes(cityId); // Check for German cities
const isAlbanianCity = Object.keys(albaniaCityAdjustments).includes(cityId); // Check for Albanian cities
// Get base times from the capital city for Austria and Germany
let baseTime;

if (isAustrianCity) {
// Use Vienna's times for all Austrian cities
baseTime = austriaRamadanTimes.find(day => day.date === date);
} else if (isGermanCity) {
// Use Berlin's times for all German cities
baseTime = germanRamadanTimes.find(day => day.date === date);
} else if (isKosovoCity) {
baseTime = kosovoRamadanTimes.find(day => day.date === date);
} else if (isSwissCity) {
baseTime = swissRamadanTimes.find(day => day.date === date);
} else {
baseTime = ramadanTimes.find(day => day.date === date);
}

if (!baseTime) return null;

// Return the base times directly for Austrian and German cities
if (isAustrianCity || isGermanCity) {
  let cityTimes;

    switch (cityId) {
        case 'hamburg':
            cityTimes = hamburgRamadanTimes;
            break;
        case 'berlin':
            cityTimes = berlinRamadanTimes;
            break;   
        case 'dusseldorf':
            cityTimes = duesseldorfRamadanTimes;
            break;
        case 'bremen':
            cityTimes = bremenRamadanTimes;
            break;
        case 'frankfurt':
            cityTimes = frankfurtRamadanTimes;
            break;
        case 'hannover':
            cityTimes = hannoverRamadanTimes;
            break;
        case 'munich':
            cityTimes = muenchenRamadanTimes;
            break;
        case 'stuttgart':
            cityTimes = stuttgartRamadanTimes;
            break;
        case 'koeln':
            cityTimes = koelnRamadanTimes;
            break;
        case 'stuttgart':
            cityTimes = stuttgartRamadanTimes;
            break;
        case 'wuppertal':
            cityTimes = wuppertalRamadanTimes;
            break;
        case 'bochum':
            cityTimes = bochumRamadanTimes;
            break;
        case 'bonn':
            cityTimes = bonnRamadanTimes;
            break;
        case 'munster':
            cityTimes = muensterRamadanTimes;
            break;
        case 'duisburg':
            cityTimes = duisburgRamadanTimes;
            break;
        case 'nurenberg':
            cityTimes = nuernbergRamadanTimes;
            break;
        case 'hamburg':
            cityTimes = hamburgRamadanTimes;
            break;
        case 'wiesbaden':
            cityTimes = wiesbadenRamadanTimes;
            break;
        
        case 'hannover':
            cityTimes = hannoverRamadanTimes;
            break;
          case 'essen':
              cityTimes = essenRamadanTimes;
              break;
        case 'moenchengladbach':
            cityTimes = moenchengladbachRamadanTimes;
            break;
        case 'dortmund':
            cityTimes = dortmundRamadanTimes;
            break;
        
        
            
            












        case 'vienna':
            cityTimes = austriaRamadanTimes;
            break;
        case 'wolfsberg':
            cityTimes = wolfsbergRamadanTimes;
            break;    
        case 'graz':
            cityTimes = grazRamadanTimes;
            break;
        case 'linz':
            cityTimes = linzRamadanTimes;
            break;
        case 'salzburg':
            cityTimes = salzburgRamadanTimes;
            break;
        case 'innsbruck':
            cityTimes = innsbruckRamadanTimes;
            break;
        case 'villach':
            cityTimes = villachRamadanTimes;
            break;
        case 'bregenz':
            cityTimes = bregenzRamadanTimes;
            break;
       
      
          
        
            
        // Add more cases for other cities
        default:
            return null; // Or handle other cities/countries
    }

    const baseTime = cityTimes.find(day => day.date === date);
    if (!baseTime) return null;
  
return {
fajr: baseTime.fajr,
dhuhr: baseTime.dhuhr,
asr: baseTime.asr,
maghrib: baseTime.maghrib,
isha: baseTime.isha,
};
}

// For cities that still use adjustments
const cityAdj = isKosovoCity ? kosovoCityAdjustments[cityId] :
isAlbanianCity ? albaniaCityAdjustments[cityId] :
isSwissCity ? swissCityAdjustments[cityId] :
cityAdjustments[cityId];

if (!cityAdj) return null;

return {
fajr: adjustTime(baseTime.fajr, cityAdj.adjustment.fajr),
dhuhr: adjustTime(baseTime.dhuhr, cityAdj.adjustment.dhuhr),
asr: adjustTime(baseTime.asr, cityAdj.adjustment.asr),
maghrib: adjustTime(baseTime.maghrib, cityAdj.adjustment.maghrib),
isha: adjustTime(baseTime.isha, cityAdj.adjustment.isha),
};
}
   



 

// Base times for Austria (Vienna as reference)
export const austriaRamadanTimes = [
  { "date": "2025-03-01", "weekday": "Shtunë", "fajr": "04:53", "dhuhr": "12:12", "asr": "15:08", "maghrib": "17:45", "isha": "19:09" },
  { "date": "2025-03-02", "weekday": "Diel", "fajr": "04:51", "dhuhr": "12:12", "asr": "15:09", "maghrib": "17:46", "isha": "19:11" },
  { "date": "2025-03-03", "weekday": "Hënë", "fajr": "04:49", "dhuhr": "12:12", "asr": "15:10", "maghrib": "17:48", "isha": "19:12" },
  { "date": "2025-03-04", "weekday": "Martë", "fajr": "04:47", "dhuhr": "12:11", "asr": "15:11", "maghrib": "17:49", "isha": "19:14" },
  { "date": "2025-03-05", "weekday": "Mërkurë", "fajr": "04:45", "dhuhr": "12:11", "asr": "15:12", "maghrib": "17:51", "isha": "19:15" },
  { "date": "2025-03-06", "weekday": "Enjte", "fajr": "04:43", "dhuhr": "12:11", "asr": "15:13", "maghrib": "17:53", "isha": "19:17" },
  { "date": "2025-03-07", "weekday": "Premte", "fajr": "04:41", "dhuhr": "12:11", "asr": "15:14", "maghrib": "17:54", "isha": "19:18" },
  { "date": "2025-03-08", "weekday": "Shtunë", "fajr": "04:39", "dhuhr": "12:10", "asr": "15:15", "maghrib": "17:56", "isha": "19:20" },
  { "date": "2025-03-09", "weekday": "Diel", "fajr": "04:36", "dhuhr": "12:10", "asr": "15:16", "maghrib": "17:57", "isha": "19:22" },
  { "date": "2025-03-10", "weekday": "Hënë", "fajr": "04:34", "dhuhr": "12:10", "asr": "15:17", "maghrib": "17:59", "isha": "19:23" },
  { "date": "2025-03-11", "weekday": "Martë", "fajr": "04:32", "dhuhr": "12:10", "asr": "15:18", "maghrib": "18:00", "isha": "19:25" },
  { "date": "2025-03-12", "weekday": "Mërkurë", "fajr": "04:30", "dhuhr": "12:09", "asr": "15:19", "maghrib": "18:02", "isha": "19:26" },
  { "date": "2025-03-13", "weekday": "Enjte", "fajr": "04:28", "dhuhr": "12:09", "asr": "15:20", "maghrib": "18:03", "isha": "19:28" },
  { "date": "2025-03-14", "weekday": "Premte", "fajr": "04:26", "dhuhr": "12:09", "asr": "15:21", "maghrib": "18:05", "isha": "19:29" },
  { "date": "2025-03-15", "weekday": "Shtunë", "fajr": "04:24", "dhuhr": "12:09", "asr": "15:22", "maghrib": "18:06", "isha": "19:31" },
  { "date": "2025-03-16", "weekday": "Diel", "fajr": "04:21", "dhuhr": "12:08", "asr": "15:23", "maghrib": "18:08", "isha": "19:33" },
  { "date": "2025-03-17", "weekday": "Hënë", "fajr": "04:19", "dhuhr": "12:08", "asr": "15:24", "maghrib": "18:09", "isha": "19:34" },
  { "date": "2025-03-18", "weekday": "Martë", "fajr": "04:17", "dhuhr": "12:08", "asr": "15:25", "maghrib": "18:11", "isha": "19:36" },
  { "date": "2025-03-19", "weekday": "Mërkurë", "fajr": "04:15", "dhuhr": "12:07", "asr": "15:26", "maghrib": "18:12", "isha": "19:38" },
  { "date": "2025-03-20", "weekday": "Enjte", "fajr": "04:12", "dhuhr": "12:07", "asr": "15:26", "maghrib": "18:14", "isha": "19:39" },
  { "date": "2025-03-21", "weekday": "Premte", "fajr": "04:10", "dhuhr": "12:07", "asr": "15:27", "maghrib": "18:15", "isha": "19:41" },
  { "date": "2025-03-22", "weekday": "Shtunë", "fajr": "04:08", "dhuhr": "12:07", "asr": "15:28", "maghrib": "18:16", "isha": "19:42" },
  { "date": "2025-03-23", "weekday": "Diel", "fajr": "04:05", "dhuhr": "12:06", "asr": "15:29", "maghrib": "18:18", "isha": "19:44" },
  { "date": "2025-03-24", "weekday": "Hënë", "fajr": "04:03", "dhuhr": "12:06", "asr": "15:30", "maghrib": "18:19", "isha": "19:46" },
  { "date": "2025-03-25", "weekday": "Martë", "fajr": "04:01", "dhuhr": "12:06", "asr": "15:31", "maghrib": "18:21", "isha": "19:48" },
  { "date": "2025-03-26", "weekday": "Mërkurë", "fajr": "03:58", "dhuhr": "12:05", "asr": "15:31", "maghrib": "18:22", "isha": "19:49", "special": "Nata e Kadrit" },
  { "date": "2025-03-27", "weekday": "Enjte", "fajr": "03:56", "dhuhr": "12:05", "asr": "15:32", "maghrib": "18:24", "isha": "19:51" },
  { "date": "2025-03-28", "weekday": "Premte", "fajr": "03:54", "dhuhr": "12:05", "asr": "15:33", "maghrib": "18:25", "isha": "19:53" },
  { "date": "2025-03-29", "weekday": "Shtunë", "fajr": "03:51", "dhuhr": "12:04", "asr": "15:34", "maghrib": "18:27", "isha": "19:54" }
];

// Time adjustments for Austrian cities relative to Vienna
export const austriaCityAdjustments: Record<string, CityAdjustment> = {
  vienna: {
    name: "Vienna",
    nameAlb: "Vjenë",
    nameEn: "Vienna",
    nameTr: "Vienna",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  wolfsberg: {
    name: "Wolfsberg",
    nameAlb: "Wolfsberg",
    nameEn: "Wolfsberg",
    nameTr: "Wolfsberg",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  graz: {
    name: "Graz",
    nameAlb: "Graz",
    nameEn: "Graz",
    nameTr: "Graz",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  linz: {
    name: "Linz",
    nameAlb: "Linz",
    nameEn: "Linz",
    nameTr: "Linz",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  salzburg: {
    name: "Salzburg",
    nameAlb: "Salzburg",
    nameEn: "Salzburg",
    nameTr: "Salzburg",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  innsbruck: {
    name: "Innsbruck",
    nameAlb: "Innsbruck",
    nameEn: "Innsbruck",
    nameTr: "Innsbruck",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  villach: {
    name: "Villach",
    nameAlb: "Villach",
    nameEn: "Villach",
    nameTr: "Villach",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  bregenz: {
    name: "Bregenz",
    nameAlb: "Bregenz",
    nameEn: "Bregenz",
    nameTr: "Bregenz",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  }
};

// Base times for Kosovo (Prishtina as reference)
export const kosovoRamadanTimes = [
  { "date": "2025-03-01", "weekday": "e shtunë", "fajr": "4:34", "dhuhr": "11:51", "asr": "14:59", "maghrib": "17:33", "isha": "19:03" },
  { "date": "2025-03-02", "weekday": "e diel", "fajr": "4:33", "dhuhr": "11:50", "asr": "15:00", "maghrib": "17:34", "isha": "19:05" },
  { "date": "2025-03-03", "weekday": "e hënë", "fajr": "4:31", "dhuhr": "11:50", "asr": "15:01", "maghrib": "17:36", "isha": "19:07" },
  { "date": "2025-03-04", "weekday": "e martë", "fajr": "4:29", "dhuhr": "11:50", "asr": "15:02", "maghrib": "17:37", "isha": "19:08" },
  { "date": "2025-03-05", "weekday": "e mërkurë", "fajr": "4:27", "dhuhr": "11:50", "asr": "15:02", "maghrib": "17:38", "isha": "19:09" },
  { "date": "2025-03-06", "weekday": "e enjte", "fajr": "4:25", "dhuhr": "11:50", "asr": "15:03", "maghrib": "17:39", "isha": "19:10" },
  { "date": "2025-03-07", "weekday": "e premte", "fajr": "4:23", "dhuhr": "11:50", "asr": "15:03", "maghrib": "17:40", "isha": "19:11" },
  { "date": "2025-03-08", "weekday": "e shtunë", "fajr": "4:21", "dhuhr": "11:50", "asr": "15:04", "maghrib": "17:42", "isha": "19:13" },
  { "date": "2025-03-09", "weekday": "e diel", "fajr": "4:20", "dhuhr": "11:50", "asr": "15:05", "maghrib": "17:43", "isha": "19:14" },
  { "date": "2025-03-10", "weekday": "e hënë", "fajr": "4:18", "dhuhr": "11:50", "asr": "15:06", "maghrib": "17:44", "isha": "19:15" },
  { "date": "2025-03-11", "weekday": "e martë", "fajr": "4:16", "dhuhr": "11:50", "asr": "15:06", "maghrib": "17:45", "isha": "19:16" },
  { "date": "2025-03-12", "weekday": "e mërkurë", "fajr": "4:15", "dhuhr": "11:49", "asr": "15:07", "maghrib": "17:47", "isha": "19:18" },
  { "date": "2025-03-13", "weekday": "e enjte", "fajr": "4:14", "dhuhr": "11:49", "asr": "15:08", "maghrib": "17:48", "isha": "19:19" },
  { "date": "2025-03-14", "weekday": "e premte", "fajr": "4:13", "dhuhr": "11:49", "asr": "15:08", "maghrib": "17:49", "isha": "19:20" },
  { "date": "2025-03-15", "weekday": "e shtunë", "fajr": "4:11", "dhuhr": "11:49", "asr": "15:08", "maghrib": "17:50", "isha": "19:21" },
  { "date": "2025-03-16", "weekday": "e diel", "fajr": "4:09", "dhuhr": "11:49", "asr": "15:08", "maghrib": "17:51", "isha": "19:22" },
  { "date": "2025-03-17", "weekday": "e hënë", "fajr": "4:08", "dhuhr": "11:48", "asr": "15:09", "maghrib": "17:52", "isha": "19:23" },
  { "date": "2025-03-18", "weekday": "e martë", "fajr": "4:06", "dhuhr": "11:48", "asr": "15:09", "maghrib": "17:53", "isha": "19:25" },
  { "date": "2025-03-19", "weekday": "e mërkurë", "fajr": "4:04", "dhuhr": "11:48", "asr": "15:10", "maghrib": "17:55", "isha": "19:26" },
  { "date": "2025-03-20", "weekday": "e enjte", "fajr": "4:02", "dhuhr": "11:48", "asr": "15:11", "maghrib": "17:56", "isha": "19:27" },
  { "date": "2025-03-21", "weekday": "e premte", "fajr": "4:00", "dhuhr": "11:48", "asr": "15:12", "maghrib": "17:57", "isha": "19:28" },
  { "date": "2025-03-22", "weekday": "e shtunë", "fajr": "3:57", "dhuhr": "11:47", "asr": "15:12", "maghrib": "17:58", "isha": "19:30" },
  { "date": "2025-03-23", "weekday": "e diel", "fajr": "3:55", "dhuhr": "11:47", "asr": "15:13", "maghrib": "17:59", "isha": "19:31" },
  { "date": "2025-03-24", "weekday": "e hënë", "fajr": "3:53", "dhuhr": "11:46", "asr": "15:13", "maghrib": "18:00", "isha": "19:32" },
  { "date": "2025-03-25", "weekday": "e martë", "fajr": "3:51", "dhuhr": "11:45", "asr": "15:14", "maghrib": "18:02", "isha": "19:34" },
  { "date": "2025-03-26", "weekday": "e mërkurë", "fajr": "3:49", "dhuhr": "11:45", "asr": "15:15", "maghrib": "18:03", "isha": "19:35" },
  { "date": "2025-03-27", "weekday": "e enjte", "fajr": "3:46", "dhuhr": "11:45", "asr": "15:15", "maghrib": "18:04", "isha": "19:36" },
  { "date": "2025-03-28", "weekday": "e premte", "fajr": "3:44", "dhuhr": "11:45", "asr": "15:16", "maghrib": "18:05", "isha": "19:37" },
  { "date": "2025-03-29", "weekday": "e shtunë", "fajr": "3:41", "dhuhr": "11:44", "asr": "15:16", "maghrib": "18:06", "isha": "19:38" }
];

// Time adjustments for Kosovo cities relative to Prishtina
export const kosovoCityAdjustments: Record<string, CityAdjustment> = {
  prishtina: {
    name: "Prishtina",
    nameAlb: "Prishtinë",
    nameEn: "Prishtina",
    nameTr: "Prishtina",
    adjustment: {
      fajr: -1,
      dhuhr: -1,
      asr: -1,
      maghrib: -1,
      isha: -1
    }
  },
  sharr: {
    name: "Sharr",
    nameAlb: "Sharr",
    nameEn: "Sharr",
    nameTr: "Sharr",
    adjustment: {
      fajr: +2,
      dhuhr: +2,
      asr: +2,
      maghrib: +2,
      isha: +2
    }
  },
  ferizaj: {
    name: "Ferizaj",
    nameAlb: "Ferizaj",
    nameEn: "Ferizaj",
    nameTr: "Ferizaj",
    adjustment: {
      fajr: -1,
      dhuhr: -1,
      asr: -1,
      maghrib: -1,
      isha: -1
    }
  },
  gjilan: {
    name: "Gjilan",
    nameAlb: "Gjilan",
    nameEn: "Gjilan",
    nameTr: "Gjilan",
    adjustment: {
      fajr: -1,
      dhuhr: -1,
      asr: -1,
      maghrib: -1,
      isha: -1
    }
  },
  podujeva: {
    name: "Podujeva",
    nameAlb: "Podujevë",
    nameEn: "Podujeva",
    nameTr: "Podujeva",
    adjustment: {
      fajr: -1,
      dhuhr: -1,
      asr: -1,
      maghrib: -1,
      isha: -1
    }
  },
  vushtrri: {
    name: "Vushtrri",
    nameAlb: "Vushtrri",
    nameEn: "Vushtrri",
    nameTr: "Vushtrri",
    adjustment: {
      fajr: -1,
      dhuhr: -1,
      asr: -1,
      maghrib: -1,
      isha: -1
    }
  },
  presheva: {
    name: "Presheva",
    nameAlb: "Preshevë",
    nameEn: "Presheva",
    nameTr: "Presheva",
    adjustment: {
      fajr: -2,
      dhuhr: -2,
      asr: -2,
      maghrib: -2,
      isha: -2
    }
  }
};

// Base times for Switzerland (Zurich as reference)
export const swissRamadanTimes = [
  { "date": "2025-03-01", "weekday": "Shtunë", "fajr": "05:25", "dhuhr": "12:43", "asr": "15:41", "maghrib": "18:17", "isha": "20:17" },
  { "date": "2025-03-02", "weekday": "Diel", "fajr": "05:23", "dhuhr": "12:43", "asr": "15:42", "maghrib": "18:18", "isha": "20:18" },
  { "date": "2025-03-03", "weekday": "Hënë", "fajr": "05:21", "dhuhr": "12:43", "asr": "15:43", "maghrib": "18:20", "isha": "20:20" },
  { "date": "2025-03-04", "weekday": "Martë", "fajr": "05:19", "dhuhr": "12:43", "asr": "15:44", "maghrib": "18:21", "isha": "20:21" },
  { "date": "2025-03-05", "weekday": "Mërkurë", "fajr": "05:17", "dhuhr": "12:42", "asr": "15:45", "maghrib": "18:23", "isha": "20:23" },
  { "date": "2025-03-06", "weekday": "Enjte", "fajr": "05:15", "dhuhr": "12:42", "asr": "15:46", "maghrib": "18:24", "isha": "20:24" },
  { "date": "2025-03-07", "weekday": "Premte", "fajr": "05:13", "dhuhr": "12:42", "asr": "15:47", "maghrib": "18:26", "isha": "20:26" },
  { "date": "2025-03-08", "weekday": "Shtunë", "fajr": "05:11", "dhuhr": "12:42", "asr": "15:48", "maghrib": "18:27", "isha": "20:27" },
  { "date": "2025-03-09", "weekday": "Diel", "fajr": "05:09", "dhuhr": "12:41", "asr": "15:49", "maghrib": "18:29", "isha": "20:29" },
  { "date": "2025-03-10", "weekday": "Hënë", "fajr": "05:07", "dhuhr": "12:41", "asr": "15:50", "maghrib": "18:30", "isha": "20:30" },
  { "date": "2025-03-11", "weekday": "Martë", "fajr": "05:05", "dhuhr": "12:41", "asr": "15:50", "maghrib": "18:32", "isha": "20:32" },
  { "date": "2025-03-12", "weekday": "Mërkurë", "fajr": "05:03", "dhuhr": "12:41", "asr": "15:51", "maghrib": "18:33", "isha": "20:33" },
  { "date": "2025-03-13", "weekday": "Enjte", "fajr": "05:01", "dhuhr": "12:40", "asr": "15:52", "maghrib": "18:35", "isha": "20:35" },
  { "date": "2025-03-14", "weekday": "Premte", "fajr": "04:59", "dhuhr": "12:40", "asr": "15:53", "maghrib": "18:36", "isha": "20:36" },
  { "date": "2025-03-15", "weekday": "Shtunë", "fajr": "04:56", "dhuhr": "12:40", "asr": "15:53", "maghrib": "18:38", "isha": "20:38" },
  { "date": "2025-03-16", "weekday": "Diel", "fajr": "04:54", "dhuhr": "12:40", "asr": "15:55", "maghrib": "18:39", "isha": "20:39" },
  { "date": "2025-03-17", "weekday": "Hënë", "fajr": "04:52", "dhuhr": "12:39", "asr": "15:56", "maghrib": "18:40", "isha": "20:40" },
  { "date": "2025-03-18", "weekday": "Martë", "fajr": "04:50", "dhuhr": "12:39", "asr": "15:57", "maghrib": "18:42", "isha": "20:42" },
  { "date": "2025-03-19", "weekday": "Mërkurë", "fajr": "04:48", "dhuhr": "12:39", "asr": "15:58", "maghrib": "18:43", "isha": "20:43" },
  { "date": "2025-03-20", "weekday": "Enjte", "fajr": "04:45", "dhuhr": "12:38", "asr": "15:58", "maghrib": "18:45", "isha": "20:45" },
  { "date": "2025-03-21", "weekday": "Premte", "fajr": "04:43", "dhuhr": "12:38", "asr": "15:59", "maghrib": "18:46", "isha": "20:46" },
  { "date": "2025-03-22", "weekday": "Shtunë", "fajr": "04:41", "dhuhr": "12:38", "asr": "16:00", "maghrib": "18:48", "isha": "20:48" },
  { "date": "2025-03-23", "weekday": "Diel", "fajr": "04:39", "dhuhr": "12:38", "asr": "16:01", "maghrib": "18:49", "isha": "20:49" },
  { "date": "2025-03-24", "weekday": "Hënë", "fajr": "04:36", "dhuhr": "12:37", "asr": "16:02", "maghrib": "18:50", "isha": "20:52" },
  { "date": "2025-03-25", "weekday": "Martë", "fajr": "04:34", "dhuhr": "12:37", "asr": "16:02", "maghrib": "18:52", "isha": "20:53" },
  { "date": "2025-03-26", "weekday": "Mërkurë", "fajr": "04:32", "dhuhr": "12:37", "asr": "16:03", "maghrib": "18:53", "isha": "20:53" },
  { "date": "2025-03-27", "weekday": "Enjte", "fajr": "04:30", "dhuhr": "12:36", "asr": "16:04", "maghrib": "18:55", "isha": "20:55" },
  { "date": "2025-03-28", "weekday": "Premte", "fajr": "04:27", "dhuhr": "12:36", "asr": "16:05", "maghrib": "18:56", "isha": "20:56" },
  { "date": "2025-03-29", "weekday": "Shtunë", "fajr": "04:25", "dhuhr": "12:36", "asr": "16:05", "maghrib": "18:57", "isha": "20:57" }
];


export const swissCityAdjustments : Record<string, CityAdjustment> = {
  
    aarau: {
      name: "Aarau",
      nameAlb: "Aarau",
      nameEn: "Aarau",
      nameTr: "Aarau",
      adjustment: { fajr: 2, dhuhr: 2, asr: 2, maghrib: 2, isha: 2 }
    },
    appenzell: {
      name: "Appenzell",
      nameAlb: "Appenzell",
      nameEn: "Appenzell",
      nameTr: "Appenzell",
      adjustment: { fajr: -4, dhuhr: -4, asr: -4, maghrib: -4, isha: -4 }
    },
    baden: {
      name: "Baden",
      nameAlb: "Baden",
      nameEn: "Baden",
      nameTr: "Baden",
      adjustment: { fajr: 1, dhuhr: 1, asr: 1, maghrib: 1, isha: 1 }
    },
    basel: {
      name: "Basel",
      nameAlb: "Basel",
      nameEn: "Basel",
      nameTr: "Basel",
      adjustment: { fajr: 4, dhuhr: 4, asr: 4, maghrib: 4, isha: 4 }
    },
    bern: {
      name: "Bern",
      nameAlb: "Bern",
      nameEn: "Bern",
      nameTr: "Bern",
      adjustment: { fajr: 4, dhuhr: 4, asr: 4, maghrib: 4, isha: 4 }
    },
    "biel/bienne": {
      name: "Biel/Bienne",
      nameAlb: "Biel/Bienne",
      nameEn: "Biel/Bienne",
      nameTr: "Biel/Bienne",
      adjustment: { fajr: 5, dhuhr: 5, asr: 5, maghrib: 5, isha: 5 }
    },
    chur: {
      name: "Chur",
      nameAlb: "Chur",
      nameEn: "Chur",
      nameTr: "Chur",
      adjustment: { fajr: -4, dhuhr: -4, asr: -4, maghrib: -4, isha: -4 }
    },
    davos: {
      name: "Davos",
      nameAlb: "Davos",
      nameEn: "Davos",
      nameTr: "Davos",
      adjustment: { fajr: -5, dhuhr: -5, asr: -5, maghrib: -5, isha: -5 }
    },
    delemont: {
      name: "Delemont",
      nameAlb: "Delemont",
      nameEn: "Delemont",
      nameTr: "Delemont",
      adjustment: { fajr: 5, dhuhr: 5, asr: 5, maghrib: 5, isha: 5 }
    },
    diessenhofen: {
      name: "Diessenhofen",
      nameAlb: "Diessenhofen",
      nameEn: "Diessenhofen",
      nameTr: "Diessenhofen",
      adjustment: { fajr: -1, dhuhr: -1, asr: -1, maghrib: -1, isha: -1 }
    },
    frauenfeld: {
      name: "Frauenfeld",
      nameAlb: "Frauenfeld",
      nameEn: "Frauenfeld",
      nameTr: "Frauenfeld",
      adjustment: { fajr: -1, dhuhr: -1, asr: -1, maghrib: -1, isha: -1 }
    },
    fribourg: {
      name: "Fribourg",
      nameAlb: "Fribourg",
      nameEn: "Fribourg",
      nameTr: "Fribourg",
      adjustment: { fajr: 5, dhuhr: 5, asr: 5, maghrib: 5, isha: 5 }
    },
    geneva: {
      name: "Geneva",
      nameAlb: "Geneva",
      nameEn: "Geneva",
      nameTr: "Geneva",
      adjustment: { fajr: 9, dhuhr: 9, asr: 9, maghrib: 9, isha: 9 }
    },
    glarus: {
      name: "Glarus",
      nameAlb: "Glarus",
      nameEn: "Glarus",
      nameTr: "Glarus",
      adjustment: { fajr: -2, dhuhr: -2, asr: -2, maghrib: -2, isha: -2 }
    },
    interlaken: {
      name: "Interlaken",
      nameAlb: "Interlaken",
      nameEn: "Interlaken",
      nameTr: "Interlaken",
      adjustment: { fajr: 2, dhuhr: 2, asr: 2, maghrib: 2, isha: 2 }
    },
    kreuzlingen: {
      name: "Kreuzlingen",
      nameAlb: "Kreuzlingen",
      nameEn: "Kreuzlingen",
      nameTr: "Kreuzlingen",
      adjustment: { fajr: -3, dhuhr: -3, asr: -3, maghrib: -3, isha: -3 }
    },
    langenthal: {
      name: "Langenthal",
      nameAlb: "Langenthal",
      nameEn: "Langenthal",
      nameTr: "Langenthal",
      adjustment: { fajr: 3, dhuhr: 3, asr: 3, maghrib: 3, isha: 3 }
    },
    lausanne: {
      name: "Lausanne",
      nameAlb: "Lausanne",
      nameEn: "Lausanne",
      nameTr: "Lausanne",
      adjustment: { fajr: 7, dhuhr: 7, asr: 7, maghrib: 7, isha: 7 }
    },
    liestal: {
      name: "Liestal",
      nameAlb: "Liestal",
      nameEn: "Liestal",
      nameTr: "Liestal",
      adjustment: { fajr: 3, dhuhr: 3, asr: 3, maghrib: 3, isha: 3 }
    },
    lugano: {
      name: "Lugano",
      nameAlb: "Lugano",
      nameEn: "Lugano",
      nameTr: "Lugano",
      adjustment: { fajr: 3, dhuhr: 3, asr: 3, maghrib: 3, isha: 3 }
    },
    luzern: {
      name: "Luzern",
      nameAlb: "Luzern",
      nameEn: "Luzern",
      nameTr: "Luzern",
      adjustment: { fajr: 1, dhuhr: 1, asr: 1, maghrib: 1, isha: 1 }
    },
    martigny: {
      name: "Martigny",
      nameAlb: "Martigny",
      nameEn: "Martigny",
      nameTr: "Martigny",
      adjustment: { fajr: 5, dhuhr: 5, asr: 5, maghrib: 5, isha: 5 }
    },
    neuchatel: {
      name: "Neuchatel",
      nameAlb: "Neuchatel",
      nameEn: "Neuchatel",
      nameTr: "Neuchatel",
      adjustment: { fajr: 6, dhuhr: 6, asr: 6, maghrib: 6, isha: 6 }
    },
    nyon: {
      name: "Nyon",
      nameAlb: "Nyon",
      nameEn: "Nyon",
      nameTr: "Nyon",
      adjustment: { fajr: 9, dhuhr: 9, asr: 9, maghrib: 9, isha: 9 }
    },
    olten: {
      name: "Olten",
      nameAlb: "Olten",
      nameEn: "Olten",
      nameTr: "Olten",
      adjustment: { fajr: 2, dhuhr: 2, asr: 2, maghrib: 2, isha: 2 }
    },
    reinach: {
      name: "Reinach",
      nameAlb: "Reinach",
      nameEn: "Reinach",
      nameTr: "Reinach",
      adjustment: { fajr: 1, dhuhr: 1, asr: 1, maghrib: 1, isha: 1 }
    },
    romanshorn: {
      name: "Romanshorn",
      nameAlb: "Romanshorn",
      nameEn: "Romanshorn",
      nameTr: "Romanshorn",
      adjustment: { fajr: -3, dhuhr: -3, asr: -3, maghrib: -3, isha: -3 }
    },
    rorschach: {
      name: "Rorschach",
      nameAlb: "Rorschach",
      nameEn: "Rorschach",
      nameTr: "Rorschach",
      adjustment: { fajr: -4, dhuhr: -4, asr: -4, maghrib: -4, isha: -4 }
    },
    sarnen: {
      name: "Sarnen",
      nameAlb: "Sarnen",
      nameEn: "Sarnen",
      nameTr: "Sarnen",
      adjustment: { fajr: 1, dhuhr: 1, asr: 1, maghrib: 1, isha: 1 }
    },
    schaffhausen: {
      name: "Schaffhausen",
      nameAlb: "Schaffhausen",
      nameEn: "Schaffhausen",
      nameTr: "Schaffhausen",
      adjustment: { fajr: -1, dhuhr: 1, asr: 1, maghrib: 1, isha: 1 }
    },
    schwyz: {
      name: "Schwyz",
      nameAlb: "Schwyz",
      nameEn: "Schwyz",
      nameTr: "Schwyz",
      adjustment: { fajr: -1, dhuhr: 1, asr: 1, maghrib: 1, isha: 1 }
    },
    sion: {
      name: "Sion",
      nameAlb: "Sion",
      nameEn: "Sion",
      nameTr: "Sion",
      adjustment: { fajr: 4, dhuhr: 4, asr: 4, maghrib: 4, isha: 4 }
    },
    solothurn: {
      name: "Solothurn",
      nameAlb: "Solothurn",
      nameEn: "Solothurn",
      nameTr: "Solothurn",
      adjustment: { fajr: -1, dhuhr: -1, asr: -1, maghrib: -1, isha: -1 }
    },
    stgallen: {
      name: "St. Gallen",
      nameAlb: "St. Gallen",
      nameEn: "St. Gallen",
      nameTr: "St. Gallen",
      adjustment: { fajr: -3, dhuhr: -3, asr: -3, maghrib: -3, isha: -3 }
    },
    stmoritz: {
      name: "St. Moritz",
      nameAlb: "St. Moritz",
      nameEn: "St. Moritz",
      nameTr: "St. Moritz",
      adjustment: { fajr: -6, dhuhr: -6, asr: -6, maghrib: -6, isha: -6 }
    },
    thun: {
      name: "Thun",
      nameAlb: "Thun",
      nameEn: "Thun",
      nameTr: "Thun",
      adjustment: { fajr: 3, dhuhr: 3, asr: 3, maghrib: 3, isha: 3 }
    },
    visp: {
      name: "Visp",
      nameAlb: "Visp",
      nameEn: "Visp",
      nameTr: "Visp",
      adjustment: { fajr: 2, dhuhr: 2, asr: 2, maghrib: 2, isha: 2 }
    },
    wetzikon: {
      name: "Wetzikon",
      nameAlb: "Wetzikon",
      nameEn: "Wetzikon",
      nameTr: "Wetzikon",
      adjustment: { fajr: -1, dhuhr: 1, asr: 1, maghrib: 1, isha: 1 }
    },
    will: {
      name: "Will",
      nameAlb: "Will",
      nameEn: "Will",
      nameTr: "Will",
      adjustment: { fajr: -1, dhuhr: -1, asr: -1, maghrib: -1, isha: -1 }
    },
    winterthur: {
      name: "Winterthur",
      nameAlb: "Winterthur",
      nameEn: "Winterthur",
      nameTr: "Winterthur",
      adjustment: { fajr: -1, dhuhr: -1, asr: -1, maghrib: -1, isha: -1 }
    },
    yverdon: {
      name: "Yverdon",
      nameAlb: "Yverdon",
      nameEn: "Yverdon",
      nameTr: "Yverdon",
      adjustment: { fajr: 7, dhuhr: 7, asr: 7, maghrib: 7, isha: 7 }
    },Zermat:{
      name: "Zermat",
      nameAlb: "Zermat",
      nameEn: "Zermat",
      nameTr: "Zermat",
      adjustment: { fajr: 3, dhuhr: 3, asr: 3, maghrib: 3, isha: 3 }
    },Zug:{
      name: "Zug",
      nameAlb: "Zug",
      nameEn: "Zug",
      nameTr: "Zug",
      adjustment: { fajr: 0, dhuhr: 0 , asr: 0, maghrib: 0, isha: 0 }
    },zurich: {
      name: "Zurich",
      nameAlb: "Zurich",
      nameEn: "Zurich",
      nameTr: "Zurich",
      adjustment: { fajr: 0, dhuhr: 0 , asr: 0, maghrib: 0, isha: 0 }
    }
 }
     
  
 export const albanianRamadanTimes = [
  { "date": "2025-03-01", "day": "E shtunë", "fajr": "04:39", "dhuhr": "12:00", "asr": "15:04", "maghrib": "17:37", "isha": "18:59" },
  { "date": "2025-03-02", "day": "E diel", "fajr": "04:38", "dhuhr": "12:00", "asr": "15:05", "maghrib": "17:38", "isha": "19:00" },
  { "date": "2025-03-03", "day": "E hënë", "fajr": "04:36", "dhuhr": "12:00", "asr": "15:06", "maghrib": "17:39", "isha": "19:01" },
  { "date": "2025-03-04", "day": "E martë", "fajr": "04:34", "dhuhr": "12:00", "asr": "15:07", "maghrib": "17:41", "isha": "19:02" },
  { "date": "2025-03-05", "day": "E mërkurë", "fajr": "04:33", "dhuhr": "11:59", "asr": "15:07", "maghrib": "17:42", "isha": "19:03" },
  { "date": "2025-03-06", "day": "E enjte", "fajr": "04:31", "dhuhr": "11:59", "asr": "15:08", "maghrib": "17:43", "isha": "19:04" },
  { "date": "2025-03-07", "day": "E premte", "fajr": "04:30", "dhuhr": "11:59", "asr": "15:09", "maghrib": "17:44", "isha": "19:05" },
  { "date": "2025-03-08", "day": "E shtunë", "fajr": "04:28", "dhuhr": "11:59", "asr": "15:10", "maghrib": "17:45", "isha": "19:07" },
  { "date": "2025-03-09", "day": "E diel", "fajr": "04:26", "dhuhr": "11:58", "asr": "15:10", "maghrib": "17:46", "isha": "19:08" },
  { "date": "2025-03-10", "day": "E hënë", "fajr": "04:25", "dhuhr": "11:58", "asr": "15:11", "maghrib": "17:47", "isha": "19:09" },
  { "date": "2025-03-11", "day": "E martë", "fajr": "04:23", "dhuhr": "11:58", "asr": "15:12", "maghrib": "17:49", "isha": "19:10" },
  { "date": "2025-03-12", "day": "E mërkurë", "fajr": "04:21", "dhuhr": "11:58", "asr": "15:12", "maghrib": "17:50", "isha": "19:11" },
  { "date": "2025-03-13", "day": "E enjte", "fajr": "04:20", "dhuhr": "11:57", "asr": "15:13", "maghrib": "17:51", "isha": "19:12" },
  { "date": "2025-03-14", "day": "E premte", "fajr": "04:18", "dhuhr": "11:57", "asr": "15:14", "maghrib": "17:52", "isha": "19:14" },
  { "date": "2025-03-15", "day": "E shtunë", "fajr": "04:16", "dhuhr": "11:57", "asr": "15:14", "maghrib": "17:53", "isha": "19:15" },
  { "date": "2025-03-16", "day": "E diel", "fajr": "04:14", "dhuhr": "11:57", "asr": "15:15", "maghrib": "17:54", "isha": "19:16" },
  { "date": "2025-03-17", "day": "E hënë", "fajr": "04:12", "dhuhr": "11:56", "asr": "15:15", "maghrib": "17:55", "isha": "19:17" },
  { "date": "2025-03-18", "day": "E martë", "fajr": "04:11", "dhuhr": "11:56", "asr": "15:16", "maghrib": "17:56", "isha": "19:18" },
  { "date": "2025-03-19", "day": "E mërkurë", "fajr": "04:09", "dhuhr": "11:56", "asr": "15:17", "maghrib": "17:58", "isha": "19:20" },
  { "date": "2025-03-20", "day": "E enjte", "fajr": "04:07", "dhuhr": "11:55", "asr": "15:17", "maghrib": "17:59", "isha": "19:21" },
  { "date": "2025-03-21", "day": "E premte", "fajr": "04:05", "dhuhr": "11:55", "asr": "15:18", "maghrib": "18:00", "isha": "19:22" },
  { "date": "2025-03-22", "day": "E shtunë", "fajr": "04:03", "dhuhr": "11:55", "asr": "15:18", "maghrib": "18:01", "isha": "19:23" },
  { "date": "2025-03-23", "day": "E diel", "fajr": "04:02", "dhuhr": "11:54", "asr": "15:19", "maghrib": "18:02", "isha": "19:24" },
  { "date": "2025-03-24", "day": "E hënë", "fajr": "04:00", "dhuhr": "11:54", "asr": "15:19", "maghrib": "18:03", "isha": "19:26" },
  { "date": "2025-03-25", "day": "E martë", "fajr": "03:58", "dhuhr": "11:54", "asr": "15:20", "maghrib": "18:04", "isha": "19:27" },
  { "date": "2025-03-26", "day": "E mërkurë", "fajr": "03:56", "dhuhr": "11:54", "asr": "15:20", "maghrib": "18:05", "isha": "19:28" },
  { "date": "2025-03-27", "day": "E enjte", "fajr": "03:54", "dhuhr": "11:53", "asr": "15:21", "maghrib": "18:06", "isha": "19:29" },
  { "date": "2025-03-28", "day": "E premte", "fajr": "03:52", "dhuhr": "11:53", "asr": "15:21", "maghrib": "18:07", "isha": "19:31" },
  { "date": "2025-03-29", "day": "E shtunë", "fajr": "03:50", "dhuhr": "11:53", "asr": "15:22", "maghrib": "18:08", "isha": "19:32" }
];
export const albaniaCityAdjustments : Record<string, CityAdjustment> = {
  Tirana: {
    name: "Tirana",
      nameAlb: "Tirana",
      nameEn: "Tirana",
      nameTr: "Tirana",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  Durres: {
    name: "Durres",
      nameAlb: "Durres",
      nameEn: "Durres",
      nameTr: "Durres",
    adjustment: { fajr: 2, dhuhr: 2, asr: 2, maghrib: 2, isha: 2 }
  },
  Elbasan: {
    name: "Elbasan",
      nameAlb: "Elbasan",
      nameEn: "Elbasan",
      nameTr: "Elbasan",
    adjustment: { fajr: -1, dhuhr: -1, asr: -1, maghrib: -1, isha: -1 }
  },
  Shkodra: {
    name: "Shkodra",
      nameAlb: "Shkodra",
      nameEn: "Shkodra",
      nameTr: "Shkodra",
    adjustment: { fajr: 2, dhuhr: 2, asr: 2, maghrib: 2, isha: 2 },
  },
  Lushnje: {
    name: "Lushnje",
      nameAlb: "Lushnje",
      nameEn: "Lushnje",
      nameTr: "Lushnje",
      adjustment: { fajr: 1, dhuhr: 1, asr: 1, maghrib: 1, isha: 1 }
    },
    Vlora: {
      name: "Vlora",
      nameAlb: "Vlora",
      nameEn: "Vlora",
      nameTr: "Vlora",
      adjustment: { fajr: 1, dhuhr: 1, asr: 1, maghrib: 1, isha: 1 }
    },
    Berat: {
      name: "Berat",
      nameAlb: "Berat",
      nameEn: "Berat",
      nameTr: "Berat",
      adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
    },
      Kukes: {
      name: "Kukes",
      nameAlb: "Kukes",
      nameEn: "Kukes",
      nameTr: "Kukes",
      adjustment: { fajr: -1, dhuhr: -1, asr: -1, maghrib: -1, isha: -1 }
    },Librazhd: {
      name: "Librazhd",
      nameAlb: "Librazhd",
      nameEn: "Librazhd",
      nameTr: "Librazhd",
      adjustment: { fajr: -2, dhuhr: -2, asr: -2, maghrib: -2, isha: -2 }
    },Korce: {
      name: "Korce",
      nameAlb: "Korce",
      nameEn: "Korce",
      nameTr: "Korce",
      adjustment: { fajr: -5, dhuhr: -5, asr: -5, maghrib: -5, isha: -5 }
    }
  
}


// Base times for Wolfsberg
export const wolfsbergRamadanTimes = [
  { "date": "2025-03-01", "weekday": "e shtunë", "fajr": "05:00", "dhuhr": "12:18", "asr": "15:16", "maghrib": "17:52", "isha": "19:14" },
  { "date": "2025-03-02", "weekday": "e diel", "fajr": "04:58", "dhuhr": "12:18", "asr": "15:17", "maghrib": "17:54", "isha": "19:16" },
  { "date": "2025-03-03", "weekday": "e hënë", "fajr": "04:56", "dhuhr": "12:18", "asr": "15:18", "maghrib": "17:55", "isha": "19:17" },
  { "date": "2025-03-04", "weekday": "e martë", "fajr": "04:54", "dhuhr": "12:17", "asr": "15:19", "maghrib": "17:57", "isha": "19:19" },
  { "date": "2025-03-05", "weekday": "e mërkurë", "fajr": "04:52", "dhuhr": "12:17", "asr": "15:20", "maghrib": "17:58", "isha": "19:20" },
  { "date": "2025-03-06", "weekday": "e enjte", "fajr": "04:50", "dhuhr": "12:17", "asr": "15:21", "maghrib": "18:00", "isha": "19:22" },
  { "date": "2025-03-07", "weekday": "e premte", "fajr": "04:48", "dhuhr": "12:17", "asr": "15:22", "maghrib": "18:01", "isha": "19:23" },
  { "date": "2025-03-08", "weekday": "e shtunë", "fajr": "04:46", "dhuhr": "12:16", "asr": "15:23", "maghrib": "18:02", "isha": "19:25" },
  { "date": "2025-03-09", "weekday": "e diel", "fajr": "04:44", "dhuhr": "12:16", "asr": "15:24", "maghrib": "18:04", "isha": "19:26" },
  { "date": "2025-03-10", "weekday": "e hënë", "fajr": "04:42", "dhuhr": "12:16", "asr": "15:25", "maghrib": "18:05", "isha": "19:27" },
  { "date": "2025-03-11", "weekday": "e martë", "fajr": "04:40", "dhuhr": "12:16", "asr": "15:26", "maghrib": "18:07", "isha": "19:29" },
  { "date": "2025-03-12", "weekday": "e mërkurë", "fajr": "04:38", "dhuhr": "12:15", "asr": "15:27", "maghrib": "18:08", "isha": "19:30" },
  { "date": "2025-03-13", "weekday": "e enjte", "fajr": "04:36", "dhuhr": "12:15", "asr": "15:28", "maghrib": "18:10", "isha": "19:32" },
  { "date": "2025-03-14", "weekday": "e premte", "fajr": "04:34", "dhuhr": "12:15", "asr": "15:29", "maghrib": "18:11", "isha": "19:33" },
  { "date": "2025-03-15", "weekday": "e shtunë", "fajr": "04:32", "dhuhr": "12:15", "asr": "15:29", "maghrib": "18:12", "isha": "19:35" },
  { "date": "2025-03-16", "weekday": "e diel", "fajr": "04:30", "dhuhr": "12:14", "asr": "15:30", "maghrib": "18:14", "isha": "19:36" },
  { "date": "2025-03-17", "weekday": "e hënë", "fajr": "04:28", "dhuhr": "12:14", "asr": "15:31", "maghrib": "18:15", "isha": "19:38" },
  { "date": "2025-03-18", "weekday": "e martë", "fajr": "04:26", "dhuhr": "12:14", "asr": "15:32", "maghrib": "18:17", "isha": "19:39" },
  { "date": "2025-03-19", "weekday": "e mërkurë", "fajr": "04:24", "dhuhr": "12:13", "asr": "15:33", "maghrib": "18:18", "isha": "19:41" },
  { "date": "2025-03-20", "weekday": "e enjte", "fajr": "04:21", "dhuhr": "12:13", "asr": "15:34", "maghrib": "18:19", "isha": "19:43" },
  { "date": "2025-03-21", "weekday": "e premte", "fajr": "04:19", "dhuhr": "12:13", "asr": "15:34", "maghrib": "18:21", "isha": "19:44" },
  { "date": "2025-03-22", "weekday": "e shtunë", "fajr": "04:17", "dhuhr": "12:13", "asr": "15:35", "maghrib": "18:22", "isha": "19:46" },
  { "date": "2025-03-23", "weekday": "e diel", "fajr": "04:15", "dhuhr": "12:12", "asr": "15:36", "maghrib": "18:24", "isha": "19:47" },
  { "date": "2025-03-24", "weekday": "e hënë", "fajr": "04:13", "dhuhr": "12:12", "asr": "15:37", "maghrib": "18:25", "isha": "19:49" },
  { "date": "2025-03-25", "weekday": "e martë", "fajr": "04:10", "dhuhr": "12:12", "asr": "15:37", "maghrib": "18:26", "isha": "19:50" },
  { "date": "2025-03-26", "weekday": "e mërkurë", "fajr": "04:08", "dhuhr": "12:11", "asr": "15:38", "maghrib": "18:28", "isha": "19:52" },
  { "date": "2025-03-27", "weekday": "e enjte", "fajr": "04:06", "dhuhr": "12:11", "asr": "15:39", "maghrib": "18:29", "isha": "19:54" },
  { "date": "2025-03-28", "weekday": "e premte", "fajr": "04:04", "dhuhr": "12:11", "asr": "15:40", "maghrib": "18:30", "isha": "19:55" },
  { "date": "2025-03-29", "weekday": "e shtunë", "fajr": "04:01", "dhuhr": "12:10", "asr": "15:40", "maghrib": "18:32", "isha": "19:57" }
];

// Base times for Graz
export const grazRamadanTimes = [
  { "date": "2025-03-01", "weekday": "e shtunë", "fajr": "04:57", "dhuhr": "12:16", "asr": "15:14", "maghrib": "17:50", "isha": "19:12" },
  { "date": "2025-03-02", "weekday": "e diel", "fajr": "04:55", "dhuhr": "12:16", "asr": "15:15", "maghrib": "17:51", "isha": "19:14" },
  { "date": "2025-03-03", "weekday": "e hënë", "fajr": "04:54", "dhuhr": "12:15", "asr": "15:16", "maghrib": "17:53", "isha": "19:15" },
  { "date": "2025-03-04", "weekday": "e martë", "fajr": "04:52", "dhuhr": "12:15", "asr": "15:17", "maghrib": "17:54", "isha": "19:17" },
  { "date": "2025-03-05", "weekday": "e mërkurë", "fajr": "04:50", "dhuhr": "12:15", "asr": "15:18", "maghrib": "17:56", "isha": "19:18" },
  { "date": "2025-03-06", "weekday": "e enjte", "fajr": "04:48", "dhuhr": "12:15", "asr": "15:19", "maghrib": "17:57", "isha": "19:20" },
  { "date": "2025-03-07", "weekday": "e premte", "fajr": "04:46", "dhuhr": "12:14", "asr": "15:20", "maghrib": "17:59", "isha": "19:21" },
  { "date": "2025-03-08", "weekday": "e shtunë", "fajr": "04:44", "dhuhr": "12:14", "asr": "15:20", "maghrib": "18:00", "isha": "19:23" },
  { "date": "2025-03-09", "weekday": "e diel", "fajr": "04:42", "dhuhr": "12:14", "asr": "15:21", "maghrib": "18:01", "isha": "19:24" },
  { "date": "2025-03-10", "weekday": "e hënë", "fajr": "04:40", "dhuhr": "12:14", "asr": "15:22", "maghrib": "18:03", "isha": "19:25" },
  { "date": "2025-03-11", "weekday": "e martë", "fajr": "04:38", "dhuhr": "12:13", "asr": "15:23", "maghrib": "18:04", "isha": "19:27" },
  { "date": "2025-03-12", "weekday": "e mërkurë", "fajr": "04:36", "dhuhr": "12:13", "asr": "15:24", "maghrib": "18:06", "isha": "19:28" },
  { "date": "2025-03-13", "weekday": "e enjte", "fajr": "04:34", "dhuhr": "12:13", "asr": "15:25", "maghrib": "18:09", "isha": "19:31" },
  { "date": "2025-03-14", "weekday": "e premte", "fajr": "04:32", "dhuhr": "12:13", "asr": "15:26", "maghrib": "18:10", "isha": "19:33" },
  { "date": "2025-03-15", "weekday": "e shtunë", "fajr": "04:29", "dhuhr": "12:12", "asr": "15:27", "maghrib": "18:12", "isha": "19:35" },
  { "date": "2025-03-16", "weekday": "e diel", "fajr": "04:27", "dhuhr": "12:12", "asr": "15:28", "maghrib": "18:14", "isha": "19:36" },
  { "date": "2025-03-17", "weekday": "e hënë", "fajr": "04:25", "dhuhr": "12:12", "asr": "15:29", "maghrib": "18:15", "isha": "19:38" },
  { "date": "2025-03-18", "weekday": "e martë", "fajr": "04:23", "dhuhr": "12:11", "asr": "15:29", "maghrib": "18:14", "isha": "19:39" },
  { "date": "2025-03-19", "weekday": "e mërkurë", "fajr": "04:21", "dhuhr": "12:11", "asr": "15:30", "maghrib": "18:16", "isha": "19:41" },
  { "date": "2025-03-20", "weekday": "e enjte", "fajr": "04:19", "dhuhr": "12:11", "asr": "15:31", "maghrib": "18:17", "isha": "19:43" },
  { "date": "2025-03-21", "weekday": "e premte", "fajr": "04:16", "dhuhr": "12:11", "asr": "15:32", "maghrib": "18:19", "isha": "19:44" },
  { "date": "2025-03-22", "weekday": "e shtunë", "fajr": "04:14", "dhuhr": "12:10", "asr": "15:33", "maghrib": "18:20", "isha": "19:46" },
  { "date": "2025-03-23", "weekday": "e diel", "fajr": "04:12", "dhuhr": "12:10", "asr": "15:33", "maghrib": "18:21", "isha": "19:47" },
  { "date": "2025-03-24", "weekday": "e hënë", "fajr": "04:10", "dhuhr": "12:10", "asr": "15:34", "maghrib": "18:23", "isha": "19:49" },
  { "date": "2025-03-25", "weekday": "e martë", "fajr": "04:07", "dhuhr": "12:09", "asr": "15:35", "maghrib": "18:24", "isha": "19:50" },
  { "date": "2025-03-26", "weekday": "e mërkurë", "fajr": "04:05", "dhuhr": "12:09", "asr": "15:36", "maghrib": "18:26", "isha": "19:52" },
  { "date": "2025-03-27", "weekday": "e enjte", "fajr": "04:03", "dhuhr": "12:09", "asr": "15:36", "maghrib": "18:27", "isha": "19:54" },
  { "date": "2025-03-28", "weekday": "e premte", "fajr": "04:01", "dhuhr": "12:08", "asr": "15:37", "maghrib": "18:28", "isha": "19:55" },
  { "date": "2025-03-29", "weekday": "e shtunë", "fajr": "03:58", "dhuhr": "12:08", "asr": "15:38", "maghrib": "18:30", "isha": "19:57" }
];

// Base times for Linz
export const linzRamadanTimes = [
  { "date": "2025-03-01", "weekday": "e shtunë", "fajr": "05:00", "dhuhr": "12:20", "asr": "15:16", "maghrib": "17:53", "isha": "19:17" },
  { "date": "2025-03-02", "weekday": "e diel", "fajr": "04:58", "dhuhr": "12:20", "asr": "15:17", "maghrib": "17:54", "isha": "19:19" },
  { "date": "2025-03-03", "weekday": "e hënë", "fajr": "04:56", "dhuhr": "12:19", "asr": "15:18", "maghrib": "17:56", "isha": "19:20" },
  { "date": "2025-03-04", "weekday": "e martë", "fajr": "04:54", "dhuhr": "12:19", "asr": "15:19", "maghrib": "17:57", "isha": "19:22" },
  { "date": "2025-03-05", "weekday": "e mërkurë", "fajr": "04:52", "dhuhr": "12:19", "asr": "15:20", "maghrib": "17:59", "isha": "19:23" },
  { "date": "2025-03-06", "weekday": "e enjte", "fajr": "04:50", "dhuhr": "12:19", "asr": "15:21", "maghrib": "18:00", "isha": "19:25" },
  { "date": "2025-03-07", "weekday": "e premte", "fajr": "04:48", "dhuhr": "12:19", "asr": "15:22", "maghrib": "18:02", "isha": "19:26" },
  { "date": "2025-03-08", "weekday": "e shtunë", "fajr": "04:46", "dhuhr": "12:18", "asr": "15:23", "maghrib": "18:03", "isha": "19:28" },
  { "date": "2025-03-09", "weekday": "e diel", "fajr": "04:44", "dhuhr": "12:18", "asr": "15:24", "maghrib": "18:05", "isha": "19:30" },
  { "date": "2025-03-10", "weekday": "e hënë", "fajr": "04:42", "dhuhr": "12:18", "asr": "15:25", "maghrib": "18:06", "isha": "19:31" },
  { "date": "2025-03-11", "weekday": "e martë", "fajr": "04:40", "dhuhr": "12:18", "asr": "15:26", "maghrib": "18:08", "isha": "19:33" },
  { "date": "2025-03-12", "weekday": "e mërkurë", "fajr": "04:38", "dhuhr": "12:17", "asr": "15:27", "maghrib": "18:09", "isha": "19:34" },
  { "date": "2025-03-13", "weekday": "e enjte", "fajr": "04:36", "dhuhr": "12:17", "asr": "15:28", "maghrib": "18:11", "isha": "19:36" },
  { "date": "2025-03-14", "weekday": "e premte", "fajr": "04:33", "dhuhr": "12:17", "asr": "15:29", "maghrib": "18:12", "isha": "19:38" },
  { "date": "2025-03-15", "weekday": "e shtunë", "fajr": "04:31", "dhuhr": "12:15", "asr": "15:30", "maghrib": "18:14", "isha": "19:39" },
  { "date": "2025-03-16", "weekday": "e diel", "fajr": "04:29", "dhuhr": "12:15", "asr": "15:31", "maghrib": "18:15", "isha": "19:41" },
  { "date": "2025-03-17", "weekday": "e hënë", "fajr": "04:27", "dhuhr": "12:15", "asr": "15:32", "maghrib": "18:17", "isha": "19:42" },
  { "date": "2025-03-18", "weekday": "e martë", "fajr": "04:25", "dhuhr": "12:15", "asr": "15:32", "maghrib": "18:18", "isha": "19:44" },
  { "date": "2025-03-19", "weekday": "e mërkurë", "fajr": "04:22", "dhuhr": "12:15", "asr": "15:33", "maghrib": "18:20", "isha": "19:46" },
  { "date": "2025-03-20", "weekday": "e enjte", "fajr": "04:20", "dhuhr": "12:15", "asr": "15:34", "maghrib": "18:21", "isha": "19:47" },
  { "date": "2025-03-21", "weekday": "e premte", "fajr": "04:18", "dhuhr": "12:15", "asr": "15:35", "maghrib": "18:23", "isha": "19:49" },
  { "date": "2025-03-22", "weekday": "e shtunë", "fajr": "04:15", "dhuhr": "12:14", "asr": "15:36", "maghrib": "18:24", "isha": "19:51" },
  { "date": "2025-03-23", "weekday": "e diel", "fajr": "04:13", "dhuhr": "12:14", "asr": "15:37", "maghrib": "18:26", "isha": "19:52" },
  { "date": "2025-03-24", "weekday": "e hënë", "fajr": "04:11", "dhuhr": "12:14", "asr": "15:38", "maghrib": "18:27", "isha": "19:54" },
  { "date": "2025-03-25", "weekday": "e martë", "fajr": "04:08", "dhuhr": "12:14", "asr": "15:38", "maghrib": "18:29", "isha": "19:56" },
  { "date": "2025-03-26", "weekday": "e mërkurë", "fajr": "04:06", "dhuhr": "12:13", "asr": "15:39", "maghrib": "18:30", "isha": "19:57" },
  { "date": "2025-03-27", "weekday": "e enjte", "fajr": "04:04", "dhuhr": "12:13", "asr": "15:40", "maghrib": "18:32", "isha": "19:59" },
  { "date": "2025-03-28", "weekday": "e premte", "fajr": "04:01", "dhuhr": "12:13", "asr": "15:41", "maghrib": "18:33", "isha": "20:01" },
  { "date": "2025-03-29", "weekday": "e shtunë", "fajr": "03:59", "dhuhr": "12:12", "asr": "15:42", "maghrib": "18:35", "isha": "20:03" }
]; 

// Base times for Salzburg
export const salzburgRamadanTimes = [
  { "date": "2025-03-01", "weekday": "e shtunë", "fajr": "05:06", "dhuhr": "12:25", "asr": "15:22", "maghrib": "17:58", "isha": "19:22" },
  { "date": "2025-03-02", "weekday": "e diel", "fajr": "05:04", "dhuhr": "12:25", "asr": "15:23", "maghrib": "18:00", "isha": "19:24" },
  { "date": "2025-03-03", "weekday": "e hënë", "fajr": "05:02", "dhuhr": "12:25", "asr": "15:24", "maghrib": "18:02", "isha": "19:25" },
  { "date": "2025-03-04", "weekday": "e martë", "fajr": "05:00", "dhuhr": "12:25", "asr": "15:25", "maghrib": "18:03", "isha": "19:27" },
  { "date": "2025-03-05", "weekday": "e mërkurë", "fajr": "04:58", "dhuhr": "12:24", "asr": "15:26", "maghrib": "18:05", "isha": "19:28" },
  { "date": "2025-03-06", "weekday": "e enjte", "fajr": "04:56", "dhuhr": "12:24", "asr": "15:27", "maghrib": "18:06", "isha": "19:30" },
  { "date": "2025-03-07", "weekday": "e premte", "fajr": "04:54", "dhuhr": "12:24", "asr": "15:28", "maghrib": "18:08", "isha": "19:31" },
  { "date": "2025-03-08", "weekday": "e shtunë", "fajr": "04:52", "dhuhr": "12:24", "asr": "15:29", "maghrib": "18:09", "isha": "19:33" },
  { "date": "2025-03-09", "weekday": "e diel", "fajr": "04:50", "dhuhr": "12:23", "asr": "15:30", "maghrib": "18:11", "isha": "19:34" },
  { "date": "2025-03-10", "weekday": "e hënë", "fajr": "04:48", "dhuhr": "12:23", "asr": "15:31", "maghrib": "18:12", "isha": "19:36" },
  { "date": "2025-03-11", "weekday": "e martë", "fajr": "04:46", "dhuhr": "12:23", "asr": "15:32", "maghrib": "18:14", "isha": "19:37" },
  { "date": "2025-03-12", "weekday": "e mërkurë", "fajr": "04:44", "dhuhr": "12:23", "asr": "15:33", "maghrib": "18:15", "isha": "19:39" },
  { "date": "2025-03-13", "weekday": "e enjte", "fajr": "04:42", "dhuhr": "12:22", "asr": "15:34", "maghrib": "18:16", "isha": "19:41" },
  { "date": "2025-03-14", "weekday": "e premte", "fajr": "04:40", "dhuhr": "12:22", "asr": "15:35", "maghrib": "18:18", "isha": "19:42" },
  { "date": "2025-03-15", "weekday": "e shtunë", "fajr": "04:38", "dhuhr": "12:22", "asr": "15:36", "maghrib": "18:19", "isha": "19:44" },
  { "date": "2025-03-16", "weekday": "e diel", "fajr": "04:35", "dhuhr": "12:22", "asr": "15:36", "maghrib": "18:21", "isha": "19:45" },
  { "date": "2025-03-17", "weekday": "e hënë", "fajr": "04:33", "dhuhr": "12:21", "asr": "15:37", "maghrib": "18:22", "isha": "19:47" },
  { "date": "2025-03-18", "weekday": "e martë", "fajr": "04:31", "dhuhr": "12:21", "asr": "15:38", "maghrib": "18:24", "isha": "19:48" },
  { "date": "2025-03-19", "weekday": "e mërkurë", "fajr": "04:29", "dhuhr": "12:21", "asr": "15:39", "maghrib": "18:25", "isha": "19:50" },
  { "date": "2025-03-20", "weekday": "e enjte", "fajr": "04:26", "dhuhr": "12:20", "asr": "15:40", "maghrib": "18:27", "isha": "19:52" },
  { "date": "2025-03-21", "weekday": "e premte", "fajr": "04:24", "dhuhr": "12:20", "asr": "15:41", "maghrib": "18:28", "isha": "19:53" },
  { "date": "2025-03-22", "weekday": "e shtunë", "fajr": "04:22", "dhuhr": "12:20", "asr": "15:42", "maghrib": "18:30", "isha": "19:55" },
  { "date": "2025-03-23", "weekday": "e diel", "fajr": "04:20", "dhuhr": "12:19", "asr": "15:42", "maghrib": "18:31", "isha": "19:56" },
  { "date": "2025-03-24", "weekday": "e hënë", "fajr": "04:17", "dhuhr": "12:19", "asr": "15:43", "maghrib": "18:32", "isha": "19:58" },
  { "date": "2025-03-25", "weekday": "e martë", "fajr": "04:15", "dhuhr": "12:19", "asr": "15:44", "maghrib": "18:34", "isha": "20:00" },
  { "date": "2025-03-26", "weekday": "e mërkurë", "fajr": "04:13", "dhuhr": "12:19", "asr": "15:45", "maghrib": "18:35", "isha": "20:01" },
  { "date": "2025-03-27", "weekday": "e enjte", "fajr": "04:10", "dhuhr": "12:18", "asr": "15:46", "maghrib": "18:37", "isha": "20:03" },
  { "date": "2025-03-28", "weekday": "e premte", "fajr": "04:08", "dhuhr": "12:18", "asr": "15:46", "maghrib": "18:38", "isha": "20:05" },
  { "date": "2025-03-29", "weekday": "e shtunë", "fajr": "04:06", "dhuhr": "12:18", "asr": "15:47", "maghrib": "18:40", "isha": "20:07" }
]; 

// Base times for Innsbruck
export const innsbruckRamadanTimes = [
  { "date": "2025-03-01", "weekday": "e shtunë", "fajr": "05:13", "dhuhr": "12:32", "asr": "15:29", "maghrib": "18:06", "isha": "19:28" },
  { "date": "2025-03-02", "weekday": "e diel", "fajr": "05:11", "dhuhr": "12:32", "asr": "15:30", "maghrib": "18:07", "isha": "19:30" },
  { "date": "2025-03-03", "weekday": "e hënë", "fajr": "05:09", "dhuhr": "12:31", "asr": "15:31", "maghrib": "18:09", "isha": "19:31" },
  { "date": "2025-03-04", "weekday": "e martë", "fajr": "05:07", "dhuhr": "12:31", "asr": "15:32", "maghrib": "18:10", "isha": "19:33" },
  { "date": "2025-03-05", "weekday": "e mërkurë", "fajr": "05:06", "dhuhr": "12:31", "asr": "15:33", "maghrib": "18:12", "isha": "19:34" },
  { "date": "2025-03-06", "weekday": "e enjte", "fajr": "05:04", "dhuhr": "12:31", "asr": "15:34", "maghrib": "18:13", "isha": "19:36" },
  { "date": "2025-03-07", "weekday": "e premte", "fajr": "05:02", "dhuhr": "12:30", "asr": "15:35", "maghrib": "18:15", "isha": "19:37" },
  { "date": "2025-03-08", "weekday": "e shtunë", "fajr": "05:00", "dhuhr": "12:30", "asr": "15:36", "maghrib": "18:16", "isha": "19:39" },
  { "date": "2025-03-09", "weekday": "e diel", "fajr": "04:58", "dhuhr": "12:30", "asr": "15:37", "maghrib": "18:17", "isha": "19:40" },
  { "date": "2025-03-10", "weekday": "e hënë", "fajr": "04:56", "dhuhr": "12:30", "asr": "15:38", "maghrib": "18:19", "isha": "19:42" },
  { "date": "2025-03-11", "weekday": "e martë", "fajr": "04:54", "dhuhr": "12:29", "asr": "15:39", "maghrib": "18:20", "isha": "19:43" },
  { "date": "2025-03-12", "weekday": "e mërkurë", "fajr": "04:51", "dhuhr": "12:29", "asr": "15:40", "maghrib": "18:22", "isha": "19:45" },
  { "date": "2025-03-13", "weekday": "e enjte", "fajr": "04:49", "dhuhr": "12:29", "asr": "15:41", "maghrib": "18:23", "isha": "19:46" },
  { "date": "2025-03-14", "weekday": "e premte", "fajr": "04:47", "dhuhr": "12:29", "asr": "15:42", "maghrib": "18:25", "isha": "19:48" },
  { "date": "2025-03-15", "weekday": "e shtunë", "fajr": "04:45", "dhuhr": "12:28", "asr": "15:43", "maghrib": "18:26", "isha": "19:49" },
  { "date": "2025-03-16", "weekday": "e diel", "fajr": "04:43", "dhuhr": "12:28", "asr": "15:44", "maghrib": "18:28", "isha": "19:51" },
  { "date": "2025-03-17", "weekday": "e hënë", "fajr": "04:41", "dhuhr": "12:28", "asr": "15:44", "maghrib": "18:29", "isha": "19:52" },
  { "date": "2025-03-18", "weekday": "e martë", "fajr": "04:39", "dhuhr": "12:27", "asr": "15:45", "maghrib": "18:30", "isha": "19:54" },
  { "date": "2025-03-19", "weekday": "e mërkurë", "fajr": "04:36", "dhuhr": "12:27", "asr": "15:46", "maghrib": "18:32", "isha": "19:56" },
  { "date": "2025-03-20", "weekday": "e enjte", "fajr": "04:34", "dhuhr": "12:27", "asr": "15:47", "maghrib": "18:33", "isha": "19:57" },
  { "date": "2025-03-21", "weekday": "e premte", "fajr": "04:32", "dhuhr": "12:27", "asr": "15:48", "maghrib": "18:35", "isha": "19:59" },
  { "date": "2025-03-22", "weekday": "e shtunë", "fajr": "04:30", "dhuhr": "12:26", "asr": "15:49", "maghrib": "18:36", "isha": "20:00" },
  { "date": "2025-03-23", "weekday": "e diel", "fajr": "04:28", "dhuhr": "12:26", "asr": "15:49", "maghrib": "18:37", "isha": "20:02" },
  { "date": "2025-03-24", "weekday": "e hënë", "fajr": "04:25", "dhuhr": "12:26", "asr": "15:50", "maghrib": "18:39", "isha": "20:03" },
  { "date": "2025-03-25", "weekday": "e martë", "fajr": "04:23", "dhuhr": "12:25", "asr": "15:51", "maghrib": "18:40", "isha": "20:05" },
  { "date": "2025-03-26", "weekday": "e mërkurë", "fajr": "04:21", "dhuhr": "12:25", "asr": "15:52", "maghrib": "18:42", "isha": "20:07" },
  { "date": "2025-03-27", "weekday": "e enjte", "fajr": "04:18", "dhuhr": "12:25", "asr": "15:52", "maghrib": "18:43", "isha": "20:08" },
  { "date": "2025-03-28", "weekday": "e premte", "fajr": "04:16", "dhuhr": "12:25", "asr": "15:53", "maghrib": "18:44", "isha": "20:10" },
  { "date": "2025-03-29", "weekday": "e shtunë", "fajr": "04:14", "dhuhr": "12:24", "asr": "15:54", "maghrib": "18:46", "isha": "20:12" }
]; 

// Base times for Villach
export const villachRamadanTimes = [
  { "date": "2025-03-01", "weekday": "e Shtunë", "fajr": "05:04", "dhuhr": "12:22", "asr": "15:21", "maghrib": "17:57", "isha": "19:18" },
  { "date": "2025-03-02", "weekday": "e Diel", "fajr": "05:02", "dhuhr": "12:22", "asr": "15:22", "maghrib": "17:58", "isha": "19:20" },
  { "date": "2025-03-03", "weekday": "e Hënë", "fajr": "05:00", "dhuhr": "12:22", "asr": "15:23", "maghrib": "17:59", "isha": "19:21" },
  { "date": "2025-03-04", "weekday": "e Martë", "fajr": "04:58", "dhuhr": "12:21", "asr": "15:24", "maghrib": "18:01", "isha": "19:23" },
  { "date": "2025-03-05", "weekday": "e Mërkurë", "fajr": "04:57", "dhuhr": "12:21", "asr": "15:25", "maghrib": "18:02", "isha": "19:24" },
  { "date": "2025-03-06", "weekday": "e Enjte", "fajr": "04:55", "dhuhr": "12:21", "asr": "15:26", "maghrib": "18:04", "isha": "19:25" },
  { "date": "2025-03-07", "weekday": "e Premte", "fajr": "04:53", "dhuhr": "12:21", "asr": "15:26", "maghrib": "18:05", "isha": "19:27" },
  { "date": "2025-03-08", "weekday": "e Shtunë", "fajr": "04:51", "dhuhr": "12:20", "asr": "15:27", "maghrib": "18:07", "isha": "19:28" },
  { "date": "2025-03-09", "weekday": "e Diel", "fajr": "04:49", "dhuhr": "12:20", "asr": "15:28", "maghrib": "18:08", "isha": "19:30" },
  { "date": "2025-03-10", "weekday": "e Hënë", "fajr": "04:47", "dhuhr": "12:20", "asr": "15:29", "maghrib": "18:09", "isha": "19:31" },
  { "date": "2025-03-11", "weekday": "e Martë", "fajr": "04:45", "dhuhr": "12:20", "asr": "15:30", "maghrib": "18:11", "isha": "19:33" },
  { "date": "2025-03-12", "weekday": "e Mërkurë", "fajr": "04:43", "dhuhr": "12:19", "asr": "15:31", "maghrib": "18:12", "isha": "19:34" },
  { "date": "2025-03-13", "weekday": "e Enjte", "fajr": "04:41", "dhuhr": "12:19", "asr": "15:32", "maghrib": "18:14", "isha": "19:36" },
  { "date": "2025-03-14", "weekday": "e Premte", "fajr": "04:39", "dhuhr": "12:19", "asr": "15:33", "maghrib": "18:15", "isha": "19:37" },
  { "date": "2025-03-15", "weekday": "e Shtunë", "fajr": "04:37", "dhuhr": "12:19", "asr": "15:34", "maghrib": "18:16", "isha": "19:39" },
  { "date": "2025-03-16", "weekday": "e Diel", "fajr": "04:34", "dhuhr": "12:18", "asr": "15:34", "maghrib": "18:18", "isha": "19:40" },
  { "date": "2025-03-17", "weekday": "e Hënë", "fajr": "04:32", "dhuhr": "12:18", "asr": "15:35", "maghrib": "18:19", "isha": "19:42" },
  { "date": "2025-03-18", "weekday": "e Martë", "fajr": "04:30", "dhuhr": "12:18", "asr": "15:36", "maghrib": "18:21", "isha": "19:43" },
  { "date": "2025-03-19", "weekday": "e Mërkurë", "fajr": "04:28", "dhuhr": "12:17", "asr": "15:37", "maghrib": "18:22", "isha": "19:45" },
  { "date": "2025-03-20", "weekday": "e Enjte", "fajr": "04:26", "dhuhr": "12:17", "asr": "15:38", "maghrib": "18:23", "isha": "19:46" },
  { "date": "2025-03-21", "weekday": "e Premte", "fajr": "04:24", "dhuhr": "12:17", "asr": "15:39", "maghrib": "18:25", "isha": "19:48" },
  { "date": "2025-03-22", "weekday": "e Shtunë", "fajr": "04:22", "dhuhr": "12:17", "asr": "15:39", "maghrib": "18:26", "isha": "19:49" },
  { "date": "2025-03-23", "weekday": "e Diel", "fajr": "04:19", "dhuhr": "12:16", "asr": "15:40", "maghrib": "18:28", "isha": "19:51" },
  { "date": "2025-03-24", "weekday": "e Hënë", "fajr": "04:17", "dhuhr": "12:16", "asr": "15:41", "maghrib": "18:29", "isha": "19:52" },
  { "date": "2025-03-25", "weekday": "e Martë", "fajr": "04:15", "dhuhr": "12:16", "asr": "15:42", "maghrib": "18:30", "isha": "19:54" },
  { "date": "2025-03-26", "weekday": "e Mërkurë", "fajr": "04:13", "dhuhr": "12:15", "asr": "15:42", "maghrib": "18:32", "isha": "19:55" },
  { "date": "2025-03-27", "weekday": "e Enjte", "fajr": "04:10", "dhuhr": "12:15", "asr": "15:43", "maghrib": "18:33", "isha": "19:57" },
  { "date": "2025-03-28", "weekday": "e Premte", "fajr": "04:08", "dhuhr": "12:15", "asr": "15:44", "maghrib": "18:34", "isha": "19:59" },
  { "date": "2025-03-29", "weekday": "e Shtunë", "fajr": "04:06", "dhuhr": "12:14", "asr": "15:44", "maghrib": "18:36", "isha": "20:00" }
]; 

// Base times for Bregenz
export const bregenzRamadanTimes = [
  { "date": "2025-03-01", "weekday": "e shtunë", "fajr": "05:20", "dhuhr": "12:38", "asr": "15:36", "maghrib": "18:12", "isha": "19:35" },
  { "date": "2025-03-02", "weekday": "e diel", "fajr": "05:18", "dhuhr": "12:38", "asr": "15:37", "maghrib": "18:14", "isha": "19:37" },
  { "date": "2025-03-03", "weekday": "e hënë", "fajr": "05:16", "dhuhr": "12:38", "asr": "15:38", "maghrib": "18:15", "isha": "19:38" },
  { "date": "2025-03-04", "weekday": "e martë", "fajr": "05:14", "dhuhr": "12:38", "asr": "15:39", "maghrib": "18:17", "isha": "19:40" },
  { "date": "2025-03-05", "weekday": "e mërkurë", "fajr": "05:12", "dhuhr": "12:38", "asr": "15:40", "maghrib": "18:18", "isha": "19:41" },
  { "date": "2025-03-06", "weekday": "e enjte", "fajr": "05:10", "dhuhr": "12:37", "asr": "15:41", "maghrib": "18:20", "isha": "19:43" },
  { "date": "2025-03-07", "weekday": "e premte", "fajr": "05:08", "dhuhr": "12:37", "asr": "15:42", "maghrib": "18:21", "isha": "19:44" },
  { "date": "2025-03-08", "weekday": "e shtunë", "fajr": "05:06", "dhuhr": "12:37", "asr": "15:43", "maghrib": "18:23", "isha": "19:46" },
  { "date": "2025-03-09", "weekday": "e diel", "fajr": "05:04", "dhuhr": "12:37", "asr": "15:44", "maghrib": "18:24", "isha": "19:47" },
  { "date": "2025-03-10", "weekday": "e hënë", "fajr": "05:02", "dhuhr": "12:36", "asr": "15:45", "maghrib": "18:25", "isha": "19:49" },
  { "date": "2025-03-11", "weekday": "e martë", "fajr": "05:00", "dhuhr": "12:36", "asr": "15:46", "maghrib": "18:27", "isha": "19:50" },
  { "date": "2025-03-12", "weekday": "e mërkurë", "fajr": "04:58", "dhuhr": "12:36", "asr": "15:46", "maghrib": "18:28", "isha": "19:52" },
  { "date": "2025-03-13", "weekday": "e enjte", "fajr": "04:56", "dhuhr": "12:36", "asr": "15:47", "maghrib": "18:30", "isha": "19:53" },
  { "date": "2025-03-14", "weekday": "e premte", "fajr": "04:54", "dhuhr": "12:35", "asr": "15:48", "maghrib": "18:31", "isha": "19:55" },
  { "date": "2025-03-15", "weekday": "e shtunë", "fajr": "04:51", "dhuhr": "12:35", "asr": "15:49", "maghrib": "18:33", "isha": "19:56" },
  { "date": "2025-03-16", "weekday": "e diel", "fajr": "04:49", "dhuhr": "12:35", "asr": "15:50", "maghrib": "18:34", "isha": "19:58" },
  { "date": "2025-03-17", "weekday": "e hënë", "fajr": "04:47", "dhuhr": "12:35", "asr": "15:51", "maghrib": "18:36", "isha": "20:00" },
  { "date": "2025-03-18", "weekday": "e martë", "fajr": "04:45", "dhuhr": "12:34", "asr": "15:52", "maghrib": "18:37", "isha": "20:01" },
  { "date": "2025-03-19", "weekday": "e mërkurë", "fajr": "04:43", "dhuhr": "12:34", "asr": "15:53", "maghrib": "18:39", "isha": "20:03" },
  { "date": "2025-03-20", "weekday": "e enjte", "fajr": "04:40", "dhuhr": "12:34", "asr": "15:53", "maghrib": "18:40", "isha": "20:04" },
  { "date": "2025-03-21", "weekday": "e premte", "fajr": "04:38", "dhuhr": "12:33", "asr": "15:54", "maghrib": "18:41", "isha": "20:06" },
  { "date": "2025-03-22", "weekday": "e shtunë", "fajr": "04:36", "dhuhr": "12:33", "asr": "15:55", "maghrib": "18:43", "isha": "20:07" },
  { "date": "2025-03-23", "weekday": "e diel", "fajr": "04:34", "dhuhr": "12:33", "asr": "15:56", "maghrib": "18:44", "isha": "20:09" },
  { "date": "2025-03-24", "weekday": "e hënë", "fajr": "04:31", "dhuhr": "12:32", "asr": "15:57", "maghrib": "18:46", "isha": "20:11" },
  { "date": "2025-03-25", "weekday": "e martë", "fajr": "04:29", "dhuhr": "12:32", "asr": "15:58", "maghrib": "18:47", "isha": "20:12" },
  { "date": "2025-03-26", "weekday": "e mërkurë", "fajr": "04:27", "dhuhr": "12:32", "asr": "15:58", "maghrib": "18:48", "isha": "20:14" },
  { "date": "2025-03-27", "weekday": "e enjte", "fajr": "04:24", "dhuhr": "12:32", "asr": "15:59", "maghrib": "18:50", "isha": "20:16" },
  { "date": "2025-03-28", "weekday": "e premte", "fajr": "04:22", "dhuhr": "12:31", "asr": "16:00", "maghrib": "18:51", "isha": "20:17" },
  { "date": "2025-03-29", "weekday": "e shtunë", "fajr": "04:20", "dhuhr": "12:31", "asr": "16:01", "maghrib": "18:53", "isha": "20:19" }
];



export const germanRamadanTimes = [
  { "date": "2025-03-01", "weekday": "e shtunë", "fajr": "05:00", "dhuhr": "12:24", "asr": "15:11", "maghrib": "17:52", "isha": "19:25" },
  { "date": "2025-03-02", "weekday": "e diel", "fajr": "04:57", "dhuhr": "12:24", "asr": "15:13", "maghrib": "17:53", "isha": "19:27" },
  { "date": "2025-03-03", "weekday": "e hënë", "fajr": "04:55", "dhuhr": "12:23", "asr": "15:14", "maghrib": "17:55", "isha": "19:28" },
  { "date": "2025-03-04", "weekday": "e martë", "fajr": "04:53", "dhuhr": "12:23", "asr": "15:15", "maghrib": "17:57", "isha": "19:30" },
  { "date": "2025-03-05", "weekday": "e mërkurë", "fajr": "04:50", "dhuhr": "12:23", "asr": "15:16", "maghrib": "17:59", "isha": "19:32" },
  { "date": "2025-03-06", "weekday": "e enjte", "fajr": "04:48", "dhuhr": "12:23", "asr": "15:18", "maghrib": "18:01", "isha": "19:34" },
  { "date": "2025-03-07", "weekday": "e premte", "fajr": "04:46", "dhuhr": "12:23", "asr": "15:19", "maghrib": "18:03", "isha": "19:36" },
  { "date": "2025-03-08", "weekday": "e shtunë", "fajr": "04:43", "dhuhr": "12:22", "asr": "15:20", "maghrib": "18:04", "isha": "19:38" },
  { "date": "2025-03-09", "weekday": "e diel", "fajr": "04:41", "dhuhr": "12:22", "asr": "15:21", "maghrib": "18:06", "isha": "19:40" },
  { "date": "2025-03-10", "weekday": "e hënë", "fajr": "04:39", "dhuhr": "12:22", "asr": "15:23", "maghrib": "18:08", "isha": "19:41" },
  { "date": "2025-03-11", "weekday": "e martë", "fajr": "04:36", "dhuhr": "12:22", "asr": "15:24", "maghrib": "18:10", "isha": "19:43" },
  { "date": "2025-03-12", "weekday": "e mërkurë", "fajr": "04:34", "dhuhr": "12:21", "asr": "15:25", "maghrib": "18:12", "isha": "19:45" },
  { "date": "2025-03-13", "weekday": "e enjte", "fajr": "04:31", "dhuhr": "12:21", "asr": "15:26", "maghrib": "18:13", "isha": "19:47" },
  { "date": "2025-03-14", "weekday": "e premte", "fajr": "04:29", "dhuhr": "12:21", "asr": "15:27", "maghrib": "18:15", "isha": "19:49" },
  { "date": "2025-03-15", "weekday": "e shtunë", "fajr": "04:26", "dhuhr": "12:20", "asr": "15:28", "maghrib": "18:17", "isha": "19:51" },
  { "date": "2025-03-16", "weekday": "e diel", "fajr": "04:23", "dhuhr": "12:20", "asr": "15:30", "maghrib": "18:19", "isha": "19:53" },
  { "date": "2025-03-17", "weekday": "e hënë", "fajr": "04:21", "dhuhr": "12:20", "asr": "15:31", "maghrib": "18:20", "isha": "19:55" },
  { "date": "2025-03-18", "weekday": "e martë", "fajr": "04:18", "dhuhr": "12:20", "asr": "15:32", "maghrib": "18:22", "isha": "19:57" },
  { "date": "2025-03-19", "weekday": "e mërkurë", "fajr": "04:15", "dhuhr": "12:19", "asr": "15:33", "maghrib": "18:24", "isha": "19:59" },
  { "date": "2025-03-20", "weekday": "e enjte", "fajr": "04:13", "dhuhr": "12:19", "asr": "15:34", "maghrib": "18:26", "isha": "20:01" },
  { "date": "2025-03-21", "weekday": "e premte", "fajr": "04:10", "dhuhr": "12:19", "asr": "15:35", "maghrib": "18:28", "isha": "20:03" },
  { "date": "2025-03-22", "weekday": "e shtunë", "fajr": "04:07", "dhuhr": "12:18", "asr": "15:36", "maghrib": "18:29", "isha": "20:05" },
  { "date": "2025-03-23", "weekday": "e diel", "fajr": "04:05", "dhuhr": "12:18", "asr": "15:37", "maghrib": "18:31", "isha": "20:07" },
  { "date": "2025-03-24", "weekday": "e hënë", "fajr": "04:02", "dhuhr": "12:18", "asr": "15:38", "maghrib": "18:33", "isha": "20:09" },
  { "date": "2025-03-25", "weekday": "e martë", "fajr": "03:59", "dhuhr": "12:18", "asr": "15:39", "maghrib": "18:35", "isha": "20:11" },
  { "date": "2025-03-26", "weekday": "e mërkurë", "fajr": "03:56", "dhuhr": "12:17", "asr": "15:40", "maghrib": "18:36", "isha": "20:13" },
  { "date": "2025-03-27", "weekday": "e enjte", "fajr": "03:54", "dhuhr": "12:17", "asr": "15:41", "maghrib": "18:38", "isha": "20:15" },
  { "date": "2025-03-28", "weekday": "e premte", "fajr": "03:51", "dhuhr": "12:17", "asr": "15:42", "maghrib": "18:40", "isha": "20:17" },
  { "date": "2025-03-29", "weekday": "e shtunë", "fajr": "03:48", "dhuhr": "12:16", "asr": "15:43", "maghrib": "18:42", "isha": "20:19" }
];


// Define Berlin's prayer times
export const berlinRamadanTimes = [
  { "date": "2025-03-01", "weekday": "e shtunë", "fajr": "05:00", "dhuhr": "12:24", "asr": "15:11", "maghrib": "17:52", "isha": "19:25" },
  { "date": "2025-03-02", "weekday": "e diel", "fajr": "04:57", "dhuhr": "12:24", "asr": "15:13", "maghrib": "17:53", "isha": "19:27" },
  { "date": "2025-03-03", "weekday": "e hënë", "fajr": "04:55", "dhuhr": "12:23", "asr": "15:14", "maghrib": "17:55", "isha": "19:28" },
  { "date": "2025-03-04", "weekday": "e martë", "fajr": "04:53", "dhuhr": "12:23", "asr": "15:15", "maghrib": "17:57", "isha": "19:30" },
  { "date": "2025-03-05", "weekday": "e mërkurë", "fajr": "04:50", "dhuhr": "12:23", "asr": "15:16", "maghrib": "17:59", "isha": "19:32" },
  { "date": "2025-03-06", "weekday": "e enjte", "fajr": "04:48", "dhuhr": "12:23", "asr": "15:18", "maghrib": "18:01", "isha": "19:34" },
  { "date": "2025-03-07", "weekday": "e premte", "fajr": "04:46", "dhuhr": "12:23", "asr": "15:19", "maghrib": "18:03", "isha": "19:36" },
  { "date": "2025-03-08", "weekday": "e shtunë", "fajr": "04:43", "dhuhr": "12:22", "asr": "15:20", "maghrib": "18:04", "isha": "19:38" },
  { "date": "2025-03-09", "weekday": "e diel", "fajr": "04:41", "dhuhr": "12:22", "asr": "15:21", "maghrib": "18:06", "isha": "19:40" },
  { "date": "2025-03-10", "weekday": "e hënë", "fajr": "04:39", "dhuhr": "12:22", "asr": "15:23", "maghrib": "18:08", "isha": "19:41" },
  { "date": "2025-03-11", "weekday": "e martë", "fajr": "04:36", "dhuhr": "12:22", "asr": "15:24", "maghrib": "18:10", "isha": "19:43" },
  { "date": "2025-03-12", "weekday": "e mërkurë", "fajr": "04:34", "dhuhr": "12:21", "asr": "15:25", "maghrib": "18:12", "isha": "19:45" },
  { "date": "2025-03-13", "weekday": "e enjte", "fajr": "04:31", "dhuhr": "12:21", "asr": "15:26", "maghrib": "18:13", "isha": "19:47" },
  { "date": "2025-03-14", "weekday": "e premte", "fajr": "04:29", "dhuhr": "12:21", "asr": "15:27", "maghrib": "18:15", "isha": "19:49" },
  { "date": "2025-03-15", "weekday": "e shtunë", "fajr": "04:26", "dhuhr": "12:20", "asr": "15:28", "maghrib": "18:17", "isha": "19:51" },
  { "date": "2025-03-16", "weekday": "e diel", "fajr": "04:23", "dhuhr": "12:20", "asr": "15:30", "maghrib": "18:19", "isha": "19:53" },
  { "date": "2025-03-17", "weekday": "e hënë", "fajr": "04:21", "dhuhr": "12:20", "asr": "15:31", "maghrib": "18:20", "isha": "19:55" },
  { "date": "2025-03-18", "weekday": "e martë", "fajr": "04:18", "dhuhr": "12:20", "asr": "15:32", "maghrib": "18:22", "isha": "19:57" },
  { "date": "2025-03-19", "weekday": "e mërkurë", "fajr": "04:15", "dhuhr": "12:19", "asr": "15:33", "maghrib": "18:24", "isha": "19:59" },
  { "date": "2025-03-20", "weekday": "e enjte", "fajr": "04:13", "dhuhr": "12:19", "asr": "15:34", "maghrib": "18:26", "isha": "20:01" },
  { "date": "2025-03-21", "weekday": "e premte", "fajr": "04:10", "dhuhr": "12:19", "asr": "15:35", "maghrib": "18:28", "isha": "20:03" },
  { "date": "2025-03-22", "weekday": "e shtunë", "fajr": "04:07", "dhuhr": "12:18", "asr": "15:36", "maghrib": "18:29", "isha": "20:05" },
  { "date": "2025-03-23", "weekday": "e diel", "fajr": "04:05", "dhuhr": "12:18", "asr": "15:37", "maghrib": "18:31", "isha": "20:07" },
  { "date": "2025-03-24", "weekday": "e hënë", "fajr": "04:02", "dhuhr": "12:18", "asr": "15:38", "maghrib": "18:33", "isha": "20:09" },
  { "date": "2025-03-25", "weekday": "e martë", "fajr": "03:59", "dhuhr": "12:18", "asr": "15:39", "maghrib": "18:35", "isha": "20:11" },
  { "date": "2025-03-26", "weekday": "e mërkurë", "fajr": "03:56", "dhuhr": "12:17", "asr": "15:40", "maghrib": "18:36", "isha": "20:13" },
  { "date": "2025-03-27", "weekday": "e enjte", "fajr": "03:54", "dhuhr": "12:17", "asr": "15:41", "maghrib": "18:38", "isha": "20:15" },
  { "date": "2025-03-28", "weekday": "e premte", "fajr": "03:51", "dhuhr": "12:17", "asr": "15:42", "maghrib": "18:40", "isha": "20:17" },
  { "date": "2025-03-29", "weekday": "e shtunë", "fajr": "03:48", "dhuhr": "12:16", "asr": "15:43", "maghrib": "18:42", "isha": "20:19" }
];

// Add a function to normalize weekday names to match translation keys
export const normalizeWeekday = (weekday: string): 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday' => {
  // Convert to lowercase for consistent matching
  const normalizedInput = weekday.toLowerCase().trim();
  
  const weekdayMap: { [key: string]: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday' } = {
    // Albanian formats
    'e hënë': 'monday',
    'hënë': 'monday',
    'e martë': 'tuesday',
    'martë': 'tuesday',
    'e mërkurë': 'wednesday',
    'mërkurë': 'wednesday',
    'e enjte': 'thursday',
    'enjte': 'thursday',
    'e premte': 'friday',
    'premte': 'friday',
    'e shtunë': 'saturday',
    'shtunë': 'saturday',
    'e diel': 'sunday',
    'diel': 'sunday',

    // English formats
    'monday': 'monday',
    'tuesday': 'tuesday',
    'wednesday': 'wednesday',
    'thursday': 'thursday',
    'friday': 'friday',
    'saturday': 'saturday',
    'sunday': 'sunday',

    // German formats
    'montag': 'monday',
    'dienstag': 'tuesday',
    'mittwoch': 'wednesday',
    'donnerstag': 'thursday',
    'freitag': 'friday',
    'samstag': 'saturday',
    'sonntag': 'sunday',

    // Turkish formats
    'pazartesi': 'monday',
    'salı': 'tuesday',
    'çarşamba': 'wednesday',
    'perşembe': 'thursday',
    'cuma': 'friday',
    'cumartesi': 'saturday',
    'pazar': 'sunday'
  };

  return weekdayMap[normalizedInput] || 'monday';
};

// Add German cities to city adjustments
export const germanCityAdjustments: Record<string, CityAdjustment> = {
  berlin: {
    name: "Berlin",
    nameAlb: "Berlin",
    nameEn: "Berlin",
    nameTr: "Berlin",
    adjustment: { 
      fajr: +23, 
      dhuhr: +20, 
      asr: +15, 
      maghrib: +18, 
      isha: +14 
    }
  },
  hamburg: {
    name: "Hamburg",
    nameAlb: "Hamburg",
    nameEn: "Hamburg",
    nameTr: "Hamburg",
    adjustment: { 
      fajr: +25, 
      dhuhr: +22, 
      asr: +17, 
      maghrib: +20, 
      isha: +16 
    }
  },
  frankfurt: {
    name: "Frankfurt",
    nameAlb: "Frankfurt",
    nameEn: "Frankfurt",
    nameTr: "Frankfurt",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  koeln: {
    name: "Köln",
    nameAlb: "Këln",
    nameEn: "Cologne",
    nameTr: "Köln",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  bonn: {
    name: "Bonn",
    nameAlb: "Bon",
    nameEn: "Bonn",
    nameTr: "Bonn",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  duesseldorf: {
    name: "Düsseldorf",
    nameAlb: "Dyseldorf",
    nameEn: "Dusseldorf",
    nameTr: "Düsseldorf",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  essen: {
    name: "Essen",
    nameAlb: "Esen",
    nameEn: "Essen",
    nameTr: "Essen",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  dortmund: {
    name: "Dortmund",
    nameAlb: "Dortmund",
    nameEn: "Dortmund",
    nameTr: "Dortmund",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  muenchen: {
    name: "München",
    nameAlb: "Mynih",
    nameEn: "Munich",
    nameTr: "Münih",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  hannover: {
    name: "Hannover",
    nameAlb: "Hanover",
    nameEn: "Hanover",
    nameTr: "Hannover",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  stuttgart: {
    name: "Stuttgart",
    nameAlb: "Shtutgart",
    nameEn: "Stuttgart",
    nameTr: "Stuttgart",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  bremen: {
    name: "Bremen",
    nameAlb: "Bremen",
    nameEn: "Bremen",
    nameTr: "Bremen",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  wuppertal: {
    name: "Wuppertal",
    nameAlb: "Vupertal",
    nameEn: "Wuppertal",
    nameTr: "Wuppertal",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  bochum: {
    name: "Bochum",
    nameAlb: "Bohum",
    nameEn: "Bochum",
    nameTr: "Bochum",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  duisburg: {
    name: "Duisburg",
    nameAlb: "Duisburg",
    nameEn: "Duisburg",
    nameTr: "Duisburg",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  moenchengladbach: {
    name: "Mönchengladbach",
    nameAlb: "Mënhengladbah",
    nameEn: "Monchengladbach",
    nameTr: "Mönchengladbach",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  darmstadt: {
    name: "Darmstadt",
    nameAlb: "Darmshtad",
    nameEn: "Darmstadt",
    nameTr: "Darmstadt",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  wiesbaden: {
    name: "Wiesbaden",
    nameAlb: "Visbaden",
    nameEn: "Wiesbaden",
    nameTr: "Wiesbaden",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  muenster: {
    name: "Münster",
    nameAlb: "Mynster",
    nameEn: "Munster",
    nameTr: "Münster",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  },
  nuernberg: {
    name: "Nürnberg",
    nameAlb: "Nyrnberg",
    nameEn: "Nuremberg",
    nameTr: "Nürnberg",
    adjustment: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
  }
};


// Define placeholder prayer times for each German city
export const hamburgRamadanTimes =[
  { "date": "2025-03-01", "fajr": "05:12", "dhuhr": "12:37", "asr": "15:22", "maghrib": "18:04", "isha": "19:39" },
  { "date": "2025-03-02", "fajr": "05:09", "dhuhr": "12:37", "asr": "15:24", "maghrib": "18:05", "isha": "19:41" },
  { "date": "2025-03-03", "fajr": "05:07", "dhuhr": "12:37", "asr": "15:25", "maghrib": "18:07", "isha": "19:43" },
  { "date": "2025-03-04", "fajr": "05:05", "dhuhr": "12:37", "asr": "15:26", "maghrib": "18:09", "isha": "19:45" },
  { "date": "2025-03-05", "fajr": "05:02", "dhuhr": "12:36", "asr": "15:28", "maghrib": "18:11", "isha": "19:47" },
  { "date": "2025-03-06", "fajr": "05:00", "dhuhr": "12:36", "asr": "15:29", "maghrib": "18:13", "isha": "19:49" },
  { "date": "2025-03-07", "fajr": "04:57", "dhuhr": "12:36", "asr": "15:30", "maghrib": "18:15", "isha": "19:51" },
  { "date": "2025-03-08", "fajr": "04:55", "dhuhr": "12:36", "asr": "15:32", "maghrib": "18:17", "isha": "19:53" },
  { "date": "2025-03-09", "fajr": "04:52", "dhuhr": "12:36", "asr": "15:33", "maghrib": "18:19", "isha": "19:55" },
  { "date": "2025-03-10", "fajr": "04:50", "dhuhr": "12:35", "asr": "15:34", "maghrib": "18:21", "isha": "19:57" },
  { "date": "2025-03-11", "fajr": "04:47", "dhuhr": "12:35", "asr": "15:36", "maghrib": "18:23", "isha": "19:59" },
  { "date": "2025-03-12", "fajr": "04:45", "dhuhr": "12:35", "asr": "15:37", "maghrib": "18:24", "isha": "20:01" },
  { "date": "2025-03-13", "fajr": "04:42", "dhuhr": "12:34", "asr": "15:38", "maghrib": "18:26", "isha": "20:03" },
  { "date": "2025-03-14", "fajr": "04:39", "dhuhr": "12:34", "asr": "15:39", "maghrib": "18:28", "isha": "20:05" },
  { "date": "2025-03-15", "fajr": "04:37", "dhuhr": "12:34", "asr": "15:40", "maghrib": "18:30", "isha": "20:07" },
  { "date": "2025-03-16", "fajr": "04:34", "dhuhr": "12:34", "asr": "15:42", "maghrib": "18:32", "isha": "20:09" },
  { "date": "2025-03-17", "fajr": "04:31", "dhuhr": "12:33", "asr": "15:43", "maghrib": "18:34", "isha": "20:11" },
  { "date": "2025-03-18", "fajr": "04:29", "dhuhr": "12:33", "asr": "15:44", "maghrib": "18:36", "isha": "20:13" },
  { "date": "2025-03-19", "fajr": "04:26", "dhuhr": "12:33", "asr": "15:45", "maghrib": "18:37", "isha": "20:15" },
  { "date": "2025-03-20", "fajr": "04:23", "dhuhr": "12:32", "asr": "15:46", "maghrib": "18:39", "isha": "20:17" },
  { "date": "2025-03-21", "fajr": "04:20", "dhuhr": "12:32", "asr": "15:47", "maghrib": "18:41", "isha": "20:19" },
  { "date": "2025-03-22", "fajr": "04:17", "dhuhr": "12:32", "asr": "15:49", "maghrib": "18:43", "isha": "20:21" },
  { "date": "2025-03-23", "fajr": "04:14", "dhuhr": "12:32", "asr": "15:50", "maghrib": "18:45", "isha": "20:24" },
  { "date": "2025-03-24", "fajr": "04:12", "dhuhr": "12:31", "asr": "15:51", "maghrib": "18:47", "isha": "20:26" },
  { "date": "2025-03-25", "fajr": "04:09", "dhuhr": "12:31", "asr": "15:52", "maghrib": "18:49", "isha": "20:28" },
  { "date": "2025-03-26", "fajr": "04:06", "dhuhr": "12:31", "asr": "15:53", "maghrib": "18:50", "isha": "20:30" },
  { "date": "2025-03-27", "fajr": "04:03", "dhuhr": "12:30", "asr": "15:54", "maghrib": "18:52", "isha": "20:32" },
  { "date": "2025-03-28", "fajr": "04:00", "dhuhr": "12:30", "asr": "15:55", "maghrib": "18:54", "isha": "20:35" },
  { "date": "2025-03-29", "fajr": "03:57", "dhuhr": "12:30", "asr": "15:56", "maghrib": "18:56", "isha": "20:37" }
];

// Add similar placeholders for other cities
export const frankfurtRamadanTimes = [
  { "date": "2025-03-01", "fajr": "05:21", "dhuhr": "12:43", "asr": "15:35", "maghrib": "18:13", "isha": "19:42" },
  { "date": "2025-03-02", "fajr": "05:19", "dhuhr": "12:43", "asr": "15:36", "maghrib": "18:15", "isha": "19:43" },
  { "date": "2025-03-03", "fajr": "05:17", "dhuhr": "12:42", "asr": "15:37", "maghrib": "18:17", "isha": "19:45" },
  { "date": "2025-03-04", "fajr": "05:15", "dhuhr": "12:42", "asr": "15:39", "maghrib": "18:18", "isha": "19:46" },
  { "date": "2025-03-05", "fajr": "05:13", "dhuhr": "12:42", "asr": "15:40", "maghrib": "18:20", "isha": "19:48" },
  { "date": "2025-03-06", "fajr": "05:11", "dhuhr": "12:42", "asr": "15:41", "maghrib": "18:22", "isha": "19:50" },
  { "date": "2025-03-07", "fajr": "05:09", "dhuhr": "12:41", "asr": "15:42", "maghrib": "18:23", "isha": "19:51" },
  { "date": "2025-03-08", "fajr": "05:06", "dhuhr": "12:41", "asr": "15:43", "maghrib": "18:25", "isha": "19:53" },
  { "date": "2025-03-09", "fajr": "05:04", "dhuhr": "12:41", "asr": "15:44", "maghrib": "18:27", "isha": "19:55" },
  { "date": "2025-03-10", "fajr": "05:02", "dhuhr": "12:41", "asr": "15:45", "maghrib": "18:28", "isha": "19:57" },
  { "date": "2025-03-11", "fajr": "05:00", "dhuhr": "12:40", "asr": "15:46", "maghrib": "18:30", "isha": "19:58" },
  { "date": "2025-03-12", "fajr": "04:57", "dhuhr": "12:40", "asr": "15:47", "maghrib": "18:32", "isha": "20:00" },
  { "date": "2025-03-13", "fajr": "04:55", "dhuhr": "12:40", "asr": "15:48", "maghrib": "18:33", "isha": "20:02" },
  { "date": "2025-03-14", "fajr": "04:53", "dhuhr": "12:40", "asr": "15:49", "maghrib": "18:35", "isha": "20:03" },
  { "date": "2025-03-15", "fajr": "04:50", "dhuhr": "12:39", "asr": "15:50", "maghrib": "18:36", "isha": "20:05" },
  { "date": "2025-03-16", "fajr": "04:48", "dhuhr": "12:39", "asr": "15:52", "maghrib": "18:38", "isha": "20:07" },
  { "date": "2025-03-17", "fajr": "04:46", "dhuhr": "12:39", "asr": "15:53", "maghrib": "18:40", "isha": "20:09" },
  { "date": "2025-03-18", "fajr": "04:43", "dhuhr": "12:38", "asr": "15:53", "maghrib": "18:41", "isha": "20:10" },
  { "date": "2025-03-19", "fajr": "04:41", "dhuhr": "12:38", "asr": "15:54", "maghrib": "18:43", "isha": "20:12" },
  { "date": "2025-03-20", "fajr": "04:38", "dhuhr": "12:38", "asr": "15:55", "maghrib": "18:44", "isha": "20:14" },
  { "date": "2025-03-21", "fajr": "04:36", "dhuhr": "12:38", "asr": "15:56", "maghrib": "18:46", "isha": "20:16" },
  { "date": "2025-03-22", "fajr": "04:33", "dhuhr": "12:37", "asr": "15:57", "maghrib": "18:48", "isha": "20:18" },
  { "date": "2025-03-23", "fajr": "04:31", "dhuhr": "12:37", "asr": "15:58", "maghrib": "18:49", "isha": "20:19" },
  { "date": "2025-03-24", "fajr": "04:28", "dhuhr": "12:37", "asr": "15:59", "maghrib": "18:51", "isha": "20:21" },
  { "date": "2025-03-25", "fajr": "04:26", "dhuhr": "12:36", "asr": "16:00", "maghrib": "18:52", "isha": "20:23" },
  { "date": "2025-03-26", "fajr": "04:23", "dhuhr": "12:36", "asr": "16:01", "maghrib": "18:54", "isha": "20:25" },
  { "date": "2025-03-27", "fajr": "04:21", "dhuhr": "12:36", "asr": "16:02", "maghrib": "18:56", "isha": "20:27" },
  { "date": "2025-03-28", "fajr": "04:18", "dhuhr": "12:36", "asr": "16:03", "maghrib": "18:57", "isha": "20:29" },
  { "date": "2025-03-29", "fajr": "04:16", "dhuhr": "12:35", "asr": "16:04", "maghrib": "18:59", "isha": "20:31" }
];

export const koelnRamadanTimes = [
  { "date": "2025-03-01", "fajr": "05:27", "dhuhr": "12:50", "asr": "15:40", "maghrib": "18:19", "isha": "19:49" },
  { "date": "2025-03-02", "fajr": "05:25", "dhuhr": "12:49", "asr": "15:42", "maghrib": "18:21", "isha": "19:51" },
  { "date": "2025-03-03", "fajr": "05:23", "dhuhr": "12:49", "asr": "15:43", "maghrib": "18:23", "isha": "19:53" },
  { "date": "2025-03-04", "fajr": "05:21", "dhuhr": "12:49", "asr": "15:44", "maghrib": "18:25", "isha": "19:54" },
  { "date": "2025-03-05", "fajr": "05:19", "dhuhr": "12:49", "asr": "15:45", "maghrib": "18:26", "isha": "19:56" },
  { "date": "2025-03-06", "fajr": "05:17", "dhuhr": "12:49", "asr": "15:46", "maghrib": "18:28", "isha": "19:58" },
  { "date": "2025-03-07", "fajr": "05:14", "dhuhr": "12:48", "asr": "15:48", "maghrib": "18:30", "isha": "19:59" },
  { "date": "2025-03-08", "fajr": "05:12", "dhuhr": "12:48", "asr": "15:49", "maghrib": "18:31", "isha": "20:01" },
  { "date": "2025-03-09", "fajr": "05:10", "dhuhr": "12:48", "asr": "15:50", "maghrib": "18:33", "isha": "20:03" },
  { "date": "2025-03-10", "fajr": "05:07", "dhuhr": "12:48", "asr": "15:51", "maghrib": "18:35", "isha": "20:05" },
  { "date": "2025-03-11", "fajr": "05:05", "dhuhr": "12:47", "asr": "15:52", "maghrib": "18:36", "isha": "20:06" },
  { "date": "2025-03-12", "fajr": "05:03", "dhuhr": "12:47", "asr": "15:53", "maghrib": "18:38", "isha": "20:08" },
  { "date": "2025-03-13", "fajr": "05:00", "dhuhr": "12:47", "asr": "15:54", "maghrib": "18:40", "isha": "20:10" },
  { "date": "2025-03-14", "fajr": "04:58", "dhuhr": "12:47", "asr": "15:55", "maghrib": "18:41", "isha": "20:12" },
  { "date": "2025-03-15", "fajr": "04:56", "dhuhr": "12:46", "asr": "15:56", "maghrib": "18:43", "isha": "20:14" },
  { "date": "2025-03-16", "fajr": "04:53", "dhuhr": "12:46", "asr": "15:57", "maghrib": "18:45", "isha": "20:15" },
  { "date": "2025-03-17", "fajr": "04:51", "dhuhr": "12:46", "asr": "15:59", "maghrib": "18:46", "isha": "20:17" },
  { "date": "2025-03-18", "fajr": "04:48", "dhuhr": "12:45", "asr": "16:00", "maghrib": "18:48", "isha": "20:19" },
  { "date": "2025-03-19", "fajr": "04:46", "dhuhr": "12:45", "asr": "16:01", "maghrib": "18:50", "isha": "20:21" },
  { "date": "2025-03-20", "fajr": "04:43", "dhuhr": "12:45", "asr": "16:02", "maghrib": "18:51", "isha": "20:23" },
  { "date": "2025-03-21", "fajr": "04:41", "dhuhr": "12:45", "asr": "16:03", "maghrib": "18:53", "isha": "20:25" },
  { "date": "2025-03-22", "fajr": "04:38", "dhuhr": "12:44", "asr": "16:04", "maghrib": "18:55", "isha": "20:27" },
  { "date": "2025-03-23", "fajr": "04:36", "dhuhr": "12:44", "asr": "16:05", "maghrib": "18:56", "isha": "20:28" },
  { "date": "2025-03-24", "fajr": "04:33", "dhuhr": "12:44", "asr": "16:05", "maghrib": "18:58", "isha": "20:30" },
  { "date": "2025-03-25", "fajr": "04:30", "dhuhr": "12:43", "asr": "16:06", "maghrib": "19:00", "isha": "20:32" },
  { "date": "2025-03-26", "fajr": "04:28", "dhuhr": "12:43", "asr": "16:07", "maghrib": "19:01", "isha": "20:34" },
  { "date": "2025-03-27", "fajr": "04:25", "dhuhr": "12:43", "asr": "16:08", "maghrib": "19:03", "isha": "20:36" },
  { "date": "2025-03-28", "fajr": "04:22", "dhuhr": "12:42", "asr": "16:09", "maghrib": "19:05", "isha": "20:38" },
  { "date": "2025-03-29", "fajr": "04:20", "dhuhr": "12:42", "asr": "16:10", "maghrib": "19:06", "isha": "20:40" }
];

export const bonnRamadanTimes = [
  { "date": "2025-03-01", "weekday": "Saturday", "fajr": "5:27", "dhuhr": "12:49", "asr": "15:40", "maghrib": "18:19", "isha": "19:48" },
  { "date": "2025-03-02", "weekday": "Sunday", "fajr": "5:25", "dhuhr": "12:49", "asr": "15:41", "maghrib": "18:21", "isha": "19:50" },
  { "date": "2025-03-03", "weekday": "Monday", "fajr": "5:23", "dhuhr": "12:49", "asr": "15:42", "maghrib": "18:22", "isha": "19:52" },
  { "date": "2025-03-04", "weekday": "Tuesday", "fajr": "5:21", "dhuhr": "12:48", "asr": "15:44", "maghrib": "18:24", "isha": "19:53" },
  { "date": "2025-03-05", "weekday": "Wednesday", "fajr": "5:18", "dhuhr": "12:48", "asr": "15:45", "maghrib": "18:26", "isha": "19:55" },
  { "date": "2025-03-06", "weekday": "Thursday", "fajr": "5:16", "dhuhr": "12:48", "asr": "15:46", "maghrib": "18:27", "isha": "19:57" },
  { "date": "2025-03-07", "weekday": "Friday", "fajr": "5:14", "dhuhr": "12:48", "asr": "15:47", "maghrib": "18:29", "isha": "19:58" },
  { "date": "2025-03-08", "weekday": "Saturday", "fajr": "5:12", "dhuhr": "12:47", "asr": "15:48", "maghrib": "18:31", "isha": "20:00" },
  { "date": "2025-03-09", "weekday": "Sunday", "fajr": "5:09", "dhuhr": "12:47", "asr": "15:49", "maghrib": "18:32", "isha": "20:02" },
  { "date": "2025-03-10", "weekday": "Monday", "fajr": "5:07", "dhuhr": "12:47", "asr": "15:51", "maghrib": "18:34", "isha": "20:04" },
  { "date": "2025-03-11", "weekday": "Tuesday", "fajr": "5:05", "dhuhr": "12:47", "asr": "15:52", "maghrib": "18:36", "isha": "20:05" },
  { "date": "2025-03-12", "weekday": "Wednesday", "fajr": "5:02", "dhuhr": "12:46", "asr": "15:53", "maghrib": "18:37", "isha": "20:07" },
  { "date": "2025-03-13", "weekday": "Thursday", "fajr": "5:00", "dhuhr": "12:46", "asr": "15:54", "maghrib": "18:39", "isha": "20:09" },
  { "date": "2025-03-14", "weekday": "Friday", "fajr": "4:58", "dhuhr": "12:46", "asr": "15:55", "maghrib": "18:41", "isha": "20:11" },
  { "date": "2025-03-15", "weekday": "Saturday", "fajr": "4:55", "dhuhr": "12:46", "asr": "15:56", "maghrib": "18:42", "isha": "20:13" },
  { "date": "2025-03-16", "weekday": "Sunday", "fajr": "4:53", "dhuhr": "12:45", "asr": "15:57", "maghrib": "18:44", "isha": "20:14" },
  { "date": "2025-03-17", "weekday": "Monday", "fajr": "4:50", "dhuhr": "12:45", "asr": "15:58", "maghrib": "18:46", "isha": "20:16" },
  { "date": "2025-03-18", "weekday": "Tuesday", "fajr": "4:48", "dhuhr": "12:45", "asr": "15:59", "maghrib": "18:47", "isha": "20:18" },
  { "date": "2025-03-19", "weekday": "Wednesday", "fajr": "4:46", "dhuhr": "12:44", "asr": "16:00", "maghrib": "18:49", "isha": "20:20" },
  { "date": "2025-03-20", "weekday": "Thursday", "fajr": "4:43", "dhuhr": "12:44", "asr": "16:01", "maghrib": "18:51", "isha": "20:22" },
  { "date": "2025-03-21", "weekday": "Friday", "fajr": "4:41", "dhuhr": "12:44", "asr": "16:02", "maghrib": "18:52", "isha": "20:24" },
  { "date": "2025-03-22", "weekday": "Saturday", "fajr": "4:38", "dhuhr": "12:44", "asr": "16:03", "maghrib": "18:54", "isha": "20:25" },
  { "date": "2025-03-23", "weekday": "Sunday", "fajr": "4:35", "dhuhr": "12:43", "asr": "16:04", "maghrib": "18:56", "isha": "20:27" },
  { "date": "2025-03-24", "weekday": "Monday", "fajr": "4:33", "dhuhr": "12:43", "asr": "16:05", "maghrib": "18:57", "isha": "20:29" },
  { "date": "2025-03-25", "weekday": "Tuesday", "fajr": "4:30", "dhuhr": "12:43", "asr": "16:06", "maghrib": "18:59", "isha": "20:31" },
  { "date": "2025-03-26", "weekday": "Wednesday", "fajr": "4:28", "dhuhr": "12:42", "asr": "16:07", "maghrib": "19:01", "isha": "20:33" },
  { "date": "2025-03-27", "weekday": "Thursday", "fajr": "4:25", "dhuhr": "12:42", "asr": "16:08", "maghrib": "19:02", "isha": "20:35" },
  { "date": "2025-03-28", "weekday": "Friday", "fajr": "4:22", "dhuhr": "12:42", "asr": "16:09", "maghrib": "19:04", "isha": "20:37" },
  { "date": "2025-03-29", "weekday": "Saturday", "fajr": "4:20", "dhuhr": "12:41", "asr": "16:10", "maghrib": "19:05", "isha": "20:39" }
];

export const duesseldorfRamadanTimes = [
  { "date": "2025-03-01", "weekday": "Saturday", "fajr": "5:28", "dhuhr": "12:50", "asr": "15:40", "maghrib": "18:20", "isha": "19:50" },
  { "date": "2025-03-02", "weekday": "Sunday", "fajr": "5:25", "dhuhr": "12:50", "asr": "15:42", "maghrib": "18:21", "isha": "19:52" },
  { "date": "2025-03-03", "weekday": "Monday", "fajr": "5:23", "dhuhr": "12:50", "asr": "15:43", "maghrib": "18:23", "isha": "19:53" },
  { "date": "2025-03-04", "weekday": "Tuesday", "fajr": "5:21", "dhuhr": "12:50", "asr": "15:44", "maghrib": "18:25", "isha": "19:55" },
  { "date": "2025-03-05", "weekday": "Wednesday", "fajr": "5:19", "dhuhr": "12:49", "asr": "15:45", "maghrib": "18:26", "isha": "19:57" },
  { "date": "2025-03-06", "weekday": "Thursday", "fajr": "5:17", "dhuhr": "12:49", "asr": "15:46", "maghrib": "18:28", "isha": "19:59" },
  { "date": "2025-03-07", "weekday": "Friday", "fajr": "5:14", "dhuhr": "12:49", "asr": "15:48", "maghrib": "18:30", "isha": "20:00" },
  { "date": "2025-03-08", "weekday": "Saturday", "fajr": "5:12", "dhuhr": "12:49", "asr": "15:49", "maghrib": "18:32", "isha": "20:02" },
  { "date": "2025-03-09", "weekday": "Sunday", "fajr": "5:10", "dhuhr": "12:48", "asr": "15:50", "maghrib": "18:33", "isha": "20:04" },
  { "date": "2025-03-10", "weekday": "Monday", "fajr": "5:07", "dhuhr": "12:48", "asr": "15:51", "maghrib": "18:35", "isha": "20:06" },
  { "date": "2025-03-11", "weekday": "Tuesday", "fajr": "5:05", "dhuhr": "12:48", "asr": "15:52", "maghrib": "18:37", "isha": "20:08" },
  { "date": "2025-03-12", "weekday": "Wednesday", "fajr": "5:03", "dhuhr": "12:48", "asr": "15:53", "maghrib": "18:38", "isha": "20:09" },
  { "date": "2025-03-13", "weekday": "Thursday", "fajr": "5:00", "dhuhr": "12:47", "asr": "15:54", "maghrib": "18:40", "isha": "20:11" },
  { "date": "2025-03-14", "weekday": "Friday", "fajr": "4:58", "dhuhr": "12:47", "asr": "15:55", "maghrib": "18:42", "isha": "20:13" },
  { "date": "2025-03-15", "weekday": "Saturday", "fajr": "4:55", "dhuhr": "12:47", "asr": "15:57", "maghrib": "18:44", "isha": "20:15" },
  { "date": "2025-03-16", "weekday": "Sunday", "fajr": "4:53", "dhuhr": "12:47", "asr": "15:58", "maghrib": "18:45", "isha": "20:17" },
  { "date": "2025-03-17", "weekday": "Monday", "fajr": "4:50", "dhuhr": "12:46", "asr": "15:59", "maghrib": "18:47", "isha": "20:18" },
  { "date": "2025-03-18", "weekday": "Tuesday", "fajr": "4:48", "dhuhr": "12:46", "asr": "16:00", "maghrib": "18:49", "isha": "20:20" },
  { "date": "2025-03-19", "weekday": "Wednesday", "fajr": "4:45", "dhuhr": "12:46", "asr": "16:01", "maghrib": "18:50", "isha": "20:22" },
  { "date": "2025-03-20", "weekday": "Thursday", "fajr": "4:43", "dhuhr": "12:45", "asr": "16:02", "maghrib": "18:52", "isha": "20:24" },
  { "date": "2025-03-21", "weekday": "Friday", "fajr": "4:40", "dhuhr": "12:45", "asr": "16:03", "maghrib": "18:54", "isha": "20:26" },
  { "date": "2025-03-22", "weekday": "Saturday", "fajr": "4:38", "dhuhr": "12:45", "asr": "16:04", "maghrib": "18:55", "isha": "20:28" },
  { "date": "2025-03-23", "weekday": "Sunday", "fajr": "4:35", "dhuhr": "12:45", "asr": "16:05", "maghrib": "18:57", "isha": "20:30" },
  { "date": "2025-03-24", "weekday": "Monday", "fajr": "4:33", "dhuhr": "12:44", "asr": "16:06", "maghrib": "18:59", "isha": "20:32" },
  { "date": "2025-03-25", "weekday": "Tuesday", "fajr": "4:30", "dhuhr": "12:44", "asr": "16:07", "maghrib": "19:00", "isha": "20:34" },
  { "date": "2025-03-26", "weekday": "Wednesday", "fajr": "4:27", "dhuhr": "12:44", "asr": "16:08", "maghrib": "19:02", "isha": "20:36" },
  { "date": "2025-03-27", "weekday": "Thursday", "fajr": "4:25", "dhuhr": "12:43", "asr": "16:09", "maghrib": "19:04", "isha": "20:38" },
  { "date": "2025-03-28", "weekday": "Friday", "fajr": "4:22", "dhuhr": "12:43", "asr": "16:10", "maghrib": "19:05", "isha": "20:40" }
];

export const essenRamadanTimes = [
  { "date": "2025-02-26", "fajr": "05:26", "dhuhr": "12:49", "asr": "15:39", "maghrib": "18:18", "isha": "19:49" },
  { "date": "2025-02-27", "fajr": "05:24", "dhuhr": "12:49", "asr": "15:40", "maghrib": "18:20", "isha": "19:51" },
  { "date": "2025-02-28", "fajr": "05:22", "dhuhr": "12:49", "asr": "15:41", "maghrib": "18:22", "isha": "19:53" },
  { "date": "2025-03-01", "fajr": "05:20", "dhuhr": "12:49", "asr": "15:43", "maghrib": "18:24", "isha": "19:54" },
  { "date": "2025-03-02", "fajr": "05:18", "dhuhr": "12:49", "asr": "15:44", "maghrib": "18:25", "isha": "19:56" },
  { "date": "2025-03-03", "fajr": "05:15", "dhuhr": "12:48", "asr": "15:45", "maghrib": "18:27", "isha": "19:58" },
  { "date": "2025-03-04", "fajr": "05:13", "dhuhr": "12:48", "asr": "15:46", "maghrib": "18:29", "isha": "20:00" },
  { "date": "2025-03-05", "fajr": "05:11", "dhuhr": "12:48", "asr": "15:47", "maghrib": "18:31", "isha": "20:02" },
  { "date": "2025-03-06", "fajr": "05:08", "dhuhr": "12:48", "asr": "15:49", "maghrib": "18:32", "isha": "20:03" },
  { "date": "2025-03-07", "fajr": "05:06", "dhuhr": "12:47", "asr": "15:50", "maghrib": "18:34", "isha": "20:05" },
  { "date": "2025-03-08", "fajr": "05:04", "dhuhr": "12:47", "asr": "15:51", "maghrib": "18:36", "isha": "20:07" },
  { "date": "2025-03-09", "fajr": "05:01", "dhuhr": "12:47", "asr": "15:52", "maghrib": "18:38", "isha": "20:09" },
  { "date": "2025-03-10", "fajr": "04:59", "dhuhr": "12:47", "asr": "15:53", "maghrib": "18:39", "isha": "20:11" },
  { "date": "2025-03-11", "fajr": "04:56", "dhuhr": "12:46", "asr": "15:54", "maghrib": "18:41", "isha": "20:12" },
  { "date": "2025-03-12", "fajr": "04:54", "dhuhr": "12:46", "asr": "15:55", "maghrib": "18:43", "isha": "20:14" },
  { "date": "2025-03-13", "fajr": "04:52", "dhuhr": "12:46", "asr": "15:56", "maghrib": "18:44", "isha": "20:16" },
  { "date": "2025-03-14", "fajr": "04:49", "dhuhr": "12:45", "asr": "15:58", "maghrib": "18:46", "isha": "20:18" },
  { "date": "2025-03-15", "fajr": "04:47", "dhuhr": "12:45", "asr": "15:59", "maghrib": "18:48", "isha": "20:20" },
  { "date": "2025-03-16", "fajr": "04:44", "dhuhr": "12:45", "asr": "16:00", "maghrib": "18:49", "isha": "20:22" },
  { "date": "2025-03-17", "fajr": "04:41", "dhuhr": "12:45", "asr": "16:01", "maghrib": "18:51", "isha": "20:24" },
  { "date": "2025-03-18", "fajr": "04:39", "dhuhr": "12:44", "asr": "16:02", "maghrib": "18:53", "isha": "20:26" },
  { "date": "2025-03-19", "fajr": "04:36", "dhuhr": "12:44", "asr": "16:03", "maghrib": "18:55", "isha": "20:28" },
  { "date": "2025-03-20", "fajr": "04:34", "dhuhr": "12:44", "asr": "16:04", "maghrib": "18:56", "isha": "20:30" },
  { "date": "2025-03-21", "fajr": "04:31", "dhuhr": "12:43", "asr": "16:05", "maghrib": "18:58", "isha": "20:31" },
  { "date": "2025-03-22", "fajr": "04:28", "dhuhr": "12:43", "asr": "16:06", "maghrib": "19:00", "isha": "20:33" },
  { "date": "2025-03-23", "fajr": "04:26", "dhuhr": "12:43", "asr": "16:07", "maghrib": "19:01", "isha": "20:35" },
  { "date": "2025-03-24", "fajr": "04:23", "dhuhr": "12:42", "asr": "16:08", "maghrib": "19:03", "isha": "20:37" },
  { "date": "2025-03-25", "fajr": "04:20", "dhuhr": "12:42", "asr": "16:09", "maghrib": "19:05", "isha": "20:39" },
  { "date": "2025-03-26", "fajr": "04:17", "dhuhr": "12:42", "asr": "16:10", "maghrib": "19:06", "isha": "20:42" }
];

export const dortmundRamadanTimes = [
  { "date": "2025-02-26", "fajr": "05:24", "dhuhr": "12:47", "asr": "15:37", "maghrib": "18:16", "isha": "19:47" },
  { "date": "2025-02-27", "fajr": "05:22", "dhuhr": "12:47", "asr": "15:38", "maghrib": "18:18", "isha": "19:49" },
  { "date": "2025-02-28", "fajr": "05:20", "dhuhr": "12:47", "asr": "15:39", "maghrib": "18:20", "isha": "19:51" },
  { "date": "2025-03-01", "fajr": "05:18", "dhuhr": "12:47", "asr": "15:41", "maghrib": "18:22", "isha": "19:53" },
  { "date": "2025-03-02", "fajr": "05:16", "dhuhr": "12:47", "asr": "15:42", "maghrib": "18:23", "isha": "19:54" },
  { "date": "2025-03-03", "fajr": "05:13", "dhuhr": "12:46", "asr": "15:43", "maghrib": "18:25", "isha": "19:56" },
  { "date": "2025-03-04", "fajr": "05:11", "dhuhr": "12:46", "asr": "15:44", "maghrib": "18:27", "isha": "19:58" },
  { "date": "2025-03-05", "fajr": "05:09", "dhuhr": "12:46", "asr": "15:46", "maghrib": "18:29", "isha": "20:00" },
  { "date": "2025-03-06", "fajr": "05:06", "dhuhr": "12:46", "asr": "15:47", "maghrib": "18:30", "isha": "20:02" },
  { "date": "2025-03-07", "fajr": "05:04", "dhuhr": "12:45", "asr": "15:48", "maghrib": "18:32", "isha": "20:03" },
  { "date": "2025-03-08", "fajr": "05:02", "dhuhr": "12:45", "asr": "15:49", "maghrib": "18:34", "isha": "20:05" },
  { "date": "2025-03-09", "fajr": "04:59", "dhuhr": "12:45", "asr": "15:50", "maghrib": "18:36", "isha": "20:07" },
  { "date": "2025-03-10", "fajr": "04:57", "dhuhr": "12:45", "asr": "15:51", "maghrib": "18:37", "isha": "20:09" },
  { "date": "2025-03-11", "fajr": "04:54", "dhuhr": "12:44", "asr": "15:52", "maghrib": "18:39", "isha": "20:11" },
  { "date": "2025-03-12", "fajr": "04:52", "dhuhr": "12:44", "asr": "15:53", "maghrib": "18:41", "isha": "20:13" },
  { "date": "2025-03-13", "fajr": "04:50", "dhuhr": "12:44", "asr": "15:55", "maghrib": "18:42", "isha": "20:14" },
  { "date": "2025-03-14", "fajr": "04:47", "dhuhr": "12:44", "asr": "15:56", "maghrib": "18:44", "isha": "20:16" },
  { "date": "2025-03-15", "fajr": "04:45", "dhuhr": "12:43", "asr": "15:57", "maghrib": "18:46", "isha": "20:18" },
  { "date": "2025-03-16", "fajr": "04:42", "dhuhr": "12:43", "asr": "15:58", "maghrib": "18:48", "isha": "20:20" },
  { "date": "2025-03-17", "fajr": "04:39", "dhuhr": "12:43", "asr": "15:59", "maghrib": "18:49", "isha": "20:22" },
  { "date": "2025-03-18", "fajr": "04:37", "dhuhr": "12:42", "asr": "16:00", "maghrib": "18:51", "isha": "20:24" },
  { "date": "2025-03-19", "fajr": "04:34", "dhuhr": "12:42", "asr": "16:01", "maghrib": "18:53", "isha": "20:26" },
  { "date": "2025-03-20", "fajr": "04:32", "dhuhr": "12:42", "asr": "16:02", "maghrib": "18:54", "isha": "20:28" },
  { "date": "2025-03-21", "fajr": "04:29", "dhuhr": "12:41", "asr": "16:03", "maghrib": "18:56", "isha": "20:30" },
  { "date": "2025-03-22", "fajr": "04:26", "dhuhr": "12:41", "asr": "16:04", "maghrib": "18:58", "isha": "20:32" },
  { "date": "2025-03-23", "fajr": "04:24", "dhuhr": "12:41", "asr": "16:05", "maghrib": "18:59", "isha": "20:34" },
  { "date": "2025-03-24", "fajr": "04:21", "dhuhr": "12:41", "asr": "16:06", "maghrib": "19:01", "isha": "20:36" },
  { "date": "2025-03-25", "fajr": "04:18", "dhuhr": "12:40", "asr": "16:07", "maghrib": "19:03", "isha": "20:38" },
  { "date": "2025-03-26", "fajr": "04:15", "dhuhr": "12:40", "asr": "16:08", "maghrib": "19:04", "isha": "20:40" }
];

export const muenchenRamadanTimes = [
  { "date": "2025-03-01", "weekday": "Shtunë", "fajr": "05:14", "dhuhr": "12:38", "asr": "15:26", "maghrib": "18:06", "isha": "19:39" },
  { "date": "2025-03-02", "weekday": "E Diel", "fajr": "05:12", "dhuhr": "12:38", "asr": "15:27", "maghrib": "18:08", "isha": "19:41" },
  { "date": "2025-03-03", "weekday": "E Hënë", "fajr": "05:10", "dhuhr": "12:38", "asr": "15:29", "maghrib": "18:10", "isha": "19:43" },
  { "date": "2025-03-04", "weekday": "E Martë", "fajr": "05:08", "dhuhr": "12:38", "asr": "15:30", "maghrib": "18:12", "isha": "19:45" },
  { "date": "2025-03-05", "weekday": "E Mërkurë", "fajr": "05:05", "dhuhr": "12:38", "asr": "15:31", "maghrib": "18:14", "isha": "19:47" },
  { "date": "2025-03-06", "weekday": "E Enjte", "fajr": "05:03", "dhuhr": "12:37", "asr": "15:33", "maghrib": "18:15", "isha": "19:48" },
  { "date": "2025-03-07", "weekday": "E Premte", "fajr": "05:01", "dhuhr": "12:37", "asr": "15:34", "maghrib": "18:17", "isha": "19:50" },
  { "date": "2025-03-08", "weekday": "Shtunë", "fajr": "04:58", "dhuhr": "12:37", "asr": "15:35", "maghrib": "18:19", "isha": "19:52" },
  { "date": "2025-03-09", "weekday": "E Diel", "fajr": "04:56", "dhuhr": "12:37", "asr": "15:36", "maghrib": "18:21", "isha": "19:54" },
  { "date": "2025-03-10", "weekday": "E Hënë", "fajr": "04:53", "dhuhr": "12:36", "asr": "15:37", "maghrib": "18:23", "isha": "19:56" },
  { "date": "2025-03-11", "weekday": "E Martë", "fajr": "04:51", "dhuhr": "12:36", "asr": "15:39", "maghrib": "18:24", "isha": "19:58" },
  { "date": "2025-03-12", "weekday": "E Mërkurë", "fajr": "04:48", "dhuhr": "12:36", "asr": "15:40", "maghrib": "18:26", "isha": "20:00" },
  { "date": "2025-03-13", "weekday": "E Enjte", "fajr": "04:46", "dhuhr": "12:36", "asr": "15:41", "maghrib": "18:28", "isha": "20:02" },
  { "date": "2025-03-14", "weekday": "E Premte", "fajr": "04:43", "dhuhr": "12:35", "asr": "15:42", "maghrib": "18:30", "isha": "20:03" },
  { "date": "2025-03-15", "weekday": "Shtunë", "fajr": "04:41", "dhuhr": "12:35", "asr": "15:43", "maghrib": "18:32", "isha": "20:05" },
  { "date": "2025-03-16", "weekday": "E Diel", "fajr": "04:38", "dhuhr": "12:35", "asr": "15:44", "maghrib": "18:33", "isha": "20:07" },
  { "date": "2025-03-17", "weekday": "E Hënë", "fajr": "04:36", "dhuhr": "12:35", "asr": "15:46", "maghrib": "18:35", "isha": "20:09" },
  { "date": "2025-03-18", "weekday": "E Martë", "fajr": "04:33", "dhuhr": "12:34", "asr": "15:47", "maghrib": "18:37", "isha": "20:11" },
  { "date": "2025-03-19", "weekday": "E Mërkurë", "fajr": "04:30", "dhuhr": "12:34", "asr": "15:48", "maghrib": "18:39", "isha": "20:13" },
  { "date": "2025-03-20", "weekday": "E Enjte", "fajr": "04:28", "dhuhr": "12:34", "asr": "15:49", "maghrib": "18:40", "isha": "20:15" },
  { "date": "2025-03-21", "weekday": "E Premte", "fajr": "04:25", "dhuhr": "12:33", "asr": "15:50", "maghrib": "18:42", "isha": "20:17" },
  { "date": "2025-03-22", "weekday": "Shtunë", "fajr": "04:22", "dhuhr": "12:33", "asr": "15:51", "maghrib": "18:44", "isha": "20:19" },
  { "date": "2025-03-23", "weekday": "E Diel", "fajr": "04:20", "dhuhr": "12:33", "asr": "15:52", "maghrib": "18:46", "isha": "20:21" },
  { "date": "2025-03-24", "weekday": "E Hënë", "fajr": "04:17", "dhuhr": "12:32", "asr": "15:53", "maghrib": "18:47", "isha": "20:23" },
  { "date": "2025-03-25", "weekday": "E Martë", "fajr": "04:14", "dhuhr": "12:32", "asr": "15:54", "maghrib": "18:49", "isha": "20:25" },
  { "date": "2025-03-26", "weekday": "E Mërkurë", "fajr": "04:11", "dhuhr": "12:32", "asr": "15:55", "maghrib": "18:51", "isha": "20:27" },
  { "date": "2025-03-27", "weekday": "E Enjte", "fajr": "04:09", "dhuhr": "12:32", "asr": "15:56", "maghrib": "18:53", "isha": "20:30" },
  { "date": "2025-03-28", "weekday": "E Premte", "fajr": "04:06", "dhuhr": "12:31", "asr": "15:57", "maghrib": "18:54", "isha": "20:32" },
  { "date": "2025-03-29", "weekday": "Shtunë", "fajr": "04:03", "dhuhr": "12:31", "asr": "15:58", "maghrib": "18:56", "isha": "20:34" }
];

export const hannoverRamadanTimes = [
  { "date": "2025-03-01", "fajr": "05:14", "sunrise": "07:01", "dhuhr": "12:38", "asr": "15:26", "maghrib": "18:06", "isha": "19:39" },
  { "date": "2025-03-02", "fajr": "05:12", "sunrise": "06:58", "dhuhr": "12:38", "asr": "15:27", "maghrib": "18:08", "isha": "19:41" },
  { "date": "2025-03-03", "fajr": "05:10", "sunrise": "06:56", "dhuhr": "12:38", "asr": "15:29", "maghrib": "18:10", "isha": "19:43" },
  { "date": "2025-03-04", "fajr": "05:08", "sunrise": "06:54", "dhuhr": "12:38", "asr": "15:30", "maghrib": "18:12", "isha": "19:45" },
  { "date": "2025-03-05", "fajr": "05:05", "sunrise": "06:52", "dhuhr": "12:38", "asr": "15:31", "maghrib": "18:14", "isha": "19:47" },
  { "date": "2025-03-06", "fajr": "05:03", "sunrise": "06:49", "dhuhr": "12:37", "asr": "15:33", "maghrib": "18:15", "isha": "19:48" },
  { "date": "2025-03-07", "fajr": "05:01", "sunrise": "06:47", "dhuhr": "12:37", "asr": "15:34", "maghrib": "18:17", "isha": "19:50" },
  { "date": "2025-03-08", "fajr": "04:58", "sunrise": "06:45", "dhuhr": "12:37", "asr": "15:35", "maghrib": "18:19", "isha": "19:52" },
  { "date": "2025-03-09", "fajr": "04:56", "sunrise": "06:43", "dhuhr": "12:37", "asr": "15:36", "maghrib": "18:21", "isha": "19:54" },
  { "date": "2025-03-10", "fajr": "04:53", "sunrise": "06:40", "dhuhr": "12:36", "asr": "15:37", "maghrib": "18:23", "isha": "19:56" },
  { "date": "2025-03-11", "fajr": "04:51", "sunrise": "06:38", "dhuhr": "12:36", "asr": "15:39", "maghrib": "18:24", "isha": "19:58" },
  { "date": "2025-03-12", "fajr": "04:48", "sunrise": "06:36", "dhuhr": "12:36", "asr": "15:40", "maghrib": "18:26", "isha": "20:00" },
  { "date": "2025-03-13", "fajr": "04:46", "sunrise": "06:33", "dhuhr": "12:36", "asr": "15:41", "maghrib": "18:28", "isha": "20:02" },
  { "date": "2025-03-14", "fajr": "04:43", "sunrise": "06:31", "dhuhr": "12:35", "asr": "15:42", "maghrib": "18:30", "isha": "20:03" },
  { "date": "2025-03-15", "fajr": "04:41", "sunrise": "06:29", "dhuhr": "12:35", "asr": "15:43", "maghrib": "18:32", "isha": "20:05" },
  { "date": "2025-03-16", "fajr": "04:38", "sunrise": "06:26", "dhuhr": "12:35", "asr": "15:44", "maghrib": "18:33", "isha": "20:07" },
  { "date": "2025-03-17", "fajr": "04:36", "sunrise": "06:24", "dhuhr": "12:35", "asr": "15:46", "maghrib": "18:35", "isha": "20:09" },
  { "date": "2025-03-18", "fajr": "04:33", "sunrise": "06:22", "dhuhr": "12:34", "asr": "15:47", "maghrib": "18:37", "isha": "20:11" },
  { "date": "2025-03-19", "fajr": "04:30", "sunrise": "06:19", "dhuhr": "12:34", "asr": "15:48", "maghrib": "18:39", "isha": "20:13" },
  { "date": "2025-03-20", "fajr": "04:28", "sunrise": "06:17", "dhuhr": "12:34", "asr": "15:49", "maghrib": "18:40", "isha": "20:15" },
  { "date": "2025-03-21", "fajr": "04:25", "sunrise": "06:15", "dhuhr": "12:33", "asr": "15:50", "maghrib": "18:42", "isha": "20:17" },
  { "date": "2025-03-22", "fajr": "04:22", "sunrise": "06:12", "dhuhr": "12:33", "asr": "15:51", "maghrib": "18:44", "isha": "20:19" },
  { "date": "2025-03-23", "fajr": "04:20", "sunrise": "06:10", "dhuhr": "12:33", "asr": "15:52", "maghrib": "18:46", "isha": "20:21" },
  { "date": "2025-03-24", "fajr": "04:17", "sunrise": "06:08", "dhuhr": "12:32", "asr": "15:53", "maghrib": "18:47", "isha": "20:23" },
  { "date": "2025-03-25", "fajr": "04:14", "sunrise": "06:05", "dhuhr": "12:32", "asr": "15:54", "maghrib": "18:49", "isha": "20:25" },
  { "date": "2025-03-26", "fajr": "04:11", "sunrise": "06:03", "dhuhr": "12:32", "asr": "15:55", "maghrib": "18:51", "isha": "20:27" },
  { "date": "2025-03-27", "fajr": "04:09", "sunrise": "06:00", "dhuhr": "12:32", "asr": "15:56", "maghrib": "18:53", "isha": "20:30" },
  { "date": "2025-03-28", "fajr": "04:06", "sunrise": "05:58", "dhuhr": "12:31", "asr": "15:57", "maghrib": "18:54", "isha": "20:32" },
  { "date": "2025-03-29", "fajr": "04:03", "sunrise": "05:56", "dhuhr": "12:31", "asr": "15:58", "maghrib": "18:56", "isha": "20:34" }
];

export const stuttgartRamadanTimes = [
  { "date": "2025-03-01", "fajr": "05:21", "sunrise": "06:58", "dhuhr": "12:41", "asr": "15:35", "maghrib": "18:13", "isha": "19:38" },
  { "date": "2025-03-02", "fajr": "05:19", "sunrise": "06:56", "dhuhr": "12:40", "asr": "15:37", "maghrib": "18:14", "isha": "19:40" },
  { "date": "2025-03-03", "fajr": "05:17", "sunrise": "06:54", "dhuhr": "12:40", "asr": "15:38", "maghrib": "18:16", "isha": "19:41" },
  { "date": "2025-03-04", "fajr": "05:15", "sunrise": "06:52", "dhuhr": "12:40", "asr": "15:39", "maghrib": "18:18", "isha": "19:43" },
  { "date": "2025-03-05", "fajr": "05:13", "sunrise": "06:50", "dhuhr": "12:40", "asr": "15:40", "maghrib": "18:19", "isha": "19:45" },
  { "date": "2025-03-06", "fajr": "05:11", "sunrise": "06:48", "dhuhr": "12:40", "asr": "15:41", "maghrib": "18:21", "isha": "19:46" },
  { "date": "2025-03-07", "fajr": "05:08", "sunrise": "06:46", "dhuhr": "12:39", "asr": "15:42", "maghrib": "18:22", "isha": "19:48" },
  { "date": "2025-03-08", "fajr": "05:06", "sunrise": "06:44", "dhuhr": "12:39", "asr": "15:43", "maghrib": "18:24", "isha": "19:49" },
  { "date": "2025-03-09", "fajr": "05:04", "sunrise": "06:42", "dhuhr": "12:39", "asr": "15:44", "maghrib": "18:25", "isha": "19:51" },
  { "date": "2025-03-10", "fajr": "05:02", "sunrise": "06:40", "dhuhr": "12:39", "asr": "15:45", "maghrib": "18:27", "isha": "19:53" },
  { "date": "2025-03-11", "fajr": "05:00", "sunrise": "06:38", "dhuhr": "12:38", "asr": "15:46", "maghrib": "18:28", "isha": "19:54" },
  { "date": "2025-03-12", "fajr": "04:58", "sunrise": "06:36", "dhuhr": "12:38", "asr": "15:47", "maghrib": "18:30", "isha": "19:56" },
  { "date": "2025-03-13", "fajr": "04:56", "sunrise": "06:34", "dhuhr": "12:38", "asr": "15:48", "maghrib": "18:32", "isha": "19:57" },
  { "date": "2025-03-14", "fajr": "04:53", "sunrise": "06:32", "dhuhr": "12:38", "asr": "15:49", "maghrib": "18:33", "isha": "19:59" },
  { "date": "2025-03-15", "fajr": "04:51", "sunrise": "06:30", "dhuhr": "12:37", "asr": "15:50", "maghrib": "18:35", "isha": "20:01" },
  { "date": "2025-03-16", "fajr": "04:49", "sunrise": "06:28", "dhuhr": "12:37", "asr": "15:51", "maghrib": "18:36", "isha": "20:02" },
  { "date": "2025-03-17", "fajr": "04:47", "sunrise": "06:26", "dhuhr": "12:37", "asr": "15:52", "maghrib": "18:38", "isha": "20:04" },
  { "date": "2025-03-18", "fajr": "04:44", "sunrise": "06:24", "dhuhr": "12:36", "asr": "15:53", "maghrib": "18:39", "isha": "20:06" },
  { "date": "2025-03-19", "fajr": "04:42", "sunrise": "06:21", "dhuhr": "12:36", "asr": "15:54", "maghrib": "18:41", "isha": "20:07" },
  { "date": "2025-03-20", "fajr": "04:40", "sunrise": "06:19", "dhuhr": "12:36", "asr": "15:55", "maghrib": "18:42", "isha": "20:09" },
  { "date": "2025-03-21", "fajr": "04:37", "sunrise": "06:17", "dhuhr": "12:35", "asr": "15:55", "maghrib": "18:44", "isha": "20:11" },
  { "date": "2025-03-22", "fajr": "04:35", "sunrise": "06:15", "dhuhr": "12:35", "asr": "15:56", "maghrib": "18:45", "isha": "20:12" },
  { "date": "2025-03-23", "fajr": "04:33", "sunrise": "06:13", "dhuhr": "12:35", "asr": "15:57", "maghrib": "18:47", "isha": "20:14" },
  { "date": "2025-03-24", "fajr": "04:30", "sunrise": "06:11", "dhuhr": "12:35", "asr": "15:58", "maghrib": "18:48", "isha": "20:16" },
  { "date": "2025-03-25", "fajr": "04:28", "sunrise": "06:09", "dhuhr": "12:34", "asr": "15:59", "maghrib": "18:50", "isha": "20:18" },
  { "date": "2025-03-26", "fajr": "04:25", "sunrise": "06:07", "dhuhr": "12:34", "asr": "16:00", "maghrib": "18:51", "isha": "20:19" },
  { "date": "2025-03-27", "fajr": "04:23", "sunrise": "06:05", "dhuhr": "12:34", "asr": "16:01", "maghrib": "18:53", "isha": "20:21" },
  { "date": "2025-03-28", "fajr": "04:20", "sunrise": "06:03", "dhuhr": "12:33", "asr": "16:01", "maghrib": "18:54", "isha": "20:23" },
  { "date": "2025-03-29", "fajr": "04:18", "sunrise": "06:00", "dhuhr": "12:33", "asr": "16:02", "maghrib": "18:56", "isha": "20:25" }
];

export const bremenRamadanTimes = [
  { "date": "2025-03-01", "weekday": "E shtunë", "fajr": "05:17", "dhuhr": "12:42", "asr": "15:28", "maghrib": "18:09", "isha": "19:44" },
  { "date": "2025-03-02", "weekday": "E diel", "fajr": "05:15", "dhuhr": "12:42", "asr": "15:30", "maghrib": "18:11", "isha": "19:45" },
  { "date": "2025-03-03", "weekday": "E hënë", "fajr": "05:13", "dhuhr": "12:42", "asr": "15:31", "maghrib": "18:13", "isha": "19:47" },
  { "date": "2025-03-04", "weekday": "E martë", "fajr": "05:10", "dhuhr": "12:42", "asr": "15:32", "maghrib": "18:15", "isha": "19:49" },
  { "date": "2025-03-05", "weekday": "E mërkurë", "fajr": "05:08", "dhuhr": "12:41", "asr": "15:34", "maghrib": "18:17", "isha": "19:51" },
  { "date": "2025-03-06", "weekday": "E enjte", "fajr": "05:05", "dhuhr": "12:41", "asr": "15:35", "maghrib": "18:18", "isha": "19:53" },
  { "date": "2025-03-07", "weekday": "E premte", "fajr": "05:03", "dhuhr": "12:41", "asr": "15:36", "maghrib": "18:20", "isha": "19:55" },
  { "date": "2025-03-08", "weekday": "E shtunë", "fajr": "05:01", "dhuhr": "12:41", "asr": "15:37", "maghrib": "18:22", "isha": "19:57" },
  { "date": "2025-03-09", "weekday": "E diel", "fajr": "04:58", "dhuhr": "12:40", "asr": "15:39", "maghrib": "18:24", "isha": "19:59" },
  { "date": "2025-03-10", "weekday": "E hënë", "fajr": "04:56", "dhuhr": "12:40", "asr": "15:40", "maghrib": "18:26", "isha": "20:01" },
  { "date": "2025-03-11", "weekday": "E martë", "fajr": "04:53", "dhuhr": "12:40", "asr": "15:41", "maghrib": "18:28", "isha": "20:03" },
  { "date": "2025-03-12", "weekday": "E mërkurë", "fajr": "04:51", "dhuhr": "12:40", "asr": "15:42", "maghrib": "18:30", "isha": "20:05" },
  { "date": "2025-03-13", "weekday": "E enjte", "fajr": "04:48", "dhuhr": "12:39", "asr": "15:44", "maghrib": "18:31", "isha": "20:07" },
  { "date": "2025-03-14", "weekday": "E premte", "fajr": "04:45", "dhuhr": "12:39", "asr": "15:45", "maghrib": "18:33", "isha": "20:09" },
  { "date": "2025-03-15", "weekday": "E shtunë", "fajr": "04:43", "dhuhr": "12:39", "asr": "15:46", "maghrib": "18:35", "isha": "20:11" },
  { "date": "2025-03-16", "weekday": "E diel", "fajr": "04:40", "dhuhr": "12:38", "asr": "15:47", "maghrib": "18:37", "isha": "20:13" },
  { "date": "2025-03-17", "weekday": "E hënë", "fajr": "04:37", "dhuhr": "12:38", "asr": "15:48", "maghrib": "18:39", "isha": "20:15" },
  { "date": "2025-03-18", "weekday": "E martë", "fajr": "04:35", "dhuhr": "12:38", "asr": "15:49", "maghrib": "18:40", "isha": "20:17" },
  { "date": "2025-03-19", "weekday": "E mërkurë", "fajr": "04:32", "dhuhr": "12:38", "asr": "15:51", "maghrib": "18:42", "isha": "20:19" },
  { "date": "2025-03-20", "weekday": "E enjte", "fajr": "04:29", "dhuhr": "12:37", "asr": "15:52", "maghrib": "18:44", "isha": "20:21" },
  { "date": "2025-03-21", "weekday": "E premte", "fajr": "04:27", "dhuhr": "12:37", "asr": "15:53", "maghrib": "18:46", "isha": "20:23" },
  { "date": "2025-03-22", "weekday": "E shtunë", "fajr": "04:24", "dhuhr": "12:37", "asr": "15:54", "maghrib": "18:48", "isha": "20:25" },
  { "date": "2025-03-23", "weekday": "E diel", "fajr": "04:21", "dhuhr": "12:36", "asr": "15:55", "maghrib": "18:50", "isha": "20:27" },
  { "date": "2025-03-24", "weekday": "E hënë", "fajr": "04:18", "dhuhr": "12:36", "asr": "15:56", "maghrib": "18:51", "isha": "20:29" },
  { "date": "2025-03-25", "weekday": "E martë", "fajr": "04:15", "dhuhr": "12:36", "asr": "15:57", "maghrib": "18:53", "isha": "20:31" },
  { "date": "2025-03-26", "weekday": "E mërkurë", "fajr": "04:12", "dhuhr": "12:36", "asr": "15:58", "maghrib": "18:55", "isha": "20:33" },
  { "date": "2025-03-27", "weekday": "E enjte", "fajr": "04:10", "dhuhr": "12:35", "asr": "15:59", "maghrib": "18:57", "isha": "20:36" },
  { "date": "2025-03-28", "weekday": "E premte", "fajr": "04:07", "dhuhr": "12:35", "asr": "16:00", "maghrib": "18:59", "isha": "20:38" },
  { "date": "2025-03-29", "weekday": "E shtunë", "fajr": "04:04", "dhuhr": "12:35", "asr": "16:01", "maghrib": "19:00", "isha": "20:40" }
];

export const wuppertalRamadanTimes = [
  { "date": "2025-03-01", "weekday": "E shtunë", "fajr": "05:26", "dhuhr": "12:49", "asr": "15:39", "maghrib": "18:18", "isha": "19:48" },
  { "date": "2025-03-02", "weekday": "E diel", "fajr": "05:24", "dhuhr": "12:48", "asr": "15:40", "maghrib": "18:20", "isha": "19:50" },
  { "date": "2025-03-03", "weekday": "E hënë", "fajr": "05:22", "dhuhr": "12:48", "asr": "15:41", "maghrib": "18:21", "isha": "19:52" },
  { "date": "2025-03-04", "weekday": "E martë", "fajr": "05:19", "dhuhr": "12:48", "asr": "15:42", "maghrib": "18:23", "isha": "19:54" },
  { "date": "2025-03-05", "weekday": "E mërkurë", "fajr": "05:17", "dhuhr": "12:48", "asr": "15:44", "maghrib": "18:25", "isha": "19:55" },
  { "date": "2025-03-06", "weekday": "E enjte", "fajr": "05:15", "dhuhr": "12:48", "asr": "15:45", "maghrib": "18:27", "isha": "19:57" },
  { "date": "2025-03-07", "weekday": "E premte", "fajr": "05:13", "dhuhr": "12:47", "asr": "15:46", "maghrib": "18:28", "isha": "19:59" },
  { "date": "2025-03-08", "weekday": "E shtunë", "fajr": "05:10", "dhuhr": "12:47", "asr": "15:47", "maghrib": "18:30", "isha": "20:01" },
  { "date": "2025-03-09", "weekday": "E diel", "fajr": "05:08", "dhuhr": "12:47", "asr": "15:48", "maghrib": "18:32", "isha": "20:02" },
  { "date": "2025-03-10", "weekday": "E hënë", "fajr": "05:06", "dhuhr": "12:47", "asr": "15:49", "maghrib": "18:33", "isha": "20:04" },
  { "date": "2025-03-11", "weekday": "E martë", "fajr": "05:03", "dhuhr": "12:46", "asr": "15:51", "maghrib": "18:35", "isha": "20:06" },
  { "date": "2025-03-12", "weekday": "E mërkurë", "fajr": "05:01", "dhuhr": "12:46", "asr": "15:52", "maghrib": "18:37", "isha": "20:08" },
  { "date": "2025-03-13", "weekday": "E enjte", "fajr": "04:59", "dhuhr": "12:46", "asr": "15:53", "maghrib": "18:39", "isha": "20:10" },
  { "date": "2025-03-14", "weekday": "E premte", "fajr": "04:56", "dhuhr": "12:46", "asr": "15:54", "maghrib": "18:40", "isha": "20:11" },
  { "date": "2025-03-15", "weekday": "E shtunë", "fajr": "04:54", "dhuhr": "12:45", "asr": "15:55", "maghrib": "18:42", "isha": "20:13" },
  { "date": "2025-03-16", "weekday": "E diel", "fajr": "04:51", "dhuhr": "12:45", "asr": "15:56", "maghrib": "18:44", "isha": "20:15" },
  { "date": "2025-03-17", "weekday": "E hënë", "fajr": "04:49", "dhuhr": "12:45", "asr": "15:57", "maghrib": "18:45", "isha": "20:17" },
  { "date": "2025-03-18", "weekday": "E martë", "fajr": "04:46", "dhuhr": "12:44", "asr": "15:58", "maghrib": "18:47", "isha": "20:19" },
  { "date": "2025-03-19", "weekday": "E mërkurë", "fajr": "04:44", "dhuhr": "12:44", "asr": "15:59", "maghrib": "18:49", "isha": "20:21" },
  { "date": "2025-03-20", "weekday": "E enjte", "fajr": "04:41", "dhuhr": "12:44", "asr": "16:00", "maghrib": "18:50", "isha": "20:23" },
  { "date": "2025-03-21", "weekday": "E premte", "fajr": "04:39", "dhuhr": "12:43", "asr": "16:01", "maghrib": "18:52", "isha": "20:24" },
  { "date": "2025-03-22", "weekday": "E shtunë", "fajr": "04:36", "dhuhr": "12:43", "asr": "16:02", "maghrib": "18:54", "isha": "20:26" },
  { "date": "2025-03-23", "weekday": "E diel", "fajr": "04:33", "dhuhr": "12:43", "asr": "16:03", "maghrib": "18:55", "isha": "20:28" },
  { "date": "2025-03-24", "weekday": "E hënë", "fajr": "04:31", "dhuhr": "12:43", "asr": "16:04", "maghrib": "18:57", "isha": "20:30" },
  { "date": "2025-03-25", "weekday": "E martë", "fajr": "04:28", "dhuhr": "12:42", "asr": "16:05", "maghrib": "18:59", "isha": "20:32" },
  { "date": "2025-03-26", "weekday": "E mërkurë", "fajr": "04:25", "dhuhr": "12:42", "asr": "16:06", "maghrib": "19:00", "isha": "20:34" },
  { "date": "2025-03-27", "weekday": "E enjte", "fajr": "04:23", "dhuhr": "12:42", "asr": "16:07", "maghrib": "19:02", "isha": "20:36" },
  { "date": "2025-03-28", "weekday": "E premte", "fajr": "04:20", "dhuhr": "12:41", "asr": "16:08", "maghrib": "19:04", "isha": "20:38" },
  { "date": "2025-03-29", "weekday": "E shtunë", "fajr": "04:17", "dhuhr": "12:41", "asr": "16:09", "maghrib": "19:05", "isha": "20:40" }
];

export const bochumRamadanTimes = [
  { "date": "2025-03-01", "weekday": "E shtunë", "fajr": "05:26", "dhuhr": "12:49", "asr": "15:38", "maghrib": "18:18", "isha": "19:48" },
  { "date": "2025-03-02", "weekday": "E diel", "fajr": "05:23", "dhuhr": "12:48", "asr": "15:39", "maghrib": "18:19", "isha": "19:50" },
  { "date": "2025-03-03", "weekday": "E hënë", "fajr": "05:21", "dhuhr": "12:48", "asr": "15:41", "maghrib": "18:21", "isha": "19:52" },
  { "date": "2025-03-04", "weekday": "E martë", "fajr": "05:19", "dhuhr": "12:48", "asr": "15:42", "maghrib": "18:23", "isha": "19:54" },
  { "date": "2025-03-05", "weekday": "E mërkurë", "fajr": "05:17", "dhuhr": "12:48", "asr": "15:43", "maghrib": "18:25", "isha": "19:55" },
  { "date": "2025-03-06", "weekday": "E enjte", "fajr": "05:15", "dhuhr": "12:47", "asr": "15:44", "maghrib": "18:26", "isha": "19:57" },
  { "date": "2025-03-07", "weekday": "E premte", "fajr": "05:12", "dhuhr": "12:47", "asr": "15:45", "maghrib": "18:28", "isha": "19:59" },
  { "date": "2025-03-08", "weekday": "E shtunë", "fajr": "05:10", "dhuhr": "12:47", "asr": "15:47", "maghrib": "18:30", "isha": "20:01" },
  { "date": "2025-03-09", "weekday": "E diel", "fajr": "05:08", "dhuhr": "12:47", "asr": "15:48", "maghrib": "18:32", "isha": "20:03" },
  { "date": "2025-03-10", "weekday": "E hënë", "fajr": "05:05", "dhuhr": "12:46", "asr": "15:49", "maghrib": "18:33", "isha": "20:04" },
  { "date": "2025-03-11", "weekday": "E martë", "fajr": "05:03", "dhuhr": "12:46", "asr": "15:50", "maghrib": "18:35", "isha": "20:06" },
  { "date": "2025-03-12", "weekday": "E mërkurë", "fajr": "05:00", "dhuhr": "12:46", "asr": "15:51", "maghrib": "18:37", "isha": "20:08" },
  { "date": "2025-03-13", "weekday": "E enjte", "fajr": "04:58", "dhuhr": "12:46", "asr": "15:52", "maghrib": "18:38", "isha": "20:10" },
  { "date": "2025-03-14", "weekday": "E premte", "fajr": "04:56", "dhuhr": "12:45", "asr": "15:53", "maghrib": "18:40", "isha": "20:12" },
  { "date": "2025-03-15", "weekday": "E shtunë", "fajr": "04:53", "dhuhr": "12:45", "asr": "15:55", "maghrib": "18:42", "isha": "20:14" },
  { "date": "2025-03-16", "weekday": "E diel", "fajr": "04:51", "dhuhr": "12:45", "asr": "15:56", "maghrib": "18:44", "isha": "20:15" },
  { "date": "2025-03-17", "weekday": "E hënë", "fajr": "04:48", "dhuhr": "12:45", "asr": "15:57", "maghrib": "18:45", "isha": "20:17" },
  { "date": "2025-03-18", "weekday": "E martë", "fajr": "04:46", "dhuhr": "12:44", "asr": "15:58", "maghrib": "18:47", "isha": "20:19" },
  { "date": "2025-03-19", "weekday": "E mërkurë", "fajr": "04:43", "dhuhr": "12:44", "asr": "15:59", "maghrib": "18:49", "isha": "20:21" },
  { "date": "2025-03-20", "weekday": "E enjte", "fajr": "04:41", "dhuhr": "12:44", "asr": "16:00", "maghrib": "18:50", "isha": "20:23" },
  { "date": "2025-03-21", "weekday": "E premte", "fajr": "04:38", "dhuhr": "12:43", "asr": "16:01", "maghrib": "18:52", "isha": "20:25" },
  { "date": "2025-03-22", "weekday": "E shtunë", "fajr": "04:35", "dhuhr": "12:43", "asr": "16:02", "maghrib": "18:54", "isha": "20:27" },
  { "date": "2025-03-23", "weekday": "E diel", "fajr": "04:33", "dhuhr": "12:43", "asr": "16:03", "maghrib": "18:55", "isha": "20:29" },
  { "date": "2025-03-24", "weekday": "E hënë", "fajr": "04:30", "dhuhr": "12:42", "asr": "16:04", "maghrib": "18:57", "isha": "20:31" },
  { "date": "2025-03-25", "weekday": "E martë", "fajr": "04:27", "dhuhr": "12:42", "asr": "16:05", "maghrib": "18:59", "isha": "20:33" },
  { "date": "2025-03-26", "weekday": "E mërkurë", "fajr": "04:25", "dhuhr": "12:42", "asr": "16:06", "maghrib": "19:00", "isha": "20:35" },
  { "date": "2025-03-27", "weekday": "E enjte", "fajr": "04:22", "dhuhr": "12:42", "asr": "16:07", "maghrib": "19:02", "isha": "20:37" },
  { "date": "2025-03-28", "weekday": "E premte", "fajr": "04:19", "dhuhr": "12:41", "asr": "16:08", "maghrib": "19:04", "isha": "20:39" },
  { "date": "2025-03-29", "weekday": "E shtunë", "fajr": "04:17", "dhuhr": "12:41", "asr": "16:09", "maghrib": "19:05", "isha": "20:41" }
];

export const duisburgRamadanTimes = [
  { "date": "2025-03-01", "weekday": "E shtunë", "fajr": "05:27", "dhuhr": "12:50", "asr": "15:40", "maghrib": "18:19", "isha": "19:50" },
  { "date": "2025-03-02", "weekday": "E diel", "fajr": "05:25", "dhuhr": "12:50", "asr": "15:41", "maghrib": "18:21", "isha": "19:52" },
  { "date": "2025-03-03", "weekday": "E hënë", "fajr": "05:23", "dhuhr": "12:50", "asr": "15:42", "maghrib": "18:23", "isha": "19:54" },
  { "date": "2025-03-04", "weekday": "E martë", "fajr": "05:21", "dhuhr": "12:50", "asr": "15:44", "maghrib": "18:25", "isha": "19:56" },
  { "date": "2025-03-05", "weekday": "E mërkurë", "fajr": "05:19", "dhuhr": "12:50", "asr": "15:45", "maghrib": "18:26", "isha": "19:57" },
  { "date": "2025-03-06", "weekday": "E enjte", "fajr": "05:16", "dhuhr": "12:49", "asr": "15:46", "maghrib": "18:28", "isha": "19:59" },
  { "date": "2025-03-07", "weekday": "E premte", "fajr": "05:14", "dhuhr": "12:49", "asr": "15:47", "maghrib": "18:30", "isha": "20:01" },
  { "date": "2025-03-08", "weekday": "E shtunë", "fajr": "05:12", "dhuhr": "12:49", "asr": "15:48", "maghrib": "18:32", "isha": "20:03" },
  { "date": "2025-03-09", "weekday": "E diel", "fajr": "05:09", "dhuhr": "12:49", "asr": "15:50", "maghrib": "18:33", "isha": "20:04" },
  { "date": "2025-03-10", "weekday": "E hënë", "fajr": "05:07", "dhuhr": "12:48", "asr": "15:51", "maghrib": "18:35", "isha": "20:06" },
  { "date": "2025-03-11", "weekday": "E martë", "fajr": "05:05", "dhuhr": "12:48", "asr": "15:52", "maghrib": "18:37", "isha": "20:08" },
  { "date": "2025-03-12", "weekday": "E mërkurë", "fajr": "05:02", "dhuhr": "12:48", "asr": "15:53", "maghrib": "18:39", "isha": "20:10" },
  { "date": "2025-03-13", "weekday": "E enjte", "fajr": "05:00", "dhuhr": "12:48", "asr": "15:54", "maghrib": "18:40", "isha": "20:12" },
  { "date": "2025-03-14", "weekday": "E premte", "fajr": "04:57", "dhuhr": "12:47", "asr": "15:55", "maghrib": "18:42", "isha": "20:14" },
  { "date": "2025-03-15", "weekday": "E shtunë", "fajr": "04:55", "dhuhr": "12:47", "asr": "15:56", "maghrib": "18:44", "isha": "20:15" },
  { "date": "2025-03-16", "weekday": "E diel", "fajr": "04:52", "dhuhr": "12:47", "asr": "15:57", "maghrib": "18:45", "isha": "20:17" },
  { "date": "2025-03-17", "weekday": "E hënë", "fajr": "04:50", "dhuhr": "12:46", "asr": "15:59", "maghrib": "18:47", "isha": "20:19" },
  { "date": "2025-03-18", "weekday": "E martë", "fajr": "04:47", "dhuhr": "12:46", "asr": "16:00", "maghrib": "18:49", "isha": "20:21" },
  { "date": "2025-03-19", "weekday": "E mërkurë", "fajr": "04:45", "dhuhr": "12:46", "asr": "16:01", "maghrib": "18:50", "isha": "20:23" },
  { "date": "2025-03-20", "weekday": "E enjte", "fajr": "04:42", "dhuhr": "12:46", "asr": "16:02", "maghrib": "18:52", "isha": "20:25" },
  { "date": "2025-03-21", "weekday": "E premte", "fajr": "04:40", "dhuhr": "12:45", "asr": "16:03", "maghrib": "18:54", "isha": "20:27" },
  { "date": "2025-03-22", "weekday": "E shtunë", "fajr": "04:37", "dhuhr": "12:45", "asr": "16:04", "maghrib": "18:56", "isha": "20:29" },
  { "date": "2025-03-23", "weekday": "E diel", "fajr": "04:35", "dhuhr": "12:45", "asr": "16:05", "maghrib": "18:57", "isha": "20:31" },
  { "date": "2025-03-24", "weekday": "E hënë", "fajr": "04:32", "dhuhr": "12:44", "asr": "16:06", "maghrib": "18:59", "isha": "20:33" },
  { "date": "2025-03-25", "weekday": "E martë", "fajr": "04:29", "dhuhr": "12:44", "asr": "16:07", "maghrib": "19:01", "isha": "20:35" },
  { "date": "2025-03-26", "weekday": "E mërkurë", "fajr": "04:27", "dhuhr": "12:44", "asr": "16:08", "maghrib": "19:02", "isha": "20:37" },
  { "date": "2025-03-27", "weekday": "E enjte", "fajr": "04:24", "dhuhr": "12:43", "asr": "16:09", "maghrib": "19:04", "isha": "20:39" },
  { "date": "2025-03-28", "weekday": "E premte", "fajr": "04:21", "dhuhr": "12:43", "asr": "16:10", "maghrib": "19:06", "isha": "20:41" },
  { "date": "2025-03-29", "weekday": "E shtunë", "fajr": "04:18", "dhuhr": "12:43", "asr": "16:10", "maghrib": "19:07", "isha": "20:43" }
];

export const moenchengladbachRamadanTimes = [
  { "date": "2025-03-01", "weekday": "E shtunë", "fajr": "05:29", "dhuhr": "12:52", "asr": "15:42", "maghrib": "18:21", "isha": "19:51" },
  { "date": "2025-03-02", "weekday": "E diel", "fajr": "05:27", "dhuhr": "12:51", "asr": "15:43", "maghrib": "18:23", "isha": "19:53" },
  { "date": "2025-03-03", "weekday": "E hënë", "fajr": "05:25", "dhuhr": "12:51", "asr": "15:44", "maghrib": "18:24", "isha": "19:55" },
  { "date": "2025-03-04", "weekday": "E martë", "fajr": "05:23", "dhuhr": "12:51", "asr": "15:45", "maghrib": "18:26", "isha": "19:56" },
  { "date": "2025-03-05", "weekday": "E mërkurë", "fajr": "05:20", "dhuhr": "12:51", "asr": "15:47", "maghrib": "18:28", "isha": "19:58" },
  { "date": "2025-03-06", "weekday": "E enjte", "fajr": "05:18", "dhuhr": "12:51", "asr": "15:48", "maghrib": "18:30", "isha": "20:00" },
  { "date": "2025-03-07", "weekday": "E premte", "fajr": "05:16", "dhuhr": "12:50", "asr": "15:49", "maghrib": "18:31", "isha": "20:02" },
  { "date": "2025-03-08", "weekday": "E shtunë", "fajr": "05:14", "dhuhr": "12:50", "asr": "15:50", "maghrib": "18:33", "isha": "20:03" },
  { "date": "2025-03-09", "weekday": "E diel", "fajr": "05:11", "dhuhr": "12:50", "asr": "15:51", "maghrib": "18:35", "isha": "20:05" },
  { "date": "2025-03-10", "weekday": "E hënë", "fajr": "05:09", "dhuhr": "12:50", "asr": "15:53", "maghrib": "18:37", "isha": "20:07" },
  { "date": "2025-03-11", "weekday": "E martë", "fajr": "05:07", "dhuhr": "12:49", "asr": "15:54", "maghrib": "18:38", "isha": "20:09" },
  { "date": "2025-03-12", "weekday": "E mërkurë", "fajr": "05:04", "dhuhr": "12:49", "asr": "15:55", "maghrib": "18:40", "isha": "20:11" },
  { "date": "2025-03-13", "weekday": "E enjte", "fajr": "05:02", "dhuhr": "12:49", "asr": "15:56", "maghrib": "18:42", "isha": "20:12" },
  { "date": "2025-03-14", "weekday": "E premte", "fajr": "04:59", "dhuhr": "12:49", "asr": "15:57", "maghrib": "18:43", "isha": "20:14" },
  { "date": "2025-03-15", "weekday": "E shtunë", "fajr": "04:57", "dhuhr": "12:48", "asr": "15:58", "maghrib": "18:45", "isha": "20:16" },
  { "date": "2025-03-16", "weekday": "E diel", "fajr": "04:54", "dhuhr": "12:48", "asr": "15:59", "maghrib": "18:47", "isha": "20:18" },
  { "date": "2025-03-17", "weekday": "E hënë", "fajr": "04:52", "dhuhr": "12:48", "asr": "16:00", "maghrib": "18:48", "isha": "20:20" },
  { "date": "2025-03-18", "weekday": "E martë", "fajr": "04:50", "dhuhr": "12:47", "asr": "16:01", "maghrib": "18:50", "isha": "20:22" },
  { "date": "2025-03-19", "weekday": "E mërkurë", "fajr": "04:47", "dhuhr": "12:47", "asr": "16:02", "maghrib": "18:52", "isha": "20:24" },
  { "date": "2025-03-20", "weekday": "E enjte", "fajr": "04:44", "dhuhr": "12:47", "asr": "16:03", "maghrib": "18:53", "isha": "20:25" },
  { "date": "2025-03-21", "weekday": "E premte", "fajr": "04:42", "dhuhr": "12:47", "asr": "16:04", "maghrib": "18:55", "isha": "20:27" },
  { "date": "2025-03-22", "weekday": "E shtunë", "fajr": "04:39", "dhuhr": "12:46", "asr": "16:05", "maghrib": "18:57", "isha": "20:29" },
  { "date": "2025-03-23", "weekday": "E diel", "fajr": "04:37", "dhuhr": "12:46", "asr": "16:06", "maghrib": "18:58", "isha": "20:31" },
  { "date": "2025-03-24", "weekday": "E hënë", "fajr": "04:34", "dhuhr": "12:46", "asr": "16:07", "maghrib": "19:00", "isha": "20:33" },
  { "date": "2025-03-25", "weekday": "E martë", "fajr": "04:31", "dhuhr": "12:45", "asr": "16:08", "maghrib": "19:02", "isha": "20:35" },
  { "date": "2025-03-26", "weekday": "E mërkurë", "fajr": "04:29", "dhuhr": "12:45", "asr": "16:09", "maghrib": "19:03", "isha": "20:37" },
  { "date": "2025-03-27", "weekday": "E enjte", "fajr": "04:26", "dhuhr": "12:45", "asr": "16:10", "maghrib": "19:05", "isha": "20:39" },
  { "date": "2025-03-28", "weekday": "E premte", "fajr": "04:23", "dhuhr": "12:44", "asr": "16:11", "maghrib": "19:07", "isha": "20:41" },
  { "date": "2025-03-29", "weekday": "E shtunë", "fajr": "04:21", "dhuhr": "12:44", "asr": "16:12", "maghrib": "19:08", "isha": "20:43" }
];

export const darmstadtRamadanTimes = [
  { "date": "2025-03-01", "weekday": "E shtunë", "fajr": "05:22", "dhuhr": "12:43", "asr": "15:36", "maghrib": "18:14", "isha": "19:41" },
  { "date": "2025-03-02", "weekday": "E diel", "fajr": "05:20", "dhuhr": "12:43", "asr": "15:37", "maghrib": "18:15", "isha": "19:43" },
  { "date": "2025-03-03", "weekday": "E hënë", "fajr": "05:18", "dhuhr": "12:42", "asr": "15:38", "maghrib": "18:17", "isha": "19:45" },
  { "date": "2025-03-04", "weekday": "E martë", "fajr": "05:16", "dhuhr": "12:42", "asr": "15:39", "maghrib": "18:19", "isha": "19:46" },
  { "date": "2025-03-05", "weekday": "E mërkurë", "fajr": "05:13", "dhuhr": "12:42", "asr": "15:40", "maghrib": "18:20", "isha": "19:48" },
  { "date": "2025-03-06", "weekday": "E enjte", "fajr": "05:11", "dhuhr": "12:42", "asr": "15:41", "maghrib": "18:22", "isha": "19:50" },
  { "date": "2025-03-07", "weekday": "E premte", "fajr": "05:09", "dhuhr": "12:42", "asr": "15:42", "maghrib": "18:24", "isha": "19:51" },
  { "date": "2025-03-08", "weekday": "E shtunë", "fajr": "05:07", "dhuhr": "12:41", "asr": "15:44", "maghrib": "18:25", "isha": "19:53" },
  { "date": "2025-03-09", "weekday": "E diel", "fajr": "05:05", "dhuhr": "12:41", "asr": "15:45", "maghrib": "18:27", "isha": "19:55" },
  { "date": "2025-03-10", "weekday": "E hënë", "fajr": "05:02", "dhuhr": "12:41", "asr": "15:46", "maghrib": "18:29", "isha": "19:56" },
  { "date": "2025-03-11", "weekday": "E martë", "fajr": "05:00", "dhuhr": "12:41", "asr": "15:47", "maghrib": "18:30", "isha": "19:58" },
  { "date": "2025-03-12", "weekday": "E mërkurë", "fajr": "04:58", "dhuhr": "12:40", "asr": "15:48", "maghrib": "18:32", "isha": "20:00" },
  { "date": "2025-03-13", "weekday": "E enjte", "fajr": "04:56", "dhuhr": "12:40", "asr": "15:49", "maghrib": "18:33", "isha": "20:01" },
  { "date": "2025-03-14", "weekday": "E premte", "fajr": "04:53", "dhuhr": "12:40", "asr": "15:50", "maghrib": "18:35", "isha": "20:03" },
  { "date": "2025-03-15", "weekday": "E shtunë", "fajr": "04:51", "dhuhr": "12:39", "asr": "15:51", "maghrib": "18:37", "isha": "20:05" },
  { "date": "2025-03-16", "weekday": "E diel", "fajr": "04:49", "dhuhr": "12:39", "asr": "15:52", "maghrib": "18:38", "isha": "20:07" },
  { "date": "2025-03-17", "weekday": "E hënë", "fajr": "04:46", "dhuhr": "12:39", "asr": "15:53", "maghrib": "18:40", "isha": "20:08" },
  { "date": "2025-03-18", "weekday": "E martë", "fajr": "04:44", "dhuhr": "12:39", "asr": "15:54", "maghrib": "18:41", "isha": "20:10" },
  { "date": "2025-03-19", "weekday": "E mërkurë", "fajr": "04:42", "dhuhr": "12:38", "asr": "15:55", "maghrib": "18:43", "isha": "20:12" },
  { "date": "2025-03-20", "weekday": "E enjte", "fajr": "04:39", "dhuhr": "12:38", "asr": "15:56", "maghrib": "18:44", "isha": "20:14" },
  { "date": "2025-03-21", "weekday": "E premte", "fajr": "04:37", "dhuhr": "12:38", "asr": "15:57", "maghrib": "18:46", "isha": "20:15" },
  { "date": "2025-03-22", "weekday": "E shtunë", "fajr": "04:34", "dhuhr": "12:37", "asr": "15:58", "maghrib": "18:48", "isha": "20:17" },
  { "date": "2025-03-23", "weekday": "E diel", "fajr": "04:32", "dhuhr": "12:37", "asr": "15:59", "maghrib": "18:49", "isha": "20:19" },
  { "date": "2025-03-24", "weekday": "E hënë", "fajr": "04:29", "dhuhr": "12:37", "asr": "15:59", "maghrib": "18:51", "isha": "20:21" },
  { "date": "2025-03-25", "weekday": "E martë", "fajr": "04:27", "dhuhr": "12:36", "asr": "16:00", "maghrib": "18:52", "isha": "20:23" },
  { "date": "2025-03-26", "weekday": "E mërkurë", "fajr": "04:24", "dhuhr": "12:36", "asr": "16:01", "maghrib": "18:54", "isha": "20:24" },
  { "date": "2025-03-27", "weekday": "E enjte", "fajr": "04:22", "dhuhr": "12:36", "asr": "16:02", "maghrib": "18:56", "isha": "20:26" },
  { "date": "2025-03-28", "weekday": "E premte", "fajr": "04:19", "dhuhr": "12:36", "asr": "16:03", "maghrib": "18:57", "isha": "20:28" },
  { "date": "2025-03-29", "weekday": "E shtunë", "fajr": "04:17", "dhuhr": "12:35", "asr": "16:04", "maghrib": "18:59", "isha": "20:30" }
];

export const wiesbadenRamadanTimes = [
  { "date": "2025-03-01", "weekday": "Monday", "fajr": "05:23", "dhuhr": "12:44", "asr": "15:37", "maghrib": "18:15", "isha": "19:43" },
  { "date": "2025-03-02", "weekday": "Tuesday", "fajr": "05:21", "dhuhr": "12:44", "asr": "15:38", "maghrib": "18:17", "isha": "19:45" },
  { "date": "2025-03-03", "weekday": "Wednesday", "fajr": "05:19", "dhuhr": "12:44", "asr": "15:39", "maghrib": "18:19", "isha": "19:46" },
  { "date": "2025-03-04", "weekday": "Thursday", "fajr": "05:17", "dhuhr": "12:44", "asr": "15:40", "maghrib": "18:20", "isha": "19:48" },
  { "date": "2025-03-05", "weekday": "Friday", "fajr": "05:15", "dhuhr": "12:44", "asr": "15:42", "maghrib": "18:22", "isha": "19:50" },
  { "date": "2025-03-06", "weekday": "Saturday", "fajr": "05:13", "dhuhr": "12:43", "asr": "15:43", "maghrib": "18:23", "isha": "19:51" },
  { "date": "2025-03-07", "weekday": "Sunday", "fajr": "05:10", "dhuhr": "12:43", "asr": "15:44", "maghrib": "18:25", "isha": "19:53" },
  { "date": "2025-03-08", "weekday": "Monday", "fajr": "05:08", "dhuhr": "12:43", "asr": "15:45", "maghrib": "18:27", "isha": "19:55" },
  { "date": "2025-03-09", "weekday": "Tuesday", "fajr": "05:06", "dhuhr": "12:43", "asr": "15:46", "maghrib": "18:28", "isha": "19:56" },
  { "date": "2025-03-10", "weekday": "Wednesday", "fajr": "05:04", "dhuhr": "12:42", "asr": "15:47", "maghrib": "18:30", "isha": "19:58" },
  { "date": "2025-03-11", "weekday": "Thursday", "fajr": "05:02", "dhuhr": "12:42", "asr": "15:48", "maghrib": "18:32", "isha": "20:00" },
  { "date": "2025-03-12", "weekday": "Friday", "fajr": "04:59", "dhuhr": "12:42", "asr": "15:49", "maghrib": "18:33", "isha": "20:02" },
  { "date": "2025-03-13", "weekday": "Saturday", "fajr": "04:57", "dhuhr": "12:42", "asr": "15:50", "maghrib": "18:35", "isha": "20:03" },
  { "date": "2025-03-14", "weekday": "Sunday", "fajr": "04:55", "dhuhr": "12:41", "asr": "15:51", "maghrib": "18:37", "isha": "20:05" },
  { "date": "2025-03-15", "weekday": "Monday", "fajr": "04:52", "dhuhr": "12:41", "asr": "15:52", "maghrib": "18:38", "isha": "20:07" },
  { "date": "2025-03-16", "weekday": "Tuesday", "fajr": "04:50", "dhuhr": "12:41", "asr": "15:53", "maghrib": "18:40", "isha": "20:09" },
  { "date": "2025-03-17", "weekday": "Wednesday", "fajr": "04:48", "dhuhr": "12:41", "asr": "15:54", "maghrib": "18:41", "isha": "20:10" },
  { "date": "2025-03-18", "weekday": "Thursday", "fajr": "04:45", "dhuhr": "12:40", "asr": "15:55", "maghrib": "18:43", "isha": "20:12" },
  { "date": "2025-03-19", "weekday": "Friday", "fajr": "04:43", "dhuhr": "12:40", "asr": "15:56", "maghrib": "18:45", "isha": "20:14" },
  { "date": "2025-03-20", "weekday": "Saturday", "fajr": "04:40", "dhuhr": "12:40", "asr": "15:57", "maghrib": "18:46", "isha": "20:16" },
  { "date": "2025-03-21", "weekday": "Sunday", "fajr": "04:38", "dhuhr": "12:39", "asr": "15:58", "maghrib": "18:48", "isha": "20:17" },
  { "date": "2025-03-22", "weekday": "Monday", "fajr": "04:35", "dhuhr": "12:39", "asr": "15:59", "maghrib": "18:49", "isha": "20:19" },
  { "date": "2025-03-23", "weekday": "Tuesday", "fajr": "04:33", "dhuhr": "12:39", "asr": "16:00", "maghrib": "18:51", "isha": "20:21" },
  { "date": "2025-03-24", "weekday": "Wednesday", "fajr": "04:30", "dhuhr": "12:38", "asr": "16:01", "maghrib": "18:53", "isha": "20:23" },
  { "date": "2025-03-25", "weekday": "Thursday", "fajr": "04:28", "dhuhr": "12:38", "asr": "16:02", "maghrib": "18:54", "isha": "20:25" },
  { "date": "2025-03-26", "weekday": "Friday", "fajr": "04:25", "dhuhr": "12:38", "asr": "16:03", "maghrib": "18:56", "isha": "20:27" },
  { "date": "2025-03-27", "weekday": "Saturday", "fajr": "04:23", "dhuhr": "12:38", "asr": "16:04", "maghrib": "18:57", "isha": "20:28" },
  { "date": "2025-03-28", "weekday": "Sunday", "fajr": "04:20", "dhuhr": "12:37", "asr": "16:05", "maghrib": "18:59", "isha": "20:30" },
  { "date": "2025-03-29", "weekday": "Monday", "fajr": "04:18", "dhuhr": "12:37", "asr": "16:05", "maghrib": "19:00", "isha": "20:32" }
];

export const muensterRamadanTimes = [
  { "date": "2025-03-01", "weekday": "E Hënë", "fajr": "05:23", "dhuhr": "12:47", "asr": "15:35", "maghrib": "18:15", "isha": "19:47" },
  { "date": "2025-03-02", "weekday": "E Martë", "fajr": "05:21", "dhuhr": "12:47", "asr": "15:37", "maghrib": "18:17", "isha": "19:49" },
  { "date": "2025-03-03", "weekday": "E Mërkurë", "fajr": "05:19", "dhuhr": "12:46", "asr": "15:38", "maghrib": "18:19", "isha": "19:51" },
  { "date": "2025-03-04", "weekday": "E Enjte", "fajr": "05:17", "dhuhr": "12:46", "asr": "15:39", "maghrib": "18:21", "isha": "19:53" },
  { "date": "2025-03-05", "weekday": "E Premte", "fajr": "05:14", "dhuhr": "12:46", "asr": "15:41", "maghrib": "18:22", "isha": "19:54" },
  { "date": "2025-03-06", "weekday": "E Shtunë", "fajr": "05:12", "dhuhr": "12:46", "asr": "15:42", "maghrib": "18:24", "isha": "19:56" },
  { "date": "2025-03-07", "weekday": "E Diel", "fajr": "05:10", "dhuhr": "12:46", "asr": "15:43", "maghrib": "18:26", "isha": "19:58" },
  { "date": "2025-03-08", "weekday": "E Hënë", "fajr": "05:07", "dhuhr": "12:45", "asr": "15:44", "maghrib": "18:28", "isha": "20:00" },
  { "date": "2025-03-09", "weekday": "E Martë", "fajr": "05:05", "dhuhr": "12:45", "asr": "15:45", "maghrib": "18:30", "isha": "20:02" },
  { "date": "2025-03-10", "weekday": "E Mërkurë", "fajr": "05:03", "dhuhr": "12:45", "asr": "15:47", "maghrib": "18:31", "isha": "20:04" },
  { "date": "2025-03-11", "weekday": "E Enjte", "fajr": "05:00", "dhuhr": "12:45", "asr": "15:48", "maghrib": "18:33", "isha": "20:05" },
  { "date": "2025-03-12", "weekday": "E Premte", "fajr": "04:58", "dhuhr": "12:44", "asr": "15:49", "maghrib": "18:35", "isha": "20:07" },
  { "date": "2025-03-13", "weekday": "E Shtunë", "fajr": "04:55", "dhuhr": "12:44", "asr": "15:50", "maghrib": "18:37", "isha": "20:09" },
  { "date": "2025-03-14", "weekday": "E Diel", "fajr": "04:53", "dhuhr": "12:44", "asr": "15:51", "maghrib": "18:38", "isha": "20:11" },
  { "date": "2025-03-15", "weekday": "E Hënë", "fajr": "04:50", "dhuhr": "12:44", "asr": "15:52", "maghrib": "18:40", "isha": "20:13" },
  { "date": "2025-03-16", "weekday": "E Martë", "fajr": "04:48", "dhuhr": "12:43", "asr": "15:53", "maghrib": "18:42", "isha": "20:15" },
  { "date": "2025-03-17", "weekday": "E Mërkurë", "fajr": "04:45", "dhuhr": "12:43", "asr": "15:55", "maghrib": "18:44", "isha": "20:17" },
  { "date": "2025-03-18", "weekday": "E Enjte", "fajr": "04:43", "dhuhr": "12:43", "asr": "15:56", "maghrib": "18:45", "isha": "20:19" },
  { "date": "2025-03-19", "weekday": "E Premte", "fajr": "04:40", "dhuhr": "12:42", "asr": "15:57", "maghrib": "18:47", "isha": "20:21" },
  { "date": "2025-03-20", "weekday": "E Shtunë", "fajr": "04:38", "dhuhr": "12:42", "asr": "15:58", "maghrib": "18:49", "isha": "20:23" },
  { "date": "2025-03-21", "weekday": "E Diel", "fajr": "04:35", "dhuhr": "12:42", "asr": "15:59", "maghrib": "18:50", "isha": "20:25" },
  { "date": "2025-03-22", "weekday": "E Hënë", "fajr": "04:32", "dhuhr": "12:41", "asr": "16:00", "maghrib": "18:52", "isha": "20:26" },
  { "date": "2025-03-23", "weekday": "E Martë", "fajr": "04:30", "dhuhr": "12:41", "asr": "16:01", "maghrib": "18:54", "isha": "20:28" },
  { "date": "2025-03-24", "weekday": "E Mërkurë", "fajr": "04:27", "dhuhr": "12:41", "asr": "16:02", "maghrib": "18:56", "isha": "20:30" },
  { "date": "2025-03-25", "weekday": "E Enjte", "fajr": "04:24", "dhuhr": "12:41", "asr": "16:03", "maghrib": "18:57", "isha": "20:33" },
  { "date": "2025-03-26", "weekday": "E Premte", "fajr": "04:21", "dhuhr": "12:40", "asr": "16:04", "maghrib": "18:59", "isha": "20:35" },
  { "date": "2025-03-27", "weekday": "E Shtunë", "fajr": "04:19", "dhuhr": "12:40", "asr": "16:05", "maghrib": "19:01", "isha": "20:37" },
  { "date": "2025-03-28", "weekday": "E Diel", "fajr": "04:16", "dhuhr": "12:40", "asr": "16:06", "maghrib": "19:02", "isha": "20:39" },
  { "date": "2025-03-29", "weekday": "E Hënë", "fajr": "04:13", "dhuhr": "12:39", "asr": "16:07", "maghrib": "19:04", "isha": "20:41" }
];

export const nuernbergRamadanTimes = [
  { "date": "2025-03-01", "weekday": "E Hënë", "fajr": "05:13", "dhuhr": "12:33", "asr": "15:27", "maghrib": "18:05", "isha": "19:31" },
  { "date": "2025-03-02", "weekday": "E Martë", "fajr": "05:11", "dhuhr": "12:33", "asr": "15:28", "maghrib": "18:06", "isha": "19:33" },
  { "date": "2025-03-03", "weekday": "E Mërkurë", "fajr": "05:08", "dhuhr": "12:33", "asr": "15:29", "maghrib": "18:08", "isha": "19:35" },
  { "date": "2025-03-04", "weekday": "E Enjte", "fajr": "05:06", "dhuhr": "12:33", "asr": "15:30", "maghrib": "18:10", "isha": "19:36" },
  { "date": "2025-03-05", "weekday": "E Premte", "fajr": "05:04", "dhuhr": "12:32", "asr": "15:31", "maghrib": "18:11", "isha": "19:38" },
  { "date": "2025-03-06", "weekday": "E Shtunë", "fajr": "05:02", "dhuhr": "12:32", "asr": "15:32", "maghrib": "18:13", "isha": "19:39" },
  { "date": "2025-03-07", "weekday": "E Diel", "fajr": "05:00", "dhuhr": "12:32", "asr": "15:33", "maghrib": "18:14", "isha": "19:41" },
  { "date": "2025-03-08", "weekday": "E Hënë", "fajr": "04:58", "dhuhr": "12:32", "asr": "15:35", "maghrib": "18:16", "isha": "19:43" },
  { "date": "2025-03-09", "weekday": "E Martë", "fajr": "04:56", "dhuhr": "12:31", "asr": "15:36", "maghrib": "18:18", "isha": "19:44" },
  { "date": "2025-03-10", "weekday": "E Mërkurë", "fajr": "04:54", "dhuhr": "12:31", "asr": "15:37", "maghrib": "18:19", "isha": "19:46" },
  { "date": "2025-03-11", "weekday": "E Enjte", "fajr": "04:51", "dhuhr": "12:31", "asr": "15:38", "maghrib": "18:21", "isha": "19:48" },
  { "date": "2025-03-12", "weekday": "E Premte", "fajr": "04:49", "dhuhr": "12:31", "asr": "15:39", "maghrib": "18:22", "isha": "19:49" },
  { "date": "2025-03-13", "weekday": "E Shtunë", "fajr": "04:47", "dhuhr": "12:30", "asr": "15:40", "maghrib": "18:24", "isha": "19:51" },
  { "date": "2025-03-14", "weekday": "E Diel", "fajr": "04:45", "dhuhr": "12:30", "asr": "15:41", "maghrib": "18:25", "isha": "19:53" },
  { "date": "2025-03-15", "weekday": "E Hënë", "fajr": "04:42", "dhuhr": "12:30", "asr": "15:42", "maghrib": "18:27", "isha": "19:54" },
  { "date": "2025-03-16", "weekday": "E Martë", "fajr": "04:40", "dhuhr": "12:30", "asr": "15:43", "maghrib": "18:29", "isha": "19:56" },
  { "date": "2025-03-17", "weekday": "E Mërkurë", "fajr": "04:38", "dhuhr": "12:29", "asr": "15:44", "maghrib": "18:30", "isha": "19:58" },
  { "date": "2025-03-18", "weekday": "E Enjte", "fajr": "04:35", "dhuhr": "12:29", "asr": "15:45", "maghrib": "18:32", "isha": "19:59" },
  { "date": "2025-03-19", "weekday": "E Premte", "fajr": "04:33", "dhuhr": "12:29", "asr": "15:46", "maghrib": "18:33", "isha": "20:01" },
  { "date": "2025-03-20", "weekday": "E Shtunë", "fajr": "04:31", "dhuhr": "12:28", "asr": "15:47", "maghrib": "18:35", "isha": "20:03" },
  { "date": "2025-03-21", "weekday": "E Diel", "fajr": "04:28", "dhuhr": "12:28", "asr": "15:47", "maghrib": "18:36", "isha": "20:05" },
  { "date": "2025-03-22", "weekday": "E Hënë", "fajr": "04:26", "dhuhr": "12:28", "asr": "15:48", "maghrib": "18:38", "isha": "20:06" },
  { "date": "2025-03-23", "weekday": "E Martë", "fajr": "04:23", "dhuhr": "12:27", "asr": "15:49", "maghrib": "18:39", "isha": "20:08" },
  { "date": "2025-03-24", "weekday": "E Mërkurë", "fajr": "04:21", "dhuhr": "12:27", "asr": "15:50", "maghrib": "18:41", "isha": "20:10" },
  { "date": "2025-03-25", "weekday": "E Enjte", "fajr": "04:18", "dhuhr": "12:27", "asr": "15:51", "maghrib": "18:43", "isha": "20:12" },
  { "date": "2025-03-26", "weekday": "E Premte", "fajr": "04:16", "dhuhr": "12:27", "asr": "15:52", "maghrib": "18:44", "isha": "20:14" },
  { "date": "2025-03-27", "weekday": "E Shtunë", "fajr": "04:13", "dhuhr": "12:26", "asr": "15:53", "maghrib": "18:46", "isha": "20:15" },
  { "date": "2025-03-28", "weekday": "E Diel", "fajr": "04:11", "dhuhr": "12:26", "asr": "15:54", "maghrib": "18:47", "isha": "20:17" },
  { "date": "2025-03-29", "weekday": "E Hënë", "fajr": "04:08", "dhuhr": "12:26", "asr": "15:54", "maghrib": "18:49", "isha": "20:19" }
];

