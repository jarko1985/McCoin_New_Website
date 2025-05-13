export type Job = {
    id: number;
    title: string;
    description: string;
    skills: string[];
    iconName: 'Code' | 'ShieldCheck' | 'Users' | 'Megaphone' | 'Headset';
    tags: string[];
  };