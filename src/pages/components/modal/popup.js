import React, { useState } from 'react'
import {Translator, Translate} from 'react-auto-translate';


const Popup =({showSociaModal,setShowSocialModal,socialUrl})=>{
const [showIframe,setshowIframe]=useState(false)

return(
    <>
   <Translator
     from='en'
     to={ localStorage.getItem("prefered_language")
     ? localStorage.getItem("prefered_language")
     : "en"}
     googleApiKey='AIzaSyDJyDB2bnmeDG4KHOZkHnrDqhrqnUI375M'
   >
       <app-pop-up>
        <div
          id="SocialLoginModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="SocialLoginModal"
          className={showSociaModal ? "modal fade show" : "modal fade "}
          style={showSociaModal ? { display: "block" } : { display: "none" }}
          aria-hidden="true"
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered sociallogin-modal-dialog modalNew"
          >
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="sociallink-info"><Translate>Do you want to proceed</Translate></p>
              </div>
              <div className="modal-footer sociallink-footer">
                <a className="read-btn-bg cmn-submit-button mrl-10p" onClick={()=>{
                  setshowIframe(true);
                  setShowSocialModal(false);
                  }}
                 >
                  <span></span>
                </a>
                <a
                onClick={()=>{setShowSocialModal(false)}}
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
      </app-pop-up>

      <div
          id="SocialLoginModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="SocialLoginModal"
          className={showIframe ? "modal fade show" : "modal fade "}
          style={showIframe ? { display: "block" } : { display: "none" }}
          aria-hidden="true"
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered sociallogin-modal-dialog"
          >
            <div className="modal-content">
            <div className="modal-body text-center" style={{height:"75vh"}}>
            <iframe src={socialUrl ? socialUrl : "" }
             frameBorder="0"
             style={{overflow:"hidden",
             overflowX:"hidden",
             overflowY:"hidden",
             height:"100%",
             width:"100%",
             position:"absolute",
             top:"0px",
             left:"0px",
             right:"0px",
             bottom:"0px"}}
              ></iframe>
</div>
              <div className="modal-footer sociallink-footer">
                <a
                onClick={()=>{setshowIframe(false)}}
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
        </Translator>
    </>
)
}
export default Popup;