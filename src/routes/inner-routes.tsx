import Dashboard from "@app/views/pages/inner-layout/Dashboard";
import Students from "@app/views/pages/inner-layout/Students";
import Classes from "@app/views/pages/inner-layout/Classes";
import Staff from "@app/views/pages/inner-layout/Staff";
import StudentAttendance from "@app/views/pages/inner-layout/StudentAttendance";
import Activities from "@app/views/pages/inner-layout/Activities";
import DailyReports from "@app/views/pages/inner-layout/DailyReports";
import StudentPayment from "@app/views/pages/inner-layout/StudentPayment";
import Invoice from "@app/views/pages/inner-layout/Invoice";
import Plans from "@app/views/pages/inner-layout/Plans";
import Discount from "@app/views/pages/inner-layout/Discount";
import TaxRate from "@app/views/pages/inner-layout/TaxRate";
import InvoicePdf from "@app/views/pages/inner-layout/InvoicePdf";
import AccessControl from "@app/views/pages/inner-layout/AccessControl";
import ActivityPosts from "@app/views/pages/inner-layout/ActivityPosts";
import SchoolDetails from "@app/views/pages/inner-layout/SchoolDetails";

export const INNER_ROUTES = {
  DASHBOARD: "/dashboard",
  STUDENTS: "/students",
  CLASSES: "/classes",
  STAFF: "/staff",
  STUDENT_ATTENDANCE: "/student-attendance",
  ACTIVITIES: "/activities",
  DAILY_REPORTS: "/daily-reports",
  STUDENT_PAYMENT: "/student-payment",
  INVOICE: "/invoice",
  PLANS: "/plans",
  DISCOUNT: "/discount",
  TAX_RATE: "/tax-rate",
  INVOICE_PDF: "/invoice-pdf",
  ACCESS_CONTROL: "/access-control",
  ACTIVITY_POSTS: "/activity-posts",
  SCHOOL_DETAILS: "/school-details",
};

export const innerLayoutRoutes = [
  { name: "dashboard", path: INNER_ROUTES.DASHBOARD, element: <Dashboard /> },
  { name: "students", path: INNER_ROUTES.STUDENTS, element: <Students /> },
  { name: "classes", path: INNER_ROUTES.CLASSES, element: <Classes /> },
  { name: "staff", path: INNER_ROUTES.STAFF, element: <Staff /> },
  { name: "student-attendance", path: INNER_ROUTES.STUDENT_ATTENDANCE, element: <StudentAttendance /> },
  { name: "activities", path: INNER_ROUTES.ACTIVITIES, element: <Activities /> },
  { name: "daily-reports", path: INNER_ROUTES.DAILY_REPORTS, element: <DailyReports /> },
  { name: "student-payment", path: INNER_ROUTES.STUDENT_PAYMENT, element: <StudentPayment /> },
  { name: "invoice", path: INNER_ROUTES.INVOICE, element: <Invoice /> },
  { name: "plans", path: INNER_ROUTES.PLANS, element: <Plans /> },
  { name: "discount", path: INNER_ROUTES.DISCOUNT, element: <Discount /> },
  { name: "tax-rate", path: INNER_ROUTES.TAX_RATE, element: <TaxRate /> },
  { name: "invoice-pdf", path: INNER_ROUTES.INVOICE_PDF, element: <InvoicePdf /> },
  { name: "access-control", path: INNER_ROUTES.ACCESS_CONTROL, element: <AccessControl /> },
  { name: "activity-posts", path: INNER_ROUTES.ACTIVITY_POSTS, element: <ActivityPosts /> },
  { name: "school-details", path: INNER_ROUTES.SCHOOL_DETAILS, element: <SchoolDetails /> },
];
