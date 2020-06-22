import React from 'react';
import styled, { keyframes } from 'styled-components';

const motion = () => keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);
  display: inline-block;
  margin: 1px;
  border: 1px solid ${props => props.color};
  width: ${props => `${props.size}${props.sizeUnit}`};
  height: ${props => `${props.size}${props.sizeUnit}`};
  border-radius: 50%;
  animation: ${props => motion(props)} 1s cubic-bezier(0.5, 0.7, 0.5, 0.7) infinite;
  border-color: ${props => props.color} transparent ${props => props.color} transparent;
`;

export function Loader({ ...props }) {
  let SelectedLoader = StyledLoader;

  return (
      <SelectedLoader { ...props } />
  )
}

Loader.defaultProps = {
  size: 50,
  color: '#00bfff',
  sizeUnit: 'px'
};