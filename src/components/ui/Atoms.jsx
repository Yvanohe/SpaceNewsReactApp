import styled, { keyframes } from 'styled-components'
import colors from '../../utils/colors'


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
  color : ${(props) => props.theme === 'light' ? 'black' : colors.primary};
`

export const StyledAnchor = styled.a`
text-decoration : none;
color : ${(props) => props.theme === 'light' ? 'black' : colors.primary};
`
