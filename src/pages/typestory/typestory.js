import React, { useEffect, useState, useRef } from "react";
import "./typestory.css";
import Microphone from "../../assets/images/microphone-icon.png";
import StopIcon from "../../assets/images/stop-icon.svg";
import ArrowLeft from "../../assets/images/arrow-left-icon.png";
import SubmitButton from "../../assets/images/submit-button-s-icon.svg";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Popup from "../components/modal/popup";
import axios from "axios";
import { ApiUrl } from "../../config/config";
import { useForm } from "react-hook-form";
// import { useSpeechRecognition } from "react-speech-kit";
// import { useSpeechSynthesis } from 'react-speech-kit';
import { Loader } from "../components/loader";
import Header from "../components/header";
import HTMLFlipBook from 'react-pageflip';
import Modal from 'react-modal';
import { useCallback } from 'react';
import ImageUploading from 'react-images-uploading';
import cancleImg from "../../assets/images/cancel.png"
import leftArrow from "../../assets/images/icons/left-arrow.png";
import rightArrow from "../../assets/images/icons/right-arrow.png";
import "./NewType.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Translator, Translate } from 'react-auto-translate';
import { withNamespaces, NamespacesConsumer, Trans, useTranslation } from 'react-i18next';
import { PageFlip } from 'page-flip';



const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

// const Page = React.forwardRef((props, ref) => {
//   return (
//     <div className="page" ref={ref}>
//       <div className="page-content">
//         <h2 className="page-header">Page header - {props.number}</h2>
//         <div className="page-image"></div>
//         <div className="page-text">{props.children}</div>
//         <div className="page-footer">{props.number + 1}</div>
//       </div>
//     </div>
//   );
// });





const TypeStory = (props) => {
  let flipBook = useRef();
  const myRef = useRef(null);
  const { t, i18n } = useTranslation();
  let subtitle;
  // Modal.setAppElement('#root');
  // const { listen } = useSpeechSynthesis();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showSociaModal, setShowSocialModal] = useState(false);
  const [wordsVal, setWordsVal] = useState(50);
  const [rightArrowVisible, setRightArrowVisible] = useState(0);
  const [socialUrl, setSocialUrl] = useState(false);
  const [AllLaguages, setAllLaguages] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [userAgreementData, setUserAgreementData] = useState();
  const [disclaimer, setDisclaimer] = useState();
  const [attentionData, setAttentionData] = useState();
  const [topicData, setTopicData] = useState("");
  const [topicNameData, setTopicNameData] = useState("");
  const [ThanksTypeModal1, setThanksTypeModal1] = useState(false);
  const [cameraImgPreview, setCameraImgPreview] = useState(false);
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [storySubmitData, setStorySubmitData] = useState({});
  const [toggleAudio, setToggleAudio] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [isRunning, setRunning] = useState(true);
  const [toolbarToggle, setToolbarToggle] = useState(true);
  const [imagePopUp, setImagePopUp] = useState(false);
  const [picture, setPicture] = useState([]);
  const [PageCount, setPageCount] = useState(0);
  const [file, setFile] = useState();
  const [imageFile, setImageFile] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [textArea, setTextarea] = useState("");
  const [newtextArea, setNewTextarea] = useState("");
  const [finalText, setFinalText] = useState([]);
  const [IsThankOpen, setIsThankOpen] = useState(false);
  const [heading, setHeading] = useState("");
  const [head, setHead] = useState(false);
  const [storyBookData, setStoryBookData] = useState(JSON.parse(localStorage.getItem("writestory")));
  const prefered_lang = localStorage.getItem("prefered_language")
  const [currLanguage, setCurrLanguage] = useState(prefered_lang);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const storyBook = JSON.parse(localStorage.getItem("writestory"));

  const MickSupportedLanguage = ["en", "en-US", "zh-CN", "es-ES", "ar-SA", "ru-RU", "bn-BD", "pt-PT", "id-ID", "fr-FR", "af", "eu", "ca", "ar-SA", "cs", "nl-NL", "fi", "gl", "de-DE", "el-GR", "he", "hu", "is", "it-IT", "ja", "ko", "la", "no-NO", "pl", "ro-RO", "sr-SP", "sk", "sv-SE", "tr", "zu"
  ]
  
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

  let currentLanguageSetting = localStorage.getItem("prefered_language")
    ? localStorage.getItem("prefered_language")
    : "en";
  const [currentLanguage, setCurrentLanguage] = useState(
    currentLanguageSetting
  );


  useEffect(() => {
    console.log("prefered_lang currLanguage", currLanguage);
  }, [currLanguage])

  const [images, setImages] = React.useState([]);
  const [uploadImages, setUploadImages] = React.useState("");
  const maxNumber = 69;
  const wordVal = useRef(70)
  const NumDevided = useRef(7)
  const [lastPage, setLastPage] = useState(100);
  // var htmlParentElement = document.getElementsByClassName("modalBookmodal")
  // var settings = { 
  //           width:550,
  //           height:280,
  //           size:"stretch",
  //           minWidth:315,
  //           maxWidth:1000,
  //           minHeight:400,
  //           maxHeight:1533,
  //           // maxShadowOpacity:0.5,
  //           // showCover:false,
  //           // mobileScrollSupport:false,
  //           // drawShadow:false,
  //           // useMouseEvents:false,
  //           // autoSize:true,
  // }
  // const pageFlipLoad = new PageFlip(htmlParentElement, settings);
  // const Loadingimages = [
  //   {
  //   source: rightArrow,
  //   },
  //   {
  //   source: leftArrow,
  //   },
  //   {
  //   source: rightArrow,
  //   },
  //   ];

  const updateDimensions = () => {
    // setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
    defineWordsLength()
  };

  useEffect(() => {
    if (modalIsOpen) {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
   
  }, [modalIsOpen]);

  const onChange = (imageList, addUpdateIndex) => {
    setPicture();
    setImages(imageList);
    // setImages([...imageList , ...picture]);
  };

  useEffect(() => {
    setStoryBookData(storyBook.data)
    setTimeout(() => {
      setRunning(false);
    }, 3000);
    // getAllData();
    getPageData();
  }, []);


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => { SpeechRecognition.startListening({ continuous: true, language: prefered_lang }); }
  const stopListening = () => {
    SpeechRecognition.abortListening()
    console.log("newtextArea", newtextArea);
    resetTranscript()
    if (newtextArea)
      setTextarea(textArea + newtextArea + " ");
    setNewTextarea()
  }
  useEffect(() => {
    console.log("transcript", transcript);
    setNewTextarea(transcript)
  }, [transcript])


  const handleTextArea = (e) => {
    setTextarea(e.target.value)
  }

  useEffect(() => {
    console.log("browserSupportsSpeechRecognition" , SpeechRecognition.browserSupportsSpeechRecognition());
  }, [])
  
  useEffect(() => {
    Modal.setAppElement('body');
  }, [])

  const onRemoveCameraImg = (i) => {
    setPicture();
    setCameraImgPreview(false)
    // setHead(false)
    setShowCamera(true)
  }
  const onRemoveCameraImgUpload = (i) => {
    // let pic = [...picture]
    // pic.splice(i,1)
    // setPicture(pic);
    setPicture();
    setCameraImgPreview(false)
    setHead(false)
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) setUploadImages(images[0]?.data_url?.data)
    return () => { isMounted = false };
  }, [images])


  // const getAllData = () => {
  //   axios
  //     .all([
  //       axios.get(`${ApiUrl}i18n_locale`),
  //       axios.get(`${ApiUrl}getTermsAndCondition`),
  //       axios.get(`${ApiUrl}getDisclaimer`),
  //       axios.get(`${ApiUrl}getAttention`),
  //     ])
  //     .then(
  //       axios.spread(
  //         (
  //           firstResponse,
  //           secondResponse,
  //           thirdResponse,
  //           attentionResponse,
  //           socialData
  //         ) => {
  //           setAllLaguages(firstResponse.data);
  //           setUserAgreementData(secondResponse.data.data);

  //           setDisclaimer(thirdResponse.data.data);
  //           setAttentionData(attentionResponse.data.data);
  //         }
  //       )
  //     )
  //     .catch((error) => console.log(error));
  // };


  const getPageData = () => {
    setTopicNameData(storyBook?.data)
  };

  const onSubmit = (data) => {
    setToolbarToggle(!toolbarToggle)
    setHeading(storyBook?.data?.TopicName)
    let bodyData = {
      topic_name: storyBook?.data?.TopicName,
      country: storyBook?.data?.Country,
      language: storyBook?.data?.Language,
      city: storyBook?.data?.City,
      place: storyBook?.data?.Place,
      // topic_details: text,
      topic_details: textArea.replace(/'/g, `/"`),
      // topic_details: textArea,
      book_images: images ? uploadImages : picture,
      subject_1: storyBook?.data?.Subject1,
      subject_2: storyBook?.data?.Subject2,
      subject_3: storyBook?.data?.Subject3,
      date: Date.now(),
      publisher_name: storyBook?.data?.PublisherName,
      title: data.title,
      locale: storyBook?.data?.language ? storyBook?.data?.language : "",
    };
    setStorySubmitData(bodyData);
    setIsOpen(true);
    setTimeout(() => {
      defineWordsLength()
    }, 2000);
    setHead(true)
  };

  const SaveImages = () => {
    setToolbarToggle(true)
    setImagePopUp(false);
  }



  const onTakePicture = (data) => {
    if (window)
      // setPicture([...picture, data]);
      setPicture([data]);
    setImages([]);
    setShowCamera(false);
    setHead(false)
    setCameraImgPreview(true)
    setHead(true)

  };



  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });



  const onStorySubmit = () => {
    axios
      .post(`${ApiUrl}addListStory`, storySubmitData)
      .then((res) => {
        axios
          .put(
            `${ApiUrl}updateListStory/${res.data.list && res.data.list.insertId
            }`,
            {
              reference_id: `HERESAYS000${res.data.list && res.data.list.insertId
                }`,
            }
          )
          .then((result) => {
            setReferrenceId(res.data.list.insertId);
            // setShowPreview(false);
            // setThanksTypeModal1(true);
            setIsOpen(false);
            setIsThankOpen(true);
          })
          .catch((errr) => {
            console.log(errr);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };



  function openThankModal() {
    setIsThankOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }



  function closeModal() {
    setIsOpen(false);
    setToolbarToggle(!toolbarToggle);
    setHead(false)
  }

  function closeThankModal() {
    setIsThankOpen(false);
  }

  function closeImagePopUp() {
    setImagePopUp(false);
    setToolbarToggle(true);
    setHead(false)
  }

  const onFlip = useCallback((e) => {
    console.log('Current page: ' + e.data);
    setPageCount(e.data);
    defineWordsLength()
  }, []);

  const handlePageIndex = (e) => {
    console.log("handlePageIndex", e);
  }




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
    let isMounted = true;
    if (isMounted)
      if (window.innerWidth <= 1025) {
        setRightArrowVisible(1)
      } else {
        setRightArrowVisible(0)
      }
    return () => { isMounted = false };
  }, [])



  const defineWordsLength = () => {
    let bookFold = flipBook.current.pageFlip().getOrientation()
    console.log("bookFold", bookFold);
    bookFold == "landscape" ? NumDevided.current = 14 : NumDevided.current = 8
    const { offsetWidth, offsetHeight } = myRef.current;
    console.log(`Width: ${offsetWidth}, Height: ${offsetHeight}`);
    let averageCharPerLine = Math.floor(offsetWidth / 10);
    let averageLinesPerPage = Math.floor(offsetHeight / 20);
    console.log("typeofnum", typeof (bookFold))
    let resultWords = (averageCharPerLine * averageLinesPerPage) / NumDevided.current
    wordVal.current = resultWords.toFixed();
    console.log("resultWords", wordVal.current)

  }

  const handleLoadBook = () => {
    defineWordsLength()
    if (textArea) {
      const StringToArray = textArea.split(' ');
      setFinalText(StringToArray)
    }
    console.log("loaded call")
  }

  

  useEffect(() => {
    const StringToArray = textArea.split(' ');
    setFinalText(StringToArray)
  }, [textArea])


  const onTopicDataChange = (e) => {
    setTopicData(e.target.value);
  };
  if (!props.imagesPreloaded) return <Loader></Loader>;

  return (
    <>
      <div className="container1" >
        <Header className="typestory_header" />

        <div className="middle story_type cameraopense">
          <div className="B2 C">
            <div className="C1 topic" style={{ width: "490px" }}>
              <div className="text-center type-head-box heading-with">
                <div
                  className={
                    errors.title
                      ? "sd-top-box-title-head err-msg"
                      : `sd-top-box-title-head ${head ? "d-none" : ""}`
                  }
                >
                  <div className="sd-top-box-title-head-in write-title-fields-top">
                    <div
                      style={{ textAlign: "center" }}
                      formcontrolname="title"
                      className={
                        errors.title
                          ? "form-control ng-dirty ng-touched is-invalid ng-invalid input-disable"
                          : "form-control ng-dirty ng-touched input-disable"
                      }
                      placeholder=""
                      value={topicNameData.TopicName}
                    >
                      <p>
                        {topicNameData.TopicName}
                      </p>
                    </div>
                  </div>

                  <div className="err-msg-label animate__animated animate__fadeInDown animate__faster ng-star-inserted">
                    <span className="ng-star-inserted"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="C2 mobilerevers">
              <div className="D1">
                <div className="E1">
                  <div className="help-icon">
                    <div className="custom-file-upload">
                      <button
                        className="btn-upload-st st-cmn-btn"
                        onClick={() => {
                          setImagePopUp(true); setToolbarToggle(false); setHead(true)
                        }}
                      >
                        <span>
                          <i className="gridicons_upload"></i>
                        </span>
                        {/* <input
                          type="file"
                          multiple=""
                          onChange={handleChange}
                          style={{ display: "none" }}
                        /> */}
                      </button>
                    </div>
                  </div>
                  <div className="help-icon">
                    <button
                      type="button"
                      className="type-camera-btn st-cmn-btn"
                      onClick={() => {
                        setShowCamera(!showCamera); setHead(true);
                      }}
                    >
                      <span>
                        <i className="gridicons_camera"></i>
                      </span>
                    </button>
                  </div>

                  {!MickSupportedLanguage.includes(prefered_lang) && SpeechRecognition.browserSupportsSpeechRecognition() == false ?
                    null
                    :
                    <div className="help-icon">
                      <button
                        type="button"
                        className="type-camera-btn st-cmn-btn"
                        onTouchStart={startListening}
                        onMouseDown={startListening}
                        onTouchEnd={stopListening}
                        onMouseUp={stopListening}
                      >
                        <span>
                          <i>
                            {" "}
                            {listening ? (
                              <img src={StopIcon} style={{ height: "32px" }} alt="img" onContextMenu="return false;" className="mick_image" />
                            ) : (
                              <img src={Microphone} style={{ height: "32px" }} alt="img" onContextMenu="return false;" className="mick_image" />
                            )}
                          </i>
                        </span>
                      </button>
                    </div>
                  }
                </div>
              </div>
              {showCamera ? (
                <div className="B2 cards camera_back">
                  <div className=" classified-align-home ">
                    <div className="add-advertisement-wrapper border-style-8 classified-align-wrapper">
                      <div
                        className="add-advertisement-ss"
                      >

                        <div className="help-icon close_icon_rightss" onClick={() => { setShowCamera(false); setHead(false) }}>
                          <Link
                            to="#"
                            className={toolbarToggle ? "st-btn-colr-2  ads-close-btn close-button-style" : "st-btn-colr-2  ads-close-btn close-button-style index_zero"}
                          >
                            <span></span>
                          </Link>
                        </div>


                        <Camera className="camerashow"
                          onTakePhoto={(data) => onTakePicture(data)}
                          // idealResolution={{ width: 600, height: 400 }}
                          isMaxResolution={false}
                          isFullscreen={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rte text_editor" >
                  <textarea
                    className="textbox-lines edit_textarea"
                    width="500px"
                    height="500px"
                    type="textarea"
                    placeholder={t('Enter Your Story Content')}
                    value={textArea + transcript}
                    onChange={handleTextArea}
                    style={{ fontSize: "14px" }}
                  />
                </div>
              )}

              <div className="D3 right_close_btn">
                <div className={`help-icon close_icon_right ${head ? "d-none" : ""}`} >
                  <a
                    href="/home"
                    // routerlink="/home"
                    className={toolbarToggle ? "st-btn-colr-2  ads-close-btn close-button-style" : "st-btn-colr-2  ads-close-btn close-button-style index_zero"}
                  >
                    <span></span>
                  </a>
                </div>

                {
                  images[0] ?
                    <div className="help-icon side_img_textbox ">
                      <div className="custom-file-upload">
                        <img src={images[0]?.data_url} alt="img" width="200px" height="200px" />
                      </div>
                    </div> : null
                }
                {
                  picture?.length ?
                    <div className="help-icon side_img_textbox ">
                      <div className="custom-file-upload">
                        <img src={picture[0]} alt="img" width="200px" height="200px" />
                      </div>
                    </div> : null
                }

                <div className={`help-icon ${head ? "d-none" : ""}`}>
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className="ads-submit-btn st-btn-colr-1 cmn-submit-button "
                  >
                    <span></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="C3 footer-bottom next_btns_arrow">
              <div className="help-icon">
                <Link
                  to="/writestory"
                  className="btn-continue btn-continue-type"
                >
                  <img className="backButton" src={ArrowLeft} alt="img" />
                </Link>
              </div>
            </div>
          </div>

          <button
            type="hidden"
            data-toggle="modal"
            data-target="#ThanksTypeModal1"
            hidden="hidden"
          ></button>
        </div>
      </div>
      <Popup
        socialUrl={socialUrl}
        showSociaModal={showSociaModal}
        setShowSocialModal={setShowSocialModal}
      />

      {/* html flipbook  modsal  */}

      <Modal
        className="modal_book_previewss modalBookmodal"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="mobalbg_typestory" ref={myRef}>
          {PageCount > 0 ? <img
            src={leftArrow}
            onClick={() => flipBook.current.pageFlip().flipPrev()}
            height="40px" className="l_arrow_types" alt=""
          /> : null
          }

          <HTMLFlipBook
            width={550}
            height={280}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={false}
            mobileScrollSupport={false}
            className="demo-book read_storybook modal-content-rsb"
            drawShadow={false}
            useMouseEvents={false}
            onFlip={onFlip}
            autoSize={true}
            ref={flipBook}
            getCurrentPageIndex={handlePageIndex}
            onInit={handleLoadBook}
          >


            <PageCover >
              <div className="postdetailss pus-titless">
                <h5 className="postcount">{storyBook?.data?.TopicName}</h5>
                <div id="bypara" className="by-title">
                  <span>{t('By')} <br></br>
                    {storyBook?.data?.PublisherName}
                  </span>
                </div>
                

                {
                  images?.length ?
                    <div className="help-icon book_preview_icon">
                      {console.log("images[0]?.data_url",images[0]?.data_url)}
                      <div className="custom-file-upload-preview_book">
                        <img src={images[0]?.data_url} alt="img" />
                      </div>
                    </div>
                    : null
                }


                {
                  picture?.length ?
                    <div className="help-icon book_preview_icon">
                      {console.log("picture[0]",picture[0])}
                      <div className="custom-file-upload-preview_book">
                        <img src={picture[0]} alt="img" />
                      </div>
                    </div>
                    : null
                }

                {/* {images?.length ? <img style={{ height: "80px", marginTop: "14px" }} src={images[0]?.data_url} alt="img" /> : null}
              {picture?.length ? <img style={{ height: "80px", marginTop: "14px" }} src={picture[0]} alt="img" /> : null} */}
              </div>
            </PageCover>

            {
              [...Array(lastPage).keys()].map((item, index) => {
                return (
                  <div className="page page-cover pagecover_book" data-density="hard" key={index}
                    style={{ display: finalText.slice(0 + (index * wordVal.current), wordVal.current * (index + 1)).join(' ').length === 0 || index === lastPage ? 'none' : 'block' }}
                    id={`page-count` + index}
                  >
                    <div className="page-content">
                      <h2> <div className="page page-cover page-borders" data-density="hard" >
                        <div className="page-content">
                          <p className="typestory_para">
                            {finalText.slice(0 + (index * wordVal.current), wordVal.current * (index + 1)).join(' ').length === 0 ? 'The End' : finalText.slice(0 + (index * wordVal.current), wordVal.current * (index + 1)).join(' ')}
                          </p>
                        </div>
                      </div></h2>
                    </div>
                  </div>
                )
              })
            }

            <PageCover >
              <div className="end_parent">
                <h3 className="the_end_cover">{t('The End')}</h3>
              </div>
            </PageCover>
          </HTMLFlipBook>

          {/* {
            Math.ceil(finalText?.length / wordVal.current) < PageCount ? null : (
              <img
                src={rightArrow}
                height="40px" className="r_arrow_types" alt="img"
                onClick={() => flipBook.current.pageFlip().flipNext()}
              />
            )
          } */}

          {
            lastPage + rightArrowVisible > PageCount ? <img
              src={rightArrow}
              height="40px" className="r_arrow_types" alt="img"
              onClick={() => flipBook.current.pageFlip().flipNext()}
            /> : null
          }

        </div>

        <div className="btn-nav back-prev-wrap bottom_close_footer help_icon_new typestoryfooter">
          <button
            onClick={() => {
              onStorySubmit();
            }}
            className="ads-submit-btn st-btn-colr-1 cmn-submit-button help_icon_submit"
          >
            <span></span>
          </button>
          <div className="help-icon help_icon_new" onClick={closeModal} >
            <Link
              to=""
              className="st-btn-colr-2 ads-close-btn close-button-style"
            >
              <span></span>
            </Link>
          </div>
        </div>

      </Modal>

      {/* html flipbook  modsal  */}


      {/* thank model  */}

      <Modal className="modal-popup-01 typestory_test_thank_modal"
        isOpen={IsThankOpen}
        onRequestClose={closeThankModal}
        contentLabel="Example Modal"
      >
        <div
          role="document"
          className="modal-dialog modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog typestory_test_thank_inner_modal"
        >
          
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="text-uppercase">
                  {t('Your post has been properly submitted')}
                </p>
                <p>{t('and is published under')}</p>
                <h3>ID:HERESAYS000{ReferrenceId} </h3>
                <p>{t('Please copy this for your reference')}</p>
                <a
                  onClick={() => {
                    setIsThankOpen(false);
                    reset();
                    navigate("/home");
                  }}
                >
                  <img src={SubmitButton} />
                </a>
              </div>
            </div>
          
        </div>

      </Modal>

      <Modal className="modal-popup-01 image_popup_top_div"
        isOpen={imagePopUp}
        onRequestClose={closeImagePopUp}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div
          role="document"
          className="modal-dialog modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog image_popup_inner_div"
        >
         
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="text-uppercase">
                  {t('UPLOAD IMAGES')}
                </p>
                <div className="App">
                  <ImageUploading
                    // multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper">
                        <button
                          style={isDragging ? { color: 'red' } : undefined}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          {t('Click or Drop here')}

                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll}>{t('Remove all images')}
                        </button>

                        <div className="upload-images">
                          {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                              <img src={image['data_url']} alt="" width="100" />
                              <div className="image-item__btn-wrapper">
                                {/* <button onClick={() => onImageUpdate(index)} className="update">Update</button> */}
                                <img className="cancle_img_popUp" onClick={() => onImageRemove(index)} src={cancleImg} alt="img" />
                              </div>
                            </div>
                          ))}

                          {
                            picture ?
                              (picture?.map((item, index) => {
                                return <div className="image-item" key={index}><img src={item} alt="" width="100" />
                                  <div className="image-item__btn-wrapper">
                                    <img className="cancle_img_popUp" onClick={() => onRemoveCameraImgUpload(index)} src={cancleImg} alt="img" />
                                  </div>
                                </div>
                              })) : null
                          }

                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </div>


                <a
                  onClick={() => {
                    SaveImages(); setHead(false);
                  }}
                >
                  <img src={SubmitButton} />
                </a>
              </div>
            </div>
        </div>

      </Modal>

      <Modal className="modal-popup-01 modalcamerpopup image_popup_top_div"
        isOpen={cameraImgPreview}
        // onRequestClose={closeCameraPreview}
        contentLabel="Example Modal"
      >
        <div
          role="document"
          className="modal-dialog cmmodals modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog camera-upload-img image_popup_inner_div"
        >
          <div className="modal-content">
            <div className="modal-body text-center">
              {(picture?.map((item, index) => {
                return <div className="image-item cameracap" key={index}>

                  <img src={item} alt="" className="img-fluid cameraimg" />
                  <div className="image-item__btn-wrapper" onClick={() => onRemoveCameraImg(index)}>
                    <img className="cancle_img_popUp" onClick={() => onRemoveCameraImg(index)} src={cancleImg} alt="img" />
                  </div>
                </div>
              }))}
              <a
                onClick={() => {
                  setCameraImgPreview(false);
                  reset();
                  setHead(false)


                }}
              >
                <img className="checkarrowsubmit" src={SubmitButton} />
              </a>
            </div>
          </div>
        </div>

      </Modal>
{/* 
      <div
        id="ThanksTypeModal1"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ThanksTypeModal"
        aria-hidden="true"
        className={ThanksTypeModal1 ? "modal fade show" : "modal fade"}
        style={ThanksTypeModal1 ? { display: "block" } : { display: "none" }}
      >
        <div
          role="document"
          className="modal-dialog modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog"
        >
          <Translator
           cacheProvider={cacheProvider}
            from='en'
            to={currentLanguage}
            googleApiKey='AIzaSyDJyDB2bnmeDG4KHOZkHnrDqhrqnUI375M'
          >
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="text-uppercase">
                  {t('Your post has been properly submitted')}
                </p>
                <p>{t('and is published under')}</p>
                <h3>ID:HERESAYS000{ReferrenceId} </h3>
                <p>{t('Please copy this for your reference')}</p>
                <a
                  onClick={() => {
                    setThanksTypeModal1(false);
                    // setTopicData("");
                    reset();
                    navigate("/story/type-story");
                  }}
                >
                  <img src={SubmitButton} />
                </a>
              </div>
            </div>
          </Translator>
        </div>
      </div> */}
    </>
  );
};

export default TypeStory;
