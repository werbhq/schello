import { MediaInformation, EventInformation } from 'types/Media';

const mediaVideo: MediaInformation = {
    id: '123',
    timestamp: '0',
    visible: true,
    type: 'MEDIA',

    title: 'Music Drug Awareness High School Student Video Winner Music Drug Awareness High School Student Video Winner',
    description:
        '<p><span style="color: rgb(55, 65, 81)">Drug abuse can have a significant social impact on communities, affecting not only the individuals who abuse drugs but also their families, friends, and neighbors. Some of the social consequences of drug abuse on community life include Drug abuse can lead to criminal behavior, such as theft, violence, and drug-related offenses. This can create a sense of fear and insecurity in the community, as well as burdening the criminal justice system.Drug abuse can lead to family problems, such as neglect, abuse, and divorce. This can impact the children in the family, leading to emotional and behavioral issues, and placing a strain on social services.</span></p>',
    thumbnail: 'https://i3.ytimg.com/vi/yl_7qSgrf3Y/maxresdefault.jpg',

    source: 'Ramu',
    source_pfp: undefined,

    fromExcise: false,

    tenant: 'excise',

    media_type: 'VIDEO',

    url: '',

    redirect: false,
};

const mediaArticleorNews: MediaInformation = {
    id: '123',
    timestamp: '0',
    visible: true,
    type: 'MEDIA',

    title: 'Music Drug Awareness High School Student Video Winner Music Drug Awareness High School Student Video Winner',
    description:
        '<p><span style="color: rgb(55, 65, 81)">Drug abuse can have a significant social impact on communities, affecting not only the individuals who abuse drugs but also their families, friends, and neighbors. Some of the social consequences of drug abuse on community life include Drug abuse can lead to criminal behavior, such as theft, violence, and drug-related offenses. This can create a sense of fear and insecurity in the community, as well as burdening the criminal justice system.Drug abuse can lead to family problems, such as neglect, abuse, and divorce. This can impact the children in the family, leading to emotional and behavioral issues, and placing a strain on social services.</span></p>',
    thumbnail: 'https://i3.ytimg.com/vi/yl_7qSgrf3Y/maxresdefault.jpg',

    source: 'Ramu',
    source_pfp: undefined,

    fromExcise: true,

    tenant: 'excise',

    media_type: 'ARTICLE',

    url: '',

    redirect: false,
};

const mediaList: MediaInformation[] = [
    mediaVideo,
    mediaArticleorNews,
    mediaVideo,
    mediaArticleorNews,
];

export const useSampleData = () => {
    return {
        mediaList,
        eventList,
        isLoading: false,
    };
};

const eventVirtual: EventInformation = {
    id: '123',
    timestamp: '0',
    visible: true,
    type: 'EVENT',

    title: 'Music Drug Awareness High School Student Video Winner Music Drug Awareness High School Student Video Winner',
    description:
        '<p><span style="color: rgb(55, 65, 81)">Drug abuse can have a significant social impact on communities, affecting not only the individuals who abuse drugs but also their families, friends, and neighbors. Some of the social consequences of drug abuse on community life include Drug abuse can lead to criminal behavior, such as theft, violence, and drug-related offenses. This can create a sense of fear and insecurity in the community, as well as burdening the criminal justice system.Drug abuse can lead to family problems, such as neglect, abuse, and divorce. This can impact the children in the family, leading to emotional and behavioral issues, and placing a strain on social services.</span></p>',
    thumbnail: 'https://i3.ytimg.com/vi/yl_7qSgrf3Y/maxresdefault.jpg',

    source: 'Ramu',
    source_pfp: undefined,

    fromExcise: false,

    tenant: 'excise',

    mode: 'VIRTUAL',

    venue: 'Google Meet',
    register_url: 'https://meet.google.com/scp-wwmm-wmx',

    date_to: '2021-09-30',
    date_from: '2021-09-30',
    time_to: '2023-02-12T06:30:00.000Z',
    time_from: '2023-02-12T03:30:00.000Z',
};

const eventList: EventInformation[] = [eventVirtual, eventVirtual, eventVirtual, eventVirtual];
