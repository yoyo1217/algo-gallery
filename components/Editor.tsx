"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import knapsack from "@/code-text/knapsack.txt";

const extensions = [javascript({ jsx: true })];

const Editor = () => {
  return (
    <div className="w-full px-2">
      <CodeMirror
        value={knapsack}
        theme={okaidia}
        width="100%"
        extensions={[javascript({ jsx: true })]}
        readOnly={true}
      />
    </div>
  );
};
export default Editor;
