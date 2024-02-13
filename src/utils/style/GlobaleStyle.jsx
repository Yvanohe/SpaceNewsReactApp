import { createGlobalStyle } from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../context'
import colors from '../../utils/style/colors'


const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }

    a {
      text-decoration: none;
    }


    html, body {
        background-color: ${(props) =>
    props.isDarkMode ? colors.backgroundDark : 'white'};
    min-height:100%; 

        color: ${(props) => props.isDarkMode ? 'white' : 'black'};

    }
`

function GlobalStyle() {
  const { theme } = useContext(ThemeContext)

  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle
