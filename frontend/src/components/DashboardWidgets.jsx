import { useState, useEffect } from "react";

async function fetchMCP(server, tool, body = {}) {
  const ports = { library: 5001, cafeteria: 5002, events: 5003, academics: 5004 };
  const res = await fetch(`http://localhost:${ports[server]}/tools/${tool}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

function Widget({ icon, title, sub, children }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 h-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {sub && <p className="text-xs text-gray-500">{sub}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 animate-pulse">
      <div className="h-4 bg-gray-800 rounded w-1/2 mb-3" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-800 rounded" />
        <div className="h-3 bg-gray-800 rounded w-4/5" />
        <div className="h-3 bg-gray-800 rounded w-3/5" />
      </div>
    </div>
  );
}

export function TodaysMenu() {
  const [data, setData] = useState(null);
  useEffect(() => { fetchMCP("cafeteria", "get_todays_menu").then(setData).catch(() => {}); }, []);
  if (!data) return <Skeleton />;
  return (
    <Widget icon="🍽️" title="Today's Menu" sub={data.day?.toUpperCase()}>
      {["breakfast", "lunch", "dinner"].map((meal) => (
        <div key={meal} className="mb-2">
          <p className="text-xs text-indigo-400 uppercase font-semibold">{meal}</p>
          <p className="text-sm text-gray-300">{data.menu?.[meal]?.join(", ") || "—"}</p>
        </div>
      ))}
    </Widget>
  );
}

export function UpcomingEvents() {
  const [data, setData] = useState(null);
  useEffect(() => { fetchMCP("events", "list_upcoming_events").then(setData).catch(() => {}); }, []);
  if (!data) return <Skeleton />;
  const events = data.events?.slice(0, 4) || [];
  return (
    <Widget icon="🎉" title="Upcoming Events">
      {events.length === 0
        ? <p className="text-sm text-gray-500">No upcoming events</p>
        : events.map((e) => (
          <div key={e.id} className="mb-3 last:mb-0">
            <p className="text-sm font-medium text-white">{e.name}</p>
            <p className="text-xs text-gray-400">{e.date} • {e.time} • {e.venue}</p>
            <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full">{e.club}</span>
          </div>
        ))
      }
    </Widget>
  );
}

export function TodaysTimetable() {
  const [data, setData] = useState(null);
  useEffect(() => { fetchMCP("academics", "get_todays_timetable").then(setData).catch(() => {}); }, []);
  if (!data) return <Skeleton />;
  const classes = data.classes || [];
  return (
    <Widget icon="📖" title="Today's Classes" sub={data.day?.toUpperCase()}>
      {classes.length === 0
        ? <p className="text-sm text-gray-500">No classes today 🎉</p>
        : classes.map((c, i) => (
          <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
            <span className="text-xs text-indigo-400 w-14 shrink-0">{c.time}</span>
            <div>
              <p className="text-sm text-white">{c.subject}</p>
              <p className="text-xs text-gray-400">{c.room}</p>
            </div>
          </div>
        ))
      }
    </Widget>
  );
}

export function UpcomingDeadlines() {
  const [data, setData] = useState(null);
  useEffect(() => { fetchMCP("academics", "get_upcoming_deadlines").then(setData).catch(() => {}); }, []);
  if (!data) return <Skeleton />;
  const deadlines = data.deadlines?.slice(0, 4) || [];
  return (
    <Widget icon="⏰" title="Deadlines">
      {deadlines.length === 0
        ? <p className="text-sm text-gray-500">No upcoming deadlines</p>
        : deadlines.map((d) => (
          <div key={d.id} className="mb-2 last:mb-0">
            <p className="text-sm font-medium text-white">{d.title}</p>
            <p className="text-xs text-gray-400">{d.subject} • Due: <span className="text-red-400">{d.due}</span></p>
          </div>
        ))
      }
    </Widget>
  );
}
