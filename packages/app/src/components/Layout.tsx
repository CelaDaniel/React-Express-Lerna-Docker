import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Container,
	CssBaseline,
	Button,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { RoutePaths } from "../constants/RoutePaths";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
interface LayoutProps {
	children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
	appBar: {
		marginBottom: theme.spacing(4),
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
	},
	navContainer: {
		display: "flex",
		justifyContent: "center",
		flexGrow: 1,
		[theme.breakpoints.down("md")]: {
			display: "none",
		},
	},
	navLinks: {
		display: "flex",
		listStyle: "none",
		padding: 0,
		margin: 0,
	},
	navLinkItem: {
		margin: theme.spacing(1),
	},
	navLink: {
		textDecoration: "none",
		color: theme.palette.primary.contrastText,
	},
	menuButton: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	drawerList: {
		width: 250,
	},
	drawerHeader: {
		textAlign: "center",
		padding: "18px",
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
	drawerItem: {
		textAlign: "center",
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		borderTop: "2px solid #fff",
		"&:hover": {
			backgroundColor: theme.palette.secondary.dark,
		},
	},
	mainContent: {
		padding: theme.spacing(4),
	},
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const classes = useStyles();
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setDrawerOpen(open);
		};

	const drawer = (
		<Box
			className={classes.drawerList}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<Typography variant="h6" component="div" className={classes.drawerHeader}>
				Monster App
			</Typography>
			<List>
				<ListItem
					button
					component={Link}
					to={RoutePaths.CREATE}
					className={classes.drawerItem}
				>
					<ListItemText primary="Create Monster" />
				</ListItem>
				<ListItem
					button
					component={Link}
					to={RoutePaths.LIST}
					className={classes.drawerItem}
				>
					<ListItemText primary="List Monsters" />
				</ListItem>
				<ListItem
					button
					component={Link}
					to={RoutePaths.LIVE}
					className={classes.drawerItem}
				>
					<ListItemText primary="Live Monster" />
				</ListItem>
			</List>
		</Box>
	);

	return (
		<Box>
			<CssBaseline />
			<AppBar position="static" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" component="div">
						Monster App
					</Typography>
					<Box className={classes.navContainer}>
						<nav>
							<ul className={classes.navLinks}>
								<li className={classes.navLinkItem}>
									<Link to={RoutePaths.CREATE} className={classes.navLink}>
										<Button variant="contained" color="secondary">
											Create Monster
										</Button>
									</Link>
								</li>
								<li className={classes.navLinkItem}>
									<Link to={RoutePaths.LIST} className={classes.navLink}>
										<Button variant="contained" color="secondary">
											List Monsters
										</Button>
									</Link>
								</li>

								<li className={classes.navLinkItem}>
									<Link to={RoutePaths.LIVE} className={classes.navLink}>
										<Button variant="contained" color="secondary">
											Live Monster
										</Button>
									</Link>
								</li>
							</ul>
						</nav>
					</Box>

					<IconButton
						edge="end"
						color="inherit"
						aria-label="menu"
						className={classes.menuButton}
						onClick={toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
				{drawer}
			</Drawer>
			<Container className={classes.mainContent}>
				<main>{children}</main>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</Container>
		</Box>
	);
};

export default Layout;
