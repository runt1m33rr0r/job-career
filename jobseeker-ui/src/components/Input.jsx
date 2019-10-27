import React, { useEffect } from "react";
import CodeMirror from "codemirror";

import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";

function Input() {
  const textArea = React.createRef();

  useEffect(() => {
    CodeMirror.fromTextArea(textArea.current, {
      lineNumbers: true,
      mode: "markdown",
      theme: "dracula"
    });
  }, [textArea]);

  return <textarea ref={textArea}></textarea>;
}

export default Input;
