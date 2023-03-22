import React, { useEffect, useState, useCallback } from "react";
import "./readstory.css";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../assets/images/arrow-left-icon.png";
// import { Country, City } from "country-state-city";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { changeLanguage } from "i18next";
import axios from "axios";
import { ApiUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import Header from "../components/header";
import { Translator, Translate } from "react-auto-translate";
import { AllLanguageFromJson } from "../../constants/json/languages";
import { withNamespaces, NamespacesConsumer, Trans, useTranslation } from 'react-i18next';
import AllCountryJsonData from "../../constants/locales/CountryTranslation.json"



const ReadStory = (props) => {
  const { t, i18n } = useTranslation();
  const [ShowLanguageModal, setShowLanguageModal] = useState(false);
  const [userAgreementData, setUserAgreementData] = useState();
  const [disclaimer, setDisclaimer] = useState();
  const [attentionData, setAttentionData] = useState();
  const [AllLaguages, setAllLaguages] = useState(false);
  const [ThanksTypeModalForGraph, setThanksTypeModalForGraph] = useState(null);
  const [allPublishedBy, setAllPublisedBy] = useState([]);
  const [ALLReferenceID, setALLReferenceID] = useState([]);
  const [allTopic, setAllTopic] = useState([]);
  const [allPlace, setAllPlace] = useState([]);
  const [allCountry, setAllCountry] = useState([]);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState('');
  const [allSubject1, setAllSubject1] = useState([]);
  const [allSubject2, setAllSubject2] = useState([]);
  const [allSubject3, setAllSubject3] = useState([]);
  const [allDate, setAllDate] = useState([]);
  const [socialUrl, setSocialUrl] = useState(false);
  const [storyData, setStoryData] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState("");
  const [newQueryString, setNewQueryString] = useState("");
  const [addBannerStoryData, setAddBannerStoryData] = useState();
  const [isRunning, setRunning] = useState(true);
  const [countryText, setCountryText] = useState("");
  const [dateType, setDateType] = useState("text");
  const [cityText, setCityText] = useState("");
  const [langText, setLangText] = useState("");
  const [state, setState] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: ""
  });



  let localLanguage = localStorage.getItem("prefered_language")
    ? localStorage.getItem("prefered_language")
    : "em";


  let currentLanguageSetting = localStorage.getItem("prefered_language")
    ? localStorage.getItem("prefered_language")
    : "en";
  const [currentLanguage, setCurrentLanguage] = useState(
    currentLanguageSetting
  );


  const getAddBannerData = () => {
    axios.get(`${ApiUrl}getBanner`).then((result) => {
      setAddBannerStoryData(
        result?.data?.data?.filter((x) => x?.attributes?.published_at != null)
      );
    });
  };

  const [input, setInput] = useState("");
  const [formData, setFormData] = useState({
    publishedby: "",
    TopicName: "",
    Country: "",
    City: "",
    Place: "",
    PublisherName: "",
    Subject1: "",
    Subject2: "",
    Subject3: "",
    ReferenceId: "",
    Date: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setTimeout(() => {
      setRunning(false);
    }, 30000);
    getAllData();
    getStoryData();
    getAddBannerData();
  }, []);
  const SuggestionsListComponent = ({ suggestion, name }) => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a className
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li
              className={className}
              key={suggestion}
              onClick={(e) => onFormDataInput(e, name)}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };

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
  useEffect(() => {

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
        let res3 = await tranlateText(localStorage.getItem("prefered_language")
          ? localStorage.getItem("prefered_language")
          : "en", "Language")

        // setCountry(
        //   Country.getAllCountries().filter(
        //     (x) => x.name === data.country_name
        //   )[0]
        // );
        setCountryText(res.data.text)
        setCountry(res.data.text)
        setCityText(res2.data.text)
        setLangText(res3.data.text)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setCountryText(data.country_name)
        setCountry(data.country_name)
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


  useEffect(() => {
    console.log("countryText :", countryText);
  }, [countryText])



  const onChange = (e, suggestions, name) => {
    const userInput = e.target.value;
    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions
      .filter((x) => x != null)
      .filter(
        (suggestion) =>
          suggestion.toUpperCase().indexOf(userInput.toUpperCase()) > -1
      );
    if (name == "publishedBy") {
      setInput({ ...input, publishedBy: e.target.value });
    } else if (name == "TopicName") {
      setInput({ ...input, TopicName: e.target.value });
    } else if (name == "Place") {
      setInput({ ...input, Place: e.target.value });
    } else if (name == "Country") {
      setInput({ ...input, Country: e.target.value });
    } else if (name == "Subject1") {
      setInput({ ...input, Subject1: e.target.value });
    } else if (name == "Subject2") {
      setInput({ ...input, Subject2: e.target.value });
    } else if (name == "Subject3") {
      setInput({ ...input, Subject3: e.target.value });
    } else if (name == "ReferenceId") {
      setInput({ ...input, ReferenceId: e.target.value });
    } else if (name == "Date") {
      setInput({ ...input, Date: e.target.value });
    }
    // setInput(e.target.value);

    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(name);
  };

  const onFormDataInput = (e, name) => {
    let queryString = "";
    if (name == "publishedBy") {
      setFormData((prevState) => ({
        ...prevState,
        PublisherName: e.target.innerText,
      }));
      queryString = queryString + `[publisher_name]=${e.target.innerText}`;
      setNewQueryString(queryString);
    } else if (name == "TopicName") {
      setFormData((prevState) => ({
        ...prevState,
        TopicName: e.target.innerText,
      }));
      queryString = queryString + `[topic_name]=${e.target.innerText}`;
      setNewQueryString(queryString);
    } else if (name == "Place") {
      setFormData((prevState) => ({
        ...prevState,
        Place: e.target.innerText,
      }));
      queryString = queryString + `[place]=${e.target.innerText}`;
      setNewQueryString(queryString);
    } else if (name == "Country") {
      setFormData((prevState) => ({
        ...prevState,
        Country: e.target.innerText,
      }));
      queryString = queryString + `[country]=${e.target.innerText}`;
      setNewQueryString(queryString);
    } else if (name == "Subject1") {
      setFormData((prevState) => ({
        ...prevState,
        Subject1: e.target.innerText,
      }));
      queryString = queryString + `[subject_1]=${e.target.innerText}`;
      setNewQueryString(queryString);
    } else if (name == "Subject2") {
      setFormData((prevState) => ({
        ...prevState,
        Subject2: e.target.innerText,
      }));
      queryString = queryString + `[subject_2]=${e.target.innerText}`;
      setNewQueryString(queryString);
    } else if (name == "Subject3") {
      setFormData((prevState) => ({
        ...prevState,
        Subject3: e.target.innerText,
      }));
      queryString = queryString + `[subject_3]=${e.target.innerText}`;
      setNewQueryString(queryString);
    } else if (name == "ReferenceId") {
      setFormData((prevState) => ({
        ...prevState,
        ReferenceId: e.target.innerText,
      }));
      queryString = queryString + `[reference_id]=${e.target.innerText}`;
      setNewQueryString(queryString);
    } else if (name == "Date") {
      setFormData((prevState) => ({
        ...prevState,
        Date: e.target.innerText,
      }));
      queryString = queryString + `[Date]=${e.target.innerText}`;
      setNewQueryString(queryString);
    }

    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions("");
  };

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

  const onSubmit = (data) => {
    // navigate("/readstory/storylist", { state: newQueryString });
    props.searchStory(newQueryString)
    // if (window.location.href = "/readstory/storylist") {
    //   console.log("window.location.href", window.location.href);
    // window.location.reload();
    props.closemodal();
    // }
  };
  const getStoryData = () => {
    axios
      .get(`${ApiUrl}getListStory`)
      .then((response) => {
        // console.log("response.data.data" , response.data.data);
        setStoryData(response.data.data);
        setAllPublisedBy(
          response.data.data.map((x) => x.attributes.publisher_name)
        );
        setALLReferenceID(
          response.data.data.map((x) => x.attributes.reference_id)
        );
        setAllTopic(response.data.data.map((y) => y.attributes.topic_name));
        setAllPlace(response.data.data.map((z) => z.attributes.place));
        setAllCountry(response.data.data.map((p) => p.attributes.country));
        setAllSubject1(response.data.data.map((p) => p.attributes.subject_1));
        setAllSubject2(response.data.data.map((p) => p.attributes.subject_2));
        setAllSubject3(response.data.data.map((p) => p.attributes.subject_3));
        setAllDate(response.data.data.map((p) => p.attributes.published_at));
      })
      .catch((error) => {
        console.log("error in fetching Data", error);
      });
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
  }
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/readstory/storylist");

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

  // if (!props.imagesPreloaded) return <Loader></Loader>;
  return (
    <>
    
        <div className=" readstory_background read_story_mobile">
          <Header />
          <div className="middle readstory_middle">
            <div className="B1"></div>
            <div className="B2 cards">
              <div>
                <div className="readstory-body-container readStoryNew">
                  <div
                    role="document"
                    className="modal-dialog modal-dialog-centered readastory-modal-dialog border-style-8"
                  >
                    <div className="modal-content">
                      <a
                        onClick={() => { props.closemodal() }}
                        href="#"
                        // routerlink="/storylist2"
                        className="close-button-style-read"
                      >
                        <span></span>
                      </a>
                      <form
                        noValidate=""
                        onSubmit={handleSubmit(onSubmit)}
                        className="ng-pristine ng-valid ng-touched"
                      >
                        <div className="btn-cmn-group writestory_mobile_top d-block d-md-none d-lg-none">
                          <button
                            type="submit"
                            className="btn-apply read-btn-bg cmn-submit-button"
                          >
                            <span></span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className="row custom-field-row row-align">
                            <div className="col-md-12 custom-field-col">
                              <div className="row custom-field-row rab-flex-direction">

                                {/* <div className="col-md-6 custom-field-col">

                                </div> */}
                                <div className="col-md-12 custom-field-heading cmn-title-head text-center">
                                  <h2>
                                    {" "}
                                    {t('SUBMIT')}
                                  </h2>
                                </div>
                              </div>
                            </div>

                            {/* <div className="col-md-4 custom-field-col">


                            </div> */}



                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  // formcontrolname="topic"
                                  placeholder={t('Topic')}
                                  className="form-control ng-pristine ng-valid ng-touched"
                                  value={
                                   input.TopicName
                                  }
                                  onClick={(e) =>
                                    onFormDataInput(e, "TopicName")
                                  }
                                  onChange= {(e) => {
                                    setNewQueryString(`[topic_name]=${e.target.value}`);
                                  }}
                                  // onChange={(e) =>
                                  //   onChange(e, allTopic, "TopicName")
                                  // }
                                />
                                {/* {!input.TopicName && !formData.TopicName &&
                                  <p
                                    className="placeHolder text-white"
                                    style={{
                                      position: "absolute",
                                      top: "10px",
                                      left: "8px",
                                      bottom: "",
                                    }}
                                  >
                                    {t('Topic')}
                                  </p>
                                } */}

                                {showSuggestions == "TopicName" &&
                                  input.TopicName && (
                                    <SuggestionsListComponent
                                      name={"TopicName"}
                                    />
                                  )}
                              </div>
                            </div>

                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  placeholder={t('Published BY')}
                                  formcontrolname="published_by"
                                  //placeholder={}
                                  className="form-control ng-pristine ng-valid ng-touched"
                                  // value={
                                  //   formData.PublisherName
                                  //     ? formData.PublisherName
                                  //     : input && input.publishedBy
                                  // }
                                  value={
                                   input.publishedBy
                                  }
                                  onClick={(e) =>
                                    onFormDataInput(e, "publishedBy")
                                  }
                                  onChange= {(e) => {
                                    setNewQueryString(`[publisher_name]=${e.target.value}`);
                                  }}
                                  // onChange={(e) =>
                                  //   onChange(
                                  //     e,
                                  //     allPublishedBy,
                                  //     "publishedBy"
                                  //   )
                                  // }

                                />
                                {/* {!input.publishedBy && !formData.PublisherName &&
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
                                } */}
                                {showSuggestions == "publishedBy" &&
                                  input.publishedBy && (
                                    <SuggestionsListComponent
                                      name={"publishedBy"}
                                    />
                                  )}
                              </div>
                            </div>

                            <div className="col-md-4 custom-field-col">
                              <div className="form-group select-custom-field">
                                <select
                                  formcontrolname="language_id"
                                  {...register("Language")}
                                  className="form-control ng-pristine ng-valid ng-touched"
                                  value={currentLanguageSetting}
                                  onChange={(e) => { localStorage.setItem("prefered_language", e.target.value) }}
                                >

                                  {
                                    !currentLanguage ? (<option value="">Language</option>) : null
                                  }

                                  {/* <option value="">{langText?langText:"Language"}</option> */}
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
                            </div>



                            <div className="col-md-4 custom-field-col">
                              <div className="form-group select-custom-field">
                                {/* <CountryDropdown
                                  className="form-control ng-untouched ng-pristine ng-invalid"
                                  defaultOptionLabel="country"
                                  value={country}
                                  onChange={selectCountry} /> */}
                                <select
                                  formcontrolname="country"
                                  className="form-control ng-untouched ng-pristine ng-invalid"
                                  onChange={(e) => {
                                    setCountry(JSON.parse(e.target.value));
                                  }}
                                // value={countryText}
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
                                {/* <select
                                  formcontrolname="city"
                                  className="form-control ng-untouched ng-pristine ng-invalid"
                                >
                                  <option value="">{cityText ? cityText : "City"}</option>
                                  {City.getCitiesOfCountry(
                                    country && country.isoCode
                                  ).map((x, index) => {
                                    return (
                                      <option key={index} value={x.name}>{x.name}</option>
                                    );
                                  })}
                                </select> */}
                              </div>
                            </div>
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  placeholder={t('Place')}
                                  // formcontrolname="place"
                                  className="form-control ng-pristine ng-valid ng-touched"
                                  value={
                                    formData.Place
                                      ? formData.Place
                                      : input.Place
                                  }
                                  onClick={(e) => onFormDataInput(e, "Place")}
                                  onChange={(e) =>
                                    onChange(e, allPlace, "Place")
                                  }
                                />
                                {/* {!input.Place && !formData.Place &&
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
                                } */}
                                {showSuggestions == "Place" && input && (
                                  <SuggestionsListComponent name={"Place"} />
                                )}
                              </div>
                            </div>




                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  // formcontrolname="subject_id"
                                  placeholder={t('Subject 1')}
                                  className="form-control ng-untouched ng-pristine ng-valid"
                                  value={
                                    formData.Subject1
                                      ? formData.Subject1
                                      : input.Subject1
                                  }
                                  onClick={(e) =>
                                    onFormDataInput(e, "Subject1")
                                  }
                                  onChange={(e) =>
                                    onChange(e, allSubject1, "Subject1")
                                  }
                                />
                                {/* {!input.Subject1 && !formData.Subject1 &&
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
                                } */}
                                {showSuggestions == "Subject1" && input && (
                                  <SuggestionsListComponent name={"Subject1"} />
                                )}
                              </div>
                            </div>
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  formcontrolname="subject_second"
                                  placeholder={t('Subject 2')}
                                  className="form-control ng-untouched ng-pristine ng-valid"
                                  value={
                                    formData.Subject2 ? formData.Subject2 : ""
                                  }
                                  onClick={(e) =>
                                    onFormDataInput(e, "Subject2")
                                  }
                                  onChange={(e) =>
                                    onChange(e, allSubject2, "Subject2")
                                  }
                                />
                                {/* {!input.Subject2 && !formData.Subject2 &&
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
                                } */}
                                {showSuggestions == "Subject2" && input && (
                                  <SuggestionsListComponent name={"Subject2"} />
                                )}
                              </div>
                            </div>
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field">
                                <input
                                  type="text"
                                  // formcontrolname="subject_third"
                                  placeholder={t('Subject 3')}
                                  className="form-control ng-untouched ng-pristine ng-valid"
                                  value={
                                    formData.Subject3 ? formData.Subject3 : ""
                                  }
                                  onClick={(e) =>
                                    onFormDataInput(e, "Subject3")
                                  }
                                  onChange={(e) =>
                                    onChange(e, allSubject3, "Subject3")
                                  }
                                />
                                {/* {!input.Subject3 && !formData.Subject3 &&
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
                                } */}
                                {showSuggestions == "Subject3" && input && (
                                  <SuggestionsListComponent name={"Subject3"} />
                                )}
                              </div>
                            </div>




                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field-2">
                                <div
                                  id="fromdatepickerRead"
                                  data-date-format={t('Date')}
                                  className="input-group date date-field"
                                >
                                  <input
                                    placeholder={t('Date')}
                                    type={dateType}
                                    onFocus={()=>{setDateType("date")}}
                                    // onBlur={()=>{setDateType("text")}}
                                    // id="modified"
                                    bsdaterangepicker=""
                                    formcontrolname="from_date"
                                    className="form-control ng-pristine ng-valid ng-touched calendar"
                                  />
  
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 d-none d-md-block d-lg-block custom-field-col">
                              <div className="btn-cmn-group">
                                <button
                                  type="submit"
                                  className="btn-apply read-btn-bg cmn-submit-button"
                                >
                                  <span></span>
                                </button>
                              </div>

                            </div>
                            <div className="col-md-4 custom-field-col">
                              <div className="form-group input-custom-field-2">
                                <input
                                  type="text"
                                  // placeholder="Reference Id"
                                  formcontrolname="reference_id"
                                  placeholder={t('Reference Id')}
                                  className="form-control ng-pristine ng-valid ng-touched"
                                  value={
                                    formData.ReferenceId
                                      ? formData.ReferenceId
                                      : input && input.ReferenceId
                                  }
                                  onClick={(e) =>
                                    onFormDataInput(e, "ReferenceId")
                                  }
                                  onChange={(e) =>
                                    onChange(e, ALLReferenceID, "ReferenceId")
                                  }
                                />
                                {/* {!input.ReferenceId && !formData.ReferenceId &&
                                  <p
                                    className="placeHolder text-white"
                                    style={{
                                      position: "absolute",
                                      top: "10px",
                                      left: "8px",
                                      bottom: "",
                                    }}
                                  >
                                    {t('Reference Id')}
                                  </p>
                                } */}
                                {showSuggestions == "ReferenceId" &&
                                  input.ReferenceId && (
                                    <SuggestionsListComponent
                                      name={"ReferenceId"}
                                    />
                                  )}
                              </div>

                            </div>



                          </div>

                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="continue-btn-group ">
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
            <div className="B3">
            </div>
          </div>
          {/* <Banner /> */}
        </div>
      
    </>
  );
};

export default ReadStory;
