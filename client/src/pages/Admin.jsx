import React from 'react';
import { useLocation } from 'react-router-dom';

import AdminHeader from 'components/Admin/AdminHeader';
import Management from 'components/Management/Management';
import Pagement from 'components/Pagement/Pagement';

const Admin = ({ setIsOpen }) => {
  const query = new URLSearchParams(useLocation().search);
  const tab = query.get('tab');

  return (
    <>
      <AdminHeader />
      {tab === 'a' ? <Management setIsOpen={setIsOpen} /> : <Pagement setIsOpen={setIsOpen} />}
    </>
  );
};

export default Admin;
