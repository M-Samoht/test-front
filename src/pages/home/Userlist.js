import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import styled from '@emotion/styled'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

const Item = styled(ListGroupItem)`
  background-color: transparent;
  border: none;
  border-bottom: solid rgba(255, 255, 255, 0.1) 1px;
`

const Userlist = ({ data }) => {
  return (
    <ListGroup>
      {data.users &&
        data.users.users.map((user, id) => (
          <Item key={id}>
            <Link to={`/user/${user._id}`} className="text-secondary">
              {user.username}
            </Link>
          </Item>
        ))}
    </ListGroup>
  )
}

const USERS_QUERY = gql`
  query users($page: Int!) {
    users(page: $page) {
      users {
        username
        _id
      }
    }
  }
`

export default graphql(USERS_QUERY)(Userlist)
