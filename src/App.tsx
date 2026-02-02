import { useState, useEffect } from 'react';
import { Copy, Check, Clock, User, Hash, MessageSquare, Calendar } from 'lucide-react';

function App() {
  const [whoType, setWhoType] = useState<'me' | 'channel' | 'user'>('me');
  const [target, setTarget] = useState('');
  const [what, setWhat] = useState('');
  const [whenType, setWhenType] = useState<'specific' | 'relative'>('specific');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [relativeTime, setRelativeTime] = useState('');
  const [command, setCommand] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let whoPart = '';
    if (whoType === 'me') {
      whoPart = 'me';
    } else if (whoType === 'channel') {
      whoPart = target.startsWith('#') ? target : `#${target}`;
    } else {
      whoPart = target.startsWith('@') ? target : `@${target}`;
    }

    let whenPart = '';
    if (whenType === 'specific') {
      if (date && time) {
        // Format: YYYY-MM-DD at HH:MM
        whenPart = `at ${time} on ${date}`;
      } else if (time && !date) {
         whenPart = `at ${time}`;
      } else if (date) {
        whenPart = `on ${date}`;
      }
    } else {
      whenPart = relativeTime;
    }

    // Clean up spaces
    const parts = [whoPart, what ? `"${what}"` : '', whenPart].filter(p => p.trim() !== '');
    // Slack remind syntax: /remind [who] [what] [when]
    // Or /remind [who] [when] to [what] ? strict syntax varies but generally:
    // /remind list
    // /remind @jessica to buy milk in 10 minutes
    // /remind #general to "Meeting starting" at 2pm
    
    // We will construct: /remind [who] [what] [when]
    // If "me", strict syntax is often /remind me [what] [when]
    
    setCommand(`/remind ${parts.join(' ')}`);
  }, [whoType, target, what, whenType, date, time, relativeTime]);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-gray-800">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-[#4A154B] p-6 text-white flex items-center gap-3">
          <Clock className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Slack Reminder Generator</h1>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Who Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5 text-gray-500" />
              Who to remind?
            </h2>
            <div className="flex flex-wrap gap-2 mb-3">
              <button 
                onClick={() => setWhoType('me')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${whoType === 'me' ? 'bg-[#4A154B] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Me
              </button>
              <button 
                onClick={() => setWhoType('channel')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${whoType === 'channel' ? 'bg-[#4A154B] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Channel
              </button>
              <button 
                onClick={() => setWhoType('user')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${whoType === 'user' ? 'bg-[#4A154B] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Specific User
              </button>
            </div>
            
            {whoType !== 'me' && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {whoType === 'channel' ? <Hash className="h-5 w-5 text-gray-400" /> : <User className="h-5 w-5 text-gray-400" />}
                </div>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder={whoType === 'channel' ? "general" : "username"}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm transition-shadow"
                />
              </div>
            )}
          </section>

          {/* What Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              What is the reminder?
            </h2>
            <textarea
              value={what}
              onChange={(e) => setWhat(e.target.value)}
              placeholder="e.g. Submit the weekly report"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm transition-shadow resize-none h-24"
            />
          </section>

          {/* When Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-gray-500" />
              When?
            </h2>
            
            <div className="flex gap-4 border-b border-gray-200 mb-4">
              <button
                className={`pb-2 text-sm font-medium ${whenType === 'specific' ? 'border-b-2 border-[#4A154B] text-[#4A154B]' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setWhenType('specific')}
              >
                Specific Date & Time
              </button>
              <button
                className={`pb-2 text-sm font-medium ${whenType === 'relative' ? 'border-b-2 border-[#4A154B] text-[#4A154B]' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setWhenType('relative')}
              >
                Relative (Quick)
              </button>
            </div>

            {whenType === 'specific' ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  value={relativeTime}
                  onChange={(e) => setRelativeTime(e.target.value)}
                  placeholder="e.g. in 10 minutes, every Monday at 9am"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm"
                />
                <div className="flex flex-wrap gap-2">
                  {['in 10 minutes', 'in 1 hour', 'tomorrow at 9am', 'every Monday at 9am'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setRelativeTime(suggestion)}
                      className="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Result Section */}
          <section className="bg-gray-800 rounded-lg p-4 mt-6">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Command Preview</h3>
            <div className="flex items-center justify-between gap-4">
              <code className="text-green-400 font-mono text-sm break-all">
                {command}
              </code>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all active:scale-95"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </section>

        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            Copy the command above and paste it into any Slack channel.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;