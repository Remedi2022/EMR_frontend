import './TopBar.css';
import Clock from '../../Clock/nowTime.jsx';

export default function HomeTopBar(props) {
    return (
        <div className="topBar">
            <div className="topBarWrapper">
                <div className="topLeft">
                    <span className="title">{props.title}</span>
                </div>
                <div className="topRight">
                    <div className="nowTime"><Clock /></div>
                    <div>noti. & profile</div>
                </div>
            </div>
        </div>
    )
}