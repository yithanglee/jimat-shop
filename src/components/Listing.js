import React from 'react';
import 'style/listing.scss';


const ListingWithAction = (props) => {
  const { icon, action, children, onClick } = props
  const Icon = icon ? icon : null
  const Action = action ? action : null
  return (
    <div className="list-item w-full" onClick={onClick}>
      <div className="list-content">
        {icon && <Icon />}
        <span className="content">{children}</span>
      </div>
      {action && <Action />}
    </div>
  )
  }

const ListingWithoutAction = ({ children }) => (
  <div className="list-item w-full">
    <div className="list-content w-full">
      <span className="content w-full">{children}</span>
    </div>
  </div>
) 
export default class Listing extends React.Component {
  render() {
    const { full } = this.props
    return full
      ? <ListingWithoutAction {...this.props} />
      : <ListingWithAction {...this.props} />
  }
}
