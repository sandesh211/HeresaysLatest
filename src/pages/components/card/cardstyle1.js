import React, { useEffect, useState } from 'react';
import './cardstyle.css'
import Rotate from 'react-reveal/Rotate';
const CardStyle1 = ({images,setSendModalName,popUpOpen}) => {

    return (
        
        <div className="card-container"  >
            {
                images.map((x,index)=>{
      
                    return(
                        <Rotate {...x.transition}>
                            <div
                            // style={{marginTop:x.marginTop,height:x.height}} 
                            className="card-image" onClick={()=>{popUpOpen(x.name)}}>
                            <img src={x.image} alt="" key={index}  style={{maxWidth:"100%"}}  data-aos={x.transition} />
                            </div>
 
                
                     </Rotate>  
                    )
                })
            }
         
        </div>
  
      
    )
}

export default CardStyle1;