import React from "react";
import Markdown from "react-markdown";

import Input from "./Input";

function App() {
  return (
    <div className="App">
      <Markdown source="# Your markdown here" />
      <Input />
    </div>
  );
}

export default App;
