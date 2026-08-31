import React from 'react';
import { CopilotChat } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';
import { Sparkles, Send, MessageSquare } from 'lucide-react';

export default function CopilotChatPanel({ activeAgent, onSuggestedPrompt, lastPrompt }) {
  const suggestions = {
    'anthropic-agent-underwriting': [
      "Evaluate commercial application for Apex Logistics: income $500k, debt $150k.",
      "Calculate debt-to-income and liquidity ratios for a new policy.",
      "What is the Executive Judge verdict on risk score 0.3?"
    ],
    'anthropic-agent-healthcare': [
      "Review prior authorization for knee replacement for provider NPI 1234567890.",
      "Lookup ICD-10 diagnosis code M17.11 for knee osteoarthritis.",
      "Extract clinical entities from patient clinical note."
    ],
    'anthropic-agent-basic': [
      "Hello! Explain how Anthropic requests route through Azure APIM.",
      "What Anthropic models are supported by this agent framework?",
      "Summarize the features of Microsoft Foundry hosted agents."
    ]
  };

  const currentSuggestions = suggestions[activeAgent] || suggestions['anthropic-agent-basic'];

  return (
    <div className="flex flex-col h-[650px] bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Panel Header */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            CopilotKit Interactive Assistant
          </h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
          CopilotKit v1.4 + AG-UI
        </span>
      </div>

      {/* Suggested Prompts Bar */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Demo Prompts:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentSuggestions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSuggestedPrompt(prompt)}
              className="text-left text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition-all shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* CopilotChat Component Container */}
      <div className="flex-1 overflow-hidden p-2 relative">
        <CopilotChat
          labels={{
            title: "Agent Assistant",
            initial: "Welcome! Ask me to run underwriting analysis, healthcare prior authorization, or general APIM queries.",
            placeholder: "Type a prompt or select a demo prompt above..."
          }}
          className="h-full"
        />
      </div>
    </div>
  );
}
