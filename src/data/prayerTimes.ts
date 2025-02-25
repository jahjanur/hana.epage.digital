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
  { "date": "2025-03-01", "weekday": "e Shtunë", "fajr": "4:34", "dhuhr": "11:56", "asr": "14:59", "maghrib": "17:32", "isha": "18:58" },
  { "date": "2025-03-02", "weekday": "e Diel", "fajr": "4:32", "dhuhr": "11:55", "asr": "14:59", "maghrib": "17:33", "isha": "18:59" },
  { "date": "2025-03-03", "weekday": "e Hënë", "fajr": "4:30", "dhuhr": "11:55", "asr": "15:00", "maghrib": "17:34", "isha": "19:01" },
  { "date": "2025-03-04", "weekday": "e Martë", "fajr": "4:29", "dhuhr": "11:55", "asr": "15:01", "maghrib": "17:35", "isha": "19:02" },
  { "date": "2025-03-05", "weekday": "e Mërkurë", "fajr": "4:27", "dhuhr": "11:55", "asr": "15:02", "maghrib": "17:36", "isha": "19:03" },
  { "date": "2025-03-06", "weekday": "e Enjte", "fajr": "4:25", "dhuhr": "11:55", "asr": "15:03", "maghrib": "17:38", "isha": "19:04" },
  { "date": "2025-03-07", "weekday": "e Premte", "fajr": "4:24", "dhuhr": "11:54", "asr": "15:03", "maghrib": "17:39", "isha": "19:05" },
  { "date": "2025-03-08", "weekday": "e Shtunë", "fajr": "4:22", "dhuhr": "11:54", "asr": "15:04", "maghrib": "17:40", "isha": "19:06" },
  { "date": "2025-03-09", "weekday": "e Diel", "fajr": "4:20", "dhuhr": "11:54", "asr": "15:05", "maghrib": "17:41", "isha": "19:08" },
  { "date": "2025-03-10", "weekday": "e Hënë", "fajr": "4:19", "dhuhr": "11:54", "asr": "15:06", "maghrib": "17:42", "isha": "19:09" },
  { "date": "2025-03-11", "weekday": "e Martë", "fajr": "4:17", "dhuhr": "11:53", "asr": "15:06", "maghrib": "17:44", "isha": "19:10" },
  { "date": "2025-03-12", "weekday": "e Mërkurë", "fajr": "4:15", "dhuhr": "11:53", "asr": "15:07", "maghrib": "17:45", "isha": "19:11" },
  { "date": "2025-03-13", "weekday": "e Enjte", "fajr": "4:13", "dhuhr": "11:53", "asr": "15:08", "maghrib": "17:46", "isha": "19:12" },
  { "date": "2025-03-14", "weekday": "e Premte", "fajr": "4:12", "dhuhr": "11:53", "asr": "15:08", "maghrib": "17:47", "isha": "19:14" },
  { "date": "2025-03-15", "weekday": "e Shtunë", "fajr": "4:10", "dhuhr": "11:52", "asr": "15:09", "maghrib": "17:48", "isha": "19:15" },
  { "date": "2025-03-16", "weekday": "e Diel", "fajr": "4:08", "dhuhr": "11:52", "asr": "15:10", "maghrib": "17:49", "isha": "19:16" },
  { "date": "2025-03-17", "weekday": "e Hënë", "fajr": "4:06", "dhuhr": "11:52", "asr": "15:10", "maghrib": "17:50", "isha": "19:17" },
  { "date": "2025-03-18", "weekday": "e Martë", "fajr": "4:04", "dhuhr": "11:51", "asr": "15:11", "maghrib": "17:52", "isha": "19:19" },
  { "date": "2025-03-19", "weekday": "e Mërkurë", "fajr": "4:02", "dhuhr": "11:51", "asr": "15:11", "maghrib": "17:53", "isha": "19:20" },
  { "date": "2025-03-20", "weekday": "e Enjte", "fajr": "4:01", "dhuhr": "11:51", "asr": "15:12", "maghrib": "17:54", "isha": "19:21" },
  { "date": "2025-03-21", "weekday": "e Premte", "fajr": "3:59", "dhuhr": "11:51", "asr": "15:13", "maghrib": "17:55", "isha": "19:22" },
  { "date": "2025-03-22", "weekday": "e Shtunë", "fajr": "3:57", "dhuhr": "11:50", "asr": "15:13", "maghrib": "17:56", "isha": "19:24" },
  { "date": "2025-03-23", "weekday": "e Diel", "fajr": "3:55", "dhuhr": "11:50", "asr": "15:14", "maghrib": "17:57", "isha": "19:25" },
  { "date": "2025-03-24", "weekday": "e Hënë", "fajr": "3:53", "dhuhr": "11:50", "asr": "15:14", "maghrib": "17:58", "isha": "19:26" },
  { "date": "2025-03-25", "weekday": "e Martë", "fajr": "3:51", "dhuhr": "11:49", "asr": "15:15", "maghrib": "17:59", "isha": "19:27" },
  { "date": "2025-03-26", "weekday": "e Mërkurë", "fajr": "3:49", "dhuhr": "11:49", "asr": "15:15", "maghrib": "18:01", "isha": "19:29", "special": "Nata e Kadrit" },
  { "date": "2025-03-27", "weekday": "e Enjte", "fajr": "3:47", "dhuhr": "11:49", "asr": "15:16", "maghrib": "18:02", "isha": "19:30" },
  { "date": "2025-03-28", "weekday": "e Premte", "fajr": "3:45", "dhuhr": "11:49", "asr": "15:16", "maghrib": "18:03", "isha": "19:31" },
  { "date": "2025-03-29", "weekday": "e Shtunë", "fajr": "11:30", "dhuhr": "11:48", "asr": "15:17", "maghrib": "11:55", "isha": "19:33" }
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
  const baseTime = ramadanTimes.find(day => day.date === date);
  const cityAdj = cityAdjustments[cityId];

  if (!baseTime || !cityAdj) return null;

  return {
    fajr: adjustTime(baseTime.fajr, cityAdj.adjustment.fajr),
    dhuhr: adjustTime(baseTime.dhuhr, cityAdj.adjustment.dhuhr),
    asr: adjustTime(baseTime.asr, cityAdj.adjustment.asr),
    maghrib: adjustTime(baseTime.maghrib, cityAdj.adjustment.maghrib),
    isha: adjustTime(baseTime.isha, cityAdj.adjustment.isha),
  };
}; 