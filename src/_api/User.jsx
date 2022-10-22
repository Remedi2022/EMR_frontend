import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
    const response = await axios.get(
        // `https://jsonplaceholder.typicode.com/users/${id}`
        `http://3.35.231.145:8080/api/md/list'/${id}`
        
    );
    return response.data;
}

function User({ id }) {
    const [state] = useAsync(() => getUser(id), [id]);
    const { loading, data: user, error } = state;

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>User에서 에러가 발생했습니다</div>;  
    if (!user) return null;
    return (
        <div>
        <h2>{user.name}</h2>
        <p>
            <b>Email:</b> {user.name}
        </p>
        </div>
    );
    }

export default User;