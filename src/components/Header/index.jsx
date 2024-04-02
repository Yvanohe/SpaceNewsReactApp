import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import styled from "styled-components";
import { useContext } from 'react'
import { ThemeContext } from "../../utils/context";
import colors from '../../utils/style/colors'



const StyledLink = styled(Link)`
  padding: 10px 15px;
  color:  ${colors.primary} ;
  text-decoration: none;
  font-size: 28px;
  text-align: center;
  &:hover{
    text-shadow: 1px 1px 2px ${colors.primary};
    }

`

//styled component for logo :
const LogoImg = styled.img`
width : 100px;
height : 100px;
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
    //Use Context to get theme (light or dark) :
    const { theme } = useContext(ThemeContext);

    //using bootstrap nav bar :
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
                            <li className="nav-item active"><StyledLink to="/">Latest news</StyledLink></li>
                            <li className="nav-item"><StyledLink to="/search">Search a news</StyledLink></li>
                            <li className="nav-item"><StyledLink to="/launches">Futures launches</StyledLink></li>
                            <li className="nav-item"><StyledLink to="/favorites">My favorites</StyledLink></li>
                        </ul>
                    </div>
                </div>
            </NavBar>
        </HeaderContainer>
    )
}

export default Header