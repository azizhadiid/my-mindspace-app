export interface IFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IFormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}