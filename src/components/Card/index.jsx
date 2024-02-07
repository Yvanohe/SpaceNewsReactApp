import styled from "styled-components"


const CardLink = styled.a`
text-decoration : none;
color : black;

`

const StyledCard = styled.div`
width: 18rem;
height: 36rem;
box-shadow: 2px 2px 5px #e2e3e9;
&:hover {
    box-shadow: 2px 2px 10px #e2e3e9;
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
const CardFavIcone = styled.i`
color : red;

`

function Card({ id, title, url, image_url, news_site, summary, published_at, fav, setFav, isFavourite }) {

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


    return (

        <StyledCard className="card">
            <CardHeader className="card-header">
                <CardLink href={url}><h4>{news_site}</h4></CardLink>
                <CardFavIcone className={isFavourite ? "bi bi-heart-fill" : "bi bi-heart"} onClick={() => addOrRemoveToFavorites(id)}></CardFavIcone>
            </CardHeader>

            <CardLink href={url}><CardImg src={image_url} className="card-img-top" alt={title} /></CardLink>
            <div className="card-body">
                <CardLink href={url}>
                    <CardTitle className="card-title">{title}</CardTitle>
                    <CardSummary className="card-text" >{summary}</CardSummary>
                </CardLink>
            </div>
            <div className="card-footer ">
                {published_at}
            </div>
        </StyledCard>

    )

}

export default Card