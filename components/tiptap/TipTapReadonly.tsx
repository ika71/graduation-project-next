"use client";

import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { RichTextEditor } from "@mantine/tiptap";

import styles from "./tiptapStyle.module.css";

interface Props {
  html: string;
}

const TipTapReadonly = (props: Props) => {
  const { html } = props;

  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
    ],
    content: html,
    editorProps: {
      attributes: {
        class: `border border-gray-500 pl-4 pt-1 min-h-screen ${styles.content}`,
      },
    },
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default TipTapReadonly;
