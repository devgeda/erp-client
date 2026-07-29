import { useState } from 'react';
import {
  type SelectTabData,
  type SelectTabEvent,
  Tab,
  TabList,
} from '@fluentui/react-components';

export const PageNavigation = () => {
  // 1. Manage state for the active page/tab
  const [activePage, setActivePage] = useState<string>('home');

  // 2. Handle tab selection updates
  const handleTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    setActivePage(data.value as string);
  };

  return (
    <div>
      {/* 3. Render the Navigation Bar */}
      <TabList selectedValue={activePage} onTabSelect={handleTabSelect}>
        <Tab value="home">Home</Tab>
        <Tab value="dashboard">Dashboard</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>

      {/* 4. Conditionally Render Page Content */}
      <div style={{ padding: '20px' }}>
        {activePage === 'home' && <div>Welcome to the Home Page</div>}
        {activePage === 'dashboard' && <div>View your Data Analytics</div>}
        {activePage === 'settings' && <div>Manage your Preferences</div>}
      </div>
    </div>
  );
};
