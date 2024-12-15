import { useCallback, useContext, useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

import { IError } from "../../../../../types/status.type";

import EditingButtons from "./EditingButtons";
import "./TextEditor.scss";
import { INewTheme } from "../../../../../types/styledComp";
import styled from "styled-components";
import {
  IkanbamContext,
  KanbamContext,
} from "../../../../../context/kanbamContext";
import { themes } from "../../../../../utils/constantDatas/themes";
import { MdEditNote } from "react-icons/md";
import { ICard } from "../../../../../types/kanbam";
import useUpdates from "../../../../../utils/api/useUpdates";
import useSignalRConnection from "../../../../../hooks/useSignalRConnection";
import { logger } from "../../../../../utils/logger";

const TextEditorStyled = styled.div<INewTheme>`
  .text-editor {
    &__save-btn {
      button:not(:first-child) {
        &:hover {
          background-color: ${({ $newtheme }) => themes[$newtheme].bg["hover"]};
        }
        background-color: ${({ $newtheme }) =>
          themes[$newtheme].bg["transparent"]};
        color: ${({ $newtheme }) => themes[$newtheme].font["quaternary"]};
      }
    }
    &__editorial-area,
    &__btns button {
      background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
      color: ${({ $newtheme }) => themes[$newtheme].font["quaternary"]};
    }

    &__btns button {
      &:not(:last-child) {
        border-right: 0.1rem solid #afafaf1a;
      }
    }
  }
`;

const EditedStyled = styled.div<INewTheme>`
  button {
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["hover"]};
    color: ${({ $newtheme }) => themes[$newtheme].font["quaternary"]};

    &:hover {
      background-color: ${({ $newtheme }) => themes[$newtheme].bg["hover_03"]};
    }
  }
`;

export default function TextEditor({ cardDetail }: { cardDetail: ICard }) {
  const [html, setHtml] = useState(DOMPurify.sanitize(cardDetail.description!));
  const { updateCard } = useUpdates();
  const [isEditorialOpen, setIsEditorialOpen] = useState(false);
  const [localDescription, setLocalDescription] = useState(
    cardDetail.description
  );
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  const paraRef = useRef(null);

  const configureOnConnections = useCallback(
    async (connection: signalR.HubConnection) => {
      // update
      connection.on("ReceiveCardUpdate", (updatedCardReceived: ICard) => {
        setLocalDescription(() => updatedCardReceived.description);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // SignalR connections
  useSignalRConnection({
    url: `${import.meta.env.VITE_KANBAM_HUB_URL}/cardHub?groupId=${
      cardDetail.listId
    }`,
    configureOnConnections,
  });

  useEffect(() => {
    if (paraRef.current) {
      const elemRef = paraRef?.current as HTMLElement;
      elemRef.focus();
    }
  }, [isEditorialOpen]);

  // end of hooks

  const handleSave = async () => {
    if (!paraRef.current) return;
    try {
      const currentValue = paraRef.current as HTMLElement;
      cardDetail.description = currentValue.innerHTML;

      await updateCard(cardDetail.id!, cardDetail);

      setLocalDescription(currentValue.innerHTML);
      setIsEditorialOpen(false);
    } catch (err) {
      const error = err as IError;
      logger("error", `Error message: ${error.message}`);
    } finally {
      logger("info", "Send put request for description...");
    }
  };

  const handleCancel = () => {
    setIsEditorialOpen(false);
  };

  const editedContent = (
    <EditedStyled $newtheme={theme} className="text-editor__edited">
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
        <MdEditNote size={20} />
      </button>
    </EditedStyled>
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
    <TextEditorStyled $newtheme={theme} className="text-editor">
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
    </TextEditorStyled>
  );
}
