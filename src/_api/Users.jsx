import React, { useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';

async function getUsers() {
  const response = await axios.get(
    'http://3.35.231.145:8080/api/md/list'

  );
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);
  const [state, refetch] = useAsync(getUsers, [], true);

  const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

  if (loading) return <div>Users 로딩중..</div>;
  if (error) return <div> Users에서 에러가 발생했습니다</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;
  return (
    <>
      <ul>
        {users.result.map(user => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
          >
            {user.name}
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;