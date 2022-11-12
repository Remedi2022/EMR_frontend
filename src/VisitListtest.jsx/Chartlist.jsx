import React, { useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";

async function getChartlist(id) {
    const response = await axios.get(
      `http://3.35.231.145:8080/api/chart/list?pid=${id}`
      // `http://3.35.231.145:8080/api/md/${id}`
      // 'http://3.35.231.145:8080/api/md/list'
    );
  return response.data.result;
}
//user -> md
function Chartlist({ id }) {
  const [state] = useAsync(() => getChartlist(id), [id]);
  const { loading, data: user, error } = state;
  console.log("User에서 state는 ", state);
  console.log("id: ", id);
  if (loading) return <div>User 로딩중..</div>;
  if (error) return <div>User에서 에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.diagnosis}</h2>
    </div>
  );
}
export default Chartlist;
