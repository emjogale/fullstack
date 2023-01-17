const Weather = ({ country, weather }) => {
	return (
		<div>
			{weather.main ? (
				<p>temperature {Math.round(weather.main.temp)} Celsius</p>
			) : null}

			<div className="weather-icon">
				<img
					src={`http://openweathermap.org/img/wn/${
						weather.weather ? weather.weather[0].icon : null
					}@2x.png`}
					alt=""
				/>
			</div>

			{weather.wind ? <p>wind {weather.wind.speed} m/s</p> : null}
		</div>
	);
};

export default Weather;
