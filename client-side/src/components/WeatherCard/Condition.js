import React from 'react'
import styled from '@emotion/styled'
import Reel from 'react-reel'

const Condition = ({ temp, condition }) => {
 
    
    return (
      <>
        <div style={{ fontSize: "1.8em",gridColumn:"2/span 1",
      gridRow: "4/span 1", }}>
          <Reel theme={reelStyle} text={`${temp}°C`} duration={3000}/>
          <State>{condition}</State>
        </div>
      </>
    );
}
 

export default Condition;


    const State = styled.h3`
      font-family: "Merriweather", sans-serif;
        height: 0.1em;
         display: flex;
         align-items: flex-end;
         justify-content: center;
      
    `;

     const reelStyle = {
       reel: {
         
         height: "0.8em",
         fontSize:"35px",
         display: "flex",
         alignItems: "flex-end",
         overflowY: "hidden",
         justifyContent: "center",
       },
       group: {
         transitionDelay: "1",
         transitionTimingFunction: "ease-in-out",
         transform: "translate(0, 0)",
         
       },

       number: {
         height: "1em",
         fontFamily: "Merriweather",
         
       },
     };