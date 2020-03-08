import React from 'react'
import { redirect } from 'react-router-dom'

const routes = [
  {
    path: '/',
    exact: true,
    redirect: () => <redirect />
  }
]

export default routes
