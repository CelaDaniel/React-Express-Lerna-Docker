import React from "react";
import { useRoutes } from "react-router-dom";
import { CreateMonster, ListMonsters, LiveMonster, NotFound } from "./pages";
import Layout from "./components/Layout";
import { RoutePaths } from "./constants/RoutePaths";

const App: React.FC = () => {
	const routes = useRoutes([
		{
			path: RoutePaths.CREATE,
			element: (
				<Layout>
					<CreateMonster />
				</Layout>
			),
		},
		{
			path: RoutePaths.LIST,
			element: (
				<Layout>
					<ListMonsters />
				</Layout>
			),
		},
		{
			path: RoutePaths.LIVE,
			element: (
				<Layout>
					<LiveMonster />
				</Layout>
			),
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);

	return routes;
};

export default App;
