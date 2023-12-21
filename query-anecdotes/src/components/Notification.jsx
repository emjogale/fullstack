import { useNotificationValue } from '../NotificationContext';
import { useNotificationDispatch } from '../NotificationContext';

const Notification = () => {
  const dispatch = useNotificationDispatch();
  const notification = useNotificationValue();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notification) return null;
  else {
    setTimeout(
      () =>
        dispatch({
          type: 'removeNotification',
        }),
      5000
    );
  }
  return <div style={style}>{notification}</div>;
};

export default Notification;
