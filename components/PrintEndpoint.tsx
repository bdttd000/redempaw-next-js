import React from 'react'
import {Post} from '@/lib/data'

const PrintEndpoint = ({id, title, desc}: Post) => {
  return (
    <div className="m-5 p-5 bg-blue-500 w-auto lg:w-1/3" key={id}>
      <h2>id: {id}</h2>
      <h2>title: {title}</h2>
      <h2>desc: {desc}</h2>
    </div>
  )
}

export default PrintEndpoint