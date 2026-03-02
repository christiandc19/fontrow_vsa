import "./App.css";
import ChatBox from "./components/ChatBox/ChatBox";

import itanexConfig from "./chatbots/itanex/config";
// import fontrowConfig from "./chatbots/fontrow/config";

export default function App() {
  return (
    <div className="App">
      <ChatBox config={itanexConfig} />
    </div>
  );
}