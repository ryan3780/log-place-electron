import ReactDOM from "react-dom/client";
import "./styles/app.css";
import App from "./App";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";


const client = new ApolloClient({
  uri: "https://3840-211-36-51-73.ngrok-free.app",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

declare global {
  interface Window {
    ipcRenderer: any;
  }
}

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

