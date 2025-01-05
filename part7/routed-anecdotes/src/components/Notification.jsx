const Notification = ({ message }) => {
	if (message) {
		return <div>{message}</div>;
	}
	return null;
};

export default Notification;
