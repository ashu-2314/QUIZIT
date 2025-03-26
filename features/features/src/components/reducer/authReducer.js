const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { 
          isAuthenticated: true, 
          user: action.payload // Stores full user data
        };
  
      case "LOGOUT":
        return { 
          isAuthenticated: false, 
          user: null 
        };
  
      case "UPDATE_USER":
        return { 
          ...state, 
          user: { ...state.user, ...action.payload } // Merge new updates into user data
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  