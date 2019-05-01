import React, { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import { useTransition, animated } from 'react-spring'
import { connect } from 'react-redux'
import ProgressiveImage from 'react-progressive-image'
import { graphql, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import Pagination from '../components/Pagination'
import Like from '../components/Like'
import { authUpdate } from '../../store/auth'
import { Link } from 'react-router-dom'

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: all 0.7s;
  &:hover {
    transform: scale(1.2);
  }
`

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
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

const Block = styled(animated.div)`
  position: relative;
`

const MovieList = ({ data, page, setPage, history, auth, authUpdate }) => {
  
  let transitions = useTransition(
    !data.movies ? [] : data.movies.movies,
    item => item.imdbID,
    {
      from: { transform: 'translate3d(0, -40px, 0)', opacity: 0 },
      leave: { transform: 'translate3d(0, -40px, 0)', opacity: 0 },
      enter: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
      trail: 50,
      unique: true
    }
  )
  if (data.error) {
    return <Col className="text-center">
      <h4>Le serveur de données est inncessible veuillez reéssayer plus tard.</h4>
    </Col>
  }
  transitions = transitions.filter(
    item => item.state !== 'leave' || item.state !== 'update'
  )
  return (
    <Row>
      {!data.loading ? (
        <Mutation mutation={TOGGLE_MUTATION}>
          {toggleLike => {
            return (
              <Fragment>
                {transitions.map(args => {
                  const { item: movie, key, props, state } = args
                  return state === 'leave' ? null : (
                    <Block
                      className="mb-5 col-lg-3 col-md-6 col-sm-12"
                      key={key}
                      style={props}
                    >
                      <Link
                        to={`/movie/${movie.imdbID}`}
                        className="text-secondary"
                      >
                        <ProgressiveImage
                          src={movie.Poster}
                          placeholder="https://i1.wp.com/thefrontline.org.uk/wp-content/uploads/2018/10/placeholder.jpg?ssl=1"
                        >
                          {src => (
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
                      <Like movie={movie} onToggle={data.refetch} />
                    </Block>
                  )
                })}
                <Pagination
                  style={{ position: 'relative' }}
                  history={history}
                  setPage={setPage}
                  page={page}
                  total={Math.ceil(data.movies.totalResults / 10)}
                />
              </Fragment>
            )
          }}
        </Mutation>
      ) : (
        <div className="loading" />
      )}
    </Row>
  )
}

const QUERY = gql`
  query movies($search: String!, $page: Int!) {
    movies(query: $search, page: $page) {
      movies {
        imdbID
        Title
        Poster
        LikesCount
        Year
      }
      totalResults
    }
  }
`

const TOGGLE_MUTATION = gql`
  mutation like($imdbID: String!) {
    toggleLike(imdbID: $imdbID) {
      _id
      username
      likes {
        imdbID
        Title
      }
    }
  }
`

export default connect(
  state => ({ auth: state.auth }),
  { authUpdate }
)(graphql(QUERY)(MovieList))
