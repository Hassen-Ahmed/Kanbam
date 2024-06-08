import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

import { updateCard } from "../../../../../utils/api/updates";
import { ICard } from "../../../../../types/board.type";
import { IError } from "../../../../../types/status.type";

import EditingButtons from "./EditingButtons";
import "./TextEditor.scss";

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

  // end of hooks

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

  const editedContent = (
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
  );

  const editingCanvas = (
    <p
      className="text-editor__para-editing"
      contentEditable
      dangerouslySetInnerHTML={{
        __html: html || "Write description here...",
      }}
      ref={paraRef}
    ></p>
  );

  // JSX
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
            editedContent
          ) : (
            <div className="text-editor__editorial-area">
              <EditingButtons />
              {editingCanvas}
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
