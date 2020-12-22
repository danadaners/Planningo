import React from "react";
import { Link } from "react-router-dom";
import "./topnav.css";
import {   FaCheck,
  FaHome,
  FaBars,
  FaShoppingBasket,
  FaCog,
  FaTimes,
  FaRegCalendar, } from 'react-icons/fa';

import getDate from "date-fns/getDate";

const TopNav = React.memo(({ toggleSideNav, sideNavOpen }) => {
  return (
    <div className="topnav-wrapper">
      <div id="left-nav-links">
        <div id="each-top-nav-link-open" onClick={toggleSideNav}>
          <div className="top-nav-icon-bar">
            {sideNavOpen ? (
              <FaTimes/>
            ) : (
              <FaBars/>
            )}
          </div>
        </div>
        <div id="each-top-nav-link">
          <Link to="/home">
            <div className="top-nav-icon">
              <FaHome/>
            </div>
          </Link>
        </div>
        <div id="each-top-nav-link">
          <Link to="/tasks">
            <div className="top-nav-icon">
              <FaCheck/>
            </div>
          </Link>
        </div>
        <div id="each-top-nav-link">
          <Link to="/shoppinglist">
            <div className="top-nav-icon">
              <FaShoppingBasket/>
            </div>
          </Link>
        </div>
      </div>

      <div id="right-nav-links">
        <div id="each-top-nav-link">
          <Link to="/calendar">
            <div className={getDate(new Date()).length === 1 ? "top-nav-date two" : "top-nav-date one"}>{getDate(new Date())}</div>
            <div className="top-nav-icon cal">
              <FaRegCalendar/>
            </div>
          </Link>
        </div>

        <div id="each-top-nav-link">
          <Link to="/account">
            <div className="top-nav-icon">
              <FaCog/>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default TopNav;
