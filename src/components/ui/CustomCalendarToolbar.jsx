import styled from 'styled-components';
import { ThemeContext } from "../../services/providers/theme";
import colors from "../../utils/colors";
import { useContext } from 'react'

const LabelContainer = styled.div`
width: 100%;
font-weight: bold;
`
const StyledButton = styled.button`
  color : ${(props) => props.theme === 'light' ? 'black' : colors.primary} !important;  
`


function CustomCalendarToolbar({ date, label, onNavigate }) {
    //Use Context to get theme (light or dark) :
    const { theme } = useContext(ThemeContext);
    return (
        <div className="rbc-toolbar">
            <LabelContainer className="rbc-toolbar-label" theme={theme}>{label}</LabelContainer >
            <span className="rbc-btn-group">
                <StyledButton theme={theme} type="button" onClick={() => onNavigate('PREV')}>Back</StyledButton>
                <StyledButton theme={theme} type="button" onClick={() => onNavigate('TODAY')}>Today</StyledButton>
                <StyledButton theme={theme} type="button" onClick={() => onNavigate('NEXT')}>Next</StyledButton>
            </span>
        </div>
    )
}

export default CustomCalendarToolbar