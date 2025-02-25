interface PrayerTime {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

interface CityAdjustment {
  name: string;
  nameAlb: string;
  adjustment: {
    fajr: number;    // minutes to add/subtract
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
  
  // Get base times from the appropriate country or city
  let baseTime;
  
  // Handle Austrian cities with direct times
  if (cityId === 'wolfsberg') {
    baseTime = wolfsbergRamadanTimes.find(day => day.date === date);
  } else if (cityId === 'vienna') {
    baseTime = austriaRamadanTimes.find(day => day.date === date);
  } else if (cityId === 'graz') {
    baseTime = grazRamadanTimes.find(day => day.date === date);
  } else if (cityId === 'linz') {
    baseTime = linzRamadanTimes.find(day => day.date === date);
  } else if (cityId === 'salzburg') {
    baseTime = salzburgRamadanTimes.find(day => day.date === date);
  } else if (cityId === 'innsbruck') {
    baseTime = innsbruckRamadanTimes.find(day => day.date === date);
  } else if (cityId === 'villach') {
    baseTime = villachRamadanTimes.find(day => day.date === date);
  } else if (cityId === 'bregenz') {
    baseTime = bregenzRamadanTimes.find(day => day.date === date);
  } else if (isKosovoCity) {
    baseTime = kosovoRamadanTimes.find(day => day.date === date);
  } else if (isSwissCity) {
    baseTime = swissRamadanTimes.find(day => day.date === date);
  } else {
    baseTime = ramadanTimes.find(day => day.date === date);
  }

  if (!baseTime) return null;

  // For cities with direct times (Austrian cities that have their own data)
  if (cityId === 'wolfsberg' || cityId === 'vienna' || cityId === 'graz' || cityId === 'linz' || cityId === 'salzburg' || cityId === 'innsbruck' || cityId === 'villach' || cityId === 'bregenz') {
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
};

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

// Time adjustments for Swiss cities relative to Zurich
export const swissCityAdjustments: Record<string, CityAdjustment> = {
  zurich: {
    name: "Zürich",
    nameAlb: "Zürich",
    adjustment: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  },
  baden: {
    name: "Baden",
    nameAlb: "Baden",
    adjustment: {
      fajr: +1,
      dhuhr: +1,
      asr: +1,
      maghrib: +1,
      isha: +1
    }
  },
  aarau: {
    name: "Aarau",
    nameAlb: "Aarau",
    adjustment: {
      fajr: +2,
      dhuhr: +2,
      asr: +2,
      maghrib: +2,
      isha: +2
    }
  },
  basel: {
    name: "Basel",
    nameAlb: "Basel",
    adjustment: {
      fajr: +4,
      dhuhr: +4,
      asr: +4,
      maghrib: +4,
      isha: +4
    }
  },
  bern: {
    name: "Bern",
    nameAlb: "Bern",
    adjustment: {
      fajr: +4,
      dhuhr: +4,
      asr: +4,
      maghrib: +4,
      isha: +4
    }
  },
  liestal: {
    name: "Liestal",
    nameAlb: "Liestal",
    adjustment: {
      fajr: +3,
      dhuhr: +3,
      asr: +3,
      maghrib: +3,
      isha: +3
    }
  },
  olten: {
    name: "Olten",
    nameAlb: "Olten",
    adjustment: {
      fajr: +2,
      dhuhr: +2,
      asr: +2,
      maghrib: +2,
      isha: +2
    }
  },
  frauenfeld: {
    name: "Frauenfeld",
    nameAlb: "Frauenfeld",
    adjustment: {
      fajr: -1,
      dhuhr: -1,
      asr: -1,
      maghrib: -1,
      isha: -1
    }
  },
  winterthur: {
    name: "Winterthur",
    nameAlb: "Winterthur",
    adjustment: {
      fajr: -1,
      dhuhr: -1,
      asr: -1,
      maghrib: -1,
      isha: -1
    }
  },
  lausanne: {
    name: "Lausanne",
    nameAlb: "Lausanne",
    adjustment: {
      fajr: +7,
      dhuhr: +7,
      asr: +7,
      maghrib: +7,
      isha: +7
    }
  }
};

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