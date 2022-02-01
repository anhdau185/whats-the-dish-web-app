import styled from 'styled-components';

export const FlexWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
margin-bottom: 1.5rem;

button {
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 1rem;
  }
}

@media (min-width: 768px) {
  flex-direction: row;
  align-items: center;
}
`;
