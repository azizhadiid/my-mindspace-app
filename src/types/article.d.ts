export interface Artikel {
    id: string; // Menggunakan string sesuai Prisma
    title: string; // Menggunakan title sesuai Prisma
    category: string;
    publishDate: string; // Tetap string karena akan diparsing Date di frontend
    image: string; // Menggunakan image sesuai Prisma
    // Add other fields as needed
}

export interface InputFieldProps {
    id: string;
    label: string;
    type: React.HTMLInputTypeAttribute;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

export interface TextAreaFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

export interface ImageUploadFieldProps {
    id: string;
    label: string;
    onFileChange: (file: File | null) => void;
    previewUrl: string | null;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

export interface SubmitButtonProps {
    children: React.ReactNode;
    loading: boolean;
    onClick: () => void;
    className?: string;
}