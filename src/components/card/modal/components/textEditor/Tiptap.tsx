import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./MenuBar";
import "./Tiptap.scss";

interface ITiptap {
  setHtml: React.Dispatch<React.SetStateAction<string>>;
  content: string;
}

const Tiptap = ({ setHtml, content }: ITiptap) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    content,
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
    onUpdate: ({ editor }) => {
      setHtml(() => editor.getHTML());
    },
  });

  return (
    <div
      className="tiptap-container"
      draggable="false"
      onDrag={(ev) => ev.stopPropagation()}
    >
      <MenuBar editor={editor!} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
