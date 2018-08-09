import React from 'react'

export default function Table(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Current Company</th>
          <th>Division</th>
        </tr>
      </thead>
      <tbody>
        {
          props.data.map(row => (
            <tr>
              <td>{row.user_id}</td>
              <td>{row.user_username}</td>
              <td>{row.user_name}</td>
              <td>{row.user_phone}</td>
              <td>{row.user_current_company}</td>
              <td>{row.user_division}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}