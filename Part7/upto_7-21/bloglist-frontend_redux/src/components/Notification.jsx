import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector(state => state.notification.message);
  const type = useSelector(state => state.notification.type);
  if (message === null) {
    return null;
  }

  if (type === 'notification') {
    return (
      <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
        <strong className="block font-medium text-green-800"> {message} </strong>
      </div>
    )
  } else if (type === 'error') {
    return (<div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
      <strong className="block font-medium text-red-800"> {message} </strong>
    </div>)
  } else {
    return null;
  }
};

export default Notification;
