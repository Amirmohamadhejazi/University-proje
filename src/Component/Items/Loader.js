import {useEffect} from "react";

function Loader({Show, children}) {

    return (
        <div id="preloader" className={["" , Show ? "d-block": "d-none "].join(" ")} />
    );
}

export default Loader;
