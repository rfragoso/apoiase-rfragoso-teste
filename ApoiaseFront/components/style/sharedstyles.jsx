import React from 'react'
import styled from 'styled-components'
import {
  Box,
} from 'rebass/styled-components'
import { PT_Sans } from 'next/font/google';

/*const Container = styled.div`
  padding: 0 0.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 100vh;
  `*/

  const Container = (props) => {
    return(
    <Box
      sx={{
        mx: 'auto',
        px: 3,
        maxWidth: '1140px',
        width: '100%',
      }}
    >{ props.children }</Box>
    )}
    

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  margin: 0 0 1.5rem 0;
  line-height: 1.15;
  font-size: 2.5rem;
  text-decoration: none;
  color: #555555;
  font-family: ubuntu;
  font-weight: 500;

  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    &:hover,
    :focus,
    :active {
      text-decoration: underline;
    }
  }
`

const Description = styled.p`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
`
const CodeTag = styled.code`
  background: #fafafa;
  border-radius: 5px;
  margin: 0 0.75rem;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
`
const LabelForm = styled.label`
  color: #3d4749;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: ubuntu;
  font-weight: 500;
  color: #555555;
  

`
const InputForm = styled.input`
border-radius: 5px;
border: 1px solid #eaeaea;
display: block;
width: 100%;
padding: 8px;
font-size: inherit;
font-family: ubuntu;
font-weight: normal;
color: #555555;
background-color: #fcfcfc;
margin-bottom: 1rem;
`
const TextareaForm = styled.textarea`
border-radius: 5px;
border: 1px solid #eaeaea;
display: block;
width: 100%;
padding: 8px;
font-size: inherit;
height: 20vh;
font-family: ubuntu;
font-weight: normal;
color: #555555;
background-color: #fcfcfc;
`
const H2 = styled.h2`
color: #555555;
font-weight: 700;
margin: 0 0 .5rem 0;

font-size: 1.8rem;
`

const H3 = styled.h3`
color: #555555;
font-weight: 500;
margin: 1rem 0 .5rem 0;
border-bottom: 1px solid #eaeaea;
`
const P1 = styled.p`
color: #555555;
font-weight: normal;
margin: 0 0 .5rem 0;
`
const EditLink = styled.span`
a{
  background-color: #00d062;
  width: 100%;
  display: block;
  border-radius: 4px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  padding: 8px 0;
  text-align: center;
}

`
export { Container, Main, Title, Description, CodeTag, LabelForm, InputForm, TextareaForm, H2, H3, P1, EditLink }
