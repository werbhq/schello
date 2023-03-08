import { getCommunityArticle, getCommunityVideos } from "api/community";
import { MAPPING } from "api/mapping";
import { useQuery } from "react-query";

export const useCommunityData = () => {
  const { data: articles, isLoading: isLoadingNews } = useQuery(
    MAPPING.COMMUNITY.ARTICLE,
    getCommunityArticle
  );
  const { data: videos, isLoading: isLoadingVideos } = useQuery(
    MAPPING.COMMUNITY.VIDEO,
    getCommunityVideos
  );

  return {
    articles,
    videos,
    isLoading: isLoadingNews || isLoadingVideos,
  };
};
