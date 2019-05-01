import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label
} from 'reactstrap'
import { Formik } from 'formik'
import { authLogin } from '../../store/auth'
import { alertAdd } from '../../store/alert'

export const Login = ({ toggle, cancel, auth, authLogin, alertAdd }) => {
  return (
    <Mutation mutation={SIGNIN}>
      {login => (
        <Fragment>
          <ModalHeader>
            <span style={{ color: 'white', fontSize: 24 }}>Connexion</span>
          </ModalHeader>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            onSubmit={async variables => {
              try {
                let res = await login({ variables })
                const { user, token } = res.data.login
                authLogin({ user, token })
                cancel()
              } catch (e) {
                alertAdd({
                  color: 'danger',
                  text: 'Identifiants non valide.'
                })
              }
            }}
          >
            {({ handleChange, values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <ModalBody className="mb-4">
                  <FormGroup>
                    <Label>Identifiant</Label>
                    <Input
                      name="username"
                      type="text"
                      value={values.username}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Mot de passe</Label>
                    <Input
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter style={{ display: 'block' }}>
                  <Button type="submit" color="primary" className="mr-4">
                    Connexion
                  </Button>
                  <a
                    href="#"
                    className="text-secondary text-muted"
                    onClick={e => {
                      e.preventDefault()
                      toggle()
                    }}
                  >
                    S'enregistrer
                  </a>
                  <a
                    href="#"
                    className="btn btn-secondary float-right"
                    onClick={e => {
                      e.preventDefault()
                      cancel()
                    }}
                  >
                    Annuler
                  </a>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </Fragment>
      )}
    </Mutation>
  )
}

const SIGNIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        likes {
          imdbID
          Title
        }
      }
    }
  }
`

export default connect(
  state => ({ auth: state.auth }),
  {
    authLogin,
    alertAdd
  }
)(Login)
