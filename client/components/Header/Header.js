import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Searchbar from './Searchbar';

import { HEADER_CONTAINER, COMPANY_NAME } from './styles';

const Header = () => {
  return (
    <header id="header-container" style={HEADER_CONTAINER}>
      <NavLink to="/" style={COMPANY_NAME}>
        <h1>Bester Buy</h1>
      </NavLink>
      <Searchbar />
      <Navbar />
    </header>
  );
};

export default Header;
