import React from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { authUpdate } from '../../store/auth'
import { alertAdd } from '../../store/alert'

const Like = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 15px;
  height: 40px;
  width: 100%;
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

const Index = ({ movie, auth, authUpdate, onToggle, style, alertAdd }) => {
  const isLiked =
    auth.user && auth.user.likes.find(item => item.imdbID === movie.imdbID)
  return (
    <Mutation mutation={TOGGLE_MUTATION}>
      {toggleLike => (
        <Like
          style={style}
          onClick={async () => {
            try {
              const res = await toggleLike({
                variables: { imdbID: movie.imdbID }
              })
              authUpdate(res.data.toggleLike)
              if (!isLiked) {
                alertAdd({
                  color: 'success',
                  text: `Vous aimez "${movie.Title}"`
                })
              } else {
                alertAdd({
                  color: 'info',
                  text: `Vous n'aimez plus "${movie.Title}"`
                })
              }
              if (onToggle) {
                onToggle()
              }
            } catch (e) {
              if (auth.user) {
                alertAdd({
                  color: 'danger',
                  text: `Vous avez déjà 3 likes`
                })
              } else {
                alertAdd({
                  color: 'danger',
                  text: `Impossible d'aimer un film sans être connecté`
                })
              }
            }
          }}
        >
          <i
            className={`fa fa-heart ${isLiked ? 'text-primary' : ''}`}
            style={{ fontSize: 20 }}
          />
          <span style={{ marginLeft: 7 }}>{movie.LikesCount}</span>
        </Like>
      )}
    </Mutation>
  )
}

export default connect(
  state => ({ auth: state.auth }),
  { authUpdate, alertAdd }
)(Index)
