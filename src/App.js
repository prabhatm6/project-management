import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ChatBox from "./components/ChatBox";
import ProjectInfoForm from "./components/ProjectInfoForm";
import AdminChat from "./components/AdminChat";
import ForgotPassword from './components/Forgotpass';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/new/project" exact component={ProjectInfoForm} />
        <Route path="/signin" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/chat" exact component={ChatBox} />
        <Route path="/admin-chat" exact component={AdminChat} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
      </BrowserRouter>
    </div>
  );
}

export default App;
