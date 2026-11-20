import { useState } from 'react'
import userIcon from '../public/auth-user.svg'
import emailIcon from '../public/auth-email.svg'
import lockIcon from '../public/auth-lock.svg'
import eyeIcon from '../public/auth-eye.svg'
import eyeOffIcon from '../public/auth-eye-off.svg'
import './Auth.css'

function Auth() {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const isLogin = mode === 'login'

  return (
    <main className="auth-page">
      <section className="auth-card" aria-label="Proj.io account access">
        <aside className="auth-brand-panel">
          <a className="auth-brand" href="/" aria-label="Proj.io home">
            proj.io
          </a>
          <div className="auth-brand-copy">
            <h1>Plan. Collaborate.<br />Achieve More.</h1>
            <p>Your modern project management platform for seamless teamwork.</p>
          </div>
        </aside>

        <section className="auth-form-panel">
          <div className="auth-form-content">
            <div className="auth-tabs" role="tablist" aria-label="Account access">
              <button
                type="button"
                role="tab"
                aria-selected={isLogin}
                className={isLogin ? 'is-active' : ''}
                onClick={() => setMode('login')}
              >
                Login
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={!isLogin}
                className={!isLogin ? 'is-active' : ''}
                onClick={() => setMode('signup')}
              >
                Sign Up
              </button>
            </div>

            <div className="auth-form-heading">
              <h2>{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
              <p>{isLogin ? 'Sign in to continue to Proj.io' : 'Sign up to get started with Proj.io'}</p>
            </div>

            <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
              {!isLogin && (
                <label className="auth-input">
                  <span className="auth-input-icon" aria-hidden="true">
                    <img src={userIcon} alt="" />
                  </span>
                  <input type="text" name="name" placeholder="Full Name" autoComplete="name" required />
                </label>
              )}

              <label className="auth-input">
                <span className="auth-input-icon" aria-hidden="true">
                  <img src={emailIcon} alt="" />
                </span>
                <input type="email" name="email" placeholder="Email Address" autoComplete="email" required />
              </label>

              <label className="auth-input">
                <span className="auth-input-icon" aria-hidden="true">
                  <img src={lockIcon} alt="" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img src={showPassword ? eyeIcon : eyeOffIcon} alt="" />
                </button>
              </label>

              {isLogin && (
                <div className="auth-form-options">
                  <label className="auth-remember">
                    <input type="checkbox" name="remember" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="auth-forgot">
                    Forgot password?
                  </button>
                </div>
              )}

              <button type="submit" className="auth-submit">
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <p className="auth-switch">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              {' '}
              <button type="button" onClick={() => setMode(isLogin ? 'signup' : 'login')}>
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Auth
