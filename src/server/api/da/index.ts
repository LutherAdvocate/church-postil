// List of sermons in Luther's Church Postil
export default defineEventHandler(() => {
  const daSermons = [
    { label: 'Advent Postil; Advents søndagene', type: 'label' },

    { id: 1011, postil: 'Advent', tags: 'Epistel', label: '1.Søn.i Adv.', bible: 'Rom 13: 11-14' },
    { id: 1012, postil: 'Advent', tags: 'Evangelium', label: '1.Søn.i Adv.', bible: 'Matt 21: 1-9' },
    { id: 1021, postil: 'Advent', tags: 'Epistel', label: '2.Søn.i Adv.', bible: 'Rom 15: 4-13' },
    { id: 1022, postil: 'Advent', tags: 'Evangelium', label: '2.Søn.i Adv.', bible: 'Luk 21: 25-36' },
    { id: 1031, postil: 'Advent', tags: 'Epistel', label: '3.Søn.i Adv.', bible: '1 Kor 4: 1-5' },
    { id: 1032, postil: 'Advent', tags: 'Evangelium', label: '3.Søn.i Adv.', bible: 'Matt 11: 2-10' },
    { id: 1041, postil: 'Advent', tags: 'Epistel', label: '4.Søn.i Adv.', bible: 'Fil 4: 4-7' },
    { id: 1042, postil: 'Advent', tags: 'Evangelium', label: '4.Søn.i Adv.', bible: 'Joh 1: 19-28' },

    { type: 'separator' },
    { label: 'Jule Postil; Juleaften - Helligtrekongersd.', type: 'label' },

    { id: 2001, postil: 'Jul', tags: 'Epistel', label: 'Juleaften', bible: 'Tit 2: 11-15' },
    { id: 2002, postil: 'Jul', tags: 'Evangelium', label: 'Juleaften', bible: 'Luk 2: 1-14' },
    { id: 2011, postil: 'Jul', tags: 'Epistel', label: '1. Juledag', bible: 'Tit 3: 4-7' },
    { id: 2012, postil: 'Jul', tags: 'Evangelium', label: '1. Juledag', bible: 'Luk 2: 15-20' },
    { id: 2013, postil: 'Jul', tags: 'Epistel', label: '1. Juledag', bible: 'Heb 1: 1-12' },
    { id: 2014, postil: 'Jul', tags: 'Evangelium', label: '1. Juledag', bible: 'Joh 1: 1-14' },
    { id: 2021, postil: 'Jul', tags: 'Epistel', label: '2. Juledag', bible: 'ApG 6: 8-14 & 7:54-60' },
    { id: 2022, postil: 'Jul', tags: 'Evangelium', label: '2. Juledag', bible: 'Matt 23: 34-39' },
    { id: 2031, postil: 'Jul', tags: 'Epistel', label: '3. Juledag', bible: 'Sir 15: 1-6' },
    { id: 2032, postil: 'Jul', tags: 'Evangelium', label: '3. Juledag', bible: 'Joh 21: 19-23' },
    { id: 2041, postil: 'Jul', tags: 'Epistel', label: 'Julesøndag', bible: 'Gal 4: 1-7' },
    { id: 2042, postil: 'Jul', tags: 'Evangelium', label: 'Julesøndag', bible: 'Luk 2: 33-40' },
    { id: 2051, postil: 'Jul', tags: 'Epistel', label: 'Nyårsdag', bible: 'Gal 3: 23-29' },
    { id: 2052, postil: 'Jul', tags: 'Evangelium', label: 'Nyårsdag', bible: 'Luk 2: 21' },
    { id: 2061, postil: 'Jul', tags: 'Epistel', label: 'Tre Konger', bible: 'Es 60: 1-6' },
    { id: 2062, postil: 'Jul', tags: 'Evangelium', label: 'Tre Konger', bible: 'Matt 2: 1-12' },

    { type: 'separator' },
    { label: 'Faste Postil; Åb.søndagene - Langfre.', type: 'label' },

    { id: 3111, postil: 'Faste', tags: 'Epistel', label: '1.S.e.Åbenb.', bible: 'Rom 12: 1-5' },
    { id: 3112, postil: 'Faste', tags: 'Evangelium', label: '1.S.e.Åbenb.', bible: 'Luk 2: 41-52' },
    /* id: 3113 Not Translated to Danish: "1.Sun after Epi 2.sermon Luk 2: 41-52" */
    { id: 3121, postil: 'Faste', tags: 'Epistel', label: '2.S.e.Åbenb.', bible: 'Rom 12: 6-16' },
    { id: 3122, postil: 'Faste', tags: 'Evangelium', label: '2.S.e.Åbenb.', bible: 'Joh 2: 1-11' },
    { id: 3131, postil: 'Faste', tags: 'Epistel', label: '3.S.e.Åbenb.', bible: 'Rom 12: 16-21' },
    { id: 3132, postil: 'Faste', tags: 'Evangelium', label: '3.S.e.Åbenb.', bible: 'Matt 8: 1-13' },
    { id: 3141, postil: 'Faste', tags: 'Epistel', label: '4.S.e.Åbenb.', bible: 'Rom 13: 8-10' },
    { id: 3142, postil: 'Faste', tags: 'Evangelium', label: '4.S.e.Åbenb.', bible: 'Matt 8: 23-27' },
    { id: 3151, postil: 'Faste', tags: 'Epistel', label: '5.S.e.Åbenb.', bible: 'Kol 3: 12-17' },
    { id: 3152, postil: 'Faste', tags: 'Evangelium', label: '5.S.e.Åbenb.', bible: 'Matt 13: 24-30' },

    { id: 3211, postil: 'Faste', tags: 'Epistel', label: 'Septuagesima', bible: '1 Kor 9: 24-10:5' },
    { id: 3212, postil: 'Faste', tags: 'Evangelium', label: 'Septuagesima', bible: 'Matt 20: 1-16' },
    { id: 3221, postil: 'Faste', tags: 'Epistel', label: 'Seksagesima', bible: '2 Kor 11: 19-12:9' },
    { id: 3222, postil: 'Faste', tags: 'Evangelium', label: 'Seksagesima', bible: 'Luk 8: 5-15' },
    { id: 3231, postil: 'Faste', tags: 'Epistel', label: 'Fastelavenss.', bible: '1 Kor 13: 1-13' },
    { id: 3232, postil: 'Faste', tags: 'Evangelium', label: 'Fastelavenss.', bible: 'Luk 18: 31-43' },

    { id: 3311, postil: 'Faste', tags: 'Epistel', label: '1.Søn.i Faste', bible: '2 Kor 6: 1-10' },
    { id: 3312, postil: 'Faste', tags: 'Evangelium', label: '1.Søn.i Faste', bible: 'Matt 4: 1-11' },
    { id: 3321, postil: 'Faste', tags: 'Epistel', label: '2.Søn.i Faste', bible: '1 Thess 4: 1-7' },
    { id: 3322, postil: 'Faste', tags: 'Evangelium', label: '2.Søn.i Faste', bible: 'Matt 15: 21-28' },
    { id: 3331, postil: 'Faste', tags: 'Epistel', label: '3.Søn.i Faste', bible: 'Ef 5: 1-9' },
    { id: 3332, postil: 'Faste', tags: 'Evangelium', label: '3.Søn.i Faste', bible: 'Luk 11: 14-28' },
    { id: 3341, postil: 'Faste', tags: 'Epistel', label: '4.Søn.i Faste', bible: 'Gal 4: 21-31' },
    { id: 3342, postil: 'Faste', tags: 'Epistel', label: '4.Søn.i Faste', bible: 'Joh 6: 1-15' },

    { id: 3344, postil: 'Faste', tags: 'Evangelium', label: 'Maria Bebud.', bible: 'Luk 1: 26-38' },

    { id: 3351, postil: 'Faste', tags: 'Epistel', label: '5.Søn.i Faste', bible: 'Heb 9: 11-15' },
    { id: 3352, postil: 'Faste', tags: 'Evangelium', label: '5.Søn.i Faste', bible: 'Joh 8: 46-59' },

    { id: 3401, postil: 'Faste', tags: 'Epistel', label: 'Palmesøndag', bible: 'Fil 2: 5-11' },
    { id: 3402, postil: 'Faste', tags: 'Evangelium', label: 'Skærtorsdag', bible: '1 Kor 11: 23-26' },
    { id: 3403, postil: 'Faste', tags: 'Evangelium', label: 'Langfredag', bible: 'Matt 27: 27-50' },

    { type: 'separator' },
    { label: 'Påske Postil; Søn. e. Påske - Pinse - Tref.', type: 'label' },

    { id: 4011, postil: 'Påske', tags: 'Epistel', label: '1.Påskedag', bible: '1 Kor 5: 7-8' },
    { id: 4012, postil: 'Påske', tags: 'Gospel', label: '1.Påskedag', bible: 'Mark 16: 1-8' },

    { id: 4021, postil: 'Påske', tags: 'Epistel', label: '2.Påskedag', bible: 'ApG 10: 34-43' },
    { id: 4022, postil: 'Påske', tags: 'Gospel', label: '2.Påskedag', bible: 'Luk 24: 13-35' },

    { id: 4031, postil: 'Påske', tags: 'Epistel', label: '3.Påskedag', bible: 'ApG 13: 26-39' },
    { id: 4032, postil: 'Påske', tags: 'Gospel', label: '3.Påskedag', bible: 'Luk 24: 36-47' },
    { id: 4033, postil: 'Påske', tags: 'Gospel', label: '3.Påskedag', bible: 'Luk 24: 36-47' },

    { id: 4041, postil: 'Påske', tags: 'Epistle', label: '4.Påskedag', bible: 'Kol 3: 1-7' },

    { id: 4111, postil: 'Påske', tags: 'Epistel', label: '1.Søn.e.påske', bible: '1 Joh 5: 4-12' },
    { id: 4112, postil: 'Påske', tags: 'Evangelium', label: '1.Søn.e.påske', bible: 'Joh 20: 19-31' },
    { id: 4113, postil: 'Påske', tags: 'Evangelium', label: '2.Sermon', bible: 'Joh 20: 19-31' },
    { id: 4121, postil: 'Påske', tags: 'Epistel', label: '2.Søn.e.påske', bible: '1 Pet 2: 20-25' },
    { id: 4122, postil: 'Påske', tags: 'Evangelium', label: '2.Søn.e.påske', bible: 'Joh 10: 11-16' },
    { id: 4131, postil: 'Påske', tags: 'Epistel', label: '3.Søn.e.påske', bible: '1 Pet 2: 11-20' },
    { id: 4132, postil: 'Påske', tags: 'Evangelium', label: '3.Søn.e.påske', bible: 'Joh 16: 16-23' },
    { id: 4141, postil: 'Påske', tags: 'Epistel', label: '4.Søn.e.påske', bible: 'Jak 1: 16-21' },
    { id: 4142, postil: 'Påske', tags: 'Evangelium', label: '4.Søn.e.påske', bible: 'Joh 16: 5-15' },
    { id: 4152, postil: 'Påske', tags: 'Evangelium', label: '5.Søn.e.påske', bible: 'Joh 16: 23-30' },

    { id: 4160, postil: 'Påske', tags: 'Epistel', label: 'K.Himmelfart', bible: 'Mark 16: 14-20' },

    { id: 4161, postil: 'Påske', tags: 'Epistel', label: '6.Søn.e.påske', bible: '1 Pet 4: 7-11' },
    { id: 4162, postil: 'Påske', tags: 'Evangelium', label: '6.Søn.e.påske', bible: 'Joh 15: 26-16: 4' },

    { id: 4211, postil: 'Påske', tags: 'Epistel', label: 'Pinsedag', bible: 'ApG 2: 1-13' },
    { id: 4212, postil: 'Påske', tags: 'Evangelium', label: 'Pinsedag', bible: 'Joh 14: 23-31' },
    { id: 4222, postil: 'Påske', tags: 'Epistel', label: '2.Pinsedag', bible: 'Joh 3: 16-21' },
    { id: 4232, postil: 'Påske', tags: 'Evangelium', label: '3.Pinsedag', bible: 'Joh 10: 1-10' },

    { type: 'separator' },
    { label: 'Trinity I; 1 - 12. Søndag efter Trefoldighed', type: 'label' },

    { id: 5001, postil: 'Trefoldighed I', tags: 'Epistel', label: 'Trinitatis s.', bible: 'Rom 11: 33-36' },
    { id: 5002, postil: 'Trefoldighed I', tags: 'Evangelium', label: 'Trinitatis s.', bible: 'Joh 3: 1-15' },
    { id: 5003, postil: 'Trefoldighed I', tags: 'Evangelium', label: 'Trin.2.sermon', bible: 'Joh 3: 1-15' },

    { id: 5011, postil: 'Trefoldighed I', tags: 'Epistel', label: '1.Søn.e.Tref.', bible: '1 Joh 4: 16-21' },
    { id: 5012, postil: 'Trefoldighed I', tags: 'Evangelium', label: '1.Søn.e.Tref.', bible: 'Luk 16: 19-31' },
    { id: 5021, postil: 'Trefoldighed I', tags: 'Epistel', label: '2.Søn.e.Tref.', bible: '1 Joh 3: 13-18' },
    { id: 5022, postil: 'Trefoldighed I', tags: 'Evangelium', label: '2.Søn.e.Tref.', bible: 'Luk 14: 16-24' },
    { id: 5031, postil: 'Trefoldighed I', tags: 'Epistel', label: '3.Søn.e.Tref.', bible: '1 Pet 5: 5-11' },
    { id: 5032, postil: 'Trefoldighed I', tags: 'Evangelium', label: '3.Søn.e.Tref.', bible: 'Luk 15: 1-10' },
    { id: 5041, postil: 'Trefoldighed I', tags: 'Epistel', label: '4.Søn.e.Tref.', bible: 'Rom 8: 18-22' },
    { id: 5042, postil: 'Trefoldighed I', tags: 'Evangelium', label: '4.Søn.e.Tref.', bible: 'Luk 6: 36-42' },
    { id: 5051, postil: 'Trefoldighed I', tags: 'Epistel', label: '5.Søn.e.Tref.', bible: '1 Pet 3: 8-15' },
    { id: 5052, postil: 'Trefoldighed I', tags: 'Evangelium', label: '5.Søn.e.Tref.', bible: 'Luk 5: 1-11' },
    { id: 5061, postil: 'Trefoldighed I', tags: 'Epistel', label: '6.Søn.e.Tref.', bible: 'Rom 6: 3-11' },
    { id: 5062, postil: 'Trefoldighed I', tags: 'Evangelium', label: '6.Søn.e.Tref.', bible: 'Matt 5: 20-26' },
    { id: 5071, postil: 'Trefoldighed I', tags: 'Epistel', label: '7.Søn.e.Tref.', bible: 'Rom 6: 19-23' },
    { id: 5072, postil: 'Trefoldighed I', tags: 'Evangelium', label: '7.Søn.e.Tref.', bible: 'Mark 8: 1-9' },
    { id: 5081, postil: 'Trefoldighed I', tags: 'Epistel', label: '8.Søn.e.Tref.', bible: 'Rom 8: 12-17' },
    { id: 5082, postil: 'Trefoldighed I', tags: 'Evangelium', label: '8.Søn.e.Tref.', bible: 'Matt 7: 15-23' },
    { id: 5091, postil: 'Trefoldighed I', tags: 'Epistel', label: '9.Søn.e.Tref.', bible: '1 Kor 10: 6-13' },
    { id: 5092, postil: 'Trefoldighed I', tags: 'Evangelium', label: '9.Søn.e.Tref.', bible: 'Luk 16: 1-9' },
    { id: 5101, postil: 'Trefoldighed I', tags: 'Epistel', label: '10.Søn.e.Tref.', bible: '1 Kor 12: 1-11' },
    { id: 5102, postil: 'Trefoldighed I', tags: 'Evangelium', label: '10.Søn.e.Tref.', bible: 'Luk 19: 41-48' },
    { id: 5111, postil: 'Trefoldighed I', tags: 'Epistel', label: '11.Søn.e.Tref.', bible: '1 Kor 15: 1-10' },
    { id: 5112, postil: 'Trefoldighed I', tags: 'Evangelium', label: '11.Søn.e.Tref.', bible: 'Luk 18: 9-14' },
    { id: 5121, postil: 'Trefoldighed I', tags: 'Epistel', label: '12.Søn.e.Tref.', bible: '2 Kor 3: 4-11' },
    { id: 5122, postil: 'Trefoldighed I', tags: 'Evangelium', label: '12.Søn.e.Tref.', bible: 'Mark 7: 31-37' },

    { type: 'separator' },
    { label: 'Trinity II; 13- 26. Søn. efter Trefoldighed', type: 'label' },

    { id: 6131, postil: 'Trefoldighed II', tags: 'Epistel', label: '13.Søn.e.Tref.', bible: 'Gal 3: 15-22' },
    { id: 6132, postil: 'Trefoldighed II', tags: 'Evangelium', label: '13.Søn.e.Tref.', bible: 'Luk 10: 23-37' },
    { id: 6141, postil: 'Trefoldighed II', tags: 'Epistel', label: '14.Søn.e.Tref.', bible: 'Gal 5: 16-24' },
    { id: 6142, postil: 'Trefoldighed II', tags: 'Evangelium', label: '14.Søn.e.Tref.', bible: 'Luk 17: 11-19' },
    { id: 6151, postil: 'Trefoldighed II', tags: 'Epistel', label: '15.Søn.e.Tref.', bible: 'Gal 5: 25 - 6:10' },
    { id: 6152, postil: 'Trefoldighed II', tags: 'Evangelium', label: '15.Søn.e.Tref.', bible: 'Matt 6: 24-34' },
    { id: 6161, postil: 'Trefoldighed II', tags: 'Epistel', label: '16.Søn.e.Tref.', bible: 'Ef 3: 13-21' },
    { id: 6162, postil: 'Trefoldighed II', tags: 'Evangelium', label: '16.Søn.e.Tref.', bible: 'Luk 7: 11-17' },
    { id: 6171, postil: 'Trefoldighed II', tags: 'Epistel', label: '17.Søn.e.Tref.', bible: 'Ef 4: 1-6' },
    { id: 6172, postil: 'Trefoldighed II', tags: 'Evangelium', label: '17.Søn.e.Tref.', bible: 'Luk 14: 1-11' },
    { id: 6181, postil: 'Trefoldighed II', tags: 'Epistel', label: '18.Søn.e.Tref.', bible: '1 Kor 1: 4-9' },
    { id: 6182, postil: 'Trefoldighed II', tags: 'Evangelium', label: '18.Søn.e.Tref.', bible: 'Matt 22: 34-46' },
    { id: 6191, postil: 'Trefoldighed II', tags: 'Epistel', label: '19.Søn.e.Tref.', bible: 'Ef 4: 22-28' },
    { id: 6192, postil: 'Trefoldighed II', tags: 'Evangelium', label: '19.Søn.e.Tref.', bible: 'Matt 9: 1-8' },
    { id: 6201, postil: 'Trefoldighed II', tags: 'Epistel', label: '20.Søn.e.Tref.', bible: 'Ef 5: 15-21' },
    { id: 6202, postil: 'Trefoldighed II', tags: 'Evangelium', label: '29.Søn.e.Tref.', bible: 'Matt 22: 1-14' },
    { id: 6211, postil: 'Trefoldighed II', tags: 'Epistel', label: '21.Søn.e.Tref.', bible: 'Ef 6: 10-17' },
    { id: 6212, postil: 'Trefoldighed II', tags: 'Evangelium', label: '21.Søn.e.Tref.', bible: 'Joh 4: 46-54' },
    { id: 6215, postil: 'Trefoldighed II', tags: 'Evangelium', label: 'AlleHelgensd.', bible: 'Matt 5: 1-12' },
    { id: 6221, postil: 'Trefoldighed II', tags: 'Epistel', label: '22.Søn.e.Tref.', bible: 'Fil 1: 3-11' },
    { id: 6222, postil: 'Trefoldighed II', tags: 'Evangelium', label: '22.Søn.e.Tref.', bible: 'Matt 18: 23-35' },
    { id: 6231, postil: 'Trefoldighed II', tags: 'Epistel', label: '23.Søn.e.Tref.', bible: 'Fil 3: 17-21' },
    { id: 6232, postil: 'Trefoldighed II', tags: 'Evangelium', label: '23.Søn.e.Tref.', bible: 'Matt 22: 15-22' },
    { id: 6241, postil: 'Trefoldighed II', tags: 'Epistel', label: '24.Søn.e.Tref.', bible: 'Kol 1: 3-14' },
    { id: 6242, postil: 'Trefoldighed II', tags: 'Evangelium', label: '24.Søn.e.Tref.', bible: 'Matt 9: 18-26' },
    { id: 6251, postil: 'Trefoldighed II', tags: 'Epistel', label: '25.Søn.e.Tref.', bible: '1 Thess 4: 13-18' },
    { id: 6252, postil: 'Trefoldighed II', tags: 'Evangelium', label: '25.Søn.e.Tref.', bible: 'Matt 24: 15-28' },
    { id: 6261, postil: 'Trefoldighed II', tags: 'Epistel', label: '26.Søn.e.Tref.', bible: '2 Thess 1: 3-10' },
    { id: 6262, postil: 'Trefoldighed II', tags: 'Evangelium', label: '26.Søn.e.Tref.', bible: 'Matt 25: 31-42' },

    { type: 'separator' }
  ]

  return daSermons
})

// All bible book references need be like the one in Mdc/TableComponent.vue
