import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardData } from "../../constants/cardconstants";
import CardStyle1 from "../components/card/cardstyle1";
import LogoHome from "../../assets/images/logo-heresays-5.svg";
import Background from "../../assets/images/read-a-story-bg.png";
import Facebook from "../../assets/images/website-facebook_new.png";
import Adobe from "../../assets/images/website-analytics-new.png";
import Insta from "../../assets/images/website-instragram_new.png";
import Linkedin from "../../assets/images/website-linkedin-new.png";
import Twitter from "../../assets/images/website-twitter_new.png";
import CrossIcon from "../../assets/images/cross-icon-gradient.svg";
import BackArrowSmall from "../../assets/images/back-arrow-gradient-small.png";
import Arrow from "../../assets/images/arrow-right-icon.png";
import ArrowLeft from "../../assets/images/arrow-left-icon.png";
import Calender from "../../assets/images/calendar-icon.svg";
import classifieds from "../../assets/images/classifieds-icon.svg";
import bookIcon from "../../assets/images/book-icon.svg";
import Zoom from "react-reveal/Zoom";
import { Card, CardGroup } from "react-bootstrap";
import cardBottom from "../../assets/images/shape-add-ads-top.png";

import "./storyList.css";
import { Fade, Rotate } from "react-reveal";
import Settings from "../home/settings/setting";
import AdsModal from "../home/ads/ads";
import { Link } from "react-router-dom";
import { changeLanguage } from "i18next";
import Popup from "../components/modal/popup";
import SocialIcons from "../components/modal/socialIcons";
import axios from "axios";
import { ApiUrl } from "../../config/config";
import AllModal from "../../constants/allmodal";
import Banner from "../components/banner";
import { Loader } from "../components/loader";
import Header from "../components/header";
import { Translator, Translate } from "react-auto-translate";
import emailImg from "../../assets/images/email2.png";
import searchImg from "../../assets/images/searchImg.png";
import shareImg from "../../assets/images/shareImg.png";
import bookImg from "../../assets/images/bookImg.png";



import SubmitButton from "../../assets/images/submit-button-s-icon.svg";
import "../../pages/readstory/readstory.css";
import Microphone from "../../assets/images/microphone-icon.png";
import StopIcon from "../../assets/images/stop-icon.svg";
// import { useSpeechRecognition } from "react-speech-kit";
import { useForm } from "react-hook-form";
import ReadStory from "./readstory";


const StoryList = (props) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [ShowAdsModal, setShowAdsModal] = useState(false);
  const [ShowGuideModal, setShowGuideModal] = useState(false);
  const [DownloadappModal, setDownloadappModal] = useState(false);
  const [ShowLanguageModal, setShowLanguageModal] = useState(false);
  const [Termsofuse2Modal, setTermsofuse2Modal] = useState(false);
  const [checkBudgetModal, setCheckBudgetModal] = useState(false);
  const [FinanceModal, setFinanceModal] = useState(false);
  const [OpportunityModal, setOpportunityModal] = useState(false);
  const [ContactModal, setContactModal] = useState(false);
  const [InstructionModal, setInstructionModal] = useState(false);
  const [showSociaModal, setShowSocialModal] = useState(false);
  const [NewsModal, setNewsModal] = useState(false);
  const [userAgreementData, setUserAgreementData] = useState();
  const [termsAndCondition, setTermsAndCondition] = useState("");
  const [disclaimer, setDisclaimer] = useState();
  const [attentionData, setAttentionData] = useState();
  const [AllLaguages, setAllLaguages] = useState(false);
  const [storyList, setStoryList] = useState([]);
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [socialUrl, setSocialUrl] = useState(false);
  const [modalShowTerm, setModalShowTerm] = useState(false);
  const [ShowAttentionModal, setShowAttentionModal] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);
  const [isRunning, setRunning] = useState(true);
  const [parsePara, setParsePara] = useState([]);
  const [searchModal, setSearchModal] = useState(false);




  const [content, setContent] = useState([]);
  const [checkedValue, setCheckedValue] = useState(0);
  const [topicData, setTopicData] = useState(window.location.href);
  const [toggleAudio, setToggleAudio] = useState(false);
  const [ThanksTypeModalContact, setThanksTypeModalContact] = useState(false);
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});

  const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    setTimeout(() => {
      setRunning(false);
    }, 3000);
    getStoryList();
  }, []);

  let currentLanguageSetting = localStorage.getItem("prefered_language")
    ? localStorage.getItem("prefered_language")
    : "en";
  const [currentLanguage, setCurrentLanguage] = useState(
    currentLanguageSetting
  );


  const getStoryList = () => {
    let url = `${ApiUrl}getListStory`;
    url = url + `?${location.state}`;
    axios.get(url).then((res) => {
      setStoryList(
        res.data.data.filter((x) => x.attributes.published_at != null)
      );
    });
  };
  const navigate = useNavigate();


  const handleReport = () => {
    setContactModal(true)
  }

  const selectOnlyThis = (id) => {
    setCheckedValue(id);
  };

  const handleAudioChange = (listening) => {
    setToggleAudio(!toggleAudio);
    // listening ? stop() : listen();
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
            `${ApiUrl}updateFeedback/${res.data.list && res.data.list.insertId
            }`,
            {
              feedback_reference: `HERESAYSFEEDBACK00${res.data.list && res.data.list.insertId
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

  // const { listen, listening, stop } = useSpeechRecognition({
  //   onResult: (result) => {
  //     setTopicData(topicData + result);
  //   },
  // });
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


  const handleOnClick = (id) =>
    navigate(`/readstory/storylist/readstorybook/${id}`);

  if (!props.imagesPreloaded) return <Loader></Loader>;
  return (
    <>
      {
        <Translator
        cacheProvider={cacheProvider}
          from="en"
          to={currentLanguage}
          googleApiKey="AIzaSyDJyDB2bnmeDG4KHOZkHnrDqhrqnUI375M"
        >
          <div className="container2">
            <Header />
            <div className="middle mobile_middle">
              <div className="B1"></div>
              <div className="B2 cards">
                <div className="home-body-container-list">
                  <h3
                    style={{
                      textAlign: "center",
                      color: "#cfa741",
                      fontFamily: "sanitarium_bbregular",
                      marginBottom: "0%",
                    }}
                  >
                    <Translate>CHOOSE</Translate>
                  </h3>
                  <div
                    role="document"
                    className="modal-dialog-list modal-dialog-centered-list readastory-modal-dialog-list border-style-8-list modal-align-list"
                  >
                    <div className="modal-content-list">
                      {/* close buttion */}
                      <a
                        href="/home"
                        routerlink="/home"
                        className="close-button-style-read closeBtn"
                      >
                        <span></span>
                      </a>

                      {/* search img */}
                      <div className="help-icon emailDiv position-absolute top-0 start-0">
                        <div className="likeCount1">
                          <div className="searchDivMain">
                            <div
                              className="searchDiv"
                            // disabled={isDisabled ? "true" : "false"}
                            >
                              <a
                                onClick={() => { setSearchModal(true) }}
                                // routerlink="/story/read-story"
                                href="#"
                                className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                              >
                                <img className="icon iconbook searchIcon" src={searchImg} />
                                <span className="sLSearch"><Translate>Search</Translate></span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* email img */}
                      <div className="help-icon emailDiv position-absolute bottom-0 end-0">
                        <div className="likeCount1">
                          <div className="emailDivMain">
                            <div
                              className="emailDiv"
                              onClick={() => { handleReport() }}
                            // disabled={isDisabled ? "true" : "false"}
                            >
                              <a
                                routerlink="/story/read-story"
                                className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"

                              >
                                <img className="icon iconbook emailIcon" src={emailImg} />
                                <span className="sLReport"><Translate>Report</Translate></span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* share img */}
                      <div className="help-icon emailDiv position-absolute bottom-0 start-0">
                        <div className="likeCount1">
                          <div className="shareStroyIcon">
                            <div
                              className=""
                            // disabled={isDisabled ? "true" : "false"}
                            >
                              <a
                                //routerlink="/story/read-story"
                                className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                                onClick={() => window.location.href = "https://www.facebook.com/login"}
                                target="_blank"
                              >
                                <img className="icon iconbook shareIcon" src={shareImg} />
                                <span className="sLShare"><Translate>Share</Translate></span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Book img
                      <div className="help-icon emailDiv position-absolute bottom-0 start-50 translate-middle-x">
                        <div className="likeCount1">
                          <div className="like-icon-border">
                            <div
                              className="like-icon-back"
                            // disabled={isDisabled ? "true" : "false"}
                            >
                              <a
                                //routerlink="/story/read-story"
                                className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                                onClick={() => window.location.href = "https://www.facebook.com/login"}
                                target="_blank"
                              >
                                <img className="icon iconbook bookIcon" src={bookImg} />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div> */}

                      <div className="modal-body parentbody-list">

                        <div className="storylist-list">
                          {storyList &&
                            storyList.map((x) => {
                              return (
                                <div className="cardparent-list col-lg-3 col-md-6 col-sm-12 mx-1 my-3">
                                  <div
                                    className="card-start-list"
                                    onClick={() => handleOnClick(x.id)}
                                  >
                                    <div className="cardBorder-list ">
                                      <div className="cardData-list "></div>
                                      <div className="cardTitle-list">
                                        <div className="cardTitleImage-list">
                                          <h6 className="cardTitleText-list">
                                            {x.attributes.topic_name}
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="continue-btn-group-list continue-btn-group-list-story-list button-position-list">
                  <a
                    routerlink="/readstory"
                    className="btn-continue-list arrow-bounce-right-list"
                    href="/readstory"
                  >
                    <img src={ArrowLeft} />
                  </a>
                </div>
              </div>
              <div className="B3">
              </div>
            </div>
            <Banner />
          </div>
        </Translator>
      }


      <Zoom when={searchModal} center>
        <div
          id="ContactModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ContactModal"
          aria-hidden="true"
          data-backdrop="false"
          className={
            searchModal
              ? "modal fade zoom-in zoom-in-left show"
              : "modal fade zoom-in zoom-in-left"
          }
          style={searchModal ? { display: "block" } : { display: "none" }}
        >
          {/* <div className="modal-dialog modal-dialog-centered contact-modal-dialog">
                        <div className="modal-body border-style-8">
                            <div className="contact-body-in">
                                <div className="contact-checkbox-group"> */}
          <ReadStory closemodal={() => setSearchModal(!searchModal)} />
          {/* </div>
                            </div>
                        </div>
                    </div> */}
        </div>
      </Zoom>


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
            <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body border-style-8">
                <div className="contact-body-in">
                  <div className="contact-checkbox-group">
                    <div className="contact-checkbox-item ng-star-inserted">
                      <label>
                        <input
                          type="checkbox"
                          checked={checkedValue == 1 ? true : false}
                          value="Complaint"
                          name="check"
                          onClick={() => selectOnlyThis(1)}
                        />
                        <span className="check">
                          <Translate>Complaint</Translate>{" "}
                        </span>
                      </label>
                    </div>
                    {/* <div className="contact-checkbox-item ng-star-inserted">
                        <label>
                          <input
                            type="checkbox"
                            value="Request"
                            checked={checkedValue == 2 ? true : false}
                            name="check"
                            onClick={() => selectOnlyThis(2)}
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
                            checked={checkedValue == 3 ? true : false}
                            name="check"
                            onClick={() => selectOnlyThis(3)}
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
                            checked={checkedValue == 4 ? true : false}
                            name="check"
                            onClick={() => selectOnlyThis(4)}
                          />
                          <span className="check">
                            <Translate>Other</Translate>{" "}
                          </span>
                        </label>
                      </div> */}
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
                      {...register("feedbackMessage", {
                        onChange: (e) => {
                          setTopicData(e.target.value)
                        }
                      })}
                      className="ng-untouched ng-pristine ng-valid"
                    />
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
                                        {listening ? <img src={StopIcon} /> : <img src={Microphone} />}
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
                  setTopicData(window.location.href);
                  reset();
                  navigate("/readstory/storylist");
                }}
              >
                <img src={SubmitButton} />
              </a>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default StoryList;