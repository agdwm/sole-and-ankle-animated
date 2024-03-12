/* eslint-disable no-unused-vars */
import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { WEIGHTS } from '../../constants';
import { fadeIn, slideIn, appear } from '../../animation-helpers';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Wrapper isOpen={isOpen} onDismiss={onDismiss}>
      <Backdrop />
      <Content aria-label="Menu">
        <CloseButton onClick={onDismiss}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
        <Footer>
          <SubLink href="/terms">Terms and Conditions</SubLink>
          <SubLink href="/privacy">Privacy Policy</SubLink>
          <SubLink href="/contact">Contact Us</SubLink>
        </Footer>
      </Content>
    </Wrapper >
  );
};


const Wrapper = styled(DialogOverlay)`
  position: fixed;
  inset:0;
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
  animation: ${fadeIn} 500ms;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: var(--color-backdrop);
`

const Content = styled(DialogContent)`
  --overfill: 16px;
  position: relative;
  background: white;
  width: calc(300px + var(--overfill));
  height: 100%;
  margin-right: calc(var(--overfill) * -1);
  padding: 24px 32px;
  display: flex;
  flex-direction: column;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${slideIn} 500ms both var(--transition-ease-out);
    animation-delay: 200ms;
  }
`;



const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: var(--overfill);
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  --duration-and-fill: 600ms both;

  &:first-of-type {
    color: var(--color-secondary);
    animation: ${appear} var(--duration-and-fill) 200ms;
  }

  &:nth-of-type(2) {
    animation: ${appear} var(--duration-and-fill) 400ms;
  }

  &:nth-of-type(3) {
    animation: ${appear} var(--duration-and-fill) 600ms;
  }

  &:nth-of-type(4) {
    animation: ${appear} var(--duration-and-fill) 800ms;
  }

  &:nth-of-type(5) {
    animation: ${appear} var(--duration-and-fill) 1000ms;
  }

  &:nth-of-type(6) {
    animation: ${appear} var(--duration-and-fill) 1200ms;
  }
`;

const Filler = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;

  animation: ${appear} 600ms both 1500ms;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
`;

export default MobileMenu;
