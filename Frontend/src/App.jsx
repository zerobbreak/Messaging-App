import { Route, Routes } from "react-router-dom";
import Home from "./public/Home";
import "./globals.css";
import SignIn from "./private/SignInForm";
import SignUp from "./private/SignUpForm";
import SettingsPage from "./private/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DynamicForm from "./components/CreateForm";

function App() {
  return (
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        <Route element={<ProtectedRoute/>}>
          <Route index element={<Home/>}/>
          <Route path="/create-user" element={<DynamicForm type="user"/>}/>
          <Route path="/create-group" element={<DynamicForm type="group"/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
        </Route>
      </Routes>
  );
}

export default App;
