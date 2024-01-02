
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initMercadoPago } from '@mercadopago/sdk-react'

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
initMercadoPago('TEST-5b73c8f1-45b2-4f15-9f22-15cf1f474642');
