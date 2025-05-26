export const BASE_URL = "http://localhost:3000/api/v1";

export const API_PATHS = {
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        REGISTER: `${BASE_URL}/auth/register`,
        GET_USER_INFO: `${BASE_URL}/auth/getUser`,
    },
    DASHBOARD:{
        GET_DATA: `${BASE_URL}/dashboard`,
        DOWNLOAD_TRANSACTIONS_EXCEL: `${BASE_URL}/dashboard/download-transactions`,
    },
    INCOME:{
        ADD_INCOME: `${BASE_URL}/income/add`,
        GET_ALL_INCOME: `${BASE_URL}/income/get`,
        DELETE_INCOME: (id) => `${BASE_URL}/income/${id}`,
        DOWNLOAD_INCOME_EXCEL: `${BASE_URL}/income/download`,
    },
    EXPENSE:{
        ADD_EXPENSE: `${BASE_URL}/expense/add`,
        GET_ALL_EXPENSE: `${BASE_URL}/expense/get`,
        DELETE_EXPENSE: (id) => `${BASE_URL}/expense/${id}`,
        DOWNLOAD_EXPENSE_EXCEL: `${BASE_URL}/expense/download`,
    },
    IMAGE:{
        UPLOAD_IMAGE: `${BASE_URL}/auth/upload`,
    }
};