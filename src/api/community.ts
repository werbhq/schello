import { collection, Timestamp, addDoc, getDocs, query, where } from 'firebase/firestore';
import { fireStore, processSnapshot } from '.';
import { CommunityVideo, CommunityArticle } from 'types/Community';
import { migrateData } from 'hooks/dataMigrater';
import { MAPPING } from './mapping';
import { MediaInformation } from 'types/Media';

type CommunityForm = Omit<
    CommunityVideo & CommunityArticle,
    'id' | 'timestamp' | 'visible' | 'redirect_url' | 'news_type'
>;

export const addCommunityForm = async (data: CommunityForm, type: 'VIDEO' | 'ARTICLE') => {
    const communityRef = collection(
        fireStore,
        type === 'ARTICLE' ? MAPPING.COMMUNITY.ARTICLE : MAPPING.COMMUNITY.VIDEO
    );

    const refinedData =
        type === 'ARTICLE'
            ? {
                  title: data.title,
                  author: data.author,
                  email: data.email,
                  description: data.description,
              }
            : {
                  title: data.title,
                  author: data.author,
                  email: data.email,
                  description: data.description,
                  platform: data.platform,
                  url: data.url,
                  thumbnail: data.thumbnail,
              };

    await addDoc(communityRef, {
        ...refinedData,
        visible: false,
        timestamp: Timestamp.fromDate(new Date()),
    });
};

export const getCommunityVideos = async () => {
    const videoRef = collection(fireStore, MAPPING.COMMUNITY.VIDEO);
    const communityVideoQuery = query(videoRef, where('visible', '==', true));
    const snapshot = await getDocs(communityVideoQuery);
    const data = processSnapshot(snapshot);
    return (data as CommunityVideo[]).map((e) =>
        migrateData(e, 'CommunityVideo')
    ) as MediaInformation[];
};

export const getCommunityArticle = async () => {
    const articleRef = collection(fireStore, MAPPING.COMMUNITY.ARTICLE);
    const communityArticleQuery = query(articleRef, where('visible', '==', true));
    const snapshot = await getDocs(communityArticleQuery);
    const data = processSnapshot(snapshot);
    return (data as CommunityArticle[]).map((e) =>
        migrateData(e, 'CommunityArticle')
    ) as MediaInformation[];
};
