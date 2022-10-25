import PropTypes from "prop-types";

function Visitor({type, status, name}) {
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

Visitor.propTypes = {
    name: PropTypes.string.isRequired,
} 

export default Visitor