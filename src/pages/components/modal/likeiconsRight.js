import axios from "axios";
import React, { useEffect, useState } from "react";
import { ApiUrl } from "../../../config/config";
import "./likeicon.css";

import Like from "../../../assets/images/like-icon.svg";
import OK from "../../../assets/images/ok-icon.svg";
import Finance from "../../../assets/images/truthicon2.png";
import Emoji from "../../../assets/images/confused.png";
import Dislike from "../../../assets/images/dislike-icon.svg";
import Post from "../../../assets/images/post-icon-big.svg";

const LikeIcon = ({ listStoryId, data }) => {

    const [summation, setSummation] = useState();
    const [likeIconDetails, setLikeIconDetails] = useState();
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLikeed, setLiked] = useState("like");
    const [emotion, setEmotions] = useState({
        like: 0,
        dislike: 0,
        isEmoted: ""
    });
    useEffect(() => {
        likeIconData();
        localStorage.removeItem('likeByUser')
        localStorage.removeItem('liaredByUser')
    }, []);
    useEffect(() => {
        updateCount();
    }, []);


    const likeIconData = () => {
        axios.get(`${ApiUrl}getListStoryById/${listStoryId}`).then((result) => {
            console.log((result.data));
            setLikeIconDetails(result.data.list);
        });
    };

    const updateCount = (count = 1) => {
        axios.get(`${ApiUrl}getListStoryById/${listStoryId}`).then((result) => {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, {
                    summation: result?.data?.list[0]?.summation
                        ? result?.data?.list[0]?.summation + 1
                        : 1
                })
                .then((result) => {
                    likeIconData();
                    // setSummation(result.data.list[0].summation);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    };

    const getIsliked = (name) => { };

    const onEventChange = (event, count, name, secondcount) => {
        console.log(event);
        console.log(count);
        console.log(name);
        console.log(secondcount);

        setIsDisabled(true)
        event.preventDefault();
        getIsliked(name);
        let isStoryLikedByUser = localStorage.getItem("likeByUser");
        let isliarUser = localStorage.getItem("liaredByUser");
        if (!isStoryLikedByUser && name == "like") {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, { [name]: count + 1 })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem("likeByUser", "liked");
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (!isStoryLikedByUser && name == "dislike") {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, { [name]: count + 1 })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem("likeByUser", "disliked");
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (isStoryLikedByUser == "liked" && name == "dislike") {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, {
                    [name]: count + 1,
                    like: secondcount.like - 1
                })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem("likeByUser", "disliked");
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (isStoryLikedByUser == "disliked" && name == "like") {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, {
                    [name]: count + 1,
                    dislike: secondcount.dislike - 1
                })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem("likeByUser", "liked");
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }




        if (!isliarUser && name == 'liar') {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, { [name]: count + 1 })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem('liaredByUser', "liared")
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (!isliarUser && name == 'ok') {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, { [name]: count + 1 })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem('liaredByUser', "Ok")
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (!isliarUser && name == 'finance') {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, { [name]: count + 1 })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem('liaredByUser', "financed")
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (isliarUser == "liared" && name == "finance") {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, {
                    [name]: count + 1,
                    liar: secondcount.liar > 0 ? secondcount.liar - 1 : 0
                })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem("liaredByUser", "financed");
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (isliarUser == "liared" && name == "ok") {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, {
                    [name]: count + 1,
                    liar: secondcount.liar > 0 ? secondcount.liar - 1 : 0
                })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem("liaredByUser", "ok");
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (isliarUser == "financed" && name == "liar") {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, {
                    [name]: count + 1,
                    finance: secondcount.finance > 0 ? secondcount.finance - 1 : 0
                })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem("liaredByUser", "liared");
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (isliarUser == "financed" && name == "ok") {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, {
                    [name]: count + 1,
                    finance: secondcount.finance > 0 ? secondcount.finance - 1 : 0
                })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem("liaredByUser", "ok");
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (isliarUser == "ok" && name == "liar") {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, {
                    [name]: count + 1,
                    ok: secondcount.ok > 0 ? secondcount.ok - 1 : 0
                })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem("liaredByUser", "liared");
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (isliarUser == "ok" && name == "finance") {
            axios
                .put(`${ApiUrl}updateListStory/${listStoryId}`, {
                    [name]: count + 1,
                    ok: secondcount.ok > 0 ? secondcount.ok - 1 : 0
                })
                .then((result) => {
                    likeIconData();
                    setEmotions({ ...emotion, like: true, dislike: false });
                    localStorage.setItem("liaredByUser", "liared");
                    setIsDisabled(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }


    };

    let story = likeIconDetails;

    return (
        <>
            <app-left-panel>
                <div className="E1 E1S">
                    <div className="help-icon">
                        <div className="likeCount1">
                        <span className="d-block d-md-none d-lg-none">
                                {likeIconDetails &&
                                    likeIconDetails.map((x , index) => {
                                        return <h5 key={index} className="count">{x.like ? x.like : 0 }</h5>;
                                    })}
                            </span>
                            <div className="like-icon-border ">
                                <div
                                    className="like-icon-back"
                                    disabled={isDisabled ? true : false}
                                    onClick={(event) =>
                                        onEventChange(
                                            event,
                                            likeIconDetails[0].like,
                                            "like",
                                            likeIconDetails[0]
                                        )
                                    }
                                >
                                    <img className="icon iconbook" src={Like} />
                                </div>
                            </div>
                            <span className="mx-2 d-md-block d-lg-block d-none">
                                {likeIconDetails &&
                                    likeIconDetails.map((x , index) => {
                                        return <h5 key={index} className="count">{x.like ? x.like : 0 }</h5>;
                                    })}
                            </span>
                        </div>
                    </div>

                    <div className="help-icon">
                        <div className="likeCount1">
                            <div className="like-icon">
                                <div className="like-icon-back-sum">
                                    <img style={{ marginRight: "9px" }} className="icon iconSum iconbook" src={Post} />
                                </div>
                            </div>
                            <div className="mx-2">
                                {likeIconDetails &&
                                    likeIconDetails.map((x , index) => {
                                        return (
                                            <h5 key={index} className="count" >
                                                {x.summation}
                                            </h5>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    <div className="help-icon">
                        <div className="likeCount1 ">
                        <span className="d-block d-md-none d-lg-none">
                                {likeIconDetails &&
                                    likeIconDetails.map((x , index) => {
                                        return <h5 key={index} className="count">{x.dislike ? x.dislike : 0}</h5>;
                                    })}
                            </span>
                            <div className="like-icon-border">
                                <div className="like-icon-back" disabled={isDisabled ? true : false}>
                                    <img
                                        className="icon iconbook"
                                        src={Dislike}
                                        onClick={(event) =>
                                            onEventChange(
                                                event,
                                                likeIconDetails[0].dislike,
                                                "dislike",
                                                likeIconDetails[0]
                                            )
                                        }
                                        alt="img"
                                    />
                                </div>
                            </div>
                            <span className="mx-2 d-md-block d-lg-block d-none">
                                {likeIconDetails &&
                                    likeIconDetails.map((x , index) => {
                                        return <h5 key={index} className="count">{x.dislike ? x.dislike : 0}</h5>;
                                    })}
                            </span>
                        </div>
                    </div>

                </div>
            </app-left-panel>
        </>
    );
};
export default LikeIcon;
