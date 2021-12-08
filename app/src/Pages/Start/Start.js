import React from 'react'
import StartForm from '../../Components/StartForm'
import HeaderField from '../../Components/HeaderField'

export default function Start () {
  return (
    <div>
      <HeaderField notifications={false} />
      <StartForm/>
    </div>
  )
}
