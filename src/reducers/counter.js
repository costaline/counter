import {
  COUNTER_DEC,
  COUNTER_RND,
  COUNTER_INC,
  COUNTER_INC_DELAY
} from "~src/actions/actionTypes";

const initialState = {
  count: 0,
  delay: false
};

const counter = (state = initialState, { type, value }) => {
  switch (type) {
    case COUNTER_DEC:
      return {
        ...state,
        count: state.count - 1
      };

    case COUNTER_RND:
      return {
        ...state,
        count: state.count + value
      };

    case COUNTER_INC:
      return {
        ...state,
        count: state.count + 1
      };

    case COUNTER_INC_DELAY:
      return {
        ...state,
        delay: !state.delay
      };

    default:
      return state;
  }
};

export default counter;
