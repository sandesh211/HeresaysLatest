import React, { useEffect, useState, useRef } from "react";
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
import NextButton from "../../assets/images/next-button-icon.svg";
import PrevButton from "../../assets/images/prev-button-icon.svg";
import bookIcon from "../../assets/images/book-icon.svg";
import Zoom from "react-reveal/Zoom";
import { Card, CardGroup } from "react-bootstrap";
import HTMLFlipBook from "react-pageflip";
// import PageCover from "react-pageflip";
import "./readstorybook.css";
import { Fade, Rotate } from "react-reveal";
import Settings from "../home/settings/setting";
import AdsModal from "../home/ads/ads";
import { Link, useLocation, useParams } from "react-router-dom";
import { changeLanguage } from "i18next";
import Popup from "../components/modal/popup";
import SocialIcons from "../components/modal/socialIcons";
import axios from "axios";
import { ApiUrl } from "../../config/config";
import LikeIcon from "../components/modal/likeicons";
import LikeIconRight from "../components/modal/likeiconsRight";
import PostDetails from "../components/modal/postdetails";
import AllModal from "../../constants/allmodal";
import ReactHtmlParser from "react-html-parser";
import { useNavigate } from "react-router-dom";
import Banner from "../components/banner";
import { Loader } from "../components/loader";
import Header from "../components/header";
import emailImg from "../../assets/images/email2.png";
import searchImg from "../../assets/images/searchImg.png";
import shareImg from "../../assets/images/shareImg.png";
import { Translator, Translate } from "react-auto-translate";
import { stubFalse } from "lodash";
// import { useEffect } from "react";
// import { useLocation } from 'react-router-dom';

const Page = React.forwardRef((props, ref, data) => {

  console.log("props", props);
  // console.log("location" , location);


  return (
    <div className="page-rsb" ref={ref}>
      <div className="pagedatachild-rsb">
        {/* {props.newAllStoryDetails &&
          props.newAllStoryDetails.map((x) => {
            return <p>{x}</p>;
          })} */}
        {/* { ReactHtmlParser(props.data)} */}
        <p>{props.children}</p>
      </div>
      {window.innerWidth < 576 ? (
        <div>
          {" "}
          {/* <p style={{ position: "absolute", bottom: "0" ,left:"0"}}>
          Page number: {props.number}
        </p> */}
          <img
            src={PrevButton}
            height="40px"
            style={{ position: "absolute", bottom: "5px", left: "0px" }}
          />
          <img
            src={NextButton}
            height="40px"
            style={{ position: "absolute", bottom: "5px", right: "0px" }}
          />
        </div>
      ) : props.number % 2 == 0 ? (
        <div>
          {" "}
          {/* <p style={{ position: "absolute", bottom: "0" ,left:"0"}}>
          Page number: {props.number}
        </p> */}
          <img
            src={PrevButton}
            height="40px"
            style={{ position: "absolute", bottom: "6px", left: "0px" }}
          />
        </div>
      ) : (
        <div>
          {" "}
          {/* <p style={{ position: "absolute", bottom: "0" ,right:"0"}}>
          Page number: {props.number}
        </p> */}
          <img
            src={NextButton}
            height="40px"
            style={{ position: "absolute", bottom: "6px", right: "0px" }}
          />
        </div>
      )}
    </div>
  );
});
const PageCover = React.forwardRef((props, ref) => {
  return (
    <div
      className="manualpage-rsb page-cover-rsb"
      ref={ref}
      data-density="hard"
    >
      <div className="page-content-rsb">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});



const ReadStoryBook2 = (props) => {
  let readBook = useRef();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [ShowAdsModal, setShowAdsModal] = useState(false);
  const [storyDetails, setStoryDetails] = useState();
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
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [socialUrl, setSocialUrl] = useState(false);
  const [modalShowTerm, setModalShowTerm] = useState(false);
  const [ShowAttentionModal, setShowAttentionModal] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);
  const [addReadStoryData, setAddReadStoryData] = useState();
  const [newAllStoryDetails, setNewAllStoryDetails] = useState();
  const [isRunning, setRunning] = useState(true);
  const [content, setContent] = useState([]);
  const location = useLocation();
  // let id = 1;
  const params = useParams();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [postIconDetails, setPostIconDetails] = useState();
  const [publisherName, setPublisherName] = useState();
  const [authorList, setAuthorList] = useState();
  const [topicList, setTopicList] = useState();
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(()=>{
    // let location = useLocation();
    console.log("location" , location);
    },[])

  useEffect(() => {
    setTimeout(() => {
      setRunning(false);
    }, 3000);
    getStoryData();
    console.log(params);
    getAllData();
    postCount()
    getAddBookData();
    // postDetailData();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const getStoryDetailsData = () => { };
  console.log("Height", height);
  console.log("Width", width);
  let bookheight = 950;
  if (height > 1400) {
    bookheight = 733;
  }
  // let bookcontent = {addReadStoryData &&
  //   addReadStoryData.filter(
  //     (x) => x.attributes.id == params.storyid
  //   )[0].attributes.topic_details};
  // if (bookheight>733){
  //   bookcontent.split(" ")
  // }
  const getAllData = () => {
    axios
      .all([
        axios.get(`${ApiUrl}i18n/locales`),
        axios.get(`${ApiUrl}getTermsAndCondition`),
        axios.get(`${ApiUrl}getDisclaimer`),
        axios.get(`${ApiUrl}getAttention`),
      ])
      .then(
        axios.spread(
          (
            firstResponse,
            secondResponse,
            thirdResponse,
            attentionResponse,
            socialData
          ) => {
            console.log(
              firstResponse.data,
              secondResponse.data,
              thirdResponse.data
            );
            setAllLaguages(firstResponse.data.data);
            setUserAgreementData(secondResponse.data.data);
            setDisclaimer(thirdResponse.data.data);
            setAttentionData(attentionResponse.data.data);
          }
        )
      )
      .catch((error) => console.log(error));
  };
  const onLanguageChange = (data) => {
    console.log(data);
    localStorage.setItem("prefered_language", data);
    getAllData();
    setShowLanguageModal(false);
    setThanksTypeModalForGraph(`Your language has been changed to ${data}`);
  };
  const getStoryData = () => {
    axios.get(`${ApiUrl}getBook`).then((result) => {
      console.log("book data", result.data.data);
      setStoryDetails(
        result.data.data.filter((x) => x.attributes.published_at != null)
      );
    });
  };
  function split(str, maxWidth) {
    const newLineStr = "\n";
    var done = false;
    let res = [];
    do {
      let found = false;
      // Inserts new line at first whitespace of the line
      for (let i = maxWidth - 1; i >= 0; i--) {
        if (testWhite(str.charAt(i))) {
          res = res.push([str.slice(0, i), newLineStr].join(""));
          str = str.slice(i + 1);
          found = true;
          break;
        }
      }
      // Inserts new line at maxWidth position, the word is too long to wrap
      if (!found) {
        res += [str.slice(0, maxWidth), newLineStr].join("");
        str = str.slice(maxWidth);
      }
      if (str.length < maxWidth) done = true;
    } while (!done);
    return res.push(str);
  }
  function testWhite(x) {
    const white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
  }
  function textToLines(words, maxWidth, maxLines) {
    var lines = [];
    while (words.length > 0 && lines.length <= maxLines) {
      var line = getOneLineOfText(words, maxWidth);
      words = words.slice(0, line.index + 1);
      lines.push(line);
      // wordCount+=line.index+1;
    }
    console.log("lines", lines);
    return lines;
  }
  function getOneLineOfText(words, maxWidth) {
    var line = "";
    var space = "";
    //     var c = document.getElementById("bookDisplay");
    // var ctx = c.getContext("2d");
    for (var i = 0; i < words.length; i++) {
      var testWidth = 100; //ctx.measureText(line+" "+words[i]).width;
      if (testWidth > maxWidth) {
        return { index: i - 1, text: line };
      }
      line += space + words[i];
      space = " ";
    }
    return { index: words.length - 1, text: line };
  }
  function format(str, perChunk) {
    // var target = [];
    // var  arr =  srcString.split(" ");
    // var c = 0;
    // var MAX = Math.ceil(srcString.length / lines);
    // for (var i = 0, len = arr.length; i < len; i++) {
    //    var cur = arr[i];
    //    if(c + cur.length > MAX) {
    //       target .push (cur);
    //    c = cur.length;
    //    }
    //    else {
    //      if(target.length > 0)
    //        target += " ";
    //      target .push(cur);
    //      c += cur.length;
    //    }
    //  }
    // return target;
    let splitArray = str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    let resultArray = [];
    //  splitArray.forEach((item, index)=>{
    //   // if (!resultArray[chunkIndex]) {
    //   //         resultArray[chunkIndex] = []; // start a new chunk
    //   //       }
    //   //     let   itemString = "";
    //   //    for(let i = chunkIndex; i<index ; i++  ){
    //   //     itemString += splitArray[index];
    //   //    }
    //         resultArray[chunkIndex].push(itemString);
    //  })
    let itemString = "";
    console.log("splitArray", splitArray);
    splitArray.forEach((item, parentIndex) => {
      console.log("itemString", item);
      console.log("index", parentIndex);
      if (parentIndex > 0 && parentIndex % perChunk == 0) {
        resultArray.push(itemString);
        itemString = "";
        resultArray.push(itemString);
      } else {
        itemString = itemString + item;
        // resultArray.push(itemString)
      }
    });
    if (splitArray.length == 1 || splitArray.length < perChunk) {
      resultArray.push(itemString);
      resultArray.push("");
    }
    return resultArray;
    // let result= str.match(new RegExp('.{1,' + size + '}', 'g'));
    // return result;
  }
  const postCount = () => {
    axios.get(`${ApiUrl}getTopicPostCount`).then((result) => {
      console.log("postcount", result.data.filter(x => x.topic_name == result.data[0].topic_name));
      // postDetails(
      //   result.data.data.filter((x) => x.topic_name)
      // );
    });
  };
  const getAddBookData = async () => {
    let result = await axios.get(`${ApiUrl}getListStory`);
    //.then(async (result) => {
    console.log("addbook", result.data.data[0].attributes.topic_details);
    console.log("book title", result.data.data[0].attributes.title);
    setAddReadStoryData(result.data.data);
    let requiredData = result.data.data.filter(
      (x) => x.attributes.id == params.storyid
    )[0].attributes.topic_details;
    console.log("requireddata", requiredData);
    let perChunk = 6;
    if (height <= 714) {
      perChunk = 5;
    }
    if (height <= 601) {
      perChunk = 4;
    }
    let bookdata = format(requiredData, perChunk);
    console.log("bookdata", bookdata);
    setTimeout(() => {
      setContent(bookdata);
    }, 500);

    // let postCount= await axios.get(`${ApiUrl}getTopicPostCount`)
    // setTopicList(postCount.data.filter(x=>x.topic_name==result.data.list[0].topic_name))
    // console.log("postcount",topicList)





    // .then((result3)=>{
    //   setTopicList(result3.data.filter(x=>x.topic_name==result.data.list[0].topic_name))
    //   console.log("Topic",result3.data.filter(x=>x.topic_name==result.data.list[0].topic_name))
    // })
    // let AllstoryDetails =
    //   result.data.data &&
    //   result.data.data.filter((x) => x.attributes.id == params.storyid)[0]
    //     .attributes.topic_details;
    // setNewAllStoryDetails(
    //   AllstoryDetails.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")
    // );
    // const resultArrayStory = AllstoryDetails.replace(
    //   /([.?!])\s*(?=[A-Z])/g,
    //   "$1|"
    // )
    //   .split("|")
    //   .reduce((resultArray, item, index) => {
    //     const chunkIndex = Math.floor(index / perChunk);
    //     if (!resultArray[chunkIndex]) {
    //       resultArray[chunkIndex] = []; // start a new chunk
    //     }
    //     resultArray[chunkIndex].push(item);
    //     return resultArray;
    //   }, []);
    // console.log("AllstoryDetails", resultArrayStory);
    // // let mergedArray =  [].concat.apply([], resultArrayStory);
    // // console.log("mergedArray",mergedArray)
    // // });
  };
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/Home");
  let likeData = addReadStoryData;
  console.log("likeicon", likeData);
  console.log(
    "listtttt",
    storyDetails &&
    storyDetails[Math.floor(Math.random() * storyDetails.length)] &&
    storyDetails[Math.floor(Math.random() * storyDetails.length)]
      .attributes &&
    storyDetails[Math.floor(Math.random() * storyDetails.length)].attributes
      .textfield
  );
  const renderTopic = (text) => {
    return (
      <Page number="1" data={content} className="bookAd-rsb">
        <h5>
          {addReadStoryData &&
            addReadStoryData.filter((x) => x.attributes.id == params.storyid)[0]
              .attributes.subject_1}
        </h5>
        <h5>
          {addReadStoryData &&
            addReadStoryData.filter((x) => x.attributes.id == params.storyid)[0]
              .attributes.subject_2}
        </h5>
        <h5>
          {addReadStoryData &&
            addReadStoryData.filter((x) => x.attributes.id == params.storyid)[0]
              .attributes.subject_3}
        </h5>
        <p className="storyPara-rsb">{ReactHtmlParser(text)}</p>
      </Page>
    );
  };
  const renderText = (text, index) => {
    return (
      <Page className="bookAd-rsb" number={index + 1}>
        {ReactHtmlParser(text)}
      </Page>
    );
  };
  const renderAdd = (index, content) => {
    return (
      <Page number={index + 1} data={content} className="bookAd-rsb">
        {ReactHtmlParser(
          storyDetails &&
          storyDetails[Math.floor(Math.random() * storyDetails.length)] &&
          storyDetails[Math.floor(Math.random() * storyDetails.length)]
            .attributes &&
          storyDetails[Math.floor(Math.random() * storyDetails.length)]
            .attributes.textfield
        )}
      </Page>
    );
  };
  console.log("content", content);
  if (!props.imagesPreloaded) return <Loader></Loader>;
  return (
    <div className="container-read">
      <Header />
      <div className="middle">
        <div className="B2 C">
          <div className="C1 topic">
            {/* <PostDetails
              listStoryId={params.storyid}
              data={storyDetails}
              getStoryData={getStoryData}
            /> */}
          </div>
          <div className="C2">
            <div className="D1">
              {/* <div className="E1"> */}
              <LikeIcon
                listStoryId={params.storyid}
                data={storyDetails}
                getStoryData={getStoryData}
              />
              {/* </div> */}
            </div>
            <div className="D2 read ">
              <div className="modal-content-rsb">
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
                          routerlink="/story/read-story"
                          className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                          href="/readstory"
                        >
                          <img className="icon iconbook searchIcon" src={searchImg} />
                          <span className="sLSearch"><Translate>Search</Translate></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* email img */}
                <div className="help-icon emailDiv position-absolute top-50 start-0 translate-middle">
                  <div className="likeCount1">
                    <div className="emailDivMain">
                      <div
                        className="emailDiv"
                      // disabled={isDisabled ? "true" : "false"}
                      >
                        <a
                          routerlink="/story/read-story"
                          className="welcome-item animate__animated duration-animation-choice-home animate__rotateInDownLeft home-img-div"
                          onClick={() => window.location.href = "mailto:no-reply@example.com"}
                        >
                          <img className="icon iconbook emailIcon" src={emailImg} />
                          <span className="sLReport"><Translate>Report</Translate></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* share img */}
                <div className="help-icon emailDiv shareStroyIcon position-absolute top-50 start-0 translate-middle">
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
                {content && content.length && (
                  <HTMLFlipBook
                    width={window.innerWidth < 1400 ? 600 : 1030}
                    height={
                      window.innerWidth < 420
                        ? 775
                        : window.innerWidth < 1400
                          ? 475
                          : window.innerWidth > 1600
                            ? 1100
                            : bookheight
                    }
                    size="stretch"
                    minWidth={375}
                    maxWidth={1000}
                    // minHeight={533}
                    maxHeight={800}
                    maxShadowOpacity={0.5}
                    showCover={false}
                    mobileScrollSupport={false}
                    className="demo-book"
                    drawShadow={true}
                    useMouseEvents={true}
                    ref={readBook}
                  >
                    <PageCover>
                      <h3>
                        {/* <h3>
                        {addReadStoryData &&
                          addReadStoryData.filter(
                            (x) => x.attributes.id == params.storyid
                          )[0].attributes.topic_name}
                      </h3>
                      {/* <h5>{topicList && topicList.filter((x)=>x.x.topic_name==postCount.data.list[0].topic_name)}</h5> */}
                        <h6>by</h6>
                      </h3>
                      <PostDetails
                        listStoryId={params.storyid}
                      />
                      {/* <h5>postCount={postCount()}</h5> */}
                      {/* <h6>by</h6>
                      <h5>
                      {addReadStoryData &&
                          addReadStoryData.filter(
                            (x) => x.attributes.id == params.storyid
                          )[0].attributes.publisher_name}
                      </h5>
                      </h5> */}
                      <img
                        src={PrevButton}
                        height="40px"
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          left: "0px",
                        }}
                      />
                    </PageCover>
                    {content.length &&
                      content.map((text, index) => {
                        let nextIndex = index;
                        if (index === 0) {
                          return renderTopic(text);
                        } else {
                          if (index % 2 != 0) {
                            return renderAdd(index, text);
                            //nextIndex=index-1
                          } else {
                            {
                              /* nextIndex= index-3 */
                            }
                            return renderText(text, index);
                          }
                        }
                        {
                          /* else{
                  return renderAdd(index, text)
                 } */
                        }
                      })}
                    <PageCover>
                      End
                      <img
                        src={NextButton}
                        height="40px"
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          right: "0px",
                        }}
                      />
                    </PageCover>
                  </HTMLFlipBook>
                )}
              </div>
            </div>
            <div >
              {/* <div className="E1"> */}
              <LikeIconRight
                listStoryId={params.storyid}
                data={storyDetails}
                getStoryData={getStoryData}
              />
              {/* </div> */}
            </div>

            <div className="D3"></div>
          </div>
          <div className="C3">
            <div className="help-icon">
              {/* <button
                  type="submit"
                  data-toggle="modal"
                  data-target="#ThanksTypeModal"
                  className="ads-submit-btn st-btn-colr-1 cmn-submit-button "
                >
                  <span></span>
                </button> */}
            </div>
            <div className="help-icon back-b my-2">
              <a
                onClick={() => navigate(-1)}
                className="btn-continue btn-continue-type"
              >
                <img className="backButton" src={ArrowLeft} />
              </a>
            </div>
            <div className="help-icon"></div>
            {/* <div className="C3">
              <div className="type-btngroup">
                <button
                  type="submit"
                  data-toggle="modal"
                  data-target="#ThanksTypeModal"
                  className="ads-submit-btn st-btn-colr-1 cmn-submit-button help-icon"
                >
                  <span></span>
                </button>
                <a
                  href="/writestory"
                  routerlink="/writestory"
                  className="btn-continue btn-continue-type help-icon"
                >
                  <img className="backButton" src={ArrowLeft} />
                </a>
                <a
                  href="/home"
                  routerlink="/home"
                  className="st-btn-colr-2 ads-close-btn close-button-style help-icon"
                >
                  <span></span>
                </a>
              </div>
            </div> */}
          </div>
        </div>
        <div className="footer"></div>
        {/* <Banner /> */}
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
export default ReadStoryBook2;