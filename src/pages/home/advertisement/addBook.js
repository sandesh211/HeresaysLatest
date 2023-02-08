import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ArrowLeft from "../../../assets/images/arrow-left-icon.png";
// import RichTextEditor from "react-rte";
import "./addBook.css";

import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useNavigate } from "react-router-dom";
// import { EditorState } from "draft-js";
// import { convertToRaw } from "draft-js";
import Popup from "../../components/modal/popup";
import axios from "axios";
import { ApiUrl } from "../../../config/config";
import AdPreviewModal from "./adPreviewModal";
import Banner from "../../components/banner";
import { Loader } from "../../components/loader";
import Header from "../../components/header";
const AddBook = (props) => {
  const editorRef = useRef(null);
  // const [richTextValue, setRichTextValue] = useState(
  //   RichTextEditor.createEmptyValue()
  // );
  const [colorForDiv1, setColorForDiv1] = useState("white");
  const [colorForDiv2, setColorForDiv2] = useState("white");
  const [colorForDiv3, setColorForDiv3] = useState("white");
  const [plainText, setPlainText] = useState("");
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectDiv, setSelectDiv] = useState("div1");
  const navigate = useNavigate();
  const [showSociaModal, setShowSocialModal] = useState(false);
  const [ShowLanguageModal, setShowLanguageModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [socialUrl, setSocialUrl] = useState(false);
  const [AllLaguages, setAllLaguages] = useState(false);
  const [userAgreementData, setUserAgreementData] = useState();
  const [disclaimer, setDisclaimer] = useState();
  const [attentionData, setAttentionData] = useState();
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [BookPreviewModal, setBookPreviewModal] = useState(false);
  const [text, setText] = useState('');
  const [picture, setPicture] = useState("");
  const [isRunning, setRunning] = useState(true);

  const onDivSelected = (data) => {
    setSelectDiv(data);
  };
  const onDivColorChange = (data) => {
    if (selectDiv == "div1") {
      setColorForDiv1(data);
    }
    if (selectDiv == "div2") {
      setColorForDiv2(data);
    }
    if (selectDiv == "div3") {
      setColorForDiv3(data);
    }
  };

  // const onEditorStateChange = (editorState) => {
  //   setEditorState(editorState);

  //   const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  //   const value = blocks
  //     .map((block) => (!block.text.trim() && "\n") || block.text)
  //     .join("\n");
  //   setPlainText(value);
  // };

  useEffect(() => {
    setTimeout(() => {
      setRunning(false);
    }, 3000);
    getAllData();
  }, []);

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
  const handleUpdate = (value, editor) => {
    const length = editor.getContent({ format: "text" }).length;
    setText(value);
  };
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
      {BookPreviewModal&& <AdPreviewModal text={text} name={'addBook'} setAdPreviewModalShow={setBookPreviewModal}></AdPreviewModal>}
      <div className="middle">
        <div className="B1"></div>
        {showCamera?  <div className="B2 cards">
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
            </div>:
        <div className="B2 cards">
          <div className=" classified-align-home">
            <div className="add-advertisement-wrapper border-style-8  classified-align-wrapper">
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
                          id="file-picker"
                          onInit={(evt, editor) => editorRef.current = editor}
                          onEditorChange={handleUpdate}
                          value={text}
                          init={{
                            height:390 ,
                            max:700,
                            selector: 'textarea#file-picker',
                            resize: false,
                            resize_img_proportional: false,
                            menubar: false,
                            automatic_uploads: true,
                            file_picker_types: 'image',
                            image_title: true,
                            toolbar_mode: 'wrap',
                            statusbar: false,
                            table_use_colgroups: false,
                            plugins: [
                              'image',
                              'casechange',
                              'advlist  autolink lists link image charmap print preview',
                              'searchreplace visualblocks code fullscreen',
                              'insertdatetime media table paste code help wordcount',
                              'tinydrive',
                              'anchor',
                              'emoticons',
                              'insertdatetime',
                              'lists',
                              'media',
                              'searchreplace',
                              'table',
                              'wordcount'

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
                              let input = document.createElement('input');
                              input.setAttribute('type', 'file');
                              input.setAttribute('accept', 'image/*');
                              input.setAttribute('id', 'fileInput');
                              input.addEventListener('change', (e) => {
                                const file = e.target.files[0];

                                const reader = new FileReader();
                                reader.addEventListener('load', () => {
                                  const id = 'blobid' + (new Date()).getTime();
                                  const blobCache = editorRef.current.editorUpload.blobCache;
                                  const base64 = reader.result.split(',')[1];
                                  const blobInfo = blobCache.create(id, file, base64);
                                  blobCache.add(blobInfo);
                                  cb(blobInfo.blobUri(), { title: file.name });
                                });
                                reader.readAsDataURL(file);
                              });
                               input.click();

                            },

                            toolbar: 'fontfamily fontsize   forecolor backcolor  bold italic  alignleft aligncenter alignright alignjustify  formatselect  link image quicktable   table ',
                             
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

                          }}

                        >
                        </Editor>
                </div>
                <div className="type-btngroup classified-align-button">
                  <button
                    type="submit"
                    data-toggle="modal"
                    data-target="#ThanksTypeModal"
                    className="ads-submit-btn st-btn-colr-1 cmn-submit-button"
                    onClick={() => {
                      setBookPreviewModal(true);
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
                    <img src={ArrowLeft}/>
                  </a>
                  </div>
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
        </div>}
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

export default AddBook;
