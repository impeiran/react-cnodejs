import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import cnodeSDK from '@/utils/cnodeSDK'

import './user.scss'

const UserPage = props => {
  const { match } = props
  const { loginname } = match.params

  useEffect(() => {
    cnodeSDK.getUserDetail(loginname).then(res => {
      res = res.data
      if (!res.success) return

      const data = res.data
      console.log(data)
    })
  })

  return (
    <section className="user-page">
      hello user
    </section>
  )
}

export default withRouter(UserPage)