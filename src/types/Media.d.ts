export interface MediaInformation extends Information {
    media_type: 'ARTICLE' | 'NEWS' | 'VIDEO';

    url?: string;
    redirect?: boolean;

    views: number;
}

export interface EventInformation extends Information {
    mode: 'VIRTUAL' | 'OFFLINE';

    venue: string;
    register_url?: string;

    date_to: string;
    date_from: string;
    time_to: string;
    time_from: string;
}

export interface Information {
    id: string;
    timestamp: string;
    visible: boolean;
    type: 'EVENT' | 'MEDIA';

    title: string;
    description?: string;
    thumbnail?: string;

    source?: 'EXCISE' | string;
    source_pfp?: string;

    tenant: string;
}
