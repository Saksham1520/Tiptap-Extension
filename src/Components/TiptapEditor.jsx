import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HideUnhide from "./HideUnhideExtention";
import parse from "html-react-parser";

const TiptapEditor = () => {
  const [dropdownValue, setDropdownValue] = useState("unhide");
  const [htmlContent, setHtmlContent] = useState("");
  const editor = useEditor({
    extensions: [StarterKit, HideUnhide],
    content: ` `,
  });

  const handleDropdownChange = (e) => {
    const action = e.target.value;
    setDropdownValue(action);

    if (action === "hide") {
      editor.chain().focus().toggleHidden().run();
    } else if (action === "unhide") {
      editor.chain().focus().showContent().run();
    }
  };

  const handleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleEditorContent = () => {
    const html = editor.getHTML();
    setHtmlContent(html);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-4xl bg-blue-300ue- rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-700 text-center">
          Tiptap Editor with Hide/Unhide & Text Formatting
        </h1>

        <div className="flex justify-center items-center space-x-4 mt-4">
          <select
            value={dropdownValue}
            onChange={handleDropdownChange}
            className="bg-blue-950 text-white py-2 px-4  rounded-lg shadow-md focus:outline-none focus:ring-2 "
          >
            <option value="unhide">Show Content</option>
            <option value="hide">Hide Content</option>
          </select>
          <button
            onClick={handleBold}
            className="text-lg font-semibold text-gray-700 p-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={handleItalic}
            className="text-lg font-semibold text-gray-700 p-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none"
          >
            <em>I</em>
          </button>
        </div>

        <div className="border-t-2 border-gray-400 pt-6">
          <EditorContent
            editor={editor}
            className="text-lg border-2 border-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            onClick={handleEditorContent}
            className="text-lg mt-2 font-semibold text-white p-2 bg-blue-950 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none"
          >
            Save
          </button>
        </div>
        <div>{parse(htmlContent)}</div>
      </div>
    </div>
  );
};

export default TiptapEditor;
