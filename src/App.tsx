import React, { useState } from "react";
import CustomInput from "./CustomInput";

import "./App.css";

function App() {
  const [text, setText] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }
  return (
    <div>
      <CustomInput value={text} onChange={handleChange}>
        Input:
      </CustomInput>
      <p>You typed: {text ? text : "..."}</p>
    </div>
  );
}

export default App;
