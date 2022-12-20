import { useState } from "react";

const setToValue = (func, newValue) => () => func(newValue);

const Heading = ({ text }) => {
	return <h2>{text}</h2>;
};

const Button = (props) => {
	return (
		<button onClick={setToValue(props.handleClick, props.value + 1)}>
			{" "}
			{props.text}
		</button>
	);
};

const Statistic = (props) => {
	return (
		<div>
			{props.text} {props.score}
		</div>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const total = good + neutral + bad;
	console.log(total);

	return (
		<div>
			<Heading text="give feedback" />

			<Button text="good" handleClick={setGood} value={good} />
			<Button text="neutral" handleClick={setNeutral} value={neutral} />
			<Button text="bad" handleClick={setBad} value={bad} />

			<Heading text="statistics" />

			<Statistic text="good" score={good} />
			<Statistic text="neutral" score={neutral} />
			<Statistic text="bad" score={bad} />
			<Statistic text="all" score={total} />
			<Statistic text="average" score={(good - bad) / total || 0} />
			<Statistic text="positive" score={(good / total) * 100} />
		</div>
	);
};

export default App;
