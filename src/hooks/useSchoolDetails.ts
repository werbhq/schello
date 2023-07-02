import { MAPPING } from 'api/mapping';
import { getSchools } from 'api/schools';
import { useQuery } from 'react-query';

export const useSchoolDetailsData = () => {
    return useQuery(MAPPING.SCHOOLS, getSchools);
};
