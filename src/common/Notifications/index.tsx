import React from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';

const NotificationsComponent: React.FC = () => {
  const notifications = useSelector(state => state['notifications']);
  const dispatch = useDispatch();
  return (
    <ul className="NotificationsComponent">
      {notifications.map((notification: any, index: number) => {
        return (
          <li
            key={`notification-${index}`}
            className={`${
              notification.type ? notification.type : 'brand'
            }-bg animated flipInX`}
            onClick={() =>
              dispatch({
                type: 'REMOVE_NOTIFICATION',
                payload: index
              })
            }
          >
            <span className="close-btn">X</span>
            {notification.text}
          </li>
        );
      })}
    </ul>
  );
};

export default NotificationsComponent;
