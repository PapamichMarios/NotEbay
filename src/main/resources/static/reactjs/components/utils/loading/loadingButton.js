import React from 'react';

import { ClipLoader } from 'react-spinners';

export default class LoadingButton extends React.Component {
    render() {
      return (
          <ClipLoader
            sizeUnit={"px"}
            size={15}
            color={'#010101'}
          />
      );
    }
}