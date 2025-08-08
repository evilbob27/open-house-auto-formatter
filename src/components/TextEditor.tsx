import {Color} from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import {useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar'

type TextEditorProps = {
    value: string
    onChange: (val: string) => void
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
    const editor = useEditor({
        extensions: [
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            TextStyle,
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    return (
        <div style={{ width: '100%', maxWidth: '100%' }}>
            {editor && <MenuBar editor={editor} />}
            <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
                <EditorContent
                    editor={editor}
                    style={{ width: '100%', maxWidth: '100%' }}
                />
            </div>
        </div>
    )
}