import { useNotificationValue } from '../reducers/NotificationContext';

const Notification = () => {
  const notification = useNotificationValue();
  if (notification.message === null) {
    return null;
  }

  if (notification.type === 'notification') {
    return <div className="notification">{notification.message}</div>;
  } else if (notification.type === 'error') {
    return <div className="error">{notification.message}</div>;
  } else {
    return null;
  }
};

export default Notification;
