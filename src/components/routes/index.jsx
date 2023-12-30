import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CommonLayout from "../commonLayout";
import Home from "../home";
import CompletedTasks from "../completedTasks";
import PendingTasks from "../pendingTasks";
import ImportantTasks from "../ImportantTasks";

const AllRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CommonLayout />}>
            <Route path="" element={<Home />} />
            <Route path="completed" element={<CompletedTasks />} />
            <Route path="pending" element={<PendingTasks />} />
            <Route path="important" element={<ImportantTasks />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default AllRoutes;
