import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import Logo from '../TrafficMap-logo.png';

injectGlobal`
  body {
    background-color: #F1F1F1;
  }
`;

const Navbar = styled.div`
  background-color: #FFFFFF;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px;
`;

const StyledLogo = styled.img`
  height: 80px;
  width: auto;
`;

const StyledHeader = styled.h4`
  color: rgba(0, 0, 0, 0.4);
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.6);
  margin-right: 10px;
`;

class Header extends Component {
  render() {
    const { count } = this.props;

    return (
      <Navbar>
        <StyledLogo src={Logo} />
        <StyledHeader>{count || 0} Traffic Disruptions</StyledHeader>
      </Navbar>
    );
  }
}

export default Header;
