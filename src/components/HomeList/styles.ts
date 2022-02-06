import styled from 'styled-components';

export const StyledGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const StyledListItem = styled.div`
  a {
    display: block;
    width: 250px;
    margin: 1rem;
    padding: 1.5rem;
    text-align: left;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: border-color 0.15s ease;

    h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      transition: color 0.15s ease;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

      @media (min-width: 768px) {
        font-size: 1.5rem;
      }
    }

    p {
      margin-top: 0.5rem;
      font-size: 1rem;
      line-height: 1.5;
      transition: color 0.15s ease;

      @media (min-width: 768px) {
        font-size: 1.25rem;
      }
    }

    &:hover,
    &:focus,
    &:active {
      border-color: #0070f3;

      h2,
      p {
        color: #0070f3;
      }
    }
  }
`;
