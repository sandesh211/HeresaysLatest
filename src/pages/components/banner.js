import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Rotate from 'react-reveal/Rotate';
import { ApiUrl } from '../../config/config';
import ReactHtmlParser from "react-html-parser";
import SocialIcons from './modal/socialIcons';
import "../../pages/components/modal/banner.css"

const Banner = ({images,setSendModalName,popUpOpen,style}) => {
    const [socialUrl, setSocialUrl] = useState(false);

    const [addBannerStoryData, setAddBannerStoryData] = useState();
    const getAddBannerData = () => {
      axios.get(`${ApiUrl}getBanner`).then((result) => {
          
          setAddBannerStoryData(result.data.data.filter(x=>x.attributes.published_at!=null))
      })
  }
  useEffect(()=>{
    getAddBannerData();
  },[])

    return (
        
        <div className='footer'>
            <app-footer-panel>
                <div className="bottom-wrapper bottom-wrapper-position" style={style}>
                  <div className="google-ads-wrap ng-star-inserted">
                    {ReactHtmlParser( addBannerStoryData &&addBannerStoryData[Math.floor(Math.random()*addBannerStoryData.length)]&& addBannerStoryData[Math.floor(Math.random()*addBannerStoryData.length)].attributes && addBannerStoryData[Math.floor(Math.random()*addBannerStoryData.length)].attributes.textfield)}
                  </div>
                </div>
              </app-footer-panel>
         
        </div>
  
      
    )
}

export default Banner;