import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { TabsGroup } from '../../../../../../design-system/components/Tabs/TabsGroup';
import InnerLayout from '../../../../../../views/layout/InnerLayout';
import Profile from '../Tabs/Profile';
import { getStaff } from '../../../../../../services/inner-layout/staff';
import { Breadcrumbs } from '../../../../../../design-system';

const StaffDetails = () => {
  const { t } = useTranslation();
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

  const tabsProps = [
    { tabLabel: 'Profile', active: true },
  ];
  
  return (
    <InnerLayout isLoading={isLoading || isFetching} error={!!error} errorMessage={(error as Error)?.message}>
      <Breadcrumbs items={[
        { label: t("innerLayout.staff.title"), path: '/staff' },
        { label: fullName },
      ]} />
      
      <TabsGroup 
        type="line"
        orientation="horizontal"
        tabsProps={tabsProps}
      />
      
      <div style={{ marginTop: '20px' }}>
        <Profile formData={data} />
      </div>
    </InnerLayout>
  );
};

export default StaffDetails;