import React, { useState } from "react";
import "./planningo.css";
import Fade from "react-reveal/Fade";
import "@pwabuilder/pwainstall";
import {
  IoMdArrowDropdownCircle,
} from "react-icons/io";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft
} from "react-icons/md";
import { Link } from "react-router-dom";


export const Planningo = () => {
  return (
    <div className="about-wrapper">
    <div id="linkhome">
    <Link to="/home"><MdKeyboardArrowLeft/>Back to Planningo</Link>
    </div>

      <div className="about-intro">
        <h1>Welcome to Planningo,</h1>

        <p>
          the app for the group that likes to get
          things done.

          <pwa-install></pwa-install>


        </p>
        <img
          src="/assets/clipart.png"
          width={600}
          height={600}
          alt="woman holding book"
        />

        <IoMdArrowDropdownCircle/>
      </div>

      <div className="body">
        <Fade bottom duration={700}>
          <div className="step list">
          <h3>Stay organized together.</h3>

        <p>Customize your tasks and shopping lists with categories, icons, and more.</p>
            <img
              src="/assets/prev_newgrp.jpg"
              width={750}
              height={1500}
              id="preview"
            />
          </div>

        <div className="step checktask">
        <h3>Create a collaborative task list.</h3>

        <p>Keep track of active tasks within your group.</p>

          <img
            src="/assets/prev_mytasks.jpg"
            width={750}
            height={1500}
            id="preview"
          />
        </div>

        <div className="step newtask">
          <h3>Assign tasks to your group members. </h3>
          <p>For those members who need the
          extra push, reward points can be set for each task.</p>
          <img
            src="/assets/prev_newtask.jpg"
            width={750}
            height={1500}
            id="preview"
          />
        </div>

        <div className="step calendar">
        <h3>Keep track of tasks in a shared calendar.</h3>

        <p>Easily check the status of your group's tasks and due dates in an easy-to-use calendar.</p>
          <img
            src="/assets/prev_calendar.jpg"
            width={750}
            height={1500}
            id="preview"
          />
        </div>
        </Fade>
      </div>


      {/*
<div className="step">Rewards

<img src="/assets/prev_newtask.jpg" width={750} height={1500} id="preview"/>
</div>

      <div className="step">Data visualization

      <img src="/assets/prev_newtask.jpg" width={750} height={1500} id="preview"/>
</div> */}
      <div className="start">
       <Link to="/home">Get started <MdKeyboardArrowRight/></Link>
      </div>
    </div>
  );
};
