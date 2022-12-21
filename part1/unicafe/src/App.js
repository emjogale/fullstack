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
		<table>
			<tbody>
				<StatisticLine text="good" score={props.good} />
				<StatisticLine text="neutral" score={props.neutral} />
				<StatisticLine text="bad" score={props.bad} />
				<StatisticLine text="all" score={props.total} />
				<StatisticLine
					text="average"
					score={(props.good - props.bad) / props.total || 0}
				/>
				<StatisticLine
					text="positive"
					score={((props.good / props.total) * 100 || 0) + " %"}
				/>
			</tbody>
		</table>
	);
};

const StatisticLine = (props) => {
	return (
		<tr>
			<td>{props.text} </td>
			<td>{props.score}</td>
		</tr>
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
