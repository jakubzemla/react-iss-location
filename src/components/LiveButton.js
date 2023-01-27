import { useEffect } from 'react'

import './LiveButton.css'

const LiveButton = (props) => {
    useEffect( () => {
        const button = document.querySelector(".live-btn")
        const menu = document.getElementsByClassName("menu-item")
        let active = null;
        const controlActive = () =>{
          for (let item of menu) {
            if (item.classList.contains("active")) {
                active = item
                console.log(active.id)
            }
          }
        }
        button.addEventListener("click", controlActive)
      },[])
    return (
        <button className="live-btn" onClick={props.toggleLiveReload}>Turn On live reload</button>
    )
}

export default LiveButton