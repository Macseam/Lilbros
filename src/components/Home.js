import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  handleGoToChapter(path) {
    this.context.router.push(path);
  }

  render() {
    return (
      <div>
        <div onClick={this.handleGoToChapter.bind(this, 'animals')} className="top-level-menu-item">
          <span>Звери</span>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'birds')} className="top-level-menu-item">
          <span>Птицы</span>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'plants')} className="top-level-menu-item">
          <span>Растения</span>
        </div>
        <div onClick={this.handleGoToChapter.bind(this, 'insects')} className="top-level-menu-item">
          <span>Насекомые</span>
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(state => state)(Home);
