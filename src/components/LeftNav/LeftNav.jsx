import './LeftNav.css'
// import homeicon from "../icons/home50_555.png";

export default function LeftNav() {
  return (
    <div className='leftnav'>
      <div className='leftnavWrapper'>
        <div className='leftnavMenu'>
          <h3 className='leftnavTitle'>REMEDi</h3>
          <ul className='leftnavList'>
            <li className='leftnavListItem'>
              <img className='homeIcon' src={ process.env.PUBLIC_URL + '/icons/home50_555.png' } />
              홈
            </li>
            <li className='leftnavListItem'>
            <img className='homeIcon' src={ process.env.PUBLIC_URL + '/icons/administration50_555.png' } />
              원무
            </li>
            <li className='leftnavListItem'>
            <img className='homeIcon' src={ process.env.PUBLIC_URL + '/icons/doctor50_555.png' } />
              진료
            </li>
          </ul>
        </div>
        <span className='toggleMenu'>《 메뉴 접기</span>
      </div>
    </div>
  )
}

// 생활코딩
// function leftNav(props){
//     const lis = []
//     //topics로 전달된 값 받아서 {lis}에 동적으로 태그를 만들어서 배열에 담아주기 map 대신 단순한 for문 사용해봄. 
//     for(let i=0; i<props.topics.length; i++){
//       let t = props.topics[i];
//       lis.push(<li key={t.id}>
//         <a id={t.id} href={'/read/'+t.id} onClick={event=>{
//           event.preventDefault();
//           props.onChangeMode(Number(event.target.id)); //(이벤트를 호출할 때 입력값을 주는 방법) event.target은 이벤트를 유발시킨 태그를 가리킴. 여기서는 a 태그.
//         }}>{t.title}</a>
//       </li>) //태그를 동적으로 만듦. 자동으로 생성한 태그의 경우 추적 위해 key라는 약속된 prop 부여해야 함.
//     }
//     return <nav>
//       <ol>
//         {lis}
//       </ol>
//     </nav>
//   }
