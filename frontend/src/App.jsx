import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import SearchBook from "./pages/SearchBook";
import SearchResults from "./pages/SearchResults";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import PayFine from "./pages/PayFine";
import Reports from "./pages/Reports";
import ActiveIssues from "./pages/ActiveIssues";
import OverdueReturns from "./pages/OverdueReturns";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import UserManagement from "./pages/UserManagement";
import AddMembership from "./pages/AddMembership";
import UpdateMembership from "./pages/UpdateMembership";
import Logout from "./pages/Logout";

function App() {

  const [users, setUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar user={user} />

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/user-home" element={<UserHome />} />

        <Route path="/search-book" element={<SearchBook />} />
        <Route path="/search-results" element={<SearchResults />} />

        <Route path="/issue-book" element={<IssueBook />} />
        <Route path="/return-book" element={<ReturnBook />} />
        <Route path="/pay-fine" element={<PayFine />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/active-issues" element={<ActiveIssues />} />
        <Route path="/overdue-returns" element={<OverdueReturns />} />

        <Route path="/add-book" element={<AddBook />} />
        <Route path="/update-book" element={<UpdateBook />} />

        <Route
          path="/user-management"
          element={<UserManagement users={users} setUsers={setUsers} />}
        />

        <Route
          path="/add-membership"
          element={<AddMembership users={users} setUsers={setUsers} />}
        />

        <Route
          path="/update-membership"
          element={<UpdateMembership users={users} setUsers={setUsers} />}
        />

        <Route path="/logout" element={<Logout />} />

      </Routes>
    </>
  );
}

export default App;