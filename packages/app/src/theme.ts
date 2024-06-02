import { indigo, red } from "@mui/material/colors";
import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
	palette: {
		primary: red,
		secondary: indigo,
	},
};

const theme = createTheme(themeOptions);

export default theme;
