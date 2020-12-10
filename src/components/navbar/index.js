import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Logo from './../../img/jimat-square-logo.png';
import Tabs from './config';
import 'style/navbar.scss';

const Navbar = props => {
  const isHidden = !['/home', '/orders'].includes(props.location.pathname);
  // Tabs.filter(item => item.route === props.location.pathname).length === 0;
  if (!isHidden || props.isDesktop) {
    return (
      <div className={`navbar ${props.isDesktop ? 'is-desktop' : 'is-mobile'}`}>
        {props.isDesktop && (
          <div className="logo">
            <NavLink exact to="/">
              <img src={Logo} alt="Jimat Square Logo" />
            </NavLink>
          </div>
        )}

        <div className="navbar-wrapper">
          {Tabs.map((item, i) => {
            let Icon = item.icon;
            return (
              <NavLink exact to={item.route} key={i}>
                <div className="nav-item text-center">
                  <Icon />
                  <span>{item.name}</span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default withRouter(Navbar);
