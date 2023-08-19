import styled from "styled-components";


export const CountdownContainer = styled.div`
font-family: 'Roboto Mono', monospace;
font-size: 10rem;
line-height: 8rem;
color: ${(props) => props.theme['gray-100']};

display: flex;
gap: 1rem;

span{
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
}

@media (min-width: 768px) and (max-width: 1023px) {
    font-size: 6rem;
    line-height: 5rem;
    

  }

@media (min-width: 481px) and (max-width: 767px) {
    font-size: 5rem;
    line-height: 4rem;
 

  }

@media (max-width: 480px) {
    display: flex;
    font-size: 4.5rem;
    line-height: 3.5rem;
    gap: 0.6rem;
   
}

@media (max-width: 400px) {
    font-size: 3.5rem;
    line-height: 2.5rem;  
    gap: 0.5rem;
    
}

`;


export const Separator = styled.div`
padding: 2rem;
color: ${(props) => props.theme['green-500']};
width: 4rem;
overflow: hidden;
display: flex;
justify-content: center;


@media (min-width: 768px) and (max-width: 1023px) {
    font-size: 6rem;
    line-height: 5rem;

  }

@media (min-width: 481px) and (max-width: 767px) {
    font-size: 5rem;
    line-height: 4rem;
  }

@media (max-width: 480px) {
    font-size: 4.5rem;
    line-height: 3.5rem; 
}

@media (max-width: 400px) {
    font-size: 3.5rem;
    line-height: 2.5rem;  
}
`;


