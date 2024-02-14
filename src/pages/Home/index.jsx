import Articles from '../../components/Articles';
import styled from 'styled-components';
import { useFetch } from '../../utils/hooks'
import { Loader, PageTitle } from '../../utils/style/Atoms';
import { ThemeContext } from "../../utils/context";
import { useContext, useState } from 'react'


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
  const { data, isLoading, error } = useFetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=" + numberOfArticlesToDisplay.toString());
  // list of articles : 
  const articlesList = data?.results;

  function addMoreArticles() {
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
        <MoreNewsButton $isloading={isLoading} className="btn btn-outline-secondary" onClick={addMoreArticles}>More news</MoreNewsButton>
      }
    </HomeContainer>
  );
}

export default Home;
