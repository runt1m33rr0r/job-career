import React, { useEffect } from "react";
import CodeMirror from "codemirror";
import { makeStyles } from "@material-ui/core/styles";

import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";

let textArea = null;
let handleChange = null;
let cm = null;

const useStyles = makeStyles(theme => ({
  editor: {
    fontSize: "large"
  }
}));

function Input(props) {
  const classes = useStyles();
  textArea = React.createRef();
  handleChange = () => props.onChange(cm.getValue());

  useEffect(() => {
    cm = CodeMirror.fromTextArea(textArea.current, {
      lineNumbers: true,
      mode: "markdown",
      theme: "dracula",
      lineWrapping: false
    });

    cm.setValue(props.text);
    cm.setSize(textArea.current.parentNode.clientWidth, null);

    return () => {
      handleChange();
      cm.toTextArea();
    };
  }, [props]);

  return (
    <div className={classes.editor}>
      <textarea ref={textArea} {...props} />
    </div>
  );
}

export default Input;
