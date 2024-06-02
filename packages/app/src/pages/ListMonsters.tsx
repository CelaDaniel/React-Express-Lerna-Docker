/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";
import {
	Grid,
	TablePagination,
	Skeleton,
	Typography,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	IconButton,
	styled,
	Box,
	Modal,
	Button,
	TextField,
	MenuItem,
	Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";
import MonstersService from "../api/services/MonstersService";
import { Monster } from "../api/services/types/MonstersService.types";

const speciesOptions = ["Humanoid", "Reptile", "Beast"];
const subSpeciesOptions = ["Forest", "Mountain", "Fire"];

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	borderRadius: theme.shape.borderRadius + "px",
	background: `linear-gradient(to right bottom, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
	boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
	transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
	"&:hover": {
		transform: "translateY(-4px)",
		boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
	},
	margin: theme.spacing(2),
	maxWidth: 345,
	height: "auto",
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
	flexGrow: 1,
	"&.edit": {
		color: theme.palette.info.main,
	},
	"&.delete": {
		color: theme.palette.error.main,
	},
	"&:hover": {
		backgroundColor: theme.palette.action.hover,
	},
}));

const ListMonsters: React.FC = () => {
	const [monsters, setMonsters] = useState<Monster[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalCount, setTotalCount] = useState(0);
	const [editModalOpen, setEditModalOpen] = useState(false);

	const handleRemoveAllMonsters = () => {
		MonstersService.REMOVE_ALL_MONSTERS()
			.then(() => {
				setMonsters([]);
				console.info("All monsters removed successfully");
			})
			.catch((error) => {
				console.error("Failed to remove all monsters:", error);
			});
	};

	const CustomDeleteButton = styled(IconButton)(({ theme }) => ({
		position: "fixed",
		bottom: 20,
		right: 20,
		backgroundColor: theme.palette.error.main,
		color: theme.palette.common.white,
		"&:hover": {
			backgroundColor: theme.palette.error.dark,
		},
		width: 64,
		height: 64,
	}));

	const {
		handleSubmit: handleSubmitEdit,
		control: controlEdit,
		reset: resetEdit,
		formState: { errors: errorsEdit },
	} = useForm<Monster>({
		defaultValues: {
			name: "",
			level: 1,
			type: {
				species: "",
				subSpecies: "",
			},
		},
		mode: "onChange",
	});

	useEffect(() => {
		const fetchMonsters = () => {
			setLoading(true);
			MonstersService.GET_ALL_MONSTERS({ page: page + 1, limit: rowsPerPage })
				.then((response) => {
					setMonsters(response.monsters);
					setTotalCount(response.total);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Failed to fetch monsters:", error);
					setLoading(false);
				});
		};
		fetchMonsters();
	}, [page, rowsPerPage]);

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleEdit = (monster: Monster) => {
		resetEdit(monster);
		setEditModalOpen(true);
	};

	const handleUpdateMonster = (data: Monster) => {
		const updateData = {
			name: data.name,
			level: data.level,
			species: data.type.species,
			subSpecies: data.type.subSpecies, // Ensure this matches the API expected format
		};
		MonstersService.UPDATE_MONSTER({ request: updateData, id: data.id })
			.then((updatedMonster) => {
				setMonsters((prevMonsters) =>
					prevMonsters.map((m) =>
						m.id === updatedMonster.id ? updatedMonster : m,
					),
				);
				setEditModalOpen(false);
			})
			.catch((error) => console.error("Failed to update monster:", error));
	};

	const handleDelete = (id: string) => {
		MonstersService.REMOVE_MONSTER(id)
			.then(() => {
				setMonsters((prevMonsters) =>
					prevMonsters.filter((monster) => monster.id !== id),
				);
			})
			.catch((error) => console.error("Failed to delete monster:", error));
	};

	if (loading) {
		return (
			<Grid container justifyContent="center" spacing={4}>
				{Array.from(new Array(rowsPerPage)).map((_, index) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
						<Skeleton variant="rectangular" width={240} height={200} />
						<Skeleton variant="text" height={60} />
						<Skeleton variant="text" height={60} />
						<Skeleton variant="text" height={60} />
					</Grid>
				))}
			</Grid>
		);
	}

	return (
		<>
			<Grid container justifyContent="center" spacing={4}>
				{monsters.map((monster) => (
					<Grid item key={monster.id} xs={12} sm={6} md={4} lg={3}>
						<StyledCard>
							<CardMedia
								component="img"
								height="140"
								image={monster.imageUrl}
								alt={monster.name}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5">
									{monster.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Level: {monster.level}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Species: {monster.type.species}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Sub-Species: {monster.type.subSpecies}
								</Typography>
							</CardContent>
							<CardActions>
								<Box>
									<CustomIconButton
										aria-label="edit"
										className="edit"
										onClick={() => handleEdit(monster)}
									>
										<EditIcon />
									</CustomIconButton>
								</Box>
								<Box>
									<CustomIconButton
										aria-label="delete"
										className="delete"
										onClick={() => handleDelete(monster.id)}
									>
										<DeleteIcon />
									</CustomIconButton>
								</Box>
							</CardActions>
						</StyledCard>
					</Grid>
				))}
				<TablePagination
					component="div"
					count={totalCount}
					rowsPerPageOptions={[2, 5, 10, 20]}
					page={page}
					rowsPerPage={rowsPerPage}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Grid>

			<Tooltip title="Delete all monsters">
				<CustomDeleteButton>
					<CustomIconButton
						aria-label="delete all"
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							color: "white",
						}}
						onClick={handleRemoveAllMonsters}
					>
						<DeleteIcon />
					</CustomIconButton>
				</CustomDeleteButton>
			</Tooltip>

			<Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
						borderRadius: 1,
					}}
				>
					<form onSubmit={handleSubmitEdit(handleUpdateMonster)}>
						<Typography variant="h6" gutterBottom>
							Edit Monster
						</Typography>
						<Controller
							name="name"
							control={controlEdit}
							rules={{ required: "Name is required" }}
							render={({ field }) => (
								<TextField
									{...field}
									label="Name"
									variant="outlined"
									fullWidth
									margin="normal"
									error={!!errorsEdit.name}
									helperText={errorsEdit.name?.message}
								/>
							)}
						/>
						<Controller
							name="type.species"
							control={controlEdit}
							rules={{ required: "Species is required" }}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Species"
									variant="outlined"
									fullWidth
									margin="normal"
									error={!!errorsEdit.type?.species}
									helperText={errorsEdit.type?.species?.message}
								>
									{speciesOptions.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
						<Controller
							name="type.subSpecies"
							control={controlEdit}
							rules={{ required: "Sub-Species is required" }}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Sub-Species"
									variant="outlined"
									fullWidth
									margin="normal"
									error={!!errorsEdit.type?.subSpecies}
									helperText={errorsEdit.type?.subSpecies?.message}
								>
									{subSpeciesOptions.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
						<Controller
							name="level"
							control={controlEdit}
							rules={{ required: "Level is required", min: 1, max: 100 }}
							render={({ field }) => (
								<TextField
									{...field}
									label="Level"
									type="number"
									variant="outlined"
									fullWidth
									margin="normal"
									error={!!errorsEdit.level}
									helperText={errorsEdit.level?.message || ""}
									onChange={(e) => {
										const value = parseInt(e.target.value, 10);
										if (value < 1) {
											field.onChange(1);
										} else if (value > 100) {
											field.onChange(100);
										} else {
											field.onChange(value);
										}
									}}
								/>
							)}
						/>
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							fullWidth
							sx={{ mt: 2 }}
						>
							Update
						</Button>
					</form>
				</Box>
			</Modal>
		</>
	);
};

export default ListMonsters;
