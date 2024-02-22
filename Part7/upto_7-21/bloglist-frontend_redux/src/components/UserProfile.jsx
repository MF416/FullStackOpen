import { useParams } from 'react-router-dom';

const UserProfile = ({ users }) => {
    const id = useParams().id;
    const user = users.find(user => user.id === id);

    if (!user) {
        return null
    }

    return (
        <div>
            <h2 className="text-left text-xl font-medium">{user.name}</h2>
            <h3>Blogs added by this user:</h3>
            <ul className="list-disc px-4">
                {user.blogs.map(blog => (
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                ))}
            </ul>
            
        </div>
    )
}

export default UserProfile;