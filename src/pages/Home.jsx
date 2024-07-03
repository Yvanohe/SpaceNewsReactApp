import Articles from '../components/Articles';
import styled from 'styled-components';
import { useFetch } from '../hooks/useFetch'
import { Loader, PageTitle } from '../components/ui/Atoms';
import { ThemeContext } from "../services/providers/theme";
import { useContext, useState } from 'react'
import apisURLs from '../services/api/api_URLs';


const HomeContainer = styled.div`
display : flex;
flex-direction : column;
justify-content : center;
align-items: center;
margin-bottom : 100px;
`

const MoreNewsButton = styled.button`
width : 25%;
visibility : ${(props) => props.$isloading ? 'hidden' : 'visible'};

`

function Home() {

  //Use Context to get theme (light or dark) :
  const { theme } = useContext(ThemeContext);

  //number of articles subject to change :
  const [numberOfArticlesToDisplay, setNumberOfArticles] = useState(20);

  //Get articles using custom hook  : 
  const { data, isLoading, error } = useFetch(apisURLs.newsUrl + "?limit=" + numberOfArticlesToDisplay.toString());
  // list of articles : 
  const articlesList = data?.results;

  function displayMoreArticles() {
    //No more than 50 articles to display
    if (numberOfArticlesToDisplay < 50) {
      setNumberOfArticles(numberOfArticlesToDisplay + 10);
    }
  }

  if (error[0]) {
    return (<span>Get an issue during news retrieval</span>)
  }

  return (
    <HomeContainer className='container-xxl'>
      <PageTitle theme={theme}>Latest news</PageTitle>
      {isLoading ? (<Loader />) :
        (
          <Articles articlesList={articlesList} onlyFavourites={false} />
        )

      }
      {numberOfArticlesToDisplay >= 50 ?
        <MoreNewsButton $isloading={isLoading} className="btn btn-outline-secondary">max number of news article reached</MoreNewsButton>
        :
        <MoreNewsButton $isloading={isLoading} className="btn btn-outline-secondary" onClick={displayMoreArticles}>More news</MoreNewsButton>
      }
    </HomeContainer>
  );
}

export default Home;
