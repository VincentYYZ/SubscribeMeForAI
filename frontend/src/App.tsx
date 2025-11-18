import "./App.css";

function App() {
  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Welcome</p>
        <h1>SubscribeMeForAI</h1>
        <p>
          React + TypeScript frontend is ready. Start building the subscription experience and
          connect it to the Django API under <code>/api</code> when available.
        </p>
        <div className="cta">
          <button type="button">Get Started</button>
          <button type="button" className="secondary">
            Learn More
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
