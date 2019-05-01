import React from 'react'
import { Pagination, PaginationItem, PaginationLink, Col } from 'reactstrap'

export default ({ page, total, setPage, style }) => {
  return (
    <Col md="12" className="d-flex justify-content-center" style={style}>
      <Pagination>
        <PaginationItem disabled={page === 1}>
          <PaginationLink onClick={() => setPage(page !== 1 ? page - 1 : 1)}>
            Précedent
          </PaginationLink>
        </PaginationItem>
        {page !== 1 && page !== 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {page !== 1 && page !== 2 && page !== 3 && (
          <PaginationItem>...</PaginationItem>
        )}
        {page !== 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem active>
          <PaginationLink onClick={() => setPage(page)}>{page}</PaginationLink>
        </PaginationItem>
        {page !== total && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {page !== total && page !== total - 1 && page !== total - 2 && (
          <PaginationItem>...</PaginationItem>
        )}
        {page !== total && page !== total - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(total)}>
              {total}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem disabled={page === total}>
          <PaginationLink
            onClick={() => setPage(page !== total ? page + 1 : total)}
          >
            Suivant
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Col>
  )
}
