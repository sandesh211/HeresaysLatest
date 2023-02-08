import axios from "axios";
import React, { useEffect, useState } from "react";
import { ApiUrl } from "../../../config/config";
import "./likeicon.css";

import Post from "../../../assets/images/post-icon-big.svg";

const PostDetails = ({ listStoryId, data }) => {
  useEffect(() => {
    postDetailData();
  }, []);
  const [postIconDetails, setPostIconDetails] = useState();
  const [publisherName, setPublisherName] = useState();
  const [authorList, setAuthorList] = useState();
  const [topicList, setTopicList] = useState();
  const postDetailData = () => {
    axios.get(`${ApiUrl}getListStoryById/${listStoryId}`).then((result) => {
      setPostIconDetails(result.data.list);
      setPublisherName(result.data.list[0].publisher_name);
      axios.get(`${ApiUrl}getPublisherPostCount`)
      .then((result2)=>{
      
        setAuthorList(result2.data.filter(x=>x.publisher_name==result.data.list[0].publisher_name))
      })
      axios.get(`${ApiUrl}getTopicPostCount`)
      .then((result3)=>{
        setTopicList(result3.data.filter(x=>x.topic_name==result.data.list[0].topic_name))
      })

    });
  };
  return (
    <>
      <app-subheader-panel>
        <div className="postdetails pus-titles">
          <div className="storydetails">

                  {postIconDetails &&
                    postIconDetails.map((x,i) => {
                      return <div>
                      <div className="img-post-view"> 
                      <img className="sigma" src={Post}  alt="img"/>
                      <h6><span className="sigmaCount">{topicList && topicList[0]&& topicList[0].count&& topicList[0].count}</span> Posts</h6>
                      </div>
                      <h5 className="postcount">{x.topic_name}</h5> </div>;
                    })}
                 
              </div>
              {
                console.log("topicList[0].count" , topicList && topicList[0]&& topicList[0].count&& topicList[0].count)
              }
         
              <div id="bypara" className="by-title">
                
                <span>By <br></br>
                  {postIconDetails &&
                    postIconDetails.map((x) => {
                      return <b>{x.publisher_name}</b>;
                    })}
                </span>
                </div>
                

        </div>
      </app-subheader-panel>
    </>
  );
};
export default PostDetails;
