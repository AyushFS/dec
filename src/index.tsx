import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { withLDProvider } from 'launchdarkly-react-client-sdk';
import ENVIRONMENT from './environments/environment';
import { GlobalStateProvider } from './features/GlobalState/GlobalStateProvider';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();
const LDProvider = ENVIRONMENT.ldClientID
	? withLDProvider({
			clientSideID: ENVIRONMENT.ldClientID,
	  })(App)
	: App;

root.render(
	// <React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<GlobalStateProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/*" element={<LDProvider />} />
				</Routes>
			</BrowserRouter>
		</GlobalStateProvider>
	</QueryClientProvider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
