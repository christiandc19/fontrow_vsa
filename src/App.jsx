import "./App.css";
import { BrowserRouter } from "react-router-dom";

import ChatBox from "./components/ChatBox/ChatBox.jsx";
// import webSmartAssistant from "./chatbots/clients/wsa.js";
// import evergreenHeights from "./chatbots/clients/evergreenHeights.js";
import robinRun from "./chatbots/clients/robinRun.js";
// import asburyHeights from "./chatbots/clients/asburyHeights.js";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <ChatBox config={webSmartAssistant} /> */}
        {/* <ChatBox config={evergreenHeights} /> */}
        <ChatBox config={robinRun} />
        {/* <ChatBox config={asburyHeights} /> */}

      </div>
    </BrowserRouter>
  );
}

export default App;