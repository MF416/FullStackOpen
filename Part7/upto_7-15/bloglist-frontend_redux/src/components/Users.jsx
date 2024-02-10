import { useDispatch, useSelector } from 'react-redux';
import { initializeUserList } from '../reducers/userListReducer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {

    const users = useSelector(state => state.userList);
    if (!users) {
        return null;
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeUserList());
    }, [dispatch]);

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                <tr>
                    <th>Users</th>
                    <th>blogs created</th>
                </tr>
                </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.name}>
                        <td>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                        </td>
                        <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                    </tbody>
                
            </table>
        </div>
    )
}


export default Users;