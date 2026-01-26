import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const theme = useSelector((state) => state.ui.theme);
  return <footer className={`footer ${theme}`}>© 2026 Movie App</footer>;
};

export default Footer;