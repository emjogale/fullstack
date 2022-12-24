const Curriculum = ({ curriculum }) => {
	return <h1>{curriculum}</h1>;
};
const Course = ({ courses }) => {
	console.log(courses);

	return (
		<div>
			{courses.map((course) => (
				<div>
					<Header key={course.id} course={course.name} />
					<Content key={course.parts.id} parts={course.parts} />
					<Total parts={course.parts} />
				</div>
			))}
		</div>
	);
};

const Header = ({ course }) => <h2>{course}</h2>;

const Content = ({ parts }) => (
	<div>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
	</div>
);

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Total = ({ parts }) => (
	<h3>
		total of {parts.reduce((sum, part) => (sum += part.exercises), 0)} exercises
	</h3>
);

const App = () => {
	const curriculum = "Web development curriculum";
	const courses = [
		{
			id: 1,
			name: "Half Stack application development",

			parts: [
				{
					name: "Fundamentals of React",
					exercises: 10,
					id: 1,
				},
				{
					name: "Using props to pass data",
					exercises: 7,
					id: 2,
				},
				{
					name: "State of a component",
					exercises: 14,
					id: 3,
				},
				{
					name: "Redux",
					exercises: 11,
					id: 4,
				},
			],
		},
		{
			id: 2,
			name: "Node.js",

			parts: [
				{
					name: "Routing",
					exercises: 3,
					id: 1,
				},
				{
					name: "Middlewares",
					exercises: 7,
					id: 2,
				},
			],
		},
	];
	return (
		<div>
			<Curriculum curriculum={curriculum} />
			<Course courses={courses} />
		</div>
	);
};

export default App;

// TODO: refactor to loop through courses
