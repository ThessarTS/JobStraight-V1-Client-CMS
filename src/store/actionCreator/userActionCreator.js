export const registerNewAdmin = (input) => async () => {
    try {
        let response = await fetch('https://api3.thessarts.site/register', {
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

export const login = (loginForm) => async () => {
    try {
        let response = await fetch('https://api3.thessarts.site/login', {
            method: 'POST',
            body: JSON.stringify(loginForm),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let resData = await response.json()
        if (!response.ok) {
            throw new Error(resData);
        }
        localStorage.setItem('access_token', resData.access_token);
    } catch (error) {
        throw error
    }
};