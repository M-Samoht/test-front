import React, { Fragment, useState } from 'react'
import { Container, Col, Row } from 'reactstrap'

import PageHead from './PageHead'
import MovieList from './MovieList'
import Userlist from './Userlist'
import styled from '@emotion/styled'

const Section = styled.div`
  background: #171941;
  padding-top: 140px;
  min-height: 400px;
`

export default ({ history }) => {
  const [page, setPage] = useState(1)
  return (
    <Fragment>
      <PageHead page={1} />
      <Section>
        <Container>
          <Row>
            <Col md="9">
              <MovieList
                search={''}
                page={page}
                setPage={setPage}
                history={history}
              />
            </Col>
            <Col md="3">
              <Userlist page={1} />
            </Col>
          </Row>
        </Container>
      </Section>
    </Fragment>
  )
}
