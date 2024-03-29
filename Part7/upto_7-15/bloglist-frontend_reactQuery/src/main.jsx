import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from "./reducers/NotificationContext";
import { UserContextProvider } from "./reducers/UserContext";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
