import React from 'react'
import styled from 'styled-components'
import {
  Box,
} from 'rebass/styled-components'

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
  margin: 0;
  line-height: 1.15;
  font-size: 2.5rem;
  text-decoration: none;
  color: #3d4749;

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
`
const InputForm = styled.input`
border-radius: 5px;
border: 1px solid #000;
display: block;
width: 100%;
padding: 8px;
font-size: inherit;
`
const TextareaForm = styled.textarea`
border-radius: 5px;
border: 1px solid #000;
display: block;
width: 100%;
padding: 8px;
font-size: inherit;
height: 20vh;
`
export { Container, Main, Title, Description, CodeTag, LabelForm, InputForm, TextareaForm }
