import { useEffect } from 'react'

import './RefreshButton.css'

const RefreshButton = (props) => {
    useEffect( () => {
        const button = document.querySelector(".refresh-btn")
        const menu = document.getElementsByClassName("menu-item")
        let active = null;
        const controlActive = () =>{
          for (let item of menu) {
            if (item.classList.contains("active")) {
                active = item
            }
          }
        }
        button.addEventListener("click", controlActive)
        button.addEventListener("click", props.changeTest)
    
      },[])
    return (
        <button className="refresh-btn" onClick={props.getCoordinates}>Refresh coordinates</button>
    )
}

export default RefreshButton