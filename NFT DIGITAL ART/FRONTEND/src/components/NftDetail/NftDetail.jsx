import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getNftDetail from '../../actions/getNftDetail'
import { useSelector, useDispatch } from 'react-redux'
import getClean from '../../actions/getClean'
import styled from 'styled-components'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { addShoppingTrolley } from '../../actions/addShoppingTrolley'
import addFavorite from '../../actions/favorite/addFavorite'
import { conectLS } from '../../actions/conectLS'

import Review from '../Reviews/Reviews'
import { Grid, Typography } from '@material-ui/core'
const Container = styled.div``

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`
const ImgContainer = styled.div`
  flex: 0, 7;
  @media (max-width: 700px) {
    flex: 1;
  }
`

const Image = styled.img`
  width: 94%;
  border-radius: 5%;
  height: 90vh;
  object-fit: cover;
  `
  
  const InfoContainer = styled.div`
  background: white;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.1);
  border-radius: 5%;
  flex: 1;
  padding: 0px 50px;
`

const TitleContainer = styled.div`
  padding-top: 13px;
  background: white;
  border-radius: 5%;
  display: flex;
`
/* 
const Title = styled.h1`
  font-weight: 100;
`
 */
const Owner = styled.h3`
  background: white;
  border-radius: 5%;
  margin: 0px 2px;
  font-weight: 100;
  font-size: 18px;
  color: #A2DBFA;
`

const Description = styled.p`
  margin: 20px 0px;
`

const Price = styled.h3`
  font-weight: 100;
  font-size: 30px;
`

const useStyles = makeStyles({
  favorite: {
    opacity: 0.7,
    color: 'error',
    '&:hover': {
      color: '#FF0000',
    },
  },

  favoritered: {
    opacity: 0.7,
    color: '#FF0000',
  },
})
export default function NftDetail() {
  const nftDetail = useSelector((state) => state.nftDetail)
  const favorites = useSelector((state) => state.favorites)
  const isfavorite = nftDetail ? favorites.includes(nftDetail._id) : false
  const { id } = useParams()
  const dispatch = useDispatch()
  const userLogged = useSelector((state) => state.userLogged)
  const classes = useStyles()
  useEffect(() => {
    dispatch(getNftDetail(id))

    return () => {
      dispatch(getClean())
    }
  }, [id, dispatch])

  const handleFav = (ele) => {
    dispatch(addFavorite({ item: ele._id, user: userLogged }))
  }

  const handleClick = (ele) => {
    dispatch(addShoppingTrolley(ele._id))
    dispatch(conectLS())
  }

  return (
    <Container>
      {nftDetail !== undefined ? (
        <Wrapper>
          <ImgContainer>
            <Image src={nftDetail.image} alt='img' />
          </ImgContainer>
          <InfoContainer>
            <TitleContainer>
              <Typography variant='h3'>{nftDetail.name}</Typography>
              {isfavorite ? (
                <IconButton>
                  {userLogged ? (
                    <FavoriteIcon
                      onClick={() => handleFav(nftDetail)}
                      className={classes.favoritered}
                    />
                  ) : null}
                </IconButton>
              ) : (
                <IconButton>
                  {userLogged ? (
                    <FavoriteBorderIcon
                      onClick={() => handleFav(nftDetail)}
                      className={classes.favorite}
                    />
                  ) : null}
                </IconButton>
              )}
            </TitleContainer>
            <Owner>Owned by: {nftDetail.owner}</Owner>
            <Description>{nftDetail.description}</Description>
            <Price>{nftDetail.price} ETH</Price>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleClick(nftDetail)}
            >
              Add To my Cart
              <AddShoppingCartIcon />
            </Button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          <Review />
          </InfoContainer>
        </Wrapper>
      ) : (
        <span>Loading...</span>
      )}
    </Container>
  )
}
