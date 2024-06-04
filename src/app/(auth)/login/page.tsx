import React from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    // vertical-center is from our globals.css - made a rule to calculate screen height and subtract the height of the navbar, then center
    <div className='flex items-center justify-center vertical-center'>

      <LoginForm/>
    </div>
  )
}
