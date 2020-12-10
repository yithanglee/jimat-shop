import React from 'react'

const Margin = (props) => {
  return (
    <div style={{ margin: props.margin }}>
      {props.children}
    </div>
  )
}

export default Margin