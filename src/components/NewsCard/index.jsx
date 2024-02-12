import styled from "styled-components"
import { reformateDate } from "../../utils/tools"
import { useContext } from 'react'
import { ThemeContext } from "../../utils/context";
import colors from "../../utils/style/colors";

const CardLink = styled.a`
text-decoration : none;
color : ${(props) => props.theme === 'light' ? 'black' : colors.primary};

`

const StyledCard = styled.div`
width: 18rem;
height: 36rem;
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
const CardFooter = styled.div`
color : ${(props) => props.theme === 'light' ? 'black' : colors.primary};

`
//Style to truncate text after 6 lines : 
const CardSummary = styled.p`
color : ${(props) => props.theme === 'light' ? 'black' : colors.primary};
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
const CardFavIcone = styled.i`
color : ${colors.primary};
&:hover {
    cursor: pointer;
    font-size : 18px;
}

`

function NewsCard({ id, title, url, image_url, news_site, summary, published_at, fav, setFav, isFavourite }) {

    //Function to add or remove an article id to list of favorite :
    function addOrRemoveToFavorites(id) {
        if (fav.find((elmentId) => (elmentId === id))) {
            //Id already in fav list : to remove
            const filteredFav = fav.filter((elementID) => elementID !== id);
            setFav(filteredFav);
        } else {
            //Id not in fav list : to add
            setFav([...fav, id])
        };
    }

    const { theme } = useContext(ThemeContext);


    return (

        <StyledCard theme={theme} className="card" >
            <CardHeader className="card-header">
                <CardLink href={url} theme={theme}><h4 >{news_site}</h4></CardLink>
                <CardFavIcone className={isFavourite ? "bi bi-heart-fill" : "bi bi-heart"} onClick={() => addOrRemoveToFavorites(id)}></CardFavIcone>
            </CardHeader>

            <CardLink href={url}><CardImg src={image_url} className="card-img-top" alt={title} /></CardLink>
            <div className="card-body">
                <CardLink href={url} theme={theme}>
                    <CardTitle className="card-title">{title}</CardTitle>
                    <CardSummary className="card-text" theme={theme}>{summary}</CardSummary>
                </CardLink>
            </div>
            <CardFooter theme={theme} className="card-footer">
                {reformateDate(published_at)}
            </CardFooter>
        </StyledCard>
    )

}

export default NewsCard