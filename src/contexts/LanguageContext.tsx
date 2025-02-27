import React, { createContext, useContext, useState } from 'react';

type SupportedLanguages = 'sq' | 'en' | 'tr' | 'mk' | 'it' | 'de';

interface StoryTranslation {
  title: string;
  content: string;
}

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
    albania: string;
    
    // Add notification-related keys
    syfyr: string;
    iftar: string;
    enableNotifications: string;
    disableNotifications: string;
    save: string;
    
    // Book translations
    storiesAndMiracles: string;
    scientificInQuran: string;
    untilAvailable: string;
    
    // Story translations
    story1: StoryTranslation;
    story2: StoryTranslation;
    story3: StoryTranslation;
    story4: StoryTranslation;
    story5: StoryTranslation;
    story6: StoryTranslation;
    story7: StoryTranslation;
    story8: StoryTranslation;
    story9: StoryTranslation;
    story10: StoryTranslation;
    story11: StoryTranslation;
    story12: StoryTranslation;
    story13: StoryTranslation;
    story14: StoryTranslation;
    story15: StoryTranslation;
    story16: StoryTranslation;
    story17: StoryTranslation;
    story18: StoryTranslation;
    story19: StoryTranslation;
    story20: StoryTranslation;
    story21: StoryTranslation;
    story22: StoryTranslation;
    story23: StoryTranslation;
    story24: StoryTranslation;
    story25: StoryTranslation;
    story26: StoryTranslation;
    story27: StoryTranslation;
    story28: StoryTranslation;
    story29: StoryTranslation;
    story30: StoryTranslation;
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
    nijetTransliteration: 'Nawaitu sawma ghadin an adai fardhi shahri Ramadana hadhihi as-sanati lillahi taala.',
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
    albania: 'Albania',
    // Add notification-related translations
    syfyr: 'Suhoor',
    iftar: 'Iftar',
    enableNotifications: 'Enable notifications',
    disableNotifications: 'Disable notifications',
    save: 'Save',
    
    // Book translations
    storiesAndMiracles: 'Tregime dhe Mrekulli',
    scientificInQuran: 'Shkencore në Kuran',
    untilAvailable: 'deri në dispozicion',
    
    // Story translations
    story1: {
      title: "Receptorët e Dhimbjes në Lëkurë",
      content: "🔹 Kurani thotë: 'Ne do t'i djegim ata në zjarr; sapo lëkura e tyre të digjet plotësisht, ne do t'i zëvendësojmë që ata të vazhdojnë të ndiejnë dhimbjen.' (Kuran 4:56)\n\n🌍 Zbulimi Shkencor:\nShkenca konfirmon se receptorët e dhimbjes janë në lëkurë. 1400 vjet më parë, njerëzit besonin se dhimbja ndjehej përmes trurit ose gjakut."
    },
    story2: {
      title: "Bija e Njeriut të Verbër",
      content: "Një vajzë dëshiroi që babai i saj të mund ta shihte bukurinë e saj. Një ditë, ajo gjeti një letër të vjetër:\n'Unë të dhashë sytë e mi kur ishe 5 vjeç. Ishte e vlefshme.'\n\n🌙 Mësimi: Disa dashuri janë aq të thella, saqë mbeten të padukshme."
    },
    story3: {
      title: "Besimi",
      content: "Besimi në Islam, siç theksohet në Kuran, qendron në besimin në një Zot dhe ofron udhëzime për njerëzimin, duke theksuar veprat e drejta, dhembshurinë, mëshirën dhe rëndësinë e Ditës së Gjykimit."
    },
    story4: {
      title: "Burri Që Kurrë Nuk Kërkoi Falje",
      content: "Një burrë kurrë nuk i kërkoi falje gruas së tij për gabimet e tij. Pasi ajo vdiq, ai qau, duke dëshiruar të kishte thënë thjesht, 'Më fal.'\n\n🌙 Mësimi: Kërkoni falje derisa të keni ende mundësi."
    },
    story5: {
      title: "Tërheqja Misterioze e Kaabës",
      content: "🔹 Kaaba në Mekkë është qendra shpirtërore e botës, dhe miliona përballen me të për lutje.\n\n🌍 Misteri Shkencor: Ajo përputhet perfekt me qendrën magnetike të Tokës, pa ndonjë shpjegim shkencor për këtë fenomen.\n\n🌙 Mësimi: Disa mistere hyjnore mbeten përtej kuptimit njerëzor."
    },
    story6: {
      title: "Receptorët e Dhimbjes në Lëkurë",
      content: "🔹 Kurani thotë: 'Ne do t'i djegim ata në zjarr; sapo lëkura e tyre të digjet plotësisht, ne do t'i zëvendësojmë që ata të vazhdojnë të ndiejnë dhimbjen.' (Kuran 4:56)\n\n🌍 Zbulimi Shkencor:\nShkenca konfirmon se receptorët e dhimbjes janë në lëkurë. 1400 vjet më parë, njerëzit besonin se dhimbja ndjehej përmes trurit ose gjakut."
    },
    story7: {
      title: "Bija e Njeriut të Verbër",
      content: "Një vajzë dëshiroi që babai i saj të mund ta shihte bukurinë e saj. Një ditë, ajo gjeti një letër të vjetër:\n'Unë të dhashë sytë e mi kur ishe 5 vjeç. Ishte e vlefshme.'\n\n🌙 Mësimi: Disa dashuri janë aq të thella, saqë mbeten të padukshme."
    },
    story8: {
      title: "Besimi",
      content: "Besimi në Islam, siç theksohet në Kuran, qendron në besimin në një Zot dhe ofron udhëzime për njerëzimin, duke theksuar veprat e drejta, dhembshurinë, mëshirën dhe rëndësinë e Ditës së Gjykimit."
    },
    story9: {
      title: "Burri Që Kurrë Nuk Kërkoi Falje",
      content: "Një burrë kurrë nuk i kërkoi falje gruas së tij për gabimet e tij. Pasi ajo vdiq, ai qau, duke dëshiruar të kishte thënë thjesht, 'Më fal.'\n\n🌙 Mësimi: Kërkoni falje derisa të keni ende mundësi."
    },
    story10: {
      title: "Tërheqja Misterioze e Kaabës",
      content: "🔹 Kaaba në Mekkë është qendra shpirtërore e botës, dhe miliona përballen me të për lutje.\n\n🌍 Misteri Shkencor: Ajo përputhet perfekt me qendrën magnetike të Tokës, pa ndonjë shpjegim shkencor për këtë fenomen.\n\n🌙 Mësimi: Disa mistere hyjnore mbeten përtej kuptimit njerëzor."
    },
    story11: {
      title: "Receptorët e Dhimbjes në Lëkurë",
      content: "🔹 Kurani thotë: 'Ne do t'i djegim ata në zjarr; sapo lëkura e tyre të digjet plotësisht, ne do t'i zëvendësojmë që ata të vazhdojnë të ndiejnë dhimbjen.' (Kuran 4:56)\n\n🌍 Zbulimi Shkencor:\nShkenca konfirmon se receptorët e dhimbjes janë në lëkurë. 1400 vjet më parë, njerëzit besonin se dhimbja ndjehej përmes trurit ose gjakut."
    },
    story12: {
      title: "Bija e Njeriut të Verbër",
      content: "Një vajzë dëshiroi që babai i saj të mund ta shihte bukurinë e saj. Një ditë, ajo gjeti një letër të vjetër:\n'Unë të dhashë sytë e mi kur ishe 5 vjeç. Ishte e vlefshme.'\n\n🌙 Mësimi: Disa dashuri janë aq të thella, saqë mbeten të padukshme."
    },
    story13: {
      title: "Besimi",
      content: "Besimi në Islam, siç theksohet në Kuran, qendron në besimin në një Zot dhe ofron udhëzime për njerëzimin, duke theksuar veprat e drejta, dhembshurinë, mëshirën dhe rëndësinë e Ditës së Gjykimit."
    },
    story14: {
      title: "Burri Që Kurrë Nuk Kërkoi Falje",
      content: "Një burrë kurrë nuk i kërkoi falje gruas së tij për gabimet e tij. Pasi ajo vdiq, ai qau, duke dëshiruar të kishte thënë thjesht, 'Më fal.'\n\n🌙 Mësimi: Kërkoni falje derisa të keni ende mundësi."
    },
    story15: {
      title: "Tërheqja Misterioze e Kaabës",
      content: "🔹 Kaaba në Mekkë është qendra shpirtërore e botës, dhe miliona përballen me të për lutje.\n\n🌍 Misteri Shkencor: Ajo përputhet perfekt me qendrën magnetike të Tokës, pa ndonjë shpjegim shkencor për këtë fenomen.\n\n🌙 Mësimi: Disa mistere hyjnore mbeten përtej kuptimit njerëzor."
    },
    story16: {
      title: "Receptorët e Dhimbjes në Lëkurë",
      content: "🔹 Kurani thotë: 'Ne do t'i djegim ata në zjarr; sapo lëkura e tyre të digjet plotësisht, ne do t'i zëvendësojmë që ata të vazhdojnë të ndiejnë dhimbjen.' (Kuran 4:56)\n\n🌍 Zbulimi Shkencor:\nShkenca konfirmon se receptorët e dhimbjes janë në lëkurë. 1400 vjet më parë, njerëzit besonin se dhimbja ndjehej përmes trurit ose gjakut."
    },
    story17: {
      title: "Bija e Njeriut të Verbër",
      content: "Një vajzë dëshiroi që babai i saj të mund ta shihte bukurinë e saj. Një ditë, ajo gjeti një letër të vjetër:\n'Unë të dhashë sytë e mi kur ishe 5 vjeç. Ishte e vlefshme.'\n\n🌙 Mësimi: Disa dashuri janë aq të thella, saqë mbeten të padukshme."
    },
    story18: {
      title: "Besimi",
      content: "Besimi në Islam, siç theksohet në Kuran, qendron në besimin në një Zot dhe ofron udhëzime për njerëzimin, duke theksuar veprat e drejta, dhembshurinë, mëshirën dhe rëndësinë e Ditës së Gjykimit."
    },
    story19: {
      title: "Burri Që Kurrë Nuk Kërkoi Falje",
      content: "Një burrë kurrë nuk i kërkoi falje gruas së tij për gabimet e tij. Pasi ajo vdiq, ai qau, duke dëshiruar të kishte thënë thjesht, 'Më fal.'\n\n🌙 Mësimi: Kërkoni falje derisa të keni ende mundësi."
    },
    story20: {
      title: "Tërheqja Misterioze e Kaabës",
      content: "🔹 Kaaba në Mekkë është qendra shpirtërore e botës, dhe miliona përballen me të për lutje.\n\n🌍 Misteri Shkencor: Ajo përputhet perfekt me qendrën magnetike të Tokës, pa ndonjë shpjegim shkencor për këtë fenomen.\n\n🌙 Mësimi: Disa mistere hyjnore mbeten përtej kuptimit njerëzor."
    },
    story21: {
      title: "Receptorët e Dhimbjes në Lëkurë",
      content: "🔹 Kurani thotë: 'Ne do t'i djegim ata në zjarr; sapo lëkura e tyre të digjet plotësisht, ne do t'i zëvendësojmë që ata të vazhdojnë të ndiejnë dhimbjen.' (Kuran 4:56)\n\n🌍 Zbulimi Shkencor:\nShkenca konfirmon se receptorët e dhimbjes janë në lëkurë. 1400 vjet më parë, njerëzit besonin se dhimbja ndjehej përmes trurit ose gjakut."
    },
    story22: {
      title: "Bija e Njeriut të Verbër",
      content: "Një vajzë dëshiroi që babai i saj të mund ta shihte bukurinë e saj. Një ditë, ajo gjeti një letër të vjetër:\n'Unë të dhashë sytë e mi kur ishe 5 vjeç. Ishte e vlefshme.'\n\n🌙 Mësimi: Disa dashuri janë aq të thella, saqë mbeten të padukshme."
    },
    story23: {
      title: "Besimi",
      content: "Besimi në Islam, siç theksohet në Kuran, qendron në besimin në një Zot dhe ofron udhëzime për njerëzimin, duke theksuar veprat e drejta, dhembshurinë, mëshirën dhe rëndësinë e Ditës së Gjykimit."
    },
    story24: {
      title: "Burri Që Kurrë Nuk Kërkoi Falje",
      content: "Një burrë kurrë nuk i kërkoi falje gruas së tij për gabimet e tij. Pasi ajo vdiq, ai qau, duke dëshiruar të kishte thënë thjesht, 'Më fal.'\n\n🌙 Mësimi: Kërkoni falje derisa të keni ende mundësi."
    },
    story25: {
      title: "Tërheqja Misterioze e Kaabës",
      content: "🔹 Kaaba në Mekkë është qendra shpirtërore e botës, dhe miliona përballen me të për lutje.\n\n🌍 Misteri Shkencor: Ajo përputhet perfekt me qendrën magnetike të Tokës, pa ndonjë shpjegim shkencor për këtë fenomen.\n\n🌙 Mësimi: Disa mistere hyjnore mbeten përtej kuptimit njerëzor."
    },
    story26: {
      title: "Receptorët e Dhimbjes në Lëkurë",
      content: "🔹 Kurani thotë: 'Ne do t'i djegim ata në zjarr; sapo lëkura e tyre të digjet plotësisht, ne do t'i zëvendësojmë që ata të vazhdojnë të ndiejnë dhimbjen.' (Kuran 4:56)\n\n🌍 Zbulimi Shkencor:\nShkenca konfirmon se receptorët e dhimbjes janë në lëkurë. 1400 vjet më parë, njerëzit besonin se dhimbja ndjehej përmes trurit ose gjakut."
    },
    story27: {
      title: "Bija e Njeriut të Verbër",
      content: "Një vajzë dëshiroi që babai i saj të mund ta shihte bukurinë e saj. Një ditë, ajo gjeti një letër të vjetër:\n'Unë të dhashë sytë e mi kur ishe 5 vjeç. Ishte e vlefshme.'\n\n🌙 Mësimi: Disa dashuri janë aq të thella, saqë mbeten të padukshme."
    },
    story28: {
      title: "Besimi",
      content: "Besimi në Islam, siç theksohet në Kuran, qendron në besimin në një Zot dhe ofron udhëzime për njerëzimin, duke theksuar veprat e drejta, dhembshurinë, mëshirën dhe rëndësinë e Ditës së Gjykimit."
    },
    story29: {
      title: "Burri Që Kurrë Nuk Kërkoi Falje",
      content: "Një burrë kurrë nuk i kërkoi falje gruas së tij për gabimet e tij. Pasi ajo vdiq, ai qau, duke dëshiruar të kishte thënë thjesht, 'Më fal.'\n\n🌙 Mësimi: Kërkoni falje derisa të keni ende mundësi."
    },
    story30: {
      title: "Tërheqja Misterioze e Kaabës",
      content: "🔹 Kaaba në Mekkë është qendra shpirtërore e botës, dhe miliona përballen me të për lutje.\n\n🌍 Misteri Shkencor: Ajo përputhet perfekt me qendrën magnetike të Tokës, pa ndonjë shpjegim shkencor për këtë fenomen.\n\n🌙 Mësimi: Disa mistere hyjnore mbeten përtej kuptimit njerëzor."
    }
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
    nijetTransliteration: 'Nawaitu sawma ghadin min shahri Ramadana fardal laka ya Allahu taala.',
    nijetTranslation: 'I intend to fast tomorrow in the month of Ramadan as an obligation for You, O Allah, the Most High.',
    iftarDuaTitle: 'Iftar Dua',
    iftarDuaTransliteration: 'Allahumma laka sumtu wa bika amantu wa ‘alayka tawakkaltu wa ‘ala rizq-ika-aftartu.',
    iftarDuaTranslation: 'O Allah, I fasted for You, and I believe in You, and I put my trust in You, and with Your provision, I break my fast.',
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
    albania: 'Albania',
    // Add notification-related translations
    syfyr: 'Suhoor',
    iftar: 'Iftar',
    enableNotifications: 'Enable notifications',
    disableNotifications: 'Disable notifications',
    save: 'Save',
    
    // Book translations
    storiesAndMiracles: 'Stories and Miracles',
    scientificInQuran: 'Scientific in Quran',
    untilAvailable: 'until available',
    
    // Story translations
    story1: {
      title: "Pain Receptors in Skin",
      content: "🔹 The Quran states: 'We will burn them in fire; whenever their skin is fully burned, We will replace it so they can continue to feel the pain.' (Quran 4:56)\n\n🌍 Scientific Discovery:\nScience confirms that pain receptors are in the skin. 1400 years ago, people believed pain was felt through the brain or blood."
    },
    story2: {
      title: "The Blind Father's Daughter",
      content: "A girl wished her father could see her beauty. One day, she found an old letter:\n'I gave you my eyes when you were 5 years old. It was worth it.'\n\n🌙 Lesson: Some love runs so deep it remains unseen."
    },
    story3: {
      title: "Faith",
      content: "Faith in Islam, as emphasized in the Quran, rests in the belief in one God and provides guidance for humanity, emphasizing righteous deeds, compassion, mercy, and the importance of the Day of Judgment."
    },
    story4: {
      title: "The Man Who Never Apologized",
      content: "A man never apologized to his wife for his mistakes. After she died, he cried, wishing he had simply said, 'I'm sorry.'\n\n🌙 Lesson: Seek forgiveness while you still can."
    },
    story5: {
      title: "The Mysterious Pull of the Kaaba",
      content: "🔹 The Kaaba in Mecca is the spiritual center of the world, and millions face it for prayer.\n\n🌍 Scientific Mystery: It perfectly aligns with Earth's magnetic center, with no scientific explanation for this phenomenon.\n\n🌙 Lesson: Some divine mysteries remain beyond human understanding."
    },
    story6: {
      title: "The Power of Patience",
      content: "Prophet Noah preached for 950 years, but only a few believed. He continued with patience. When Allah ordered him to build an ark, people laughed at him. But when the flood came, only the believers survived.\n\n🌙 Lesson: Patience in the face of difficulties leads to success."
    },
    story7: {
      title: "Fibonacci Pattern in Creation",
      content: "🔹 The Fibonacci sequence (1,1,2,3,5,8,13…) appears throughout nature - in plants, galaxies, and DNA.\n\n🌍 Scientific Wonder: This mathematical pattern is found in the structure of everything Allah created.\n\n🌙 Lesson: There is divine order in all creation."
    },
    story8: {
      title: "The Doctor's Regret",
      content: "A doctor refused to treat poor patients. One day, his son needed emergency help at another hospital. That doctor also refused, saying 'No money, no treatment.' The child didn't survive.\n\n🌙 Lesson: Treat others as you wish to be treated."
    },
    story9: {
      title: "Weight of Good Deeds",
      content: "A man gave water to a thirsty dog. Prophet Muhammad ﷺ said this simple act earned him paradise.\n\n🌙 Lesson: No good deed is too small in Allah's eyes."
    },
    story10: {
      title: "A Mother's Prayer",
      content: "A mother prayed for her son's success every day. Years later, when he became successful, he said, 'I worked hard for this.' She smiled and said, 'And I prayed hard for this.'\n\n🌙 Lesson: Never underestimate the power of a mother's prayer."
    },
    story11: {
      title: "Mount of Mercy",
      content: "On Mount Arafat, Prophet Muhammad ﷺ delivered his final sermon, emphasizing equality and human rights. Today, millions gather there during Hajj.\n\n🌙 Lesson: All humans are equal in Islam, like the teeth of a comb."
    },
    story12: {
      title: "The Expanding Universe",
      content: "🔹 The Quran states: 'And the heaven We constructed with strength, and indeed, We are expanding it.' (51:47)\n\n🌍 Scientific Discovery: In 1929, Edwin Hubble discovered that the universe is expanding. The Quran mentioned this 1400 years ago.\n\n🌙 Lesson: Divine revelation preceded scientific discovery."
    },
    story13: {
      title: "The Honest Merchant",
      content: "A merchant found extra money in his cash register. Instead of keeping it, he tracked down the customer who overpaid. The customer was so moved, he became interested in Islam.\n\n🌙 Lesson: Honesty can open hearts to faith."
    },
    story14: {
      title: "Mountains as Pegs",
      content: "🔹 The Quran describes mountains as pegs (78:7). Modern geology confirms mountains have deep roots that stabilize Earth's crust, like pegs stabilizing a tent.\n\n🌍 Scientific Fact: This geological understanding wasn't known until modern times.\n\n🌙 Lesson: The Quran contains scientific miracles."
    },
    story15: {
      title: "The Power of Dua",
      content: "A poor woman prayed for her children's education. Years later, all three became doctors. When asked about their success, they said, 'Our mother's prayers were our greatest scholarship.'\n\n🌙 Lesson: Never underestimate the power of sincere prayer."
    },
    story16: {
      title: "The Iron in Blood",
      content: "🔹 The Quran mentions iron as 'sent down' from above (57:25). Modern science confirms iron is not naturally formed on Earth - it came from space through meteorites.\n\n🌍 Scientific Fact: Iron is essential for human blood and life.\n\n🌙 Lesson: The Quran's scientific accuracy is a sign of its divine origin."
    },
    story17: {
      title: "The Barrier Between Seas",
      content: "🔹 The Quran mentions a barrier between two seas that meet but don't mix (55:19-20). Modern oceanography discovered this phenomenon - different seas maintain their distinct properties due to surface tension.\n\n🌍 Scientific Wonder: This barrier prevents seas from mixing while allowing fish to pass through.\n\n🌙 Lesson: Allah's design is perfect in every detail."
    },
    story18: {
      title: "The Grateful Patient",
      content: "A sick man always thanked Allah despite his pain. When asked why, he said, 'He gave me eyes to see, ears to hear, a tongue to speak, and a heart to love. How can I not be grateful?'\n\n🌙 Lesson: True gratitude comes from recognizing our countless blessings."
    },
    story19: {
      title: "The Identity of Fingerprints",
      content: "🔹 The Quran states Allah will reconstruct even our fingertips (75:4). Modern science later discovered that every person's fingerprints are unique.\n\n🌍 Scientific Discovery: This uniqueness was only understood in the 19th century.\n\n🌙 Lesson: The Quran contains knowledge beyond its time."
    },
    story20: {
      title: "The Young Believer",
      content: "A child gave his lunch money to a poor man. When asked why, he said, 'Allah sees everything, and I want Him to see me doing good.'\n\n🌙 Lesson: Pure intentions come from understanding Allah's presence."
    },
    story21: {
      title: "The Deep Seas and Darkness",
      content: "🔹 The Quran describes deep seas as layered darkness (24:40). Modern science confirms that deep oceans have multiple layers of darkness.\n\n🌍 Scientific Fact: Light disappears layer by layer in deep waters.\n\n🌙 Lesson: The Quran's descriptions match scientific discoveries."
    },
    story22: {
      title: "The Power of Forgiveness",
      content: "A man who had wronged many people spent years seeking their forgiveness. On his deathbed, he said, 'The weight of guilt is heavier than mountains, but the relief of forgiveness is sweeter than honey.'\n\n🌙 Lesson: Seeking forgiveness lightens the heart."
    },
    story23: {
      title: "The Development of the Embryo",
      content: "🔹 The Quran describes embryonic development stages with remarkable accuracy (23:14). Modern embryology confirms these stages.\n\n🌍 Scientific Miracle: This detailed knowledge wasn't available until modern technology.\n\n🌙 Lesson: The Quran's scientific precision proves its divine source."
    },
    story24: {
      title: "The Honest Shepherd",
      content: "A poor shepherd found a lost wallet full of money. He tracked down the owner and returned it. The owner offered him a reward, but he refused, saying, 'I did it for Allah's pleasure.'\n\n🌙 Lesson: True reward comes from Allah."
    },
    story25: {
      title: "The Clouds and Rain",
      content: "🔹 The Quran describes the process of rain formation (30:48). Modern meteorology confirms this exact process of wind driving clouds and rain formation.\n\n🌍 Scientific Detail: This understanding of weather systems is relatively recent.\n\n🌙 Lesson: The Quran's accuracy extends to natural phenomena."
    },
    story26: {
      title: "The Value of Time",
      content: "A scholar wrote 400 books but said on his deathbed, 'I wish I had written less and prayed more.'\n\n🌙 Lesson: Balance worldly achievements with spiritual growth."
    },
    story27: {
      title: "The Mountains' Role",
      content: "🔹 The Quran describes mountains as stabilizers (21:31). Geology confirms mountains have deep roots that prevent earth's crust from shaking.\n\n🌍 Scientific Fact: Mountains play a crucial role in Earth's stability.\n\n🌙 Lesson: Every creation serves a purpose."
    },
    story28: {
      title: "The Patient Mother",
      content: "A mother cared for her sick child for years without complaint. When asked about her patience, she said, 'Love makes patience easy.'\n\n🌙 Lesson: Love transforms hardship into blessed moments."
    },
    story29: {
      title: "Night of Power",
      content: "🔹 The Night of Power is better than a thousand months. One night of sincere worship equals over 83 years of worship.\n\n🌙 Lesson: Allah multiplies rewards beyond our imagination."
    },
    story30: {
      title: "The Final Hour",
      content: "Prophet Muhammad ﷺ said: 'If the Final Hour comes while you have a palm cutting in your hands and it is possible to plant it before the Hour comes, you should plant it.'\n\n🌙 Lesson: Continue good deeds until your last breath."
    }
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
    nijetTransliteration: 'Neveytü en esûme ğaden min şehri Ramadâne farden lillâhi teâlâ.',
    nijetTranslation: 'Yarın Ramazan ayından bir gün oruç tutmaya Allah-u Teâlâ için niyet ettim.',
    iftarDuaTitle: 'İftar Duası',
    iftarDuaTransliteration: 'Allahümme leke sumtü ve bike âmentü ve aleyke tevekkeltü ve alâ rizkıke eftartü.',
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
    albania: 'Arnavutluk',
    // Notification-related translations
    syfyr: 'Sahur',
    iftar: 'İftar',
    enableNotifications: 'Bildirimleri aç',
    disableNotifications: 'Bildirimleri kapat',
    save: 'Kaydet',
    
    // Book translations
    storiesAndMiracles: 'Hikayeler ve Mucizeler',
    scientificInQuran: "Kuran'da Bilimsel",
    untilAvailable: 'kullanılabilir olana kadar',
    
    // Story translations
    story1: {
      title: "Derideki Ağrı Reseptörleri",
      content: "🔹 Kuran şöyle buyurur: 'Onları ateşte yakacağız; derileri tamamen yandığında, acıyı hissetmeye devam etmeleri için derilerini yenileyeceğiz.' (Kuran 4:56)\n\n🌍 Bilimsel Keşif:\nBilim, ağrı reseptörlerinin deride olduğunu doğrulamaktadır. 1400 yıl önce insanlar acının beyinden veya kandan hissedildiğine inanıyordu."
    },
    story2: {
      title: "Kör Babanın Kızı",
      content: "Bir kız, babasının güzelliğini görebilmesini diledi. Bir gün eski bir mektup buldu:\n'Sen 5 yaşındayken gözlerimi sana verdim. Buna değdi.'\n\n🌙 Ders: Bazı sevgiler o kadar derindir ki, görünmez kalır."
    },
    story3: {
      title: "İman",
      content: "İslam'daki iman, Kuran'da belirtildiği gibi, tek bir Allah'a inanmayı ve insanlığa yol göstermeyi içerir. Doğru ameller, merhamet, şefkat ve kıyamet gününün önemi vurgulanır."
    },
    story4: {
      title: "Asla Özür Dilemeyen Adam",
      content: "Bir adam, hataları için asla eşinden özür dilemedi. Eşi vefat ettikten sonra ağladı ve keşke sadece 'Özür dilerim' diyebilseydim dedi.\n\n🌙 Ders: Affetmeyi istemek için çok geç olmadan özür dileyin."
    },
    story5: {
      title: "Kâbe'nin Gizemli Çekimi",
      content: "🔹 Mekke'deki Kâbe, dünyanın manevi merkezidir ve milyonlarca insan namaz kılarken ona yönelir.\n\n🌍 Bilimsel Gizem:\nKâbe, Dünya'nın manyetik merkeziyle mükemmel bir hizaya sahiptir ve bu fenomen için bilimsel bir açıklama yoktur.\n\n🌙 Ders: Bazı ilahi sırlar insan anlayışının ötesindedir."
    },
    story6: {
      title: "Derideki Ağrı Reseptörleri",
      content: "🔹 Kuran şöyle buyurur: 'Ne do t'i djegim ata në zjarr; sapo lëkura e tyre të digjet plotësisht, ne do t'i zëvendësojmë që ata të vazhdojnë të ndiejnë dhimbjen.' (Kuran 4:56)\n\n🌍 Zbulimi Shkencor:\nShkenca konfirmon se receptorët e dhimbjes janë në lëkurë. 1400 vjet më parë, njerëzit besonin se dhimbja ndjehej përmes trurit ose gjakut."
    },
    story7: {
      title: "Kör Babanın Kızı",
      content: "Bir kız, babasının güzelliğini görebilmesini diledi. Bir gün eski bir mektup buldu:\n'Ben sana gözlerimi verdim.'\n\n🌙 Ders: Bazı sevgiler görünmezdir, ancak en derin olanlardır."
    },
    story8: {
      title: "İman",
      content: "İslam'daki iman, Kuran'da belirtildiği gibi, tek bir Allah'a inanmayı ve insanlığa yol göstermeyi içerir. Doğru ameller, merhamet, şefkat ve kıyamet gününün önemi vurgulanır."
    },
    story9: {
      title: "Asla Özür Dilemeyen Adam",
      content: "Bir adam, hataları için asla eşinden özür dilemedi. Eşi vefat ettikten sonra ağladı ve keşke sadece 'Özür dilerim' diyebilseydim dedi.\n\n🌙 Ders: Affetmeyi istemek için çok geç olmadan özür dileyin."
    },
    story10: {
      title: "Kâbe'nin Gizemli Çekimi",
      content: "🔹 Mekke'deki Kâbe, dünyanın manevi merkezidir ve milyonlarca insan namaz kılarken ona yönelir.\n\n🌍 Bilimsel Gizem:\nKâbe, Dünya'nın manyetik merkeziyle mükemmel bir hizaya sahiptir ve bu fenomen için bilimsel bir açıklama yoktur.\n\n🌙 Ders: Bazı ilahi sırlar insan anlayışının ötesindedir."
    },
    story11: {
      title: "Rahmet Dağı",
      content: "Peygamber Muhammed ﷺ, Veda Hutbesini Arafat Dağı'nda vererek eşitlik ve insan haklarını vurgulamıştır. Bugün milyonlarca insan Hac sırasında burada toplanır.\n\n🌙 Ders: İslam'da tüm insanlar bir tarak dişleri gibi eşittir."
    },
    story12: {
      title: "Genişleyen Evren",
      content: "🔹 Kuran şöyle buyurur: 'Göğü güçlü bir şekilde inşa ettik ve biz onu genişletiyoruz.' (51:47)\n\n🌍 Bilimsel Keşif:\n1929'da Edwin Hubble, evrenin genişlediğini keşfetti. Kuran bunu 1400 yıl önce bildirmişti.\n\n🌙 Ders: İlahi vahiy, bilimsel keşiflerden önce gelir."
    },
    story13: {
      title: "Dürüst Tüccar",
      content: "Bir tüccar, kasasında fazladan para buldu. Parayı saklamak yerine, fazla ödeme yapan müşteriyi bulup parayı iade etti. Müşteri o kadar etkilendi ki, İslam'a ilgi duymaya başladı.\n\n🌙 Ders: Dürüstlük, kalpleri imana açabilir."
    },
    story14: {
      title: "Dağlar Kazık Gibidir",
      content: "🔹 Kuran dağları kazık olarak tanımlar (78:7). Modern jeoloji, dağların derin köklere sahip olduğunu ve Dünya'nın kabuğunu sabitlediğini doğrulamaktadır.\n\n🌍 Bilimsel Gerçek:\nBu jeolojik bilgi ancak modern çağda anlaşılmıştır.\n\n🌙 Ders: Kuran, bilimsel mucizeler içerir."
    },
    story15: {
      title: "Duanın Gücü",
      content: "Fakir bir kadın, çocuklarının eğitim alması için dua etti. Yıllar sonra, üçü de doktor oldu. Onlara başarılarının sırrı sorulduğunda, 'Annemizin duaları bizim en büyük bursumuzdu' dediler.\n\n🌙 Ders: İçten yapılan duaların gücünü asla küçümsemeyin."
    },
    story16: {
      title: "Kandaki Demir",
      content: "🔹 Kuran, demirin gökten indirildiğini söyler (57:25). Modern bilim, demirin dünyada doğal olarak oluşmadığını, meteorlar yoluyla uzaydan geldiğini doğrulamaktadır.\n\n🌍 Bilimsel Gerçek:\nDemir, insan kanı ve yaşam için hayati öneme sahiptir.\n\n🌙 Ders: Kuran'ın bilimsel doğruluğu, onun ilahi bir kaynak olduğunu gösterir."
    },
    story17: {
      title: "Denizler Arasındaki Engel",
      content: "🔹 Kuran, iki denizin birleştiğini ama karışmadığını söyler (55:19-20). Modern okyanus bilimi, farklı denizlerin yüzey gerilimi nedeniyle kendilerini koruduğunu keşfetti.\n\n🌍 Bilimsel Mucize:\nBu bariyer, denizlerin karışmasını önlerken balıkların geçmesine izin verir.\n\n🌙 Ders: Allah'ın yaratışı mükemmeldir."
    },
    story18: {
      title: "Minnettar Hasta",
      content: "Ağır hasta bir adam, acısına rağmen her zaman Allah'a şükrederdi. Ona neden şükrettiği sorulduğunda, 'Görmek için gözlerim, duymak için kulaklarım, konuşmak için dilim ve sevmek için kalbim var. Nasıl şükretmeyeyim?' dedi.\n\n🌙 Ders: Gerçek şükür, sayısız nimetleri fark etmekle başlar."
    },
    story19: {
      title: "Parmak İzlerinin Kimliği",
      content: "🔹 Kuran, Allah'ın parmak uçlarımızı bile yeniden yaratacağını söyler (75:4). Modern bilim, her insanın parmak izinin benzersiz olduğunu keşfetti.\n\n🌍 Bilimsel Keşif:\nBu benzersizlik ancak 19. yüzyılda anlaşılmıştır.\n\n🌙 Ders: Kuran, çağının ötesinde bilgiler içerir."
    },
    story20: {
      title: "Genç Mümin",
      content: "Bir çocuk, yemek parasını fakir bir adama verdi. Ona neden böyle yaptığı sorulduğunda, 'Allah her şeyi görüyor ve O'nun beni iyi işler yaparken görmesini istiyorum.' dedi.\n\n🌙 Ders: Saf niyetler, Allah'ın varlığını anlamaktan gelir."
    },
    story21: {
      title: "Derin Denizler ve Karanlık",
      content: "🔹 Kuran, derin denizleri katmanlı karanlık olarak tanımlar (24:40). Modern bilim, derin okyanusların gerçekten de birçok karanlık katmandan oluştuğunu doğrulamaktadır.\n\n🌍 Bilimsel Gerçek:\nIşık, derin suların katmanlarında yavaş yavaş kaybolur.\n\n🌙 Ders: Kuran'ın açıklamaları bilimsel keşiflerle örtüşmektedir."
    },
    story22: {
      title: "Affetmenin Gücü",
      content: "Bir adam, yıllarca yanlış yaptığı insanlardan af dilemek için çabaladı. Ölüm döşeğinde, 'Suçluluk duygusu dağlardan daha ağırdır, ancak affedilmenin hafifliği baldan daha tatlıdır.' dedi.\n\n🌙 Ders: Affetmek, kalbi hafifletir."
    },
    story23: {
      title: "Embriyonun Gelişimi",
      content: "🔹 Kuran, embriyonun gelişim aşamalarını olağanüstü doğrulukla tanımlar (23:14). Modern embriyoloji, bu aşamaların bilimsel olarak doğru olduğunu keşfetti.\n\n🌍 Bilimsel Mucize:\nBu ayrıntılı bilgi, ancak modern teknoloji ile anlaşılabildi.\n\n🌙 Ders: Kuran'ın bilimsel hassasiyeti, ilahi kaynağını kanıtlar."
    },
    story24: {
      title: "Dürüst Çoban",
      content: "Fakir bir çoban, içinde para dolu bir cüzdan buldu. Sahibini bulup iade etti. Sahibi ona ödül teklif etti, ancak çoban, 'Bunu Allah'ın rızası için yaptım.' dedi.\n\n🌙 Ders: Gerçek ödül, Allah'tan gelir."
    },
    story25: {
      title: "Bulutlar ve Yağmur",
      content: "🔹 Kuran, yağmurun oluşum sürecini anlatır (30:48). Modern meteoroloji, rüzgarların bulutları taşıyarak yağmur oluşumuna yol açtığını doğrulamaktadır.\n\n🌍 Bilimsel Detay:\nBu hava sistemleri bilgisi nispeten yenidir.\n\n🌙 Ders: Kuran'ın doğruluğu, doğal olaylara kadar uzanır."
    },
    story26: {
      title: "Zamanın Değeri",
      content: "Bir âlim 400 kitap yazdı, ancak ölüm döşeğinde, 'Keşke daha az yazıp daha çok namaz kılsaydım.' dedi.\n\n🌙 Ders: Dünyevi başarıları manevi gelişimle dengeleyin."
    },
    story27: {
      title: "Dağların Rolü",
      content: "🔹 Kuran, dağların dengeleyici olduğunu belirtir (21:31). Jeoloji, dağların Dünya'nın kabuğunu sarsılmaktan koruyan derin köklere sahip olduğunu doğrulamaktadır.\n\n🌍 Bilimsel Gerçek:\nDağlar, Dünya'nın stabilitesinde önemli bir rol oynar.\n\n🌙 Ders: Her yaratılışın bir amacı vardır."
    },
    story28: {
      title: "Sabırlı Anne",
      content: "Bir anne, hasta çocuğuna yıllarca şikayet etmeden baktı. Ona sabrı nasıl koruduğu sorulduğunda, 'Sevgi, sabrı kolaylaştırır.' dedi.\n\n🌙 Ders: Sevgi, zorlukları kutsanmış anlara dönüştürür."
    },
    story29: {
      title: "Kadir Gecesi",
      content: "🔹 Kadir Gecesi, bin aydan daha hayırlıdır. Bir gece içten ibadet etmek, 83 yıldan fazla ibadete eşdeğerdir.\n\n🌙 Ders: Allah, ödülleri hayal gücümüzün ötesinde kat kat artırır."
    },
    story30: {
      title: "Kıyamet Günü",
      content: "Peygamber Muhammed ﷺ şöyle buyurdu: 'Kıyamet kopsa bile elinizde bir fidan varsa ve onu dikmek mümkünse, onu dikin.'\n\n🌙 Ders: Son ana kadar iyilik yapmaya devam edin."
    }
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
    nijetTransliteration: 'Nawaitu sauma ghadin min shahri Ramadana fardan lillahi taala',
    nijetTranslation: 'Ich beabsichtige, morgen im Monat Ramadan als Pflichtfasten für Allah, den Erhabenen, zu fasten.',
    iftarDuaTitle: 'Iftar-Bittgebet',
    iftarDuaTransliteration: 'Allahumma laka sumtu wa bika amantu wa ‘alayka tawakkaltu wa ‘ala rizq-ika-aftartu.',
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
    albania: 'Albanien',
    // Notification-related translations
    syfyr: 'Suhur',
    iftar: 'Iftar',
    enableNotifications: 'Benachrichtigungen aktivieren',
    disableNotifications: 'Benachrichtigungen deaktivieren',
    save: 'Speichern',
    
    // Book translations
    storiesAndMiracles: 'Geschichten und Wunder',
    scientificInQuran: 'Wissenschaftliches im Koran',
    untilAvailable: 'bis verfügbar',
    
    // Story translations
    story1: {
      title: "Schmerzrezeptoren in der Haut",
      content: "🔹 Der Koran sagt: 'Wir werden sie im Feuer verbrennen; wenn ihre Haut vollständig verbrannt ist, werden wir sie ersetzen, damit sie den Schmerz weiterhin fühlen.' (Koran 4:56)\n\n🌍 Wissenschaftliche Entdeckung:\nDie Wissenschaft bestätigt, dass Schmerzrezeptoren in der Haut sind. Vor 1400 Jahren glaubten die Menschen, dass Schmerz durch das Gehirn oder das Blut gefühlt wird."
    },
    story2: {
      title: "Die Tochter des Blinden Vaters",
      content: "Ein Mädchen wünschte sich, ihr Vater könnte ihre Schönheit sehen. Eines Tages fand sie einen alten Brief:\n'Ich habe dir meine Augen gegeben, als du 5 Jahre alt warst. Es war es wert.'\n\n🌙 Lektion: Manche Liebe ist so tief, dass sie unsichtbar bleibt."
    },
    story3: {
      title: "Der Glaube",
      content: "Der Glaube im Islam, wie im Koran betont, besteht im Glauben an einen Gott und bietet den Menschen Führung. Er betont gerechte Taten, Mitgefühl, Barmherzigkeit und die Bedeutung des Jüngsten Gerichts."
    },
    story4: {
      title: "Der Mann, der sich nie entschuldigte",
      content: "Ein Mann entschuldigte sich nie bei seiner Frau für seine Fehler. Nach ihrem Tod weinte er und wünschte sich, er hätte einfach gesagt: 'Es tut mir leid.'\n\n🌙 Lektion: Bitte um Vergebung, solange du noch kannst."
    },
    story5: {
      title: "Die Mysteriöse Anziehung der Kaaba",
      content: "🔹 Die Kaaba in Mekka ist das spirituelle Zentrum der Welt, und Millionen beten in ihre Richtung.\n\n🌍 Wissenschaftliches Rätsel: Sie ist perfekt mit dem magnetischen Zentrum der Erde ausgerichtet, ohne dass es eine wissenschaftliche Erklärung für dieses Phänomen gibt.\n\n🌙 Lektion: Manche göttlichen Geheimnisse bleiben jenseits menschlichen Verständnisses."
    },
    story6: {
      title: "Schmerzrezeptoren in der Haut",
      content: "🔹 Der Koran sagt: 'Wir werden sie im Feuer verbrennen; wenn ihre Haut vollständig verbrannt ist, werden wir sie ersetzen, damit sie den Schmerz weiterhin fühlen.' (Koran 4:56)\n\n🌍 Wissenschaftliche Entdeckung:\nDie Wissenschaft bestätigt, dass Schmerzrezeptoren in der Haut sind. Vor 1400 Jahren glaubten die Menschen, dass Schmerz durch das Gehirn oder das Blut gefühlt wird."
    },
    story7: {
      title: "Die Tochter des Blinden Vaters",
      content: "Ein Mädchen wünschte sich, ihr Vater könnte ihre Schönheit sehen. Eines Tages fand sie einen alten Brief:\n'Ich habe dir meine Augen gegeben, als du 5 Jahre alt warst. Es war es wert.'\n\n🌙 Lektion: Manche Liebe ist so tief, dass sie unsichtbar bleibt."
    },
    story8: {
      title: "Der Glaube",
      content: "Der Glaube im Islam, wie im Koran betont, besteht im Glauben an einen Gott und bietet den Menschen Führung. Er betont gerechte Taten, Mitgefühl, Barmherzigkeit und die Bedeutung des Jüngsten Gerichts."
    },
    story9: {
      title: "Der Mann, der sich nie entschuldigte",
      content: "Ein Mann entschuldigte sich nie bei seiner Frau für seine Fehler. Nach ihrem Tod weinte er und wünschte sich, er hätte einfach gesagt: 'Es tut mir leid.'\n\n🌙 Lektion: Bitte um Vergebung, solange du noch kannst."
    },
    story10: {
      title: "Die Mysteriöse Anziehung der Kaaba",
      content: "🔹 Die Kaaba in Mekka ist das spirituelle Zentrum der Welt, und Millionen beten in ihre Richtung.\n\n🌍 Wissenschaftliches Rätsel: Sie ist perfekt mit dem magnetischen Zentrum der Erde ausgerichtet, ohne dass es eine wissenschaftliche Erklärung für dieses Phänomen gibt.\n\n🌙 Lektion: Manche göttlichen Geheimnisse bleiben jenseits menschlichen Verständnisses."
    },
    story11: {
      title: "Der Berg der Barmherzigkeit",
      content: "Auf dem Berg Arafat hielt der Prophet Muhammad ﷺ seine letzte Predigt und betonte Gleichheit und Menschenrechte. Heute versammeln sich dort Millionen während der Hadsch.\n\n🌙 Lektion: Alle Menschen sind im Islam gleich, wie die Zähne eines Kamms."
    },
    story12: {
      title: "Das Expandierende Universum",
      content: "🔹 Der Koran sagt: 'Und den Himmel haben Wir mit Kraft erbaut, und wahrlich, Wir erweitern ihn ständig.' (51:47)\n\n🌍 Wissenschaftliche Entdeckung: 1929 entdeckte Edwin Hubble, dass sich das Universum ausdehnt. Der Koran erwähnte dies bereits vor 1400 Jahren.\n\n🌙 Lektion: Göttliche Offenbarung ging wissenschaftlicher Entdeckung voraus."
    },
    story13: {
      title: "Der Ehrliche Kaufmann",
      content: "Ein Kaufmann fand zusätzliches Geld in seiner Kasse. Anstatt es zu behalten, suchte er den Kunden, der zu viel bezahlt hatte. Der Kunde war so gerührt, dass er sich für den Islam zu interessieren begann.\n\n🌙 Lektion: Ehrlichkeit kann Herzen für den Glauben öffnen."
    },
    story14: {
      title: "Berge als Pflöcke",
      content: "🔹 Der Koran beschreibt Berge als Pflöcke (78:7). Die moderne Geologie bestätigt, dass Berge tiefe Wurzeln haben, die die Erdkruste stabilisieren, ähnlich wie Pflöcke ein Zelt stabilisieren.\n\n🌍 Wissenschaftliche Tatsache: Dieses geologische Verständnis war bis zur modernen Zeit unbekannt.\n\n🌙 Lektion: Der Koran enthält wissenschaftliche Wunder."
    },
    story15: {
      title: "Die Macht des Dua",
      content: "Eine arme Frau betete für die Ausbildung ihrer Kinder. Jahre später wurden alle drei Ärzte. Als man sie nach ihrem Erfolg fragte, sagten sie: 'Die Gebete unserer Mutter waren unser größtes Stipendium.'\n\n🌙 Lektion: Unterschätze niemals die Kraft aufrichtigen Gebets."
    },
    story16: {
      title: "Das Eisen im Blut",
      content: "🔹 Der Koran erwähnt Eisen als 'herabgesandt' (57:25). Die moderne Wissenschaft bestätigt, dass Eisen nicht natürlich auf der Erde gebildet wird – es kam durch Meteoriten aus dem All.\n\n🌍 Wissenschaftliche Tatsache: Eisen ist essenziell für das menschliche Blut und das Leben.\n\n🌙 Lektion: Die wissenschaftliche Genauigkeit des Korans ist ein Zeichen seiner göttlichen Herkunft."
    },
    story17: {
      title: "Die Barriere zwischen den Meeren",
      content: "🔹 Der Koran erwähnt eine Barriere zwischen zwei Meeren, die sich treffen, aber nicht vermischen (55:19-20). Die moderne Ozeanographie entdeckte dieses Phänomen – verschiedene Meere behalten aufgrund von Oberflächenspannung ihre eigenen Eigenschaften.\n\n🌍 Wissenschaftliches Wunder: Diese Barriere verhindert das Vermischen der Meere, während Fische hindurchschwimmen können.\n\n🌙 Lektion: Allahs Design ist in jedem Detail perfekt."
    },
    story18: {
      title: "Der Dankbare Patient",
      content: "Ein kranker Mann dankte Allah trotz seiner Schmerzen immer. Als man ihn fragte, warum, sagte er: 'Er gab mir Augen zum Sehen, Ohren zum Hören, eine Zunge zum Sprechen und ein Herz zum Lieben. Wie könnte ich nicht dankbar sein?'\n\n🌙 Lektion: Wahre Dankbarkeit kommt aus der Erkenntnis unserer unzähligen Segnungen."
    },
    story19: {
      title: "Die Identität der Fingerabdrücke",
      content: "🔹 Der Koran sagt, dass Allah sogar unsere Fingerspitzen wiederherstellen wird (75:4). Die moderne Wissenschaft entdeckte später, dass jeder Mensch einzigartige Fingerabdrücke hat.\n\n🌍 Wissenschaftliche Entdeckung: Diese Einzigartigkeit wurde erst im 19. Jahrhundert verstanden.\n\n🌙 Lektion: Der Koran enthält Wissen, das seiner Zeit voraus war."
    },
    story20: {
      title: "Der Junge Gläubige",
      content: "Ein Kind gab sein Essensgeld einem armen Mann. Als man ihn fragte, warum, sagte er: 'Allah sieht alles, und ich möchte, dass Er mich beim Gutes tun sieht.'\n\n🌙 Lektion: Reine Absichten entstehen aus dem Bewusstsein von Allahs Gegenwart."
    },
    story21: {
      title: "Die Tiefen Meere und Dunkelheit",
      content: "🔹 Der Koran beschreibt die tiefen Meere als schichtweise Dunkelheit (24:40). Die moderne Wissenschaft bestätigt, dass tiefe Ozeane mehrere Schichten von Dunkelheit haben.\n\n🌍 Wissenschaftliche Tatsache: Licht verschwindet in den Tiefen der Meere Schicht für Schicht.\n\n🌙 Lektion: Die Beschreibungen im Koran stimmen mit wissenschaftlichen Entdeckungen überein."
    },
    story22: {
      title: "Die Kraft der Vergebung",
      content: "Ein Mann, der viele Menschen verletzt hatte, verbrachte Jahre damit, ihre Vergebung zu suchen. Auf seinem Sterbebett sagte er: 'Das Gewicht der Schuld ist schwerer als Berge, aber die Erleichterung der Vergebung ist süßer als Honig.'\n\n🌙 Lektion: Um Vergebung zu bitten, erleichtert das Herz."
    },
    story23: {
      title: "Die Entwicklung des Embryos",
      content: "🔹 Der Koran beschreibt die Stadien der embryonalen Entwicklung mit bemerkenswerter Genauigkeit (23:14). Die moderne Embryologie bestätigt diese Stadien.\n\n🌍 Wissenschaftliches Wunder: Dieses detaillierte Wissen war bis zur modernen Technologie nicht verfügbar.\n\n🌙 Lektion: Die wissenschaftliche Präzision des Korans beweist seine göttliche Quelle."
    },
    story24: {
      title: "Der Ehrliche Schäfer",
      content: "Ein armer Schäfer fand eine verlorene Geldbörse voller Geld. Er suchte den Besitzer und gab sie zurück. Der Besitzer bot ihm eine Belohnung an, aber er lehnte ab und sagte: 'Ich tat es für Allahs Wohlgefallen.'\n\n🌙 Lektion: Wahre Belohnung kommt von Allah."
    },
    story25: {
      title: "Die Wolken und der Regen",
      content: "🔹 Der Koran beschreibt den Prozess der Regenbildung (30:48). Die moderne Meteorologie bestätigt genau diesen Prozess, wie Winde die Wolken treiben und Regen entsteht.\n\n🌍 Wissenschaftliches Detail: Dieses Verständnis der Wettersysteme ist relativ neu.\n\n🌙 Lektion: Die Genauigkeit des Korans erstreckt sich auch auf Naturphänomene."
    },
    story26: {
      title: "Der Wert der Zeit",
      content: "Ein Gelehrter schrieb 400 Bücher, sagte aber auf seinem Sterbebett: 'Ich wünschte, ich hätte weniger geschrieben und mehr gebetet.'\n\n🌙 Lektion: Weltliche Errungenschaften sollten mit spirituellem Wachstum in Einklang gebracht werden."
    },
    story27: {
      title: "Die Rolle der Berge",
      content: "🔹 Der Koran beschreibt Berge als Stabilisatoren (21:31). Die Geologie bestätigt, dass Berge tiefe Wurzeln haben, die verhindern, dass die Erdkruste wackelt.\n\n🌍 Wissenschaftliche Tatsache: Berge spielen eine entscheidende Rolle für die Stabilität der Erde.\n\n🌙 Lektion: Jede Schöpfung hat einen Zweck."
    },
    story28: {
      title: "Die Geduldige Mutter",
      content: "Eine Mutter pflegte jahrelang ihr krankes Kind, ohne sich zu beschweren. Als man sie nach ihrer Geduld fragte, sagte sie: 'Liebe macht Geduld einfach.'\n\n🌙 Lektion: Liebe verwandelt Härten in gesegnete Momente."
    },
    story29: {
      title: "Die Nacht der Bestimmung",
      content: "🔹 Die Nacht der Bestimmung ist besser als tausend Monate. Eine Nacht aufrichtiger Anbetung entspricht über 83 Jahren der Anbetung.\n\n🌙 Lektion: Allah vervielfacht Belohnungen über unsere Vorstellung hinaus."
    },
    story30: {
      title: "Die Letzte Stunde",
      content: "Der Prophet Muhammad ﷺ sagte: 'Wenn die Letzte Stunde kommt, während du einen Palmzweig in deiner Hand hältst und es möglich ist, ihn zu pflanzen, dann solltest du ihn pflanzen.'\n\n🌙 Lektion: Mache weiterhin gute Taten bis zum letzten Atemzug."
    }
  }
}

interface LanguageContextType {
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
  t: (key: Exclude<keyof Translations['en'], 'story1' | 'story2' | 'story3' | 'story4' | 'story5' | 'story6' | 'story7' | 'story8' | 'story9' | 'story10' | 'story11' | 'story12' | 'story13' | 'story14' | 'story15' | 'story16' | 'story17' | 'story18' | 'story19' | 'story20' | 'story21' | 'story22' | 'story23' | 'story24' | 'story25' | 'story26' | 'story27' | 'story28' | 'story29' | 'story30'>) => string;
  tStory: (key: 'story1' | 'story2' | 'story3' | 'story4' | 'story5' | 'story6' | 'story7' | 'story8' | 'story9' | 'story10' | 'story11' | 'story12' | 'story13' | 'story14' | 'story15' | 'story16' | 'story17' | 'story18' | 'story19' | 'story20' | 'story21' | 'story22' | 'story23' | 'story24' | 'story25' | 'story26' | 'story27' | 'story28' | 'story29' | 'story30') => StoryTranslation;
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

  const t = (key: Exclude<keyof Translations['en'], 'story1' | 'story2' | 'story3' | 'story4' | 'story5' | 'story6' | 'story7' | 'story8' | 'story9' | 'story10' | 'story11' | 'story12' | 'story13' | 'story14' | 'story15' | 'story16' | 'story17' | 'story18' | 'story19' | 'story20' | 'story21' | 'story22' | 'story23' | 'story24' | 'story25' | 'story26' | 'story27' | 'story28' | 'story29' | 'story30'>) => {
    return translations[language]?.[key] as string || translations['en'][key] as string;
  };

  const tStory = (key: 'story1' | 'story2' | 'story3' | 'story4' | 'story5' | 'story6' | 'story7' | 'story8' | 'story9' | 'story10' | 'story11' | 'story12' | 'story13' | 'story14' | 'story15' | 'story16' | 'story17' | 'story18' | 'story19' | 'story20' | 'story21' | 'story22' | 'story23' | 'story24' | 'story25' | 'story26' | 'story27' | 'story28' | 'story29' | 'story30') => {
    return translations[language]?.[key] as StoryTranslation || translations['en'][key] as StoryTranslation;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleLanguageChange, 
      t,
      tStory
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