import { MediaInformation } from 'types/Media';

const data: MediaInformation = {
    id: '123',
    timestamp: '0',
    visible: true,
    type: 'MEDIA',

    title: 'Test Card',
    description: 'Sample Description',
    thumbnail: '',

    source: 'EXCISE',
    source_pfp: 'str',

    tenant: 'excise',

    media_type: 'VIDEO',

    url: '',

    redirect: false,
};

export const useNewData = () => {
    return {
        data,
        isLoading2: true,
    };
};
