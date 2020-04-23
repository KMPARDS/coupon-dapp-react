import React, { Component } from 'react';

export default class extends Component {
  render = () => (
    <li
      className={[
        'navbar-element',
        this.props.parentProps.location.pathname === this.props.path? 'active' : null
      ].filter(c => !!c).join(' ')}
      onClick={() => {
        if(this.props.parentProps.location.pathname !== this.props.path) this.props.parentProps.history.push(this.props.path);
      }}
    >
      <a>{this.props.name}</a>
    </li>
  );
}
