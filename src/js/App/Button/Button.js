import React, {useState} from "react";

const Button = () => {
  const [active, setActive] = useState(false)
  const clickHandler = () => {
    setActive(!active)
  }
  return(
    <button
      onClick={clickHandler}
      className={`button  ${active ? "button--secondary": "button--white"}`}
    >
      {active ? "Click me again" : "Click me"}
    </button>
  )
}

export default Button;
