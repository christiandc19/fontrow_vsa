import "./App.css";
import ChatBox from "./components/ChatBox/ChatBox";

import fontrowConfig from "./chatbots/fontrow/config";
// import fontrowConfig from "./chatbots/fontrow/config";

export default function App() {
  return (
    <div className="App">
      <ChatBox config={fontrowConfig} />
    </div>
  );
}