import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { AppBar as AppBarComp } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	alignItems: "flex-start",
	paddingTop: theme.spacing(1),
	paddingBottom: theme.spacing(2),
	"@media all": {
		minHeight: 128,
	},
}));

interface AppBarProps {
	children: ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({ children }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBarComp position="static">
				<StyledToolbar>
					<Typography
						variant="h5"
						noWrap
						component="div"
						sx={{ flexGrow: 1, alignSelf: "flex-end" }}
					>
						{children}
					</Typography>
				</StyledToolbar>
			</AppBarComp>
		</Box>
	);
};

export default AppBar;
