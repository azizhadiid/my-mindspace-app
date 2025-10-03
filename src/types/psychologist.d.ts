export interface Psychologist {
    id: string;
    name: string;
    specialization: string;
    rating: number;
    experience: string;
    price: string;
    image: string;
    verified: boolean;
}

export interface ConsultationForm {
    psychologistId: string;
    date: string;
    time: string;
    type: 'video' | 'chat' | 'phone';
    topic: string;
    description: string;
    urgency: 'low' | 'medium' | 'high';
}