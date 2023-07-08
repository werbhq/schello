import { collection, getDocs } from 'firebase/firestore';
import { fireStore, processSnapshot } from '.';
import { Event } from 'types/General Awarness';
import { MAPPING } from './mapping';
import { migrateData } from 'util/dataMigrater';
import { EventInformation } from 'types/Media';

export const getEvents = async () => {
    const ref = collection(fireStore, MAPPING.EVENTS);
    const snapshot = await getDocs(ref);
    const data = processSnapshot(snapshot) as Event[];

    return data.map((e) => migrateData(e, 'Event')) as EventInformation[];
};
