import React, { useState } from 'react';
import { Greet } from '../services/wails';
import { ShieldCheck, Database, Zap, Cpu } from 'lucide-react';

export default function HomePage() {
  const [name, setName] = useState('');
  const [greetMsg, setGreetMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGreet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const response = await Greet(name);
      setGreetMsg(response);
    } catch (err) {
      console.error(err);
      setGreetMsg("Failed to call Go backend Greet method.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', flex: 1, overflowY: 'auto' }}>
      {/* Header section */}
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px', color: 'var(--text-primary)' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Welcome to Setu, your high-performance, local-first API workbench.
        </p>
      </header>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'var(--accent-glow)', color: 'var(--accent-color)' }}>
            <Database size={24} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>0</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Collections</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)' }}>
            <Zap size={24} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>0</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Request Logs</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Local</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Data ownership</div>
          </div>
        </div>
      </div>

      {/* Go Backend Verification Card */}
      <section className="glass-panel" style={{ padding: '32px', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Cpu size={20} style={{ color: 'var(--accent-color)' }} />
          Verify Go Backend Link
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>
          Test the connection between Wails frontend and Go backend. Enter your name below to invoke the Greet function bound from Go.
        </p>

        <form onSubmit={handleGreet} style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: 'var(--text-primary)',
              transition: 'var(--transition-all)'
            }}
          />
          <button
            type="submit"
            disabled={loading || !name.trim()}
            style={{
              backgroundColor: name.trim() ? 'var(--accent-color)' : 'var(--bg-tertiary)',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: name.trim() ? 'pointer' : 'not-allowed',
              transition: 'var(--transition-all)'
            }}
          >
            {loading ? 'Calling Go...' : 'Greet'}
          </button>
        </form>

        {greetMsg && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-secondary)',
            borderLeft: '4px solid var(--accent-color)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-primary)'
          }}>
            {greetMsg}
          </div>
        )}
      </section>
    </div>
  );
}
