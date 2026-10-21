import React from "react";
import { PlusIcon, HeartIcon, UserIcon, LogInIcon, PieChartIcon, LayersIcon, StethoscopeIcon } from "./Icons";

interface NavbarProps {
  activeTab: "dashboard" | "expenses" | "analytics" | "milestones";
  setActiveTab: (tab: "dashboard" | "expenses" | "analytics" | "milestones") => void;
  onOpenAddModal: () => void;
  onOpenAuthModal: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  onOpenAuthModal,
  isLoggedIn = true,
  userName = "Sarah & Alex",
}) => {
  return (
    <header className="navbar-root">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="brand-wrapper" onClick={() => setActiveTab("dashboard")}>
          <div className="brand-icon-box">
            <HeartIcon size={22} className="heart-pulse" />
          </div>
          <div className="brand-text">
            <span className="brand-title">BloomCare</span>
            <span className="brand-subtitle">Maternal & Pregnancy Expense Tracker</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-links">
          <button
            className={`nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayersIcon size={18} />
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-btn ${activeTab === "expenses" ? "active" : ""}`}
            onClick={() => setActiveTab("expenses")}
          >
            <StethoscopeIcon size={18} />
            <span>All Expenses</span>
          </button>
          <button
            className={`nav-btn ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <PieChartIcon size={18} />
            <span>Analytics & Charts</span>
          </button>
        </nav>

        {/* Trimester Milestone Pill & Quick Actions */}
        <div className="navbar-actions">
          <div className="milestone-badge">
            <span className="milestone-dot"></span>
            <span className="milestone-text">Trimester 2 • Week 26</span>
          </div>

          <button className="btn btn-primary" onClick={onOpenAddModal}>
            <PlusIcon size={18} />
            <span>Log Expense</span>
          </button>

          {/* User Auth Profile Trigger */}
          {isLoggedIn ? (
            <div className="user-profile-pill" onClick={onOpenAuthModal} title="User Profile / Switch Account">
              <div className="user-avatar">
                <UserIcon size={16} />
              </div>
              <span className="user-name">{userName}</span>
            </div>
          ) : (
            <button className="btn btn-secondary" onClick={onOpenAuthModal}>
              <LogInIcon size={18} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
