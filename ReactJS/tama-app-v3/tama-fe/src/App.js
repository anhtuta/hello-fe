import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const columns = [
  {
    Header: 'No',
    accessor: 'No',
    Cell: 1,
    style: {
      textAlign: "center"
    }
  }, 
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
  {
    Header: 'Created date',
    accessor: 'createdDate'
  },
  {
    Header: 'Action'
  }
];
const data = [
  {
    "id": 1,
    "name": "Initial task",
    "status": "DONE",
    "createdDate": "2019-07-03T16:33:07.000+0000"
  },
  {
    "id": 2,
    "name": "Quên crush đi",
    "status": "ACTIVE",
    "createdDate": "2019-07-03T16:46:03.000+0000"
  },
  {
    "id": 3,
    "name": "Play COC",
    "status": "ACTIVE",
    "createdDate": "2019-07-03T16:46:03.000+0000"
  },
  {
    "id": 4,
    "name": "Chạy bộ",
    "status": "ACTIVE",
    "createdDate": "2019-07-03T16:46:03.000+0000"
  },
  {
    "id": 5,
    "name": "Hít đất, lên xà",
    "status": "DONE",
    "createdDate": "2019-07-03T16:46:03.000+0000"
  },
  {
    "id": 6,
    "name": "Học ReactJS",
    "status": "ACTIVE",
    "createdDate": "2019-07-03T16:46:03.000+0000"
  },
  {
    "id": 7,
    "name": "Học Redux",
    "status": "DONE",
    "createdDate": "2019-07-03T16:46:03.000+0000"
  }
];

export default class App extends Component {

  render() {
    return (
      <div className="tama-app">
        <h1 className="tama-header">Tama-app</h1>
        <ReactTable
          columns={columns}
          data={data}
          defaultPageSize={10} />
      </div>
    );
  }
}