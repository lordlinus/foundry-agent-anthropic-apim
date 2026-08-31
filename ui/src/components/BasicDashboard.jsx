import React from 'react';
import { Cpu, ShieldCheck, Zap, Globe, Lock, Play } from 'lucide-react';

export default function BasicDashboard({ onSendPrompt }) {
  const samplePrompt = "Hello! Explain how Microsoft Foundry hosted agents route Anthropic requests through Azure API Management.";

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-xl p-4 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Core APIM Gateway Agent
            </span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">Basic Anthropic APIM Agent</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Minimal, lightweight Agent Framework host routing Claude completions through an Enterprise Azure API Management gateway with subscription key authentication.
          </p>
        </div>
        <button
          onClick={() => onSendPrompt(samplePrompt)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 transition-all shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Test Basic APIM Agent</span>
        </button>
      </div>

      {/* Gateway Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-slate-400">
            <span>Gateway Target</span>
            <Globe className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-sm font-semibold text-white mt-1">APIM Anthropic Endpoint</div>
          <div className="text-[10px] text-indigo-300 font-mono mt-0.5">https://&lt;apim-name&gt;.azure-api.net/anthropic</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-slate-400">
            <span>Security Layer</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm font-semibold text-white mt-1">Ocp-Apim-Subscription-Key</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Managed Identity & Header Auth</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-slate-400">
            <span>Model Tier</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-sm font-semibold text-white mt-1">claude-sonnet-5</div>
          <div className="text-[10px] text-purple-300 font-mono mt-0.5">OpenAIChatClient / Responses API</div>
        </div>
      </div>
    </div>
  );
}
