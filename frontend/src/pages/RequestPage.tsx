import { useState } from 'react';
import { Send, Plus, Trash2, Code } from 'lucide-react';
import { SendRequest, RequestData } from '../services/wails';

interface KeyValuePair {
  key: string;
  value: string;
}

const getStatusText = (code: number): string => {
  const statusTexts: Record<number, string> = {
    200: 'OK', 201: 'Created', 202: 'Accepted', 204: 'No Content',
    301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified',
    400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 405: 'Method Not Allowed',
    500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable', 504: 'Gateway Timeout'
  };
  return statusTexts[code] || 'Response';
};

const buildUrl = (baseUrl: string, queryParams: KeyValuePair[]): string => {
  if (!baseUrl) return '';
  const activeParams = queryParams.filter(p => p.key.trim() !== '');
  if (activeParams.length === 0) return baseUrl;
  
  try {
    const urlObj = new URL(baseUrl);
    activeParams.forEach(p => {
      urlObj.searchParams.append(p.key, p.value);
    });
    return urlObj.toString();
  } catch (e) {
    const queryStr = activeParams.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&');
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${queryStr}`;
  }
};

const buildHeaders = (headerList: KeyValuePair[]): Record<string, string> => {
  const headersObj: Record<string, string> = {};
  headerList.forEach(h => {
    const trimmedKey = h.key.trim();
    if (trimmedKey !== '') {
      headersObj[trimmedKey] = h.value;
    }
  });
  return headersObj;
};

export default function RequestPage() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.github.com/repos/wailsapp/wails');
  const [headers, setHeaders] = useState<KeyValuePair[]>([{ key: '', value: '' }]);
  const [params, setParams] = useState<KeyValuePair[]>([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [bodyType, setBodyType] = useState('JSON');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body'>('params');

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const finalUrl = buildUrl(url, params);
      const reqHeaders = buildHeaders(headers);

      const requestPayload: RequestData = {
        id: Math.random().toString(36).substring(7),
        method,
        url: finalUrl,
        headers: reqHeaders,
        body,
        bodyType,
      };

      const res = await SendRequest(requestPayload);

      setResponse({
        status: res.statusCode,
        statusText: getStatusText(res.statusCode),
        time: `${res.durationMs} ms`,
        size: `${(res.size / 1024).toFixed(2)} KB`,
        body: res.body,
      });
    } catch (err: any) {
      setResponse({
        status: 0,
        statusText: 'Error',
        time: '0 ms',
        size: '0 KB',
        body: err?.message || 'Failed to execute request.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Top Request Bar */}
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{
            backgroundColor: 'var(--bg-secondary)',
            color: method === 'GET' ? 'var(--success)' : method === 'POST' ? 'var(--warning)' : 'var(--accent-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '10px 16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter request URL..."
          style={{
            flex: 1,
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '10px 16px',
            color: 'var(--text-primary)',
            fontSize: '14px'
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading || !url.trim()}
          style={{
            backgroundColor: url.trim() ? 'var(--accent-color)' : 'var(--bg-tertiary)',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: url.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'var(--transition-all)'
          }}
        >
          <Send size={16} />
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

      {/* Main Request Workspace Split */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Side: Request Configurator */}
        <div style={{ flex: 1, borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
          {/* Tab Selector */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            {(['params', 'headers', 'body'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 24px',
                  color: activeTab === tab ? 'var(--accent-color)' : 'var(--text-secondary)',
                  borderBottom: activeTab === tab ? '2px solid var(--accent-color)' : 'none',
                  fontWeight: activeTab === tab ? '600' : '400',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Configurator Panels */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {activeTab === 'params' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Query Parameters</span>
                  <button 
                    onClick={() => setParams([...params, { key: '', value: '' }])}
                    style={{ color: 'var(--accent-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}
                  >
                    <Plus size={14} /> Add Parameter
                  </button>
                </div>
                {params.map((param, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input 
                      placeholder="Key" 
                      value={param.key}
                      onChange={(e) => {
                        const newParams = [...params];
                        newParams[index].key = e.target.value;
                        setParams(newParams);
                      }}
                      style={{ flex: 1, border: '1px solid var(--border-color)', padding: '8px 12px', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} 
                    />
                    <input 
                      placeholder="Value" 
                      value={param.value}
                      onChange={(e) => {
                        const newParams = [...params];
                        newParams[index].value = e.target.value;
                        setParams(newParams);
                      }}
                      style={{ flex: 1, border: '1px solid var(--border-color)', padding: '8px 12px', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} 
                    />
                    <button 
                      onClick={() => {
                        const newParams = params.filter((_, i) => i !== index);
                        setParams(newParams.length ? newParams : [{ key: '', value: '' }]);
                      }}
                      style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'headers' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Headers</span>
                  <button 
                    onClick={() => setHeaders([...headers, { key: '', value: '' }])}
                    style={{ color: 'var(--accent-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}
                  >
                    <Plus size={14} /> Add Header
                  </button>
                </div>
                {headers.map((header, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input 
                      placeholder="Key" 
                      value={header.key}
                      onChange={(e) => {
                        const newHeaders = [...headers];
                        newHeaders[index].key = e.target.value;
                        setHeaders(newHeaders);
                      }}
                      style={{ flex: 1, border: '1px solid var(--border-color)', padding: '8px 12px', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} 
                    />
                    <input 
                      placeholder="Value" 
                      value={header.value}
                      onChange={(e) => {
                        const newHeaders = [...headers];
                        newHeaders[index].value = e.target.value;
                        setHeaders(newHeaders);
                      }}
                      style={{ flex: 1, border: '1px solid var(--border-color)', padding: '8px 12px', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} 
                    />
                    <button 
                      onClick={() => {
                        const newHeaders = headers.filter((_, i) => i !== index);
                        setHeaders(newHeaders.length ? newHeaders : [{ key: '', value: '' }]);
                      }}
                      style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'body' && (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Request Body</span>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="JSON">JSON</option>
                    <option value="Raw">Raw Text</option>
                    <option value="UrlEncoded">URL Encoded</option>
                  </select>
                </div>
                <textarea
                  placeholder={bodyType === 'JSON' ? "{\n  \"key\": \"value\"\n}" : "Enter request body..."}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  style={{
                    width: '100%',
                    flex: 1,
                    minHeight: '200px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '16px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    resize: 'none'
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Response Viewer */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-panel)' }}>
          {response ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Response Meta Header */}
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{
                    fontWeight: 'bold',
                    color: response.status >= 200 && response.status < 300 ? 'var(--success)' : 'var(--danger)',
                    fontSize: '15px'
                  }}>
                    STATUS: {response.status} {response.statusText}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>TIME: {response.time}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>SIZE: {response.size}</span>
                </div>
              </div>

              {/* Response Body Text */}
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                <pre style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all'
                }}>
                  {response.body}
                </pre>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              <Code size={40} style={{ marginBottom: '12px', opacity: 0.5 }} />
              <span>Send a request to see the response here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
