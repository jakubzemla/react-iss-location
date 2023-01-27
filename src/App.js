import { useState, useEffect } from 'react'

import RefreshButton from './components/RefreshButton'
import LiveButton from './components/LiveButton'
import FormatsMenu from './components/FormatsMenu'
import MapLocation from './components/MapLocation'
import latLogo from './images/Latitude.svg'
import longLogo from './images/Longitude.svg'

const App = () => {
  /// API
  const url = "http://api.open-notify.org/iss-now.json"
  
  /// USE STATES
  //Get and set actual data
  const [urlData, setUrlData] = useState(null)

  //DD - Coordinates in Decimal Degrees - Default
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)

  //DMS - Coordinates in Degrees, minutes and seconds
  const [dmsLong, setDmsLong] = useState("")
  const [dmsLat, setDmsLat] = useState("")

  //DDM - Coordinates in Degrees and decimal minutes
  const [ddmLong, setDdmLong] = useState("")
  const [ddmLat, setDdmLat] = useState("")

  //Capital directions (North, South, West, East)
  const [capitalLat, setCapitalLat] = useState("")
  const [capitalLong, setCapitalLong] = useState("")

  const [activeFormat, setActiveFormat] = useState("dd")
  const [actualLatFormat, setActualLatFormat] = useState("")
  const [actualLongFormat, setActualLongFormat] = useState("")

  //URL for google maps
  const [urlMap, setUrlMap] = useState("")

  //Live reload
  const [isLiveReload, setIsLiveReload] = useState(false)

  
  ///FUNCTIONS
  //Get actual position in DD coordinates - on pageload and with refresh button
  const getCoordinates = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setUrlData(data)
    setLongitude(data["iss_position"]["longitude"])
    setLatitude(data["iss_position"]["latitude"])
  }

  const getMapLink = () => {
    setUrlMap(`https://www.google.com/maps/@${latitude},${longitude},2437142m/data=!3m1!1e3`)
  }

  //Get cardinal directions
  const getCardinalDirections = (lat, long) => {
    let vertical = lat >= 0 ? "N" : "S"
    let horizontal = long >= 0 ? "E" : "W"
    setCapitalLat(vertical)
    setCapitalLong(horizontal)
  }

  //Get actual position in DMS and DDM coordinates => CONVERTER from DD to DDM and DMS
  const convertCoordinates = (coordinate, type) => {
    // DMS and DDM coordinates cannot be in negative numbers!
    if (coordinate < 0) {
      coordinate = Math.abs(coordinate)
    }

    let degrees = Math.floor(coordinate)
    let convertedDdm = `${degrees}° ${((coordinate - degrees) * 60).toFixed(2)}'`
    if (type === "longitude") {
      setDdmLong(convertedDdm)
    } else {
      setDdmLat(convertedDdm)
    }

    let minutes = Math.floor((coordinate - degrees) * 60)
    let seconds = (((coordinate - degrees) * 60) - minutes) * 60
    let convertedDms = `${degrees}° ${minutes}' ${seconds.toFixed(2)}''`

    if (type === "longitude") {
      setDmsLong(convertedDms)
    } else {
      setDmsLat(convertedDms)
    }
  }

  //Hide refresh button when live reload is active
  const hideRefreshBtn = () => {
    const refreshButton = document.querySelector(".refresh-btn")
    refreshButton.classList.toggle("hidden")
  }


  ///PROPS
  //toggle for live reload button
  const toggleLiveReload = () => {
    setIsLiveReload(isLiveReload ? false : true)
    hideRefreshBtn()
  }

  //change format when user change the format on page
  const changeFormat = (elem) => {
    if (elem.target.id === "ddm") {
      setActualLatFormat(ddmLat.concat(capitalLat))
      setActualLongFormat(ddmLong.concat(capitalLong))
      setActiveFormat(elem.target.id)
    } else if (elem.target.id === "dms") {
      setActualLatFormat(dmsLat.concat(capitalLat))
      setActualLongFormat(dmsLong.concat(capitalLong))
      setActiveFormat(elem.target.id)
    } else {
      setActualLatFormat(latitude)
      setActualLongFormat(longitude)
      setActiveFormat(elem.target.id)
    }
  }

  //change format when user click on refresh or live-reload button
  const changeTest = () => {
    if (activeFormat === "ddm") {
      setActualLatFormat(ddmLat.concat(capitalLat))
      setActualLongFormat(ddmLong.concat(capitalLong))
    } else if (activeFormat === "dms") {
      setActualLatFormat(dmsLat.concat(capitalLat))
      setActualLongFormat(dmsLong.concat(capitalLong))
    } else {
      setActualLatFormat(latitude)
      setActualLongFormat(longitude)
    }
  }

  ///USE EFFECTS
  //Get data when page load
  useEffect( () => {
    getCoordinates()
    getMapLink()
  }, [])

  //Convert always when data change
  useEffect( () => {
    getCardinalDirections(latitude, longitude)
    convertCoordinates(longitude, "longitude")
    convertCoordinates(latitude, "latitude")
    getMapLink()
    setActualLatFormat(latitude)
    setActualLongFormat(longitude)
  }, [urlData])

  //Live reload (infinite loop control by button)
  useEffect( () => {
    if (isLiveReload) {
      getCoordinates()
      getMapLink()
      changeTest()
    }
    changeTest()
  })

  useEffect( () => {
    const liveButton = document.querySelector(".live-btn")
    if(isLiveReload) {
      liveButton.textContent = "Turn Off live reload"
    } else {
      liveButton.textContent = "Turn On live reload"
    }
  }, [isLiveReload])


  return (
    <section>
      <div className="coordinates">
        <FormatsMenu changeFormat={changeFormat} />
        <div className="data">
          <div className="dd">
            <h2>Coordinates</h2>
            <div className="lat">
              <img className="logo" src={latLogo} alt="latitude logo"/>
              <p>Latitude: {actualLatFormat}</p>
            </div>
            <div className="long">
              <img className="logo" src={longLogo} alt="longitude logo"/>
              <p>Longitude: {actualLongFormat}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <RefreshButton getCoordinates={getCoordinates} changeTest={changeTest}/>
        <LiveButton toggleLiveReload={toggleLiveReload} />
      </div>
      <MapLocation urlMap={urlMap} />
    </section>
  )
}

export default App