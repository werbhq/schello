import { GeneralVideo, GeneralNews, Event } from 'types/General Awarness';
import { CommunityVideo, CommunityArticle } from 'types/Community';
import { EventInformation, MediaInformation } from 'types/Media';

type oldDataTypes = GeneralVideo | CommunityVideo | GeneralNews | CommunityArticle | Event;
type oldStringTypes =
    | 'GeneralVideo'
    | 'CommunityVideo'
    | 'GeneralNews'
    | 'CommunityArticle'
    | 'Event';

const TENANT_EXCISE = 'excise';

export const migrateData = (data: oldDataTypes, type: oldStringTypes) => {
    let newData;
    const fromExcise = data.tenant === TENANT_EXCISE;
    if (type === 'GeneralVideo') {
        newData = data as GeneralVideo;
        const migratedData: MediaInformation = {
            id: newData.id,
            timestamp: newData.timestamp,
            visible: newData.visible,
            title: newData.title,
            description: newData.description,
            thumbnail: newData.thumbnail,
            tenant: newData.tenant,
            source: newData.author,
            url: newData.url,

            type: 'MEDIA',
            media_type: 'VIDEO',

            source_pfp: undefined,
            fromExcise,
            redirect: false,
        };
        return migratedData;
    }
    if (type === 'CommunityVideo') {
        newData = data as CommunityVideo;
        const migratedData: MediaInformation = {
            id: newData.id,
            timestamp: newData.timestamp,
            visible: newData.visible,
            title: newData.title,
            description: newData.description,
            thumbnail: newData.thumbnail,
            source: newData.author,
            tenant: newData.tenant,
            url: newData.url,

            type: 'MEDIA',
            source_pfp: undefined,
            fromExcise,
            media_type: 'VIDEO',
            redirect: false,
        };
        return migratedData;
    }
    if (type === 'CommunityArticle') {
        newData = data as CommunityArticle;
        const migratedData: MediaInformation = {
            id: newData.id,
            timestamp: newData.timestamp,
            visible: newData.visible,
            title: newData.title,
            description: newData.description,
            source: newData.author,
            tenant: newData.tenant,

            type: 'MEDIA',
            media_type: 'ARTICLE',
            thumbnail: undefined,
            source_pfp: undefined,
            fromExcise,
            url: undefined,
            redirect: false,
        };
        return migratedData;
    }

    if (type === 'GeneralNews') {
        newData = data as GeneralNews;
        const migratedData: MediaInformation = {
            id: newData.id,
            timestamp: newData.timestamp,
            visible: newData.visible,
            title: newData.title,
            description: newData.description,
            tenant: newData.tenant,
            url: newData.redirect_url,

            redirect: newData.news_type === 'EXTERNAL',
            type: 'MEDIA',
            media_type: 'NEWS',
            thumbnail: undefined,
            source: getNewsOutletName(newData.redirect_url),
            source_pfp: undefined,
            fromExcise,
        };
        return migratedData;
    }

    if (type === 'Event') {
        newData = data as Event;
        const migratedData: EventInformation = {
            id: newData.id,
            visible: newData.visible,
            title: newData.title,
            description: newData.description,
            tenant: newData.tenant,
            mode: newData.mode,
            venue: newData.venue,
            register_url: newData.register_url,
            date_to: newData.date_to,
            date_from: newData.date_from,
            time_to: newData.time_to,
            time_from: newData.time_from,

            // TODO: ADD BACKEND
            timestamp: newData.date_from,

            type: 'EVENT',
            thumbnail: undefined,
            source: newData.tenant.replace(/-/g, ' ').toLocaleUpperCase(),
            source_pfp: undefined,
            fromExcise,
        };
        return migratedData;
    }
};

function getNewsOutletName(url: string | undefined): string {
    // Extract the domain from the URL
    if (url === undefined) return 'Unknown Source';
    const domainMatch = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/im);
    if (domainMatch && domainMatch[1]) {
        const domain = domainMatch[1];

        // Check if the domain contains common news outlet keywords
        const newsOutletKeywords = ['news', 'times', 'post', 'tribune'];
        const lowercaseDomain = domain.toLowerCase();
        const matchedKeyword = newsOutletKeywords.find((keyword) =>
            lowercaseDomain.includes(keyword)
        );

        if (matchedKeyword) {
            return matchedKeyword.toUpperCase();
        }

        // If no common keyword is found, return the capitalized domain name
        return domain.charAt(0).toUpperCase() + domain.slice(1);
    }

    // Return null if the URL doesn't match the expected format
    return 'Unknown Source';
}
