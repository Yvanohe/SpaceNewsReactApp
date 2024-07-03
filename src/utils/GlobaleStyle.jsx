import { createGlobalStyle } from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../services/providers/theme'
import colors from './colors'


const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }

    a {
      text-decoration: none;
    }


    body {
        background-color: ${(props) =>
    props.isDarkMode ? colors.backgroundDark : 'white'};


        color: ${(props) => props.isDarkMode ? 'white' : 'black'};

    }
`

function GlobalStyle() {
  const { theme } = useContext(ThemeContext)

  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle
