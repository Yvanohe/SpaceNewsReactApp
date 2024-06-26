import styled from "styled-components"
import { reformateDate } from "../../utils/tools"
import { useContext } from 'react'
import { Link } from "react-router-dom"
import { ThemeContext } from "../../utils/context";
import colors from "../../utils/style/colors";
import PropTypes from 'prop-types'
import { StyledAnchor } from "../../utils/style/Atoms";

//NOT USED ANYMORE

//Styled Components---------------------------------------
const StyledCard = styled.div`
width: 18rem;
height: 44rem;
box-shadow: 2px 2px 5px ${(props) => props.theme === 'light' ? '#e2e3e9' : colors.backgroundDarkSecondary};
background-color : ${(props) => props.theme === 'light' ? 'white' : colors.backgroundDarkSecondary};
&:hover {
  box-shadow: 2px 2px 10px ${(props) => props.theme === 'light' ? '#e2e3e9' : colors.backgroundDarkSecondary};
}

@media (max-width:768px) {
    height: 20rem;
}

`

const CardHeader = styled.div`
display : flex;
justify-content : space-between;
`

//Style to truncate text after 6 lines : 
const CardSummary = styled.p`
overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5; 
  -webkit-box-orient: vertical;

  @media (max-width:768px) {
    display:none;
}
  
`
const CardTitle = styled.h5`
overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;      
`

const CardImg = styled.img`
width : 100%;
height : 250px;
`

const StyledLink = styled(Link)`
text-decoration : none;
color : ${(props) => props.theme === 'light' ? 'black' : colors.primary};
`

const StyledListItem = styled.li`
background-color : ${(props) => props.theme === 'light' ? 'white' : colors.backgroundDarkSecondary};
color : ${(props) => props.theme === 'light' ? 'black' : colors.primary};
${(props) => props.theme === 'dark' && `
border-color : #121E28;
`}
`
const CardFooter = styled.div`
color : ${(props) => (props.color)};
`
//------------------------------------------------------------------------

function LaunchCard({ id, name, agenceName, rocketName, url, image_url, missionDescription, net, statusName, statusId }) {

  const { theme } = useContext(ThemeContext);

  const getTextColorFromStatus = function (statusId) {
    switch (statusId) {
      case 1:
      case 3:
      case 6:
        return 'green'
      case 4:
      case 7:
        return 'red'
      case 5:
        return 'orange'
      default:
        if (theme === 'light') {
          return 'black'
        } else {
          return colors.primary
        }
    }
  }

  return (

    <StyledCard className="card" theme={theme}>
      <CardHeader className="card-header">
        <StyledAnchor theme={theme} href={"/launch/" + id} data-toggle="tooltip" data-placement="top" title="See launch details"><h4>{reformateDate(net)}</h4></StyledAnchor>
      </CardHeader>
      <div className="d-none d-md-block"><StyledLink to={"/launch/" + id} data-toggle="tooltip" data-placement="top" title="See launch details"><CardImg src={image_url} className="card-img-top" alt={name} /></StyledLink></div>
      <ul className="list-group list-group-flush ">
        <StyledListItem theme={theme} className="list-group-item "><StyledAnchor href={url} theme={theme} target='_blank' data-toggle="tooltip" data-placement="top" title="See agency website"><strong>Agency name</strong> : {agenceName}</StyledAnchor></StyledListItem>
        <StyledListItem theme={theme} className="list-group-item"><strong>Rocket name</strong> : {rocketName}</StyledListItem>
      </ul>
      <div className="card-body">
        <StyledLink to={"/launch/" + id} theme={theme} data-toggle="tooltip" data-placement="top" title="See launch details">
          <CardTitle className="card-title">{name}</CardTitle>
          <CardSummary className="card-text" >{missionDescription}</CardSummary>
        </StyledLink>
      </div>
      <CardFooter className="card-footer" color={getTextColorFromStatus(statusId)}>
        <strong>{statusName}</strong>
      </CardFooter>
    </StyledCard>
  )
}

LaunchCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  rocketName: PropTypes.string,
  url: PropTypes.string,
  image_url: PropTypes.string,
  missionDescription: PropTypes.string,
  net: PropTypes.string,
  statusName: PropTypes.string,
  statusId: PropTypes.number,

}

LaunchCard.defaultProps = {
  name: "mission name not available",
  rocketName: "rocket name not available",
  url: 'https://www.google.fr',
  image_url: '../../assets/rocket_default_image.png',
  missionDescription: 'mission description not available',
  net: '2000-01-01',
  statusName: 'To Be Determined',
  statusId: 2,
}


export default LaunchCard