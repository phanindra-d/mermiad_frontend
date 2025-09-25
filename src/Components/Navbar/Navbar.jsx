import React from 'react';
import logo from '../../assets/logo.png';
import {
  NavbarWrapper,
  LogoPart,
  LogoImg,
  LogoHeading,
  Anchor,
  AnchorLink
} from './Navbar.styled';


const Navbar = () => {
  return (
    <NavbarWrapper>
      <LogoPart>
        <LogoImg src={logo} alt="Logo" />
        <LogoHeading>MermaidGenerator</LogoHeading>
      </LogoPart>
      <Anchor>
        <AnchorLink href="#">Documentation</AnchorLink>
        <AnchorLink href="#" active>Home</AnchorLink>
        <AnchorLink href="#">Sign Up</AnchorLink>
        <AnchorLink href="#">Login</AnchorLink>
      </Anchor>
    </NavbarWrapper>
  );
}

export default Navbar
