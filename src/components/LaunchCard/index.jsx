import styled from "styled-components"
import { reformateDate } from "../../utils/tools"
import { useContext } from 'react'
import { ThemeContext } from "../../utils/context";
import colors from "../../utils/style/colors";


const CardLink = styled.a`
text-decoration : none;
color : black;
color : ${(props) => props.theme === 'light' ? 'black' : colors.primary};


`

const StyledCard = styled.div`
width: 18rem;
height: 44rem;
box-shadow: 2px 2px 5px ${(props) => props.theme === 'light' ? '#e2e3e9' : colors.backgroundDarkSecondary};
background-color : ${(props) => props.theme === 'light' ? 'white' : colors.backgroundDarkSecondary};
&:hover {
  box-shadow: 2px 2px 10px ${(props) => props.theme === 'light' ? '#e2e3e9' : colors.backgroundDarkSecondary};
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



function LaunchCard({ id, name, agenceName, rocketName, url, image_url, missionDescription, net, statusName, statusId }) {

  const { theme } = useContext(ThemeContext);

  function getTectColorFromStatus(statusId) {

    switch (statusId) {
      case 1:

        return 'green'
      case 3:
        return 'green'
      case 4:
        return 'red'
      case 5:
        return 'orange'
      case 6:
        return 'green'
      case 7:
        return 'red'
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
        <CardLink theme={theme} href={url}><h4>{reformateDate(net)}</h4></CardLink>
      </CardHeader>
      <CardLink href={url}><CardImg src={image_url} className="card-img-top" alt={name} /></CardLink>
      <ul className="list-group list-group-flush ">
        <StyledListItem theme={theme} className="list-group-item "><strong>Agency name</strong> : {agenceName}</StyledListItem>
        <StyledListItem theme={theme} className="list-group-item"><strong>Rocket name</strong> : {rocketName}</StyledListItem>
      </ul>
      <div className="card-body">
        <CardLink href={url}>
          <CardTitle className="card-title">{name}</CardTitle>
          <CardSummary className="card-text" >{missionDescription}</CardSummary>
        </CardLink>
      </div>
      <CardFooter className="card-footer" color={getTectColorFromStatus(statusId)}>
        <strong>{statusName}</strong>
      </CardFooter>
    </StyledCard>
  )




}

export default LaunchCard