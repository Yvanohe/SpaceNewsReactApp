import Articles from '../../components/Articles';
import styled from 'styled-components';
import { useFetch } from '../../utils/hooks'
import { Loader, PageTitle } from '../../utils/style/Atoms';
import { ThemeContext } from "../../utils/context";
import { useContext } from 'react'







const HomeContainer = styled.div`
display : flex;
flex-direction : column;
justify-content : center;
align-items: center;
`

function Home() {

  //Use Context to get theme (light or dark) :
  const { theme } = useContext(ThemeContext);

  //Get articles using custom hook  : 
  const { data, isLoading, error } = useFetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=20");

  // list of articles : 
  const articlesList = data?.results;

  if (error[0]) {
    return (<span>Get an issue during news retrieval</span>)
  }

  return (
    <HomeContainer className='container-xxl'>
      <PageTitle theme={theme}>Latest news</PageTitle>
      {isLoading ? (<Loader />) :
        (<Articles articlesList={articlesList} onlyFavourites={false} />)
      }
    </HomeContainer>
  );
}

export default Home;
