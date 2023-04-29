import Member from "../pages/member/Member";
import Category from "../pages/category/Category";
import Dashboard from "../pages/dashboard/Dashboard";
import LabTest from "../pages/labTest/LabTest";
import LabTestAppoinment from "../pages/labTest/LabTestAppoinment";
import LabTestBook from "../pages/labTest/LabTestBook";

export const publicRoute = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/lab",
    element: <LabTest />,
  },
  {
    path: "/lab/:id",
    element: <LabTestBook />,
  },
  {
    path: "/lab/appoinment",
    element: <LabTestAppoinment />,
  },
  {
    path: "/member",
    element: <Member />,
  },
];
