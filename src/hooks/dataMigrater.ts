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

type newDataTypes = MediaInformation | EventInformation | undefined;

export const dataMigrationHandler = (
    data: Array<{
        data: oldDataTypes;
        type: oldStringTypes;
    }>
) => {
    let newData: Array<newDataTypes> = [];
    data.forEach((dataItem) => {
        newData.push(tempMigrateData(dataItem.data, dataItem.type));
    });
};

export const tempMigrateData = (data: oldDataTypes, type: oldStringTypes) => {
    let newData;
    if (type === 'GeneralVideo') {
        newData = data as GeneralVideo;
        const migratedData: MediaInformation = {
            id: newData.id,
            timestamp: newData.timestamp,
            visible: newData.visible,
            type: 'MEDIA',

            title: newData.title,
            description: newData.description,
            thumbnail: newData.thumbnail,

            source: newData.author,
            source_pfp: undefined,

            fromExcise: true,

            tenant: newData.tenant,

            media_type: 'VIDEO',

            url: newData.url,

            redirect: false,

            views: 0,
        };
        return migratedData;
    }
    if (type === 'CommunityVideo') {
        newData = data as CommunityVideo;
        const migratedData: MediaInformation = {
            id: newData.id,
            timestamp: newData.timestamp,
            visible: newData.visible,
            type: 'MEDIA',

            title: newData.title,
            description: newData.description,
            thumbnail: newData.thumbnail,

            source: newData.author,
            source_pfp: undefined,

            fromExcise: false,

            tenant: newData.tenant,

            media_type: 'VIDEO',

            url: newData.url,

            redirect: false,

            views: 0,
        };
        return migratedData;
    }
    if (type === 'CommunityArticle') {
        newData = data as CommunityArticle;
        const migratedData: MediaInformation = {
            id: newData.id,
            timestamp: newData.timestamp,
            visible: newData.visible,
            type: 'MEDIA',

            title: newData.title,
            description: newData.description,
            thumbnail: undefined,

            source: newData.author,
            source_pfp: undefined,

            fromExcise: false,

            tenant: newData.tenant,

            media_type: 'ARTICLE',

            url: undefined,

            redirect: false,

            views: 0,
        };
        return migratedData;
    }

    if (type === 'GeneralNews') {
        newData = data as GeneralNews;
        const migratedData: MediaInformation = {
            id: newData.id,
            timestamp: newData.timestamp,
            visible: newData.visible,
            type: 'MEDIA',

            title: newData.title,
            description: newData.description,
            thumbnail: undefined,

            source: getNewsOutletName(newData.redirect_url),
            source_pfp: undefined,

            fromExcise: false,

            tenant: newData.tenant,

            media_type: 'NEWS',

            url: newData.redirect_url,

            redirect: newData.news_type === 'EXTERNAL',

            views: 0,
        };
        return migratedData;
    }

    if (type === 'Event') {
        newData = data as Event;
        const migratedData: EventInformation = {
            id: newData.id,
            timestamp: '0',
            visible: newData.visible,
            type: 'EVENT',

            title: newData.title,
            description: newData.description,
            thumbnail: undefined,

            source: 'Unknown Source',
            source_pfp: undefined,

            fromExcise: false,

            tenant: newData.tenant,

            mode: newData.mode,

            venue: newData.venue,
            register_url: newData.register_url,

            date_to: newData.date_to,
            date_from: newData.date_from,
            time_to: newData.time_to,
            time_from: newData.time_from,
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
