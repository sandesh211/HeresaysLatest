import axios from "axios";

export const TranslateText= async (textData,lang1,lang2)=>{
    let fromLang = 'en';
    let toLang = 'no' ; // translate to norwegian
    let text = 'something to translate';
    
    const API_KEY = 'AIzaSyDJyDB2bnmeDG4KHOZkHnrDqhrqnUI375M';
    
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(textData);
    url += `&source=${lang1}`;
    url += `&target=${lang2}`;
    url +=`&format=text`;

    let result= await axios.get(url,{headers:{
        
        "Content-Type": "application/json",
        Accept: "application/json"
    }})

    return result.data.data.translations[0].translatedText
}

