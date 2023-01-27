import './MapLocation.css'
import EarthLogo from '../images/earth.svg'

const MapLocation = (props) => {
    return (
        <div className="map-link">
            <img src={EarthLogo} alt="earth logo" />
            <a href={props.urlMap} target="_blank" rel="noreferrer">View location on map</a>
        </div>
    )
}

export default MapLocation