import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion';

const Location = ({ city, country }) => {
   


  
    return (
      <Container>
        <City >{city}</City>
        <Country>{country}</Country>
      </Container>
    );
}
 
export default Location;

    const Container = styled.div`
      text-align: center;
    `;


    const City = styled.h1`
      font-family: "Merriweather", sans-serif;
      font-size: 2.5em;
      allign-items: baseline;
      cursor: pointer;
      &: hover {
        top: -5px;
      }
    `;
    const Country = styled.h3`
      font-family: "Merriweather", sans-serif;
      font-size: 1.1rem;
    `;