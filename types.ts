export type NoteType = {
    id: string;
    userId: string;
    name: string
    imageUrl?:string;
    createAt?:Date | undefined
    updatedAt: Date | undefined
    editorState: string | null | undefined
}