import React, { useState } from "react";
import { CloseIcon, LogInIcon, HeartIcon, SparklesIcon } from "./Icons";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (credentials: { email: string; password: string }) => void;
  onRegister?: (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
  }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}) => {
  const [mode, setMode] = useState<"login" | "register">("login");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ email: loginEmail, password: loginPassword });
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onRegister) {
      onRegister({
        name,
        email: registerEmail,
        password: registerPassword,
        phone,
        avatar,
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-auth" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge">
              <HeartIcon size={20} />
            </div>
            <div>
              <h2 className="modal-title">
                {mode === "login" ? "Welcome Back to BloomCare" : "Create Family Account"}
              </h2>
              <p className="modal-subtitle">
                {mode === "login"
                  ? "Access your maternal records and expense timelines"
                  : "Track all pregnancy and baby milestones in one place"}
              </p>
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Auth Mode Tabs */}
        <div className="auth-tab-row">
          <button
            type="button"
            className={`auth-tab-btn ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === "register" ? "active" : ""}`}
            onClick={() => setMode("register")}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        {mode === "login" ? (
          <form onSubmit={handleLoginSubmit} className="modal-form-body">
            <div className="form-group">
              <label htmlFor="loginEmail" className="form-label">
                <span>Email Address</span>
                <span className="req">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  id="loginEmail"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="parent@bloomcare.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="loginPassword" className="form-label">
                <span>Password</span>
                <span className="req">*</span>
              </label>
              <input
                id="loginPassword"
                name="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-hints-box">
              <span className="text-dim text-xs">
                Maps to backend endpoint: <code>POST /user/login</code>
              </span>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary w-full">
                <LogInIcon size={16} />
                <span>Sign In to BloomCare</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="modal-form-body">
            <div className="form-group">
              <label htmlFor="regName" className="form-label">
                <span>Full Name / Parent Names</span>
                <span className="req">* Min 2 chars</span>
              </label>
              <input
                id="regName"
                name="name"
                type="text"
                className="form-input"
                placeholder="Sarah & Alex Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={2}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="regEmail" className="form-label">
                <span>Email Address</span>
                <span className="req">*</span>
              </label>
              <input
                id="regEmail"
                name="email"
                type="email"
                className="form-input"
                placeholder="sarah@bloomcare.com"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="regPassword" className="form-label">
                <span>Password</span>
                <span className="req">* Min 6 chars</span>
              </label>
              <input
                id="regPassword"
                name="password"
                type="password"
                className="form-input"
                placeholder="Create strong password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="regPhone" className="form-label">
                <span>Phone Number</span>
                <span className="text-dim">Optional</span>
              </label>
              <input
                id="regPhone"
                name="phone"
                type="tel"
                className="form-input"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="regAvatar" className="form-label">
                <span>Avatar Image URL</span>
                <span className="text-dim">Optional</span>
              </label>
              <input
                id="regAvatar"
                name="avatar"
                type="url"
                className="form-input"
                placeholder="https://images.unsplash.com/photo-..."
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>

            <div className="auth-hints-box">
              <span className="text-dim text-xs">
                Maps to backend endpoint: <code>POST /user/create</code>
              </span>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary w-full">
                <SparklesIcon size={16} />
                <span>Create BloomCare Account</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
