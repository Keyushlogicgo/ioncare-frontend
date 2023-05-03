import Member from "../pages/member/Member";
import Test from "../pages/test/Test";
import Dashboard from "../pages/dashboard/Dashboard";
import LabTest from "../pages/labTest/LabTest";
import LabTestAppoinment from "../pages/labTest/LabTestAppoinment";
import LabTestBook from "../pages/labTest/LabTestBook";
import Prescription from "../pages/prescription/Prescription";

export const publicRoute = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/Test",
    element: <Test />,
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
  {
    path: "/prescription",
    element: <Prescription />,
  },
];
