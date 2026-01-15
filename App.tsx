
import React, { useState } from 'react';
import { TabType } from './types';
import Dashboard from './components/Dashboard';
import Operators from './components/Operators';
import Units from './components/Units';
import Assign from './components/Assign';
import Settings from './components/Settings';
import Concessions from './components/Concessions';
import Permits from './components/Permits';
import VehicleReview from './components/VehicleReview';
import Routes from './components/Routes';
import Certifications from './components/Certifications';
import Companies from './components/Companies';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');

  const renderContent = () => {
    switch (currentTab) {
      case 'inicio':
        return <Dashboard />;
      case 'concesiones':
        return <Concessions />;
      case 'permisos':
        return <Permits />;
      case 'revista':
        return <VehicleReview />;
      case 'rutas':
        return <Routes />;
      case 'personal':
        return <Operators />;
      case 'certificaciones':
        return <Certifications />;
      case 'unidades':
        return <Units />;
      case 'empresas':
        return <Companies />;
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
