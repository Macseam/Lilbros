import React from "react";

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div>
        <div className="top-level-menu-item">
          <span>Звери</span>
        </div>
        <div className="top-level-menu-item">
          <span>Птицы</span>
        </div>
        <div className="top-level-menu-item">
          <span>Растения</span>
        </div>
        <div className="top-level-menu-item">
          <span>Насекомые</span>
        </div>
      </div>
    );
  }
}
