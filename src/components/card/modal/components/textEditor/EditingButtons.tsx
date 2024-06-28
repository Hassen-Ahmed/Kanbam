import { IoMdRedo, IoMdUndo } from "react-icons/io";
import { VscListOrdered, VscListUnordered } from "react-icons/vsc";

export default function EditingButtons() {
  const handleTextEdit = (value: string) => {
    document.execCommand(value);
  };

  return (
    <div className="text-editor__btns">
      <button onClick={() => handleTextEdit("bold")}>B</button>
      <button onClick={() => handleTextEdit("italic")}>
        <em>I</em>
      </button>
      <button onClick={() => handleTextEdit("underline")}>
        <u>U</u>
      </button>
      <button onClick={() => handleTextEdit("insertOrderedList")}>
        <VscListOrdered />
      </button>
      <button onClick={() => handleTextEdit("insertUnorderedList")}>
        <VscListUnordered />
      </button>
      <button onClick={() => handleTextEdit("undo")}>
        <IoMdUndo size={20} />
      </button>
      <button onClick={() => handleTextEdit("redo")}>
        <IoMdRedo size={20} />
      </button>
    </div>
  );
}
