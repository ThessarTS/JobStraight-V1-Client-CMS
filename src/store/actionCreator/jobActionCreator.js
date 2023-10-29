import { SUCCESS_FETCH_JOBS } from "../actionType/jobActionType";

export const successFetchJobs = (payload) => {
    return { type: SUCCESS_FETCH_JOBS, payload }
}


export const fetchJobs = () => async (dispatch) => {
    try {
        let response = await fetch('https://api3.thessarts.site/jobs', {
            method: 'GET',
            headers: {
                access_token: localStorage.access_token
            }
        });
        let resData = await response.json();
        dispatch(successFetchJobs(resData));
    } catch (error) {
        throw error
    }
}

export const deleteJob = (id) => async (dispatch) => {
    try {
        let response = await fetch('https://api3.thessarts.site/jobs/' + id, {
            method: 'DELETE',
            headers: {
                access_token: localStorage.access_token
            }
        });
        let resData = await response.json()
        if (!response.ok) {
            throw new Error(resData);
        }
        dispatch(fetchJobs())
    } catch (error) {
        throw error
    }
};

export const fetchJobById = (id) => async () => {
    try {
        let response = await fetch('https://api3.thessarts.site/jobs/' + id, {
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

export const addJob = (input) => async () => {
    try {
        let response = await fetch('https://api3.thessarts.site/jobs', {
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

export const editJob = (addform, id) => async () => {
    try {
        let response = await fetch('https://api3.thessarts.site/jobs/' + id, {
            method: 'PUT',
            body: JSON.stringify(addform),
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