import { useState } from "react";
import { CardAdsData, CardData, CardInitialData } from "../../../constants/cardconstants";
import CardStyle1 from "../../components/card/cardstyle1";

import CrossIcon from '../../../assets/images/cross-icon-gradient.svg'
import BackArrowSmall from '../../../assets/images/back-arrow-gradient-small.png'
import CardStyle2 from "../../components/card/cardstyle2";


const AdsModal = ({setModalSettings,popUpOpen})=>{
 
  
    return(
        <>
                        
        <div  className="popUpSettings" onClick={()=>{
            setModalSettings(false)
        }}>
            <div style={{marginTop:"17.35%",cursor:"pointer",zIndex:99999}} >
                <div style={{
                    position:"absolute",
                    left:"79%",
                    
                    zIndex:"999999"
                }}>
                     <a  className="close-button-style"><span></span></a>
                </div>
            <CardStyle2 images={CardAdsData}   popUpOpen={popUpOpen}/>
            </div>
           
        </div>
        </>
    )
}
export default AdsModal;