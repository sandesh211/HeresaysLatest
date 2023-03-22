import React, { useEffect, useState, useCallback, useRef } from "react";
import ArrowLeft from "../../assets/images/arrow-left-icon.png";
import NextButton from "../../assets/images/icons/icon1.png";
import PrevButton from "../../assets/images/icons/icon2.png";
import bookIcon from "../../assets/images/book-icon.svg";
import Zoom from "react-reveal/Zoom";
import HTMLFlipBook from "react-pageflip";
import "./readstorybook.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { changeLanguage } from "i18next";
import Popup from "../components/modal/popup";
import SocialIcons from "../components/modal/socialIcons";
import axios from "axios";
import { ApiUrl } from "../../config/config";
import LikeIcon from "../components/modal/likeicons";
import LikeIconRight from "../components/modal/likeiconsRight";
import { useNavigate } from "react-router-dom";
import Banner from "../components/banner";
import { Loader } from "../components/loader";
import Header from "../components/header";
import emailImg from "../../assets/images/icons/denounce.png";
import shareImg from "../../assets/images/icons/share.png";
import leftArrow from "../../assets/images/icons/left-arrow.png";
import rightArrow from "../../assets/images/icons/right-arrow.png";
import { Translator, Translate } from "react-auto-translate";
import { useForm } from "react-hook-form";
import SubmitButton from "../../assets/images/submit-button-s-icon.svg";
import LoaderImageNew from "../../assets/images/loading-buffering.gif";
import LazyLoad from "react-lazy-load";
import ReactHtmlParser from "react-html-parser";

import {
  withNamespaces,
  NamespacesConsumer,
  Trans,
  useTranslation,
} from "react-i18next";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

// import ReadStory from "./readstory";
// import "../../pages/readstory/readstory.css";
// import { useSpeechRecognition } from "react-speech-kit";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div
      className="manualpage-rsb page-cover-rsb overflow-box"
      ref={ref}
      data-density="hard"
    >
      <div className="page-content-rsb">
        <div className="title-top">{props.children}</div>
      </div>
    </div>
  );
});

const ReadStoryBook = (props) => {
  // const { innerWidth, innerHeight } = window;
  const { t, i18n } = useTranslation();
  let readBook = useRef(null);
  const myRef = useRef(null);
  const params = useParams();
  const localData = localStorage.getItem("wholeStoryData");
  const localStoryData = JSON.parse(localStorage.getItem("storydata"));
  const parseLocalData = JSON.parse(localData);

  const [emailLink, setEmailLink] = useState(
    `https://heresays.com/storylist2/readstorybook/${localStoryData?.attributes?.id}`
  );
  const [EmailTopicName, setEmailTopicName] = useState("");
  const [ContactModal, setContactModal] = useState(false);
  const [showSociaModal, setShowSocialModal] = useState(false);
  const [socialUrl, setSocialUrl] = useState(false);
  const [checkedValue, setCheckedValue] = useState(1);
  const [rightArrowVisible, setRightArrowVisible] = useState(0);
  const [topicData, setTopicData] = useState();
  const [urlData, setUrlData] = useState(window.location.href);
  const [ThanksTypeModalContact, setThanksTypeModalContact] = useState(false);
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});
  const [parsePara, setParsePara] = useState([]);
  const [wordsVal, setWordsVal] = useState(70);
  const wordVal = useRef(70);
  const NumDevided = useRef(7);
  const [searchModal, setSearchModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [paramsID, setParamsID] = useState(params.storyid);
  const [storyDataIndex, setStorydataIndex] = useState();
  const [newWordData, setNewWordData] = useState();
  const [emailAddress, setMailAddress] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  // const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight);
  const [postIconDetails, setPostIconDetails] = useState();
  const [wholeStoryData, setWholeStoryData] = useState(parseLocalData);
  const [spinner, setSpinner] = useState(true);
  const [PageCount, setPageCount] = useState(0);
  const [lastPage, setLastPage] = useState(100);
  const updateDimensions = () => {
    defineWordsLength();
  };
  const [storyDetails, setStoryDetails] = useState();

  // let bookheight = 950;
  // if (height > 1400) {
  //   bookheight = 733;
  // }
  let currentLanguageSetting = localStorage.getItem("prefered_language")
    ? localStorage.getItem("prefered_language")
    : "en";
  const [currentLanguage, setCurrentLanguage] = useState(
    currentLanguageSetting
  );

  useEffect(() => {
    getStoryData();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const getStoryData = () => {
    axios.get(`${ApiUrl}getBook`).then((result) => {
      console.log("book data", result.data.data);
      setStoryDetails(
        result.data.data.filter((x) => x.attributes.published_at != null)
      );
    });
  };

  // const searchStory = (newQueryString) => {
  //   postDetailData()
  //   // navigate("/storylist2")
  //   let url = `${ApiUrl}getListStory`;
  //   url = url + `?${newQueryString}`;
  //   setSpinner(true)
  //   axios.get(url).then((res) => {
  //     setSpinner(false)
  //     setParsePara(res?.data?.data[0]?.attributes?.topic_details.split(" "))
  //     setParamsID(res?.data?.data[0]?.attributes?.id)
  //     console.log("data by the search filter", res?.data?.data)
  //   });
  // }

  const EmailSent = () => {
    // sendEmail(emailAddress, "heresays@inens.com", "welcome to heresays", emailLink)
    const NewEmailLink =
      "Topic Name :" + postIconDetails?.topic_name + " <br/> <br/>" + emailLink;

    let url = `${ApiUrl}sendMail`;
    let data = {
      to_mail: emailAddress,
      subject: "heresays",
      msg: NewEmailLink,
    };
    axios
      .post(url, data)
      .then((res) => {
        toastr.success("Successfull", "Mail Sent Successfully");
      })
      .catch((error) => {
        toastr.error("Mail Not Sent", "Please Try Again");
      });
    setEmailModal(false);
  };

  // const sendEmail = (to, from, subject, text) => {
  //   const API_KEY = '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';
  //   const URL = 'https://api.sendgrid.com/v3/mail/send';

  //   const data = {
  //     personalizations: [
  //       {
  //         to: [
  //           {
  //             email: to,
  //           },
  //         ],
  //         subject: subject,
  //       },
  //     ],
  //     from: {
  //       email: from,
  //     },
  //     content: [
  //       {
  //         type: 'text/plain',
  //         value: text,
  //       },
  //     ],
  //   };

  //   axios({
  //     method: 'POST',
  //     url: URL,
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       Authorization: `Bearer ${API_KEY}`,
  //       'Content-Type': 'application/json',
  //     },
  //     data: JSON.stringify(data),
  //   })
  //     .then((response) => console.log("email send", response))
  //     .catch((error) => console.error("erron occur", error));
  // };

  const navigate = useNavigate();

  const handleReport = () => {
    setContactModal(true);
    setTopicData();
  };

  const onSubmit = (data) => {
    let bodyData = {
      data: {
        feedback_type: feedBackStatus(),
        feedback_subject: data.feedbackSub,
        // feedback_message: paramsID + " " + data.feedbackMessage,
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

  const onFlip = useCallback(
    (e) => {
      let isMounted = true;
      if (isMounted) {
        // console.log('Current page: ' + e.data);
        setPageCount(e.data);
        // defineWordsLength()
      }
      return () => {
        isMounted = false;
      };
    },
    [PageCount]
  );

  const handleLoadBook = () => {
    defineWordsLength();
    removeBlackScreen();
    console.log("loaded call");
  };

  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      let text = document.getElementById(`page-count` + i)?.innerText;
      if (text === "The End") {
        setLastPage(i);
        break;
      }
    }
  }, [PageCount]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let findData = wholeStoryData[storyDataIndex];
      setParsePara(findData?.attributes?.topic_details?.split(" "));
      setPostIconDetails(findData?.attributes);
      setParamsID(findData?.attributes?.id);
      localStorage.setItem("storydata", JSON.stringify(findData));
    }
    return () => {
      isMounted = false;
    };
  }, [storyDataIndex]);

  useEffect(() => {
    navigate(`/storylist2/readstorybook/${paramsID}`);
  }, [paramsID]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) removeBlackScreen();
    return () => {
      isMounted = false;
    };
  }, []);

  const removeBlackScreen = () => {
    let findDataIndex = wholeStoryData?.findIndex(
      (datanew) => datanew?.id == paramsID
    );
    // console.log( "findDataIndexvfindDataIndex" , findDataIndex);
    setStorydataIndex(findDataIndex);
    let findData = wholeStoryData[findDataIndex];
    setParsePara(findData?.attributes?.topic_details?.split(" "));
    setPostIconDetails(findData?.attributes);
    localStorage.setItem("storydata", JSON.stringify(findData));
    setSpinner(false);
  };

  useEffect(() => {
    let url = `${ApiUrl}getListStory`;
    if (!parseLocalData)
      axios.get(url).then((res) => {
        let attribute = res?.data?.data;
        localStorage.setItem("wholeStoryData", JSON.stringify(attribute));
        window.location.reload();
      });
  }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   axios.get(`${ApiUrl}getListStoryById/${paramsID}`).then((result) => {
  //     if (isMounted) setParsePara(result?.data?.list[0]?.topic_details?.split(" ")); setPostIconDetails(result?.data?.list[0])
  //     localStorage.setItem("storydata", JSON.stringify(result?.data?.list[0]))
  //     setSpinner(false)
  //   });
  //   return () => { isMounted = false };
  // }, [])

  const decrementParamID = () => {
    if (storyDataIndex < 1) {
      setStorydataIndex(storyDataIndex);
    } else {
      setStorydataIndex(storyDataIndex - 1);
      readBook.current.pageFlip().turnToPage(0);
      // console.log("findDataIndexvfindDataIndex", storyDataIndex);
      console.log(
        "readBook.current.pageFlip().getBoundsRect()",
        readBook.current.pageFlip().getBoundsRect()
      );
      console.log(
        "readBook.current.pageFlip().getBoundsRect()",
        readBook.current.pageFlip().getBoundsRect().pageWidth
      );
      console.log(
        "readBook.current.pageFlip().getBoundsRect()",
        readBook.current.pageFlip().getBoundsRect().height
      );
    }
  };
  const incrementParamID = () => {
    if (storyDataIndex < wholeStoryData?.length - 1) {
      setStorydataIndex(storyDataIndex + 1);
      readBook.current.pageFlip().turnToPage(0);
    } else {
      setStorydataIndex(storyDataIndex);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted)
      if (window.innerWidth <= 1025) {
        setRightArrowVisible(1);
      } else {
        setRightArrowVisible(0);
      }

    return () => {
      isMounted = false;
    };
  }, []);

  const defineWordsLength = () => {
    let bookFold = readBook?.current?.pageFlip().getOrientation();
    bookFold == "landscape"
      ? (NumDevided.current = 14)
      : (NumDevided.current = 8);
    const { offsetWidth, offsetHeight } = myRef.current;
    let averageCharPerLine = Math.floor(offsetWidth / 10);
    let averageLinesPerPage = Math.floor(offsetHeight / 20);
    let resultWords =
      (averageCharPerLine * averageLinesPerPage) / NumDevided.current;
    wordVal.current = resultWords.toFixed();
    console.log("resultWords", wordVal.current);
  };

  // const defineWordsLength = () => {
  // let bookWid = readBook.current.pageFlip().getBoundsRect().pageWidth
  // let bookHei = readBook.current.pageFlip().getBoundsRect().height
  // let averageCharPerLine = Math.floor(bookWid);
  // let averageLinesPerPage = Math.floor(bookHei);
  // let resultWords = (averageCharPerLine * averageLinesPerPage) / 500
  // wordVal.current = resultWords.toFixed();
  // console.log("resultWords", wordVal.current)
  // }

  // useEffect(() => {
  //   if (window.screen.orientation && window.screen.orientation.lock) {
  //     if (window.screen.orientation.type === "portrait-secondary" || window.screen.orientation.type === "portrait-primary" || window.screen.orientation.type === "portrait") {
  //       window.screen.orientation.lock("portrait-primary")
  //       console.log("loaded call screeen ", window.screen.orientation.type);
  //     }
  //   }
  // }, []);

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

const getIndex = (index)=>index/2 ;

  if (!props.imagesPreloaded) return <Loader />;
  return (
    <div className="container-read">
      <Header />
      <div className="middle middle_readstory readstorybookwbs">
        <div className="B2 C readstorybook_secone_div">
          {/* <div className="C1 topic">
            <PostDetails
              listStoryId={params.storyid}
              // data={storyDetails}
              // getStoryData={getStoryData}
            />
          </div> */}
          <div className="C2">
            <div className="D1 DD2">
              <LikeIconRight
                listStoryId={params.storyid}
                // data={storyDetails ? storyDetails : null}
                // getStoryData={getStoryData}
              />
            </div>
            <div className="D2 read ">
              <div className="modal-content-rsb bookstory_book" ref={myRef}>
                <a
                  href="/home"
                  routerlink="/home"
                  className="close-button-style-read closeBtn"
                >
                  <span></span>
                </a>

                {/* email img */}
                <div className="help-icon ReportIcons emailDiv position-absolute bottom-0 end-0">
                  <div className="likeCount1">
                    <div className="emailDivMain">
                      <div
                        className="emailDiv"
                        onClick={() => {
                          handleReport();
                        }}
                      >
                        <a
                          // routerlink="/story/read-story"
                          className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                        >
                          <img
                            className="icon iconbook emailIcon"
                            src={emailImg}
                          />
                          <span className="sLReport">{t("DENOUNCE")}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* share img */}
                <div className="help-icon shareIcons emailDiv position-absolute bottom-0 start-0">
                  <div className="likeCount1">
                    <div className="shareStroyIcon">
                      <div className="">
                        <a
                          className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                          onClick={() => {
                            setEmailModal(true);
                          }}
                          target="_blank"
                        >
                          <img
                            className="icon iconbook shareIcon"
                            src={shareImg}
                          />
                          <span className="sLShare">{t("SHARE")}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {storyDataIndex >= 1 ? (
                  <img
                    src={PrevButton}
                    onClick={() => {
                      decrementParamID();
                    }}
                    height="40px"
                    className="position-absolute top-0 start-50 translate-middle-x top_preve_story"
                    alt=""
                  />
                ) : null}

                {PageCount <= 0 ? null : (
                  <img
                    src={leftArrow}
                    onClick={() => readBook.current.pageFlip().flipPrev()}
                    height="40px"
                    className="position-absolute bottom-0 start-0 translate-middle left_prev_btns"
                    alt=""
                  />
                )}

                {spinner ? (
                  <div>
                    {/* <LazyLoad height={762}>
                        <img className="lazy_loader position-absolute top-50 start-50 translate-middle" src={LoaderImageNew} alt="" width="84px" />
                      </LazyLoad> */}
                  </div>
                ) : (
                  <HTMLFlipBook
                    // width={window.innerWidth < 1400 ? 700 : 1030}
                    // height={
                    //   window.innerWidth < 420
                    //     ? 775
                    //     : window.innerWidth < 1400
                    //       ? 550
                    //       : window.innerWidth > 1600
                    //         ? 1100
                    //         : bookheight
                    // }
                    width={550}
                    height={280}
                    size="stretch"
                    minWidth={315}
                    maxWidth={1000}
                    minHeight={400}
                    // minHeight={700}
                    maxHeight={1533}
                    maxShadowOpacity={0.5}
                    showCover={false}
                    mobileScrollSupport={false}
                    className="demo-book read_storybook"
                    drawShadow={true}
                    useMouseEvents={false}
                    onFlip={onFlip}
                    autoSize={true}
                    ref={readBook}
                    onInit={handleLoadBook}
                  >
                    <div
                      className="manualpage-rsb page-cover-rsb overflow-box"
                      data-density="hard"
                    >
                      <div className="page-content-rsb">
                        <div className="title-top">
                          <div className="postdetails pus-titles">
                            <div className="storydetails">
                              <div>
                                <h5 className="postcount">
                                  {postIconDetails?.topic_name}
                                </h5>{" "}
                              </div>
                            </div>

                            <div id="bypara" className="by-title">
                              <span>
                                {t("By")}
                                <br></br>
                                <b>{postIconDetails?.publisher_name}</b>
                              </span>
                            </div>
                          </div>
                        </div>
                        <h6 className="ShowingID">
                          ID : {localStoryData?.attributes?.id}
                        </h6>
                      </div>
                    </div>

                    {[...Array(lastPage).keys()].map((item, index) => {
                      return index % 2 != 0 ? (
                        <div
                          className="manualpage-rsb page-cover-rsb overflow-box"
                          key={index}
                          data-density="hard"
                          id={`page-count` + index}
                        >
                          <div className="page-content-rsb text_content_pages">
                            <div className="title-top">
                              <div
                                className="page page-cover page-borders"
                                data-density="hard"
                              >
                                <div className="page-content page_text z-index-5">
                                  <p>
                                    {ReactHtmlParser(
                                      storyDetails &&
                                        storyDetails[
                                          Math.floor(
                                            Math.random() * storyDetails.length
                                          )
                                        ] &&
                                        storyDetails[
                                          Math.floor(
                                            Math.random() * storyDetails.length
                                          )
                                        ].attributes &&
                                        storyDetails[
                                          Math.floor(
                                            Math.random() * storyDetails.length
                                          )
                                        ].attributes.textfield
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            display:
                              parsePara
                                .slice(
                                  0 + getIndex(index) * wordVal.current,
                                  wordVal.current * (getIndex(index) + 1)
                                )
                                .join(" ").length === 0 || index === lastPage
                                ? "none"
                                : "block",
                          }}
                          className="manualpage-rsb page-cover-rsb overflow-box"
                          key={index}
                          data-density="hard"
                          id={`page-count` + index}
                        >
                          <div className="page-content-rsb text_content_pages">
                            <div className="title-top">
                              <div
                                className="page page-cover page-borders"
                                data-density="hard"
                              >
                                <div className="page-content page_text z-index-5">
                                  <p>
                                    {parsePara
                                      .slice(
                                        0 + getIndex(index) * wordVal.current,
                                        wordVal.current * (getIndex(index) + 1)
                                      )
                                      .join(" ").length === 0
                                      ? "The End"
                                      : parsePara
                                          .slice(
                                            0 + getIndex(index) * wordVal.current,
                                            wordVal.current * (getIndex(index) + 1)
                                          )
                                          .join(" ")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <PageCover
                      className="book_end_page"
                      style={{ visibility: "hidden" }}
                    >
                      <h3 className="the_end_cover"> {t("The End")} </h3>
                    </PageCover>
                  </HTMLFlipBook>
                )}

                {storyDataIndex < wholeStoryData?.length - 1 ? (
                  <img
                    src={NextButton}
                    onClick={() => {
                      incrementParamID();
                    }}
                    height="40px"
                    className="position-absolute bottom-0 start-50 translate-middle-x"
                    alt=""
                  />
                ) : null}
                {/* 
                {
                  (Math.ceil(parsePara?.length / wordVal.current)) + rightArrowVisible < PageCount ? null :
                    <img
                      src={rightArrow}
                      onClick={() => readBook.current.pageFlip().flipNext()}
                      height="40px" className="position-absolute bottom-0 end-0 translate-middle right_arrow_new" alt=""
                    />
                } */}

                {lastPage + rightArrowVisible > PageCount ? (
                  <img
                    src={rightArrow}
                    onClick={() => readBook.current.pageFlip().flipNext()}
                    height="40px"
                    className="position-absolute bottom-0 end-0 translate-middle right_arrow_new"
                    alt=""
                  />
                ) : null}
              </div>
            </div>
            <div className="D3 footer_icons">
              <LikeIcon
                listStoryId={params.storyid}
                // data={storyDetails ? storyDetails : null}
                // getStoryData={getStoryData}
              />
            </div>
          </div>
          <div className="C3">
            <div className="help-icon"></div>
            <div className="help-icon back-b my-2">
              <Link
                to="/storylist2"
                // preventScrollReset={true}
                // onClick={() => navigate(-1)}
                className="btn-continue btn-continue-type"
              >
                <img className="backButton" src={ArrowLeft} />
              </Link>
            </div>
            <div className="help-icon"></div>
          </div>
        </div>
        <div className="footer"></div>
      </div>

      {/* <Zoom when={searchModal} center>
        <div
          id="ContactModal"
tabIndex          role="dialog"
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
          <ReadStory searchStory={searchStory} closemodal={() => setSearchModal(!searchModal)} />
        </div>
      </Zoom> */}

      <Zoom when={ContactModal} center>
        <div
          id="ContactModal"
          tabIndex=""
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
                          value="Complaint"
                          name="check"
                          onChange={() => {
                            setCheckedValue(!checkedValue);
                          }}
                        />
                        <span className="check">{t("Complaint")} </span>
                      </label>
                    </div>
                  </div>
                  <div className="input-custom-field contact-topic-field">
                    <input
                      type="text"
                      className="form-control ng-untouched ng-pristine ng-valid"
                      placeholder=" Enter your Feedback"
                      formcontrolname="feedbackSub"
                      {...register("feedbackSub")}
                    />
                  </div>
                  <div className="contact-textarea-bx">
                    <textarea
                      value={topicData}
                      placeholder="Enter your Feedback"
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

      <Zoom when={emailModal} center>
        <div
          id="ContactModal"
          tabIndex=""
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
                        placeholder={t("Enter Email Address")}
                        onChange={(e) => setMailAddress(e.target.value)}
                      ></input>
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
                {t("YOUR QUERY HAS BEEN PROPERLY SUBMITTED")}
              </p>
              <p>{t("and is published under")}</p>
              <h3>ID:HERESAYSFEEDBACK00{ReferrenceId} </h3>
              <p>{t("Please copy this for your reference")}</p> */}
              <a
                onClick={() => {
                  setThanksTypeModalContact(false);
                  // setTopicData(window.location.href);
                  reset();
                  navigate(`/storylist2/readstorybook/${paramsID}`);
                }}
              >
                <img src={SubmitButton} alt="img" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Popup
        socialUrl={socialUrl}
        // Translate={Translate}
        showSociaModal={showSociaModal}
        setShowSocialModal={setShowSocialModal}
      />
    </div>
  );
};
export default ReadStoryBook;

// AIzaSyApqsFNbDNj6KTczy3u-kNvmXrQ_2ACQPM
