import React, { Fragment } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import styled from '@emotion/styled'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Logo from '../components/Logo'
import ProgressiveImage from 'react-progressive-image'
import Like from '../components/Like'

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

const Item = styled(ListGroupItem)`
  background-color: transparent;
  border: none;
  border-bottom: solid rgba(255, 255, 255, 0.1) 1px;
`

const MOVIE_QUERY = gql`
  query movie($imdbID: String!) {
    movie(imdbID: $imdbID) {
      Title
      Year
      Rated
      Released
      Runtime
      Genre
      Director
      Writer
      Actors
      Plot
      Language
      Country
      Awards
      Poster
      Metascore
      imdbRating
      imdbVotes
      imdbID
      Type
      DVD
      BoxOffice
      Production
      Website
      LikesCount
      likes {
        _id
        username
      }
    }
  }
`

const Index = ({ match }) => {
  return (
    <Query query={MOVIE_QUERY} variables={{ imdbID: match.params.id }}>
      {data => {
        const { movie } = data.data
        return (
          <Fragment>
            <TopPage>
              <Logo />
            </TopPage>
            <Container className="mt-5">
              {movie && (
                <Row>
                  <Col lg="9">
                    <Row>
                      <Col lg="4" className="text-center mb-5">
                        <ProgressiveImage
                          src={movie.Poster}
                          placeholder="https://i1.wp.com/thefrontline.org.uk/wp-content/uploads/2018/10/placeholder.jpg?ssl=1"
                        >
                          {(src, loading) => (
                            <img src={src} alt={movie.Title} />
                          )}
                        </ProgressiveImage>
                      </Col>
                      <Col lg="8" className="mb-5">
                        <h1>{movie.Title}</h1>
                        <h4>{movie.Year}</h4>
                        <Like
                          movie={movie}
                          onToggle={data.refetch}
                          style={{ position: 'relative', left: 0 }}
                        />
                        <p className="text-muted">Durée : {movie.Runtime}</p>
                        <p className="text-muted">Genre : {movie.Genre}</p>
                        <p className="text-muted">
                          Réalisateur : {movie.Director}
                        </p>
                        <p className="text-muted">Auteur : {movie.Writer}</p>
                        <p className="text-muted">Acteurs : {movie.Actors}</p>
                        <p className="text-muted">Langue : {movie.Language}</p>
                        <p className="text-muted">Origine : {movie.Country}</p>
                        <p className="mt-5">{movie.Plot}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg="3" className="mb-5">
                    <h4>Les Utilisateurs ont aimé</h4>
                    <ListGroup>
                      {movie.likes &&
                        movie.likes.map((user, id) => (
                          <Item key={id}>
                            <Link
                              to={`/user/${user._id}`}
                              className="text-secondary"
                            >
                              {user.username}
                            </Link>
                          </Item>
                        ))}
                    </ListGroup>
                  </Col>
                </Row>
              )}
            </Container>
          </Fragment>
        )
      }}
    </Query>
  )
}

export default connect()(Index)
