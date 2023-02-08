import React, { useEffect, useState, useRef } from "react";
import "./writestory.css";
import ArrowLeft from "../../assets/images/arrow-left-icon.png";
import { Country, State, City } from "country-state-city";
// import "./readstory.css";s
import { Fade, Rotate } from "react-reveal";
import Settings from "../home/settings/setting";
import AdsModal from "../home/ads/ads";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changeLanguage } from "i18next";
import Popup from "../components/modal/popup";
import SocialIcons from "../components/modal/socialIcons";
import axios from "axios";
import { ApiUrl } from "../../config/config";
import { useForm } from "react-hook-form";
// import CountryData from "../../constants/json/countries.json";
import AllModal from "../../constants/allmodal";
import Banner from "../components/banner";
import { Loader } from "../components/loader";
import { Translator, Translate } from "react-auto-translate";
import Header from "../components/header";
// import translatedCountryData from '../../constants/json/countryTranslation.json'
// import translatedCityData from '../../constants/json/citylist.json'
const WriteStory_backupppppp = (props) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [ShowAdsModal, setShowAdsModal] = useState(false);
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

  const [socialModal, setSocialModal] = useState(false);
  const [termsAndCondition, setTermsAndCondition] = useState(false);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryText, setCountryText] = useState("");
  const [cityText, setCityText] = useState("");
  const [userAgreementData, setUserAgreementData] = useState();
  const [disclaimer, setDisclaimer] = useState();
  const [attentionData, setAttentionData] = useState();
  const [AllLaguages, setAllLaguages] = useState(false);
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [modalShowTerm, setModalShowTerm] = useState(false);
  const [ShowAttentionModal, setShowAttentionModal] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);
  const [isRunning, setRunning] = useState(true);
  const [input, setInput] = useState({});
  const [formData, setformData] = useState({});
  const [topicClass, setTopicClass] = useState("");
  const [hidePTag, setHidePTag] = useState(false);


  const [state, setState] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: ""
  });

  const [socialUrl, setSocialUrl] = useState(false);
  const writeStoryContainerRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
  }

  function errorss(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    setTimeout(() => {
      setRunning(false);
    }, 3000);

    getAllData();
    if (writeStoryContainerRef.current) {
      writeStoryContainerRef.current.addEventListener("touchmove", (e) => {
        if (!e.currentTarget) {
          return;
        }
        if (e.currentTarget.scrollTop === 0) {
          e.currentTarget.scrollTop = 1;
        } else if (
          e.currentTarget.scrollHeight ===
          e.currentTarget.scrollTop + e.currentTarget.offsetHeight
        ) {
          e.currentTarget.scrollTop -= 1;
        }
      });
    }
  }, []);

  const tranlateText = (lang, text) => {
    return axios.post(
      `${ApiUrl}translate`,
      {
        mimeType: "text/html",
        targetLanguageCode: lang,
        text: text,
        location: "global",
      }
    );
  };

  useEffect(async () => {

    getAllData();
    axios
      .get("https://ipapi.co/json/")
      .then(async (response) => {
        let data = response.data;
        let res = await tranlateText(localStorage.getItem("prefered_language")
          ? localStorage.getItem("prefered_language")
          : "en", "Country")
        let res2 = await tranlateText(localStorage.getItem("prefered_language")
          ? localStorage.getItem("prefered_language")
          : "en", "City")

        setCountry(
          Country.getAllCountries().filter(
            (x) => x.name === data.country_name
          )[0]
        );
        setCountryText(res?.data?.country_name)
        setCityText(res2.data.text)
      })
      .catch((error) => {
        console.log(error);
      });
    // tranlateCountryText()
  }, []);



  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setCountryText(data.country_name)
        setState({
          ...state,
          ip: data.ip,
          countryName: data.country_name,
          countryCode: data.country_calling_code,
          city: data.city,
          timezone: data.timezone
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGeoInfo();
  }, []);


  //   const tranlateCountryText =async()=>{
  // let allCountries  =  Country.getAllCountries().map(async z=>
  //       tranlateText( localStorage.getItem("prefered_language")
  //       ? localStorage.getItem("prefered_language")
  //       : "en",z.name).then(res=>{
  //         return([{...z,name:res.data.text}])
  //       }))
  //     console.log( allCountries)

  //   }
  let localLanguage = localStorage.getItem("prefered_language")
    ? localStorage.getItem("prefered_language")
    : "en";
  const getAllData = () => {
    axios
      .all([
        axios.get(`${ApiUrl}i18n_locale`),
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
            socialData,
          ) => {
            setAllLaguages(firstResponse.data.data);
            setUserAgreementData(secondResponse.data.data);

            setDisclaimer(thirdResponse.data.data);
            setAttentionData(attentionResponse.data.data);
            // let requiredData = translatedCountryData[localStorage.getItem("prefered_language")];
            // setCountries(requiredData)
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

  const onSubmit = (data) => {
    let bodyData = {
      data: {
        PublisherName: data.PublisherName,
        TopicName: data.TopicName,
        Country: data?.country?.name,
        Language: data.Language,
        City: data.City,
        Place: data.Place,
        Subject1: data.Subject1,
        Subject2: data.Subject2,
        Subject3: data.Subject3,
      },
    };
    localStorage.setItem("writestory", JSON.stringify(bodyData));
    navigate("/story/type-story", { state: bodyData });
  };
  if (!props.imagesPreloaded) return <Loader></Loader>;

  return (
    <>
      <Translator
        from="en"
        to={
          localStorage.getItem("prefered_language")
            ? localStorage.getItem("prefered_language")
            : "en"
        }
        googleApiKey="AIzaSyDJyDB2bnmeDG4KHOZkHnrDqhrqnUI375M"
      >
        <div className="container3">
          <Header />
          <div className="middle" >
            <div className="B1"></div>
            <div className="B2 cards">
              <div>
                <div className="writestory-body-container">
                  <div
                    role="document"
                    className="modal-dialog modal-dialog-centered readastory-modal-dialog write-a-story-modal border-style-8  writestory_New"
                  >
                    <div className="modal-content" onClick={() => { setTopicClass("") }}>
                      <a
                        href="/home"
                        routerlink="/home"
                        className="close-button-style-write"
                      >
                        <span></span>
                      </a>
                      <div className="modal-body">
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="ng-untouched ng-pristine ng-invalid"
                        >












                          <div className="row custom-field-row write-align">
                            <div className="col-md-12 custom-field-col">
                              <div className="row custom-field-row rab-flex-direction">
                                <div className="col-md-12 custom-field-heading cmn-title-head text-center">
                                  <h2>
                                    <Translate>SUBMIT</Translate>
                                  </h2>
                                </div>
                              </div>
                            </div>
                            
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  placeholder="Topic"
                                  // formcontrolname="topic"
                                  className="form-control ng-untouched ng-pristine ng-invalid "
                                  {...register("TopicName", {
                                    required: true,
                                    onChange: () => {
                                      setInput({ ...input, TopicName: true });
                                    },
                                  })}
                                />
                                {/* {!input.TopicName && !formData.TopicName && (
                                  <p
                                    className="placeHolder text-white"
                                    style={{
                                      position: "absolute",
                                      top: "10px",
                                      left: "8px",
                                      bottom: "",
                                    }}
                                    onClick={() => { setTopicClass("topic") }}
                                  >
                                    <Translate>Topic</Translate>
                                  </p>
                                )} */}
                              </div>
                              {errors.TopicName && (
                                <span className="text-danger">
                                  <Translate>TopicName is required</Translate>
                                </span>
                              )}
                            </div>
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group select-custom-field">
                                <select
                                  formcontrolname="country"
                                  className="form-control ng-untouched ng-pristine ng-invalid"
                                  {...register("country")}
                                  onChange={(e) => {
                                    setCountry(JSON.parse(e.target.value));
                                    // let countryObj = translatedCityData[JSON.parse(e.target.value).isoCode];
                                    // setCities(countryObj[localStorage.getItem("prefered_language")])

                                  }}
                                >
                                  <option>Country</option>
                                  {/* {countries.map((x) => {
                                    return (
                                      <option value={JSON.stringify(x)} selected={countryText === x.name}>
                                        {x.name}
                                      </option>
                                    );
                                  })} */}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  placeholder="Subject 1"
                                  formcontrolname="subject_id"
                                  {...register("Subject1", {
                                    onChange: () => {
                                      setInput({ ...input, Subject1: true });
                                    },
                                  })}
                                  className="form-control ng-untouched ng-pristine ng-invalid"
                                />
                                {/* {!input.Subject1 && !formData.Subject1 && (
                                  <p
                                    className="placeHolder text-white"
                                    style={{
                                      position: "absolute",
                                      top: "10px",
                                      left: "8px",
                                      bottom: "",
                                    }}
                                  >
                                    <Translate>Subject 1</Translate>
                                  </p>
                                )} */}
                              </div>
                            </div>
                            
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  placeholder="Published By"
                                  formcontrolname="published_by"
                                  {...register("PublisherName", {
                                    required: true,
                                    onChange: () => {
                                      setInput({
                                        ...input,
                                        PublisherName: true,
                                      });
                                    },
                                  })}
                                  className="form-control ng-untouched ng-pristine ng-invalid"
                                />
                                {/* {!input.PublisherName &&
                                  !formData.PublisherName && (
                                    <p
                                      className="placeHolder text-white"
                                      style={{
                                        position: "absolute",
                                        top: "10px",
                                        left: "8px",
                                        bottom: "",
                                      }}
                                    >
                                      <Translate>Published By</Translate>
                                    </p>
                                  )} */}
                              </div>
                              {errors.PublisherName && (
                                <span className="text-danger">
                                  <Translate>
                                    Publisher Name is required
                                  </Translate>
                                </span>
                              )}
                            </div>
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group select-custom-field">
                                <select
                                  formcontrolname="city"
                                  className="form-control ng-untouched ng-pristine ng-invalid"
                                  {...register("City")}
                                >
                                  <option value="">{cityText ? cityText : "City"}</option>
                                  {/* {(cities.filter((x)=> x.data===countries && countries.isoCode))*/}
                                  {cities.map((x) => {
                                    return (
                                      <option value={x}>{x}</option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  placeholder="Subject 2"
                                  formcontrolname="subject_second"
                                  {...register("Subject2", {
                                    onChange: () => {
                                      setInput({ ...input, Subject2: true });
                                    },
                                  })}
                                  className="form-control ng-untouched ng-pristine ng-valid"
                                />
                                {/* {!input.Subject2 && !formData.Subject2 && (
                                  <p
                                    className="placeHolder text-white"
                                    style={{
                                      position: "absolute",
                                      top: "10px",
                                      left: "8px",
                                      bottom: "",
                                    }}
                                  >
                                    <Translate>Subject 2</Translate>
                                  </p>
                                )} */}
                              </div>
                            </div>
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  placeholder="Place"
                                  formcontrolname="place"
                                  {...register("Place", {
                                    onChange: () => {
                                      setInput({ ...input, Place: true });
                                    },
                                  })}
                                  className="form-control ng-untouched ng-pristine ng-invalid"
                                />
                                {/* {!input.Place && !formData.Place && (
                                  <p
                                    className="placeHolder text-white"
                                    style={{
                                      position: "absolute",
                                      top: "10px",
                                      left: "8px",
                                      bottom: "",
                                    }}
                                  >
                                    <Translate>Place</Translate>
                                  </p>
                                )} */}
                              </div>
                            </div>
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group select-custom-field">
                                <select
                                  formcontrolname="language_id"
                                  {...register("Language")}
                                  className="form-control ng-untouched ng-pristine ng-invalid"
                                  defaultValue={localLanguage}
                                >
                                  {
                                    !localLanguage ? (<option value="">Language</option>) : null
                                  }

                                  {AllLaguages &&
                                    AllLaguages.map((x) => {
                                      return localLanguage == x.attributes.code ? (
                                        <option
                                          value={x.attributes.code}
                                          selected={
                                            x.attributes.code == localLanguage
                                          }
                                        >
                                          {x.attributes.name}
                                        </option>
                                      ) : null
                                    })}
                                </select>
                              </div>
                              {errors.Language && (
                                <span className="text-danger">
                                  Language is required
                                </span>
                              )}
                            </div>
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  placeholder="Subject 3"
                                  formcontrolname="subject_third"
                                  {...register("Subject3", {
                                    onChange: () => {
                                      setInput({ ...input, Subject3: true });
                                    },
                                  })}
                                  className="form-control ng-untouched ng-pristine ng-valid"
                                />
                                {/* {!input.Subject3 && !formData.Subject3 && (
                                  <p
                                    className="placeHolder text-white"
                                    style={{
                                      position: "absolute",
                                      top: "10px",
                                      left: "8px",
                                      bottom: "",
                                    }}
                                  >
                                    <Translate>Subject 3</Translate>
                                  </p>
                                )} */}
                              </div>
                            </div>
                          </div>









                          <div className="btn-cmn-group">
                            <button
                              type="submit"
                              className="btn-apply write-btn-bg cmn-submit-button"
                            >
                              <span></span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="continue-btn-group">
                    <a
                      routerlink="/home"
                      className="btn-continue arrow-bounce-right"
                      href="/home"
                    >
                      <img src={ArrowLeft} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="B3"></div>
          </div>
          <Banner />
        </div>
      </Translator>
    </>
  );
};

export default WriteStory_backupppppp;
