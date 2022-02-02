import React from 'react';
import './HasSearch.css';

function HasSearch(props) {
  if(props.show === true){
      return <div className='HasSearchVid'>
          <h3>No other Videos Found!</h3>
          <p>Please use the SEARCH KEY found at the bottom of each videos</p>
      </div>
  } else if(props.show === false){
      return null;
  }
}

export default HasSearch;
