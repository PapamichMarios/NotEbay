import React from 'react';

import { ClipLoader } from 'react-spinners';

export default class Loading extends React.Component {
    render() {
      return (
        <div style={{textAlign:'center'}}>
          <ClipLoader
            sizeUnit={"px"}
            size={50}
            color={'#010101'}
          />
        </div>
      );
    }
}