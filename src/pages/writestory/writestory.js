import React, { useEffect, useState, useRef } from "react";
import "./writestory.css";
import ArrowLeft from "../../assets/images/arrow-left-icon.png";
// import { Country, State, City } from "country-state-city";
// import { Country, City } from "country-state-city";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
// import "./readstory.css";s
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import Banner from "../components/banner";
import { Loader } from "../components/loader";
import { Translator, Translate } from "react-auto-translate";
import Header from "../components/header";
import {AllLanguageFromJson} from "../../constants/json/languages"
import { withNamespaces, NamespacesConsumer, Trans, useTranslation } from 'react-i18next';
import AllCountryJsonData from "../../constants/locales/CountryTranslation.json"


// import translatedCountryData from '../../constants/json/countryTranslation.json'
const WriteStory = (props) => {
  const { t, i18n } = useTranslation();
  const [ShowLanguageModal, setShowLanguageModal] = useState(false);
  const [allCountry, setAllCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryText, setCountryText] = useState("");
  const [cityText, setCityText] = useState("");
  const [userAgreementData, setUserAgreementData] = useState();
  const [disclaimer, setDisclaimer] = useState();
  const [attentionData, setAttentionData] = useState();
  const [AllLaguages, setAllLaguages] = useState();
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [isRunning, setRunning] = useState(true);
  const [input, setInput] = useState({});
  const [topicClass, setTopicClass] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState('');
  const [formData, setformData] = useState({});
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


  // useEffect(() => { console.log(Country) }, [Country])

  useEffect(() => {
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

        // setCountry(
        //   Country.getAllCountries().filter(
        //     (x) => x.name === data.country_name
        //   )[0]
        // );
        // setAllCountry(
        //   Country.getAllCountries().filter(
        //     (x) => x.name === data.country_name
        //   )[0]
        // );
        setCountryText(res?.data?.country_name)
        setCountry(res?.data?.country_name)
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
        setCountry(data.country_name)
        // setAllCountry(
        //   Country.getAllCountries().filter(
        //     (x) => x.name === data.country_name
        //   )[0]
        // );
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


    let currentLanguageSetting = localStorage.getItem("prefered_language")
    ? localStorage.getItem("prefered_language")
    : "en";
  const [currentLanguage, setCurrentLanguage] = useState(
    currentLanguageSetting
  );

  const getAllData = () => {
    // axios
    //   .all([
    //     axios.get(`${ApiUrl}i18n_locale`),
    //     axios.get(`${ApiUrl}getTermsAndCondition`),
    //     axios.get(`${ApiUrl}getDisclaimer`),
    //     axios.get(`${ApiUrl}getAttention`),

    //   ])
    //   .then(
    //     axios.spread(
    //       (
    //         firstResponse,
    //         secondResponse,
    //         thirdResponse,
    //         attentionResponse,
    //         socialData,
    //       ) => {
    //         console.log("firstResponse.data.data", firstResponse.data.data)
    //         setAllLaguages(firstResponse.data.data);
    //         setUserAgreementData(secondResponse.data.data);

    //         setDisclaimer(thirdResponse.data.data);
    //         setAttentionData(attentionResponse.data.data);
    //         // let requiredData = translatedCountryData[localStorage.getItem("prefered_language")];
    //         // setCountries(requiredData)
    //       }
    //     )
    //   )
    //   .catch((error) => console.log(error));

    axios.get(`${ApiUrl}i18n_locale`).then((res) => { setAllLaguages(res.data.data); }).catch((error) => console.log(error));
  };

  const onLanguageChange = (data) => {
    localStorage.setItem("prefered_language", data);
    getAllData();
    setShowLanguageModal(false);
    setThanksTypeModalForGraph(`Your language has been changed to ${data}`);
  };

  const selectCountry = (e) => {
    console.log("country-e", e);
    setCountry(e)
  }
  const selectRegion = (e) => {
    setRegion(e)
    setCityText(e)
  }

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
      
        <div className="container3 mobile_height">
          <Header />
          <div className="middle text-centercontrol">
            {/* <div className="B1"></div> */}
            <div className="B2 cards">
              <div>
                <div className="writestory-body-container">
                  <div
                    role="document"
                    className="modal-dialog modal-dialog-centered readastory-modal-dialog write-a-story-modal border-style-8  writestory_New"
                  >
                    <div className="modal-content" onClick={() => { setTopicClass("") }}>
                      <Link
                        to="/home"
                        // href="/home"
                        // routerlink="/home"
                        className="close-button-style-write"
                      >
                        <span></span>
                      </Link>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="ng-untouched ng-pristine ng-invalid"
                      >
                        <div className="writestory_popup">
                          <div className="modal-body">

                            <div className="row custom-field-row write-align">
                              <div className="col-md-12 custom-field-col">
                                <div className="row custom-field-row rab-flex-direction">
                                  <div className="col-md-12 custom-field-heading cmn-title-head text-center">
                                    <h2>
                                      {t('SUBMIT')}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                              {/* topic  */}
                              <div className="col-md-4 custom-field-col">
                                <div className="form-group input-custom-field">
                                  <input
                                    type="text"
                                    placeholder={t('Topic')}
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
                                      {t('Topic')}
                                    </p>
                                  )} */}
                                </div>
                                {errors.TopicName && (
                                  <span className="text-danger">
                                    {t('TopicName is required')}
                                  </span>
                                )}
                              </div>


                              {/* publish  */}
                              <div className="col-md-4 custom-field-col">

                                <div className="form-group input-custom-field">
                                  <input
                                    type="text"
                                    placeholder={t('Published BY')}
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
                                        {t('Published BY')}
                                      </p>
                                    )} */}
                                </div>
                                {errors.PublisherName && (
                                  <span className="text-danger">
                                    {t('Publisher Name is required')}
                                      
                                    
                                  </span>
                                )}
                              </div>
                              {/* lang  */}
                              <div className="col-md-4 custom-field-col">
                                <div className="form-group select-custom-field">
                                  <select
                                    formcontrolname="language_id"
                                    {...register("Language")}
                                    className="form-control ng-untouched ng-pristine ng-invalid"
                                    value={currentLanguageSetting}
                                    onChange={(e) => { localStorage.setItem("prefered_language", e.target.value) }}
                                  >
                                    {
                                      !currentLanguage ? (<option value="">Language</option>) : null
                                    }

                                    {AllLanguageFromJson &&
                                      AllLanguageFromJson.map((x, index) => {
                                        return (

                                          <option
                                            key={index}
                                            value={x.BCP47}
                                            // selected={
                                            //   x.BCP47 == currentLanguage
                                            // }
                                          >
                                            {x.Native}
                                          </option>
                                        )
                                      })}
                                  </select>
                                </div>
                                {errors.Language && (
                                  <span className="text-danger">
                                    Language is required
                                  </span>
                                )}
                              </div>
                              {/* country  */}
                              <div className="col-md-4 custom-field-col">
                                <div className="form-group select-custom-field">
                                  {/* <CountryDropdown
                                    className="form-control ng-untouched ng-pristine ng-invalid"
                                    defaultOptionLabel="country"
                                    value={country}
                                    onChange={selectCountry} /> */}
                                  <select
                                  // value={countryText}
                                  formcontrolname="country"
                                  className="form-control ng-untouched ng-pristine ng-invalid"
                                  {...register("country")}
                                  onChange={(e) => {
                                    setAllCountry(JSON.parse(e.target.value));
                                    // let countryObj = translatedCityData[JSON.parse(e.target.value).isoCode];
                                    // setCities(countryObj[localStorage.getItem("prefered_language")])

                                  }}

                                >
                                  <option value="">{countryText ? countryText : "Country"}</option>
                                  {AllCountryJsonData[currentLanguageSetting]?.map((x, index) => {
                                    return (
                                      <option key={index} value={x.isocode}
                                        selected={countryText === x.name}
                                      >
                                        {x.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                </div>
                              </div>
                              {/* city  */}
                              <div className="col-md-4 custom-field-col">
                                <div className="form-group input-custom-field">
                                  {/* <RegionDropdown
                                    className="form-control ng-untouched ng-pristine ng-invalid"
                                    blankOptionLabel="State"
                                    defaultOptionLabel="State"
                                    country={country}
                                    value={region}
                                    onChange={selectRegion} /> */}
                                  <input
                                    type="text"
                                    placeholder={t('City')}
                                    formcontrolname="city"
                                    {...register("City", {
                                      onChange: () => {
                                        setInput({ ...input, City: true });
                                      },
                                    })}
                                    className="form-control ng-untouched ng-pristine ng-invalid"
                                  />
                                  {/* {!input.City && !formData.City && (
                                    <p
                                      className="placeHolder text-white"
                                      style={{
                                        position: "absolute",
                                        top: "10px",
                                        left: "8px",
                                        bottom: "",
                                      }}
                                    >
                                      {t('City')}
                                    </p>
                                  )} */}
                                </div>
                              </div>
                              {/* place  */}
                              <div className="col-md-4 custom-field-col">
                                <div className="form-group input-custom-field">
                                  <input
                                    type="text"
                                    placeholder={t('Place')}
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
                                      {t('Place')}
                                    </p>
                                  )} */}
                                </div>
                              </div>
                              {/* sub 1  */}
                              <div className="col-md-4 custom-field-col">
                                <div className="form-group input-custom-field">
                                  <input
                                    type="text"
                                    placeholder={t('Subject 1')}
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
                                      {t('Subject 1')}
                                    </p>
                                  )} */}
                                </div>
                              </div>
                              {/* sub2  */}
                              <div className="col-md-4 custom-field-col">
                                <div className="form-group input-custom-field">
                                  <input
                                    type="text"
                                    placeholder={t('Subject 2')}
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
                                      {t('Subject 2')}
                                    </p>
                                  )} */}

                                </div>
                              </div>
                              {/* sub - 3  */}
                              <div className="col-md-4 custom-field-col">
                                <div className="form-group input-custom-field">
                                  <input
                                    type="text"
                                    placeholder={t('Subject 3')}
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
                                      {t('Subject 3')}
                                    </p>
                                  )} */}

                                </div>
                              </div>
                            </div>


                          </div>
                        </div>
                        <div className="btn-cmn-group writestory_mobile_top new_close_write">
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
            {/* <div className="B3"></div> */}
          </div>
          <app-footer-panel>
            <div className="bottom-wrapper-initial-mobile">
              <div className="google-ads-wrap ng-star-inserted">
                <Banner />
              </div>
            </div>
          </app-footer-panel>
        </div>
    </>
  );
};

export default WriteStory;
