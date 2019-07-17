import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useMappedState } from 'redux-react-hook'
import { Icon } from 'semantic-ui-react'

const UserIcon = props => {
  const checkIn = e => {
    dispatch({
      type: 'OPEN_SIDER',
      data: true
    })
  }

  return (
    <Icon name="user" className="icon-user" onClick={ checkIn }></Icon>
  )
}

UserIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default UserIcon