import React, { useEffect, useState } from "react";
import "./new.css";
import logo from "../../assets/images/stated-logo.png";
import setting from "../../assets/images/settings-icon.svg";
import dollar from "../../assets/images/pay-per-click-icon.svg";
import question from "../../assets/images/questions-icon.svg";
import exit from "../../assets/images/exit-icon.svg";
import banner from "../../assets/images/banner.png";
import SocialIcons from "../components/modal/socialIcons";

const New = ({ listStoryId, data }) => {
  return (
    <>
      <div className="parentnew">
        <div className="headnew">
          <div className="logo">
            <img className="logonew" src={logo} />
          </div>
          <div className="iconnew">
            <div className="d-flex mx-5">
              <div className="mx-2">
                <img src={setting} />
              </div>
              <div className="mx-2">
                <img src={dollar} />
              </div>
              <div className="mx-2">
                <img src={question} />
              </div>
            </div>

            <div>
              <img src={exit} />
            </div>
          </div>
        </div>
        <div className="bodynew">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="footernew">
          {/* <SocialIcons /> */}
          <img className="bannerimage" src={banner} />
        </div>
      </div>
    </>
  );
};
export default New;
