import React from 'react';
import axios from 'axios';
import useMDAsync from './useMDAsync';

async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function TestMD({ id }) {
  const [state] = useMDAsync(() => getUser(id), [id]);
  const { loading, data: user, error } = state;
  console.log("state는 :",state);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default TestMD;