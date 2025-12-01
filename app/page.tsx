"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface ModelData {
  name: string;
  usage: number;
  requests: number;
  color: string;
}

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
];

export default function Home() {
  const [modelData, setModelData] = useState<ModelData[]>([
    { name: "GPT-4", usage: 45.2, requests: 125000, color: COLORS[0] },
    { name: "Claude 3.5", usage: 28.7, requests: 89000, color: COLORS[1] },
    { name: "Gemini Pro", usage: 15.3, requests: 52000, color: COLORS[2] },
    { name: "GPT-3.5", usage: 6.8, requests: 28000, color: COLORS[3] },
    { name: "LLaMA 3", usage: 2.5, requests: 12000, color: COLORS[4] },
    { name: "Mistral", usage: 1.1, requests: 5500, color: COLORS[5] },
    { name: "Claude 3", usage: 0.3, requests: 2200, color: COLORS[6] },
    { name: "PaLM 2", usage: 0.1, requests: 800, color: COLORS[7] },
  ]);

  const [requestsData, setRequestsData] = useState<ModelData[]>([...modelData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setModelData((prevData) =>
        prevData.map((model) => ({
          ...model,
          usage: Math.max(0.1, model.usage + (Math.random() - 0.5) * 2),
          requests: Math.max(100, model.requests + Math.floor((Math.random() - 0.5) * 5000)),
        }))
      );

      setRequestsData((prevData) =>
        prevData.map((model) => ({
          ...model,
          usage: Math.max(0.1, model.usage + (Math.random() - 0.5) * 2),
          requests: Math.max(100, model.requests + Math.floor((Math.random() - 0.5) * 5000)),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const totalUsage = modelData.reduce((sum, model) => sum + model.usage, 0);
  const totalRequests = modelData.reduce((sum, model) => sum + model.requests, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Models Usage Tracker
          </h1>
          <p className="text-xl text-gray-300">Live monitoring of the most popular AI models</p>
          <div className="flex justify-center gap-8 mt-6">
            <div className="bg-slate-800 rounded-lg px-6 py-3 border border-slate-700">
              <p className="text-sm text-gray-400">Total Usage</p>
              <p className="text-2xl font-bold text-blue-400">{totalUsage.toFixed(1)}%</p>
            </div>
            <div className="bg-slate-800 rounded-lg px-6 py-3 border border-slate-700">
              <p className="text-sm text-gray-400">Total Requests</p>
              <p className="text-2xl font-bold text-green-400">{totalRequests.toLocaleString()}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Usage by Model (%)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={modelData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af' }}
                />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => `${value.toFixed(2)}%`}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="usage" name="Usage %" radius={[8, 8, 0, 0]}>
                  {modelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">API Requests by Model</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={requestsData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af' }}
                />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => value.toLocaleString()}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="requests" name="Requests" radius={[8, 8, 0, 0]}>
                  {requestsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Model Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pb-3 px-4">Model</th>
                  <th className="pb-3 px-4">Usage %</th>
                  <th className="pb-3 px-4">Requests</th>
                  <th className="pb-3 px-4">Avg. Requests/sec</th>
                </tr>
              </thead>
              <tbody>
                {modelData
                  .sort((a, b) => b.usage - a.usage)
                  .map((model, index) => (
                    <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.color }}></div>
                        {model.name}
                      </td>
                      <td className="py-3 px-4">{model.usage.toFixed(2)}%</td>
                      <td className="py-3 px-4">{model.requests.toLocaleString()}</td>
                      <td className="py-3 px-4">{(model.requests / 3600).toFixed(0)}/sec</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>Live data updates every 2 seconds • Built with Next.js & Recharts</p>
        </footer>
      </div>
    </div>
  );
}
