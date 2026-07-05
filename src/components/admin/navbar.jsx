import React from "react";
import "@/assets/css/admin/navbar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSearch,
  faMoon,
  faBell,
  faEnvelope,
  faExpand,
  faBorderAll,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({collapsed}) => {
  return (
    <nav style={{ top: 0 , right: 0 ,   width: `calc(100vw - ${collapsed ? "95px" : "290px"})` }} className="position-fixed z-3 admin-navbar navbar navbar-expand-lg bg-white">
      <div className="container-fluid d-flex align-items-center">

        {/* Search */}
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            className="form-control border-0 shadow-none"
            placeholder="Search"
          />
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-2 ms-auto">

          {/* Language */}
          <button className="icon-btn">
            <img
              src="https://flagcdn.com/w40/gb.png"
              alt="English"
              className="flag"
            />
          </button>

          {/* Theme */}
          <button className="icon-btn">
            <FontAwesomeIcon icon={faMoon} />
          </button>

          {/* Notification */}
          <button className="icon-btn position-relative">
            <FontAwesomeIcon icon={faBell} />
            <span className="badge-counter">1</span>
          </button>

          {/* Messages */}
          <button className="icon-btn position-relative">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="badge-counter">1</span>
          </button>

          {/* Fullscreen */}
          <button className="icon-btn">
            <FontAwesomeIcon icon={faExpand} />
          </button>

          {/* Apps */}
          <button className="icon-btn">
            <FontAwesomeIcon icon={faBorderAll} />
          </button>

          {/* User */}
          <div className="user-profile d-flex align-items-center">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="User"
              className="user-avatar"
            />

            <div className="ms-2">
              <h6 className="mb-0">Kristin Watson</h6>
              <small>Sales Administrator</small>
            </div>
          </div>

          {/* Settings */}
          <button className="icon-btn">
            <FontAwesomeIcon icon={faCog} />
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;