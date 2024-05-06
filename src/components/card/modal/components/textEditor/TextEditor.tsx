import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { IoMdRedo, IoMdUndo } from "react-icons/io";
import { VscListOrdered, VscListUnordered } from "react-icons/vsc";
import "./TextEditor.scss";
import { ICard } from "../../../../../types/board.type";
import { IError } from "../../../../../types/status.type";
import { updateCard } from "../../../../../utils/api/updates";

export default function TextEditor({ cardDetail }: { cardDetail: ICard }) {
  const [html, setHtml] = useState(DOMPurify.sanitize(cardDetail.description!));
  const [isEditorialOpen, setIsEditorialOpen] = useState(false);
  const [localDescription, setLocalDescription] = useState(
    cardDetail.description
  );
  const paraRef = useRef(null);

  useEffect(() => {
    if (paraRef.current) {
      const elemRef = paraRef?.current as HTMLElement;
      elemRef.focus();
    }
  }, [isEditorialOpen]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!paraRef.current) return;
    try {
      const currentValue = paraRef.current as HTMLElement;
      cardDetail.description = currentValue.innerHTML;

      await updateCard(cardDetail.id!, cardDetail, token);

      setLocalDescription(currentValue.innerHTML);
      setIsEditorialOpen(false);
    } catch (err) {
      const error = err as IError;
      console.log(`Error message: ${error.message}`);
    } finally {
      console.log("Send put request for description...");
    }
  };

  const handleCancel = () => {
    setIsEditorialOpen(false);
  };

  const handleTextEdit = (value: string) => {
    document.execCommand(value);
  };

  return (
    <div className="text-editor">
      {!localDescription && !isEditorialOpen ? (
        <div
          className="text-editor__starter"
          onClick={() => setIsEditorialOpen(true)}
        >
          <p>Add more description</p>
        </div>
      ) : (
        <>
          {!isEditorialOpen ? (
            <div className="text-editor__edited">
              <div
                className="text-editor__edited-content"
                dangerouslySetInnerHTML={{ __html: `${localDescription}` }}
              />
              <button
                onClick={() => {
                  setHtml(localDescription!);
                  setIsEditorialOpen(true);
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="text-editor__editorial-area">
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

              <p
                className="text-editor__para-editing"
                contentEditable
                dangerouslySetInnerHTML={{
                  __html: html || "Write description here...",
                }}
                ref={paraRef}
              ></p>
              <div className="text-editor__save-btn">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
