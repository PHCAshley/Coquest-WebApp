import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Toolbar from "./components/Toolbar";
import LeftSideBar from "./components/LeftSideBar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Message } from "./pages/Message";
import { Notifications } from "./pages/Notifications";
import "./index.css";
import ItemGrid from "./pages/Inventory/ItemGrid";
import { Dashboard } from "./pages/Dashboard";
import WalletPage from "./pages/Wallet/WalletPage";

// Program flow Imports
import {
    BasicInformation,
    Budgeting,
    CreateProgram,
    Operations,
    Promotion,
} from "./pages/Programs/CreateProgram";
import FinishPage from "./pages/Programs/CreateProgram/FinishPage";

import {
    CreateCoop,
    CoopBasicInformation,
    CoopBudgeting,
    CoopOperations,
    CoopPromotion,
} from "./pages/Coop/CreateCoop";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
	},
	{
		path: "/home",
		element: (
			<div>
				<b>Home</b>
			</div>
		),
	},
	{
		path: "/programs/create",
		element: <CreateProgram />,
		children: [
			{
				path: "basic-information",
				element: <BasicInformation />,
			},
			{
				path: "operations",
				element: <Operations />,
			},
			{
				path: "budgeting",
				element: <Budgeting />,
			},
			{
				path: "promotion",
				element: <Promotion />,
			},
			{
				path: "finish",
				element: <FinishPage />,
			},
		],
	}, 
  {
        path: "/pages/Coop",
        element: <CreateCoop />,
        children: [
            {
                path: "basic-information",
                element: <CoopBasicInformation />,
            },
            {
                path: "operations",
                element: <CoopOperations />,
            },
            {
                path: "budgeting",
                element: <CoopBudgeting />,
            },
            {
                path: "promotion",
                element: <CoopPromotion />,
            },
        ],
    },
	{
		path: "/message",
		element: <Message />,
	},
	{
		path: "/notifications",
		element: <Notifications />,
	},
	{
		path: "/inventory",
		element: <ItemGrid />,
	},
	{
		path: "/wallet",
		element: <WalletPage />,
	},
]);

root.render(
	<div>
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<Toolbar />
				<LeftSideBar />
				<RouterProvider router={router} />
			</ThemeProvider>
		</React.StrictMode>
	</div>
);
