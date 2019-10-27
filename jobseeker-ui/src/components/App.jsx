import React from "react";
import Markdown from "react-markdown";
import Button from "@material-ui/core/Button";
import Input from "./Input";

function App() {
  return (
    <div className="App">
      <Markdown source="# Your markdown here" />
      <Input />
      <Button variant="contained" color="secondary">
        Button
      </Button>
    </div>
  );
}

export default App;
