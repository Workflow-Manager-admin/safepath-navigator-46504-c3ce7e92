import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // State for feature drawers/modal toggling
  const [showPreferences, setShowPreferences] = useState(false);
  const [showSOS, setShowSOS] = useState(false);

  return (
    <div className="app" style={{ background: "var(--base-dark)", minHeight: "100vh", fontFamily: "Inter,Roboto,Arial,sans-serif" }}>
      <nav className="navbar" style={{ background: "var(--base-dark)" }}>
        <div className="container" style={{ maxWidth: 540 }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <div className="logo" style={{ fontSize: 21, color: "var(--base-light)" }}>
              <span className="logo-symbol" style={{ color: "#4CAF50" }}>🛡️</span>
              SafePath Navigator
            </div>
            <div>
              <button className="btn" style={{ background: "#E91E63", marginRight: 12 }}
                aria-label="Emergency SOS"
                onClick={() => setShowSOS(true)}
              >
                SOS
              </button>
              <button className="btn"
                style={{ background: "#4CAF50" }} aria-label="User Preferences"
                onClick={() => setShowPreferences(true)}
              >
                <span role="img" aria-label="User" style={{ marginRight: 4 }}>👤</span>
                Me
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main style={{ paddingTop: 80, paddingBottom: 24, minHeight: "100vh", background: "var(--base-dark)" }}>
        <div className="container" style={{ maxWidth: 540 }}>
          <div className="hero" style={{ paddingTop: 40, textAlign: "center" }}>
            <div className="subtitle" style={{ color: "#4CAF50" }}>
              Navigate Safely. Every Journey, Every Time.
            </div>
            <h1 className="title" style={{ color: "#222", fontFamily: "inherit", fontWeight: 700, fontSize: "2.4rem" }}>
              SafePath Navigator
            </h1>
            <div className="description" style={{ color: "var(--text-secondary)", fontSize: 16 }}>
              Your personal mobile companion for safely walking city streets.<br />
              Plan routes avoiding danger hotspots, darkness, bad weather, or crowds using real-time data and AI.
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))',
              gap: 18,
              margin: "38px 0 8px"
            }}>
              <FeatureCard
                icon="🕵️"
                title="Crime Hotspots"
                desc="Live crime data overlays for safer pathing."
                color="#E91E63"
              />
              <FeatureCard
                icon="💡"
                title="Lighting"
                desc="Highlights well-lit streets for night walks."
                color="#FFC107"
              />
              <FeatureCard
                icon="👥"
                title="Crowd"
                desc="Find quieter/safer paths with crowd detection."
                color="#4CAF50"
              />
              <FeatureCard
                icon="☀️"
                title="Weather"
                desc="Avoid storms or flooding with route adaptation."
                color="#4CAF50"
              />
              <FeatureCard
                icon="🧠"
                title="AI Routing"
                desc="Routes powered by AI safety algorithms."
                color="#222"
              />
              <FeatureCard
                icon="🚨"
                title="SOS"
                desc="Emergency help—location auto-shares if triggered."
                color="#E91E63"
              />
              <FeatureCard
                icon="🎚️"
                title="Personalize"
                desc="Set route/safety preferences & get alerts."
                color="#009688"
              />
            </div>

            <div style={{ marginTop: 35, marginBottom: 28 }}>
              <RoutePlannerWidget />
            </div>
          </div>
          {/* Popover Modals */}
          {showPreferences && <UserPreferences onClose={() => setShowPreferences(false)} />}
          {showSOS && <SOSModal onClose={() => setShowSOS(false)} />}
        </div>
      </main>
      <footer style={{
        textAlign: "center", color: "#8BC34A",
        background: "var(--base-dark)", padding: 10, fontSize: 14, opacity: 0.85
      }}>
        &copy; {new Date().getFullYear()} SafePath Navigator – Stay safe, together.
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function FeatureCard({ icon, title, desc, color }) {
  return (
    <div
      style={{
        background: "#101B25",
        borderRadius: 14,
        boxShadow: "0 2px 18px 0 rgba(76,175,80,0.03)",
        padding: 18,
        textAlign: "center",
        minHeight: 130,
        border: `2px solid ${color}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
      }}>
      <span style={{ fontSize: 36, color: color, marginBottom: 8 }}>{icon}</span>
      <div style={{ fontWeight: 600, color: color, fontSize: "1.07rem" }}>{title}</div>
      <div style={{ color: "#eee", fontSize: 13, opacity: 0.85, marginTop: 3 }}>{desc}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
function RoutePlannerWidget() {
  // Placeholder: would integrate with backend for AI routing solution
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [route, setRoute] = useState(null);

  // Simulated demo routing
  function handlePlanRoute(e) {
    e.preventDefault();
    if (!from || !to) return;
    // Simulate a route result with all feature overlays
    setRoute({
      path: [
        { lat: 40.1, lng: -74.1, step: 'START', info: ["Safe", "Well-lit"] },
        { lat: 40.11, lng: -74.09, step: 'PATH', info: ["Low Crime", "Crowded"] },
        { lat: 40.13, lng: -74.05, step: 'PATH', info: ["Storm Risk", "Well-lit"] },
        { lat: 40.15, lng: -74.01, step: 'END', info: ["Safe", "Destination"] }
      ],
      meta: {
        crimeScore: 2,
        weather: "Clear",
        lighting: "Good",
        crowd: "Medium",
        aiConfidence: "High"
      }
    });
  }

  return (
    <div style={{
      background: "#18222D", padding: 22, borderRadius: 16, boxShadow: "0 1px 8px 0 #2223",
      maxWidth: 410, margin: "0 auto"
    }}>
      <div style={{ fontSize: 17, marginBottom: 12, fontWeight: 600, color: "#4CAF50" }}>
        Plan Your Safe Route
      </div>
      <form
        onSubmit={handlePlanRoute}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          required
          placeholder="Start Location"
          value={from}
          onChange={e => setFrom(e.target.value)}
          style={inputStyle}
          aria-label="From"
        />
        <input
          required
          placeholder="Destination"
          value={to}
          onChange={e => setTo(e.target.value)}
          style={inputStyle}
          aria-label="To"
        />
        <button className="btn btn-large" style={{ background: "#4CAF50" }} type="submit">
          Find Safest Path
        </button>
      </form>

      {route && (
        <div style={{ marginTop: 24, textAlign: "left" }}>
          <div style={{ fontWeight: 600, color: "#FFC107", fontSize: 15 }}>Demo Route</div>
          <ol style={{ color: "white", fontSize: 14, paddingLeft: 18, marginTop: 5, marginBottom: 4 }}>
            {route.path.map((step, i) => (
              <li key={i}>{step.step === "START" ? "Start" : step.step === "END" ? "Arrive" : "Step"}:
                <ul>
                  {step.info.map((info, j) => (
                    <li key={j} style={{ color: info.includes("Crime") ? "#E91E63" : (info.includes("Crowded") ? "#FFC107" : "#4CAF50"), fontSize: 13 }}>
                      {info}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: 8, fontSize: 13, color: "#76FF03" }}>
            {`Confidence: ${route.meta.aiConfidence}, Weather: ${route.meta.weather} `}
            <span style={{ color: "#E91E63" }}>Crime Risk: {route.meta.crimeScore}/10</span>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "10px 14px",
  borderRadius: 6,
  border: "1px solid #2EF9A5",
  background: "#101B25",
  color: "#fff",
  fontSize: 15,
  outline: "none"
};


// PUBLIC_INTERFACE
function UserPreferences({ onClose }) {
  // Placeholder for user preferences
  const [notifs, setNotifs] = useState(true);
  const [avoidDarkStreets, setAvoidDarkStreets] = useState(true);

  return (
    <Modal title="User Preferences" onClose={onClose}>
      <div style={{ padding: "4px 0" }}>
        <label style={prefLabel}>
          <input type="checkbox" checked={notifs} onChange={() => setNotifs(!notifs)} />
          Enable safety notifications
        </label>
        <label style={prefLabel}>
          <input type="checkbox" checked={avoidDarkStreets} onChange={() => setAvoidDarkStreets(!avoidDarkStreets)} />
          Avoid poorly-lit streets
        </label>
        <div style={{ margin: "16px 0 0", fontSize: 12, color: "#aaa" }}>
          More preferences coming soon...
        </div>
      </div>
      <button className="btn btn-large" style={{ background: "#4CAF50", marginTop: 22 }} onClick={onClose}>Save</button>
    </Modal>
  );
}

const prefLabel = {
  display: "block",
  margin: "14px 0",
  color: "#333",
  fontSize: 15
};


// PUBLIC_INTERFACE
function SOSModal({ onClose }) {
  // Placeholder for emergency
  return (
    <Modal title="Emergency SOS" onClose={onClose}>
      <div style={{ color: "#F44336", fontWeight: 600, fontSize: 16, marginBottom: 12 }}>
        Your location will be sent to emergency contacts and services.
      </div>
      <button
        className="btn btn-large"
        style={{ background: "#E91E63", width: "100%", fontWeight: 700 }}
        onClick={() => {
          alert("SOS sent! Help is on the way.");
          onClose();
        }}
      >
        Send SOS Signal
      </button>
      <div style={{ fontSize: 13, color: "#555", marginTop: 18, textAlign: "center" }}>
        If this is a false alarm, tap outside to close.
      </div>
    </Modal>
  );
}

// Modal container
function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.36)", zIndex: 2000, display: "flex", justifyContent: "center", alignItems: "center"
    }}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff", color: "#111", borderRadius: 12, maxWidth: 340, width: "92vw",
          padding: 24, boxShadow: "0 4px 24px #1b1b1c88", position: "relative"
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, color: "#4CAF50" }}>{title}</div>
        <button
          onClick={onClose}
          aria-label="close"
          style={{
            position: "absolute", right: 14, top: 9, border: "none", background: "none", fontWeight: 900, fontSize: 22, color: "#aaa", cursor: "pointer"
          }}
        >×</button>
        <div>{children}</div>
      </div>
    </div>
  );
}


export default App;