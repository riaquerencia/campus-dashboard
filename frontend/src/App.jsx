import AIChat from "./components/AIChat.jsx";
import ServerStatus from "./components/ServerStatus.jsx";
import { TodaysMenu, UpcomingEvents, TodaysTimetable, UpcomingDeadlines } from "./components/DashboardWidgets.jsx";

export default function App() {
  const dateStr = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              🎓 Campus Intelligence
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">{dateStr}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">Live Data</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: Widgets */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TodaysTimetable />
              <TodaysMenu />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UpcomingEvents />
              <UpcomingDeadlines />
            </div>
          </div>

          {/* RIGHT: AI Chat + Status */}
          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden" style={{ height: "520px" }}>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3">
                <h2 className="text-sm font-semibold text-white">🤖 AI Campus Assistant</h2>
                <p className="text-xs text-indigo-200">Powered by Claude + MCP</p>
              </div>
              <div style={{ height: "calc(100% - 60px)" }}>
                <AIChat />
              </div>
            </div>
            <ServerStatus />
          </div>

        </div>
      </main>
    </div>
  );
}
