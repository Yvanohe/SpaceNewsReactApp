import styled from "styled-components"
import { reformateDate } from "../utils/tools"
import { useContext } from 'react'
import { ThemeContext } from "../services/providers/theme";
import colors from "../utils/colors";
import { StyledAnchor } from "./ui/Atoms";



const StyledCard = styled.div`
width: 18rem;
height: 36rem;
box-shadow: 2px 2px 5px ${(props) => props.theme === 'light' ? '#e2e3e9' : colors.backgroundDarkSecondary};
background-color : ${(props) => props.theme === 'light' ? 'white' : colors.backgroundDarkSecondary};

&:hover {
    box-shadow: 2px 2px 10px ${(props) => props.theme === 'light' ? '#e2e3e9' : colors.backgroundDarkSecondary};
}

@media (max-width:768px) {
    height: 14rem;
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
                <StyledAnchor href={url} theme={theme} target='_blank'><h4 >{news_site}</h4></StyledAnchor>
                <CardFavIcone className={isFavourite ? "bi bi-heart-fill" : "bi bi-heart"} onClick={() => addOrRemoveToFavorites(id)}></CardFavIcone>
            </CardHeader>

            <div className="d-none d-md-block"><StyledAnchor href={url} target='_blank'><CardImg src={image_url} className="card-img-top" alt={title} /></StyledAnchor></div>
            <div className="card-body">
                <StyledAnchor href={url} theme={theme} target='_blank' >
                    <CardTitle className="card-title">{title}</CardTitle>
                    <CardSummary className="card-text" theme={theme}>{summary}</CardSummary>
                </StyledAnchor>
            </div>
            <CardFooter theme={theme} className="card-footer">
                {reformateDate(published_at)}
            </CardFooter>
        </StyledCard>
    )
}

// NewsCard.propTypes = {
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string,
//     url: PropTypes.string,
//     image_url: PropTypes.string,
//     news_site: PropTypes.string,
//     summary: PropTypes.string,
//     published_at: PropTypes.string,
//     fav: PropTypes.array.isRequired,
//     setFav: PropTypes.func.isRequired,
//     isFavourite: PropTypes.bool.isRequired
// }

// NewsCard.defaultProps = {
//     title: 'title not avaible',
//     url: 'https://www.google.fr',
//     image_url: 'https://stock.adobe.com/fr/search?k=rocket&asset_id=131965318',
//     news_site: 'News web site not avaible',
//     summary: 'news summary not available',
//     published_at: '2000-01-01',
// }


export default NewsCard