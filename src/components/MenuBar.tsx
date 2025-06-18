"use client"

import { Editor } from "@tiptap/react";

type MenuBarProps = {
    editor: Editor | null
}

const MenuBar = ({ editor }: MenuBarProps) => {
    if (!editor) {
        return null
    }

    return (
        <div>
            <div
                className="flex justify-start items-center gap-6 ml-4 *:border *:border-gray-200 *:rounded-md *:px-2 *:hover:bg-gray-200">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('strong') ? 'is-active' : ''}
                >
                    <span className="font-semibold">Bold</span>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <span className="italic">Italic</span>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setColor('#000000').run()}
                    className={`flex items-center py-1 ${editor.isActive('textStyle', {color: '#000000'}) ? 'is-active' : ''}`}
                >
                    <span className="inline-block mx-1 w-4 h-4 rounded-sm bg-black items-center"></span>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setColor('#FF0000').run()}
                    className={`flex items-center py-1 ${editor.isActive('textStyle', {color: '#FF0000'}) ? 'is-active' : ''}`}
                >
                    <span className="inline-block mx-1 w-4 h-4 rounded-sm bg-[#FF0000]"></span>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                >
                    Undo
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                >
                    Redo
                </button>
            </div>
        </div>
    )
}

export default MenuBar;