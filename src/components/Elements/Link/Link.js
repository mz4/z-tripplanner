import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

// import { Icon } from './Icon/Icon';
import { color } from '../shared/styles';

const linkStyles = css`
  display: inline-block;
  transition: transform 150ms ease-out, color 150ms ease-out;
  text-decoration: none;

  color: ${color.secondary};

  &:hover,
  &:focus {
    cursor: pointer;
    transform: translateY(-1px);
    color: ${darken(0.07, color.secondary)};
  }
  &:active {
    transform: translateY(0);
    color: ${darken(0.1, color.secondary)};
  }

  svg {
    display: inline-block;
    height: 1em;
    width: 1em;
    vertical-align: text-top;
    position: relative;
    bottom: -0.125em;
    margin-right: 0.4em;
  }

  ${props =>
    props.containsIcon &&
    css`
      svg {
        height: 1em;
        width: 1em;
        vertical-align: middle;
        position: relative;
        bottom: 0;
        margin-right: 0;
      }
    `};

  ${props =>
    props.secondary &&
    css`
      color: ${color.mediumdark};

      &:hover {
        color: ${color.dark};
      }

      &:active {
        color: ${color.darker};
      }
    `};

  ${props =>
    props.logout &&
    css`
      color: ${color.logout};

      &:hover {
        color: ${color.logout};
      }

      &:active {
        color: ${color.logout};
      }
    `};

  ${props =>
    props.isButton &&
    css`
      border: 0;
      border-radius: 0;
      background: none;
      padding: 0;
      font-size: inherit;
    `};
`;

const LinkInner = styled.span`
  ${props =>
    props.withArrow &&
    css`
      > svg:last-of-type {
        height: 0.7em;
        width: 0.7em;
        margin-right: 0;
        margin-left: 0.25em;
        bottom: auto;
        vertical-align: inherit;
      }
    `};
`;

const LinkA = styled.a`
  ${linkStyles};
`;

/**
 * Links can contains text and/or icons. Be careful using only icons, you must provide a text alternative via aria-label for accessibility.
 */
export function Link({ isButton, LinkWrapper, children, ...rest }) {
  const content = (
    <Fragment>
      <LinkInner>
        {children}
      </LinkInner>
    </Fragment>
  );

  let SelectedLink = LinkA;

  return <SelectedLink {...rest}>{content}</SelectedLink>;
}

Link.propTypes = {
  isButton: PropTypes.bool,
  children: PropTypes.node,
  containsIcon: PropTypes.bool,
  LinkWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  inverse: PropTypes.bool,
  nochrome: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
};

Link.defaultProps = {
  isButton: false,
  children: null,
  containsIcon: false,
  LinkWrapper: undefined,
  inverse: false,
  nochrome: false,
  secondary: false,
  tertiary: false,
};