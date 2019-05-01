import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import styled from '@emotion/styled'

import { alertAdd, alertRemove } from '../../store/alert'

const AlertContainer = styled.div`
  z-index: 9999;
  position: fixed;
  bottom: 0;
  right: 25px;
  min-width: 300px;
  max-width: calc(100% - 50px);
`

const Index = ({ alert, alertRemove }) => {
  return (
    <AlertContainer>
      {alert.map((item, id) => (
        <Alert
          style={{ cursor: 'pointer' }}
          key={id}
          onClick={() => alertRemove(item.id)}
          color={item.color}
        >
          {item.text}
        </Alert>
      ))}
    </AlertContainer>
  )
}

export default connect(
  state => state,
  { alertAdd, alertRemove }
)(Index)
