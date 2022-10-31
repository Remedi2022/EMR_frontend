import PropTypes from "prop-types";

function Visit({type, status, name}) {
    const t = type;
    const s = status;

    if ( s === t ) {
        return (
            <li className='patientlistItem'>
                {name}
            </li>
        )
    }
    return null;
}

Visit.propTypes = {
    name: PropTypes.string.isRequired,
} 

export default Visit