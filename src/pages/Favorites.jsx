import { useEffect, useState } from "react";
import { Loader, PageTitle } from "../components/ui/Atoms";
import Articles from "../components/Articles";
import styled from 'styled-components';
import { ThemeContext } from "../services/providers/theme";
import { useContext } from 'react'
import apisURLs from "../services/api/api_URLs";


const FavoritesContainer = styled.div`
display : flex;
flex-direction : column;
justify-content : center;
align-items: center;
margin-bottom : 100px;


`


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
            let url = apisURLs.newsUrl + id;
            urls.push(url);
        }
        //fetch data for each article :
        if (urls) {
            setLoading(true);
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