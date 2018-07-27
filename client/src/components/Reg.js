import React from 'react'
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';

const Reg = () => (
  <div>
    <div>
    <h1>Thank you for registering!</h1>
    </div>
    <br/><br/>
    <div>
    Your password will be emailed 1x24 hour from now!
    </div>
    <br/><br/>
    <div>
    <Link to='/'>
      <Button type="primary">
        <Icon type="left" />Back to Login Page
      </Button>
      </Link>
      </div>
  </div>
)

export default Reg