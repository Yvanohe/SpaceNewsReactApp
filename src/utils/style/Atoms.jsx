import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import colors from './colors'


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`

export const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-top : 30px;
  padding-bottom: 30px;
  color : ${(props) => props.theme === 'light' ? 'black' : colors.primary}
`


export const StyledLink = styled(Link)`
  padding: 10px 15px;
  color:  ${colors.primary} ;
  text-decoration: none;
  font-size: 28px;
  text-align: center;
  &:hover{
    text-shadow: 1px 1px 2px ${colors.primary};
    }

`