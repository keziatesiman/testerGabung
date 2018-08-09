
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import data from './student-2.json'
import axios from 'axios';
import { Table, Icon, Divider, Select } from 'antd';


    const Option = Select.Option;
    const children = [];
    for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }


    function handleChange(value) {
    console.log(`selected ${value}`);
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
    render: text => (
        <span>
        {text}
        <br/>
        <Select
            mode="multiple"
            style={{ width: '80%' }}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            onChange={handleChange}
        >
            {children}
        </Select>
        </span>
    )
    }, {
    title: 'Company',
    dataIndex: 'user_current_company',
    key: 'user_current_company',
    render: text => (
        <span>
        {text}
        <br/>
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
            {children}
         </Select>   
        </span>
    )
    }, {
    title: 'Supervisor',
    key: 'supervisor',
    render: () => (
        <span>
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled">Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
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
        <a href="javascript:;">Delete</a>
        <Divider type="vertical" />
        <a href="javascript:;" className="ant-dropdown-link">
            More actions <Icon type="down" />
        </a>
        </span>
    ),
    }];

    class TableAntd extends React.Component {
        constructor(props) {
          super(props)
          this.state = {
            data: data,
            
          }
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
      
