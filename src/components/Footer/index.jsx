import styled from "styled-components";
import colors from '../../utils/style/colors'
import { useContext } from 'react'
import { ThemeContext } from "../../utils/context";


const FooterContainer = styled.footer`
display: flex;
gap:5px;
flex-direction : column;
align-items : center;
justify-content : center;
padding-top: 15px;
background-color: ${(props) =>
        props.theme === 'light' ? colors.backgroundLightSecondary : colors.backgroundDarkSecondary};
position : fixed;
bottom:0;
right : 0;
left : 0; 
 z-index:1030;
`

const NightModeButton = styled.button`
background-color : transparent;
border: none;
cursor: pointer;
color : ${colors.secondary};
`

function Footer() {

    const { toggleTheme, theme } = useContext(ThemeContext);

    return (

        <div  >
            <FooterContainer theme={theme}>
                <NightModeButton onClick={() => toggleTheme()}>{theme === 'light' ? '☀️ Change to night mode ' : '🌙 Change to light mode '} </NightModeButton>
                <p>Yvan Lubac - Thanks to <a href="https://api.spaceflightnewsapi.net/v4/docs/" target='_blank'>Spaceflight News API</a></p>
            </FooterContainer>
        </div >

    )
}

export default Footer;