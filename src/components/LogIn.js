import React from 'react';

const Login = props => {
    
    
    
    async function login(loginParams) {
        const res = await fetch(`${baseUrl}/api/v1/auth`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(loginParams)
        });
        return await res.json();
    }
    
    
    
    return(
        <div>

        </div>
    )
}


export default Login;