import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";

const useStyles = makeStyles(() => ({
  editor: {
    fontSize: "large"
  }
}));

let cm;

function Input(props) {
  const classes = useStyles();
  const textArea = useRef();
  const initialText = useRef(props.text);
  const onChange = useRef(props.onChange);

  useEffect(() => {
    const change = onChange.current;

    cm = CodeMirror.fromTextArea(textArea.current, {
      lineNumbers: true,
      mode: "markdown",
      theme: "dracula",
      lineWrapping: false
    });

    cm.setValue(initialText.current);
    cm.setSize(null, "60vh");
    cm.on("change", () => change(cm.getValue()));

    change(initialText.current);

    return () => {
      console.log("unload codemirror");

      cm.toTextArea();
    };
  }, []);

  return (
    <div className={classes.editor}>
      <textarea ref={textArea} {...props} />
    </div>
  );
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Input;
