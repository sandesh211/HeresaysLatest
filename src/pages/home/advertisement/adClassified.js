import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ArrowLeft from "../../../assets/images/arrow-left-icon.png";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./adClassified.css";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/modal/popup";
import axios from "axios";
import { ApiUrl } from "../../../config/config";
// import { useSpeechRecognition } from "react-speech-kit";
import AdPreviewModal from "./adPreviewModal";
import Banner from "../../components/banner";
import { Loader } from "../../components/loader";
import Header from "../../components/header";
const AdClassified = (props) => {
  const editorRef = useRef(null);
  const [ShowLanguageModal, setShowLanguageModal] = useState(false);
  const [Termsofuse2Modal, setTermsofuse2Modal] = useState(false);
  const [checkBudgetModal, setCheckBudgetModal] = useState(false);
  const [FinanceModal, setFinanceModal] = useState(false);
  const [OpportunityModal, setOpportunityModal] = useState(false);
  const [ContactModal, setContactModal] = useState(false);
  const [InstructionModal, setInstructionModal] = useState(false);
  const [showSociaModal, setShowSocialModal] = useState(false);
  const [NewsModal, setNewsModal] = useState(false);
  const [topicData, setTopicData] = useState();
  const [userAgreementData, setUserAgreementData] = useState();
  const [picture, setPicture] = useState("");
  const [disclaimer, setDisclaimer] = useState();
  const [attentionData, setAttentionData] = useState();
  const [AllLaguages, setAllLaguages] = useState(false);
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const [socialUrl, setSocialUrl] = useState(false);
  const [modalShowTerm, setModalShowTerm] = useState(false);
  const [ShowAttentionModal, setShowAttentionModal] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);
  const [AdPreviewModalShow, setAdPreviewModalShow] = useState(false);
  const [isRunning, setRunning] = useState(true);
  const [text, setText] = useState('');
  const editor = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setRunning(false);
    }, 3000);
    getAllData();
  }, []);
  // const { listen, listening, stop } = useSpeechRecognition({
  //   onResult: (result) => {
  //     setTopicData(topicData + result);
  //   },
  // });

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
    localStorage.setItem("prefered_language", data);
    getAllData();
    setShowLanguageModal(false);
    setThanksTypeModalForGraph(`Your language has been changed to ${data}`);
  };

  const onTopicDataChange = (e) => {
    setTopicData(e.target.value);
  };
  const handleUpdate = (value, editor) => {
    const length = editor.getContent({ format: "text" }).length;
    setText(value);
  };

  function postInitWork() {
    editorRef.current.getBody().style.backgroundColor = "red";
  }
  const onTakePicture = (data) => {
    if (window)
    setPicture(data);
    setShowCamera(false);
  };

  if (!props.imagesPreloaded) return <Loader></Loader>;
  
  return (
    <>
      <div className="container1">
        <Header />
        {AdPreviewModalShow && (
          <AdPreviewModal
            text={text}
            name={"addClassified"}
            setAdPreviewModalShow={setAdPreviewModalShow}
          ></AdPreviewModal>
        )}
        <div className="middle">
          <div className="B1"></div>
          {showCamera ? (
            <div className="B2 cards">
              <div className=" classified-align-home">
                <div className="add-advertisement-wrapper border-style-8 classified-align-wrapper">
                  <div
                    className="add-advertisement-content adspage classified-align-content"
                    style={{ padding: "0" }}
                  >
                    <Camera 
                      onTakePhoto={(data) => onTakePicture(data)}
                    ></Camera>
                  </div>
                </div>
              </div>
            </div>
          ) : showImagePreview ? (
            <div className="B2 cards">
              <div className=" classified-align-home">
                <div className="add-advertisement-wrapper border-style-8 classified-align-wrapper">
                  <div
                    className="add-advertisement-content adspage classified-align-content"
                    style={{ padding: "0" }}
                  >
                    <img className="img-fluid" src={picture} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="B2 cards">
              <div className=" classified-align-home">
                <div className="add-advertisement-wrapper border-style-8 classified-align-wrapper">
                  <div className="add-advertisement-content adspage classified-align-content">
                    <input
                      id="file-picker"
                      type="file"
                      name="my-file"
                      style={{ display: "none" }}
                      onChange=""
                    />
                    <div className="rte">
                      <Editor
                        ref={editor}
                        id="file-picker"
                        className="typestory-paper-bg-writez"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        onEditorChange={handleUpdate}
                        value={text}
                        init={{
                          skin_url: "./CUSTOM/CUSTOM",
                          height: 390,
                          max: 700,
                          selector: "textarea#file-picker",

                          resize: false,
                          resize_img_proportional: false,
                          menubar: false,
                          automatic_uploads: true,
                          file_picker_types: "image",
                          image_title: true,
                          toolbar_mode: "wrap",
                          paste_data_images: true,
                          statusbar: false,
                          table_use_colgroups: false,
                          oninit: "postInitWork",
                          body_class: "mceBlackBody",
                          plugins: [
                            "image",
                            "casechange",
                            "advlist  autolink lists link image charmap print preview",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                            "tinydrive",
                            "anchor",
                            "emoticons",
                            "insertdatetime",
                            "lists",
                            "media",
                            "searchreplace",
                            "table",
                            "wordcount",
                          ],
                          setup: function (editor) {
                            editor.on("init", function () {
                              
                              document.getElementById('file-picker_ifr').style.backgroundImage=''
                              document.getElementById('file-picker_ifr').style.background='none'
                              document.getElementById('file-picker_ifr').style.backgroundColor='white'
                              document.getElementsByClassName('tox-edit-area')[0].style.marginTop='0'
                             
                              if (picture) {
                                window.tinyMCE.activeEditor.setContent(
                                  text + `<img src=\"${picture} \"/>`
                                );
                              }
                            });
                          },
                          file_picker_callback: (cb, value, meta) => {
                            let input = document.createElement("input");
                            input.setAttribute("type", "file");
                            input.setAttribute("accept", "image/*");
                            input.setAttribute("id", "fileInput");
                            input.addEventListener("change", (e) => {
                              const file = e.target.files[0];

                              const reader = new FileReader();
                              reader.addEventListener("load", () => {
                                const id = "blobid" + new Date().getTime();
                                const blobCache =
                                  editorRef.current.editorUpload.blobCache;
                                const base64 = reader.result.split(",")[1];
                                const blobInfo = blobCache.create(
                                  id,
                                  file,
                                  base64
                                );
                                blobCache.add(blobInfo);
                                cb(blobInfo.blobUri(), { title: file.name });
                              });
                              reader.readAsDataURL(file);
                            });
                            input.click();
                          },

                          toolbar:
                            "fontfamily fontsize   forecolor backcolor  bold italic  alignleft aligncenter alignright alignjustify  formatselect  link image quicktable   table ",

                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
 }}
                      ></Editor>
                    </div>
                    <div className="type-btngroup classified-align-button">
                      <button
                        type="submit"
                        data-toggle="modal"
                        data-target="#ThanksTypeModal"
                        className="ads-submit-btn st-btn-colr-1 cmn-submit-button"
                        onClick={() => {
                          setAdPreviewModalShow(true);
                        }}
                      >
                        <span></span>
                      </button>

                      <button
                        type="button"
                        className="ads-camera-btn ads-cmn-btn"
                        onClick={() => {
                          setShowCamera(!showCamera);
                        }}
                      >
                        <span>
                          <i className="gridicons_camera"></i>
                        </span>
                      </button>

                      <a
                        href="/home"
                        routerlink="/home"
                        className="st-btn-colr-2 ads-close-btn close-button-style"
                      >
                        <span></span>
                      </a>
                    </div>
                  </div>
                   </div>
                <div className="continue-btn-group ads-add-btn-back-arrw">
                  <a
                    routerlink="/advertisement"
                    className="btn-continue arrow-bounce-right"
                    href="/advertisement"
                  >
                    <img src={ArrowLeft} />
                  </a>
                  <button
                    type="hidden"
                    data-toggle="modal"
                    data-target="#ThanksTypeModal"
                    hidden="hidden"
                  ></button>
                  <button
                    type="hidden"
                    data-toggle="modal"
                    data-target="#WarningModalForLink2"
                    hidden="hidden"
                  ></button>
                </div>
              </div>
            </div>
          )}

          {/* SocialLoginModal_End */}

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

          <div className="B3">
       
          </div>
        </div>
        <Banner />
      </div>
      <Popup
        socialUrl={socialUrl}
        showSociaModal={showSociaModal}
        setShowSocialModal={setShowSocialModal}
      />
    </>
  );
};

export default AdClassified;
