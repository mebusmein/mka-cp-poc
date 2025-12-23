import { Ionicons } from '@expo/vector-icons';

export type Service = {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    details?: string;
};

export const SERVICES: Service[] = [
    {
        id: '1',
        title: 'Huishoudelijke hulp',
        description: 'Ondersteuning bij dagelijkse huishoudelijke taken',
        icon: 'home-outline',
        color: '#818cf8',
        details:
            'Onze huishoudelijke hulp ondersteunt bij dagelijkse taken zoals schoonmaken, wassen, strijken en boodschappen doen. We zorgen ervoor dat uw huis netjes en georganiseerd blijft, zodat u zich kunt concentreren op wat echt belangrijk is.',
    },
    {
        id: '2',
        title: 'Persoonlijke verzorging',
        description: 'Hulp bij persoonlijke hygiëne en verzorging',
        icon: 'heart-outline',
        color: '#f472b6',
        details:
            'Persoonlijke verzorging omvat hulp bij wassen, aankleden, toiletgang en andere persoonlijke hygiëne. Onze zorgverleners werken met respect en waardigheid om u te helpen bij uw dagelijkse verzorging.',
    },
    {
        id: '3',
        title: 'Begeleiding',
        description: 'Ondersteuning bij dagelijkse activiteiten',
        icon: 'people-outline',
        color: '#34d399',
        details:
            'Begeleiding biedt ondersteuning bij het plannen en uitvoeren van dagelijkse activiteiten. Dit kan variëren van hulp bij administratie tot begeleiding bij sociale activiteiten en het structureren van uw dag.',
    },
    {
        id: '4',
        title: 'Verpleging',
        description: 'Medische verpleegkundige zorg aan huis',
        icon: 'medkit-outline',
        color: '#fbbf24',
        details:
            'Onze verpleegkundigen bieden professionele medische zorg aan huis. Dit omvat wondverzorging, medicatiebeheer, injecties en monitoring van uw gezondheidstoestand in nauw overleg met uw arts.',
    },
    {
        id: '5',
        title: 'Dagbesteding',
        description: 'Zinvolle dagactiviteiten en sociale contacten',
        icon: 'sunny-outline',
        color: '#fb923c',
        details:
            'Dagbesteding biedt een gevarieerd programma van activiteiten gericht op sociale contacten, creatieve bezigheden en beweging. Een perfecte manier om de dag zinvol door te brengen en nieuwe mensen te ontmoeten.',
    },
];

export function getServiceById(id: string): Service | undefined {
    return SERVICES.find((service) => service.id === id);
}

