import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector(state => state.notification.message);
  const type = useSelector(state => state.notification.type);
  if (message === null) {
    return null;
  }

  if (type === 'notification') {
    return <div className="notification">{message}</div>;
  } else if (type === 'error') {
    return <div className="error">{message}</div>;
  } else {
    return null;
  }
};

export default Notification;
