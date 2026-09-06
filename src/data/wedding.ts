export const wedding = {
  couple: {
    partnerOne: "Didiet",
    partnerTwo: "Fiya",
    partnerOneFull: "Didiet Kurniawan",
    partnerTwoFull: "Sofiyyah Azizah",
    groomParents: "Putra Bapak Sunardi dan Ibu Suhaemah",
    brideParents: "Putri Bapak Junaidi dan Ibu Nurhayati",
  },
  headline: "The Wedding Of",
  bismillah: "Bismillahirrahmanirrahim",
  salam: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
  intro:
    "Dengan memohon Rahmat dan Ridho Allah SWT Kami bermaksud menyelenggarakan acara Pernikahan :",
  date: {
    iso: "2026-09-26T07:00:00+08:00",
    weekday: "Saturday",
    weekdayId: "Sabtu",
    day: "26",
    month: "September",
    year: "2026",
    display: "Saturday, 26 September 2026",
  },
  eventIntro: "Yang Insyallah akan dilaksanakan pada hari",
  akad: "07.00 Wita",
  resepsi: "09.00 Wita",
  venue: "GEDUNG HOTEL SERNU RAYA",
  address: "Jl. Bungur No. 18, Labuhan Sumbawa, Sumbawa Besar",
  mapUrl: "https://maps.google.com/?q=Hotel+Sernu+Raya+Jl+Bungur+Sumbawa+Besar",
  mapEmbed:
    "https://maps.google.com/maps?q=Hotel+Sernu+Raya+Jl+Bungur+Sumbawa+Besar&output=embed",
  calendarUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan%20Didiet%20%26%20Fiya&dates=20260926T070000/20260926T140000&ctz=Asia/Makassar&details=Akad%20Nikah%2007.00%20Wita%0AResepsi%2009.00%20Wita%0AGEDUNG%20HOTEL%20SERNU%20RAYA&location=Hotel%20Sernu%20Raya%2C%20Jl.%20Bungur%20No.%2018%2C%20Labuhan%20Sumbawa%2C%20Sumbawa%20Besar",
  ceremony: {
    title: "Akad Nikah",
    time: "07.00 Wita",
    venue: "GEDUNG HOTEL SERNU RAYA",
    address: "Jl. Bungur No. 18, Labuhan Sumbawa, Sumbawa Besar",
    mapUrl: "https://maps.google.com/?q=Hotel+Sernu+Raya+Jl+Bungur+Sumbawa+Besar",
  },
  reception: {
    title: "Resepsi",
    time: "09.00 Wita",
    venue: "GEDUNG HOTEL SERNU RAYA",
    address: "Jl. Bungur No. 18, Labuhan Sumbawa, Sumbawa Besar",
    mapUrl: "https://maps.google.com/?q=Hotel+Sernu+Raya+Jl+Bungur+Sumbawa+Besar",
  },
  quote: "Two souls, one heart — and a lifetime of ordinary days made extraordinary.",
  dressCode: "Garden formal · champagne, ivory & sage",
  quranArabic:
    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
  quranTranslation:
    "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.",
  quranSource: "QS. Ar-Rum Ayat 21",
  gifts: [
    { bank: "Bank Mandiri", name: "Sofiyyah Aziizah", number: "1610013070235" },
    { bank: "Bank BNI", name: "Sofiyyah Aziizah", number: "1852060531" },
  ],
} as const;

export type Wedding = typeof wedding;
