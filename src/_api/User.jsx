import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
    const response = await axios.get(
        // `https://jsonplaceholder.typicode.com/users/${id}`
        `http://3.35.231.145:8080/api/md/list/${id}`
        
    );
    return response.data;
    // console.log(response.data);
}

function User({ id }) {
    const [state] = useAsync(() => getUser(id), [id]);
    console.log([state]);
    const { loading, data: user, error } = state;
    if (loading) return <div>User 로딩중..</div>;
    if (error) return <div>User에서 에러가 발생했습니다</div>;  
    if (!user) return null;
    return (
        <div>
        <h2>{user.result.name}</h2>
        </div>
    );
    }

export default User;