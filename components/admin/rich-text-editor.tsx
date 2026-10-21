"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Loader2,
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
import { adminFetch } from "@/lib/admin/admin-fetch";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Uploads an image for the article body and returns its public URL. */
async function uploadImage(file: File): Promise<string> {
  const data = new FormData();
  data.set("image", file);
  const response = await adminFetch("/api/admin/blogs/content-images", {
    method: "POST",
    body: data
  });
  const body = (await response.json().catch(() => ({}))) as {
    url?: string;
    message?: string | string[];
  };
  if (!response.ok || !body.url) {
    const message = Array.isArray(body.message) ? body.message[0] : body.message;
    throw new Error(message ?? "Unable to upload the image.");
  }
  return body.url;
}

/** Image files in a paste or drop (screenshots, files copied from disk). */
function imageFiles(list: FileList | null | undefined): File[] {
  return Array.from(list ?? []).filter((file) => IMAGE_TYPES.includes(file.type));
}

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
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const [imageError, setImageError] = useState("");
  // Set once the editor exists; paste/drop handlers call it.
  const insertImagesRef = useRef<(files: File[], at?: number) => void>(() => undefined);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" }
      }),
      // Images pasted as web links are kept; files are uploaded first.
      Image.configure({ inline: false, allowBase64: false })
    ],
    content: toRichTextHtml(value),
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: "rich-text min-h-[260px] px-4 py-3 text-sm text-slate-900 outline-none",
        "aria-label": placeholder
      },
      handlePaste: (_view, event) => {
        const files = imageFiles(event.clipboardData?.files);
        if (files.length === 0) return false; // normal text/HTML paste
        event.preventDefault();
        insertImagesRef.current(files);
        return true;
      },
      handleDrop: (view, event, _slice, moved) => {
        if (moved) return false;
        const files = imageFiles(event.dataTransfer?.files);
        if (files.length === 0) return false;
        event.preventDefault();
        const at = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        insertImagesRef.current(files, at);
        return true;
      }
    },
    onUpdate: ({ editor: current }) => onChange(current.isEmpty ? "" : current.getHTML())
  });

  insertImagesRef.current = (files, at) => {
    if (!editor) return;
    setImageError("");
    for (const file of files) {
      setUploading((count) => count + 1);
      void uploadImage(file)
        .then((src) => {
          const chain = editor.chain().focus();
          (at === undefined ? chain : chain.setTextSelection(at))
            .setImage({ src, alt: file.name.replace(/\.[^.]+$/, "") })
            .run();
        })
        .catch((cause: unknown) =>
          setImageError(cause instanceof Error ? cause.message : "Unable to upload the image.")
        )
        .finally(() => setUploading((count) => count - 1));
    }
  };

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
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            title="Insert image"
            aria-label="Insert image"
            disabled={!editor}
            onClick={() => fileInput.current?.click()}
            className="flex h-8 w-8 items-center justify-center rounded text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-35"
          >
            {uploading > 0 ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept={IMAGE_TYPES.join(",")}
            multiple
            hidden
            onChange={(event) => {
              insertImagesRef.current(imageFiles(event.target.files));
              event.target.value = "";
            }}
          />
        </div>
      </div>
      {imageError && (
        <p role="alert" className="border-b border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
          {imageError}
        </p>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
