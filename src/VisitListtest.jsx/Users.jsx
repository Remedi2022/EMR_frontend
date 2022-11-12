import React, { useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import User from "./User";

//MD 리스트 다시 만들기
async function getUsers() {
  const response = await axios.get("http://3.35.231.145:8080/api/md/list");
  return response.data.result;
}

// userId -> mdID
// users -> mdlist
function Users() {
  const [userId, setUserId] = useState(null);
  const [state, refetch] = useAsync(getUsers, [], true);
  const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회
  console.log("Users에서 state는 ", state);
  if (loading) return <div>Users 로딩중..</div>;
  if (error) return <div> Users에서 에러가 발생했습니다</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: "pointer" }}
          >
            {user.name}
          </li>
        ))}
      </ul>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
