import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  width: 100%;
  height: 80px;
`;

export const LogoPart = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const LogoImg = styled.img`
  height: 40px;
  width: auto;
`;

export const LogoHeading = styled.h2`
  color: #333;
  font-size: 1.5rem;
`;

export const Anchor = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-right: 2rem;
`;

export const AnchorLink = styled.a`
  text-decoration: none;
  color: #222;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background: ${({ active }) => (active ? '#007bff' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#222')};
  font-weight: ${({ active }) => (active ? 'bold' : '500')};
`;
