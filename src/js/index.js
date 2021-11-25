import ReactDOM from 'react-dom';
import React, { useState } from "react";

import Button from './App/Button/Button'
import slider from "./components/slider";

slider()

const App = () => {
  const [inputText, setText] = useState('Text')
  const inputHandler = (e) => {
    setText(e.target.value)
  }
  return (
    <div className="u-py-24">
      <Button />
      <div className="u-mt-24">
        <input
          type="text"
          className="input"
          onInput={inputHandler}
          value={inputText}
          placeholder="Some placeholder"
        />
        <div>{inputText}</div>
      </div>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('react-app'));
