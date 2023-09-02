import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkMode from "../hooks/UsDarkMode";

export default function DarkModeSwitcher() {
	const [colorTheme, setTheme] = useDarkMode();
	const [darkSide, setDarkMode] = useState(
		colorTheme === "light" ? true : false
	);

	const toggleDarkMode = (checked) => {
		setTheme(colorTheme);
		setDarkMode(checked);
	};

	return (
		<>
			<DarkModeSwitch
			
				checked={darkSide}
				onChange={toggleDarkMode}
				size={20}
			/>
		</>
	);
}
