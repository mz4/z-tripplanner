import styled from 'styled-components'

export const Counter_main = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 8rem;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  // border: 1px solid $color-border;
  margin-bottom: 1rem;
  margin-top: 1rem;
  border: 1px solid ${props => props.theme.color.appborder};
  background-color: ${props => props.theme.color.componentbackground};
  @media only screen and (max-width: $bp-medium) {
    flex-direction: column;
  }
`
export const Counter_type = styled.div`
  min-width: 200px;
  height: 30px;
  padding: 2em;
  color: $color-grey-light-1;
  background-color: $color-tertiary-grey;
  text-align: center;
  position: relative;
  @media only screen and (max-width: $bp-medium) {
    margin-top: 1em;
  }
  .counter__type:hover {
    cursor: pointer;
  }
`

export const Counter_type_title = styled.div`
  margin: 0;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`

export const Counter_type_value = styled.div`
  margin: 0;
  position: absolute;
  top: 80%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
`

export const Counter_type_selected = styled.div`
  color: $color-grey-light-2;
  background-color: $color-tertiary-light;
`