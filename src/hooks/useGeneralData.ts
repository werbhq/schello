import { getEvents } from "../api/events";
import { getGeneralNews, getGeneralVideos } from "../api/general";
import { MAPPING } from "../api/mapping";
import { useQuery } from "react-query";

export const useGeneralData = () => {
  const { data: events, isLoading: isLoadingEvents } = useQuery(
    MAPPING.EVENTS,
    getEvents
  );
  const { data: news, isLoading: isLoadingNews } = useQuery(
    MAPPING.GENERAL.NEWS,
    getGeneralNews
  );
  const { data: videos, isLoading: isLoadingVideos } = useQuery(
    MAPPING.GENERAL.VIDEO,
    getGeneralVideos
  );

  return {
    events,
    news,
    videos,
    isLoading: isLoadingEvents || isLoadingNews || isLoadingVideos,
  };
};
