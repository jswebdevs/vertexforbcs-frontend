import GallerySettings from "./GallerySettings";
import Sliders from "./Sliders";

const SiteSettings = () => {
    return (
        <div>
            Welcome to Site Editing Panel.
            <Sliders></Sliders> 
            <GallerySettings></GallerySettings>           
        </div>
    );
};

export default SiteSettings;