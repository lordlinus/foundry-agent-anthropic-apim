import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Stethoscope, 
  Zap, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export default function AgentHeader({ activeAgent, setActiveAgent, onResetSession, sessionId }) {
  const agents = [
    {
      id: 'anthropic-agent-underwriting',
      name: 'Underwriting Executive',
      badge: 'Multi-Model (Haiku + Opus)',
      icon: ShieldCheck,
      color: 'from-amber-500 to-orange-600',
      description: 'Haiku ratio tools + Opus Executive Judge'
    },
    {
      id: 'anthropic-agent-healthcare',
      name: 'Healthcare Specialist',
      badge: 'MCP + Skills',
      icon: Stethoscope,
      color: 'from-cyan-500 to-blue-600',
      description: 'NPI, ICD-10, CMS, PubMed & Prior-Auth'
    },
    {
      id: 'anthropic-agent-basic',
      name: 'Basic APIM Agent',
      badge: 'Core Gateway',
      icon: Cpu,
      color: 'from-indigo-500 to-purple-600',
      description: 'Minimal Anthropic over Azure APIM'
    }
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Layers className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white">
                  Foundry Hosted Agents
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Anthropic via APIM
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span>Azure AI Foundry</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> APIM Gateway Active
                </span>
              </p>
            </div>
          </div>

          {/* Session & Quick Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Session:</span>
              <code className="text-cyan-300 font-mono">{sessionId ? `${sessionId.slice(0, 8)}...` : 'new-session'}</code>
            </div>
            <button
              onClick={onResetSession}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Reset Conversation Session"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>New Session</span>
            </button>
          </div>

        </div>

        {/* Agent Switcher Tabs */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {agents.map((agent) => {
            const Icon = agent.icon;
            const isSelected = activeAgent === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all shrink-0 ${
                  isSelected
                    ? 'bg-slate-800/90 text-white border-cyan-500/50 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`p-1.5 rounded-lg bg-gradient-to-r ${agent.color} text-white shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100">{agent.name}</span>
                    <span className={`px-1.5 py-0.2 text-[10px] rounded ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                      {agent.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{agent.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
