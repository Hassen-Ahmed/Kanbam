import { useCallback, useState } from "react";
import { IError } from "../../../../../types/status.type";
import { INewTheme } from "../../../../../types/styledComp";

import { MdEditNote } from "react-icons/md";
import { ICard } from "../../../../../types/kanbam";
import useUpdates from "../../../../../utils/api/useUpdates";
import useSignalRConnection from "../../../../../hooks/useSignalRConnection";
import styled from "styled-components";
import DOMPurify from "dompurify";
import { logger } from "../../../../../utils/logger";
import Tiptap from "./Tiptap";
import "./TextEditor.scss";
import { useAppSelector } from "../../../../../features/hooks";

const TextEditorStyled = styled.div<INewTheme>`
  .text-editor {
    &__save-btn {
      button:not(:first-child) {
        &:hover {
          background-color: ${({ $themeList, $newtheme }) =>
            $themeList[$newtheme].bg["hover"]};
        }
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["transparent"]};
        color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].font["quaternary"]};
      }
    }
    &__editorial-area,
    &__btns button {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["card"]};
      color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].font["quaternary"]};

      .dropdown-menu {
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["lists"]};
      }

      .tiptap-btns button {
        color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].font["quaternary"]};

        &:hover {
          background-color: ${({ $themeList, $newtheme }) =>
            $themeList[$newtheme].bg["lists"]};
        }
      }
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
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["hover"]};
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["quaternary"]};

    &:hover {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["hoverTertiary"]};
    }
  }
`;

export default function TextEditor({ cardDetail }: { cardDetail: ICard }) {
  const { themeName, themeList } = useAppSelector((state) => state.theme);
  const { updateCard } = useUpdates();
  const [isEditorialOpen, setIsEditorialOpen] = useState(false);
  const [html, setHtml] = useState(DOMPurify.sanitize(cardDetail.description!));
  const [description, setDescription] = useState<string | undefined>(
    DOMPurify.sanitize(cardDetail.description!)
  );

  // Configuration for real-time update
  const configureOnConnections = useCallback(
    async (connection: signalR.HubConnection) => {
      // update
      connection.on("ReceiveCardUpdate", (updatedCardReceived: ICard) => {
        setDescription(() => updatedCardReceived.description);
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

  // end of hooks
  const handleSave = async () => {
    try {
      const purifiedHtml = DOMPurify.sanitize(html);
      cardDetail.description = DOMPurify.sanitize(purifiedHtml);

      await updateCard(cardDetail.id!, cardDetail);

      setDescription(purifiedHtml);
      setIsEditorialOpen(false);
    } catch (err) {
      const error = err as IError;
      logger("error", `Error message: ${error.message}`);
    } finally {
      logger("info", "Send put request for description...");
    }
  };

  const handleCancel = () => setIsEditorialOpen(false);

  const editedContent = () => (
    <EditedStyled
      $themeList={themeList}
      $newtheme={themeName}
      className="text-editor__edited"
    >
      <div
        className="text-editor__edited-content"
        dangerouslySetInnerHTML={{ __html: `${description}` }}
      />

      <button
        onClick={() => {
          setHtml(description!);
          setIsEditorialOpen(true);
        }}
      >
        <MdEditNote size={20} />
      </button>
    </EditedStyled>
  );

  // JSX
  return (
    <TextEditorStyled
      $themeList={themeList}
      $newtheme={themeName}
      className="text-editor"
    >
      {(!description || description === "<p></p>") && !isEditorialOpen ? (
        <div
          className="text-editor__starter"
          onClick={() => setIsEditorialOpen(true)}
        >
          <p>Add more description</p>
        </div>
      ) : (
        <>
          {!isEditorialOpen ? (
            editedContent()
          ) : (
            <div className="text-editor__editorial-area">
              <Tiptap content={html} setHtml={setHtml} />
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
