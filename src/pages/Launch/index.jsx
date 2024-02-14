import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/hooks";

function Launch() {

    const { launchId } = useParams();

    //Get launch detail from Launch Library 2 :    
    const { data, isLoading, error } = useFetch("https://lldev.thespacedevs.com/2.2.0/launch/" + launchId);

    console.log(data);
    //     //launch title 
    //     data.name;

    //Launch details---------
    //     //laucnh status :
    //     data.status.id;
    //     data.status.name;
    //     //si fail :
    //     data.failreason
    //     //last updated:
    //     data.last_updated;

    //     //net:
    //     data.net;
    //     //windows start :
    //     data.window_start;
    //     //windows_end:
    //     data.windowd_end;
    //     //probability :
    //     data.probability;
    //     //webcast live ? :
    //     data.webcast_live;

    //-----------------------

    // Mission details -----
    //     //mission name :
    //     data.mission.name;
    //     //mission patch :
    //     data.mission_patches[i].image_url;
    //     //mission description :
    //     data.mission.description;
    //     //mission type:
    //     data.mission.type;
    //     //mission orbite :
    //     data.mission.orbit.name;
    //-----------

    // //provider details----------:
    // provider name :
    //     data.launch_service_provider.name;
    //     //type lancement :
    //     data.launch_service_provider.type;
    //     //pays :
    //     data.launch_service_provider.country_code;
    //     //nation image :
    //     data.launch_service_provider.nation_url;
    //     //lancements réussi :
    //     data.launch_service_provider.successful_launches;
    //     //lancement raté :
    //     data.launch_service_provider.failed_launches;
    //     //url :
    //     data.launch_service_provider.info_url;
    //     //logo
    //     data.launch_service_provider.logo_url;
    //---------------------------------------

    //rocket detail---------------------------
    // //rocket name :
    //     data.rocket.configuration.full_name;
    //     //reutilisable 
    //     data.rocket.configuration.reusable;
    //     //Si oui rocket flight proven ?
    //     data.rocket.launcher_stage.launcher.flight_proven;
    //     //si oui, number of flight :
    //     data.rocket.launcher_stage.launcher.flights;
    //     //rocket image :
    //     data.rocket.image_url
    //     //rocket serial number :
    //     data.rocket.launcher_stage.launcher.serial_number;
    //     //landing ?
    //     data.rocket.launcher_stage.landing.attempt;
    //     data.rocket.launcher_stage.landing.description;
    //     //success landing ?
    //     data.rocket.launcher_stage.landing.success;
    //---------------------------------------------

    //pad detail-----------------------------
    //     //pad:
    //     data.pad.name;
    //     //pad wiki:
    //     data.pad.wiki_url;
    //     // pad location;
    //     data.pad.latitude;
    //     data.pad.longitude;
    //     data.pad.location.name;
    //------------------------------------






    return (
        <div className="container-xxl">
            <div class="accordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Launch status
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Mission details
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <p>{data.mission.description}</p>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Launch provider
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Rocket
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Pad
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Launch