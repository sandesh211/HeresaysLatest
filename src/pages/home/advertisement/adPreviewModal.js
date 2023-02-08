import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { ApiUrl } from "../../../config/config";
import { Editor } from "@tinymce/tinymce-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SubmitButton from "../../../assets/images/submit-button-s-icon.svg"
import "./adPreviewModal.css";
import ReactHtmlParser from "react-html-parser";
import {Translator, Translate} from 'react-auto-translate';
import Post from "../../../assets/images/post-icon-big.svg";
import { useNavigate } from "react-router-dom";


const AdPreviewModal = ({ setAdPreviewModalShow, text, name }) => {
  const [ReferrenceId, setReferrenceId] = useState(false);
  const [ThanksTypeModal2, setThanksTypeModal2] = useState(false);
  const [NewNamePost, setNewNamePost] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const previewstyle = (data) => {
    let newclass = "";
    switch (data) {
      case "addClassified":
        newclass = "classifiedstyle";
        break;
      case "addBook":
        newclass = "bookpagestyle";
        break;
      case "addBanner":
        newclass = "bannerstyle";
        break;
    }
    return newclass;
  };
  const onSubmit = (event) => {
    if (event.nativeEvent.pointerId == -1) {
      return;
    } else {
      event.preventDefault();
      let addApi = "";
      let updateApi = "";
      let newName = "";
      switch (name) {
        case "addClassified":
          newName = "AD";
          break;
        case "addBook":
          newName = "BK";
          break;
        case "addBanner":
          newName = "BN";
          break;
      }

      switch (name) {
        case "addClassified":
          updateApi = "updateClassified";
          break;
        case "addBook":
          updateApi = "updateBook";
          break;
        case "addBanner":
          updateApi = "updateBanner";
          break;
      }
      setNewNamePost(newName);
      axios
        .post(`${ApiUrl}${name}`, {textfield: text})
        .then((res) => {
          setReferrenceId(res.data.list.insertId);
          axios
            .put(`${ApiUrl}${updateApi}/${res.data.list.insertId}`, {
              ReferenceId: `HERESAYS${newName}000${res.data.list.insertId}`,
              textfield: text
            })
            .then((result) => {
              setAdPreviewModalShow(true);
              setThanksTypeModal2(true);
            })
            .catch((errr) => {
              console.log(errr);
            });
        });
    }
  };
  return (
    <>
         <Translator
     from='en'
     to={ localStorage.getItem("prefered_language")
     ? localStorage.getItem("prefered_language")
     : "en"}
     googleApiKey='AIzaSyDJyDB2bnmeDG4KHOZkHnrDqhrqnUI375M'
   >
      <div
        id="ThanksTypeModalForGraph"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ThanksTypeModal"
        aria-hidden="true"
        className={"modal fade show"}
        style={{ display: "block" }}
      >
        <div
          role="document"
          className="modal-dialog modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog"
          id="previewmodal"
        >
          <div className="modal-content">
            <div className="add-advertisement-content-preview adspagepreview">
              <div className="leftcontainer">
                <div className="dayscontainer">
                  <div className="daystext">
                    <h6><Translate>DAYS</Translate></h6>
                  </div>
                  <div className="daysdropdown">
                    <select className="dropdownback">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>
                <div className="clickscontainer">
                  <div className="clicktext">
                    <h6><Translate>CLICKS</Translate></h6>
                  </div>
                  <div className="clickcontainer">
                    <select className="dropdownback">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={previewstyle(name)}>{ReactHtmlParser(text)}</div>
              <div className="rightcontainer">
                <div className="dayscontainer">
                  <div className="daystext">
                    <h6><Translate>DAYS</Translate></h6>
                  </div>
                  <div className="daystextbox">
                    <input className="textbg" type="text" />
                  </div>
                </div>
                <div className="clickscontainer">
                  <div className="clicktext">
                    <h6><Translate>CLICKS</Translate></h6>
                  </div>
                  <div className="clicktextbox">
                    <input className="textbg" type="text" />
                  </div>
                </div>
                <div className="totalcontainer">
                  <div className="totaltext">
                    <h6><Translate>TOTAL</Translate></h6>
                  </div>
                  <div className="totaltextbox">
                    <input className="textbg" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="type-btngroup" id="previewbutton">
              <button
                type="submit"
                data-toggle="modal"
                data-target="#ThanksTypeModal"
                className="ads-submit-btn st-btn-colr-1 cmn-submit-button"
                onClick={(event) => onSubmit(event)}
              >
                <span></span>
              </button>

              <a
                onClick={() => {
                  setAdPreviewModalShow(false);
                }}
                className="st-btn-colr-2 ads-close-btn close-button-style"
              >
                <span></span>
              </a>
            </div>

            <div
              id="ThanksTypeModal2"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="ThanksTypeModal"
              aria-hidden="true"
              className={ThanksTypeModal2 ? "modal fade show" : "modal fade"}
              style={
                ThanksTypeModal2 ? { display: "block" } : { display: "none" }
              }
            >
              <div
                role="document"
                className="modal-dialog modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog"
              >
              </div>
            </div>
            <div
              id="ThanksTypeModal2"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="ThanksTypeModal"
              aria-hidden="true"
              className={ThanksTypeModal2 ? "modal fade show" : "modal fade"}
              style={
                ThanksTypeModal2 ? { display: "block" } : { display: "none" }
              }
            >
              <div
                role="document"
                className="modal-dialog modal-dialog-centered sociallogin-modal-dialog thankstype-modal-dialog"
              >
                <div className="modal-content">
                  <div className="modal-body text-center">
                    <p className="text-uppercase">
                      Your post has been properly submitted
                    </p>
                    <p>and is published under</p>
                    <h3>
                      ID:HERESAYS{NewNamePost}000{ReferrenceId}{" "}
                    </h3>
                    <p>Please copy this for your reference</p>
                    <a
                      onClick={() => {
                        setThanksTypeModal2(false);
                        navigate("/home");
                      }}
                    >
                      <img src={SubmitButton} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Translator>
    </>
  );
};
export default AdPreviewModal;
