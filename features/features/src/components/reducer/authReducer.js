const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role, // Store role in state
      };
    case "UPDATE":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case "LOGOUT":
      return { isAuthenticated: false, user: null, role: null };
    default:
      return state;
  }
};

export default authReducer;
