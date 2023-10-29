import { SUCCESS_FETCH_COMPANIES } from "../actionType/companyActionType";



export const successFetchCompanies = (payload) => {
    return { type: SUCCESS_FETCH_COMPANIES, payload }
}


export const fetchCompanies = () => async (dispatch) => {
    try {
        let response = await fetch('https://api3.thessarts.site/companies', {
            method: 'GET',
            headers: {
                access_token: localStorage.access_token
            }
        });
        let json = await response.json();
        dispatch(successFetchCompanies(json));
    } catch (error) {
        throw error
    }
};

export const deleteCompany = (id) => async (dispatch) => {
    try {
        let response = await fetch('https://api3.thessarts.site/companies/' + id, {
            method: 'DELETE',
            headers: {
                access_token: localStorage.access_token
            }
        });
        let resData = await response.json()
        if (!response.ok) {
            throw new Error(resData);
        }
        dispatch(fetchCompanies())
    } catch (error) {
        throw error
    }
};

export const addCompany = (input) => async () => {
    try {
        let response = await fetch('https://api3.thessarts.site/companies', {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json',
                access_token: localStorage.access_token
            },
        });
        let resData = await response.json()
        if (!response.ok) {
            throw new Error(resData);
        }

    } catch (error) {
        throw error
    }
};

export const editCompany = (input, id) => async () => {
    try {
        let response = await fetch('https://api3.thessarts.site/companies/' + id, {
            method: 'PUT',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json',
                access_token: localStorage.access_token
            },
        });
        let resData = await response.json()
        if (!response.ok) {
            throw new Error(resData);
        }
    } catch (error) {
        throw error
    }
};

export const fetchCompanyById = (id) => async () => {
    try {
        let response = await fetch('https://api3.thessarts.site/companies/' + id, {
            headers: {
                access_token: localStorage.access_token
            }
        });
        let resData = await response.json();
        if (!response.ok) {
            throw new Error(resData);
        }
        return resData
    } catch (error) {
        throw error
    }
};