import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoHome from "../../assets/images/logo-heresays-5.svg";
import AllModal from "../../constants/allmodal";

const Header = (props) => {
  const [modalSettings, setModalSettings] = useState(false);
  const [ShowGuideModal, setShowGuideModal] = useState(false);
  const [ShowAdsModal, setShowAdsModal] = useState(false);
  const [ContactModal, setContactModal] = useState(false);
  const [InstructionModal, setInstructionModal] = useState(false);
  const [OpportunityModal, setOpportunityModal] = useState(false);
  const [DownloadappModal, setDownloadappModal] = useState(false);
  const [Termsofuse2Modal, setTermsofuse2Modal] = useState(false);
  const [ShowLanguageModal, setShowLanguageModal] = useState(false);
  const [checkBudgetModal, setCheckBudgetModal] = useState(false);
  const [FinanceModal, setFinanceModal] = useState(false);
  const [modalShowTerm, setModalShowTerm] = useState(false);
  const [ShowAttentionModal, setShowAttentionModal] = useState(false);
  const [showSociaModal, setShowSocialModal] = useState(false);
  const [NewsModal, setNewsModal] = useState(false);
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [AdPreviewModalShow, setAdPreviewModalShow] = useState(false);
  const navigate = useNavigate();


const clearLocal =()=>{
  localStorage.clear();
  setTimeout(() => {
    // navigate("https://www.google.com/")
    // <Navigate to="https://www.google.com/" replace={true} />
  }, 1000);
}
  
  return (
    <div className="header_custome_class">
      <app-header-panel>
        <div className="header column-reverse_box">
          <div className="header-tops"> 
          <div className="A2 top_icons">
            <AllModal
              languageRefresh={props.languageRefresh}
              setLanguageRefresh={props.setLanguageRefresh}
              data={{
                modalSettings,
                ShowGuideModal,
                // ShowAdsModal,
                ContactModal,
                InstructionModal,
                OpportunityModal,
                DownloadappModal,
                Termsofuse2Modal,
                ShowLanguageModal,
                checkBudgetModal,
                // OpportunityModal,
                FinanceModal,
                // InstructionModal,
                modalShowTerm,
                ShowAttentionModal,
                showSociaModal,
                NewsModal,
                ThanksTypeModalForGraph,
                AdPreviewModalShow,
              }}
              action={{
                setModalSettings,
                setShowGuideModal,
                // setShowAdsModal,
                setContactModal,
                setInstructionModal,
                setOpportunityModal,
                setDownloadappModal,
                setTermsofuse2Modal,
                setShowLanguageModal,
                setCheckBudgetModal,
                // setOpportunityModal,
                setFinanceModal,
                // setInstructionModal,
                setModalShowTerm,
                setShowAttentionModal,
                setShowSocialModal,
                setNewsModal,
                setThanksTypeModalForGraph,
                setAdPreviewModalShow,
              }}
            />
          </div></div>
          <div className="A1 logoposition main_logo">
            <a href="/home">
              <img
                src={LogoHome}
                alt="Heresays"
                title="Heresays"
                className="large-logo img-responsive"
                style={{ height: "100px", width: "180px" }}
              />
            </a>
          </div>
          <div className="AB">
      
          
          <div className="A3 header-right-menu" onClick={()=>{clearLocal()}}>
            <a href="https://www.google.com/" className="header-exit-button">
              <span>
                <i className="header-exit-icon"></i>
              </span>
            </a>
          </div>
          </div>
        </div>
      </app-header-panel>
    </div>
  );
};

export default Header;
