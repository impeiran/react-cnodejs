import React from 'react'

import './skeleton.scss'

const Skeleton = props => {

  const genItem = num => {
    let result = []
    for (let i = 0 ; i < num ; i++) {
      result.push(
        <div className="ske" key={i}>
          <span className="ske-item headline"></span>
          <div className="body">
            <span className="ske-item pic"></span>
            <ul>
              <li className="ske-item"></li>
              <li className="ske-item"></li>
            </ul>
          </div>
        </div>
      )
    }
    return result
  }

  return (
    <div>{ genItem(props.num) }</div>
  )
}

Skeleton.defaultProps = {
  num: 5
}

export default Skeleton