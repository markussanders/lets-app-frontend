export default {
    login: async (loginData) => {
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        }

        const res = await fetch('http://localhost:3000/api/v1/auth', reqObj);
        return await res.json();
    },

    currentUser: async (token) => {
        const reqObj = {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }

        const res = await fetch('http://localhost:3000/api/v1/current_user', reqObj);
        return await res.json();
    },

    signup: async (signupData) => {
        console.log('signupData', signupData)
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        }
        const res = await fetch('http://localhost:3000/users', reqObj);
        return await res.json();
    }
}
