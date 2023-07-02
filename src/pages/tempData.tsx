import dayjs from 'dayjs';
import { Event, GeneralNews, GeneralVideo } from 'types/General Awarness';

let events: Event[] = [
    {
        id: 'feiojeifwiowejo',
        title: 'Anti Drug Campaign',
        visible: true,
        time_from: dayjs('09:00AM', 'HH:mmA').toISOString(),
        time_to: dayjs('12:00PM', 'HH:mmA').toISOString(),
        date_from: dayjs('2023-01-23').toISOString(),
        date_to: dayjs('2023-01-25').toISOString(),
        description: 'A campaign for children for drug awareness', // HTML
        mode: 'VIRTUAL',
        venue: 'https://meet.google.com/wqa-eohc-uws', // Venue for offline. Meeting link for online
        register_url: 'https://forms.gle/7B5sYCiT8ouhgbpj6',
        tenant: 'excise',
    },
    {
        id: 'feiojeifwioaso',
        title: 'Venu Drug Campaign',
        visible: true,
        time_from: dayjs('09:00AM', 'HH:mmA').toISOString(),
        time_to: dayjs('12:00PM', 'HH:mmA').toISOString(),
        date_from: dayjs('2023-01-23').toISOString(),
        date_to: dayjs('2023-01-23').toISOString(),
        description: `<p>A <b>paragraph</b> (from <a href="/wiki/Ancient_Greek_language" class="mw-redirect" title="Ancient Greek language">Ancient Greek</a> <i> παράγραφος (parágraphos)</i>&nbsp;'to write beside') is a self-contained unit of discourse in <a href="/wiki/Writing" title="Writing">writing</a> dealing with a particular point or <a href="/wiki/Idea" title="Idea">idea</a>. Though not required by the orthographic conventions of any language with a <a href="/wiki/Writing_system" title="Writing system">writing system</a>, paragraphs are a conventional means of organizing extended segments of <a href="/wiki/Prose" title="Prose">prose</a>.
</p>`, // HTML
        mode: 'OFFLINE',
        venue: 'https://meet.google.com/wqa-eohc-uws', // Venue for offline. Meeting link for online
        tenant: 'excise',
    },
];

for (let i = 0; i < 50; i++) {
    events.push(events[0]);
    events.push(events[1]);
}

let newsList: GeneralNews[] = [
    {
        id: 'n1',
        title: 'Drug Mafia',
        timestamp: '2023-02-16T06:30:00.000Z',
        visible: true,
        news_type: 'INTERNAL',
        description: 'drug mafia captured in mbcet',
        tenant: 'excise',
    },
    {
        id: 'n2',
        title: 'Counsellor turns drug supplier for jail inmates, held',
        timestamp: '2023-02-16T06:30:00.000Z',
        visible: true,
        news_type: 'EXTERNAL',
        tenant: 'excise',
        redirect_url:
            'https://timesofindia.indiatimes.com/city/ludhiana/counsellor-turns-drug-supplier-for-jail-inmates-held/articleshow/97965139.cms?from=mdr',
    },
    {
        id: 'n1',
        title: 'Drug Mafia',
        timestamp: '2023-02-16T06:30:00.000Z',
        visible: true,
        news_type: 'INTERNAL',
        tenant: 'excise',
        description: 'drug mafia captured in mbcet',
    },
    {
        id: 'n2',
        title: 'Counsellor turns drug supplier for jail inmates, held',
        timestamp: '2023-02-16T06:30:00.000Z',
        visible: true,
        news_type: 'EXTERNAL',
        tenant: 'excise',
        redirect_url:
            'https://timesofindia.indiatimes.com/city/ludhiana/counsellor-turns-drug-supplier-for-jail-inmates-held/articleshow/97965139.cms?from=mdr',
    },
    {
        id: 'n2',
        title: 'Counsellor turns drug supplier for jail inmates, held',
        timestamp: '2023-02-16T06:30:00.000Z',
        visible: true,
        news_type: 'EXTERNAL',
        tenant: 'excise',
        redirect_url:
            'https://timesofindia.indiatimes.com/city/ludhiana/counsellor-turns-drug-supplier-for-jail-inmates-held/articleshow/97965139.cms?from=mdr',
    },
    {
        id: 'n2',
        title: 'Counsellor turns drug supplier for jail inmates, held',
        timestamp: '2023-02-16T06:30:00.000Z',
        visible: true,
        news_type: 'EXTERNAL',
        tenant: 'excise',
        redirect_url:
            'https://timesofindia.indiatimes.com/city/ludhiana/counsellor-turns-drug-supplier-for-jail-inmates-held/articleshow/97965139.cms?from=mdr',
    },
];

let videoList: GeneralVideo[] = [
    {
        id: '82QhIOgJy1c',
        title: 'Benzo Dope and Tranq: The Next Wave of the Overdose Crisis',
        author: 'EXCISE',
        visible: true,
        timestamp: dayjs('2019-01-25').toISOString(),
        thumbnail: 'https://img.youtube.com/vi/82QhIOgJy1c/sddefault.jpg',
        description: `<span dir="auto" class="style-scope yt-formatted-string">More than 100,000 Americans died of a drug overdose in 2021, the worst year on record. The newest wave of the overdose crisis involves man-made chemicals, including animal tranquilizers, that are being combined with fentanyl to make street drugs that are deadlier and more addictive.
  With access to an undisguised fentanyl dealer, Beyond Fentanyl looks at how drugs like “benzo dope” and “tranq” are ravaging North American communities and how U.S. policy affected the latest flood of synthetic street drugs.
  Help keep VICE News’ fearless reporting free for millions by making a one time or ongoing contribution here. - </span>`,
        platform: 'YOUTUBE',
        url: 'https://www.youtube.com/watch?v=82QhIOgJy1c',
        tenant: 'excise',
    },
    {
        id: '82QhIOgJy1c',
        title: 'Benzo Dope and Tranq: The Next Wave of the Overdose Crisis',
        author: 'EXCISE',
        visible: true,
        timestamp: dayjs('2019-01-25').toISOString(),
        thumbnail: 'https://img.youtube.com/vi/82QhIOgJy1c/sddefault.jpg',
        description: `<span dir="auto" class="style-scope yt-formatted-string">More than 100,000 Americans died of a drug overdose in 2021, the worst year on record. The newest wave of the overdose crisis involves man-made chemicals, including animal tranquilizers, that are being combined with fentanyl to make street drugs that are deadlier and more addictive.
  With access to an undisguised fentanyl dealer, Beyond Fentanyl looks at how drugs like “benzo dope” and “tranq” are ravaging North American communities and how U.S. policy affected the latest flood of synthetic street drugs.
  Help keep VICE News’ fearless reporting free for millions by making a one time or ongoing contribution here. - </span>`,
        platform: 'YOUTUBE',
        url: 'https://www.youtube.com/watch?v=82QhIOgJy1c',
        tenant: 'excise',
    },
    {
        id: '82QhIOgJy1c',
        title: 'Benzo Dope and Tranq: The Next Wave of the Overdose Crisis',
        author: 'EXCISE',
        visible: true,
        timestamp: dayjs('2019-01-25').toISOString(),
        thumbnail: 'https://img.youtube.com/vi/82QhIOgJy1c/sddefault.jpg',
        description: `<span dir="auto" class="style-scope yt-formatted-string">More than 100,000 Americans died of a drug overdose in 2021, the worst year on record. The newest wave of the overdose crisis involves man-made chemicals, including animal tranquilizers, that are being combined with fentanyl to make street drugs that are deadlier and more addictive.
  With access to an undisguised fentanyl dealer, Beyond Fentanyl looks at how drugs like “benzo dope” and “tranq” are ravaging North American communities and how U.S. policy affected the latest flood of synthetic street drugs.
  Help keep VICE News’ fearless reporting free for millions by making a one time or ongoing contribution here. - </span>`,
        platform: 'YOUTUBE',
        url: 'https://www.youtube.com/watch?v=82QhIOgJy1c',
        tenant: 'excise',
    },
    {
        id: '82QhIOgJy1c',
        title: 'Benzo Dope and Tranq: The Next Wave of the Overdose Crisis',
        author: 'EXCISE',
        visible: true,
        timestamp: dayjs('2019-01-25').toISOString(),
        thumbnail: 'https://img.youtube.com/vi/82QhIOgJy1c/sddefault.jpg',
        description: `<span dir="auto" class="style-scope yt-formatted-string">More than 100,000 Americans died of a drug overdose in 2021, the worst year on record. The newest wave of the overdose crisis involves man-made chemicals, including animal tranquilizers, that are being combined with fentanyl to make street drugs that are deadlier and more addictive.
  With access to an undisguised fentanyl dealer, Beyond Fentanyl looks at how drugs like “benzo dope” and “tranq” are ravaging North American communities and how U.S. policy affected the latest flood of synthetic street drugs.
  Help keep VICE News’ fearless reporting free for millions by making a one time or ongoing contribution here. - </span>`,
        platform: 'YOUTUBE',
        url: 'https://www.youtube.com/watch?v=82QhIOgJy1c',
        tenant: 'excise',
    },
];

export { events, newsList, videoList };
