import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken, rgba } from 'polished';
import { color, typography } from '../shared/styles';
import { easing } from '../shared/animation';

const Text = styled.span`
  display: inline-block;
  vertical-align: top;
`;

const Loading = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  opacity: 0;
`;

const APPEARANCES = {
  PRIMARY: 'primary',
  PRIMARY_OUTLINE: 'primaryOutline',
  SECONDARY: 'secondary',
  SECONDARY_OUTLINE: 'secondaryOutline',
  TERTIARY: 'tertiary',
  OUTLINE: 'outline',
};

const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
};

const StyledButton = styled.button`
  border: 0;
  border-radius: 0.1em;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: ${props => (props.size === SIZES.SMALL ? '8px 16px' : '13px 20px')};
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 150ms ease-out;
  transform: translate3d(0,0,0);
  vertical-align: top;
  white-space: nowrap;
  user-select: none;
  opacity: 1;
  margin: 0;
  background: transparent;


  font-size: ${props => (props.size === SIZES.SMALL ? typography.size.s1 : typography.size.s2)}px;
  font-weight: ${typography.weight.extrabold};
  line-height: 1;

  ${props =>
    !props.isLoading &&
    `
      &:hover {
        transform: translate3d(0, -2px, 0);
      }

      &:active {
        transform: translate3d(0, 0, 0);
      }
    `}

  ${Text} {
    transform: scale3d(1,1,1) translate3d(0,0,0);
    transition: transform 700ms ${easing.rubber};
    opacity: 1;
  }

  ${Loading} {
    transform: translate3d(0, 100%, 0);
  }

  svg {
    height: ${props => (props.size === SIZES.SMALL ? '14' : '16')}px;
    width: ${props => (props.size === SIZES.SMALL ? '14' : '16')}px;
    vertical-align: top;
    margin-right: ${props => (props.size === SIZES.SMALL ? '4' : '6')}px;
    margin-top: ${props => (props.size === SIZES.SMALL ? '-1' : '-2')}px;
    margin-bottom: ${props => (props.size === SIZES.SMALL ? '-1' : '-2')}px;

    /* Necessary for js mouse events to not glitch out when hovering on svgs */
    pointer-events: none;
  }

  ${props =>
    props.disabled &&
    `
      cursor: not-allowed !important;
      opacity: 0.5;
      &:hover {
        transform: none;
      }
    `}

  ${props =>
    props.isUnclickable &&
    `
      cursor: default !important;
      pointer-events: none;
      &:hover {
        transform: none;
      }
    `}

  ${props =>
    props.isLoading &&
    `
      cursor: progress !important;
      opacity: 0.7;

      ${Loading} {
        transition: transform 700ms ${easing.rubber};
        transform: translate3d(0, -50%, 0);
        opacity: 1;
      }

      ${Text} {
        transform: scale3d(0, 0, 1) translate3d(0, -100%, 0);
        opacity: 0;
      }

      &:hover {
        transform: none;
      }
    `}

  ${props =>
    props.containsIcon &&
    `
      svg {
        display: block;
        margin: 0;
      }
      padding: ${props.size === SIZES.SMALL ? '7' : '12'}px;
    `}

  ${props =>
    props.appearance === APPEARANCES.PRIMARY &&
    `
      background: ${props.theme.color.primary};
      color: ${color.lightest};

      ${!props.isLoading &&
        `
          &:hover {
            background: ${darken(0.05, color.primary)};
          }
        `}
    `}

  ${props =>
    props.appearance === APPEARANCES.SECONDARY &&
    `
      background: ${color.secondary};
      color: ${color.lightest};

      ${!props.isLoading &&
        `
          &:hover {
            background: ${darken(0.05, color.secondary)};
          }
        `}
    `}

  ${props =>
    props.appearance === APPEARANCES.TERTIARY &&
    `
      background: ${color.tertiary};
      color: ${color.darkest};

      ${!props.isLoading &&
        `
          &:hover {
            background: ${darken(0.05, color.tertiary)};
          }
        `}
    `}

  ${props =>
    props.appearance === APPEARANCES.OUTLINE &&
    `
      color: ${color.dark};
      background: transparent;

      ${!props.isLoading &&
        `
          &:active {
            background: ${color.medium};
            color: ${color.darkest};
          }
        `};
    `};

    ${props =>
      props.appearance === APPEARANCES.PRIMARY_OUTLINE &&
      `
        color: ${color.primary};

        &:hover {
          background: transparent;
        }

        &:active {
          background: ${color.primary};
          color: ${color.lightest};
        }
      `};

    ${props =>
      props.appearance === APPEARANCES.SECONDARY_OUTLINE &&
      `
        color: ${color.secondary};

        &:hover {
          background: transparent;
        }

        &:active {
          background: ${color.secondary};
          color: ${color.lightest};
        }
      `};

`;

export function Button({
  isDisabled,
  isLoading,
  loadingText,
  isLink,
  children,
  ...props
}) {
  const buttonInner = (
    <Fragment>
      <Text>{children}</Text>
      {isLoading && <Loading>{loadingText || 'Loading...'}</Loading>}
    </Fragment>
  );

  let SelectedButton = StyledButton;

  return (
    <SelectedButton isLoading={isLoading} disabled={isDisabled} {...props}>
      {buttonInner}
    </SelectedButton>
  );
}

Button.propTypes = {
  isLoading: PropTypes.bool,
  loadingText: PropTypes.node,
  isLink: PropTypes.bool,
  children: PropTypes.node.isRequired,
  appearance: PropTypes.oneOf(Object.values(APPEARANCES)),
  isDisabled: PropTypes.bool,
  isUnclickable: PropTypes.bool,
  containsIcon: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(SIZES)),
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Button.defaultProps = {
  isLoading: false,
  loadingText: null,
  isLink: false,
  appearance: APPEARANCES.TERTIARY,
  isDisabled: false,
  isUnclickable: false,
  containsIcon: false,
  size: SIZES.MEDIUM,
  onClick: undefined,
};
