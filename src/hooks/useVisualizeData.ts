import { MAPPING } from 'api/mapping';
import { useQuery } from 'react-query';
import { getEncryptedReports } from 'api/report';

export const useReportsData = () => {
    return useQuery(MAPPING.REPORTS, getEncryptedReports);
};
