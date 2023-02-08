import React, { useEffect, useState } from "react";
import ClassifiedIcon from "../../../assets/images/classifieds-icon.svg";
import BookIcon from "../../../assets/images/book-icon.svg";
import ReactHtmlParser from "react-html-parser";
import "./advertisement.css";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/modal/popup";
import axios from "axios";
import { ApiUrl } from "../../../config/config";
import { Translator, Translate } from 'react-auto-translate';
import Banner from "../../components/banner";
import { Loader } from "../../components/loader";
import Header from "../../components/header";
const Advertisement = (props) => {
  const navigate = useNavigate();
  const [showSociaModal, setShowSocialModal] = useState(false);
  const [ShowLanguageModal, setShowLanguageModal] = useState(false);
  const [advertisement, setAdvertisement] = useState(false);
  const [socialUrl, setSocialUrl] = useState(false);
  const [AllLaguages, setAllLaguages] = useState(false);
  const [userAgreementData, setUserAgreementData] = useState();
  const [disclaimer, setDisclaimer] = useState();
  const [attentionData, setAttentionData] = useState();
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [isRunning, setRunning] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRunning(false);
    }, 3000);
    getAllData();
    AdvertisementData();
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
            attentionResponse
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
  const AdvertisementData = () => {
    axios.get(`${ApiUrl}getAdvertisement`).then((result) => {
      setAdvertisement(result.data.data);
    });
  };
  const onLanguageChange = (data) => {
    localStorage.setItem("prefered_language", data);
    getAllData();
    setShowLanguageModal(false);
    setThanksTypeModalForGraph(`Your language has been changed to ${data}`);
  };

  if (!props.imagesPreloaded) return <Loader></Loader>;
  return (
    <>
      <Translator
        from='en'
        to={localStorage.getItem("prefered_language")
          ? localStorage.getItem("prefered_language")
          : "en"}
        googleApiKey='AIzaSyDJyDB2bnmeDG4KHOZkHnrDqhrqnUI375M'
      >
        <div className="container1">
          <Header />
          <div className="middle">
            <div className="B1"></div>
            <div className="B2 cards">
              <div className="home-body-container-advertisement ads-align-container-advertisement">
                <div className="add-ads-wrapper-advertisement border-style-9 ads-align-advertisement">
                  <div className="add-ads-content-advertisement cmn-scrollbar-advertisement ads-align-content-advertisement">
                    <div className="add-ads-col-row-advertisement">
                      <div className="add-ads-col-50-advertisement">
                        <div
                          className="add-ads-item-box-advertisement"
                          onClick={() => {
                            navigate("/advertisement/ad-classified");
                          }}
                        >
                          <div className="add-ads-box-advertisement">
                            <div className="add-ads-top-bx-advertisement">
                              <h5>
                                <Translate>{ReactHtmlParser(
                                  advertisement &&
                                  advertisement[0] &&
                                  advertisement[0].attributes &&
                                  advertisement[0].attributes.label
                                )}</Translate>
                              </h5>

                              <img src={ClassifiedIcon} />
                            </div>
                            <div className="add-ads-btm-bx-advertisement">
                              <span className="add-ads-subject-txt-advertisement">
                                {ReactHtmlParser(
                                  advertisement &&
                                  advertisement[0] &&
                                  advertisement[0].attributes &&
                                  advertisement[0].attributes.description
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="add-ads-col-50">
                        <div
                          className="add-ads-item-box-advertisement"
                          onClick={() => {
                            navigate("/advertisement/add-book");
                          }}
                        >
                          <div className="add-ads-box-advertisement">
                            <div className="add-ads-top-bx-advertisement">
                              <h5>
                                <Translate>{ReactHtmlParser(
                                  advertisement &&
                                  advertisement[1] &&
                                  advertisement[1].attributes &&
                                  advertisement[1].attributes.label
                                )}</Translate>
                              </h5>
                              <img src={BookIcon} />
                            </div>
                            <div className="add-ads-btm-bx-advertisement">
                              <span className="add-ads-subject-txt-advertisement">
                                {ReactHtmlParser(
                                  advertisement &&
                                  advertisement[1] &&
                                  advertisement[1].attributes &&
                                  advertisement[1].attributes.description
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="add-ads-banner-box-advertisement"
                      onClick={() => {
                        navigate("/advertisement/add-banner");
                      }}
                    >
                      <div className="add-ads-banner-box-in-advertisement">
                        <div className="add-ads-banner-info">
                          <h5>
                            <Translate>{ReactHtmlParser(
                              advertisement &&
                              advertisement[2] &&
                              advertisement[2].attributes &&
                              advertisement[2].attributes.label
                            )}</Translate>
                          </h5>
                          <span>
                            {ReactHtmlParser(
                              advertisement &&
                              advertisement[2] &&
                              advertisement[2].attributes &&
                              advertisement[2].attributes.description
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
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
      </Translator>
    </>
  );
};

export default Advertisement;
