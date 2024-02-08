function ResearchForm({ setUrl, inputValues, setInputValues }) {

    function buildUrlonSubmit(e) {

        e.preventDefault();
        var urltoBuild = "https://api.spaceflightnewsapi.net/v4/articles/";

        //interate all input of form (excep last one which is submit button)
        for (let i = 0; i < e.target.length - 1; i++) {
            let name = e.target[i].name;
            let value = "";

            //maybe not necessary because there is no true/false parameters which would use a checkbox
            let type = e.target[i].type;
            if (type === "checkbox") {
                value = e.target[i].checked; //for checkbox use "checked" attribute instead of "value"
            } else {
                value = e.target[i].value;
            }

            //append parameters to url :
            if (i === 0) {
                urltoBuild = urltoBuild + "?" + name + "=" + value;
            } else {
                urltoBuild = urltoBuild + "&" + name + "=" + value;
            }
        }
        setUrl(urltoBuild);
    }

    function handleInputValueschanges(e) {
        // adding or modifying a property of object listing all inputvalues :      
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    }


    return (

        //Name of input must be the same as the parameters expected by the api https://api.spaceflightnewsapi.net/v4/docs/#/articles/articles_list
        <form className="w-100" onSubmit={buildUrlonSubmit}>
            <div className="mb-3 row justify-content-center">
                <label htmlFor="published_at_gte" className="col-12 col-md-2 col-form-label">Published after</label>
                <div className="col-12 col-md-5">
                    <input type="date" className="form-control" name="published_at_gte" id="published_at_gte" value={inputValues.published_at_gte ?? ''} onChange={handleInputValueschanges} />
                </div>
            </div>
            <div className="mb-3 row justify-content-center">
                <label htmlFor="published_at_lte" className="col-12 col-md-2 col-form-label">Published before</label>
                <div className="col-12 col-md-5">
                    <input type="date" className="form-control" name="published_at_lte" id="published_at_lte" value={inputValues.published_at_lte ?? ''} onChange={handleInputValueschanges} />
                </div>
            </div>
            <div className="mb-3 row justify-content-center">
                <label htmlFor="search" className="col-12 col-md-2 col-form-label">Contains this text</label>
                <div className="col-12 col-md-5">
                    <input type="text" className="form-control" name="search" id="search" value={inputValues.search ?? ''} onChange={handleInputValueschanges} />
                </div>
            </div>
            <div className="mb-3 row justify-content-center">
                <div className="col-12 col-md-2">Concerns a launch ?</div>
                <div className="col-12 col-md-5 ">
                    <select className="form-select" aria-label="Default select example" name="has_launch" value={inputValues.has_launch ?? ''} onChange={handleInputValueschanges}>
                        <option value="" >no matter</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
            <div className="mb-3 row justify-content-center">
                <div className="col-12 col-md-2">Number of resuts :</div>
                <div className="col-12 col-md-5">
                    <select className="form-select" aria-label="Default select example" name="limit" value={inputValues.limit ?? '10'} onChange={handleInputValueschanges}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-7">
                    <button type="submit" className="btn btn-secondary btn-lg w-100">Search</button>
                </div>
            </div>
        </form>



    )



}

export default ResearchForm