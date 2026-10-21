import React from "react";
import { PieChartIcon, ShieldCheckIcon, BabyIcon, SparklesIcon } from "./Icons";
import type { IExpense, ExpenseCategory, Trimester, PaymentMethod } from "../types/expense";

interface AnalyticsViewProps {
  expenses: IExpense[];
  onOpenAddModal?: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ expenses }) => {
  const totalAmount = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  // Group by category (mirrors $facet.categoryResult)
  const categoryTotals: Record<ExpenseCategory, number> = {
    Consultation: 0,
    Medicines: 0,
    Supplements: 0,
    "Lab Tests": 0,
    Nutrition: 0,
    Delivery: 0,
    "Baby Essentials": 0,
    Travel: 0,
    Insurance: 0,
    Others: 0,
  };

  // Group by trimester (mirrors $facet.trimesterResult)
  const trimesterTotals: Record<Trimester, number> = {
    First: 0,
    Second: 0,
    Third: 0,
  };

  // Group by payment method (mirrors $facet.paymentResult)
  const paymentTotals: Record<PaymentMethod, number> = {
    Cash: 0,
    UPI: 0,
    "Credit Card": 0,
    "Debit Card": 0,
    Insurance: 0,
    Other: 0,
  };

  expenses.forEach((item) => {
    const amt = Number(item.amount) || 0;
    if (item.category && categoryTotals[item.category] !== undefined) {
      categoryTotals[item.category] += amt;
    } else {
      categoryTotals.Others += amt;
    }

    if (item.trimester && trimesterTotals[item.trimester] !== undefined) {
      trimesterTotals[item.trimester] += amt;
    }

    if (item.paymentMethod && paymentTotals[item.paymentMethod] !== undefined) {
      paymentTotals[item.paymentMethod] += amt;
    } else {
      paymentTotals.UPI += amt;
    }
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const calculatePct = (amount: number) => {
    if (totalAmount === 0) return 0;
    return Math.round((amount / totalAmount) * 100);
  };

  // Sort categories by highest spend
  const sortedCategories = (Object.keys(categoryTotals) as ExpenseCategory[])
    .map((cat) => ({
      category: cat,
      amount: categoryTotals[cat],
      pct: calculatePct(categoryTotals[cat]),
    }))
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const sortedPayments = (Object.keys(paymentTotals) as PaymentMethod[])
    .map((pm) => ({
      method: pm,
      amount: paymentTotals[pm],
      pct: calculatePct(paymentTotals[pm]),
    }))
    .filter((p) => p.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="analytics-container">
      {/* Top Banner / Summary */}
      <div className="analytics-header-banner surface-card">
        <div>
          <span className="badge-highlight neutral">
            <PieChartIcon size={14} /> Aggregation Analytics
          </span>
          <h2 className="banner-title">Maternal Healthcare Financial Overview</h2>
          <p className="banner-desc">
            Visualizing backend aggregation facets: category totals, trimester distribution, and payment channel analytics.
          </p>
        </div>
        <div className="banner-total-box">
          <span className="banner-total-label">Total Documented Spend</span>
          <span className="banner-total-value tabular-nums">{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      {/* Grid: Trimester Breakdown & Milestone Roadmap */}
      <div className="analytics-grid-2">
        {/* Trimester Facet Result */}
        <div className="surface-card analytics-card">
          <div className="card-header-styled">
            <div className="icon-wrap-pink">
              <SparklesIcon size={18} />
            </div>
            <div>
              <h3 className="card-styled-title">Trimester Milestone Comparison</h3>
              <p className="card-styled-desc">Spend allocation across pregnancy phases</p>
            </div>
          </div>

          <div className="trimester-cards-list">
            {/* First Trimester */}
            <div className="tri-stat-item">
              <div className="tri-stat-top">
                <span className="trimester-pill tri-first">First Trimester</span>
                <span className="tri-pct-badge">{calculatePct(trimesterTotals.First)}%</span>
              </div>
              <div className="tri-stat-bottom">
                <span className="tri-amount-large tabular-nums">
                  {formatCurrency(trimesterTotals.First)}
                </span>
                <span className="tri-subnote">NIPT, Early Scans & Prenatal vitamins</span>
              </div>
              <div className="meter-track">
                <div
                  className="meter-fill fill-cyan"
                  style={{ width: `${calculatePct(trimesterTotals.First)}%` }}
                ></div>
              </div>
            </div>

            {/* Second Trimester */}
            <div className="tri-stat-item">
              <div className="tri-stat-top">
                <span className="trimester-pill tri-second">Second Trimester</span>
                <span className="tri-pct-badge">{calculatePct(trimesterTotals.Second)}%</span>
              </div>
              <div className="tri-stat-bottom">
                <span className="tri-amount-large tabular-nums">
                  {formatCurrency(trimesterTotals.Second)}
                </span>
                <span className="tri-subnote">Anomaly Scan, Fetal Echo, Nursery & Wardrobe</span>
              </div>
              <div className="meter-track">
                <div
                  className="meter-fill fill-amber"
                  style={{ width: `${calculatePct(trimesterTotals.Second)}%` }}
                ></div>
              </div>
            </div>

            {/* Third Trimester */}
            <div className="tri-stat-item">
              <div className="tri-stat-top">
                <span className="trimester-pill tri-third">Third Trimester</span>
                <span className="tri-pct-badge">{calculatePct(trimesterTotals.Third)}%</span>
              </div>
              <div className="tri-stat-bottom">
                <span className="tri-amount-large tabular-nums">
                  {formatCurrency(trimesterTotals.Third)}
                </span>
                <span className="tri-subnote">Delivery Package, Stem Cell Banking, Postpartum</span>
              </div>
              <div className="meter-track">
                <div
                  className="meter-fill fill-rose"
                  style={{ width: `${calculatePct(trimesterTotals.Third)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Facet Result */}
        <div className="surface-card analytics-card">
          <div className="card-header-styled">
            <div className="icon-wrap-emerald">
              <ShieldCheckIcon size={18} />
            </div>
            <div>
              <h3 className="card-styled-title">Payment Channel Distribution</h3>
              <p className="card-styled-desc">Cashless UPI, Cards, and Insurance coverage</p>
            </div>
          </div>

          <div className="payment-distribution-list">
            {sortedPayments.length > 0 ? (
              sortedPayments.map((item) => (
                <div key={item.method} className="payment-row-card">
                  <div className="payment-row-info">
                    <span className="payment-badge-lg">{item.method}</span>
                    <div className="payment-amounts">
                      <span className="payment-val tabular-nums">{formatCurrency(item.amount)}</span>
                      <span className="payment-pct">{item.pct}%</span>
                    </div>
                  </div>
                  <div className="meter-track">
                    <div
                      className="meter-fill fill-purple"
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-dim text-sm text-center py-4">No payment method data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Category Breakdown ($facet.categoryResult) */}
      <div className="surface-card analytics-card mt-6">
        <div className="card-header-styled">
          <div className="icon-wrap-purple">
            <BabyIcon size={18} />
          </div>
          <div>
            <h3 className="card-styled-title">Spend by Maternity Category</h3>
            <p className="card-styled-desc">
              Detailed breakdown of hospital, diagnostics, medication, nutrition, and baby gear
            </p>
          </div>
        </div>

        <div className="category-meters-grid">
          {sortedCategories.length > 0 ? (
            sortedCategories.map((item) => (
              <div key={item.category} className="cat-meter-card">
                <div className="cat-meter-header">
                  <span className="cat-meter-name">{item.category}</span>
                  <div className="cat-meter-meta">
                    <span className="cat-meter-amount tabular-nums">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="cat-meter-pct">{item.pct}%</span>
                  </div>
                </div>
                <div className="meter-track">
                  <div
                    className="meter-fill fill-gradient-rose"
                    style={{ width: `${item.pct}%` }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-dim text-sm text-center py-4 col-span-2">No category data recorded yet</p>
          )}
        </div>
      </div>
    </div>
  );
};
