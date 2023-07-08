export function removeHtmlTags(str: string): string {
    return str.replace(/<[^>]*>?/gm, '');
}

export function getReadTime(str: string): string {
    const wordsPerMinute = 200;
    const words = str.trim().split(/\s+/).length;
    const minutes = Math.floor(words / wordsPerMinute);
    const seconds = Math.round((words % wordsPerMinute) / (wordsPerMinute / 60));

    return `${minutes} minute${minutes !== 1 ? 's' : ''}, ${seconds} second${
        seconds !== 1 ? 's' : ''
    } read`;
}

export const formatTimestamp = (timestamp: string) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - new Date(timestamp).getTime();

    // Convert milliseconds to different time units
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (days < 30) {
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (months < 12) {
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
        return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
};
