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
        <div className="overflow-x-auto">
            <h1 className="text-left text-xl font-medium">User Overview</h1>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Users</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">blogs created</th>
                </tr>
                </thead>
                    <tbody className="divide-y divide-gray-200">
                    {users.map(user => (
                        <tr key={user.name}>
                        <td className="text-center font-medium text-blue-600 dark:text-blue-500 hover:underline px-4 py-2">
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                        </td>
                        <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">{user.blogs.length}</td>
                        </tr>
                    ))}
                    </tbody>
                
            </table>
        </div>
    )
}


export default Users;