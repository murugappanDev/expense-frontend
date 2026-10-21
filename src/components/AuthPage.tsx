import React, { useState } from "react";
import {
  HeartIcon,
  MailIcon,
  LockIcon,
  UserIcon,
  CheckIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "./Icons";

interface AuthPageProps {
  onLogin: (credentials: { email: string; password: string }) => void;
  onRegister: (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
  }) => void;
  defaultMode?: "login" | "register";
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onLogin,
  onRegister,
  defaultMode = "login",
}) => {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);

  // Form states
  const [email, setEmail] = useState("sarah.jenkins@bloomcare.com");
  const [password, setPassword] = useState("securepassword123");
  const [name, setName] = useState("Sarah & Alex Jenkins");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [avatar, setAvatar] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({ name, email, password, phone, avatar });
  };

  return (
    <div className="auth-page-root">
      <div className="auth-page-container">
        {/* Left / Center Form Card */}
        <div className="auth-form-card surface-card">
          {/* Brand header */}
          <div className="auth-brand-row">
            <div className="brand-icon-box">
              <HeartIcon size={18} />
            </div>
            <div>
              <span className="brand-title">BloomCare</span>
              <span className="brand-subtitle">Healthcare Finance</span>
            </div>
          </div>

          <div className="auth-heading-wrap">
            <h1 className="auth-title">
              {mode === "login" ? "Welcome back" : "Create your family account"}
            </h1>
            <p className="auth-subtitle">
              {mode === "login"
                ? "Enter your credentials to access your pregnancy and medical expense tracker."
                : "Begin tracking doctor visits, tests, prenatal vitamins, and delivery packages."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="auth-switch-tabs">
            <button
              type="button"
              className={`auth-tab-pill ${mode === "login" ? "active" : ""}`}
              onClick={() => setMode("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab-pill ${mode === "register" ? "active" : ""}`}
              onClick={() => setMode("register")}
            >
              Register
            </button>
          </div>

          {/* LOGIN FORM */}
          {mode === "login" ? (
            <form onSubmit={handleLoginSubmit} className="auth-form-fields">
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">
                  <span>Email address</span>
                  <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <MailIcon size={16} className="field-icon" />
                  <input
                    id="login-email"
                    type="email"
                    className="form-input has-icon"
                    placeholder="name@bloomcare.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label" htmlFor="login-password">
                    <span>Password</span>
                    <span className="req">*</span>
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset endpoint can be wired to backend.");
                    }}
                    className="forgot-link"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="input-with-icon">
                  <LockIcon size={16} className="field-icon" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    className="form-input has-icon"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-options-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember this device for 30 days</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                <span>Sign In to Dashboard</span>
                <ArrowRightIcon size={16} />
              </button>

              <div className="auth-backend-hint">
                <span className="hint-label">Endpoint Contract:</span>
                <code>POST /user/login</code>
              </div>

              <div className="auth-switch-footer">
                <span>Don't have an account yet?</span>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setMode("register")}
                >
                  Create family account
                </button>
              </div>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="auth-form-fields">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-name">
                  <span>Full name / Parents' names</span>
                  <span className="req">* Min 2 chars</span>
                </label>
                <div className="input-with-icon">
                  <UserIcon size={16} className="field-icon" />
                  <input
                    id="reg-name"
                    type="text"
                    className="form-input has-icon"
                    placeholder="Sarah & Alex Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    minLength={2}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">
                  <span>Email address</span>
                  <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <MailIcon size={16} className="field-icon" />
                  <input
                    id="reg-email"
                    type="email"
                    className="form-input has-icon"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-password">
                  <span>Password</span>
                  <span className="req">* Min 6 chars</span>
                </label>
                <div className="input-with-icon">
                  <LockIcon size={16} className="field-icon" />
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    className="form-input has-icon"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-phone">
                    <span>Phone number</span>
                    <span className="text-subtle text-xs">Optional</span>
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-avatar">
                    <span>Avatar URL</span>
                    <span className="text-subtle text-xs">Optional</span>
                  </label>
                  <input
                    id="reg-avatar"
                    type="url"
                    className="form-input"
                    placeholder="https://..."
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </div>
              </div>

              <div className="role-preview-pill">
                <span className="role-label">Assigned Role:</span>
                <span className="role-badge">customer (Parent Account)</span>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                <span>Create Family Account</span>
                <ArrowRightIcon size={16} />
              </button>

              <div className="auth-backend-hint">
                <span className="hint-label">Endpoint Contract:</span>
                <code>POST /user/create</code>
              </div>

              <div className="auth-switch-footer">
                <span>Already registered with BloomCare?</span>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setMode("login")}
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Feature Showcase Banner (Clean Stripe/Linear Standard) */}
        <div className="auth-showcase-panel">
          <div className="showcase-content">
            <div className="showcase-badge">
              <ShieldCheckIcon size={14} />
              <span>Production-Grade Maternal Expense Tracker</span>
            </div>

            <h2 className="showcase-title">
              Manage every trimester and milestone with financial clarity.
            </h2>

            <p className="showcase-desc">
              Comprehensive tracking designed specifically for prenatal doctor consultations,
              routine ultrasound scans, lab diagnostics, supplements, and hospital delivery budgeting.
            </p>

            <div className="showcase-feature-list">
              <div className="showcase-feature-item">
                <div className="feature-check-icon">
                  <CheckIcon size={14} />
                </div>
                <div>
                  <h4 className="feature-heading">Trimester-by-Trimester Breakdown</h4>
                  <p className="feature-subtext">
                    Monitor budget pacing across 1st, 2nd, and 3rd trimester medical requirements.
                  </p>
                </div>
              </div>

              <div className="showcase-feature-item">
                <div className="feature-check-icon">
                  <CheckIcon size={14} />
                </div>
                <div>
                  <h4 className="feature-heading">Invoices & Clinical Prescriptions</h4>
                  <p className="feature-subtext">
                    Attach lab reports, anomaly scans, and pharmacy bills with verified documentation.
                  </p>
                </div>
              </div>

              <div className="showcase-feature-item">
                <div className="feature-check-icon">
                  <CheckIcon size={14} />
                </div>
                <div>
                  <h4 className="feature-heading">Insurance & Cashless Claims</h4>
                  <p className="feature-subtext">
                    Track out-of-pocket expenses vs reimbursed maternity claims with ease.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="showcase-quote-card">
              <p className="quote-text">
                "Having all our scans, obstetrician visits, and pharmacy receipts organized in one place
                gave us complete peace of mind throughout our pregnancy."
              </p>
              <div className="quote-author">
                <div className="author-avatar">SJ</div>
                <div>
                  <span className="author-name">Sarah Jenkins</span>
                  <span className="author-role">Expecting Parent • Week 26</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
