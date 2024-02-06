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

function Home() {

  //Get articles using custom hook : 
  const { data, isLoading, error } = useFetch("https://api.spaceflightnewsapi.net/v4/articles/");

  //get lsit of articles : 
  const articlesList = data?.results;

  if (error[0]) {
    return (<span>Get an issue : {error[1]}</span>)
  }

  return (
    <div className='container-xxl'>
      <PageTitle>Latest news</PageTitle>
      {isLoading ? (<Loader />) :
        (<Articles articlesList={articlesList} />)
      }
    </div>
  );
}

export default Home;
