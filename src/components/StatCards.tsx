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
      <div className="surface-card stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Total Spend</span>
          <div className="stat-icon-badge">
            <TrendingUpIcon size={16} />
          </div>
        </div>
        <div className="stat-value tabular-nums">{formatCurrency(totalAmount)}</div>
        <div className="stat-subtext">
          <span className="badge-highlight neutral">
            {expenses.length} Entries
          </span>
          <span>Documented</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: "100%" }}></div>
        </div>
      </div>

      {/* Trimester Milestone Breakdown */}
      <div className="surface-card stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Trimester Allocation</span>
          <div className="stat-icon-badge">
            <SparklesIcon size={16} />
          </div>
        </div>
        <div className="trimester-metrics-row">
          <div className="tri-metric-item">
            <span className="tri-tag">T1</span>
            <span className="tri-amount tabular-nums">{formatCurrency(tri1Total)}</span>
          </div>
          <div className="tri-metric-item">
            <span className="tri-tag">T2</span>
            <span className="tri-amount tabular-nums">{formatCurrency(tri2Total)}</span>
          </div>
          <div className="tri-metric-item">
            <span className="tri-tag">T3</span>
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
      <div className="surface-card stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Insurance Covered</span>
          <div className="stat-icon-badge">
            <ShieldCheckIcon size={16} />
          </div>
        </div>
        <div className="stat-value tabular-nums">{formatCurrency(insuranceTotal)}</div>
        <div className="stat-subtext">
          <span className="badge-highlight positive">{insuranceExpenses.length} Claims</span>
          <span>Filed with TPA</span>
        </div>
      </div>

      {/* Receipts & Medical Reports */}
      <div className="surface-card stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Attached Invoices</span>
          <div className="stat-icon-badge">
            <FileTextIcon size={16} />
          </div>
        </div>
        <div className="stat-value tabular-nums">{totalBills}</div>
        <div className="stat-subtext">
          <span className="badge-highlight neutral">Verified Docs</span>
          <span>Prescriptions & Scans</span>
        </div>
      </div>
    </section>
  );
};
