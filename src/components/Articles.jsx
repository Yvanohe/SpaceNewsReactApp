import NewsCard from "./NewsCards"
import styled from 'styled-components';
import { useState, useEffect } from 'react'


const CardsContainer = styled.div`
    display: flex;
    flex-wrap : wrap;
    gap: 24px;
    justify-content : space-between; 
    align-items: center;
    margin-bottom : 15px;    
  `

function Articles({ articlesList, onlyFavourites }) {
    //retrieve favourites articles from local storage :
    const favourites = localStorage.getItem('fav')
    //use state to re-render if changes :
    const [fav, setFav] = useState(favourites ? JSON.parse(favourites) : []);
    //Each time fav change : the array is saved on localstorage
    useEffect(() => { localStorage.setItem("fav", JSON.stringify(fav)) }, [fav]);

    //if onlyFavourites : filter ArticlesList with ids in fav
    var filteredArticlesList = articlesList;

    if (onlyFavourites) {
        filteredArticlesList = articlesList.filter((article) => fav.includes(article.id))
    }

    return (
        <CardsContainer>
            {filteredArticlesList?.map((article) =>
            (
                <NewsCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    url={article.url}
                    image_url={article.image_url}
                    news_site={article.news_site}
                    summary={article.summary}
                    published_at={article.published_at}
                    fav={fav}
                    setFav={setFav}
                    isFavourite={fav.find((element) => element === article.id) ? true : false} />
            )
            )}
        </CardsContainer>
    )


}

export default Articles