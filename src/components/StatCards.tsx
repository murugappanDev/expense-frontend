import React from "react";
import { TrendingUpIcon, FileTextIcon, ShieldCheckIcon, SparklesIcon } from "./Icons";
import type { IExpense } from "../types/expense";

interface StatCardsProps {
  expenses: IExpense[];
  onOpenAddModal?: () => void;
}

export const StatCards: React.FC<StatCardsProps> = ({ expenses }) => {
  // Aggregate stats directly from expenses
  const totalAmount = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const tri1Total = expenses
    .filter((e) => e.trimester === "First")
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const tri2Total = expenses
    .filter((e) => e.trimester === "Second")
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const tri3Total = expenses
    .filter((e) => e.trimester === "Third")
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const totalBills = expenses.reduce((sum, item) => sum + (item.bills ? item.bills.length : 0), 0);

  const insuranceExpenses = expenses.filter(
    (e) => e.category === "Insurance" || e.paymentMethod === "Insurance"
  );
  const insuranceTotal = insuranceExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="stat-cards-grid">
      {/* Total Tracked Expense */}
      <div className="glass-card stat-card glow-rose">
        <div className="stat-card-header">
          <span className="stat-label">Total Pregnancy Spend</span>
          <div className="stat-icon-badge bg-rose">
            <TrendingUpIcon size={20} />
          </div>
        </div>
        <div className="stat-value tabular-nums">{formatCurrency(totalAmount)}</div>
        <div className="stat-subtext">
          <span className="badge-highlight positive">
            <SparklesIcon size={13} />
            {expenses.length} Records
          </span>
          <span>across all maternity phases</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: "72%" }}></div>
        </div>
      </div>

      {/* Trimester Milestone Breakdown */}
      <div className="glass-card stat-card glow-purple">
        <div className="stat-card-header">
          <span className="stat-label">Trimester Breakdown</span>
          <div className="stat-icon-badge bg-purple">
            <SparklesIcon size={20} />
          </div>
        </div>
        <div className="trimester-metrics-row">
          <div className="tri-metric-item">
            <span className="tri-tag tri-first">1st Tri</span>
            <span className="tri-amount tabular-nums">{formatCurrency(tri1Total)}</span>
          </div>
          <div className="tri-metric-item">
            <span className="tri-tag tri-second">2nd Tri</span>
            <span className="tri-amount tabular-nums">{formatCurrency(tri2Total)}</span>
          </div>
          <div className="tri-metric-item">
            <span className="tri-tag tri-third">3rd Tri</span>
            <span className="tri-amount tabular-nums">{formatCurrency(tri3Total)}</span>
          </div>
        </div>
        <div className="trimester-stacked-bar">
          <div
            className="bar-segment seg-first"
            style={{ width: `${totalAmount > 0 ? (tri1Total / totalAmount) * 100 : 33}%` }}
            title="First Trimester"
          ></div>
          <div
            className="bar-segment seg-second"
            style={{ width: `${totalAmount > 0 ? (tri2Total / totalAmount) * 100 : 33}%` }}
            title="Second Trimester"
          ></div>
          <div
            className="bar-segment seg-third"
            style={{ width: `${totalAmount > 0 ? (tri3Total / totalAmount) * 100 : 34}%` }}
            title="Third Trimester"
          ></div>
        </div>
      </div>

      {/* Insurance & Claims */}
      <div className="glass-card stat-card glow-emerald">
        <div className="stat-card-header">
          <span className="stat-label">Insurance / Claims</span>
          <div className="stat-icon-badge bg-emerald">
            <ShieldCheckIcon size={20} />
          </div>
        </div>
        <div className="stat-value tabular-nums">{formatCurrency(insuranceTotal)}</div>
        <div className="stat-subtext">
          <span className="badge-highlight neutral">{insuranceExpenses.length} Claims Tagged</span>
          <span>Cashless & Reimbursements</span>
        </div>
      </div>

      {/* Receipts & Medical Reports */}
      <div className="glass-card stat-card glow-blue">
        <div className="stat-card-header">
          <span className="stat-label">Invoices & Prescriptions</span>
          <div className="stat-icon-badge bg-blue">
            <FileTextIcon size={20} />
          </div>
        </div>
        <div className="stat-value tabular-nums">{totalBills}</div>
        <div className="stat-subtext">
          <span className="badge-highlight positive">Backed with Bills</span>
          <span>Ultrasounds & Lab Invoices</span>
        </div>
      </div>
    </section>
  );
};
