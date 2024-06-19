import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks";
import { useState, useEffect } from "react";
import { Loader, PageTitle } from "../../utils/style/Atoms";
import apisURLs from '../../config/api_URLs';
import styled from "styled-components";
import { reformateDate } from "../../utils/tools";
import { StyledAnchor } from "../../utils/style/Atoms";
import { useContext } from 'react'
import { ThemeContext } from "../../utils/context";
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import makerIcon from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet'
import colors from "../../utils/style/colors";



//Styled components-----------------------------------

const LaunchPageContainer = styled.div`
display : flex;
flex-direction : column;
justify-content : center;
align-items: center;
margin-bottom : 100px;
`
const FormSwitch = styled.div`
color : ${(props) => props.theme === 'light' ? 'black' : colors.primary};
margin-bottom: 10px;
`

const AccordionContainer = styled.div`
width:100%;

`
const StyledAccordion = styled.div`
& *  {
border-color : ${(props) => props.theme === 'light' ? '#DEE2E6' : colors.primary}; 
background-color : ${(props) => props.theme === 'light' ? 'white' : colors.backgroundDarkSecondary};
color : ${(props) => props.theme === 'light' ? 'black' : colors.primary};
}
`
const StyledMapContainer = styled(MapContainer)`
height: 400px;
width: 400px;
max-width:100%;
border : 1px solid black ;
& * {
    background-color : transparent;
}
`
const StyledTooltip = styled(Tooltip)`
    background-color : white;
`

const AccordionButton = styled.button`
&:active{
    color:black;
}
&::after{
 background-image :  url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill='%238186a0'%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e");
}

`
const MissionPatchesImg = styled.img`
height : 100px;
width : 100px;
`
const ProviderLogoImg = styled.img`
height : 80px;
max-width : 80%;
`
const RocketLogoImg = styled.img`
height : 100px;
max-width : 80%;
`

const NationLogoImg = styled.img`
height : 40px;
width : 40px;
`

const NameLogoContainer = styled.div`
display : flex;
justify-content : start;
align-items : center;
gap : 25px;
`
const StyledText = styled.span`
color : ${(props) => props.color};
`
//------------------------------------------

function Launch() {
    //retrieve launch id from parameter in the url
    const { launchId } = useParams();

    //Use Context to get theme (light or dark) :    
    const { theme } = useContext(ThemeContext);

    // url subject to change 
    const [url, setUrl] = useState("");
    //To track when the api (dev or prod) has been determined (with the throttleURL)
    const [isUrlLoading, setUrlLoading] = useState(true);

    const [istoggleChecked, setToggleStatus] = useState(false);
    function handleToggleChange() {
        setToggleStatus(!istoggleChecked);
    }
    // At first render, checking if we can use PROD API or DEV :
    useEffect(() => {
        //check number of request left on the LL2 API. If > limit -2 use ll2Dev (which have less data but not rate limits)
        fetch(apisURLs.throttleURL)
            .then((response) => response.json())
            .then((data) => (
                data.current_use >= data.your_request_limit) ? setUrl(apisURLs.launcheURL_DEV + launchId) : setUrl(apisURLs.launcheURL + launchId))
            .catch(() => setUrl(apisURLs.launcheURL_DEV + launchId))
            .finally(() => setUrlLoading(false))



    }, [launchId]);

    //Get launch detail from Launch Library 2 :  
    const { data, isLoading, error } = useFetch(url);

    function getTextColorFromStatus(statusId) {
        switch (statusId) {
            case 1:
            case 3:
            case 6:
                return 'green'
            case 4:
            case 7:
                return 'red'
            case 5:
                return 'orange'
            default:
                if (theme === 'light') {
                    return 'black'
                } else {
                    return colors.primary
                }
        }
    }

    //workaround to get the map display correctly  (not working)   
    // const mapRef = useRef();
    // useEffect(() => {

    //     if (mapRef.current) {
    //         window.dispatchEvent(new Event('resize'));

    //     }
    // });

    useEffect(() => {
        // Simulate window resize
        window.dispatchEvent(new Event('resize'));
    }, []); // Empty array means this runs once after the initial render

    if (error[0]) {
        return (<span>Get an issue during launch retrieval.</span>)
    }

    return (
        <LaunchPageContainer className="container-xxl">
            <PageTitle theme={theme}>{data.name ?? ""}</PageTitle>


            {(isLoading || isUrlLoading) ? (<Loader />) :

                (<AccordionContainer>
                    <FormSwitch theme={theme} className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={istoggleChecked} onChange={handleToggleChange} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{istoggleChecked ? "Collapse all" : "Uncollapse all"}</label>
                    </FormSwitch>
                    <StyledAccordion theme={theme} className="accordion" >
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <AccordionButton theme={theme} className={"accordion-button fs-2" + (istoggleChecked ? "" : " collapsed")} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    Launch status
                                </AccordionButton>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" className={"accordion-collapse collapse" + (istoggleChecked ? " show" : "")}>
                                <div className="accordion-body">
                                    <div theme={theme} className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <h3>Date of launch (NET)</h3>
                                            <p>{reformateDate(data.net) ?? "Unknown"}</p></li>
                                        <li className="list-group-item">
                                            <h3>Launch status</h3>
                                            <p><StyledText color={getTextColorFromStatus(data.status?.id)}>{data.status?.name ?? "Unknown"}</StyledText> {(data.status?.id === 4 || data.status?.id === 7) ? <span>- Reason of failure :  {data.failreason ?? "Unknown"} </span> : null}</p>
                                        </li>

                                        <li className="list-group-item">
                                            <h3>Launching window</h3>
                                            <p>Start : {reformateDate(data.window_start) ?? "Unknown"}</p>
                                            <p>End : {reformateDate(data.window_end) ?? "Unknown"}</p>
                                        </li>
                                        <li className="list-group-item">
                                            <h3>Probability of launch</h3>
                                            <p>{data.probability ?? "Unknown"}%</p>
                                        </li>
                                        <li className="list-group-item">
                                            <h3>Live webcast</h3>
                                            <p>{(data.webcast_live === true) ? "Live" : "Not available"}</p>
                                        </li>
                                        <li className="list-group-item">
                                            <p> last updated : {reformateDate(data.last_updated) ?? "Unknown"}</p></li>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <AccordionButton theme={theme} className={"accordion-button fs-2" + (istoggleChecked ? "" : " collapsed")} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                    Mission details
                                </AccordionButton>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" className={"accordion-collapse collapse" + (istoggleChecked ? " show" : "")}>
                                <div className="accordion-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <h3>Mission's name and patches</h3>
                                            <NameLogoContainer>
                                                <div><strong>{data.mission?.name ?? "Unknown"}</strong></div>
                                                {data.mission_patches?.map((patch, index) => (<div key={"patch-" + index}><MissionPatchesImg src={patch.image_url} alt="Mission patche"></MissionPatchesImg></div>)
                                                )}
                                            </NameLogoContainer>
                                        </li>
                                        <li className="list-group-item">
                                            <h3>Description</h3>
                                            <p>{data.mission?.description ?? "Unknown"}</p>
                                        </li>
                                        <li className="list-group-item">
                                            <h3>Type</h3>
                                            <p>{data.mission?.type ?? "Unknown"}</p>
                                        </li>
                                        <li className="list-group-item">
                                            <h3>Targeted orbit</h3>
                                            <p>{data.mission?.orbit.name ?? "Unknown"}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <AccordionButton theme={theme} className={"accordion-button fs-2" + (istoggleChecked ? "" : " collapsed")} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                    Launch provider
                                </AccordionButton>
                            </h2>
                            <div id="panelsStayOpen-collapseThree" className={"accordion-collapse collapse" + (istoggleChecked ? " show" : "")}>
                                <div className="accordion-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <h3>Provider's name</h3>
                                            <NameLogoContainer>
                                                <div><StyledAnchor theme={theme} href={data.launch_service_provider?.info_url ?? ""} target="_blank"><span className={"badge rounded-pill  fs-5" + (theme === 'light' ? ' text-bg-light' : ' text-bg-secondary')}>{data.launch_service_provider?.name ?? "Unknown"}</span></StyledAnchor></div>
                                                <div><NationLogoImg src={data.launch_service_provider?.nation_url ?? ""} alt="nation flag"></NationLogoImg></div>
                                                <div><StyledAnchor theme={theme} href={data.launch_service_provider?.info_url ?? ""} target="_blank"><ProviderLogoImg src={data.launch_service_provider?.logo_url ?? ""} alt="provider logo"></ProviderLogoImg></StyledAnchor></div>
                                            </NameLogoContainer>
                                        </li>
                                        <li className="list-group-item">
                                            <h3>Type</h3>
                                            <p>{data.launch_service_provider?.type ?? "Unknown"}</p>
                                        </li>
                                        <li className="list-group-item">
                                            <h3>Nation</h3>
                                            <p>{data.launch_service_provider?.country_code ?? "Unknown"}</p>
                                        </li>
                                        <li className="list-group-item">
                                            <h3>Number of launches</h3>
                                            <p>Total number of launches : <span className="badge text-bg-secondary rounded-pill">{data.launch_service_provider?.total_launch_count ?? "Unknown"}</span></p>
                                            <p color='green'>Succcessful launches : <span className="badge text-bg-success rounded-pill">{data.launch_service_provider?.successful_launches ?? "Unknown"}</span></p>
                                            <p color='red'>Failed launches : <span className="badge text-bg-danger rounded-pill">{data.launch_service_provider?.failed_launches ?? "Unknown"}</span></p>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <AccordionButton theme={theme} className={"accordion-button fs-2" + (istoggleChecked ? "" : " collapsed")} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                    Rocket
                                </AccordionButton>
                            </h2>
                            <div id="panelsStayOpen-collapseFour" className={"accordion-collapse collapse" + (istoggleChecked ? " show" : "")}>
                                <div className="accordion-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <h3>Rocket's name</h3>
                                            <NameLogoContainer>
                                                <p className={"badge rounded-pill fs-5" + (theme === 'light' ? ' text-bg-light' : ' text-bg-secondary')}>{data.rocket?.configuration?.full_name ?? "Unknown"}</p>
                                                <div><StyledAnchor href={data.rocket?.configuration?.image_url ?? ""} target="_blank"><RocketLogoImg src={data.rocket?.configuration?.image_url ?? ""} alt="rocket"></RocketLogoImg></StyledAnchor></div>
                                            </NameLogoContainer>
                                        </li>
                                        <li className="list-group-item">
                                            <h3>Description</h3>
                                            <p>{data.rocket?.configuration?.description ?? "Unknown"}</p>
                                        </li>
                                        <li className="list-group-item">
                                            <h3>Reusability</h3>
                                            {(data.rocket?.configuration?.reusable === true) ?
                                                <div>
                                                    <span> <strong>Yes</strong> - Number of reuses of this (these) particular launcher :</span>
                                                    <ul> {data.rocket?.launcher_stage?.map((launcherStage) =>
                                                        <li key={"reuse-" + launcherStage.launcher?.serial_number}>
                                                            Launcher n°<em>{launcherStage.launcher?.serial_number ?? "Unknown"}</em> : {launcherStage.launcher?.flights ?? "0"}
                                                        </li>
                                                    )}
                                                    </ul>
                                                </div>
                                                : <p>No</p>}
                                        </li>
                                        {(data.rocket?.configuration?.reusable === true) ?
                                            <li className="list-group-item">
                                                <h3>Landing attempt for this mission</h3>
                                                <ul> {data.rocket?.launcher_stage?.map((launcherStage) =>
                                                    <li key={"landing-" + launcherStage.launcher?.serial_number}>
                                                        Launcher n°<em>{launcherStage.launcher?.serial_number ?? "Unknown"}</em> : {(launcherStage.landing.attempt) ? "Yes" : "No"}{(launcherStage.landing.success) ? (launcherStage.landing.success ? <StyledText color='green'> - successful landing</StyledText> : <StyledText color='red'> - landing failed</StyledText>) : null}
                                                    </li>
                                                )}
                                                </ul>
                                            </li>
                                            : null}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <AccordionButton theme={theme} className={"accordion-button fs-2" + (istoggleChecked ? "" : " collapsed")} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                    Pad
                                </AccordionButton>
                            </h2>
                            <div id="panelsStayOpen-collapseFive" className={"accordion-collapse collapse" + (istoggleChecked ? " show" : "")}>
                                <div className="accordion-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <h3>Pad's name</h3>
                                            <div>
                                                <StyledAnchor theme={theme} href={data.pad?.wiki_url ?? ""} target='_blank'>
                                                    {data.pad?.name ?? "Unknown"}
                                                </StyledAnchor>
                                            </div>
                                        </li>
                                        <li className="list-group-item" title="Resize web browser window to correct the display bug">
                                            <h3>Location</h3>
                                            <p> Location name : {data.pad?.location?.name ?? "Unknown"}</p>
                                            <StyledMapContainer center={[Number(data.pad?.latitude ?? "0"), Number(data.pad?.longitude ?? "0")]} zoom={8} scrollWheelZoom={true} >
                                                <TileLayer
                                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={[Number(data.pad?.latitude ?? "0"), Number(data.pad?.longitude ?? "0")]} icon={new Icon({ iconUrl: makerIcon, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                                    <StyledTooltip>{data.pad?.name ?? "Unknown"}</StyledTooltip>
                                                </Marker>
                                            </StyledMapContainer>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </StyledAccordion>
                    {/* </div> */}
                </AccordionContainer>)
            }

        </LaunchPageContainer>
    )
}

export default Launch