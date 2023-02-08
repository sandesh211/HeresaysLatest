import React from "react";
import CrossIcon from "../../assets/images/cross-icon-gradient.svg";
import BackArrowSmall from "../../assets/images/back-arrow-gradient-small.png";
import Tick from "../../assets/images/tick-icon.svg";
import "./socialModal.css";

export default function SocialModal() {
  return (
    <div id="popupForeSocial">
      <div id="popupForeParentSocial">
        <div className="WhitescreenSocial">
          <button className="tickParent">
            <div>
              <div className="tickChild">
                <img src={Tick} alt="✔" className="imgs" />
                <img src={Tick} alt="✔️" className="imgs" />
              </div>
            </div>
          </button>
          <div>
            <button className="btnSocialCrossParent">
              <div className="btnSocialCross">
                <img src={BackArrowSmall} alt="" className="imgs" />
                <img src={CrossIcon} alt="✖" className="imgs" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
