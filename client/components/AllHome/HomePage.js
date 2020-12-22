import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div
      className="homepage-wrap"
      // style={{
      //   backgroundImage: "url(" + "/assets/backgrounds/coworker-bg.png" + ")",
      // }}
    >
      <div id="site-home-header">
        <div id="header-wrap-home">
          <div id="navtitle">Planningo</div>

          <div id="links-home">
            <Link to="/login">Login / Sign Up</Link>
          </div>
        </div>
      </div>

      <div id="site-home-content">
        {/* <img
          src={"/assets/arabica-1055.png"}
          id="bunnyphone"
          height="245"
          width="245"
        ></img> */}
        <div id="site-home-verbs">Organize * Share * Manage * Track</div>
        <p className="site-home-intro">
          Create, add, and edit custom groups to help sort important tasks and
          shopping lists. View a single user or group’s progress with our points
          system data visualizer.{" "}
        </p>
        <p className="site-home-intro">
          Planningo is the perfect app to track to-do’s for your home, work, and
          even friends!{" "}
        </p>
        <div className="site-home-getting-started">
          Getting Started:
          <ol>
            <li>Sign up</li>
            <li>
              Create your first group and add members! If you would like to use
              Planningo as a personal task manager, you can create a group for
              just yourself.
            </li>
            <li>
              Click on the checkmark or shopping basket icon in our Nav Bar to
              start adding to-do’s!
            </li>
            <li>
              Check off any completed tasks or shopping list items to start
              racking up those points.
            </li>
            <li>
              Take a gander at your stats page to see your progress rendered as
              a bar graph
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
