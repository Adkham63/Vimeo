import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import TutorialsPage from "./pages/TutorialsPage";
import TutorialDetail from "./pages/TutorialDetail"; // Import the new component
import { AccountPage } from "./pages/AccountPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import UpdatesPage from "./pages/UpdatesPage";
import UpdateDetailPage from "./pages/UpdateDetailPage";
import CreateUpdateForm from "./pages/CreateUpdateForm";
import ForumPage from "./pages/ForumPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailPage from "./pages/PostDetailPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/tutorials/:tutorialSlug" element={<TutorialDetail />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/updates/:id" element={<UpdateDetailPage />} />
          <Route path="/admin/create-update" element={<CreateUpdateForm />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/new" element={<CreatePostPage />} />
          <Route path="/forum/:id" element={<PostDetailPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
