import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import {
  Button,
  Container,
  Modal,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Register from './Register'
import Login from './Login'

import { authLogout } from '../../store/auth'

const Topbar = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  z-index: 999;
  background: ${props => (props.transparent ? 'transparent' : '#0b0c23')};
  transition: background 0.7s;
`

const Content = styled(Container)`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`

const TopbarComponent = ({ auth, authLogout, history }) => {
  const [transparent, setTransparent] = useState(true)
  const [login, setLogin] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const onScroll = e => {
      setTransparent(document.documentElement.scrollTop < 100)
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  const cancel = () => {
    setShowModal(false)
  }

  const toggle = () => {
    setLogin(!login)
  }

  return (
    <Topbar transparent={transparent}>
      <Content>
        <Link style={{ color: 'white' }} to="/">
          Accueil
        </Link>
        {auth.token ? (
          <UncontrolledDropdown group>
            <DropdownToggle caret color="secondary" data-toggle="dropdown">
              {auth.user.username}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => history.push(`/user/${auth.user._id}`)}
              >
                Profile
              </DropdownItem>
              <DropdownItem onClick={() => authLogout()}>
                Déconnexion
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <Button onClick={() => setShowModal(true)}>Connexion</Button>
        )}
      </Content>
      <Modal isOpen={showModal}>
        {login ? (
          <Login toggle={toggle} cancel={cancel} />
        ) : (
          <Register toggle={toggle} cancel={cancel} />
        )}
      </Modal>
    </Topbar>
  )
}

export default connect(
  state => ({ auth: state.auth }),
  { authLogout }
)(TopbarComponent)
