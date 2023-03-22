import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo-heresays-5.svg";
import Arrow from "../../assets/images/arrow-right-icon.png";
import HandPatern from "../../assets/images/hand-pattern.png";
import "./initial.css";
import { Link } from "react-router-dom";
import { Rotate, Zoom } from "react-reveal";
import axios from "axios";
import Popup from "../components/modal/popup";
import { ApiUrl } from "../../config/config";
import ReactHtmlParser from "react-html-parser";
import Disclaimer from "../../assets/images/disclaimer-icon.png"
import Language from "../../assets/images/language-icon.png"
import Warning from "../../assets/images/warning-icon.png"
// import { Translator, Translate } from 'react-auto-translate';
import { withNamespaces, NamespacesConsumer, Trans, useTranslation } from 'react-i18next';
import { Loader } from "../components/loader";
// import { getLanguages } from 'languages-js';
// import AllLanguageFromJson from "../../"
import { AllLanguageFromJson } from "../../constants/json/languages";




// let interval = undefined;
const Initial = (props) => {
  const { t, i18n } = useTranslation();
  const [showSociaModal, setShowSocialModal] = useState(false);
  const [socialUrl, setSocialUrl] = useState(false);
  const [modalShowTerm, setModalShowTerm] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [ShowAttentionModal, setShowAttentionModal] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [userAgreementData, setUserAgreementData] = useState();
  const [disclaimer, setDisclaimer] = useState();
  const [attention, setAttention] = useState();
  const [AllLaguages, setAllLaguages] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [disclaimerData, setDisclaimerData] = useState([]);
  const [attentionData, setAttentionData] = useState([]);
  const [termsData, setTermsData] = useState([]);
  const [addBannerStoryData, setAddBannerStoryData] = useState();


  const getAddBannerData = () => {
    axios.get(`${ApiUrl}getBanner`).then((result) => {

      setAddBannerStoryData(
        result.data.data.filter((x) => x.attributes.published_at != null)
      );
    });
  };
  let currentLanguageSetting = localStorage.getItem("prefered_language")
    ? localStorage.getItem("prefered_language")
    : "en";
  const [currentLanguage, setCurrentLanguage] = useState(
    currentLanguageSetting
  );

  const cacheProvider = {
    get: (language, key) =>
      ((JSON.parse(localStorage.getItem('translations')) || {})[key] || {})[
      language
      ],
    set: (language, key, value) => {
      const existing = JSON.parse(localStorage.getItem('translations')) || {
        [key]: {},
      };
      existing[key] = { ...existing[key], [language]: value };
      localStorage.setItem('translations', JSON.stringify(existing));
    },
  };

  // useEffect(()=>{
  //   const fetchData = async () => {
  //     const languages = await getLanguages();
  //     console.log("languagesss" ,languages);
  //     setLanguages(languages);
  //   };

  //   fetchData();
  // },[])

  useEffect(()=>{
    axios.get(`${ApiUrl}getBook`).then((response)=>{
      console.log("bookdataresponse" , response)
    })
  },[])

  useEffect(() => {
    let currentLanguageSetting = localStorage.getItem("prefered_language")
      ? localStorage.getItem("prefered_language")
      : "en";
    if (currentLanguageSetting == "en") {
      localStorage.setItem("prefered_language", "en");
    }
    getAllData(currentLanguageSetting);
    getDisclaimerData();
    getAttentionData();
    getTermsData();
    getAddBannerData();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setRunning(!running);
  //   }, 2000)
  // }, [])

  const clearLocal = () => {
    localStorage.clear();
  }

  const getTermsData = () => {
    axios.get(`${ApiUrl}getTermsAndCondition`).then((result) => {
      // console.log("resultresultresult", result);
      setTermsData(
        result.data.data[1].attributes.published_at
          ? result.data.data[1].attributes
          : ""
      );
    });
  };
  const getAttentionData = () => {
    axios.get(`${ApiUrl}getAttention`).then((result) => {
      setAttentionData(
        result.data.data[0].attributes
          ? result.data.data[0].attributes.attention
          : ""
      );
   
    });
  };
  const getDisclaimerData = () => {
    axios.get(`${ApiUrl}getDisclaimer`).then((result) => {
      // console.log("desclaimer result", result);
      setDisclaimerData(
        result.data.data[0].attributes.published_at
          ? result.data.data[0].attributes
          : ""
      );
    });
  };

  const getAllData = (currentLanguage) => {
    axios
      .all([
        axios.get(`${ApiUrl}i18n_locale`),
        axios.get(`${ApiUrl}getTermsAndCondition`),
        axios.get(`${ApiUrl}getDisclaimer`),
        axios.get(`${ApiUrl}getAttention`)
      ])
      .then(
        axios.spread(
          (firstResponse, secondResponse, thirdResponse, attentionResponse) => {

            setAllLaguages(firstResponse.data.data);
            console.log("secondResponse", secondResponse);
            console.log("thirdResponse", thirdResponse);
            console.log("attentionResponse", attentionResponse);
            let requiredAttentionData = Object.fromEntries(
              Object.entries(
                JSON.parse(
                  decodeURIComponent(attentionResponse.data.data[0].attributes.attention)
                )
              ).filter(([key]) => key.includes(currentLanguage))
            )[currentLanguage];
            let requiredDisclaimerData = Object.fromEntries(
              Object.entries(
                JSON.parse(
                  decodeURIComponent(thirdResponse.data.data[0].attributes.description)
                )
              ).filter(([key]) => key.includes(currentLanguage))
            )[currentLanguage];
            setDisclaimer(
              requiredDisclaimerData ? requiredDisclaimerData.value : ""
            );
            setAttention(
              requiredAttentionData ? requiredAttentionData.value : ""
            );
            // console.log("secondResponse.data.data[1].attributes.description", decodeURIComponent(secondResponse.data.data[1].attributes.description));
            let requiredTermsData = Object.fromEntries(
              Object.entries(
                JSON.parse(
                  decodeURIComponent(secondResponse.data.data[0].attributes.description)
                )
              ).filter(([key]) => key.includes(currentLanguage))
            )[currentLanguage];

            setUserAgreementData(requiredTermsData && requiredTermsData.value);
          }
        )
      )
      .catch((error) => console.log(error));
  };

  const onLanguageChange = async (data) => {
    localStorage.setItem("prefered_language", data);
    i18n.changeLanguage(data);
    setCurrentLanguage(data);
    getAllData(data);
    setShowLanguageModal(false);
    setThanksTypeModalForGraph(`Your language has been changed to ${data}`);
  };

  if (!props.imagesPreloaded) return <Loader></Loader>;
  return (
    // <Translator
    //   cacheProvider={cacheProvider}
    //   from='en'
    //   to={currentLanguage}
    //   googleApiKey='AIzaSyApqsFNbDNj6KTczy3u-kNvmXrQ_2ACQPM'
    // >
    <>
      <div className="main">
        <div
          className="mobile_height starting-background-fade-bg animate-fadeIn-started-bg ng-star-inserted initial_page_container"

        ></div>

        {/* center_Start */}
        <div className="mobile_height animate__animated animate__fadeIn bg-welcome duration_animation_bg hidden-welcome-body welcome-body-wrapper ng-star-inserted initial_page_maincontainer"
        >
          <div className="home-top-box">
            <div className="home-logo-bx flex-1 welcome-logo">
              <a>
                <img
                  src={Logo.toString()}
                  alt="Heresays"
                  title="Heresays"
                  className="img-responsive"
                  style={{ opacity: "0" }}
                />
              </a>
            </div>
            <div className="A3 language_icon initial_exit" onClick={() => { clearLocal() }}>
              <a href="https://www.google.com/" className="header-exit-button">
                <span>
                  <i className="header-exit-icon"></i>
                </span>
              </a>
            </div>
          </div>


          <div className="home-body-container welcome_container">
            <div className="ng-star-inserted">
              <div className="welcome-item-row item_boxes">
                <div
                  data-toggle="modal"
                  onClick={() => {
                    setShowDisclaimerModal(true);
                  }}
                  data-target="#DisclaimerModal"
                  className="animate__animated animate__rotateInDownLeft duration_animation_1 welcome-item welcome-img-div"
                >
                  <a>
                    <img
                      src={Disclaimer.toString()}
                    />
                    <span className="explanation">{t('Explanation')}</span>
                  </a>
                </div>
                <div
                  onClick={() => {
                    setShowLanguageModal(true);
                  }}
                  data-toggle="modal"
                  data-target="#LanguageModal"
                  className="animate__animated animate__fadeInUp duration_animation_1 welcome-item welcome-img-div"
                >
                  <a>
                    <img
                      src={Language.toString()}
                    />
                    <span>{t('Language')}</span>
                  </a>
                </div>
                <div
                  data-toggle="modal"
                  onClick={() => {
                    setShowAttentionModal(true);
                  }}
                  data-target="#AttentionModal"
                  className="animate__animated animate__rotateInDownRight duration_animation_1 welcome-item welcome-img-div"
                >
                  <a>
                    <img
                      src={Warning.toString()}
                    />
                    <span className="jurisdiction">{t('Jurisdiction')}</span>
                  </a>
                </div>
              </div>
              <div className="continue-btn-group enteraccess-btn">
                <a
                  data-toggle="modal"
                  onClick={() => {
                    setModalShowTerm(true);
                  }}
                  data-target="#TermsModal"
                  className="btn-continue arrow-bounce-left"
                >
                  <span className="click-here">{t('ACCESS')}</span><br />
                  <img
                    src={Arrow.toString()}
                  />
                </a>
              </div>
            </div>

            {/* ThanksTypeModalForGraph Start */}
            <div
              id="ThanksTypeModalForGraph"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="ThanksTypeModal"
              aria-hidden="true"
              className={ThanksTypeModalForGraph ? "modal fade show" : "modal fade"}
              style={
                ThanksTypeModalForGraph
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <div
                role="document"
                className={
                  "modal-dialog modal-dialog-centered sociallogin-modal-dialog  thankstype-modal-dialog"
                }
              >
                <div className="modal-content">
                  <div className="modal-body text-center">
                    <p className="text-uppercase">{ThanksTypeModalForGraph}</p>
                    <div className="modal-footer sociallink-footer">
                      <a
                        onClick={() => {
                          setThanksTypeModalForGraph(null);
                        }}
                        data-dismiss="modal"
                        aria-label="Close"
                        className="close-button-style"
                      >
                        <span></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ThanksTypeModalForGraph End */}
          </div>



          <app-footer-panel>
            <div className="bottom-wrapper-initial" style={{ position: "fixed", bottom: "0", left: "0", right: "0" }}>
              <div className="google-ads-wrap ng-star-inserted">
                {ReactHtmlParser(
                  addBannerStoryData &&
                  addBannerStoryData[
                  Math.floor(Math.random() * addBannerStoryData.length)
                  ] &&
                  addBannerStoryData[
                    Math.floor(Math.random() * addBannerStoryData.length)
                  ].attributes &&
                  addBannerStoryData[
                    Math.floor(Math.random() * addBannerStoryData.length)
                  ].attributes.textfield
                )}
              </div>
            </div>
            {/* <SocialIcons
                  Translate={Translate}
                  setSocialUrl={setSocialUrl}
                  showSociaModal={showSociaModal}
                  setShowSocialModal={setShowSocialModal}
                /> */}
          </app-footer-panel>
        </div>
        {/* center End */}

        <div className="animate__zoomInlogo duration_animation_logo starting-logo ng-star-inserted">
          <img
            src={Logo.toString()}
            alt="Heresays"
            title="Heresays"
            className="img-responsive"
          />
        </div>
        <div className="home-exit-bx welcome-exit animate__animated animate__fadeIn">
          <a href="https://www.google.com/" className="header-exit-button">
            <span>
              <i className="header-exit-icon"></i>
            </span>
          </a>
        </div>
      </div>

      {/* All Modals Start */}

      {/* DisclaimerModal Start*/}
      <div className="zoom">
        <Zoom when={showDisclaimerModal} center-zoomout>
          {showDisclaimerModal && (
            <div
              id="DisclaimerModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="DisclaimerModal"
              aria-hidden="true"
              data-backdrop="static"
              className="modal fade zoom-in zoom-in-left show"
            >
              <div className="modal-dialog modal-dialog-centered disclaimer-modal-dialog">

                <div className="modal-content d-block bg-black-bg">
                  <div className="disclaimer-title-head cmn-title-head text-center">
                    <h2>{t('Explanation')}</h2>
                  </div>

                  <div className="border-style-8-gray">
                    <a
                      onClick={() => {
                        setShowDisclaimerModal(false);
                      }}
                      data-dismiss="modal"
                      className="close-button-style closebtns_popup"
                    >
                      <span></span>
                    </a>
                    <div className="disclaimer-content-in">
                      <div className="modal-body">

                        <div className="disclaimer-info-scroll">

                          {ReactHtmlParser(
                            disclaimerData && disclaimerData ? disclaimer : ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Zoom>
      </div>
      {/* DisclaimerModal End */}

      {/* LanguageModal Start */}
      <Zoom when={showLanguageModal} botton>
        {showLanguageModal && (
          <div
            id="LanguageModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="LanguageModal"
            aria-hidden="true"
            data-backdrop="static"
            className="modal fade zoom-in-center show "
          >
            <div className="modal-dialog modal-dialog-centered language-modal-dialog">
              <div className="language-title-head cmn-title-head text-center">
                <h2> {t('LANGUAGE SELECTION')}</h2>
              </div>
              <div className="modal-content border-style-8 initial_language_model">
                <a
                  onClick={() => setShowLanguageModal(false)}
                  data-dismiss="modal"
                  className="close-button-style"
                >
                  <span></span>
                </a>
                <div className="modal-body">
                  <div className="language-item-row">
                    {AllLanguageFromJson?.map((x, index) => {
                      return (
                        <button
                          key={index}
                          className="mx-4 my-2 button-75"
                          onClick={() => {
                            onLanguageChange(x.BCP47);
                          }}
                        >

                          <span>{x.Native}</span>
                        </button>

                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Zoom>

      {/* LanguageModal_End */}

      {/* AttentionModal_Start */}
      <Zoom when={ShowAttentionModal} center-right>
        {ShowAttentionModal && (
          <div
            id="AttentionModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="AttentionModal"
            data-backdrop="static"
            className="modal fade zoom-in zoom-in-right show"
            style={
              ShowAttentionModal ? { display: "block" } : { display: "none" }
            }
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered attention-modal-dialog">
              <div className="text-center hand-top-box animate__animated animate__fadeInUp">
                <img
                  src={HandPatern.toString()}
                />
              </div>
              <div className="modal-content">
                <a
                  onClick={() => {
                    setShowAttentionModal(false);
                  }}
                  data-dismiss="modal"
                  className="close-button-style"
                >
                  <span></span>
                </a>
                <div className="attention-head-top-bx">
                  <div className="disclaimer-title-head cmn-title-head text-center animation-time-title animate__animated animate__flipInX">
                    <h2>{t('Attention')}</h2>
                  </div>
                </div>
                <div className="modal-body">
                  {ReactHtmlParser(
                    attentionData && attentionData ? decodeURIComponent(attention) : ""
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Zoom>

      {/* AttentionModal End*/}

      {/* TermsModal Start */}
      {modalShowTerm && (
        <div
          id="TermsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="LanguageModal"
          aria-hidden="true"
          data-backdrop="static"
          // className="modal fade zoom-in-center show"
          className={
            modalShowTerm
              ? "modal fade zoom-in zoom-in-right show"
              : "modal fade zoom-in zoom-in-right"
          }
        >
          <div className="modal-dialog modal-dialog-centered terms-modal-dialog">
            <div className="modal-content modal-content-term">
              <div className="modal-body">
                <div className="terms-wrapper">
                  <div className="terms-wrap terms-wrap-term">
                    <div className="disclaimer-title-head cmn-title-head text-center">
                      <h2>
                        <span >{t('Terms of use')}</span>
                      </h2>
                    </div>
                    <div className="terms-info terms-info-term">
                      {" "}
                      {ReactHtmlParser(
                        termsData && termsData ? userAgreementData : ""
                      )}
                    </div>
                  </div>
                  <div className="terms-footer">
                    <a
                      data-dismiss="modal"
                      onClick={() => {
                        setModalShowTerm(false);
                      }}
                      className="btn-dontagree"
                      style={{ textDecoration: "none" }}
                    >
                      <span className="btn-d-text">{t('REFUSE')}</span>
                    </a>
                    <Link
                      to="/home"
                      data-dismiss="modal"
                      className="btn-agree"
                      style={{ textDecoration: "none" }}
                    >
                      <span>{t('ACCEPT')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TermsModal End */}
      <Popup
        socialUrl={socialUrl}
        // Translate={Translate}
        showSociaModal={showSociaModal}
        setShowSocialModal={setShowSocialModal}
      />
    {/* </Translator> */}
      </>
  );
};

export default Initial;
// export default withNamespaces('translation')(Initial);
