import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div>
            <div className="flex justify-around items-center *:border *:border-gray-200 *:rounded-md *:px-2 *:hover:bg-gray-200">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <span className="font-semibold">Bold</span>
                </button>
                <button
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
                    onClick={() => editor.chain().focus().setColor('#000000').run()}
                    className={`flex items-center py-1 ${editor.isActive('textStyle', { color: '#000000' }) ? 'is-active' : ''}`}
                >
                    <span className="inline-block w-4 h-4 rounded-sm bg-black items-center"></span>
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#FF0000').run()}
                    className={`flex items-center py-1 ${editor.isActive('textStyle', { color: '#FF0000' }) ? 'is-active' : ''}`}
                >
                    <span className="inline-block w-4 h-4 rounded-sm bg-[#FF0000]"></span>
                </button>
                <button
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

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
]

const content = `
<p></p>
`

export default () => {
    return (
        <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
    )
}