import './TopBar.css';
import Clock from '../../Clock/nowTime.jsx';

export default function TopBar() {
    return (
        <div className="topBar">
            <div className="topBarWrapper">
                <div className="topLeft">
                    <span className="title">원무</span>
                    <div class="searchbar">
                        <form className="form" action="/" method="GET">
                            <input className="search-field" type="search" placeholder="환자 검색"/>
                            <button className="search-button" type="submit">
                                <img className='searchIcon' src={ process.env.PUBLIC_URL + '/icons/search50_999.png' } />
                            </button>
                        </form>
                    </div>
                    <div className="addPatient">
                        <span>접수하기</span>
                        <img className='userIcon' src={ process.env.PUBLIC_URL + '/icons/user50_9AACCF.png' } />
                    </div>
                </div>
                <div className="nowTime"><Clock /></div>
                <div className="topRight">noti. & profile</div>
            </div>
        </div>
    )
}