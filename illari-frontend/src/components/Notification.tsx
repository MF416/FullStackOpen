import React from 'react';

export interface NotificationProps {
    error: string | null;
}

const Notification: React.FC<NotificationProps> = ({ error }) => {
    if (error === null) {
      return null
    }
    return (
      <div className="error" style={{ color: 'red' }}>
        {error}
      </div>
    )
}

export default Notification;