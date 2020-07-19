import styled from 'styled-components'

export const Trip_main = styled.div`
  display: -ms-flexbox;
  display: flex;
  clear: both;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 1.25em;
  padding: 1em;
  border: 1px solid ${props => props.theme.color.appborder};
  background-color: ${props => props.theme.color.componentbackground};
  margin-bottom: 1rem;

  :hover {
    background-color: ${props => props.theme.color.tripHover};
    cursor: pointer;
  }

  @media only screen and (max-width: $bp-medium) {
    flex-direction: column;
  }
`
export const Col_md_10 = styled.div`
  width: 100%;
`

// .trip {
//   display: -ms-flexbox;
//   display: flex;
//   clear: both;
//   -ms-flex-pack: justify;
//   justify-content: space-between;
//   -ms-flex-wrap: wrap;
//   flex-wrap: wrap;
//   flex-direction: row;
//   padding-top: 1.25em;
//   padding: 1em;
//   // border: 1px solid rgba(88, 183, 205, .15);
//   background-color: #272c33;
//   margin-bottom: 1rem;
//   @media only screen and (max-width: $bp-medium) {
//     flex-direction: column;
//   }
// }

// .trip__item {
//   -ms-flex-positive: 1;
//   flex-grow: 1;
//   -ms-flex-preferred-size: 90%;
//   flex-basis: 90%;
// }

// .destination .action {
//   @media only screen and (max-width: $bp-medium) {
//     width: 10em;
//   }
// }

// .react-datepicker-popper {
//   position: absolute;
//   will-change: transform;
//   top: 0px;
//   left: 0px;
//   transform: translate3d(677px, 301px, 0px);
// }