
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../../config/config'
import {Translator, Translate} from 'react-auto-translate';
const SocialIcons =({props,social,setShowSocialModal,setSocialUrl})=>{
const[SocialData,setSocialData]=useState()

useEffect(()=>{
axios.get(`${ApiUrl}social?populate=*`).then((result)=>{
    setSocialData(result.data.data&&result.data.data.attributes&&result.data.data.attributes.socialata)
})
},[])


return(
    <>
      <app-right-panel>
              <div className="socials-icon-bar">
                <span><Translate>Follow Us</Translate> </span>
                <a
                  onClick={() => {
                    setShowSocialModal(true);
                    setSocialUrl(SocialData&&SocialData[0].RedirectLink)
                  }}
                  data-toggle="modal"
                  data-target="#SocialLoginModal"
                >
                  <i aria-hidden="true" className="facebook-icon"></i>
                </a>
                <a
                  data-toggle="modal"
                  onClick={() => {
                    setShowSocialModal(true);
                    setSocialUrl(SocialData&&SocialData[1].RedirectLink)

                  }}
                  data-target="#SocialLoginModal"
                >
                  <i aria-hidden="true" className="analytics-icon"></i>
                </a>
                <a
                  onClick={() => {
                    setShowSocialModal(true);
                    setSocialUrl(SocialData&&SocialData[2].RedirectLink)
                  }}
                  data-toggle="modal"
                  data-target="#SocialLoginModal"
                >
                  <i aria-hidden="true" className="linkedin-icon"></i>
                </a>
                <a
                  onClick={() => {
                    setShowSocialModal(true);
                    setSocialUrl(SocialData&&SocialData[3].RedirectLink)
                  }}
                  data-toggle="modal"
                  data-target="#SocialLoginModal"
                >
                  <i aria-hidden="true" className="twitter-icon"></i>
                </a>
                <a
                  onClick={() => {
                    setShowSocialModal(true);
                    setSocialUrl(SocialData&&SocialData[4].RedirectLink)
                  }}
                  data-toggle="modal"
                  data-target="#SocialLoginModal"
                >
                  <i aria-hidden="true" className="instagram-icon"></i>
                </a>
              </div>
            </app-right-panel>
    </>
)
}
export default SocialIcons;