import React, { Fragment } from 'react'
import {
  Container,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  Button
} from 'reactstrap'
import styled from '@emotion/styled'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import ProgressiveImage from 'react-progressive-image'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { authUpdate } from '../../store/auth'
import { alertAdd } from '../../store/alert'
import Logo from '../components/Logo'
import Like from '../components/Like'

const Image = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: all 0.7s;
  &:hover {
    transform: scale(1.2);
  }
`

const ImageContainer = styled.div`
  width: 100%;
  height: 350px;
  overflow: hidden;
  margin-bottom: 20px;
`

const Title = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`
const Year = styled.h5`
  margin-bottom: 50px;
`

const Block = styled.div`
  position: relative;
`

const TopPage = styled(Container)`
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 992px) {
    height: 20vh;
  }
  @media (max-width: 576px) {
    height: 20vh;
  }
`
const USER_QUERY = gql`
  query user($_id: String!) {
    user(_id: $_id) {
      _id
      username
      email
      birthday
      likes {
        imdbID
        Title
        Poster
      }
    }
  }
`
const USER_MUTATION = gql`
  mutation user($username: String!, $email: String!, $birthday: String!) {
    user(username: $username, email: $email, birthday: $birthday) {
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

const Index = ({ match, auth, authUpdate, alertAdd }) => {
  return (
    <Fragment>
      <Query query={USER_QUERY} variables={{ _id: match.params.id }}>
        {data => {
          const { user } = data.data
          const isMe = user && auth.user && auth.user._id === user._id
          return (
            <Mutation mutation={USER_MUTATION}>
              {update => (
                <Fragment>
                  <TopPage>
                    <Logo />
                  </TopPage>
                  <Container>
                    {user && (
                      <Formik
                        initialValues={{
                          username: user.username,
                          email: user.email,
                          birthday: user.birthday ? new Date(user.birthday) : ''
                        }}
                        onSubmit={async variables => {
                          try {
                            await update({
                              variables: {
                                ...variables,
                                birthday: variables.birthday.toISOString()
                              }
                            })
                            alertAdd({
                              color: 'success',
                              text: 'Votre profile a bien été mis a jour.'
                            })
                          } catch (e) {
                            alertAdd({
                              color: 'danger',
                              text:
                                "Un problème est survenu vôtre profile n'a pas été mis a jour."
                            })
                          }
                        }}
                      >
                        {({
                          values,
                          handleChange,
                          setFieldValue,
                          handleSubmit
                        }) => (
                          <form className="mb-5" onSubmit={handleSubmit}>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <Label>Identifiant</Label>
                                  <Input
                                    disabled={!isMe}
                                    name="username"
                                    type="text"
                                    value={values.username}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label>Adresse email</Label>
                                  <Input
                                    disabled={!isMe}
                                    name="email"
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label>Date de naissance</Label>
                                  <DatePicker
                                    disabled={!isMe}
                                    name="birthday"
                                    selected={values.birthday}
                                    onChange={birthday => {
                                      setFieldValue('birthday', birthday)
                                    }}
                                    className="form-control"
                                    style={{ width: '100%' }}
                                    showYearDropdown
                                    withPortal
                                  />
                                </FormGroup>
                                {isMe && <Button>Sauvegarder</Button>}
                              </Col>
                            </Row>
                          </form>
                        )}
                      </Formik>
                    )}
                    <Row>
                      {user &&
                        user.likes.map((movie, id) => {
                          return (
                            <Block
                              className="mb-5 col-lg-4 col-md-6 col-sm-12"
                              key={id}
                            >
                              <Link
                                to={`/movie/${movie.imdbID}`}
                                className="text-secondary"
                              >
                                <ProgressiveImage
                                  src={movie.Poster}
                                  placeholder="https://i1.wp.com/thefrontline.org.uk/wp-content/uploads/2018/10/placeholder.jpg?ssl=1"
                                >
                                  {(src, loading) => (
                                    <ImageContainer>
                                      <Image src={src} alt={movie.Title} />
                                    </ImageContainer>
                                  )}
                                </ProgressiveImage>
                              </Link>
                              <Title>
                                <Link
                                  to={`/movie/${movie.imdbID}`}
                                  className="text-secondary"
                                >
                                  {movie.Title}
                                </Link>
                              </Title>
                              <Year>{movie.Year}</Year>
                              <Like movie={movie} />
                            </Block>
                          )
                        })}
                    </Row>
                  </Container>
                </Fragment>
              )}
            </Mutation>
          )
        }}
      </Query>
    </Fragment>
  )
}

export default connect(
  state => ({ auth: state.auth }),
  { authUpdate, alertAdd }
)(Index)
