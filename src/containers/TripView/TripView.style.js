import styled from 'styled-components'

export const Trip_main = styled.div`
  width: 100%;
  max-width: 75rem;
  min-width: 25rem;
  margin: 2em auto;
  overflow: hidden;
  border: 1px solid ${props => props.theme.color.appbackground};
  background-color: ${props => props.theme.color.appbackground};
`;

export const Trip_inner = styled.div`
  padding: 1em;
  position: relative;
`