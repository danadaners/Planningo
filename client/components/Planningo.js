import React, { useState } from "react";
import "./planningo.css";

export const Planningo = () => {
  return (
    <div className="about-wrapper">
      <h1>Planningo</h1>
      <div className="about-intro">
        Create, add, and edit custom groups to help sort important tasks and
        shopping lists. View a single user or group’s progress with our points
        system data visualizer.
      </div>

      <div className="step">Assign tasks & grocery list</div>

      <div className="step">See tasks on calendar</div>

      <div className="step">Set rewards, Redeem rewards</div>

      <div className="step">Data visualization</div>
    </div>
  );
};
