import StudentDetails from '@app/views/pages/inner-layout/Students/components/StudentDetails';
import StaffDetails from '@app/views/pages/inner-layout/Staff/components/StaffDetails';

interface SubRoute {
  path: string;
  element: React.ReactNode;
  isProtected: boolean;
}

export const subRoutes: SubRoute[] = [
  {
    path: '/students/:id',
    element: <StudentDetails />,
    isProtected: true,
  },
  {
    path: '/staff/:id',
    element: <StaffDetails />,
    isProtected: true,
  },
  // Add more sub-routes here as needed
];
