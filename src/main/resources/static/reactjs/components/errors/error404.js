import React from 'react';

export default class Error404 extends React.Component {
    render() {
      return (
        <div>
          <h3>
            No match for <code>{location.pathname}</code>
          </h3>
        </div>
      );
    }
}