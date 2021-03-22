import { types } from "../contactsTypes";

export const authReducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case types.logged:
      return {
        logged: action.payload,
      };

    default:
      return state;
  }
};
