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
import LoaderImageNew from '../../assets/images/loading-buffering.gif'
import LazyLoad from 'react-lazy-load';
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

  let readBook = useRef();
  const myRef = useRef(null);
  const params = useParams();
  const localData = localStorage.getItem("wholeStoryData")
  const parseLocalData = JSON.parse(localData)
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
  const wordVal = useRef(70)
  const NumDevided = useRef(7)
  const [searchModal, setSearchModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [paramsID, setParamsID] = useState(params.storyid);
  const [storyDataIndex, setStorydataIndex] = useState();
  const [newWordData, setNewWordData] = useState();
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
    defineWordsLength()
  };

  // let bookheight = 950;
  // if (height > 1400) {
  //   bookheight = 733;
  // }

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);


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



  const navigate = useNavigate();

  const handleReport = () => {
    setContactModal(true)
    setTopicData();
  }

  const onSubmit = (data) => {
    let bodyData = {
      data: {
        feedback_type: feedBackStatus(),
        feedback_subject: data.feedbackSub,
        // feedback_message: paramsID + " " + data.feedbackMessage,
        feedback_message: paramsID + " " + urlData + topicData,
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

  const onFlip = useCallback((e) => {
    let isMounted = true;
    if (isMounted) {
      console.log('Current page: ' + e.data);
      setPageCount(e.data);
      defineWordsLength()
    }

    return () => { isMounted = false };
  }, [PageCount]);

  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      let text = document.getElementById(`page-count` + i)?.innerText;
      if (text === 'The End') {
        setLastPage(i);
        break;
      }
    }

  }, [PageCount])

  useEffect(() => {
    // defineWordsLength()
  }, [PageCount])



  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let findData = wholeStoryData[storyDataIndex]
      console.log("storyDataIndex", storyDataIndex);
      setParsePara(findData?.attributes?.topic_details?.split(" "));
      setPostIconDetails(findData?.attributes)
      setParamsID(findData?.attributes?.id)
      localStorage.setItem("storydata", JSON.stringify(findData))
    }
    return () => { isMounted = false };
  }, [storyDataIndex])

  useEffect(() => {
    navigate(`/storylist2/readstorybook/${paramsID}`)

  }, [paramsID])


  useEffect(() => {
    let isMounted = true;
    if (isMounted) removeBlackScreen();
    return () => { isMounted = false };
  }, [])


  const removeBlackScreen = () => {
    console.log("result?.data?.data", wholeStoryData);
    let findDataIndex = wholeStoryData?.findIndex((datanew) => datanew?.id == paramsID)
    setStorydataIndex(findDataIndex)
    let findData = wholeStoryData[findDataIndex]
    console.log("findfindfindfindfind", findData);
    setParsePara(findData?.attributes?.topic_details?.split(" "));
    setPostIconDetails(findData?.attributes)
    localStorage.setItem("storydata", JSON.stringify(findData))
    setSpinner(false)
    if(!spinner){defineWordsLength()} 
  }

  // useEffect(()=>{
  //   if(!spinner) defineWordsLength()
  // },[])

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
      setStorydataIndex(storyDataIndex)
    } else {
      setStorydataIndex(storyDataIndex - 1)
      readBook.current.pageFlip().turnToPage(0)
      console.log( "readBook.current.pageFlip().isFolded()" , readBook.current.pageFlip().getOrientation() )
      // setTimeout(() => {
      //   window.location.reload()
      // }, 100);
    }
  }
  const incrementParamID = () => {
    if (storyDataIndex < wholeStoryData?.length - 1) {
      setStorydataIndex(storyDataIndex + 1)
      readBook.current.pageFlip().turnToPage(0)
      // setTimeout(() => {
      //   window.location.reload()
      // }, 100);
    } else {
      setStorydataIndex(storyDataIndex)
    }
  }


  useEffect(() => {
    let isMounted = true;
    if (isMounted)
      if (window.innerWidth <= 1025) {
        setRightArrowVisible(1)
      } else if (PageCount % 2 !== 0) {
        setRightArrowVisible(1)
      } else {
        setRightArrowVisible(0)
      }

    return () => { isMounted = false };
  }, [])



  const defineWordsLength = () => {
    let bookFold = readBook.current.pageFlip().getOrientation()
    bookFold == "landscape" ? NumDevided.current = 14 : NumDevided.current = 7 
    const { offsetWidth, offsetHeight } = myRef.current;
    console.log(`Width: ${offsetWidth}, Height: ${offsetHeight}`);
    let averageCharPerLine = Math.floor(offsetWidth / 10);
    let averageLinesPerPage = Math.floor(offsetHeight / 20);
     console.log("typeofnum" , typeof(bookFold))
    let resultWords =  (averageCharPerLine * averageLinesPerPage) / NumDevided.current
    wordVal.current = resultWords.toFixed() ;
    console.log("resultWords" , bookFold)

  }


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



  if (!props.imagesPreloaded) return <Loader />;
  return (
    <div className="container-read">
      <Header />
      <div className="middle middle_readstory readstorybookwbs">
        <div className="B2 C readstorybook_secone_div">
          <div className="C1 topic">
            {/* <PostDetails
              listStoryId={params.storyid}
              // data={storyDetails}
              // getStoryData={getStoryData}
            /> */}
          </div>
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
                        onClick={() => { handleReport() }}

                      >
                        <a
                          // routerlink="/story/read-story"
                          className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                        >
                          <img className="icon iconbook emailIcon" src={emailImg} />
                          <span className="sLReport"><Translate>DENOUNCE</Translate></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* share img */}
                <div className="help-icon shareIcons emailDiv position-absolute bottom-0 start-0">
                  <div className="likeCount1">
                    <div className="shareStroyIcon">
                      <div
                        className=""

                      >
                        <a

                          className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                          onClick={() => { setEmailModal(true) }}
                          target="_blank"
                        >
                          <img className="icon iconbook shareIcon" src={shareImg} />
                          <span className="sLShare"><Translate>Share</Translate></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {
                  (storyDataIndex >= 1) ? (<img
                    src={PrevButton}
                    onClick={() => { decrementParamID() }}
                    height="40px" className="position-absolute top-0 start-50 translate-middle-x top_preve_story" alt=""
                  />) : null
                }



                {
                  PageCount <= 0 ? null :
                    <img
                      src={leftArrow}
                      onClick={() => readBook.current.pageFlip().flipPrev()}
                      height="40px" className="position-absolute bottom-0 start-0 translate-middle left_prev_btns" alt=""
                    />
                }


                {
                  spinner ? (
                    <div>
                      {/* <LazyLoad height={762}>
                        <img className="lazy_loader position-absolute top-50 start-50 translate-middle" src={LoaderImageNew} alt="" width="84px" />
                      </LazyLoad> */}
                    </div>
                  ) :
                    (
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
                      >



                        <div
                          className="manualpage-rsb page-cover-rsb overflow-box"
                          data-density="hard"
                        >
                          <div className="page-content-rsb">
                            <div className="title-top">

                              <div className="postdetails pus-titles" >
                                <div className="storydetails">
                                  <div>
                                    <h5 className="postcount">{postIconDetails?.topic_name}</h5> </div>
                                </div>

                                <div id="bypara" className="by-title">
                                  <span>By <br></br>
                                    <b>{postIconDetails?.publisher_name}</b>
                                  </span>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>



                        {[...Array(lastPage).keys()].map((item, index) => {
                          return (

                            <div
                              style={{ display: parsePara.slice(0 + (index * wordVal.current), wordVal.current * (index + 1)).join(' ').length === 0 || index === lastPage ? 'none' : 'block' }}
                              className="manualpage-rsb page-cover-rsb overflow-box"
                              key={index}
                              data-density="hard"
                              id={`page-count` + index}
                            >
                              <div className="page-content-rsb">
                                <div className="title-top">
                                  <div className="page page-cover page-borders" data-density="hard">
                                    <div className="page-content page_text">
                                      <p>
                                        {parsePara.slice(0 + (index * wordVal.current), wordVal.current * (index + 1)).join(' ').length === 0 ? 'The End' : parsePara.slice(0 + (index * wordVal.current), wordVal.current * (index + 1)).join(' ')}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>


                          )
                        })}

                        <PageCover className="book_end_page" style={{ visibility: "hidden" }}>
                          <h3 className="the_end_cover"> End </h3>
                        </PageCover>
                      </HTMLFlipBook>
                    )
                }

                {
                  (storyDataIndex < wholeStoryData?.length - 1) ? (<img
                    src={NextButton}
                    onClick={() => { incrementParamID() }}
                    height="40px" className="position-absolute bottom-0 start-50 translate-middle-x" alt=""
                  />) : null
                }

                {
                  Math.ceil(parsePara?.length / wordVal.current) < PageCount ? null :
                    <img
                      src={rightArrow}
                      onClick={() => readBook.current.pageFlip().flipNext()}
                      height="40px" className="position-absolute bottom-0 end-0 translate-middle right_arrow_new" alt=""
                    />
                }


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
            <div className="help-icon">
            </div>
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
                          onChange={() => { setCheckedValue(!checkedValue) }}
                        />
                        <span className="check">
                          <Translate>Complaint</Translate>{" "}
                        </span>
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
                      <input type="email" placeholder="Enter Email Address"></input>
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
                    setEmailModal(false);

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