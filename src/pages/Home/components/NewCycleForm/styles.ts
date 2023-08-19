import styled from "styled-components";


export const FormContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
gap: .5rem;
color: ${props=> props.theme['gray-100']};
font-size: 1.125rem;
font-weight: bold;
flex-wrap: wrap;

@media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1rem;

  }

@media (min-width: 481px) and (max-width: 767px) {
    font-size: 1rem;
  }

@media (max-width: 480px) {
    font-size: 0.9;
}

@media (max-width: 400px) {
    font-size: 0.9; 
}
`;

const BaseInput = styled.input`
background: transparent;
height: 2.5rem;
border: 0;
border-bottom: 2px solid ${(props) => props.theme['gray-500']};
font-weight: bold;
font-size: 1.125rem;
padding: 0.5rem;
color: ${(props)=> props.theme['gray-100']};

&::placeholder{
    color: ${(props) => props.theme['gray-500']}
}
&:focus{
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']}
}

@media (max-width: 780px) {
 
    &::placeholder {
    font-size: .9rem;
    }
  
  }
`;

export const TaskInput = styled(BaseInput)`
flex: 1;
&::-webkit-calendar-picker-indicator{
    display:none !important;
}
`;

export const MinutesAmountInput = styled(BaseInput)`
width: 3rem;

`;

