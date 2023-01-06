import React from "react";
import preloader from "../../images/preloader.svg";

type PreloaderPropsType={

}
const Preloader = (props:PreloaderPropsType) => {
    return <div style={{backgroundColor:"white"}}>
        <img src={preloader}/>
    </div>
}
export default Preloader