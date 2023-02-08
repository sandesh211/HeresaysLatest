import React, { useEffect, useState } from 'react';
import './cardstyle2.css'
import Rotate from 'react-reveal/Rotate';
const CardStyle2 = ({images,setSendModalName,popUpOpen}) => {

    return (
        
        <div className="card-container"  >
            {
                images.map((x,index)=>{
      
                    return(
                        <Rotate {...x.transition}>
                            <div
                            className="card-image2" onClick={()=>{popUpOpen(x.name)}}>
                            <img src={x.image} alt="" key={index}  style={{maxWidth:"100%"}}  data-aos={x.transition} />
                            </div>
 
                
                     </Rotate>  
                    )
                })
            }
         
        </div>
  
      
    )
}

export default CardStyle2;