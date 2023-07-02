import { SchoolDetails } from 'types/School';
import { baseApi } from '.';

export const getSchools = async () => {
    const response = await baseApi.get('/school/all');
    return response.data as SchoolDetails[];
};
