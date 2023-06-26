import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newObject, config);
	console.log("response data after posting is", response.data);
	return response.data;
};

// check this is correctly changed to an async function
const update = async (id, newObject) => {
	console.log("the newObject in the update is", newObject);
	const response = await axios.put(`${baseUrl}/${id}`, newObject);
	console.log("the updated likes blog is now ", response.data);
	return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken };
