import React from 'react';
import { 
  Stethoscope, 
  Database, 
  CheckCircle2, 
  FileText, 
  Play, 
  Activity, 
  Search,
  BookOpen,
  Award
} from 'lucide-react';

export default function HealthcareDashboard({ onSendPrompt }) {
  const mcpServers = [
    { name: 'NPI Registry', desc: 'Provider NPI & Taxonomies', status: 'Connected', icon: Search },
    { name: 'ICD-10 Codes', desc: 'Diagnosis & Procedure Lookup', status: 'Connected', icon: Database },
    { name: 'CMS Coverage', desc: 'Medicare Coverage Policies', status: 'Connected', icon: CheckCircle2 },
    { name: 'Clinical Trials', desc: 'NIH ClinicalTrials.gov API', status: 'Connected', icon: Activity },
    { name: 'PubMed', desc: 'Medical Literature & Abstracts', status: 'Connected', icon: BookOpen }
  ];

  const samplePrompt = "Review prior authorization for knee replacement procedure for provider NPI 1234567890 with clinical notes in sample_clinical_note.txt.";

  return (
    <div className="space-y-4">
      {/* Top Banner: Healthcare Specialist */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/20 rounded-xl p-4 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Healthcare MCP Agent
              </span>
              <span className="text-xs text-slate-400">5 Live MCP Servers</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">Clinical Intelligence & Prior Auth Specialist</h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Integrates Anthropic Claude over Azure APIM with live Healthcare MCP tools & domain-specific clinical skills (Prior Auth, ICD-10 Coding, Note Extraction).
            </p>
          </div>
          <button
            onClick={() => onSendPrompt(samplePrompt)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 transition-all shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Review Prior Authorization</span>
          </button>
        </div>

        {/* Skills List */}
        <div className="mt-3 flex items-center gap-2 text-xs">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">Loaded Skills:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[11px]">prior-auth.md</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[11px]">icd10-coding.md</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[11px]">clinical-note-extract.md</span>
        </div>
      </div>

      {/* MCP Servers Grid */}
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Connected Healthcare MCP Tools</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {mcpServers.map((mcp) => {
            const Icon = mcp.icon;
            return (
              <div key={mcp.name} className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">{mcp.name}</div>
                  <div className="text-[10px] text-slate-400">{mcp.desc}</div>
                </div>
                <div className="text-[10px] text-emerald-400 mt-2 font-medium">HTTP Streamable MCP</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clinical Note Launcher */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300 font-medium">Sample Clinical Note (knee_replacement_auth.txt) Ready</span>
        </div>
        <button
          onClick={() => onSendPrompt(`Read sample_clinical_note.txt, extract clinical entities, lookup ICD-10 codes and verify prior auth coverage.`)}
          className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
        >
          Extract Note & Verify Auth &rarr;
        </button>
      </div>
    </div>
  );
}
