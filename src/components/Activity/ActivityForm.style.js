import styled from 'styled-components'

export const Activity_main = styled.div`
  display: -ms-flexbox;
  display: flex;
  clear: both;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  flex-direction: row;
  height: 8rem;
  padding: 1rem;
  border: 1px solid ${props => props.theme.color.appborder};
  background-color: ${props => props.theme.color.componentbackground};
    
  input {
    float: left;
    padding: 12px;
    font-size: 1.15em;
    border: 1px solid #d5d5d5;
    width: 100%;
  }

  .field {
    @media only screen and (max-width: $bp-medium) {
      height: 5em;
    }
  }

  .error {
    color: #A50000;
    padding: 2px;
    font-size: 1em;
    width: 100%;
    text-align: left;
    margin-top: -10px;
  }

  .primary {
    background-color: #4CAF50; /* Green */
    border: 1px solid #d5d5d5;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
  }

  .primary:hover {
    cursor: pointer;
    background-color: rgb(95, 219, 99);
  }
`