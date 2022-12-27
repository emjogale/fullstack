const Course = ({ courses }) => {
	return (
		<div>
			{courses.map((course) => (
				<div key={course.id}>
					<Header course={course.name} />
					<Content parts={course.parts} />
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
			<Part key={"part" + part.id} part={part} />
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

export default Course;
