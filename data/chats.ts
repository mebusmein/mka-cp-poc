export type Chat = {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unread: number;
    avatar?: string;
};

export const CHATS: Chat[] = [
    {
        id: '1',
        name: 'Jan de Vries',
        lastMessage: 'Bedankt voor de hulp van vandaag!',
        time: '10:30',
        unread: 2,
    },
    {
        id: '2',
        name: 'Maria Bakker',
        lastMessage: 'Kunnen we de afspraak verzetten?',
        time: '09:15',
        unread: 0,
    },
    {
        id: '3',
        name: 'Pieter Jansen',
        lastMessage: 'De documenten zijn ondertekend',
        time: 'Gisteren',
        unread: 0,
    },
    {
        id: '4',
        name: 'Team Coördinatie',
        lastMessage: 'Nieuwe planning beschikbaar',
        time: 'Gisteren',
        unread: 5,
    },
    {
        id: '5',
        name: 'Sophie van Dijk',
        lastMessage: 'Tot morgen!',
        time: 'Ma',
        unread: 0,
    },
];

export function getChatById(id: string): Chat | undefined {
    return CHATS.find((chat) => chat.id === id);
}

