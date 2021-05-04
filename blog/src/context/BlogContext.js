import React, { useReducer } from "react";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "add_blogpost":
      return [...state, { title: `Blog post #${state.length + 1}` }];
    default:
      return state;
  }
};
const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
  //   const blogPosts = [{ title: "Blog post #1" }, { title: "Blog post #2" }];
  const [blogPosts, dispatch] = useReducer(blogReducer, []);

  const addBlogPost = () => {
    dispatch({ type: "add_blogpost" });
  };
  return (
    <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
