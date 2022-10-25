import PropTypes from "prop-types";

function MD({type, status, name}) {
    const t = type;
    const s = status;
    switch(t) {
        case 1:
            if ( s === t ) {
                return (
                    <li className='patientlistItem'>
                        {name}
                    </li>
                )
            }
            return null;
            break;
        case 2:
            if ( s === t ) {
                return (
                    <li className='patientlistItem'>
                        {name}
                    </li>
                )
            }
            return null;
            break;
        case 3:
            if ( s === t ) {
                return (
                    <li className='patientlistItem'>
                        {name}
                    </li>
                )
            }
            return null;
            break;  
        default:
            return<div>No matching type</div>;
    }
}


// // 한 status에 대한 코드
// function MD({status, name}) {
//     const s = status
//     if ( s === 1 ) {
//         return (
//             <li className='patientlistItem'>
//                 {name}
//             </li>
//         )
//     }
//     return null;
// }

MD.propTypes = {
    name: PropTypes.string.isRequired,
} 

export default MD