import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Tabs, Button } from '@design-system';
import InnerLayout from '@app/views/layout/innerLayout';
import Profile from '../Tabs/Profile';
import { getStaff } from '@app/services/inner-layout/staff';
import styles from './staffDetails.module.scss';

const StaffDetails = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useQuery(['fetchStaff', id], () => getStaff({ teacher_id: id! }), {
    enabled: !!id,
  });

  const fullName = data ? `${data.first_name} ${data.last_name}` : '';


  const tabs = [
    { label: 'Profile', content: <Profile formData={data} /> },
  ];
  
  return (
    <InnerLayout isLoading={isLoading || isFetching} error={error} errorMessage={error?.message}>
      <h3>{fullName}</h3>
      <Tabs tabs={tabs} />
    </InnerLayout>
  );
};

export default StaffDetails;