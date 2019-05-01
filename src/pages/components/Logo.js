import React from 'react'
import styled from '@emotion/styled'
import logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom'

const Logo = styled.img`
  width: 50%;
  margin-bottom: 80px;
  margin-top: 80px;
  @media (max-width: 992px) {
    margin-top: 180px;
  }
`

export default () => (
  <Link to="/" style={{ width: '100%', textAlign: 'center' }}>
    <Logo src={logo} />
  </Link>
)
