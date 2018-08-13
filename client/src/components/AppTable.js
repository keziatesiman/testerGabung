'use strict';

import React from 'react'
import ReactDOM from 'react-dom';
import Table from './table'
import data from './student-2.json'
import axios from 'axios';


class AppTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data,
      
    }
  }


  render() {
    return (
      <div
        className="page-container"
      >
        <Table
          data={this.state.data}
        />
      </div>
    )
  }
}

export default AppTable;
