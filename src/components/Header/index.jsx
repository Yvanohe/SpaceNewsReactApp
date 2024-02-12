import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import styled from "styled-components";
import { StyledLink } from '../../utils/style/Atoms'
import { useContext } from 'react'
import { ThemeContext } from "../../utils/context";
import colors from '../../utils/style/colors'





//styled component for logo :
const LogoImg = styled.img`
width : 120px;
height : 120px;
`

const HeaderContainer = styled.header`
height : 150px;
border: "2px solid black";
`

const NavBar = styled.nav`
position : fixed ;
top:0;
right : 0;
left : 0;
z-index:1030;
background-color : ${(props) => props.theme === 'light' ? colors.backgroundLightSecondary : colors.backgroundDarkSecondary};

`
function Header() {

    const { theme } = useContext(ThemeContext);


    return (
        <HeaderContainer >
            <NavBar className='navbar navbar-expand-md' theme={theme}>
                <div className="container-xxl">
                    <Link to="/" className="navbar-brand py-0"><LogoImg src={logo} alt="logo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active"><StyledLink to="/">Home</StyledLink></li>

                            <li className="nav-item"><StyledLink to="/search">Search a news</StyledLink></li>
                            <li className="nav-item"><StyledLink to="/launch">Futures launches</StyledLink></li>
                            <li className="nav-item"><StyledLink to="/favorites">My favorites</StyledLink></li>
                        </ul>
                    </div>
                </div>
            </NavBar>
        </HeaderContainer>
    )
}

export default Header