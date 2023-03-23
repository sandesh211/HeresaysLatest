import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowLeft from "../../assets/images/arrow-left-icon.png";
import Zoom from "react-reveal/Zoom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./storyList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../../config/config";
import Banner from "../components/banner";
import { Loader } from "../components/loader";
import Header from "../components/header";
import { Translator, Translate } from "react-auto-translate";
import emailImg from "../../assets/images/icons/denounce.png";
import searchImg from "../../assets/images/icons/search.png";
import shareImg from "../../assets/images/icons/share.png";
import bookImg from "../../assets/images/bookImg.png";
import SubmitButton from "../../assets/images/submit-button-s-icon.svg";
import "../../pages/readstory/readstory.css";
import { useForm } from "react-hook-form";
import footerimg from "../../assets/images/footer-bottom-bar.png";
import _debounce from "lodash/debounce";
// import { useWindowScroll } from "react-use";
import ReadStory from "./readstory";
import spinnerSvg from "../../assets/images/spinner.svg";
import {
  withNamespaces,
  NamespacesConsumer,
  Trans,
  useTranslation,
} from "react-i18next";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import validator from 'validator'

const StoryList2 = (props) => {
  const { t, i18n } = useTranslation();
  // const { y: pageYOffset } = useWindowScroll();
  // const {x, y} = useWindowScroll();
  const [ContactModal, setContactModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [emailLink, setEmailLink] = useState();
  const [TopicNameForLink, setTopicNameForLink] = useState();
  const [emailAddress, setMailAddress] = useState("");
  const [wholeItem, setWholeItem] = useState([]);
  const [page, setPage] = useState(0);
  const [storyList, setStoryList] = useState([]);
  const [isRunning, setRunning] = useState(true);
  const [storyById, setStoryById] = useState([]);
  const [storySecondLast, setStorySecondLast] = useState([]);
  const [lastListValue, setLastListValue] = useState([]);
  const [checkedValue, setCheckedValue] = useState(1);
  const [topicData, setTopicData] = useState();
  const [urlData, setUrlData] = useState(window.location.href);
  const [toggleAudio, setToggleAudio] = useState(false);
  const [ThanksTypeModalContact, setThanksTypeModalContact] = useState(false);
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});
  const [WholeData, setWholeData] = useState([]);
  const [storyIndex, setStoryIndex] = useState(1);
  const [spinner, setSpinner] = useState(true);
  const [closeLoader, setCloseLoader] = useState(true);
  const [paramsID, setParamsID] = useState();
  const [scrollPlace, setScrollPlace] = useState();
  const [emailError, setEmailError] = useState('')

  const cacheProvider = {
    get: (language, key) =>
      ((JSON.parse(localStorage.getItem("translations")) || {})[key] || {})[
        language
      ],
    set: (language, key, value) => {
      const existing = JSON.parse(localStorage.getItem("translations")) || {
        [key]: {},
      };
      existing[key] = { ...existing[key], [language]: value };
      localStorage.setItem("translations", JSON.stringify(existing));
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const location = useLocation();

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

  const searchStory = (newQueryString) => {
    let url = `${ApiUrl}getListStory`;
    url = url + `?${newQueryString}`;
    setSpinner(true);
    axios.get(url).then((res) => {
      let attribute = res?.data?.data?.slice(storyIndex)[0]?.attributes;
      let attributes = res?.data?.data?.slice(-2)[0]?.attributes;
      setSpinner(false);
      setStoryById(attribute);
      setStorySecondLast(attributes);
      setLastListValue(attribute);
      let storiesRes = res?.data?.data?.reverse();
      setWholeData(storiesRes);
      localStorage.setItem("wholeStoryData", JSON.stringify(storiesRes));
      setWholeItem(storiesRes?.slice(0, 5));
      setPage(0);
    });
  };

  useEffect(() => {
    let url = `${ApiUrl}getListStory`;
    setSpinner(true);
    axios.get(url).then((res) => {
      let attribute = res?.data?.data?.slice(storyIndex)[0]?.attributes;
      let attributes = res?.data?.data?.slice(-2)[0]?.attributes;
      setSpinner(false);
      setStoryById(attribute);
      setStorySecondLast(attributes);
      setLastListValue(attribute);
      let storiesRes = res?.data?.data?.reverse();
      setWholeData(storiesRes);
      localStorage.setItem("wholeStoryData", JSON.stringify(storiesRes));
      setWholeItem(storiesRes?.slice(page, 5));
    });

    // console.log("lastListValue", lastListValue);
  }, []);

  useEffect(() => {
    // a fake async api call like which sends
    // 5 more records in 1.5 secs
    if (page != 0) {
      setTimeout(() => {
        setWholeItem(wholeItem.concat(WholeData.slice(page * 5, page * 5 + 5)));
      }, 1500);
    }
  }, [page]);

  const fetchMoreData = () => {
    // console.log("page change");
    if (wholeItem.length >= WholeData.length) {
      setCloseLoader(false);
    }
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setPage(page + 1);
  };

  useEffect(() => {
    // console.log("storyById", storyById);
    // console.log("storySecondLast", storySecondLast);
  }, [storyById, storySecondLast]);

  // useEffect(() => {
  //     let id = 295;
  //     let url = `${ApiUrl}getListStoryById/${id}`;
  //     axios.get(url).then((res) => {
  //         setStoryById(res?.data?.list[0]);
  //     });

  // }, [])

  // const handleScroll = (e)=>{
  //     setStoryIndex(storyIndex + 1)
  //     console.log("scroll" , e.currentTarget.scrollTop);
  // }

  let handleScroll = useCallback(
    _debounce((e) => {
      // console.log("event scroll", e.currentTarget.scrollTop);
      setStoryIndex(storyIndex + 1);
      // console.log("scroll", storyIndex);
    }, 150),
    [storyIndex]
  );

  useEffect(() => {
    // console.log("storyById", lastListValue?.id, "lastListValue", lastListValue?.id);
  }, [lastListValue]);

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
  const handleOnClick = () => {
    // let ApiId = 295;
    // navigate(`/readstory/storylist/readstorybook/${lastListValue?.id}`);
    navigate(`/storylist2/readstorybook/${lastListValue?.id}`);
  };

  const handleBook = (item) => {
    const element = document.getElementById("ScrolingElement");
    setScrollPlace(element.scrollTop);
    localStorage.setItem("scrollPosition", element.scrollTop);
    navigate(`/storylist2/readstorybook/${item?.id}`);
  };
  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById("ScrolingElement");
      element.scrollTop = parseInt(localStorage.getItem("scrollPosition"));
    }, 1000);
    // setInterval(() => {
    //     const element = document.getElementById("ScrolingElement")
    //     element.scrollTop = parseInt(localStorage.getItem("scrollPosition"))
    // }, 1000);
    // window.scrollTo(0, scrollPlace);
  }, []);

  const handleReport = (id) => {
    console.log("report", id);
    setContactModal(true);
    setParamsID(id);
  };

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
        // feedback_message: data.feedbackMessage,
        feedback_message: paramsID + " " + urlData + topicData,
        feedback_reference: "",
      },
    };
    setThanksTypeModalContact(true);
    setFeedbackData(bodyData);
    onFeedbackSubmit(bodyData.data);
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
            setCheckedValue(0);
            reset();
          })
          .catch((errr) => {
            console.log(errr);
          });
      })
      .catch((error) => {
        console.log(error);
        reset();
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

  const infinityStory = (item, index) => {
    let allPara = item?.attributes?.topic_details;
    return (
      <div className="individual_stories" key={index}>
        <h4>{item?.attributes?.topic_name}</h4>
        <div className="deteil_htmlparse">{allPara}</div>
        <br />
        {/* <p className="post_reviewed">{t('This post has not been reviewed')}</p> */}
        <div className="likeshare_icon">
          <div className="help-icon shareIconss emailDiv ">
            <div className="likeCount1">
              <div className="shareStroyIcon">
                <div
                  className=""
                  // disabled={isDisabled ? "true" : "false"}
                >
                  <span className="sLShare">{t("SHARE")}</span>
                  <a
                    className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                    onClick={() => {
                      openEmailModal(item); setMailAddress("")
                    }}
                    target="_blank"
                  >
                    <img className="icon_size" src={shareImg} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="read_bookIcon">
            <span>{t("READ")}</span>
            <Link to={`/storylist2/readstorybook/${item?.id}`}>
              <img
                className="icon_size"
                src={bookImg}
                onClick={() => {
                  handleBook(item);
                }}
                alt="img"
              />
            </Link>
          </div>
          <div className="help-icon ReportIconss emailDiv ">
            <div className="likeCount1">
              <div className="emailDivMain">
                <div
                  className="emailDiv"
                  onClick={() => {
                    handleReport(item?.attributes?.id);
                  }}
                  // disabled={isDisabled ? "true" : "false"}
                >
                  {" "}
                  <span className="sLReport">{t("DENOUNCE")}</span>
                  <a
                    routerlink="/story/read-story"
                    className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                  >
                    <img className="icon_size" src={emailImg} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="devider_line" />
      </div>
    );
  };


  const validateEmail = (e) => {
    setMailAddress(e.target.value)
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError()
    } else {
      setEmailError('Enter valid Email!')
    }
  }


  const openEmailModal = (item) => {
    setEmailModal(true);
    setMailAddress("")
    setEmailLink(`https://heresays.com/storylist2/readstorybook/${item?.id}`);
    setTopicNameForLink(item?.attributes?.topic_name);
  };

  const EmailSent = () => {
    const NewEmailLink =
      "Topic Name :" + TopicNameForLink + " <br/> <br/>" + emailLink;
    // sendEmail(emailAddress, "heresays@inens.com", "welcome to heresays", emailLink)
    let url = `${ApiUrl}sendMail`;
    let data = {
      to_mail: emailError ? null :emailAddress,
      subject: "heresays",
      msg: NewEmailLink,
    };
    if(!emailError){
    axios
      .post(url, data)
      .then((res) => {
        toastr.success("Successfull", "Mail Sent Successfully");
        setMailAddress("")
      })
      .catch((error) => {
        toastr.error("unSuccessfull", error);
        setMailAddress("")
      });
    }else{
      toastr.error("unSuccessfull", "Please try again ");
      setMailAddress("")
      
    }
    setEmailModal(false);
  };

  //   const sendEmail = (to, from, subject, text) => {
  //     const API_KEY = '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';
  //     const URL = 'https://api.sendgrid.com/v3/mail/send';

  //     const data = {
  //       personalizations: [
  //         {
  //           to: [
  //             {
  //               email: to,
  //             },
  //           ],
  //           subject: subject,
  //         },
  //       ],
  //       from: {
  //         email: from,
  //       },
  //       content: [
  //         {
  //           type: 'text/plain',
  //           value: text,
  //         },
  //       ],
  //     };

  //     axios({
  //       method: 'POST',
  //       url: URL,
  //       headers: {
  //         Authorization: `Bearer ${API_KEY}`,
  //         'Content-Type': 'application/json',
  //       },
  //       data: JSON.stringify(data),
  //     })
  //       .then((response) => console.log("email send", response))
  //       .catch((error) => console.error("erron occur", error));
  //   };

  // const { listen, listening, stop } = useSpeechRecognition({
  //     onResult: (result) => {
  //         setTopicData(topicData + result);
  //     },
  // });

  if (!props.imagesPreloaded && !storyById) return <Loader />;

  return (
    <>
      {
        <div className={`container2 storylist_container mobile_height`}>
          <Header />
          <div className="middle mobile_middle">
            {/* <div className="B1"></div> */}
            <div className="B2 cards list_cards">
              <div className="home-body-container-list storylist1a">
                <h3
                  style={{
                    textAlign: "center",
                    color: "#cfa741",
                    fontFamily: "sanitarium_bbregular",
                    marginBottom: "0%",
                  }}
                >
                  {t("CHOOSE")}
                </h3>
                <div
                  role="document"
                  className="modal-dialog-list modal-dialog-centered-list readastory-modal-dialog-list border-style-8-list modal-align-list"
                >
                  <div className="modal-content-list">
                    {/* close buttion */}
                    <Link
                      to="/home"
                      // routerlink="/home"
                      className="close-button-style-read closeBtn closeBtns1"
                    >
                      <span></span>
                    </Link>

                    {/* search img */}
                    <div className="help-icon searchIcon emailDiv position-absolute top-0 start-0">
                      <div className="likeCount1">
                        <div className="searchDivMain">
                          <div
                            className="searchDiv"
                            // disabled={isDisabled ? "true" : "false"}
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                setSearchModal(true);
                              }}
                              className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                            >
                              <img
                                className="icon iconbook searchIcon"
                                src={searchImg}
                                alt="img"
                              />
                              <span className="sLSearch">{t("SEARCH")}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="help-icon content_Boxes1"
                      id="ScrolingElement"
                    >
                      <div className="likeCount1 like_Content2">
                        <div className="like-icon-borderss">
                          <div>
                            {
                              // (spinner) ?
                              //     <div>
                              //         <LazyLoad height={762}>
                              //             <img className="lazy_loader position-absolute top-50 start-50 translate-middle" src={LoaderImageNew} alt="" width="84px" />
                              //         </LazyLoad>
                              //     </div>
                              //     :
                              <div className="headertop121">
                                <InfiniteScroll
                                  dataLength={wholeItem?.length}
                                  next={() => {
                                    fetchMoreData();
                                  }}
                                  hasMore={closeLoader}
                                  loader={<img src={spinnerSvg} alt="img" />}
                                  scrollableTarget="ScrolingElement"
                                >
                                  {wholeItem.map((i, index) => {
                                    return infinityStory(i, index);
                                  })}
                                </InfiniteScroll>
                              </div>
                            }

                            <img
                              className="footer_bar"
                              src={footerimg}
                              alt="img"
                            ></img>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="continue-btn-group-list continue-btn-group-list-story-list button-position-list">
                <a
                  routerlink="/home"
                  className="btn-continue-list arrow-bounce-right-list"
                  href="/home"
                >
                  <img src={ArrowLeft} alt="img" />
                </a>
              </div>
            </div>
          </div>
          <app-footer-panel>
            <div className="bottom-wrapper-initial-mobile">
              <div className="google-ads-wrap ng-star-inserted">
                <Banner />
              </div>
            </div>
          </app-footer-panel>
        </div>
      }

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
                          defaultChecked={checkedValue === 1 ? true : false}
                          // checked={checkedValue === 1}
                          // checked
                          value="Complaint"
                          name="check"
                          onChange={() => selectOnlyThis(1)}
                        />
                        <span className="check">{t("Complaint")} </span>
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
                            {t('Explanation')}Suggestion{" "}
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
                            {t('Explanation')}Remark{" "}
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
                            {t('Explanation')}Other{" "}
                          </span>
                        </label>
                      </div> */}
                  </div>
                  <div className="input-custom-field contact-topic-field">
                    <input
                      type="text"
                      className="form-control ng-untouched ng-pristine ng-valid"
                      placeholder={t("Enter Your Feedback")}
                      formcontrolname="feedbackSub"
                      {...register("feedbackSub")}
                    />
                  </div>
                  <div className="contact-textarea-bx">
                    <textarea
                      value={topicData}
                      placeholder={t("Enter Your Feedback")}
                      formcontrolname="feedbackMessage"
                      {...register("feedbackMessage", {
                        onChange: (e) => {
                          setTopicData(e.target.value);
                        },
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

      <Zoom when={searchModal} center>
        <div
          id="DisclaimerModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ContactModal"
          aria-hidden="true"
          data-backdrop="false"
          className={
            searchModal
              ? "modal overflow-hidden fade zoom-in zoom-in-left show"
              : "modal fade zoom-in zoom-in-left"
          }
          style={searchModal ? { display: "block" } : { display: "none" }}
        >
          {/* <div className="modal-dialog modal-dialog-centered contact-modal-dialog">
                        <div className="modal-body border-style-8">
                            <div className="contact-body-in">
                                <div className="contact-checkbox-group"> */}
          <ReadStory
            searchStory={searchStory}
            closemodal={() => setSearchModal(!searchModal)}
          />
          {/* </div>
                            </div>
                        </div>
                    </div> */}
        </div>
      </Zoom>

      <Zoom when={emailModal} center>
        <div
          id="ContactModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ContactModal"
          aria-hidden="true"
          data-backdrop="false"
          className={
            emailModal
              ? "modal fade zoom-in zoom-in-left show"
              : "modal fade zoom-in zoom-in-left"
          }
          style={emailModal ? { display: "block" } : { display: "none" }}
        >
          <div className="modal-dialog modal-dialog-centered contact-modal-dialog modal_open_share">
            <div className="modalbody">
              <div className="modal-body border-style-8">
                <div className="contact-body-in">
                  <div className="contact-checkbox-group">
                    <form className="share_submit">
                      <input
                        type="email"
                        value={emailAddress}
                        placeholder={t("Enter Email Address")}
                        onChange={(e) => validateEmail(e)}
                      ></input>
                      <span style={{fontWeight: 'bold',color: 'red',}}>{emailError}</span>
                      {/* <button type="submit"> Share </button> */}
                    </form>
                  </div>
                </div>
              </div>
              <div className="type-btngroup add-adv-btngroup">
                <button
                  type="submit"
                  className="ads-submit-btn cmn-submit-button"
                  onClick={() => {
                    EmailSent();
                  }}
                >
                  <span></span>
                </button>
                <a
                  data-dismiss="modal"
                  onClick={() => {
                    setEmailModal(false);
                  }}
                  className="ads-close-btn close-button-style"
                >
                  <span></span>
                </a>
              </div>
            </div>
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
        style={
          ThanksTypeModalContact ? { display: "block" } : { display: "none" }
        }
      >
        <div
          role="document"
          className="modal-dialog modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog"
        >
          <div className="modal-content">
            <div className="modal-body text-center">
              <p className="text-uppercase">
                Thank you for reaching out to us... Your mail has been
                successfully sent and will be read and assessed as soon as
                possible. Please be assured that any suggestions and user
                interactions, like yours, are taken extremely serious... and
                that, with regard to the messages that are received, the
                appropriate measures will be taken at the earliest convenience.
              </p>
              {/* <p className="text-uppercase">
                                Your query has been properly submitted
                            </p>
                            <p>and is published under</p>
                            <h3>ID:HERESAYSFEEDBACK00{ReferrenceId} </h3>
                            <p>Please copy this for your reference</p> */}
              <a
                onClick={() => {
                  setThanksTypeModalContact(false);
                  // setTopicData(window.location.href);
                  reset();
                  navigate("/storylist2");
                }}
              >
                <img src={SubmitButton} alt="img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryList2;
