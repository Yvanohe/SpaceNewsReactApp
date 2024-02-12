import { useEffect, useState } from "react";
import { Loader } from "../../utils/style/Atoms";
import Articles from "../../components/Articles";
import styled from 'styled-components';


const FavoritesContainer = styled.div`
display : flex;
flex-direction : column;
justify-content : center;
align-items: center;`

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-top : 30px;
  padding-bottom: 30px;
`

function Favorites() {


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
            <PageTitle>My favourite news</PageTitle>
            {isLoading ? (<Loader />) :
                (<Articles articlesList={articles} onlyFavourites={true} />)
            }
        </FavoritesContainer>

    )
}

export default Favorites