"use client";

import { useEffect } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
  Unlink,
  type LucideIcon
} from "lucide-react";

import { toRichTextHtml } from "@/lib/rich-text";

interface ToolbarButton {
  label: string;
  icon: LucideIcon;
  run: (editor: Editor) => void;
  isActive?: (editor: Editor) => boolean;
  isDisabled?: (editor: Editor) => boolean;
}

function editLink(editor: Editor) {
  const previous = editor.getAttributes("link").href as string | undefined;
  const url = window.prompt("Link URL (https://…)", previous ?? "https://");
  if (url === null) return;
  if (url.trim() === "" || url.trim() === "https://") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }
  editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
}

const groups: ToolbarButton[][] = [
  [
    { label: "Paragraph", icon: Pilcrow, run: (e) => e.chain().focus().setParagraph().run(), isActive: (e) => e.isActive("paragraph") },
    { label: "Heading 2", icon: Heading2, run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(), isActive: (e) => e.isActive("heading", { level: 2 }) },
    { label: "Heading 3", icon: Heading3, run: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(), isActive: (e) => e.isActive("heading", { level: 3 }) }
  ],
  [
    { label: "Bold", icon: Bold, run: (e) => e.chain().focus().toggleBold().run(), isActive: (e) => e.isActive("bold") },
    { label: "Italic", icon: Italic, run: (e) => e.chain().focus().toggleItalic().run(), isActive: (e) => e.isActive("italic") },
    { label: "Underline", icon: Underline, run: (e) => e.chain().focus().toggleUnderline().run(), isActive: (e) => e.isActive("underline") },
    { label: "Strikethrough", icon: Strikethrough, run: (e) => e.chain().focus().toggleStrike().run(), isActive: (e) => e.isActive("strike") }
  ],
  [
    { label: "Bullet list", icon: List, run: (e) => e.chain().focus().toggleBulletList().run(), isActive: (e) => e.isActive("bulletList") },
    { label: "Numbered list", icon: ListOrdered, run: (e) => e.chain().focus().toggleOrderedList().run(), isActive: (e) => e.isActive("orderedList") },
    { label: "Quote", icon: Quote, run: (e) => e.chain().focus().toggleBlockquote().run(), isActive: (e) => e.isActive("blockquote") },
    { label: "Divider", icon: Minus, run: (e) => e.chain().focus().setHorizontalRule().run() }
  ],
  [
    { label: "Add or edit link", icon: Link2, run: editLink, isActive: (e) => e.isActive("link") },
    { label: "Remove link", icon: Unlink, run: (e) => e.chain().focus().unsetLink().run(), isDisabled: (e) => !e.isActive("link") }
  ],
  [
    { label: "Undo", icon: Undo2, run: (e) => e.chain().focus().undo().run(), isDisabled: (e) => !e.can().undo() },
    { label: "Redo", icon: Redo2, run: (e) => e.chain().focus().redo().run(), isDisabled: (e) => !e.can().redo() }
  ]
];

/** Rich text editor for admin content; emits HTML ("" when empty). */
export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write the article…"
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" }
      })
    ],
    content: toRichTextHtml(value),
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: "rich-text min-h-[260px] px-4 py-3 text-sm text-slate-900 outline-none",
        "aria-label": placeholder
      }
    },
    onUpdate: ({ editor: current }) => onChange(current.isEmpty ? "" : current.getHTML())
  });

  // Load a different post's content (e.g. after clicking Edit or Reset).
  useEffect(() => {
    if (!editor) return;
    const next = toRichTextHtml(value);
    const current = editor.isEmpty ? "" : editor.getHTML();
    if (next !== current) editor.commands.setContent(next, { emitUpdate: false });
  }, [editor, value]);

  return (
    <div className="mt-1.5 overflow-hidden rounded-md border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15">
      <div role="toolbar" aria-label="Text formatting" className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
        {groups.map((group, index) => (
          <div key={index} className="flex items-center gap-0.5 border-r border-slate-200 pr-1 last:border-r-0">
            {group.map(({ label, icon: Icon, run, isActive, isDisabled }) => {
              const active = editor ? (isActive?.(editor) ?? false) : false;
              return (
                <button
                  key={label}
                  type="button"
                  title={label}
                  aria-label={label}
                  aria-pressed={isActive ? active : undefined}
                  disabled={!editor || (isDisabled?.(editor) ?? false)}
                  onClick={() => editor && run(editor)}
                  className={`flex h-8 w-8 items-center justify-center rounded transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
                    active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
