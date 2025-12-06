import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ChatAssistant from './pages/ChatAssistant';
import WeatherAlerts from './pages/WeatherAlerts';
import GovernmentSchemes from './pages/GovernmentSchemes';
import FertilizersPesticides from './pages/FertilizersPesticides';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow">
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === 'chat' && <ChatAssistant />}
        {activeTab === 'weather' && <WeatherAlerts />}
        {activeTab === 'schemes' && <GovernmentSchemes />}
        {activeTab === 'fertilizers' && <FertilizersPesticides />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
