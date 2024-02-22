import { useState, useEffect } from "react";
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const BlogPage = ({ blogs }) => {
    const [comment, setComment] = useState('');
    
    const id = useParams().id;
    const blog = blogs.find((blog) => blog.id === id);
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const showWhenAuth = { display: user.username === blog.user.username ? "" : "none" };
    const dispatch = useDispatch();

    const removeBlog = (event) => {
        event.preventDefault();
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
          dispatch(deleteBlog(blog.id));
            navigate("/");
        }
      };

    const addLike = (event) => {
        event.preventDefault();
        const newLikes = blog.likes + 1;
        dispatch(likeBlog(blog.id, {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: newLikes,
        }));
    };

    const returnHome = (event) => {
        event.preventDefault();
        navigate("/");
    };

    const addComment = (event) => {
        event.preventDefault();
        dispatch(commentBlog(blog.id, comment));
        setComment("");
    };

    const commentForm = () => {
        return (
            <form onSubmit={addComment}>
                <input
                    type="text"
                    value={comment}
                    name="comment"
                    onChange={({ target }) => setComment(target.value)}
                />
                <button type="submit">add comment</button>
            </form>
        );
    }

    return (
        <div>
            <h1 className="text-left text-xl font-medium">{blog.title} {blog.author}</h1>
            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline"  href={blog.url}>{blog.url}</a><br></br>
            {blog.likes} likes {'  '}
            <button 
            className="inline-block shrink-0 rounded-md border border-gray-400 bg-gray-400 px-3 py-1 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-400 focus:outline-none focus:ring active:text-gray-300"
            onClick={addLike}>add like</button><br></br>
            <i>added by {blog.user.name}</i><br></br>
            
            <form className="mb-4 mt-4 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={addComment}>
            <h2 className="text-left text-lg font-medium">Comments</h2>
                 <ul className="list-disc px-4">
                    {blog.comments.map((comment) => (
                        <li key={comment}>{comment}</li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={comment}
                    name="comment"
                    onChange={({ target }) => setComment(target.value)}
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter comment here"
                />
                <button
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                type="submit">add comment</button>
            </form>
            
            <button 
            className="inline-block shrink-0 rounded-md border border-red-400 bg-red-400 px-3 py-1 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-400 focus:outline-none focus:ring active:text-red-300"
            style={showWhenAuth} onClick={removeBlog}>remove blog</button>
            <button 
            className="inline-block shrink-0 rounded-md border border-gray-400 bg-gray-400 px-3 py-1 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-400 focus:outline-none focus:ring active:text-gray-300"
            onClick={returnHome}>return to home</button>
        </div>
    );

};

export default BlogPage;

