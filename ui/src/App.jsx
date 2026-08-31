import React, { useState } from 'react';
import { CopilotKit, useCopilotAction } from '@copilotkit/react-core';
import AgentHeader from './components/AgentHeader';
import UnderwritingDashboard from './components/UnderwritingDashboard';
import HealthcareDashboard from './components/HealthcareDashboard';
import BasicDashboard from './components/BasicDashboard';
import CopilotChatPanel from './components/CopilotChatPanel';

function MainStudio() {
  const [activeAgent, setActiveAgent] = useState('anthropic-agent-underwriting');
  const [sessionId, setSessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));
  const [lastPrompt, setLastPrompt] = useState('');

  // Register custom CopilotKit action for Agent Switching
  useCopilotAction({
    name: "switchAgent",
    description: "Switch the active Microsoft Foundry agent mode (anthropic-agent-underwriting, anthropic-agent-healthcare, anthropic-agent-basic)",
    parameters: [
      {
        name: "agentId",
        type: "string",
        description: "The agent identifier to activate",
        required: true,
      }
    ],
    handler: async ({ agentId }) => {
      if (['anthropic-agent-underwriting', 'anthropic-agent-healthcare', 'anthropic-agent-basic'].includes(agentId)) {
        setActiveAgent(agentId);
        return `Switched active agent to ${agentId}`;
      }
      return `Unknown agent ${agentId}`;
    }
  });

  const handleResetSession = () => {
    setSessionId('sess_' + Math.random().toString(36).substring(2, 9));
  };

  const handleSendPrompt = (promptText) => {
    setLastPrompt(promptText);
    // Focus or trigger copilot chat input if available
    const textarea = document.querySelector('.copilotKitInput textarea, .copilotKitInput input');
    if (textarea) {
      textarea.value = promptText;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      // Focus element
      textarea.focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <AgentHeader 
        activeAgent={activeAgent} 
        setActiveAgent={setActiveAgent} 
        onResetSession={handleResetSession}
        sessionId={sessionId}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Active Agent Dashboard Feature Panel */}
        {activeAgent === 'anthropic-agent-underwriting' && (
          <UnderwritingDashboard onSendPrompt={handleSendPrompt} />
        )}

        {activeAgent === 'anthropic-agent-healthcare' && (
          <HealthcareDashboard onSendPrompt={handleSendPrompt} />
        )}

        {activeAgent === 'anthropic-agent-basic' && (
          <BasicDashboard onSendPrompt={handleSendPrompt} />
        )}

        {/* CopilotKit Chat Experience */}
        <CopilotChatPanel 
          activeAgent={activeAgent} 
          onSuggestedPrompt={handleSendPrompt}
          lastPrompt={lastPrompt}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Microsoft Foundry Hosted Agents • Anthropic via Azure APIM • CopilotKit v1.4 Studio
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <MainStudio />
    </CopilotKit>
  );
}
