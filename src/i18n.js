import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import { English , Arabic , Spanish} from './constants/locales/AllStaticContent';
import {
  English,
   Arabic,
   Spanish,
   Mandarin_Chinese,
   Russian,
   Bengali,
   Portuguese,
   Indonesian,
   French,
   Afrikaans,
   Basque,
   Catalan,
   Czech,
   Dutch,
   Finnish,
   Galician,
   German,
   Greek,
   Hebrew,
   Hungarian,
   Icelandic,
   Italian,
   Japanese,
   Korean,
   Latin,
   Norwegian,
   Polish,
   Romanian,
   Serbian,
   Slovak,
   Swedish,
   Turkish,
   Zulu,
   Albanian,
   Amharic,
   Armenian,
   Assamese,
   Aymara,
   Azerbaijani,
   Bambara,
   Belarusian,
   Bhojpuri,
   Bosnian,
   Bulgarian,
   Cebuano,
   Corsican,
   Croatian,
   Danish,
   Dhivehi,
   Dogri,
   Esperanto,
   Estonian,
   Ewe,
   Filipino,
   Frisian,
   Georgian,
   Guarani,
   Gujarati,
   Haitian_Creole,
   Hausa,
   Hawaiian,
   Hindi,
   Hmong,
   Igbo,
   Ilocano,
   Irish,
   Javanese,
   Kannada,
   Kazakh,
   Khmer,
   Kinyarwanda,
   Konkani,
   Krio,
   Kurdish,
   Kurdish_Sorani,
   Kyrgyz,
   Lao,
   Latvian,
   Lingala,
   Lithuanian,
   Luganda,
   Luxembourgish,
   Macedonian,
   Maithili,
   Malagasy,
   Malay,
   Malayalam,
   Maltese,
   Maori,
   Marathi,
   Mizo,
   Mongolian,
   Myanmar_Burmese,
   Nepali,
   Nyanja_Chichewa,
   Odia_Oriya,
   Oromo,
   Pashto,
   Persian,
   Punjabi,
   Quechua,
   Samoan,
   Sanskrit,
   Scots_Gaelic,
   Sepedi,
   Sesotho,
   Shona,
   Sindhi,
   Sinhala_Sinhalese,
   Slovenian,
   Somali,
   Sundanese,
   Swahili,
   Tagalog_Filipino,
   Tajik,
   Tamil,
   Tatar,
   Telugu,
   Thai,
   Tigrinya,
   Tsonga,
   Turkmen,
   Twi_Akan,
   Ukrainian,
   Urdu,
   Uyghur,
   Uzbek,
   Vietnamese,
   Welsh,
   Xhosa,
   Yiddish,
   Yoruba
} from './constants/locales/AllStaticContent';


const language = localStorage.getItem("prefered_language")
if (!language) {
  localStorage.setItem("prefered_language", "en")
}

const translateData = {
  "en-US": {
      translation: English
  },
  "zh-CN" : {
      translation: Mandarin_Chinese
  },
  "ar-SA": {
      translation: Arabic
  },
  "es-ES": {
      translation: Spanish
  },
  "ru-RU":{
      translation: Russian
  },
  "bn-BD":{
      translation: Bengali
  },
  "pt-PT":{
      translation: Portuguese
  },
  "id-ID":{
      translation: Indonesian
  },
  "fr-FR":{
      translation: French
  },
  "af":{
      translation: Afrikaans
  },
  "eu":{
      translation: Basque
  },
  "ca":{
      translation: Catalan
  },
  "cs":{
      translation: Czech
  },
  "nl-NL":{
      translation: Dutch
  },
  "fi":{
      translation: Finnish
  },
  "gl":{
      translation: Galician
  },
  "de-DE":{
      translation: German
  },
  "el-GR":{
      translation: Greek
  },
  "he":{
      translation: Hebrew
  },
  "hu" :{
      translation: Hungarian  
  },
  "is":{
      translation: Icelandic  
  },
  "it-IT":{
      translation: Italian
  },
  "ja":{
      translation: Japanese
  },
  "ko":{
      translation: Korean
  },
  "la":{
      translation: Latin
  },
  "no-NO":{
      translation: Norwegian
  },
  "pl":{
      translation: Polish
  },
  "ro-RO":{
      translation: Romanian
  },
  "sr-SP":{
      translation: Serbian
  },
  "sk":{
      translation: Slovak
  },
  "sv-SE":{
      translation: Swedish
  },
  "tr":{
      translation: Turkish
  },
  "zu":{
      translation: Zulu
  },
  "sq":{
      translation: Albanian
  },
  "am":{
      translation: Amharic
  },
  "hy":{
      translation: Armenian
  },
  "as":{
      translation: Assamese
  },
  "ay":{
      translation: Aymara
  },
  "az":{
      translation: Azerbaijani
  },
  "bm":{
      translation: Bambara
  },
  "be":{
      translation: Belarusian
  },
  "bho":{
      translation: Bhojpuri
  },
  "bs":{
      translation: Bosnian
  },
  "bg":{
      translation: Bulgarian
  },
  "ceb":{
      translation: Cebuano
  },
  "co":{

      translation: Corsican
  },
  "hr":{
      translation: Croatian
  },
  "da":{
      translation: Danish
  },
  "dv":{
      translation: Dhivehi
  },
  "doi":{
      translation: Dogri
  },
  "eo":{
      translation: Esperanto
  },
  "et":{
      translation: Estonian
  },
  "ee":{
      translation: Ewe
  },
  "fil":{
      translation: Filipino
  },
  "fy":{
      translation: Frisian
  },
  "ka":{
      translation: Georgian
  },
  "gn":{
      translation: Guarani
  },
  "gu":{
      translation: Gujarati
  },
  "ht":{
      translation: Haitian_Creole
  },
  "ha":{
      translation: Hausa
  },
  "haw":{
      translation: Hawaiian
  },
  "hi":{
      translation: Hindi
  },
  "hmn":{
      translation: Hmong
  },
  "ig":{
      translation: Igbo
  },
  "ilo":{
      translation: Ilocano
  },
  "ga":{
      translation: Irish
  },
  "jv":{
      translation: Javanese
  },
  "kn":{
      translation: Kannada
  },
  "kk":{
      translation: Kazakh
  },
  "km":{
      translation: Khmer
  },
  "rw":{
      translation: Kinyarwanda
  },
  "gom":{
      translation: Konkani
  },
  "kri":{
      translation: Krio
  },
  "ku":{
      translation: Kurdish
  },
  "ckb":{
      translation: Kurdish_Sorani
  },
  "ky":{
      translation: Kyrgyz
  },
  "lo":{
      translation: Lao
  },
  "lv":{
      translation: Latvian
  },
  "ln":{
      translation: Lingala
  },
  "lt":{
      translation: Lithuanian
  },
  "lg":{
      translation: Luganda
  },
  "lb":{
      translation: Luxembourgish
  },
  "mk":{
      translation: Macedonian
  },
  "mai":{
      translation: Maithili
  },
  "mg":{
      translation: Malagasy
  },
  "ms":{
      translation: Malay
  },
  "ml":{
      translation: Malayalam
  },
  "mt":{
      translation: Maltese
  },
  "mi":{
      translation: Maori
  },
  "mr":{
      translation: Marathi
  },
  "lus":{
      translation: Mizo
  },
  "mn":{
      translation: Mongolian
  },
  "my" :{
      translation: Myanmar_Burmese
  },
  "ne":{
      translation: Nepali
  },
  "ny":{
      translation: Nyanja_Chichewa
  },
  "or":{
      translation: Odia_Oriya
  },
  "om":{
      translation: Oromo
  },
  "ps":{
      translation: Pashto
  },
  "fa":{
      translation: Persian
  },
  "pa":{
      translation: Punjabi
  },
  "qu":{
      translation: Quechua
  },
  "sm":{
      translation: Samoan
  },
  "sa":{
      translation: Sanskrit
  },
  "gd":{
      translation: Scots_Gaelic
  },
  "nso":{
      translation: Sepedi
  },
  "st":{
      translation: Sesotho
  },
  "sn":{
      translation: Shona
  },
  "sd":{
      translation: Sindhi
  },
  "si":{
      translation: Sinhala_Sinhalese
  },
  "sl":{
      translation: Slovenian
  },
  "so":{
      translation: Somali
  },
  "su":{
      translation: Sundanese
  },
  "sw":{
      translation: Swahili
  },
  "tl":{
      translation: Tagalog_Filipino
  },
  "tg":{
      translation: Tajik
  },
  "ta":{
      translation: Tamil
  },
  "tt":{
      translation: Tatar
  },
  "te":{
      translation: Telugu
  },
  "th":{
      translation: Thai
  },
  "ti":{
      translation: Tigrinya
  },
  "ts":{
      translation: Tsonga
  },
  "tk":{
      translation: Turkmen
  },
  "ak":{
      translation: Twi_Akan
  },
  "uk":{
      translation: Ukrainian
  },
  "ur":{
      translation: Urdu
  },
  "ug":{
      translation: Uyghur
  },
  "uz":{
      translation: Uzbek
  },
  "vi":{
      translation: Vietnamese
  },
  "cy":{
      translation: Welsh
  },
  "xh":{
      translation: Xhosa
  },
  "yi":{
      translation: Yiddish
  },
  "yo":{
      translation: Yoruba
  },
}

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: translateData
  });

export default i18n;
