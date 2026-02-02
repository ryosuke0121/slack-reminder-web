import { useState, useEffect } from 'react';
import { Copy, Check, Clock, User, Hash, MessageSquare, Calendar, Repeat } from 'lucide-react';

function App() {
  const [whoType, setWhoType] = useState<'me' | 'channel' | 'user'>('me');
  const [target, setTarget] = useState('');
  const [what, setWhat] = useState('');
  
  // When types: specific date/time, relative (in ...), recurring (every ...)
  const [whenType, setWhenType] = useState<'specific' | 'relative' | 'recurring'>('specific');
  
  // Specific
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  
  // Relative
  const [relativeTime, setRelativeTime] = useState('');

  // Recurring
  const [recurringType, setRecurringType] = useState<'every_day' | 'every_weekday' | 'weekly' | 'custom'>('every_weekday');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [recurringTime, setRecurringTime] = useState('09:00');
  const [customRecurring, setCustomRecurring] = useState('every 2 weeks');

  const [command, setCommand] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let whoPart = '';
    if (whoType === 'me') {
      whoPart = 'me'; // Explicitly use "me" based on reminder.md tip
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
    } else if (whenType === 'relative') {
      whenPart = relativeTime;
    } else if (whenType === 'recurring') {
      if (recurringType === 'every_day') {
        whenPart = `every day at ${recurringTime}`;
      } else if (recurringType === 'every_weekday') {
        whenPart = `every weekday at ${recurringTime}`;
      } else if (recurringType === 'weekly') {
        whenPart = `every ${selectedDay} at ${recurringTime}`;
      } else {
        whenPart = customRecurring;
      }
    }

    // Clean up spaces
    const parts = [whoPart, what ? `"${what}"` : '', whenPart].filter(p => p.trim() !== '');
    
    setCommand(`/remind ${parts.join(' ')}`);
  }, [whoType, target, what, whenType, date, time, relativeTime, recurringType, selectedDay, recurringTime, customRecurring]);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-gray-800 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-[#4A154B] p-6 text-white flex items-center gap-3">
          <Clock className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Slack Reminder Generator</h1>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Who Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5 text-gray-500" />
              誰に通知しますか？
            </h2>
            <div className="flex flex-wrap gap-2 mb-3">
              <button 
                onClick={() => setWhoType('me')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${whoType === 'me' ? 'bg-[#4A154B] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                自分 (me)
              </button>
              <button 
                onClick={() => setWhoType('channel')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${whoType === 'channel' ? 'bg-[#4A154B] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                チャンネル (#)
              </button>
              <button 
                onClick={() => setWhoType('user')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${whoType === 'user' ? 'bg-[#4A154B] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                特定の相手 (@)
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
                  placeholder={whoType === 'channel' ? "general (チャンネル名)" : "sato (ユーザー名)"}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm transition-shadow"
                />
              </div>
            )}
          </section>

          {/* What Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-gray-700">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              内容は？
            </h2>
            <textarea
              value={what}
              onChange={(e) => setWhat(e.target.value)}
              placeholder="例: 週報を提出する、会議の時間です"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm transition-shadow resize-none h-24"
            />
          </section>

          {/* When Section */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-gray-500" />
              いつ？
            </h2>
            
            <div className="flex gap-4 border-b border-gray-200 mb-4 overflow-x-auto">
              <button
                className={`pb-2 text-sm font-medium whitespace-nowrap ${whenType === 'specific' ? 'border-b-2 border-[#4A154B] text-[#4A154B]' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setWhenType('specific')}
              >
                日時を指定
              </button>
              <button
                className={`pb-2 text-sm font-medium whitespace-nowrap ${whenType === 'relative' ? 'border-b-2 border-[#4A154B] text-[#4A154B]' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setWhenType('relative')}
              >
                ○分後/○時間後
              </button>
              <button
                className={`pb-2 text-sm font-medium whitespace-nowrap flex items-center gap-1 ${whenType === 'recurring' ? 'border-b-2 border-[#4A154B] text-[#4A154B]' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setWhenType('recurring')}
              >
                <Repeat className="w-4 h-4" />
                繰り返し (Every...)
              </button>
            </div>

            {whenType === 'specific' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">時間</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm"
                  />
                </div>
              </div>
            )}

            {whenType === 'relative' && (
              <div className="space-y-3">
                <input
                  type="text"
                  value={relativeTime}
                  onChange={(e) => setRelativeTime(e.target.value)}
                  placeholder="例: in 10 minutes, in 3 hours"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm"
                />
                <div className="flex flex-wrap gap-2">
                  {['in 10 minutes', 'in 30 minutes', 'in 1 hour', 'in 3 hours'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setRelativeTime(suggestion)}
                      className="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">※ Slackの仕様上、ここは英語入力推奨です (minutes, hours, days)</p>
              </div>
            )}

            {whenType === 'recurring' && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                   <button 
                    onClick={() => setRecurringType('every_weekday')}
                    className={`px-3 py-1.5 rounded-md text-sm border ${recurringType === 'every_weekday' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    平日 (月-金)
                  </button>
                  <button 
                    onClick={() => setRecurringType('every_day')}
                    className={`px-3 py-1.5 rounded-md text-sm border ${recurringType === 'every_day' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    毎日
                  </button>
                  <button 
                    onClick={() => setRecurringType('weekly')}
                    className={`px-3 py-1.5 rounded-md text-sm border ${recurringType === 'weekly' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    毎週○曜日
                  </button>
                  <button 
                    onClick={() => setRecurringType('custom')}
                    className={`px-3 py-1.5 rounded-md text-sm border ${recurringType === 'custom' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    カスタム
                  </button>
                </div>

                {(recurringType === 'every_day' || recurringType === 'every_weekday') && (
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">時間</label>
                    <input
                      type="time"
                      value={recurringTime}
                      onChange={(e) => setRecurringTime(e.target.value)}
                      className="block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm"
                    />
                  </div>
                )}

                {recurringType === 'weekly' && (
                  <div className="flex gap-4 items-start">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">曜日</label>
                      <select 
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm"
                      >
                        {daysOfWeek.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">時間</label>
                      <input
                        type="time"
                        value={recurringTime}
                        onChange={(e) => setRecurringTime(e.target.value)}
                        className="block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm"
                      />
                    </div>
                  </div>
                )}

                {recurringType === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">カスタム設定 (every ...)</label>
                    <input
                      type="text"
                      value={customRecurring}
                      onChange={(e) => setCustomRecurring(e.target.value)}
                      placeholder="例: every 2 weeks"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent sm:text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">例: every 2 weeks, every month on the 1st</p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Result Section */}
          <section className="bg-gray-800 rounded-lg p-4 mt-6">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">生成されたコマンド</h3>
            <div className="flex items-center justify-between gap-4">
              <code className="text-green-400 font-mono text-sm break-all">
                {command}
              </code>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all active:scale-95"
                title="クリップボードにコピー"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm font-medium">{copied ? 'コピーしました' : 'コピー'}</span>
              </button>
            </div>
          </section>

        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            上のコマンドをコピーして、Slackの入力欄に貼り付けて送信してください。<br/>
            自分宛てのメモやチームへのリマインダーとして使えます。
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;