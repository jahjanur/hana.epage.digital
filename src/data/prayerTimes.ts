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
export const ramadanTimes: RamadanDay[] = [
  {
    date: "2024-03-01",
    weekday: "E Shtunë",
    fajr: "04:34",
    dhuhr: "11:56",
    asr: "14:59",
    maghrib: "17:32",
    isha: "18:58"
  },
  {
    date: "2024-03-02",
    weekday: "E Diel",
    fajr: "04:32",
    dhuhr: "11:55",
    asr: "14:59",
    maghrib: "17:33",
    isha: "18:59"
  },
  {
    date: "2024-03-03",
    weekday: "E Hënë",
    fajr: "04:30",
    dhuhr: "11:55",
    asr: "15:00",
    maghrib: "17:34",
    isha: "19:01"
  },
  {
    date: "2024-03-04",
    weekday: "E Martë",
    fajr: "04:29",
    dhuhr: "11:55",
    asr: "15:01",
    maghrib: "17:36",
    isha: "19:02"
  },
  {
    date: "2024-03-05",
    weekday: "E Mërkurë",
    fajr: "04:27",
    dhuhr: "11:55",
    asr: "15:02",
    maghrib: "17:36",
    isha: "19:03"
  },
  {
    date: "2024-03-06",
    weekday: "E Enjte",
    fajr: "04:25",
    dhuhr: "11:55",
    asr: "15:03",
    maghrib: "17:36",
    isha: "19:04"
  },
  {
    date: "2024-03-07",
    weekday: "E Premte",
    fajr: "04:24",
    dhuhr: "11:54",
    asr: "15:03",
    maghrib: "17:36",
    isha: "19:05"
  },
  {
    date: "2024-03-08",
    weekday: "E Shtunë",
    fajr: "04:22",
    dhuhr: "11:54",
    asr: "15:04",
    maghrib: "17:40",
    isha: "19:06"
  },
  {
    date: "2024-03-09",
    weekday: "E Diell",
    fajr: "04:20",
    dhuhr: "11:54",
    asr: "15:05",
    maghrib: "17:42",
    isha: "19:08"
  },
  {
    date: "2024-03-10",
    weekday: "E Hënë",
    fajr: "04:19",
    dhuhr: "11:54",
    asr: "15:06",
    maghrib: "17:42",
    isha: "19:09"
  },
  {
    date: "2024-03-11",
    weekday: "E Martë",
    fajr: "04:17",
    dhuhr: "11:53",
    asr: "15:06",
    maghrib: "17:42",
    isha: "19:10"
  },
  {
    date: "2024-03-12",
    weekday: "E Mërkurë",
    fajr: "04:15",
    dhuhr: "11:53",
    asr: "15:07",
    maghrib: "17:42",
    isha: "19:11"
  },
  {
    date: "2024-03-13",
    weekday: "E Enjte",
    fajr: "04:13",
    dhuhr: "11:53",
    asr: "15:08",
    maghrib: "17:42",
    isha: "19:12"
  },
  {
    date: "2024-03-14",
    weekday: "E Premte",
    fajr: "04:12",
    dhuhr: "11:53",
    asr: "15:08",
    maghrib: "17:42",
    isha: "19:14"
  },
  {
    date: "2024-03-15",
    weekday: "E Shtunë",
    fajr: "04:10",
    dhuhr: "11:52",
    asr: "15:09",
    maghrib: "17:42",
    isha: "19:15"
  },
  {
    date: "2024-03-16",
    weekday: "E Shtunë",
    fajr: "04:08",
    dhuhr: "11:52",
    asr: "15:10",
    maghrib: "17:42",
    isha: "19:16"
  },
  {
    date: "2024-03-17",
    weekday: "E Diell",
    fajr: "04:06",
    dhuhr: "11:52",
    asr: "15:11",
    maghrib: "17:42",
    isha: "19:17"
  },
  {
    date: "2024-03-18",
    weekday: "E Shtunë",
    fajr: "04:04",
    dhuhr: "11:52",
    asr: "15:12",
    maghrib: "17:42",
    isha: "19:18"
  },
  {
    date: "2024-03-19",
    weekday: "E Shtunë",
    fajr: "04:02",
    dhuhr: "11:52",
    asr: "15:13",
    maghrib: "17:42",
    isha: "19:19"
  },
  {
    date: "2024-03-20",
    weekday: "E Shtunë",
    fajr: "04:00",
    dhuhr: "11:52",
    asr: "15:14",
    maghrib: "17:42",
    isha: "19:20"
  },
  {
    date: "2024-03-21",
    weekday: "E Shtunë",
    fajr: "03:58",
    dhuhr: "11:52",
    asr: "15:15",
    maghrib: "17:42",
    isha: "19:21"
  },
  {
    date: "2024-03-22",
    weekday: "E Shtunë",
    fajr: "03:56",
    dhuhr: "11:52",
    asr: "15:16",
    maghrib: "17:42",
    isha: "19:22"
  },
  {
    date: "2024-03-23",
    weekday: "E Shtunë",
    fajr: "03:54",
    dhuhr: "11:52",
    asr: "15:17",
    maghrib: "17:42",
    isha: "19:23"
  },
  {
    date: "2024-03-24",
    weekday: "E Shtunë",
    fajr: "03:52",
    dhuhr: "11:52",
    asr: "15:18",
    maghrib: "17:42",
    isha: "19:24"
  },
  {
    date: "2024-03-25",
    weekday: "E Shtunë",
    fajr: "03:50",
    dhuhr: "11:52",
    asr: "15:19",
    maghrib: "17:42",
    isha: "19:25"
  },
  {
    date: "2024-03-26",
    weekday: "E Shtunë",
    fajr: "03:48",
    dhuhr: "11:52",
    asr: "15:20",
    maghrib: "17:42",
    isha: "19:26"
  },
  {
    date: "2024-03-27",
    weekday: "E Shtunë",
    fajr: "03:46",
    dhuhr: "11:52",
    asr: "15:21",
    maghrib: "17:42",
    isha: "19:27"
  },
  {
    date: "2024-03-28",
    weekday: "E Shtunë",
    fajr: "03:44",
    dhuhr: "11:52",
    asr: "15:22",
    maghrib: "17:42",
    isha: "19:28"
  },
  {
    date: "2024-03-29",
    weekday: "E Shtunë",
    fajr: "03:43",
    dhuhr: "11:48",
    asr: "15:17",
    maghrib: "18:04",
    isha: "19:33"
  }
];

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