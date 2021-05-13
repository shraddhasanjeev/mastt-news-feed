import React from 'react'
import styled from '@emotion/styled'
import Reel from 'react-reel'

const Condition = ({ temp, condition }) => {
 
    
    return (
      <>
        <div style={{ fontSize: "2em" }}>
          <Reel theme={reelStyle} text={`${temp}°C`} />
        </div>
        <State>{condition}</State>
      </>
    );
}
 

export default Condition;


    const State = styled.h3`
      font-family: "Merriweather", sans-serif;
      font-size: 1.2rem;
    `;

     const reelStyle = {
       reel: {
         lineHeight: "0.97em",
         height: "1.07em",
         display: "flex",
         alignItems: "flex-end",
         overflowY: "hidden",
         justifyContent: "center",
       },
       group: {
         height: "1.5em",
         transitionDelay: "1",
         transitionTimingFunction: "ease-in-out",
         transform: "translate(0, 0)",
       },

       number: {
         height: "1em",
         fontFamily: "Merriweather",
       },
     };