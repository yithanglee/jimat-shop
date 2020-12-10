import React from 'react';

const CartButton = props => {
  // const [quantity, updateQuantity] = useState(props.quantity);
  // const [isEmpty, updateStatus] = useState(props.quantity === 0);

  // const handleCart = calc => {
  //   updateQuantity(quantity + calc);
  //   updateStatus(quantity + calc === 0);
  // };
  const { error } = props;

  return (
    <div className="add-to-cart">
      {props.quantity === 0 ? (
        <span className="quantity">Add to Cart</span>
      ) : (
        <>
          <span
            className="minus"
            onClick={() => {
              props.removeFromCart();
            }}
          >
            -
          </span>
          <span className="quantity">{props.quantity}</span>
        </>
      )}
      <span
        className={`add ${error && 'disabled'}`}
        onClick={() => {
          if (!error) {
            props.addToCart();
          }
        }}
      >
        +
      </span>
    </div>
  );
};

export default CartButton;
