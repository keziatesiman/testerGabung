import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

// The Header creates links that can be used to navigate
// between routes.
const Headers = () => (
  <header>
    <Layout className="layout">
  <Header>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="1"><Link to='/home'>Home</Link></Menu.Item>
      <Menu.Item key="2"><Link to='/roster'>Roster</Link></Menu.Item>
      <Menu.Item key="3"><Link to='/schedule'>Schedule</Link></Menu.Item>
    </Menu>
  </Header>
  </Layout>
    {/* <nav>
      <ul>
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/roster'>Roster</Link></li>
        <li><Link to='/schedule'>Schedule</Link></li>
      </ul>
    </nav> */}
    
  </header>
  
)

export default Headers
