import { State } from "react-native-gesture-handler";
import { call } from "react-native-reanimated";
import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999()),
          title: action.playload.title,
          id: action.playload.content,
        },
      ];
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.playload);
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.playload.id ? action.playload : blogPost;
      });
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({
      type: "add_blogpost",
      playload: { title: title, content: content },
    });
    callback();
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => dispatch({ type: "delete_blogpost", playload: id });
};

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({
      type: "edit_blogpost",
      playload: { id, title, content },
    });
    callback();
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost,
    deleteBlogPost,
    editBlogPost,
  },
  [{ title: "Test Post", content: "Test Content", id: 1 }]
);
