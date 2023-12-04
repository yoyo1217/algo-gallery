"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import knapsack from "@/code-text/knapsack.txt";

const extensions = [javascript({ jsx: true })];

const Editor = () => {
  return (
    <CodeMirror
      value={knapsack}
      theme={okaidia}
      extensions={[javascript({ jsx: true })]}
      readOnly={true}
    />
  );
};
export default Editor;
