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

const Statistics = (props) => {
	if (!props.total) {
		return <div>No feedback given</div>;
	}
	return (
		<div>
			<Statistic text="good" score={props.good} />
			<Statistic text="neutral" score={props.neutral} />
			<Statistic text="bad" score={props.bad} />
			<Statistic text="all" score={props.total} />
			<Statistic
				text="average"
				score={(props.good - props.bad) / props.total || 0}
			/>
			<Statistic
				text="positive"
				score={(props.good / props.total) * 100 || 0}
			/>
		</div>
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
			<Statistics good={good} neutral={neutral} bad={bad} total={total} />
		</div>
	);
};

export default App;
