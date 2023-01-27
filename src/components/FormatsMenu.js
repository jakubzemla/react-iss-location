import { useEffect } from 'react'

import './FormatsMenu.css'

const FormatsMenu = (props) => {
  useEffect( () => {
    const menu = document.getElementsByClassName("menu-item")
    const controlColor = () =>{
      for (let item of menu) {
        if (item.classList.contains("active")) {
          item.classList.remove("active")
        }
      }
    }
    const itemClicked = item => {
      controlColor()
      item.target.classList.add("active")
    }

    for (let item of menu) {
      item.addEventListener("click", itemClicked)
    }
  },[])
  return (
      <ul className="formats-menu">
        <li className="menu-item active" id="dd" onClick={props.changeFormat}>DD</li>
        <li className="menu-item" id="ddm" onClick={props.changeFormat}>DDM</li>
        <li className="menu-item" id="dms" onClick={props.changeFormat}>DMS</li>
      </ul>
  )
}

export default FormatsMenu