import { useEffect, useState } from "react";
import { Loader, PageTitle } from "../../utils/style/Atoms";
import Articles from "../../components/Articles";
import styled from 'styled-components';
import { ThemeContext } from "../../utils/context";
import { useContext } from 'react'


const FavoritesContainer = styled.div`
display : flex;
flex-direction : column;
justify-content : center;
align-items: center;`


function Favorites() {

    //Use Context to get theme (light or dark) :
    const { theme } = useContext(ThemeContext);

    const [isLoading, setLoading] = useState(true);

    const [articles, setArticles] = useState([]);

    async function fetchData(urls) {
        try {
            var a = [];
            for (let url of urls) {
                const response = await fetch(url);
                const article = await response.json();
                a.push(article);
            }
            setArticles(a);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        //retrieve favourites articles from local storage :
        const favourites = JSON.parse(localStorage.getItem('fav'));
        //build request for each articles :
        var urls = [];

        for (let id of favourites) {
            let url = "https://api.spaceflightnewsapi.net/v4/articles/" + id;
            urls.push(url);
        }
        //fetch data for each article :
        if (urls) {
            setLoading(true)
            fetchData(urls);
        }

    }, [])



    return (

        <FavoritesContainer className="container-xxl">
            <PageTitle theme={theme}>My favourite news</PageTitle>
            {isLoading ? (<Loader />) :
                (articles.length > 0 ? <Articles articlesList={articles} onlyFavourites={true} /> :
                    <p>No press article saved as a favourite</p>)
            }
        </FavoritesContainer>

    )
}

export default Favorites