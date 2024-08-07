import { useEffect, useState, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import styled from "styled-components"
import { Loader, PageTitle } from '../components/ui/Atoms';
import { ThemeContext } from "../services/providers/theme";
import { useContext } from 'react'
import apisURLs from '../services/api/api_URLs';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import CustomCalendarToolbar from '../components/ui/CustomCalendarToolbar';
import { useNavigate } from "react-router-dom";


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
    //state of general loading (loading of url & fetching data) :
    const [isGeneralLoading, setIsGeneralLoading] = useState(true)
    // Set up the localizer
    const localizer = momentLocalizer(moment)
    // current date of the displayed month of calendar :
    const [currentDate, setCurrentDate] = useState(new Date());
    //first and last day of current month
    const initialDate = new Date();
    const [monthStartAndEnd, setMonthStartAndEnd] = useState(getMonthStartAndEnd(initialDate));
    // To navigate to another page with react router :
    const navigate = useNavigate();


    // At first render, checking if we can use PROD API or DEV :
    useEffect(() => {
        setIsGeneralLoading(true);
        //check number of request left on the LL2 API. If > limit -2 use ll2Dev (which have less data but not rate limits)
        fetch(apisURLs.throttleURL)
            .then((response) => response.json())
            //.then((data) => console.log(data.current_use))
            .then((data) => (data.current_use >= data.your_request_limit) ? setUrl(apisURLs.launcheURL_DEV + "?limit=50&net__gte=" + monthStartAndEnd.startOfMonth + "&net__lte=" + monthStartAndEnd.endOfMonth) : setUrl(apisURLs.launcheURL + "?limit=50&net__gte=" + monthStartAndEnd.startOfMonth + "&net__lte=" + monthStartAndEnd.endOfMonth))
            .catch(() => setUrl(apisURLs.launcheURL_DEV + "?limit=50&net__gte=" + monthStartAndEnd.startOfMonth + "&net__lte=" + monthStartAndEnd.endOfMonth))
    }, [monthStartAndEnd]);

    //Get futures launches from Launch Library 2 :    
    const { data, isLoading, error } = useFetch(url);

    // To avoid flicking between the 2 useEffect, we need a general loading state which change to false only when url is laoded and fetching data isLoading state is to false 
    useEffect(() => {
        if (url && !isLoading) {
            setIsGeneralLoading(false)
        }
    }, [url, isLoading])

    // list of launches : 
    const launchesList = data?.results;

    //"events" for calendar :
    const events = launchesList?.map((launch) => (
        {
            title: launch.name,
            start: moment(launch.window_start),
            end: moment(launch.window_end),
            allDay: false,
            id: launch.id
        }
    ))

    // to customize Calendar's Toolbar
    const components = useMemo(() => (
        {
            toolbar: CustomCalendarToolbar
        }
    ), [])

    // return object with 2 attributes : first and last days of current date 's month in ISO String format
    function getMonthStartAndEnd(date) {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        return { startOfMonth: startOfMonth.toISOString(), endOfMonth: endOfMonth.toISOString() }
    }

    //as we change month, we set a new CurrentDate and then set MonthStartAndEnd which will trigger the useEffect and then fetch data with a new URL (with right start and end dates)
    function handleNavigate(date, view) {
        console.log("Navigated to date:", date);  // Log the date to the console
        setCurrentDate(date);
        setMonthStartAndEnd(getMonthStartAndEnd(date))
    };

    //navigate to launch page
    function handleEventClick(event) {
        navigate("/launch/" + event.id)
    }


    if (error[0]) {
        return (<span>Get an issue during launches retrieval</span>)
    }


    return (<div>
        <PageTitle theme={theme}>Upcoming launches this month</PageTitle>
        <LaunchCardsContainer className='container-xxl'>
            {(isGeneralLoading) ? (<Loader />) : (
                <StyledCalendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    events={events}
                    onNavigate={handleNavigate}
                    onSelectEvent={handleEventClick}
                    date={currentDate}
                    components={components}
                    popup
                />
            )}
        </LaunchCardsContainer>
    </div>)
}

export default Launches