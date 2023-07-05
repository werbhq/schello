import { collection, query, where, getDocs } from 'firebase/firestore';
import { fireStore, processSnapshot } from '.';
import { MAPPING } from './mapping';
import { GeneralNews, GeneralVideo } from 'types/General Awarness';
import { sortByTimeStamp } from 'util/TimeStamp';
import { MediaInformation } from 'types/Media';
import { migrateData } from 'hooks/dataMigrater';

export const getGeneralVideos = async () => {
    const videoRef = collection(fireStore, MAPPING.GENERAL.VIDEO);
    const videoQuery = query(videoRef, where('visible', '==', true));
    const videoSnapshot = await getDocs(videoQuery);
    const data = processSnapshot(videoSnapshot) as GeneralVideo[];
    return data.map((e) => migrateData(e, 'GeneralVideo')) as MediaInformation[];
};

export const getGeneralNews = async () => {
    const newsRef = collection(fireStore, MAPPING.GENERAL.NEWS);
    const newsQuery = query(newsRef, where('visible', '==', true));
    const newsSnapshot = await getDocs(newsQuery);
    const newsData = processSnapshot(newsSnapshot);

    const googleNewsRef = collection(fireStore, MAPPING.GENERAL.GOOGLE_NEWS);
    const googleNewsQuery = query(googleNewsRef, where('visible', '==', true));
    const googleNewsSnapshot = await getDocs(googleNewsQuery);
    const googleNewsData = processSnapshot(googleNewsSnapshot);

    const data = [...newsData, ...googleNewsData].sort(sortByTimeStamp) as GeneralNews[];
    return data.map((e) => migrateData(e, 'GeneralNews')) as MediaInformation[];
};
