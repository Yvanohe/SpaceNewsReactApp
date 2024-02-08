import ResearchForm from "../../components/ResearchForm";
import styled from 'styled-components';
import { useState } from "react";
import { useFetch } from '../../utils/hooks'
import { Loader } from '../../utils/style/Atoms';
import Articles from "../../components/Articles";


const FormContainer = styled.div`
display : flex;
flex-direction : column;
gap:25px;
align-items : center;
margin-bottom : 50px;
width: 100%;
`

const SearchTitle = styled.h1`
text-align: center;
padding-top: 25px;
padding-bottom : 25px;
`

const SearchPageContainer = styled.div`
display : flex;
flex-direction : column;
align-items : center;
`



function Search() {
    //state to open/close search form : 
    const [isOpen, setIsOpen] = useState(true);
    //url which will be build on form submit :
    const [url, setUrl] = useState("")
    // state to retain input values of the form when it is closed
    const [inputValues, setInputValues] = useState({});
    console.log(inputValues);


    //Get articles using custom hook  to fetch : 
    const { data, isLoading, error } = useFetch(url);


    // list of articles : 
    const articlesList = data?.results;

    if (error[0]) {
        return (<span>Get an issue during news retrieval</span>)
    }

    return (
        <SearchPageContainer className="container-xxl">
            <SearchTitle >Search for a news article</SearchTitle >
            {isOpen ? (

                <FormContainer>
                    <ResearchForm setUrl={setUrl} inputValues={inputValues} setInputValues={setInputValues} />
                    <button className="btn btn-outline-secondary w-25" onClick={() => setIsOpen(false)}>Hide search fields</button>

                </FormContainer>)

                : (
                    <FormContainer >
                        <button className="btn btn-outline-secondary w-25 " onClick={() => setIsOpen(true)}>Display search fields</button>
                    </FormContainer>
                )

            }

            {isLoading ? (<Loader />) :
                (<Articles articlesList={articlesList} onlyFavourites={false} />)
            }

        </SearchPageContainer >
    )
}

export default Search