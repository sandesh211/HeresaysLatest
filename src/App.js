import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./routing/layout";
import { useImagePreloader } from "./pages/components/imagePreloader/imagepreloader";
import { CardData } from "./constants/cardconstants";
import backgroundImage from "./assets/images/background_images/gold-web.webp";
import Language from "./assets/images/language-bg.png";
import i18n from "i18next";
import { Loader } from "./pages/components/loader";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "./config/config";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isRunning, setRunning] = useState(true);
  const { imagesPreloaded } = useImagePreloader([
    ...CardData.map((x) => x.image),
    backgroundImage,
    Language,
  ]);
  useEffect(() => {
    // setTimeout(() => {
      setRunning(false);
    // }, 4000);
  }, []);

  useEffect(() => {
    axios
      .get(`${ApiUrl}i18n_locale`)
      .then((responnse) => {
        let localCode = responnse.data.data.filter(
          (x) => x.attributes.code == navigator.language
        );
        if (localCode.length > 0) {
          navigator.language === "en" ? localStorage.setItem("prefered_language", "en-US") : localStorage.setItem("prefered_language", navigator.language) 
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  
  // let myComponent;
  // if (!imagesPreloaded) {
  //   myComponent = (

  //     <Loader></Loader>
  //   );
  // } else {
  //   myComponent = (
  //     <Router>
  //       <Layout imagesPreloaded={imagesPreloaded} />
  //     </Router>
  //   );
  // }

  return (
    <Router>
    <Layout imagesPreloaded={imagesPreloaded} />
  </Router>
    );
}

export default App;
