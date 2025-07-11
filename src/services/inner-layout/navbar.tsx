// import {
//   ArrowRightFromBracket,
//   PenToSquare,
// } from "../../design-system/assets/Icons/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faUsers,
  faCalendarCheck,
  // faFileAlt,
  // faMoneyBill,
  faCreditCard,
  // faCog,
  faUserGraduate,
  faBookOpen,
  faChalkboardTeacher,
  // faListAlt,
  // faChartLine,
  // faLock,
  // faNewspaper,
  // faSchool,
  // faFileInvoiceDollar,
  // faPercentage,
  // faCalculator,
  // faFilePdf,
  faUserCheck,
  faListOl,
  faUserEdit,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { EGYFlag, ENGFlag } from "../../design-system/assets/Icons/countries";
import type {
  INavLinks,
  IAccountBarLinks,
  ILangLinks,
} from "../../types/inner-layout/nav-links";

export const navLinks: (t: any) => INavLinks[] = (t) => [
  {
    label: t("innerLayout.navbar.dashboard"),
    icon: <FontAwesomeIcon icon={faDashboard} />,
    route: "/dashboard",
  },
  {
    label: t("innerLayout.navbar.centerManagement"),
    icon: <FontAwesomeIcon icon={faUsers} />,
    subLinks: [
      {
        label: t("innerLayout.navbar.students"),
        route: "/students",
        icon: <FontAwesomeIcon icon={faUserGraduate} />,
      },
      {
        label: t("innerLayout.navbar.classes"),
        route: "/classes",
        icon: <FontAwesomeIcon icon={faBookOpen} />,
      },
      {
        label: t("innerLayout.navbar.staff"),
        route: "/staff",
        icon: <FontAwesomeIcon icon={faChalkboardTeacher} />,
      },
    ],
  },
  {
    label: t("innerLayout.navbar.attendance"),
    icon: <FontAwesomeIcon icon={faCalendarCheck} />,
    subLinks: [
      {
        label: t("innerLayout.navbar.studentAttendance"),
        route: "/student-attendance",
        icon: <FontAwesomeIcon icon={faUserCheck} />,
      },
    ],
  },
  // {
  //   label: t("innerLayout.navbar.parentCommunication"),
  //   icon: <FontAwesomeIcon icon={faFileAlt} />,
  //   subLinks: [
  //     {
  //       label: t("innerLayout.navbar.activities"),
  //       route: "/activities",
  //       icon: <FontAwesomeIcon icon={faListAlt} />,
  //     },
  //     {
  //       label: t("innerLayout.navbar.dailyReports"),
  //       route: "/daily-reports",
  //       icon: <FontAwesomeIcon icon={faChartLine} />,
  //     },
  //   ],
  // },
  // {
  //   label: t("innerLayout.navbar.billing"),
  //   icon: <FontAwesomeIcon icon={faMoneyBill} />,
  //   subLinks: [
  //     {
  //       label: t("innerLayout.navbar.studentPayment"),
  //       route: "/student-payment",
  //       icon: <FontAwesomeIcon icon={faMoneyBill} />,
  //     },
  //     {
  //       label: t("innerLayout.navbar.invoice"),
  //       route: "/invoice",
  //       icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
  //     },
  //   ],
  // },
  {
    label: t("innerLayout.navbar.paymentPlan"),
    icon: <FontAwesomeIcon icon={faCreditCard} />,
    subLinks: [
      {
        label: t("innerLayout.navbar.plans"),
        route: "/plans",
        icon: <FontAwesomeIcon icon={faListOl} />,
      },
      // {
      //   label: t("innerLayout.navbar.discount"),
      //   route: "/discount",
      //   icon: <FontAwesomeIcon icon={faPercentage} />,
      // },
      // {
      //   label: t("innerLayout.navbar.taxRate"),
      //   route: "/tax-rate",
      //   icon: <FontAwesomeIcon icon={faCalculator} />,
      // },
      // {
      //   label: t("innerLayout.navbar.invoicePdf"),
      //   route: "/invoice-pdf",
      //   icon: <FontAwesomeIcon icon={faFilePdf} />,
      // },
    ],
  },
  // {
  //   label: t("innerLayout.navbar.settings"),
  //   icon: <FontAwesomeIcon icon={faCog} />,
  //   subLinks: [
  //     {
  //       label: t("innerLayout.navbar.accessControl"),
  //       route: "/access-control",
  //       icon: <FontAwesomeIcon icon={faLock} />,
  //     },
  //     {
  //       label: t("innerLayout.navbar.activityPosts"),
  //       route: "/activity-posts",
  //       icon: <FontAwesomeIcon icon={faNewspaper} />,
  //     },
  //     {
  //       label: t("innerLayout.navbar.schoolDetails"),
  //       route: "/school-details",
  //       icon: <FontAwesomeIcon icon={faSchool} />,
  //     },
  //   ],
  // },
];

export const accountBarLinks: (t: any) => IAccountBarLinks[] = (t) => [
  {
    label: t("innerLayout.navbar.editProfile"),
    icon: <FontAwesomeIcon icon={faUserEdit} />,
    action: "edit-profile",
  },
  {
    label: t("innerLayout.navbar.logout"),
    icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    action: "logout",
  },
];

export const langLinks: (t: any) => ILangLinks[] = (t) => [
  {
    label: t("innerLayout.navbar.arabic"),
    icon: EGYFlag,
    lang: "ar",
  },
  {
    label: t("innerLayout.navbar.english"),
    icon: ENGFlag,
    lang: "en",
  },
];