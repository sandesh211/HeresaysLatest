import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fade, Zoom } from "react-reveal";
import { ApiUrl } from "../config/config";
import image1 from "../assets/images/ads-submenu-icon-1.png";
import image2 from "../assets/images/ads-submenu-icon-2.png";
import image3 from "../assets/images/ads-submenu-icon-3.png";
import HTMLFlipBook from "react-pageflip";
import ReactHtmlParser from "react-html-parser";
import { useForm } from "react-hook-form";
// import { ConvertText, TranslateText } from "./utility/utility";
import "../pages/readstory/readstory.css";
import SettingSubmenuIcon1 from "../assets/images/settings-submenu-icon-1.png";
import SettingSubmenuIcon2 from "../assets/images/settings-submenu-icon-2.png";
import SettingSubmenuIcon3 from "../assets/images/settings-submenu-icon-3.png";
import GuideSubmenuIcon1 from "../assets/images/guide-submenu-icon-1.png";
import GuideSubmenuIcon2 from "../assets/images/guide-submenu-icon-2.png";
import GuideSubmenuIcon3 from "../assets/images/guide-submenu-icon-3.png";
import Microphone from "../assets/images/microphone-icon.png";
import StopIcon from "../assets/images/stop-icon.svg";
import AdsSubmenuIcon1 from "../assets/images/ads-submenu-icon-1.png";
import AdsSubmenuIcon2 from "../assets/images/ads-submenu-icon-2.png";
import AdsSubmenuIcon3 from "../assets/images/ads-submenu-icon-3.png";
import HandPattern from "../assets/images/hand-pattern.png";
import { Translator, Translate } from "react-auto-translate";
// import { useSpeechRecognition } from "react-speech-kit";
import EventEmitter from "reactjs-eventemitter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubmitButton from "../assets/images/submit-button-s-icon.svg";
import { Navigate } from "react-router-dom";


const AllModal = (props) => {
  const [NewsModal, setNewsModal] = useState(false);
  const [showSociaModal, setShowSocialModal] = useState(false);
  const [ShowAttentionModal, setShowAttentionModal] = useState(false);
  const [modalShowTerm, setModalShowTerm] = useState(false);
  const [ShowAdsModal, setShowAdsModal] = useState(false);
  const [ContactModal, setContactModal] = useState(false);
  const [InstructionModal, setInstructionModal] = useState(false);
  const [FinanceModal, setFinanceModal] = useState(false);
  const [OpportunityModal, setOpportunityModal] = useState(false);
  const [checkBudgetModal, setCheckBudgetModal] = useState(false);
  const [ShowLanguageModal, setShowLanguageModal] = useState(false);
  const [Termsofuse2Modal, setTermsofuse2Modal] = useState(false);
  const [DownloadappModal, setDownloadappModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [AllLaguages, setAllLaguages] = useState(false);
  const [userAgreementData, setUserAgreementData] = useState();
  const [topicData, setTopicData] = useState("");
  const [toggleAudio, setToggleAudio] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [ThanksTypeModalContact, setThanksTypeModalContact] = useState(false);
  const [ReferrenceId, setReferrenceId] = useState(false);
  const navigate = useNavigate();
  const [termsData, setTermsData] = useState([]);
  const [ShowGuideModal, setShowGuideModal] = useState(false);
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [ThanksTypeModal, setThanksTypeModal] = useState(null);
  const [disclaimer, setDisclaimer] = useState();
  const [attention, setAttention] = useState();
  const [attentionData, setAttentionData] = useState();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState("");
  const [adClassifiedData, setAdClassifiedData] = useState([]);
  const [feedbackData, setFeedbackData] = useState({});
  const [adClassifiedText, setAdClassifiedText] = useState("");
  const [manualDetails, setManualDetails] = useState();
  const [checkedValue, setCheckedValue] = useState(0);
  let currentLanguageSetting = localStorage.getItem("prefered_language")
    ? localStorage.getItem("prefered_language")
    : navigator.language;
  const [currentLanguage, setCurrentLanguage] = useState(
    currentLanguageSetting
  );
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    feedbackMessage: "",
    feedbackSubject: "",
    feedbackType: "",
  });

  useEffect(() => {
    let currentLanguageSetting = localStorage.getItem("prefered_language")
      ? localStorage.getItem("prefered_language")
      : navigator.language;
    if (currentLanguageSetting == navigator.language) {
      localStorage.setItem("prefered_language", navigator.language);
    }
    getAllData(currentLanguageSetting);
    getClassifiedData();
    getAttentionData();
    getTermsData();
    getManualData(currentLanguageSetting);
  }, []);

  // const { listen, listening, stop } = useSpeechRecognition({
  //   onResult: (result) => {
  //     setTopicData(topicData + result);
  //   },
  // });
  const handleAudioChange = (listening) => {
    setToggleAudio(!toggleAudio);
    // listening ? stop() : listen();
  };
  // const toggle = listening
  //   ? stop
  //   : () => {
  //       setBlocked(false);
  //       listen();
  //     };
  const getAllLanguages = () => {
    axios.get(` http://65.0.19.202:1337/api/i18n/locales`).then((result) => {
      setAllLaguages(result.data);
    });
  };
  const onInstructionModalClose = () => {
    setInstructionModal(false);
  };
  const splitWords = (text, numWords) => {
    let result = [];
    for (var i = 0; i < text.length; i = (i + 1) * numWords) {
      result.push(text.slice(i, (i + 1) * numWords));
    }
    return result;
  };
  const onSubmit = (data) => {
   
    let bodyData = {
      data: {
        feedback_type: feedBackStatus(),
        feedback_subject: data.feedbackSub,
        feedback_message: data.feedbackMessage,
        feedback_reference: '',
      },
    };
    setThanksTypeModalContact(true)
   setFeedbackData(bodyData);
   onFeedbackSubmit(bodyData.data)
  };
  const onFeedbackSubmit = (data) => {
    axios
      .post(`${ApiUrl}addFeedback`, data)
      .then((res) => {
        axios
          .put(
            `${ApiUrl}updateFeedback/${
              res.data.list && res.data.list.insertId
            }`,
            {
              feedback_reference: `HERESAYSFEEDBACK00${
                res.data.list && res.data.list.insertId
              }`,
            }
          )
          .then((result) => {
            setReferrenceId(res.data.list.insertId);
            setThanksTypeModalContact(true);
            setCheckedValue(0)
            reset()
          })
          .catch((errr) => {
            console.log(errr);
          });
      })
      .catch((error) => {
        console.log(error);
        reset()
       
      });
  };
  const selectOnlyThis = (id) => {
    setCheckedValue(id);
  };

  const getTermsData = () => {
    axios.get(`${ApiUrl}getTermsAndCondition`).then((result) => {
      setTermsData(
        result.data.data[1].attributes.published_at
          ? result.data.data[1].attributes
          : ""
      );
    });
  };
  const getManualData = (languageSetting) => {
    axios.get(`${ApiUrl}getManual`).then((result) => {
      // setManualDetails(
      //   JSON.parse(unescape(result.data.data[0].attributes.description))[
      //     languageSetting
      //   ].value
      // );
    });
  };

  const getClassifiedData = () => {
    axios.get(`${ApiUrl}getClassified`).then((result) => {
      setAdClassifiedData(
        result.data.data.filter((x) => x.attributes.published_at != null)
      );
    });
  };
  const onChange = (e, suggestions, name) => {
    const userInput = e.target.value;
    const unLinked = suggestions
      .filter((x) => x != null)
      .filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
    if (name == "publishedBy") {
      setInput({ ...input, publishedBy: e.target.value });
    } else if (name == "TopicName") {
      setInput({ ...input, TopicName: e.target.value });
    } else if (name == "Place") {
      setInput({ ...input, Place: e.target.value });
    } else if (name == "Country") {
      setInput({ ...input, Country: e.target.value });
    } else if (name == "Subject1") {
      setInput({ ...input, Subject1: e.target.value });
    } else if (name == "Subject2") {
      setInput({ ...input, Subject2: e.target.value });
    } else if (name == "Subject3") {
      setInput({ ...input, Subject3: e.target.value });
    }

    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(name);
  };

  const SuggestionsListComponent = ({ suggestion, name }) => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li
            key={index}
              className={className}
              // key={suggestion}
              onClick={(e) => onFormDataInput(e, name)}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };

  const onLanguageChange = async (data) => {

    EventEmitter.dispatch("languagechanged", data);
    localStorage.setItem("prefered_language", data);
    setCurrentLanguage(data);
    getAllData(data);
    setShowLanguageModal(false);
    setThanksTypeModalForGraph(`Your language has been changed to ${data}`);
  };
  const getAttentionData = () => {
    axios.get(`${ApiUrl}getAttention`).then((result) => {
      setAttentionData(
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
        axios.get(`${ApiUrl}getAttention`),
      ])
      .then(
        axios.spread(
          (firstResponse, secondResponse, thirdResponse, attentionResponse) => {
            setAllLaguages(firstResponse.data.data);
            let requiredAttentionData = Object.fromEntries(
              Object.entries(
                JSON.parse(
                  unescape(attentionResponse.data.data[0].attributes.attention)
                )
              ).filter(([key]) => key.includes(currentLanguage))
            )[currentLanguage];
            let requiredTermsData = Object.fromEntries(
              Object.entries(
                JSON.parse(
                  unescape(secondResponse.data.data[1].attributes.description)
                )
              ).filter(([key]) => key.includes(currentLanguage))
            )[currentLanguage];
            setAttention(
              requiredAttentionData && requiredAttentionData.value
            );
            setUserAgreementData(requiredTermsData && requiredTermsData.value);
          }
        )
      )
      .catch((error) => console.log(error));
  };

  const feedBackStatus = () => {
    let feedBackStatus = "";
    switch (checkedValue) {
      case 1:
        feedBackStatus = "Complaint";
        break;
      case 2:
        feedBackStatus = "Suggestion";
        break;
      case 3:
        feedBackStatus = "Remark";
        break;
      case 4:
        feedBackStatus = "Other";
        break;
      default:
        feedBackStatus = "Complaint";
        break;
    }
    return feedBackStatus;
  };

  const onFormDataInput = (e, name) => {
    if (name == "publishedBy") {
      setFormData((prevState) => ({
        ...prevState,
        PublisherName: e.target.innerText,
      }));
    } else if (name == "TopicName") {
      setFormData((prevState) => ({
        ...prevState,
        TopicName: e.target.innerText,
      }));
    } else if (name == "Place") {
      setFormData((prevState) => ({
        ...prevState,
        Place: e.target.innerText,
      }));
    } else if (name == "Country") {
      setFormData((prevState) => ({
        ...prevState,
        Country: e.target.innerText,
      }));
    } else if (name == "Subject1") {
      setFormData((prevState) => ({
        ...prevState,
        Subject1: e.target.innerText,
      }));
    } else if (name == "Subject2") {
      setFormData((prevState) => ({
        ...prevState,
        Subject2: e.target.innerText,
      }));
    } else if (name == "Subject3") {
      setFormData((prevState) => ({
        ...prevState,
        Subject3: e.target.innerText,
      }));
    }

    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions("");
  };

const clearLocal =()=>{
  localStorage.clear();
  setTimeout(() => {
    // navigate("https://www.google.com/")
    
  }, 1000);
}

  return (
    <>
      <Translator
        from="en"
        to={
          localStorage.getItem("prefered_language")
            ? localStorage.getItem("prefered_language")
            : "en"
        }
        googleApiKey="AIzaSyDJyDB2bnmeDG4KHOZkHnrDqhrqnUI375M"
      >
        <div className="home-middle-top-icon" style={{ zIndex: "999" }}> 
          <a
            role="button"
            data-toggle="modal"
            onClick={() => {
              setShowSettingsModal(true);
            }}
            data-target="#SettingsModal"
            className="top_left_icons"
          >
            <span onClick={() => {
              setShowSettingsModal(true);
            }}>
              <i className="settings-icon fa-spin"></i>
            </span>
          </a>
          {/* <a
            onClick={() => {
              setShowAdsModal(true);
            }}
            role="button"
            data-toggle="modal"
            data-target="#AdsModal"
          >
            <span>
              <i className="pay-per-click-icon"></i>
            </span>
          </a> */}
          <a
            onClick={() => {
              setShowGuideModal(true);
            }}
            role="button"
            data-toggle="modal"
            data-target="#GuideModal"
            className="top_left_icons_2"
          >
            <span className="questions-span"></span>
          </a>
          
          <a
            href="https://www.google.com/"
            className="mobile-exit-button header-exit-button top_right_icons"
            onClick={()=>{clearLocal()}}
            
          >
            <span>
              <i className="header-exit-icon"></i>
            </span>
          </a>
        </div>


        <div className="home-exit-bx flex-1" onClick={()=>{clearLocal()}}>
          <a href="https://www.google.com/" className="header-exit-button top_right_icons">
            <span>
              <i className="header-exit-icon"></i>
            </span>
          </a>
        </div>

        {/* New_Start */}

        {/* AllModals_Start */}

        {/* SettingsModal start */}
        <div
          id="SettingsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="SettingsModal"
          aria-hidden="true"
          data-backdrop="static"
          className={
            showSettingsModal
              ? "modal fade zoom-in-center header-menu-top show"
              : "modal fade zoom-in-center header-menu-top "
          }
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered menutop-modal-dialog"
          >
            <div className="modal-content">
              <a
                data-dismiss="modal"
                className="close-button-style"
                onClick={() => setShowSettingsModal(false)}
              >
                <span></span>
              </a>
              <div className="welcome-item-row">
                <a
                  data-toggle="modal"
                  onClick={() => setDownloadappModal(true)}
                  data-target="#DownloadappModal"
                  className="welcome-item"
                >
                  <img src={SettingSubmenuIcon1} />
                </a>
                <a
                  data-toggle="modal"
                  onClick={() => {
                    setShowLanguageModal(true);
                  }}
                  data-target="#LanguageModal"
                  className="welcome-item"
                >
                  <img src={SettingSubmenuIcon2} />
                </a>
                <a
                  data-toggle="modal"
                  data-target="#Termsofuse2Modal"
                  onClick={() => {
                    setTermsofuse2Modal(true);
                  }}
                  className="welcome-item"
                >
                  <img src={SettingSubmenuIcon3} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SettingsModal End */}

        {/* AdsModal start */}
        <div
          id="AdsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="AdsModal"
          aria-hidden="true"
          data-backdrop="static"
          className={
            ShowAdsModal
              ? "modal fade zoom-in-center header-menu-top show"
              : "modal fade zoom-in-center header-menu-top"
          }
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered menutop-modal-dialog"
          >
            <div className="modal-content">
              <a
                data-dismiss="modal"
                className="close-button-style"
                onClick={() => {
                  setShowAdsModal(false);
                }}
              >
                <span></span>
              </a>
              <div className="welcome-item-row">
                <a
                  href="/advertisement"
                  routerlink="/advertisement"
                  data-dismiss="modal"
                  className="welcome-item"
                >
                  <img src={image1} />
                </a>
                <a
                  className="welcome-item"
                  onClick={() => {
                    setFinanceModal(true);
                    setShowAdsModal(false);
                  }}
                >
                  <img src={image2} />
                </a>
                <a
                  className="welcome-item"
                  onClick={() => setOpportunityModal(true)}
                >
                  <img src={image3} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* AdsModal End */}

        {/* GuideModal start */}
        <div
          id="GuideModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="GuideModal"
          aria-hidden="true"
          data-backdrop="static"
          className={
            ShowGuideModal
              ? "modal fade zoom-in-center header-menu-top show"
              : "modal fade zoom-in-center header-menu-top"
          }
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered menutop-modal-dialog modal-dialog-zoom"
          >
            <div className="modal-content">
              <a
                data-dismiss="modal"
                className="close-button-style"
                onClick={() => {
                  setShowGuideModal(false);
                }}
              >
                <span></span>
              </a>

              <div className="welcome-item-row">
                <Fade>
                  <a
                    data-toggle="modal"
                    onClick={() => {
                      setContactModal(true);
                    }}
                    data-target="#ContactModal"
                    className="welcome-item"
                  >
                    <img src={GuideSubmenuIcon1} />
                  </a>
                  <a
                    className="welcome-item"
                    onClick={() => {
                      setInstructionModal(true);
                    }}
                  >
                    <img src={GuideSubmenuIcon2} />
                  </a>
                  <a
                    data-toggle="modal"
                    onClick={() => {
                      setNewsModal(true);
                    }}
                    data-target="#NewsModal"
                    className="welcome-item"
                  >
                    <img src={GuideSubmenuIcon3} />
                  </a>
                </Fade>
              </div>
            </div>
          </div>
          {/* GuideModal End */}

          {/* OpportunityModal_start */}

          {/* image-gallery-1 Start */}
          <div
            id="image-gallery-1"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="GallaryModal"
            aria-hidden="true"
            className="modal fade "
          >
            <div
              role="document"
              className="modal-dialog modal-dialog-centered gallary-modal-dialog modal-dialog-zoom"
            >
              <div className="modal-content border-style-8">
                <a
                  data-dismiss="modal"
                  aria-label="Close"
                  className="close-button-style"
                >
                  <img src={GuideSubmenuIcon1} />
                </a>
                <a
                  className="welcome-item"
                  onClick={() => {
                    setInstructionModal(true);
                  }}
                >
                  <img src={GuideSubmenuIcon2} />
                </a>
                <a
                  data-toggle="modal"
                  onClick={() => {
                    setNewsModal(true);
                  }}
                  data-target="#NewsModal"
                  className="welcome-item"
                >
                  <img src={GuideSubmenuIcon3} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* GuideModal End */}

        {/* OpportunityModal_start */}
        <Zoom when={OpportunityModal}>
          <div
            id="OpportunityModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="OpportunityModal"
            aria-hidden="true"
            data-backdrop="static"
            className={OpportunityModal ? "modal fade show" : "modal fade"}
            style={
              OpportunityModal ? { display: "block" } : { display: "none" }
            }
          >
            <div
              role="document"
              className="modal-dialog modal-dialog-centered opportunity-modal-dialog modal-dialog-zoom"
            >
              <div className="modal-content border-style-8">
                <a
                  data-dismiss="modal"
                  onClick={() => {
                    setOpportunityModal(false);
                  }}
                  aria-label="Close"
                  className="close-button-style"
                >
                  <span></span>
                </a>
                <div className="modal-body">
                  <div className="opportunity-scroll-box">
                    <ul className="opportunity-ul-row">
                      {adClassifiedData &&
                        adClassifiedData.map((x , index) => {
                          return (
                            <li key={index}>{ReactHtmlParser(x.attributes.textfield)}</li>
                          );
                        })}
                    </ul>
                    <button
                      type="hidden"
                      data-toggle="modal"
                      data-target="#image-gallery-1"
                      hidden="hidden"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Zoom>

        {/* OpportunityModal End */}

        {/* FinanceModal start */}
        <Zoom when={FinanceModal} botton>
          <div
            id="FinanceModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="FinanceModal"
            aria-hidden="true"
            data-backdrop="static"
            className={FinanceModal ? "modal fade show" : "modal fade"}
            style={
              FinanceModal
                ? { display: "block", paddingRight: "16px" }
                : { display: "none" }
            }
          >
            <div
              role="document"
              className="modal-dialog modal-dialog-centered finance-modal-dialog modal-dialog-zoom"
            >
              <div className="modal-content">
                <a
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setFinanceModal(false);
                  }}
                  className="close-button-style"
                >
                  <span></span>
                </a>
                <div className="modal-body">
                  <div className="finance-left-col">
                    <div className="finance-left-info-border">
                      <div className="finance-left-info">
                        <p> : </p>
                        <p> : </p>
                        <p>: </p>
                        <p> : </p>
                      </div>
                    </div>
                    <div className="input-custom-field finance-input-id-left f-mrt-15 date-field">
                      <input
                        id="gfromDate"
                        type="text"
                        bsdatepicker=""
                        className="form-control ng-untouched ng-pristine ng-valid"
                        placeholder=""
                      />
                      <label htmlFor="gfromDate" className="input-group-addon">
                        <span>Start</span>
                      </label>
                    </div>
                    <div className="input-custom-field finance-input-id-left f-mrt-15 date-field">
                      <input
                        id="gtoDate"
                        type="text"
                        bsdatepicker=""
                        className="form-control ng-untouched ng-pristine ng-valid"
                        placeholder=""
                      />
                      <label htmlFor="gtoDate" className="input-group-addon">
                        <span>End</span>
                      </label>
                    </div>
                    <div className="input-custom-field finance-input-id-left f-mrt-15">
                      <input
                        type="text"
                        className="form-control ng-untouched ng-pristine ng-valid"
                        placeholder=""
                      />
                    </div>
                    <div className="type-btngroup view-classified-btngroup">
                      <button
                        type="submit"
                        className="btn-apply read-btn-bg cmn-submit-button"
                      >
                        <span></span>
                      </button>
                    </div>
                  </div>
                  <div className="finance-right-col border-style-8">
                    <div className="finance-bar-content">
                      <button
                        data-toggle="modal"
                        onClick={() => {
                          setCheckBudgetModal(true);
                        }}
                        data-target="#checkBudgetModal"
                        className="btn-check-budget"
                      >
                        <span></span>
                      </button>
                      <div className="chart-wrapper">
                        <canvas
                          basechart=""
                          className="chartjs-render-monitor"
                          style={{
                            display: "block",
                            width: "0px",
                            height: "0px",
                          }}
                          width="0"
                          height="0"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="hidden"
                  data-toggle="modal"
                  data-target="#ThanksTypeModalForGraph"
                  hidden="hidden"
                ></button>
              </div>
            </div>
          </div>
        </Zoom>

        {/* FinanceModal End */}

        {/* image-gallery-1 Start */}
        <div
          id="image-gallery-1"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="GallaryModal"
          aria-hidden="true"
          className="modal fade"
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered gallary-modal-dialog modal-dialog-zoom"
          >
            <div className="modal-content border-style-8">
              <a
                data-dismiss="modal"
                aria-label="Close"
                className="close-button-style"
              >
                <span></span>
              </a>
              <div className="modal-body"></div>
            </div>
          </div>
        </div>
        {/* image-gallery-1 End */}

        {/* DisclaimerModal Start */}
        <div
          id="DisclaimerModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="DisclaimerModal"
          aria-hidden="true"
          data-backdrop="false"
          className="modal fade zoom-in zoom-in-right"
        >
          <div className="modal-dialog modal-dialog-centered disclaimer-modal-dialog">
            <div className="modal-content border-style-8-gray">
              <a data-dismiss="modal" className="close-button-style">
                <span></span>
              </a>
              <div className="disclaimer-content-in">
                <div className="modal-body">
                  <div className="disclaimer-title-head cmn-title-head text-center">
                    <h2>
                      <Translate>DISCLAIMER</Translate>
                    </h2>
                  </div>
                  <div className="disclaimer-info-scroll">
                    {ReactHtmlParser(`${disclaimer}`)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* DisclaimerModal End */}

        {/* LanguageModal Start */}

        <Zoom when={ShowLanguageModal} botton>
          <div
            id="LanguageModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="LanguageModal"
            aria-hidden="true"
            data-backdrop="false"
            className={
              ShowLanguageModal
                ? "modal fade zoom-in-center show"
                : "modal fade zoom-in-center"
            }
          >
            <div className="modal-dialog modal-dialog-centered language-modal-dialog">
              <div className="language-title-head cmn-title-head text-center">
                <h2>
                  <Translate>LANGUAGE SELECTION</Translate>
                </h2>
              </div>
              <div className="modal-content border-style-8">
                <a
                  // href="javascript:void(0);"
                  data-dismiss="modal"
                  className="close-button-style"
                >
                  <span></span>
                </a>

                <a
                  data-dismiss="modal"
                  className="close-button-style"
                  onClick={() => setShowLanguageModal(false)}
                >
                  <span></span>
                </a>
                <div className="modal-body">
                  <div className="language-item-row">
                    {AllLaguages &&
                      AllLaguages.map((x,index) => {
                        return (
                          <button
                          key={index}
                            className="mx-4 my-2 button-75"
                            onClick={() => {
                              onLanguageChange(x.attributes.code);
                              getAllData()
                            }}
                          >
                            <span>{x.attributes.name}</span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Zoom>

        {/* LanguageModal End */}

        {/* Termsofuse2Modal start */}
        <Zoom when={Termsofuse2Modal} center>
          <div
            id="Termsofuse2Modal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="Termsofuse2Modal"
            aria-hidden="true"
            data-backdrop="false"
            className={
              Termsofuse2Modal
                ? "modal fade zoom-in zoom-in-right show"
                : "modal fade zoom-in zoom-in-right"
            }
          >
            <div className="modal-dialog modal-dialog-centered terms-modal-dialog guide-terms-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="terms-wrapper">
                    <a
                      onClick={() => {
                        setTermsofuse2Modal(false);
                        setShowSettingsModal(false);
                      }}
                      data-dismiss="modal"
                      className="close-button-style"
                    >
                      <span></span>
                    </a>
                    <div className="terms-wrap">
                      <div className="disclaimer-title-head cmn-title-head text-center">
                        <h2>
                          <span>
                            <Translate>Terms of use</Translate>{" "}
                          </span>
                        </h2>
                      </div>
                      <div className="terms-info">
                        {ReactHtmlParser(
                          termsData && termsData ? userAgreementData : ""
                  )}
                      </div>
                    </div>
                    <div className="terms-footer">
                      <a className="btn-dontagree" href="/">
                        <span className="btn-d-text">Disagree</span>
                      </a>
                      <a
                        className="btn-agree"
                        onClick={() => {
                          setTermsofuse2Modal(false);
                          setShowSettingsModal(false);
                        }}
                      >
                        <span>Agree</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Zoom>

        {/* Termsofuse2Modal End */}

        {/* InstructionModal start */}

        <Zoom when={InstructionModal} botton>
          <div
            id="InstructionModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="InstructionModal"
            data-backdrop="false"
            className={
              InstructionModal
                ? "modal fade zoom-in-center show"
                : "modal fade zoom-in-center"
            }
          >
            <div className="modal-dialog modal-dialog-centered disclaimer-modal-dialog">
              <div className="modal-content border-style-8-gray">
                <a
                  data-dismiss="modal"
                  className="close-button-style"
                  onClick={onInstructionModalClose}
                >
                  <span></span>
                </a>
                <div className="disclaimer-content-in">
                  <div className="modal-body">
                    <div className="disclaimer-title-head cmn-title-head text-center">
                      <h2>
                        <Translate>Manual</Translate>{" "}
                      </h2>
                    </div>
                    <div className="disclaimer-info-scroll">
                      {ReactHtmlParser(manualDetails)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
        </Zoom>

        {/* InstructionModal End */}

        {/* ContactModal start */}
        <Zoom when={ContactModal} center>
          <div
            id="ContactModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="ContactModal"
            aria-hidden="true"
            data-backdrop="false"
            className={
              ContactModal
                ? "modal fade zoom-in zoom-in-left show"
                : "modal fade zoom-in zoom-in-left"
            }
            style={ContactModal ? { display: "block" } : { display: "none" }}
          >
            <div className="modal-dialog modal-dialog-centered contact-modal-dialog">
              <form  className="modal-content" onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-body border-style-8">
                  <div className="contact-body-in">
                    <div className="contact-checkbox-group">
                      <div className="contact-checkbox-item ng-star-inserted">
                        <label>
                          <input
                            type="checkbox"
                            checked={checkedValue === 1}
                            value="Complaint"
                            name="check"
                            onChange={() => selectOnlyThis(1)}
                          />
                          <span className="check">
                            <Translate>Complaint</Translate>{" "}
                          </span>
                        </label>
                      </div>
                      <div className="contact-checkbox-item ng-star-inserted">
                        <label>
                          <input
                            type="checkbox"
                            value="Request"
                            checked={checkedValue === 2}
                            name="check"
                            onChange={() => selectOnlyThis(2)}
                          />
                          <span className="check">
                            <Translate>Suggestion</Translate>{" "}
                          </span>
                        </label>
                      </div>
                      <div className="contact-checkbox-item ng-star-inserted">
                        <label>
                          <input
                            type="checkbox"
                            value="Suggestion"
                            checked={checkedValue === 3}
                            name="check"
                            onChange={() => selectOnlyThis(3)}
                          />
                          <span className="check">
                            <Translate>Remark</Translate>{" "}
                          </span>
                        </label>
                      </div>
                      <div className="contact-checkbox-item ng-star-inserted">
                        <label>
                          <input
                            type="checkbox"
                            value="Question"
                            checked={checkedValue === 4}
                            name="check"
                            onChange={() => selectOnlyThis(4)}
                          />
                          <span className="check">
                            <Translate>Other</Translate>{" "}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="input-custom-field contact-topic-field">
                      <input
                        type="text"
                        className="form-control ng-untouched ng-pristine ng-valid"
                        placeholder=""
                        formcontrolname="feedbackSub"
                        {...register("feedbackSub")}
                      />
                    </div>
                    <div className="contact-textarea-bx">
                      <textarea
                        value={topicData}
                        placeholder=""
                        formcontrolname="feedbackMessage"
                        {...register("feedbackMessage",{onChange:(e)=>{
                          setTopicData(e.target.value)
                        }})}
                        className="ng-untouched ng-pristine ng-valid"
                      ></textarea>
                    </div>
                    <div className="err-msg1">
                      <span> </span>
                    </div>
                  </div>
                </div>
                <div className="type-btngroup add-adv-btngroup">
                  <button
                    type="submit"
                    className="ads-submit-btn cmn-submit-button"
                    onClick={() => {
                      setContactModal(false);
                    
                    }}
                   
                  >
                    <span></span>
                  </button>

                  {/* <button
                  type="button"
                    className="mt-btn camera-icon-ads ng-star-inserted"
                    onClick={() => handleAudioChange(listening)}
                  >
                    <i>
                      {" "}
                      {listening ? <img  src={StopIcon}/> : <img src={Microphone} />}
                    </i>
                  </button> */}

                  <a
                    data-dismiss="modal"
                    onClick={() => {
                      setContactModal(false);
                    }}
                    className="ads-close-btn close-button-style"
                  >
                    <span></span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </Zoom>


        {/* Thanks Type Modal Start */}

        <div
        id="ThanksTypeModalContact"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ThanksTypeModalContact"
        aria-hidden="true"
        className={ThanksTypeModalContact ? "modal fade show" : "modal fade"}
        style={ThanksTypeModalContact ? { display: "block" } : { display: "none" }}
      >
        <div
          role="document"
          className="modal-dialog modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog"
        >
          <div className="modal-content">
            <div className="modal-body text-center">
              <p className="text-uppercase">
                Your query has been properly submitted
              </p>
              <p>and is published under</p>
              <h3>ID:HERESAYSFEEDBACK00{ReferrenceId} </h3>
              <p>Please copy this for your reference</p>
              <a
                onClick={() => {
                  setThanksTypeModalContact(false);
                  setTopicData("");
                  reset();
                  navigate("/home");
                }}
              >
                <img src={SubmitButton} />
              </a>
            </div>
          </div>
        </div>
      </div>

        {/* Thanks Type Modal End */}

        {/* ContactModal End/}

                  {/* DownloadappModal Start*/}
        <Zoom when={DownloadappModal} center>
          <div
            id="DownloadappModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="DownloadappModal"
            aria-hidden="true"
            data-backdrop="false"
            className={
              DownloadappModal
                ? "modal fade zoom-in zoom-in-left show"
                : "modal fade zoom-in zoom-in-left "
            }
          >
            <div
              role="document"
              className="modal-dialog modal-dialog-centered sociallogin-modal-dialog downloadapp-modal-dialog"
            >
              <div className="modal-content">
                <a
                  data-dismiss="modal"
                  onClick={() => {
                    setDownloadappModal(false);
                  }}
                  aria-label="Close"
                  className="close-button-style"
                >
                  <span></span>
                </a>
                <div className="modal-body text-center">
                  <p>
                    <Translate>Coming soon.... </Translate>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Zoom>

        {/* DownloadappModal End*/}

        {/* NewsModal first */}
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
                    <Translate>Coming soon...</Translate>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Zoom>

        {/* NewsModal End*/}

        {/* ThanksTypeModalForGraph Start */}
        <div
          id="ThanksTypeModalForGraph"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ThanksTypeModal"
          aria-hidden="true"
          className={ThanksTypeModalForGraph ? "modal fade show" : "modal fade"}
          style={
            ThanksTypeModalForGraph ? { display: "block" } : { display: "none" }
          }
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog"
          >
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="text-uppercase"><Translate>{ThanksTypeModalForGraph}</Translate></p>
                <div className="modal-footer sociallink-footer">
                  <a
                    onClick={() => {
                      setThanksTypeModalForGraph(null);
                      // window.location.reload(false);
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

        {/* checkBudgetModal start */}

        <div
          id="checkBudgetModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="checkBudgetModal"
          aria-hidden="true"
          data-backdrop="false"
          className={checkBudgetModal ? "modal fade show" : "modal fade"}
          style={checkBudgetModal ? { display: "block" } : { display: "none" }}
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered checkBudgetFields-modal sociallogin-modal-dialog thankstype-modal-dialog"
          >
            <div className="modal-content">
              <a
                data-dismiss="modal"
                aria-label="Close"
                className="close-button-style"
                onClick={() => {
                  setCheckBudgetModal(false);
                }}
              >
                <span></span>
              </a>
              <div className="modal-body text-center">
                <div className="checkBudgetFields-width">
                  <h3 className="renew-head"></h3>
                  <div className="input-custom-field finance-input-id-left">
                    <input
                      type="text"
                      className="form-control ng-untouched ng-pristine ng-valid"
                      placeholder=""
                    />
                  </div>
                  <div className="modal-footer sociallink-footer">
                    <button
                      type="submit"
                      className="btn-apply read-btn-bg cmn-submit-button"
                    >
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* checkBudgetModal End */}

        {/* AllModal_End */}

        {/* New_End */}

        {/* AdsModal Start */}
        <div
          id="AdsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="AdsModal"
          aria-hidden="true"
          data-backdrop="static"
          className={
            props.data.ShowAdsModal
              ? "modal fade zoom-in-center header-menu-top show"
              : "modal fade zoom-in-center header-menu-top"
          }
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered menutop-modal-dialog"
          >
            <div className="modal-content">
              <a data-dismiss="modal" className="close-button-style">
                onClick=
                {() => {
                  props.action.setShowAdsModal(false);
                }}
                <span></span>
              </a>
              <div className="welcome-item-row">
                <a
                  href="/advertisement"
                  routerlink="/advertisement"
                  data-dismiss="modal"
                  className="welcome-item"
                >
                  <img src={AdsSubmenuIcon1} />
                </a>
                <a className="welcome-item">
                  onClick=
                  {() => {
                    setFinanceModal(true);
                    setShowAdsModal(false);
                  }}
                  <img src={AdsSubmenuIcon2} />
                </a>
                <a className="welcome-item">
                  nClick={() => setOpportunityModal(true)}
                  <img src={AdsSubmenuIcon3} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* AdsModal End */}

        {/* GuideModal Start */}
        <div
          id="GuideModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="GuideModal"
          aria-hidden="true"
          data-backdrop="static"
          className={
            props.data.ShowGuideModal
              ? "modal fade zoom-in-center header-menu-top show"
              : "modal fade zoom-in-center header-menu-top"
          }
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered menutop-modal-dialog modal-dialog-zoom"
          >
            <div className="modal-content">
              <a
                data-dismiss="modal"
                className="close-button-style"
                onClick={() => {
                  props.action.setShowGuideModal(false);
                }}
              >
                <span></span>
              </a>
              <div className="welcome-item-row">
                <a
                  data-toggle="modal"
                  onClick={() => {
                    setContactModal(true);
                  }}
                  data-target="#ContactModal"
                  className="welcome-item"
                >
                  <img src={GuideSubmenuIcon1} />
                </a>
                <a
                  className="welcome-item"
                  onClick={() => {
                    setInstructionModal(true);
                  }}
                >
                  <img src={GuideSubmenuIcon2} />
                </a>
                <a
                  data-toggle="modal"
                  onClick={() => {
                    setNewsModal(true);
                  }}
                  data-target="#NewsModal"
                  className="welcome-item"
                >
                  <img src={GuideSubmenuIcon3} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* GuideModal_End */}

       

        {/* image-gallery-1 Start */}
        <div
          id="image-gallery-1"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="GallaryModal"
          aria-hidden="true"
          className="modal fade"
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered gallary-modal-dialog modal-dialog-zoom"
          >
            <div className="modal-content border-style-8">
              <a
                // href="javascript:void(0);"
                data-dismiss="modal"
                aria-label="Close"
                className="close-button-style"
              >
                <span></span>
              </a>
              <div className="modal-body"></div>
            </div>
          </div>
        </div>
        {/* image-gallery-1 End */}

        {/* DisclaimerModal Start */}
        <div
          id="DisclaimerModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="DisclaimerModal"
          aria-hidden="true"
          data-backdrop="false"
          className="modal fade zoom-in zoom-in-right"
        >
          <div className="modal-dialog modal-dialog-centered disclaimer-modal-dialog">
            <div className="modal-content border-style-8-gray">
              <a
                // href="javascript:void(0);"
                data-dismiss="modal"
                className="close-button-style"
              >
                <span></span>
              </a>
              <div className="disclaimer-content-in">
                <div className="modal-body">
                  <div className="disclaimer-title-head cmn-title-head text-center">
                    <h2>
                      <Translate>DISCLAIMER</Translate>
                    </h2>
                  </div>
                  <div className="disclaimer-info-scroll">
                    <Translate>Coming Soon ...</Translate>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* DisclaimerModal End */}

        {/* ThanksTypeModalForGraph Start */}
        <div
          id="ThanksTypeModalForGraph"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ThanksTypeModal"
          aria-hidden="true"
          className="modal fade"
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered sociallogin-modal-dialog 
                    thankstype-modal-dialog"
          >
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="text-uppercase"></p>
                <div className="modal-footer sociallink-footer">
                  <a
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

        {/* checkBudgetModal start */}

        <div
          id="checkBudgetModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="checkBudgetModal"
          aria-hidden="true"
          data-backdrop="false"
          className={checkBudgetModal ? "modal fade show" : "modal fade"}
          style={checkBudgetModal ? { display: "block" } : { display: "none" }}
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered checkBudgetFields-modal sociallogin-modal-dialog thankstype-modal-dialog"
          >
            <div className="modal-content">
              <a
                data-dismiss="modal"
                aria-label="Close"
                className="close-button-style"
                onClick={() => {
                  setCheckBudgetModal(false);
                }}
              >
                <span></span>
              </a>
              <div className="modal-body text-center">
                <div className="checkBudgetFields-width">
                  <h3 className="renew-head"></h3>
                  <div className="input-custom-field finance-input-id-left">
                    <input
                      type="text"
                      className="form-control ng-untouched ng-pristine ng-valid"
                      placeholder=""
                    />
                  </div>
                  <div className="modal-footer sociallink-footer">
                    <button
                      type="submit"
                      className="btn-apply read-btn-bg cmn-submit-button"
                    >
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* checkBudgetModal End */}

        {/* SocialLoginModal Start */}
        <div
          id="SocialLoginModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="SocialLoginModal"
          className={showSociaModal ? "modal fade show" : "modal fade "}
          style={showSociaModal ? { display: "block" } : { display: "none" }}
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered sociallogin-modal-dialog"
          >
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="sociallink-info"></p>
              </div>
              <div className="modal-footer sociallink-footer">
                <a className="read-btn-bg cmn-submit-button mrl-10p">
                  <span></span>
                </a>
                <a
                  onClick={() => setShowSocialModal(false)}
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
        {/* SocialLoginModal End */}

        {/* AttentionModal Start */}
        <div
          id="AttentionModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="AttentionModal"
          data-backdrop="static"
          className="modal fade zoom-in zoom-in-right "
          style={
            ShowAttentionModal ? { display: "block" } : { display: "none" }
          }
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered attention-modal-dialog">
            <div className="text-center hand-top-box animate__animated animate__fadeInUp">
              <img src={HandPattern} />
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
              
                  <h2>
                    <Translate>Attention</Translate>
                  </h2>
                </div>
              </div>
              <div className="modal-body">
                <Translate>Coming Soon ...</Translate>
              </div>
            </div>
          </div>
        </div>
        {/* AttentionModal End*/}

        {/* ThanksTypeModal_Start */}
        <div
          id="ThanksTypeModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ThanksTypeModal"
          aria-hidden="true"
          className="modal fade"
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog"
          >
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="text-uppercase"></p>
                <p className="sociallink-info"></p>
                <div className="modal-footer sociallink-footer">
                  <a
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
        {/* ThanksTypeModal_End */}

        {/* WarningModalForLink2 */}
        <div
          id="WarningModalForLink2"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="WarningModal"
          aria-hidden="true"
          className="modal fade"
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered sociallogin-modal-dialog"
          >
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="sociallink-info"></p>
              </div>
              <div className="modal-footer sociallink-footer">
                <a className="read-btn-bg cmn-submit-button mrl-10p">
                  <span></span>
                </a>
                <a
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
        {/* WarningModalForLink2_End */}

        {/* WarningModalForLink_Start */}
        <div
          id="WarningModalForLink"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="WarningModal"
          aria-hidden="true"
          className="modal fade"
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered sociallogin-modal-dialog"
          >
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="sociallink-info"></p>
              </div>
              <div className="modal-footer sociallink-footer">
                <a className="read-btn-bg cmn-submit-button mrl-10p">
                  <span></span>
                </a>
                <a
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
        {/* WarningModalForLink_End */}

        {/* WarningModal_Start */}
        <div
          id="WarningModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="WarningModal"
          aria-hidden="true"
          className="modal fade"
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog"
          >
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="sociallink-info"></p>
                <p className="sociallink-info"></p>
              </div>
              <div className="modal-footer sociallink-footer">
                <a>
                  <span></span>
                </a>
                <a
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
        {/* WarningModal_End */}

        {/* TermsModal Start */}

        {modalShowTerm && (
          <div
            id="TermsModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="LanguageModal"
            aria-hidden="true"
            data-backdrop="static"
            className="modal fade zoom-in-center show"
          >
            <div className="modal-dialog modal-dialog-centered terms-modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="terms-wrapper">
                    <div className="terms-wrap">
                      <div className="disclaimer-title-head cmn-title-head text-center">
                        <h2>
                          <span>
                            <Translate>Terms of use</Translate>{" "}
                          </span>
                        </h2>
                      </div>
                      <div className="terms-info paragraphNew">
                        {" "}
                        {ReactHtmlParser(userAgreementData)}
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
                        <span className="btn-d-text">REFUSE</span>
                      </a>
                      <a
                        href="/home"
                        data-dismiss="modal"
                        className="btn-agree"
                        style={{ textDecoration: "none" }}
                      >
                        <span>ACCEPT</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

       
      </Translator>
    </>
  );
};
export default AllModal;
