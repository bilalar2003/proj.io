import { NavLink, useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const features = [
    {
      icon: '✦',
      title: 'Boost Productivity',
      description: 'Get more done with an intuitive and easy-to-use interface.',
    },
    {
      icon: '♧',
      title: 'Collaborate Seamlessly',
      description: 'Work together with your team in real-time.',
    },
    {
      icon: '▥',
      title: 'Track Progress',
      description: 'Stay on top of your goals with clear insights.',
    },
    {
      icon: '✓',
      title: 'Reliable & Secure',
      description: 'Your data is always safe with us.',
    },
  ]

  return (
    <main className="home-page" id="home">
      <header className="home-header">
        <a className="home-brand" aria-label="ProjectFlow home">
          <img src="/logo.svg" alt="ProjectFlow" />
        </a>

        <nav className="home-nav" aria-label="Main navigation">
          <NavLink end className={({ isActive }) => `home-nav-link${isActive ? ' is-active' : ''}`} to="/">
            Home
          </NavLink>
          <span className="home-nav-link is-unavailable" aria-disabled="true">
            Features
          </span>
          <span className="home-nav-link is-unavailable" aria-disabled="true">
            About
          </span>
        </nav>

        <div className="home-header-actions">
          <button type="button" className="home-button home-button-secondary" onClick={() => navigate('/auth')}>
            Log In
          </button>
          <button type="button" className="home-button home-button-primary" onClick={() => navigate('/auth')}>
            Register
          </button>
        </div>
      </header>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <div className="home-eyebrow">
            <span>Work Smarter. Together.</span>
          </div>

          <h1 id="home-title">
            The Modern
            <br />
            Project Management
            <br />
            Platform
          </h1>

          <p className="home-description">
            Plan, organize and track your projects with ease.
            <br className="desktop-break" />
            {' '}Work together, stay productive, and meet your goals.
          </p>

          <div className="home-hero-actions">
            <button type="button" className="home-button home-button-primary home-button-large" onClick={() => navigate('/auth')}>
              Get Started Free <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="home-dashboard-stage" id="workspace-preview">
          <div className="home-dashboard-orb" aria-hidden="true" />
          <img className="home-dashboard" src="/dashboard.svg" alt="ProjectFlow dashboard preview" />
        </div>
      </section>

      <section className="home-features" id="home-features" aria-label="ProjectFlow benefits">
        {features.map((feature) => (
          <article className="home-feature" key={feature.title}>
            <span className="home-feature-icon" aria-hidden="true">{feature.icon}</span>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Home
