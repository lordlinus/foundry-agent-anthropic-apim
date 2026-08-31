import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Scale, 
  Cpu, 
  FileSpreadsheet, 
  Play, 
  ArrowRight, 
  Award,
  Zap
} from 'lucide-react';

export default function UnderwritingDashboard({ onSendPrompt, sampleApplication }) {
  const samplePrompt = "Evaluate commercial application: income $500,000, debt $150,000, liquid assets $100,000, short term liabilities $40,000, annual premiums $20,000, prior claims $3,000.";

  return (
    <div className="space-y-4">
      
      {/* Top Banner: Multi-Model Architecture */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/20 rounded-xl p-4 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Multi-Model Architecture
              </span>
              <span className="text-xs text-slate-400">Foundry Toolbox Enabled</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">Commercial Underwriting Executive</h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Pairs a fast model (<code className="text-amber-300">claude-haiku-4.5</code>/<code className="text-amber-300">claude-sonnet-5</code>) as a ratio tool processor with a frontier model (<code className="text-amber-400 font-semibold">claude-opus-4.7</code>) for Executive Judge verdict & summary.
            </p>
          </div>
          <button
            onClick={() => onSendPrompt(samplePrompt)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-xs shadow-lg shadow-amber-500/20 transition-all shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Run Sample Underwriting</span>
          </button>
        </div>

        {/* Model Pipeline Visualization */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 overflow-x-auto gap-2">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <div>
              <span className="font-semibold text-slate-200">Data Processor</span>
              <span className="text-[10px] text-slate-400 block">Haiku 4.5 / Sonnet 5</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
            <div>
              <span className="font-semibold text-slate-200">Ratio Audit Tools</span>
              <span className="text-[10px] text-slate-400 block">Debt / Liquidity / Loss</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
          <div className="flex items-center gap-2 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-200">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <div>
              <span className="font-semibold text-white">Executive Judge</span>
              <span className="text-[10px] text-amber-300 block">Opus 4.7 Synthesizer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Financial Ratios Preview & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Debt-to-Income Threshold</span>
            <Scale className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white mt-1">30.0%</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <CheckCircle className="w-3 h-3" /> Max allowed: 40% (Pass)
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Current Liquidity Ratio</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white mt-1">2.50x</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <CheckCircle className="w-3 h-3" /> Min allowed: 1.5x (Healthy)
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Historical Loss Ratio</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white mt-1">15.0%</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <CheckCircle className="w-3 h-3" /> Max allowed: 50% (Low Risk)
          </div>
        </div>
      </div>

      {/* Quick Application Launcher */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300 font-medium">Sample Commercial Application Document Loaded</span>
        </div>
        <button
          onClick={() => onSendPrompt(`Read sample_application.txt and evaluate application for Apex Logistics LLC.`)}
          className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
        >
          Evaluate sample_application.txt &rarr;
        </button>
      </div>

    </div>
  );
}
