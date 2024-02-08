import Articles from '../../components/Articles';
import styled from 'styled-components';
import { useFetch } from '../../utils/hooks'
import { Loader } from '../../utils/style/Atoms';



const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-top : 30px;
  padding-bottom: 30px;
`

const HomeContainer = styled.div`
display : flex;
flex-direction : column;
justify-content : center;
align-items: center;
`

function Home() {

  //Get articles using custom hook  : 
  const { data, isLoading, error } = useFetch("https://api.spaceflightnewsapi.net/v4/articles/");

  // list of articles : 
  const articlesList = data?.results;


  if (error[0]) {
    return (<span>Get an issue during news retrieval</span>)
  }

  return (
    <HomeContainer className='container-xxl'>
      <PageTitle>Latest news</PageTitle>
      {isLoading ? (<Loader />) :
        (<Articles articlesList={articlesList} onlyFavourites={false} />)
      }
    </HomeContainer>
  );
}

export default Home;
