import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const reducerFunc = function (state, action) {
  if (action.type === "ADD") {
    const updatedTotalAmounts =
      state.totalAmount + action.item.price * action.item.amount;
    const findIndexItem = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    let updatedItem;
    let updatedItems;
    const isIndexItem = state.items[findIndexItem];
    if (isIndexItem) {
      updatedItem = {
        ...isIndexItem,
        amount: isIndexItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[findIndexItem] = updatedItem;
    } else {
      updatedItem = {
        ...action.item,
      };
      updatedItems = state.items.concat(updatedItem);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts,
    };
  } else if (action.type === "REMOVE") {
    const findIndexItem = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    let updatedItem;
    let updatedItems;
    const isIndexItem = state.items[findIndexItem];
    const updatedTotalAmounts = state.totalAmount - isIndexItem.price;
    if (isIndexItem.amount > 1) {
      updatedItem = {
        ...isIndexItem,
        amount: isIndexItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[findIndexItem] = updatedItem;
    } else {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts,
    };
  } else if (action.type === "CLEAR") {
    return initialState;
  }
  return initialState;
};

function CartContextProvider(props) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const addItemHandler = function (item) {
    dispatch({
      type: "ADD",
      item: item,
    });
  };
  const removeItemHandler = function (id) {
    dispatch({
      type: "REMOVE",
      id: id,
    });
  };

  const clearItemHandler = function () {
    dispatch({
      type: "CLEAR",
    });
  };

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItem: clearItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
