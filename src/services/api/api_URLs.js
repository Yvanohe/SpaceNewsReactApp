//API FOR NEWS ARTICLE :
const SF_NEWS_API_BASE_URL = "https://api.spaceflightnewsapi.net/v4/";

//API FOR LAUNCHES INFO :
const LL_API_BASE_URL = "https://ll.thespacedevs.com/2.2.0/";
const LL_API_DEV_URL = "https://lldev.thespacedevs.com/2.2.0/";

// exporting as an object :
const apisURLs = {
    newsUrl: SF_NEWS_API_BASE_URL + "articles/",
    upcomingLaunchesURL: LL_API_BASE_URL + "launch/upcoming/",
    upcomingLaunchesURL_DEV: LL_API_DEV_URL + "launch/upcoming/",
    launcheURL: LL_API_BASE_URL + "launch/",
    launcheURL_DEV: LL_API_DEV_URL + "launch/",
    throttleURL: LL_API_BASE_URL + "api-throttle/"
};

export default apisURLs;