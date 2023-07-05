import { getEvents } from 'api/events';
import { getGeneralNews, getGeneralVideos } from 'api/general';
import { MAPPING } from 'api/mapping';
import { useQuery } from 'react-query';
import { EventInformation, MediaInformation } from 'types/Media';
import { tempMigrateData } from './dataMigrater';

export const useGeneralData = () => {
    const { data: events, isLoading: isLoadingEvents } = useQuery(MAPPING.EVENTS, getEvents);
    const { data: news, isLoading: isLoadingNews } = useQuery(MAPPING.GENERAL.NEWS, getGeneralNews);
    const { data: videos, isLoading: isLoadingVideos } = useQuery(
        MAPPING.GENERAL.VIDEO,
        getGeneralVideos
    );

    const updatedEvents: EventInformation[] = [];
    if (events !== undefined)
        events?.forEach((event) => {
            updatedEvents.push(tempMigrateData(event, 'Event') as EventInformation);
        });

    const updatedGeneralVideos: MediaInformation[] = [];
    if (videos !== undefined)
        videos?.forEach((video) => {
            updatedGeneralVideos.push(tempMigrateData(video, 'GeneralVideo') as MediaInformation);
        });

    const updatedGeneralNews: MediaInformation[] = [];
    if (news !== undefined)
        news?.forEach((news) => {
            updatedGeneralNews.push(tempMigrateData(news, 'GeneralNews') as MediaInformation);
        });

    return {
        events: updatedEvents,
        news: updatedGeneralNews,
        videos: updatedGeneralVideos,
        isLoading: isLoadingEvents || isLoadingNews || isLoadingVideos,
    };
};
