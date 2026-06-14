import { useState } from 'react';
import HomePage from './pages/HomePage';
import RequestPage from './pages/RequestPage';
import SettingsPage from './pages/SettingsPage';
import { Home, Send, Settings, HelpCircle } from 'lucide-react';

type Page = 'home' | 'request' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'request':
        return <RequestPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
      {/* Premium Sidebar */}
      <aside style={{
        width: '240px',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 12px'
      }}>
        <div>
          {/* Logo Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', padding: '0 8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--accent-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#ffffff'
            }}>
              S
            </div>
            <span style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'var(--font-heading)', letterSpacing: '0.5px' }}>
              Setu API
            </span>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => setCurrentPage('home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: currentPage === 'home' ? 'var(--accent-glow)' : 'transparent',
                color: currentPage === 'home' ? 'var(--accent-color)' : 'var(--text-secondary)',
                fontWeight: currentPage === 'home' ? '600' : '400',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'var(--transition-all)'
              }}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentPage('request')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: currentPage === 'request' ? 'var(--accent-glow)' : 'transparent',
                color: currentPage === 'request' ? 'var(--accent-color)' : 'var(--text-secondary)',
                fontWeight: currentPage === 'request' ? '600' : '400',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'var(--transition-all)'
              }}
            >
              <Send size={18} />
              <span>HTTP Client</span>
            </button>

            <button
              onClick={() => setCurrentPage('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: currentPage === 'settings' ? 'var(--accent-glow)' : 'transparent',
                color: currentPage === 'settings' ? 'var(--accent-color)' : 'var(--text-secondary)',
                fontWeight: currentPage === 'settings' ? '600' : '400',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'var(--transition-all)'
              }}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer info */}
        <div>
          <div style={{
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-tertiary)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <HelpCircle size={14} />
            <span>Local-First V1.0.0</span>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main style={{ flex: 1, height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </main>
    </div>
  );
}
