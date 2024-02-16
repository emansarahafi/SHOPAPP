import React from 'react'
import CardItem from './CardItem'
import {useParams} from 'react-router-dom'

export default function ProductDetails({product}) {
  let {id} = useParams();

  const elt= product.find((elt) => elt.id === Number(id));

  return (
    <CardItem elt={elt} details={true}/>
  )
}
