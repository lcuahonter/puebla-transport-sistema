
import React, { useState } from 'react';
import { TabType } from './types';
import Dashboard from './components/Dashboard';
import Operators from './components/Operators';
import Units from './components/Units';
import Assign from './components/Assign';
import Settings from './components/Settings';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');

  const renderContent = () => {
    switch (currentTab) {
      case 'inicio':
        return <Dashboard />;
      case 'personal':
        return <Operators />;
      case 'unidades':
        return <Units />;
      case 'asignar':
        return <Assign onBack={() => setCurrentTab('inicio')} />;
      case 'ajustes':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
