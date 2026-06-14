import { useState } from 'react';
import { Save, Sliders, Shield, HardDrive } from 'lucide-react';

export default function SettingsPage() {
  const [timeout, setTimeoutVal] = useState('30');
  const [historyLimit, setHistoryLimit] = useState('100');
  const [autoFormat, setAutoFormat] = useState(true);

  return (
    <div style={{ padding: '40px', flex: 1, overflowY: 'auto' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Configure global client preferences.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
        {/* Request settings */}
        <section className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders size={18} style={{ color: 'var(--accent-color)' }} />
            Request Configuration
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                Request Timeout (Seconds)
              </label>
              <input
                type="number"
                value={timeout}
                onChange={(e) => setTimeoutVal(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
              <div>
                <div style={{ fontWeight: '500' }}>Auto format JSON</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Automatically pretty-print JSON response bodies.</div>
              </div>
              <input
                type="checkbox"
                checked={autoFormat}
                onChange={(e) => setAutoFormat(e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  accentColor: 'var(--accent-color)',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
        </section>

        {/* History settings */}
        <section className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HardDrive size={18} style={{ color: 'var(--accent-color)' }} />
            History Management
          </h2>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Max Request History Limit
            </label>
            <input
              type="number"
              value={historyLimit}
              onChange={(e) => setHistoryLimit(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '10px 14px',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </section>

        {/* Security & Privacy */}
        <section className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={18} style={{ color: 'var(--accent-color)' }} />
            Privacy & Storage
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
            Setu operates entirely locally. No telemetry, cloud sync, or remote data sharing is configured. All collections, histories, and environments are stored strictly in your local user directory.
          </p>
        </section>

        <button
          style={{
            alignSelf: 'flex-start',
            backgroundColor: 'var(--accent-color)',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'var(--transition-all)'
          }}
        >
          <Save size={16} />
          Save Configurations
        </button>
      </div>
    </div>
  );
}
