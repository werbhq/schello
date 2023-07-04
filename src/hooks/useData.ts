import { MediaInformation } from 'types/Media';

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

    views: 0,
};

const mediaArticle: MediaInformation = {
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

    media_type: 'VIDEO',

    url: '',

    redirect: false,

    views: 0,
};

const data: MediaInformation[] = [mediaVideo, mediaArticle];

export const useNewData = () => {
    return {
        data,
        isLoading2: false,
    };
};
