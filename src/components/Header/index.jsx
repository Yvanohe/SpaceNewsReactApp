import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import styled from "styled-components";
import { StyledLink } from '../../utils/style/Atoms'


//styled component for logo :
const LogoImg = styled.img`
width : 80px;
height : 80px;
`

const HeaderContainer = styled.header`
height : 100px;
`

function Header() {

    return (
        <HeaderContainer style={{ border: "2px solid black", height: '100px' }}>
            <nav className='navbar navbar-expand-md bg-light fixed-top'>
                <div className="container-xxl">
                    <Link to="/" className="navbar-brand py-0"><LogoImg src={logo} alt="logo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active"><StyledLink to="/search">Search a news</StyledLink></li>
                            <li className="nav-item"><StyledLink to="/launch">Futures launches</StyledLink></li>
                            <li className="nav-item"><StyledLink to="/favorites">My favorites</StyledLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </HeaderContainer>
    )
}

export default Header