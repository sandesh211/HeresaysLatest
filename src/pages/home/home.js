import React, { useEffect, useState } from "react";
import "./home.css";
import bookImg from "../../assets/images/bookImg.png";
import Zoom from "react-reveal/Zoom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "../components/modal/popup";
import SocialIcons from "../components/modal/socialIcons";
// import { useSpeechRecognition } from "react-speech-kit";
import { ApiUrl } from "../../config/config";
import ReadAStory from "../../assets/images/read-a-story-icon.png";
import WriteStory from "../../assets/images/write-a-story-icon.png";
import ChatRoom from "../../assets/images/chatroom-icon.png";
import { Translator, Translate } from "react-auto-translate";
import { Loader } from "../components/loader";
import EventEmitter from "reactjs-eventemitter";
import "../home/home.css";
import Header from "../components/header";
import Banner from "../components/banner";
const Home = (props) => {
  const [ShowLanguageModal, setShowLanguageModal] = useState(false);
  const [socialUrl, setSocialUrl] = useState(false);
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [disclaimer, setDisclaimer] = useState();
  const [attentionData, setAttentionData] = useState();
  const [AllLaguages, setAllLaguages] = useState(false);
  const [userAgreementData, setuserAgreementData] = useState(null);
  const [emailType, setEmailType] = useState("");
  const [addBannerStoryData, setAddBannerStoryData] = useState();
  const [NewsModal, setNewsModal] = useState(false);
  const [showSociaModal, setShowSocialModal] = useState(false);
  const [latestStory, setLatestStory] = useState();
  const navigate = useNavigate();
  const getAddBannerData = () => {
    axios.get(`${ApiUrl}getBanner`).then((result) => {
      setAddBannerStoryData(
        result.data.data.filter((x) => x.attributes.published_at != null)
      );
    });
  };

  // const {
  //   error,
  //   interimResult,
  //   isRecording,
  //   results,
  //   startSpeechToText,
  //   stopSpeechToText,
  // } = useSpeechToText({
  //   continuous: true,
  //   useLegacyResults: false,
  // });
  // const { listen, listening, stop } = useSpeechRecognition({
  //   onResult: (result) => {
  //     setEmailType(emailType + result);
  //   },
  // });
  let currentLanguageSetting = localStorage.getItem("prefered_language")
    ? localStorage.getItem("prefered_language")
    : navigator.language;
  const [currentLanguage, setCurrentLanguage] = useState(
    currentLanguageSetting
  );


  useEffect(() => {
    let currentLanguageSetting = localStorage.getItem("prefered_language")
      ? localStorage.getItem("prefered_language")
      : navigator.language;
    if (currentLanguageSetting == navigator.language) {
      localStorage.setItem("prefered_language", navigator.language);
    }
    // setTimeout(() => {
    //   setRunning(false);
    // }, 3000);
    getAllData();
    getAddBannerData();
    localStorage.setItem("scrollPosition", 0)

  }, []);



  useEffect(() => {
    let url = `${ApiUrl}getListStory`;
    axios.get(url).then((res) => {
      let attribute = res?.data?.data;
      localStorage.setItem("wholeStoryData", JSON.stringify(attribute))
      console.log("home_storylist", attribute[attribute.length - 1])
      setLatestStory(attribute[attribute.length - 1])
    });
  }, [])



  

  const getAllData = () => {
    axios
      .all([
        axios.get(`${ApiUrl}i18n_locale`),
        axios.get(`${ApiUrl}getTermsAndCondition`),
        axios.get(`${ApiUrl}getDisclaimer`),
        axios.get(`${ApiUrl}getAttention`),
      ])
      .then(
        axios.spread(
          (firstResponse, secondResponse, thirdResponse, attentionResponse) => {
            setAllLaguages(firstResponse.data);
            setuserAgreementData(secondResponse.data.data);

            setDisclaimer(thirdResponse.data.data);
            setAttentionData(attentionResponse.data.data);
          }
        )
      )
      .catch((error) => console.log(error));
  };
  const OnEmailchange = (text) => {
    setEmailType(text.target.value);
  };
  // const startRecording = () => {
  //   if (isRecording) {
  //     stopSpeechToText();
  //   } else {
  //     startSpeechToText().then(() => {
  //       let allResult = "";
  //       results.map((result) => {
  //         if (allResult.indexOf(result.transcript) == -1) {
  //           allResult = allResult + result.transcript;
  //         }
  //       });
  //       allResult = allResult + emailType;
  //       setEmailType(allResult);
  //     });
  //   }
  // };
  useEffect(() => {
    //   EventEmitter.subscribe('languagechanged', event => {
    //     onLanguageChange(event)
    // })
  }, []);
  const onLanguageChange = (data) => {
    localStorage.setItem("prefered_language", data);
    setCurrentLanguage(data);
    getAllData();
    setShowLanguageModal(false);
    setThanksTypeModalForGraph(`Your language has been changed to ${data}`);
  };

  let x = Math.random();


  if (!props.imagesPreloaded) return <Loader />;

  return (
    
      <Translator
        from="en"
        to={
          localStorage.getItem("prefered_language")
            ? localStorage.getItem("prefered_language")
            : navigator.language
        }
        googleApiKey="AIzaSyDJyDB2bnmeDG4KHOZkHnrDqhrqnUI375M"
      >
        <div className="container1 Container_new mobile_height">
          <Header
          // languageRefresh={props.languageRefresh}
          // setLanguageRefresh={props.setLanguageRefresh}
          />
          <div className="middle mobile_middle homeMiddletop">
            <div className="B1 tabs_view"></div>
            <div className="B2 cards custome_b2 b2cardnew">
              <Link
                to="/storylist2"
                className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"

              >
                <img src={ReadAStory} alt="img"/>
                <span className="read">Read</span>
              </Link>
              <Link
                to="/writestory"
                className="welcome-item animate__animated duration-animation-choice-home animate__fadeInUp home-img-div"

              >
                <img src={WriteStory} alt="img"/>
                <span>Publish</span>
              </Link>
              <Link
              to="#"
                data-toggle="modal"
                onClick={() => {
                  setNewsModal(true);
                }}
                data-target="#NewsModal"
                className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownRight home-img-div"
              >
                <img src={ChatRoom}  alt="img"/>
                <span className="chat">Chat</span>
              </Link>
            </div>

            <div className="B3 tabs_view_books">
              {/* <SocialIcons
                Translate={Translate}
                setSocialUrl={setSocialUrl}
                showSociaModal={showSociaModal}
                setShowSocialModal={setShowSocialModal}
              /> */}
              <div className="d-block d-md-none d-lg-none d-xl-none">
                <div className="bottom_outer_block">
                  <h2 className="title_books">{latestStory?.attributes?.topic_name}</h2>
                  <div className="book_infored">
                    <div className="bottom_inner_block">
                      <p>{latestStory?.attributes?.topic_details}</p>
                      <img className="storylist_bool_img  icon iconbook shareIcon" onClick={() => { navigate(`/storylist2/readstorybook/${latestStory?.id}`); }} src={bookImg} alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="continue-btn-group">
            <Zoom when={NewsModal} center>
              <div
                id="NewsModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="NewsModal"
                aria-hidden="true"
                data-backdrop="false"
                className={
                  NewsModal
                    ? "modal fade zoom-in zoom-in-right show"
                    : "modal fade zoom-in zoom-in-right"
                }
              >
                <div
                  role="document"
                  className="modal-dialog modal-dialog-centered sociallogin-modal-dialog downloadapp-modal-dialog"
                >
                  <div className="modal-content">
                    <a
                      onClick={() => {
                        setNewsModal(false);
                      }}
                      data-dismiss="modal"
                      aria-label="Close"
                      className="close-button-style"
                    >
                      <span></span>
                    </a>
                    <div className="modal-body text-center">
                      <p>
                        <Translate>Coming soon</Translate>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>

            {/* NewsModal End*/}
          </div>
          <Banner className="footer_home" />
        </div>
        <Popup
          socialUrl={socialUrl}
          Translate={Translate}
          showSociaModal={showSociaModal}
          setShowSocialModal={setShowSocialModal}
        />
      </Translator>
    
  );
};

export default Home;
