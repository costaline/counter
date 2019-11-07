import {
  COUNTER_DEC,
  COUNTER_RND,
  COUNTER_INC,
  COUNTER_INC_DELAY
} from "./actionTypes";

export const inc = () => ({ type: COUNTER_INC });

export const dec = () => ({ type: COUNTER_DEC });

export const rnd = () => {
  return {
    type: COUNTER_RND,
    value: Math.floor(Math.random() * 10)
  };
};

export const incDelay = () => {
  return (dispatch) => {
    dispatch({ type: COUNTER_INC_DELAY });

    setTimeout(() => {
      dispatch(inc());
      dispatch({ type: COUNTER_INC_DELAY });
    }, 3000);
  };
};
