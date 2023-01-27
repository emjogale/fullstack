const Notification = ({ message, status }) => {
	if (message) {
		return <div className={status}>{message}</div>;
	}
	return null;
};

export default Notification;
