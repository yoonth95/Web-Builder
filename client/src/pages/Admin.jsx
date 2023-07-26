import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import AdminHeader from 'components/Admin/AdminHeader';
import Management from 'components/Management/Management';
import Pagement from 'components/Pagement/Pagement';

const Admin = ({ setIsOpen, isLoading, setIsLoading }) => {
  const query = new URLSearchParams(useLocation().search);
  const tab = query.get('tab');

  console.log(isLoading);
  // if (isLoading) return null;

  return (
    <div className='admin'>
      <AdminHeader />
      {tab === 'a' ? <Management setIsOpen={setIsOpen} setIsLoading={setIsLoading} isLoading={isLoading} /> : <Pagement setIsOpen={setIsOpen} setIsLoading={setIsLoading} isLoading={isLoading} />}
    </div>
  );
};

export default Admin;
