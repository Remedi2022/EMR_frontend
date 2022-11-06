import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";
import Reception from "../../pages/Reception"

function SearchBar({ placeholder, focus }) {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error와 users를 초기화하고
        setError(null);
        setUsers(null);
        // loading 상태를 true로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          'http://3.35.231.145:8080/api/patient/list'
        );
        setUsers(response.data.result); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {

        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = users.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  // const navigate = useNavigate();

  // const receivePatient = () => {
  //   navigate('/reception');
  //   // 클릭한 환자 정보를 <Reception/>에 props로 넘겨야 함
  // }

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          className="searchField"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {/* closeIcon 위치 이상해서 일단 없앰 */}
          {/* {filteredData.length === 0 ? ( */}
            <div>
              <button className="Search-button" type="submit">
                <img className='SearchIcon' src={ process.env.PUBLIC_URL + '/icons/search50_999.png' } />
              </button>
            </div>
          {/* ) : (
            <button className="clearBtn" onClick={ clearInput }>
              &times;
            </button>
            // <CloseIcon id="clearBtn" onClick={clearInput} />
          )} */}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a
                className="dataItem"
                target="_blank">
                <button
                  className="dataItemButton"
                  onClick={() => {navigate(`/reception/${value.pid}`)}}>
                  <p>{value.name} </p>
                  <p>({value.rrn}) </p>
                </button>
                {/* <Reception patientInfo={patientInfo}>
                </Reception> */}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
