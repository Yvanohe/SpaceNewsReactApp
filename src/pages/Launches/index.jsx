import { useEffect, useState, useMemo } from 'react';
import { useFetch } from '../../utils/hooks';
import LaunchCard from '../../components/LaunchCard';
import styled from "styled-components"
import { Loader, PageTitle } from '../../utils/style/Atoms';
import rocketDefaultImage from '../../assets/rocket_default_image.png'
import { ThemeContext } from "../../utils/context";
import { useContext } from 'react'
import apisURLs from '../../config/api_URLs';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import CustomCalendarToolbar from '../../components/CustomCalendarToolbar';
import { useNavigate } from "react-router-dom";

// const LaunchCardsContainer = styled.div`
// display: flex;
// flex-wrap : wrap;
// gap: 24px;
// justify-content : center; 
// align-items: center;
// margin-bottom : 100px;

// `

const LaunchCardsContainer = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
margin-bottom : 100px;
padding: 0;
`
const StyledCalendar = styled(Calendar)`
width: 100%;
`

function Launches() {
    //Use Context to get theme (light or dark) :
    const { theme } = useContext(ThemeContext);
    // url subject to change 
    const [url, setUrl] = useState("");
    // Set up the localizer
    const localizer = momentLocalizer(moment)
    // current date of the displayed month of calendar :
    const [currentDate, setCurrentDate] = useState(new Date());
    //first and last day of current month
    const initialDate = new Date();
    const [monthStartAndEnd, setMonthStartAndEnd] = useState(getMonthStartAndEnd(initialDate));
    // To navigate to another page with react router :
    const navigate = useNavigate();

    // return object with 2 attributes : first and last days of current date 's month in ISO String format
    function getMonthStartAndEnd(date) {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        return { startOfMonth: startOfMonth.toISOString(), endOfMonth: endOfMonth.toISOString() }
    }
    // At first render, checking if we can use PROD API or DEV :
    useEffect(() => {
        //check number of request left on the LL2 API. If > limit -2 use ll2Dev (which have less data but not rate limits)
        fetch(apisURLs.throttleURL)
            .then((response) => response.json())
            //.then((data) => console.log(data.current_use))
            .then((data) => (data.current_use >= data.your_request_limit) ? setUrl(apisURLs.launcheURL_DEV + "?limit=50&net__gte=" + monthStartAndEnd.startOfMonth + "&net__lte=" + monthStartAndEnd.endOfMonth) : setUrl(apisURLs.launcheURL + "?limit=50&net__gte=" + monthStartAndEnd.startOfMonth + "&net__lte=" + monthStartAndEnd.endOfMonth))
            .catch(() => setUrl(apisURLs.launcheURL_DEV + "?limit=50&net__gte=" + monthStartAndEnd.startOfMonth + "&net__lte=" + monthStartAndEnd.endOfMonth))
    }, [monthStartAndEnd]);

    //Get futures launches from Launch Library 2 :    
    const { data, isLoading, error } = useFetch(url);

    // list of launches : 
    const launchesList = data?.results;

    //event for calendar :
    const events = launchesList?.map((launch) => {
        return (
            {
                title: launch.name,
                start: moment(launch.window_start),
                end: moment(launch.window_end),
                allDay: false,
                id: launch.id

            }
        )
    })

    const components = useMemo(() => (
        {
            toolbar: CustomCalendarToolbar
        }
    ), [])


    function handleNavigate(date, view) {
        console.log("Navigated to date:", date);  // Log the date to the console
        setCurrentDate(date);
        setMonthStartAndEnd(getMonthStartAndEnd(date))
    };

    function handleEventClick(event) {
        navigate("/launch/" + event.id)
    }




    // useEffect(() => {
    //     //function to calculate date in a month from today :
    //     function dateInAMonth() {
    //         const date = new Date(); //today date at this point
    //         date.setMonth(date.getMonth() + 1);
    //         return date;
    //     }
    //     //check number of request left on the LL2 API. If > limit -2 use ll2Dev (which have less data but not rate limits)
    //     fetch(apisURLs.throttleURL)
    //         .then((response) => response.json())
    //         //.then((data) => console.log(data.current_use))
    //         .then((data) => (data.current_use >= data.your_request_limit) ? setUrl(apisURLs.upcomingLaunchesURL_DEV + "?limit=30&net__lte=" + dateInAMonth().toISOString()) : setUrl(apisURLs.upcomingLaunchesURL + "?limit=30&net__lte=" + dateInAMonth().toISOString()))
    //         .catch(() => setUrl(apisURLs.upcomingLaunchesURL_DEV + "?limit=30&net__lte=" + dateInAMonth().toISOString()))
    // }, []);




    // launches components
    // const launchComponents = launchesList?.map((launch) => {
    //     console.log("laucch date " + launch.net);
    //     console.log("moment" + moment().format());
    //     console.log("moment net launch " + moment(launch.net))

    //     return (
    //         <LaunchCard
    //             key={launch.id}
    //             id={launch.id}
    //             name={launch.name}
    //             agenceName={launch.mission.agencies[0]?.name ?? "Unknown"}
    //             rocketName={launch.rocket.configuration.full_name ?? "Unknown"}
    //             url={launch.mission.agencies[0]?.info_url ?? "/"}
    //             image_url={launch.image !== null ? launch.image : rocketDefaultImage}
    //             missionDescription={launch.mission.description}
    //             net={launch.net}
    //             statusName={launch.status.name}
    //             statusId={launch.status.id}
    //         />)
    // })


    if (error[0]) {
        return (<span>Get an issue during launches retrieval</span>)
    }


    return (<div>
        <PageTitle theme={theme}>Upcoming launches this month</PageTitle>
        <LaunchCardsContainer className='container-xxl'>
            {isLoading ? (<Loader />) : (
                <StyledCalendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    events={events}
                    onNavigate={handleNavigate}
                    onSelectEvent={handleEventClick}
                    date={currentDate}
                    components={components}
                />
            )}
        </LaunchCardsContainer>
    </div>)
}

export default Launches