import "./App.css";
import { BrowserRouter } from "react-router-dom";

import ChatBox from "./components/ChatBox/ChatBox.jsx";
import webSmartAssistant from "./chatbots/clients/wsa.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ChatBox config={webSmartAssistant} />
      </div>
    </BrowserRouter>
  );
}

export default App;