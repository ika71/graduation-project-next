"use client";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Image from "@tiptap/extension-image";
import { FormEvent, useEffect, useState } from "react";
import BoardImageModal from "../modal/board/BoardImageModal";
import { apiUrl } from "@/url/backendUrl";

import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

interface Props {
  content: string;
  setContent: (content: string) => void;
  afterSetContent: () => Promise<void>;
}

interface Image {
  imageId: number;
  originName: string;
}

const TipTap = (props: Props) => {
  const { content, setContent, afterSetContent } = props;
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    if (loading) {
      afterSetContent();
    }
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "border border-gray-500 pl-4 pt-1 min-h-screen",
      },
    },
  });

  const openUploadModal = (event: FormEvent) => {
    event.preventDefault();
    setShowUploadModal(true);
  };
  const closeUploadModal = () => {
    setShowUploadModal(false);
  };
  const afterUpload = (uploadImages: Image[]) => {
    if (!editor) return;
    uploadImages.forEach((uploadImage) => {
      editor
        .chain()
        .focus()
        .setImage({ src: `${apiUrl}/image/${uploadImage.imageId}` })
        .run();

      editor.chain().createParagraphNear().run();
    });
  };
  const write = async (event: FormEvent) => {
    event.preventDefault();
    if (!editor) return;
    setContent(editor.getHTML());
  };

  return (
    <RichTextEditor editor={editor}>
      {showUploadModal && (
        <BoardImageModal
          closeModal={closeUploadModal}
          afterUpload={afterUpload}
        />
      )}

      <RichTextEditor.Toolbar sticky stickyOffset={0}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
        <button
          onClick={openUploadModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
        >
          이미지 업로드
        </button>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />

      <div className="text-right">
        <button
          onClick={write}
          className="w-full md:w-fit md:mx-2 md:my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
        >
          글 작성
        </button>
      </div>
    </RichTextEditor>
  );
};

export default TipTap;
