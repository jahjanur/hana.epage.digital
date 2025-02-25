import React, { useState } from 'react';
import './Book-v.css';
import StoryModal from './StoryModal';
import images from '../../utils/loadImages'; // Import the images

interface Story {
  id: number;
  title: string;
  content: string;
  image?: string; // Optional property for the image
}

const Book: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const stories: Story[] = [
    {
      id: 1,
      title: "Receptorët e Dhimbjes në Lëkurë",
      content: "🔹 Kurani thotë: 'Ne do t'i djegim ata në zjarr; sapo lëkura e tyre të digjet plotësisht, ne do t'i zëvendësojmë që ata të vazhdojnë të ndiejnë dhimbjen.' (Kuran 4:56)\n\n🌍 Zbulimi Shkencor:\nShkenca konfirmon se receptorët e dhimbjes janë në lëkurë. 1400 vjet më parë, njerëzit besonin se dhimbja ndjehej përmes trurit ose gjakut.",
      image: images['1.webp'], // Use the imported image
    },
    {
      id: 2,
      title: "Bija e Njeriut të Verbër",
      content: "Një vajzë dëshiroi që babai i saj të mund ta shihte bukurinë e saj. Një ditë, ajo gjeti një letër të vjetër:\n'Unë të dhashë sytë e mi kur ishe 5 vjeç. Ishte e vlefshme.'\n\n🌙 Mësimi: Disa dashuri janë aq të thella, saqë mbeten të padukshme.",
      image: images['3.webp'], // Use the imported image
    },
    {
      id: 3,
      title: "Besimi",
      content: "Besimi në Islam, siç theksohet në Kuran, qendron në besimin në një Zot dhe ofron udhëzime për njerëzimin, duke theksuar veprat e drejta, dhembshurinë, mëshirën dhe rëndësinë e Ditës së Gjykimit.",
      image: images['2.webp'], // Use the imported image
    },
    {
      id: 4,
      title: "Burri Që Kurrë Nuk Kërkoi Falje",
      content: "Një burrë kurrë nuk i kërkoi falje gruas së tij për gabimet e tij. Pasi ajo vdiq, ai qau, duke dëshiruar të kishte thënë thjesht, 'Më fal.'\n\n🌙 Mësimi: Kërkoni falje derisa të keni ende mundësi.",
      image: images['3.webp'], // Use the imported image
    },
    {
      id: 5,
      title: "Tërheqja Misterioze e Kaabës",
      content: "🔹 Kaaba në Mekkë është qendra shpirtërore e botës, dhe miliona përballen me të për lutje.\n\n🌍 Misteri Shkencor: Ajo përputhet perfekt me qendrën magnetike të Tokës, pa ndonjë shpjegim shkencor për këtë fenomen.\n\n🌙 Mësimi: Disa mistere hyjnore mbeten përtej kuptimit njerëzor.",
      image: images['4.webp'], // Use the imported image
    },
    {
      id: 6,
      title: "Forca e Durimit",
      content: "Profeti Nuh (Noe) predikoi për 950 vjet, por vetëm disa besuan. Ai vazhdoi me durim. Kur Allahu e urdhëroi të ndërtonte një arkë, njerëzit qeshnin me të. Por kur erdhi përmbytja, vetëm besimtarët mbijetuan.\n\n🌙 Mësimi: Durimi përballë vështirësive çon në sukses.",
      image: images['5.webp'],
    },
    {
      id: 7,
      title: "Sezoni Fibonacci në Krijim",
      content: "🔹 Sezoni Fibonacci (1,1,2,3,5,8,13…) shfaqet në të gjithë natyrën - në bimë, galaktika dhe ADN.\n\n🌍 Mrekullia Shkencore: Ky model matematikor gjendet në strukturën e gjithçkaje që Allahu krijoi.\n\n🌙 Mësimi: Ka një rend të hyjshëm në të gjithë krijimin.",
      image: images['6.webp'],
    },
    {
      id: 8,
      title: "Pendimi i Doktorit",
      content: "Një doktor refuzoi të trajtonte pacientët e varfër. Një ditë, djali i tij kishte nevojë për ndihmë emergjente në një spital tjetër. Doktori atje gjithashtu refuzoi, duke thënë 'Pa para, pa trajtim.' Fëmija nuk mbijetoi.\n\n🌙 Mësimi: Trajtoni të tjerët siç dëshironi të trajtoheni.",
      image: images['7.webp'],
    },
    {
      id: 9,
      title: "Pesha e Veprave të Mira",
      content: "Një njeri i dha ujë një qeni të etur. Profeti Muhammad ﷺ tha se ky akt i thjeshtë e fitoi atë parajsën.\n\n🌙 Mësimi: Asnjë vepër e mirë nuk është shumë e vogël në sytë e Allahut.",
      image: images['8.webp'],
    },
    {
      id: 10,
      title: "Lutja e Nënës",
      content: "Një nënë lutej për suksesin e djalit të saj çdo ditë. Vite më vonë, kur ai u bë i suksesshëm, ai tha, 'Unë punova shumë për këtë.' Ajo qeshi dhe tha, 'Dhe unë lutej shumë për këtë.'\n\n🌙 Mësimi: Mos e nënvlerësoni fuqinë e lutjes së një nëne.",
      image: images['9.webp'],
    },
    {
      id: 11,
      title: "Mali i Mëshirës",
      content: "Në Malin Arafat, Profeti Muhammad ﷺ mbajti predikimin e tij të fundit, duke theksuar barazinë dhe të drejtat njerëzore. Sot, miliona mblidhen atje gjatë Haxhit.\n\n🌙 Mësimi: Të gjithë njerëzit janë të barabartë në Islam, si dhëmbët e një këmbe.",
      image: images['10.webp'],
    },
    {
      id: 12,
      title: "Universi në Zgjerim",
      content: "🔹 Kurani thotë: 'Dhe qielli e ndërtuam me forcë, dhe me të vërtetë, ne jemi [të] zgjeruesit e tij.' (51:47)\n\n🌍 Zbulimi Shkencor: Në vitin 1929, shkencëtarët zbuluan se universi po zgjerohet.\n\n🌙 Mësimi: Kurani përshkroi zgjerimin kozmik 1400 vjet më parë.",
      image: images['11.webp'],
    },
    {
      id: 13,
      title: "Forca e Dua",
      content: "Një djalosh lutej për vite për t'u bërë një person më të mirë. Vite më vonë, miqtë e tij e vërejtën ndryshimin para se ai ta bënte vetë.\n\n🌙 Mësimi: Lutja e vazhdueshme sjell ndryshime graduale, por të përhershme.",
      image: images['12.webp'],
    },
    {
      id: 14,
      title: "Mrekullia e Hekurit",
      content: "🔹 Kurani përmend se hekuri u 'dërgua' në Tokë. (57:25)\n\n🌍 Fakti Shkencor: Hekuri nuk formohet natyrshëm në Tokë; ai erdhi nga hapësira përmes meteorëve.\n\n🌙 Mësimi: Kurani përmban fakte shkencore të panjohura në kohën e tij.",
      image: images['13.webp'],
    },
    {
      id: 15,
      title: "Vlera e Kohës",
      content: "Profeti Muhammad ﷺ tha: 'Shfrytëzoni pesë para pesë: rinia juaj para pleqërisë, shëndeti juaj para sëmundjes, pasuria juaj para varfërisë, koha juaj e lirë para se të bëheni të zënë, dhe jeta juaj para vdekjes.'\n\n🌙 Mësimi: Koha është pasuria jonë më e çmuar.",
      image: images['14.webp'],
    },
    {
      id: 16,
      title: "Detet e Thella dhe Valët e Brendshme",
      content: "🔹 Kurani përshkruan 'errësirën në një det të thellë, të mbuluar nga valët, mbi të cilat janë valë.'\n\n🌍 Shkenca Moderne: Detet e thella kanë valë të brendshme nën valët e sipërme, të zbuluara vetëm me pajisje moderne.\n\n🌙 Mësimi: Kurani përshkruan saktësisht fenomenet oqeanike.",
      image: images['15.webp'],
    },
    {
      id: 17,
      title: "Nëna e Durueshme",
      content: "Një nënë priti 23 vjet për djalin e saj që të kthehej. Kur e pyetën pse mbante një dritë ndezur çdo natë, ajo tha, 'Në mënyrë që ai të mund të gjejë rrugën e tij për në shtëpi.'\n\n🌙 Mësimi: Dashuria e një nëne nuk njeh kufij.",
      image: images['17.webp'],
    },
    {
      id: 18,
      title: "Malet si Çakëll",
      content: "🔹 Kurani përshkruan malet si 'çakëll' (78:7).\n\n🌍 Zbulimi Gjeologjik: Malet kanë rrënjë të thella që stabilizojnë litosferën e Tokës, si çakëllat që stabilizojnë një çadër.\n\n🌙 Mësimi: Çdo përshkrim kur'anik ka saktësi shkencore.",
      image: images['18.webp'],
    },
    {
      id: 19,
      title: "Forca e Faljes",
      content: "Kur Meka u pushtua, Profeti Muhammad ﷺ falëu ata që e kishin persekutuar për vite, duke thënë 'Shkoni, jeni të lirë.'\n\n🌙 Mësimi: Forca e vërtetë qëndron në falje, jo në hakmarrje.",
      image: images['19.webp'],
    },
    {
      id: 20,
      title: "Identiteti i Faraonit",
      content: "🔹 Kurani përmend se trupi i Faraonit do të ruhej (10:92).\n\n🌍 Zbulimi Historik: Mumja e Ramesses II, e besuar të jetë Faraoni i Eksodit, u gjet e ruajtur.\n\n🌙 Mësimi: Profecitë kur'anike janë përmbushur.",
      image: images['20.webp'],
    },
    {
      id: 21,
      title: "Tregtari Ndershëm",
      content: "Një tregtar zbuloi para të tepërta pas një shitjeje. Ai udhëtoi dy ditë për ta kthyer atë te klienti.\n\n🌙 Mësimi: Ndershmëria në biznes sjell bekimet e Allahut.",
      image: images['21.webp'],
    },
    {
      id: 22,
      title: "Formimi i Reve",
      content: "🔹 Kurani përshkruan fazat e formimit të reve (24:43).\n\n🌍 Fakti Meteorologjik: Shkenca moderne konfirmon këto faza të sakta të formimit të reve dhe prodhimit të shiut.\n\n🌙 Mësimi: Kurani përshkruan proceset atmosferike saktësisht.",
      image: images['22.webp'],
    },
    {
      id: 23,
      title: "Dhurata e Shikimit",
      content: "Një njeri i verbër e falënderoi Allahun çdo ditë për verbërinë e tij. Kur e pyetën pse, ai tha, 'Ajo më mbrojti nga të parit atë që Allahu e ka ndaluar.'\n\n🌙 Mësimi: Çdo kusht ka bekime të fshehura.",
      image: images['23.webp'],
    },
    {
      id: 24,
      title: "Barriera Ndërmjet Deteve",
      content: "🔹 Kurani përmend një barrierë midis dy deteve që takohen por nuk përzihen (55:19-20).\n\n🌍 Zbulimi Oqeanografik: Dete të ndryshme kanë barriera të salinitetit dhe densitetit.\n\n🌙 Mësimi: Kurani përshkruan fenomenet detare saktësisht.",
      image: images['24.webp'],
    },
    {
      id: 25,
      title: "Besimtarët e Rinj",
      content: "🔹 Populli i Shpellës ishin djem të rinj që qëndruan të fortë në besimin e tyre pavarësisht persekutimit.\n\n🌙 Mësimi: Rinia mund të jetë kampionë të së vërtetës.",
      image: images['25.webp'],
    },
    {
      id: 26,
      title: "Zhvillimi i Embrionit",
      content: "🔹 Kurani përshkruan fazat e zhvillimit embrional (23:14).\n\n🌍 Fakti Embriologjik: Shkenca moderne konfirmon këto faza saktësisht siç përshkruhen.\n\n🌙 Mësimi: Kurani përmban njohuri shkencore të sakta.",
      image: images['26.webp'],
    },
    {
      id: 27,
      title: "Shpërblimi i Durimit",
      content: "Profeti Ayyub (Job) mbeti mirënjohës pavarësisht humbjes së shëndetit, pasurisë dhe familjes.\n\n🌙 Mësimi: Durimi në vështirësi çon në shpërblime më të mëdha.",
      image: images['27.webp'],
    },
    {
      id: 28,
      title: "Mrekullia e Pëllëmbës",
      content: "🔹 Kurani përmend aftësinë e Allahut për të rikonstruktuar pëllëmbët e duarve (75:4).\n\n🌍 Fakti Shkencor: Çdo pëllëmbë është unike, një fakt i zbuluar në shekullin e 19-të.\n\n🌙 Mësimi: Kurani sugjeron zbulime shkencore.",
      image: images['28.webp'],
    },
    {
      id: 29,
      title: "Nata e Fuqisë",
      content: "🔹 Nata e Fuqisë është më e mirë se një mijë muaj. Një natë e adhurimit të sinqertë është e barabartë me mbi 83 vjet adhurim.\n\n🌙 Mësimi: Allahu shumëfishon shpërblimet përtej imagjinatës sonë.",
      image: images['29.webp'],
    },
    {
      id: 30,
      title: "Ora e Fundit",
      content: "Profeti Muhammad ﷺ tha: 'Nëse Ora e Fundit vjen ndërsa keni një prerje palme në duar dhe është e mundur ta mbillni para se të vijë Ora, duhet ta mbillni atë.'\n\n🌙 Mësimi: Vazhdoni veprat e mira deri në frymën tuaj të fundit.",
      image: images['30.webp'],
    },
  ];

  const handleStoryClick = (story: Story, index: number) => {
    setSelectedStory(story);
    setCurrentIndex(index);
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (currentIndex !== null) {
      const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (newIndex >= 0 && newIndex < stories.length) {
        setSelectedStory(stories[newIndex]);
        setCurrentIndex(newIndex);
      }
    }
  };

  // Function to get the day of the week (starting from Monday)
  const getDayOfWeek = (index: number): string => {
    const days = ['E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë', 'E Diel'];
    
    return days[(index + 1) % 7]; // Adjusted to start from Saturday
  };

  // Function to create calendar array with only filled slots
  const createCalendarArray = () => {
    const calendar = new Array(35).fill(null); // 5 rows x 7 columns
    stories.slice(0, 30).forEach((story, index) => {
      calendar[index + 4] = story; // Start filling from index 4 (Saturday)
    });
    return calendar;
  };

  return (
    <div className="book-container">
      <h1 className="book-title"> Tregime dhe Mrekulli Shkencore në Kuran</h1>
      <div className="stories-grid">
        {createCalendarArray().map((story, index) => {
          if (!story) return null; // Skip rendering for empty days

          return (
            <div
              key={index}
              className="story-card"
              style={{ '--i': index } as React.CSSProperties}
              onClick={() => handleStoryClick(story, index - 4)}
            >
              <>
                <h3>{story.title}</h3>
                <div className="story-number">{getDayOfWeek(index)}</div>
                <div className="date-number">{index - 3}</div>
              </>
            </div>
          );
        })}
      </div>
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
};

export default Book;
