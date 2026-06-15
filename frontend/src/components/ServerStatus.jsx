import { useState, useEffect } from "react";

const SERVERS = {
  library:   { label: "Library",   icon: "📚" },
  cafeteria: { label: "Cafeteria", icon: "🍽️" },
  events:    { label: "Events",    icon: "🎉" },
  academics: { label: "Academics", icon: "📖" },
};

export default function ServerStatus() {
  const [statuses, setStatuses] = useState({});
  const [apiOk, setApiOk] = useState(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/health", { signal: AbortSignal.timeout(3000) });
      const data = await res.json();
      setStatuses(data.mcpServers || {});
      setApiOk(true);
    } catch {
      setApiOk(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const badge = (status) => {
    const color = status === "online" ? "bg-green-900 text-green-400"
      : status === "offline" ? "bg-red-900 text-red-400"
      : "bg-gray-700 text-gray-400";
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color}`}>{status || "checking…"}</span>;
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MCP Server Status</h3>
        <button onClick={fetchStatus} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Refresh</button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300"> API Gateway</span>
          {badge(apiOk === null ? undefined : apiOk ? "online" : "offline")}
        </div>
        {Object.entries(SERVERS).map(([key, { label, icon }]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm text-gray-300">{icon} {label}</span>
            {badge(statuses[key])}
          </div>
        ))}
      </div>
    </div>
  );
}
