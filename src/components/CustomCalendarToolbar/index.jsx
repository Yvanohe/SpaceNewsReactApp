import styled from 'styled-components';

const LabelContainer = styled.div`
width: 100%;
    font-weight: bold;
`

function CustomCalendarToolbar({ date, label, onNavigate }) {





    return (
        <div className="rbc-toolbar">
            <LabelContainer className="rbc-toolbar-label">{label}</LabelContainer >
            <span className="rbc-btn-group">
                <button type="button" onClick={() => onNavigate('PREV')}>Back</button>
                <button type="button" onClick={() => onNavigate('TODAY')}>Today</button>
                <button type="button" onClick={() => onNavigate('NEXT')}>Next</button>
            </span>
        </div>
    )


}

export default CustomCalendarToolbar