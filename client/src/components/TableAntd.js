
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import data from './student-2.json'
import axios from 'axios';
import { Table, Icon, Divider, Select, Button } from 'antd';

    const Option = Select.Option;
    const children = [];
    axios.get('/getroles')
          .then(function (response) {
            //console.log(response.data.length);
            for (let i=0; i<response.data.length; i++){
                children.push(<Option key={response.data[i].roles_name}>{response.data[i].roles_name}</Option>);
            }
            
          })
          .catch(function (error) {
            console.log(error);
    }); 

    const companiesData = [];
    axios.get('/getcompanies')
          .then(function (response) {
            //console.log(response.data.length);
            for (let i=0; i<response.data.length; i++){
                companiesData.push(<Option key={response.data[i].company_name}>{response.data[i].company_name}</Option>);
            }
            
          })
          .catch(function (error) {
            console.log(error);
    }); 

    const supervisorsData = [];
    axios.get('/getsupervisors')
          .then(function (response) {
            //console.log(response.data.length);
            for (let i=0; i<response.data.length; i++){
                supervisorsData.push(<Option key={response.data[i].supervisor_name}>{response.data[i].supervisor_name}</Option>);
            }
            
    })
          .catch(function (error) {
            console.log(error);
    }); 

    var datas = {};

    function handleChangeDivision(record,e) {
        console.log(`User selected : ${record.user_username} with Role : ${e}`);
        var test = (datas.username_current != undefined);
        console.log(test)
        var username_current = record.user_username;
        console.log(username_current)

        if (datas[`${username_current}`] != undefined) {
          datas[`${username_current}`].division = e;
          console.log("division is updated");
        }
        else {

          datas[`${username_current}`] = {division: e, company: "IBM", supervisor: ""}
          console.log("data is created, division inserted");
        }
        console.log(datas);
    }

    function handleChangeCompany(record,e) {
      console.log(`User selected : ${record.user_username} with Company : ${e}`);

      var username_current = record.user_username;
        if (datas[`${username_current}`] != undefined) {
          datas[`${username_current}`].company = e;
          console.log("company is updated");
        }
        else {

          datas[`${username_current}`] = {division: "", company: e, supervisor: ""}
          console.log("data is created, company inserted");
        }

        console.log(datas);
    }

    function handleChangeSupervisor(record,e) {
      console.log(`User selected : ${record.user_username} with Supervisor : ${e}`);

      var username_current = record.user_username;
        if (datas[`${username_current}`] != undefined) {
          datas[`${username_current}`].supervisor = e;
          console.log("supervisor is updated");
        }
        else {

          datas[`${username_current}`] = {division: "", company: "IBM", supervisor: e}
          console.log("data is created, supervisor inserted");
        }

        console.log(datas);
    }

    function handleReject(record){
      console.log(`${record.user_username} is rejected`);
      axios.get(`http://localhost:1338/deleteuser/${record.user_id}`)
          .then(function (response) {
            console.log(response);
            console.log("deleted");
          })
          .catch(function (error) {
            console.log(error);
          });  
    }

    const columns = [{
    title: 'Name',
    dataIndex: 'user_name',
    key: 'user_name',
    render: text => <a href="javascript:;">{text}</a>,
    },
    {
    title: 'Email',
    dataIndex: 'user_username',
    key: 'user_username',

    }, {
    title: 'Role',
    dataIndex: 'user_division',
    key: 'user_division',
    render: (text, record) => (
        <span>
        {text} `{record.user_username}`
        <br/>
        <Select
            mode="multiple"
            style={{ width: '80%' }}
            placeholder="Please select"
            onChange={(e) => handleChangeDivision(record, e)}
        >
            {children}
        </Select>
        </span>
    )
    }, {
    title: 'Company',
    dataIndex: 'user_current_company',
    key: 'user_current_company',
    render: (text, record) => (
        <span>
        {text}
        <br/>
        <Select defaultValue="IBM" style={{ width: 120 }} onChange={(e) => handleChangeCompany(record, e)}>
            {companiesData}
         </Select>   
        </span>
    )
    }, {
    title: 'Supervisor',
    key: 'supervisor',
    render: (record) => (
        <span>
        <Select defaultValue="" style={{ width: 120 }} onChange={(e) => handleChangeSupervisor(record, e)}>
        {supervisorsData}
        </Select> 
        </span>
    )
    }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
        <a href="javascript:;">Action 一 {record.user_name}</a>
        <Divider type="vertical" />
        <Button type="primary">Accept</Button>
        <Divider type="vertical" />
        <Button type="danger" onClick={() => handleReject(record)}>Reject</Button>
        </span>
    ),
    }];

    class TableAntd extends React.Component {
        constructor(props) {
          super(props)
          this.state = {
            data: data,
          }
          // this.handleChangeDivision = this.handleChangeDivision.bind(this)
        }
      
      
        render() {
          axios.get('/user')
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });  
          return (
            <div
              className="page-container"
            >
              <Table columns={columns} dataSource={data} />
            </div>
          )
        }
      }
      
      export default TableAntd;
      
