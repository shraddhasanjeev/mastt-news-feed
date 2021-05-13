import React,{useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion';

const Location = ({ city, country,getWeather }) => {
    const [query, setQuery] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const inputRef = useRef("");

  useEffect(() => {
    if (inputMode) {
      inputRef.current.focus();
    }
  }, [inputMode]);


  if (inputMode) {
    return (
      <Container>
        <motion.div initial={{opacity:0}} animate={{opacity:1}}>
          <FormElement
            onSubmit={(e) => {
              e.preventDefault();
              getWeather(query);
            }}
          >
            <InputField
              ref={inputRef}
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchButton type="submit">Change</SearchButton>
            <CloseButton onClick={() => setInputMode(false)}>X</CloseButton>
          </FormElement>
        </motion.div>
      </Container>
    );
  }
  
    return (
      <Container>
        <City onClick={() => setInputMode(true)}>{city}</City>
        <Country>{country}</Country>
      </Container>
    );
}
 
export default Location;

    const Container = styled.div`
      text-align: center;
    `;
const FormElement = styled.form`
display: flex;
position: relative;
background: white;
border-radius:10px;
`;
const InputField = styled.input`
  padding: 5px;
  width: 80px;
  background: transparent;
  color: black;
  border: none;
  &:focus {
    outline: 0;
  }
`;
const SearchButton = styled.button`
  padding: 4px;
  background: Blue;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color:white;
  cursor:pointer;
`;
const CloseButton = styled.span`
  font-size: 0.8em;
  position: absolute;
  background: yellow;
  top: -5px;
  right: -15px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color:blue;
`;
    const City = styled.h1`
      font-family: "Merriweather", sans-serif;
      font-size: 2.2em;
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