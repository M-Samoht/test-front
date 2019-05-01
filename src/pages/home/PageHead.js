import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import { Container, Row, Col, Card } from 'reactstrap'
import { Link } from 'react-router-dom'
import ProgressiveImage from 'react-progressive-image'
import Logo from '../components/Logo'

import bg from '../../assets/img/bg.jpg'
import winner from '../../assets/img/winner.png'
import Like from '../components/Like'

const Background = styled.img`
  width: 100vw;
  height: 80vh;
  object-fit: cover;
  position: fixed;
  z-index: -1;
  @media (max-width: 992px) {
    height: 60vh;
  }
`

const TopPage = styled(Container)`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 992px) {
    height: 60vh;
  }
  @media (max-width: 576px) {
    height: 100vh;
  }
`
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 400px;
  object-fit: cover;
  @media (max-width: 576px) {
    max-height: 50vh;
  }
`

const Title = styled.h2`
  margin-bottom: 0;
  color: white;
`

const Year = styled.h4`
  margin-bottom: 1.2em;
`
const Badge = styled.img`
  position: absolute;
  width: 50px;
  top: -20px;
  right: -20px;
`

const Home = ({ data }) => {
  return (
    <Fragment>
      <Background src={bg} />
      <TopPage>
        <Logo />
        <Col xs="12" sm="12" md="12" lg="8">
          {!data.top ? (
            <div className="loading" />
          ) : (
            <Card style={{ position: 'relative' }}>
              <Row noGutters>
                <Col md="4" sm="6" xs="12" className="text-center">
                  <Link to={`/movie/${data.top.imdbID}`}>
                    <ProgressiveImage
                      src={data.top.Poster}
                      placeholder="https://i1.wp.com/thefrontline.org.uk/wp-content/uploads/2018/10/placeholder.jpg?ssl=1"
                    >
                      {(src, loading) => (
                        <CardImage src={src} alt={data.top.Title} />
                      )}
                    </ProgressiveImage>
                  </Link>
                </Col>
                <Col md="8" sm="6" xs="12" className="p-5">
                  <Title style={{ color: 'white' }}>
                    <Link
                      to={`/movie/${data.top.imdbID}`}
                      style={{ color: 'white' }}
                    >
                      {data.top.Title}
                    </Link>
                  </Title>
                  <Year>{data.top.Year}</Year>
                  <p>
                    Mankind is dying. Only one man can do anything about it,
                    Space Captain Harlock, but the Gaia Coalition will stop at
                    nothing to end him.
                  </p>
                  <Like
                    movie={data.top}
                    onToggle={data.refetch}
                    style={{ left: '40px' }}
                  />
                </Col>
                <Badge src={winner} />
              </Row>
            </Card>
          )}
        </Col>
      </TopPage>
    </Fragment>
  )
}

const QUERY = gql`
  query {
    top {
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
      imdbID
      LikesCount
    }
  }
`

export default graphql(QUERY)(Home)
