import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				minHeight: "100vh",
				backgroundColor: "#f6f6f6",
			}}
		>
			<Typography variant="h1">404</Typography>
			<Typography mb={4} variant="h6">
				Not Found
			</Typography>
			<Button
				variant="contained"
				onClick={() => {
					navigate("/");
				}}
				style={{ maxWidth: "200px" }}
			>
				Go Back
			</Button>
		</Box>
	);
};

export default NotFound;
