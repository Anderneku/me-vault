interface FileRecord {
    id: string;
    filename: string;
    uploaded_at: string;
    size: number | null;
    mime_type: string | null;
}