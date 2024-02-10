import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import blogs from '../services/blogs';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        addBlog(state, action) {
            return [...state, action.payload];
        },
    }
});

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        blogs.sort((a, b) => b.likes - a.likes);
        dispatch(setBlogs(blogs));
    }

};

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog);
        dispatch(addBlog(newBlog));
    }
};

export const likeBlog = (blogID, blogObject) => {
    return async (dispatch, getState) => {
        const updatedBlog = await blogService.update(blogID, blogObject);
        const blogs = getState().blogs;
        dispatch(setBlogs(
            blogs
                .map((blog) => (blog.id !== blogID ? blog : updatedBlog))
                .sort((a, b) => b.likes - a.likes),
        ));
    }
};

export const deleteBlog = (blogID) => {
    return async (dispatch, getState) => {
        await blogService.remove(blogID);
        const blogs = getState().blogs;
        dispatch(setBlogs(blogs.filter((blog) => blog.id !== blogID)));
    }
}

export const { setBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer;