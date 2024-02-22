import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {

  return (
    <Link
      className="mt-0.5 text-md font-medium text-gray-900"
      to={`/blogs/${blog.id}`}
    >
      <article
        className="rounded-lg border border-gray-100 bg-white p-1 shadow-sm transition hover:shadow-lg hover:bg-gray-200 sm:p-2"
      >
        {blog.title}
        <div className="mt-3 flex flex-wrap gap-1">
          <span
            className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
          >
            {blog.author}
          </span>
        </div>
      </article>
    </Link>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
