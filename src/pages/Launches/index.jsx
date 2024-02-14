import { useEffect, useState } from 'react';
import { useFetch } from '../../utils/hooks';
import LaunchCard from '../../components/LaunchCard';
import styled from "styled-components"
import { Loader, PageTitle } from '../../utils/style/Atoms';
import rocketDefaultImage from '../../assets/rocket_default_image.png'
import { ThemeContext } from "../../utils/context";
import { useContext } from 'react'

const LaunchCardsContainer = styled.div`
display: flex;
flex-wrap : wrap;
gap: 24px;
justify-content : center; 
align-items: center;
margin-bottom : 100px;

`


function Launches() {
    //Use Context to get theme (light or dark) :
    const { theme } = useContext(ThemeContext);
    // url subject to change 
    const [url, setUrl] = useState("");

    // At first render, checking if we can use PROD API or DEV :
    useEffect((url) => {
        //function to calculate date in a month from today :
        function dateInAMonth() {
            const date = new Date(); //today date at this point
            date.setMonth(date.getMonth() + 1);
            return date;
        }
        //check number of request left on the LL2 API. If > limit -2 use ll2Dev (which have less data but not rate limits)
        fetch('https://ll.thespacedevs.com/2.2.0/api-throttle/')
            .then((response) => response.json())
            //.then((data) => console.log(data.current_use))
            .then((data) => (data.current_use >= data.your_request_limit) ? setUrl("https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=30&net__lte=" + dateInAMonth().toISOString()) : setUrl("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=30&net__lte=" + dateInAMonth().toISOString()))
            .catch(setUrl("https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=30&net__lte=" + dateInAMonth().toISOString()))
        // DEV URL : 
        //"https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=30&net__lte=" + dateInAMonth().toISOString()
        //PROD URL :
        //"https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=30&net__lte=" + dateInAMonth().toISOString()      
    }, []);


    //Get futures launches from Launch Library 2 :    
    const { data, isLoading, error } = useFetch(url);

    // list of launches : 
    const launchesList = data?.results;


    if (error[0]) {
        return (<span>Get an issue during launches retrieval</span>)
    }


    return (<div>
        <PageTitle theme={theme}>Upcoming launches this month</PageTitle>
        <LaunchCardsContainer className='container-xxl'>

            {isLoading ? (<Loader />) :
                (launchesList?.map((launch) => (

                    <LaunchCard
                        key={launch.id}
                        id={launch.id}
                        name={launch.name}
                        agenceName={launch.mission.agencies[0]?.name ?? "Unknown"}
                        rocketName={launch.rocket.configuration.full_name ?? "Unknown"}
                        url={launch.mission.agencies[0]?.info_url ?? "/"}
                        image_url={launch.image !== null ? launch.image : rocketDefaultImage}
                        missionDescription={launch.mission.description}
                        net={launch.net}
                        statusName={launch.status.name}
                        statusId={launch.status.id}
                    />)
                ))
            }


        </LaunchCardsContainer>
    </div>)
}

export default Launches