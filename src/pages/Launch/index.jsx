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
`


function Launch() {
    //Use Context to get theme (light or dark) :
    const { theme } = useContext(ThemeContext);

    //Calculate date in a month :
    function dateInAMonth() {
        const date = new Date(); //today date at this point
        date.setMonth(date.getMonth() + 1);
        return date;
    }

    const [url, setUrl] = useState("");
    useEffect(() => {
        // DEV URL : 
        setUrl("https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=30&net__lte=" + dateInAMonth().toISOString())

        //PROD URL :
        //setUrl("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=30&net__lte=" + dateInAMonth().toISOString())
    }, []);
    console.log(url);
    //Get futures launches from Launch Library 2 :    
    const { data, isLoading, error } = useFetch(url);


    // list of launches : 
    const launchesList = data?.results;
    console.log(launchesList);

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

export default Launch