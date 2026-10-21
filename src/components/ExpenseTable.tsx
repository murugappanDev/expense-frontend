import React, { useState, useMemo } from "react";
import {
  SearchIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  FileTextIcon,
  StethoscopeIcon,
  PillIcon,
  BabyIcon,
  ShieldCheckIcon,
  SparklesIcon,
  PlusIcon,
} from "./Icons";
import type { ExpenseCategory, IExpense } from "../types/expense";

interface ExpenseTableProps {
  expenses: IExpense[];
  onView: (expense: IExpense) => void;
  onEdit: (expense: IExpense) => void;
  onDelete: (expense: IExpense) => void;
  onAddNew: () => void;
}

const CATEGORY_ICONS: Record<ExpenseCategory, React.ReactNode> = {
  Consultation: <StethoscopeIcon size={14} />,
  Medicines: <PillIcon size={14} />,
  Supplements: <SparklesIcon size={14} />,
  "Lab Tests": <EyeIcon size={14} />,
  Nutrition: <SparklesIcon size={14} />,
  Delivery: <BabyIcon size={14} />,
  "Baby Essentials": <BabyIcon size={14} />,
  Travel: <SparklesIcon size={14} />,
  Insurance: <ShieldCheckIcon size={14} />,
  Others: <FileTextIcon size={14} />,
};

const CATEGORY_CLASSES: Record<ExpenseCategory, string> = {
  Consultation: "cat-consultation",
  Medicines: "cat-medicines",
  Supplements: "cat-supplements",
  "Lab Tests": "cat-labtests",
  Nutrition: "cat-nutrition",
  Delivery: "cat-delivery",
  "Baby Essentials": "cat-babyessentials",
  Travel: "cat-travel",
  Insurance: "cat-insurance",
  Others: "cat-others",
};

export const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onView,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTrimester, setSelectedTrimester] = useState<string>("All");
  const [selectedPayment, setSelectedPayment] = useState<string>("All");

  const filteredExpenses = useMemo(() => {
    return expenses.filter((item) => {
      const matchSearch =
        item.expenseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchTrimester = selectedTrimester === "All" || item.trimester === selectedTrimester;
      const matchPayment = selectedPayment === "All" || item.paymentMethod === selectedPayment;

      return matchSearch && matchCategory && matchTrimester && matchPayment;
    });
  }, [expenses, searchTerm, selectedCategory, selectedTrimester, selectedPayment]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Just now";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="glass-card table-section">
      {/* Table Section Header & Filter Toolbar */}
      <div className="table-toolbar">
        <div className="search-box">
          <SearchIcon size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by expense, scan, doctor or medicine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>

        <div className="filters-row">
          {/* Trimester Filter */}
          <div className="filter-select-wrap">
            <span className="filter-label">Trimester:</span>
            <select
              className="form-select filter-select"
              value={selectedTrimester}
              onChange={(e) => setSelectedTrimester(e.target.value)}
            >
              <option value="All">All Trimesters</option>
              <option value="First">1st Trimester</option>
              <option value="Second">2nd Trimester</option>
              <option value="Third">3rd Trimester</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="filter-select-wrap">
            <span className="filter-label">Category:</span>
            <select
              className="form-select filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Consultation">Consultation</option>
              <option value="Medicines">Medicines</option>
              <option value="Supplements">Supplements</option>
              <option value="Lab Tests">Lab Tests</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Delivery">Delivery</option>
              <option value="Baby Essentials">Baby Essentials</option>
              <option value="Travel">Travel</option>
              <option value="Insurance">Insurance</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Payment Method Filter */}
          <div className="filter-select-wrap">
            <span className="filter-label">Payment:</span>
            <select
              className="form-select filter-select"
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
            >
              <option value="All">All Payments</option>
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash">Cash</option>
              <option value="Insurance">Insurance</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Expense / Item</th>
              <th>Category</th>
              <th>Trimester</th>
              <th>Payment</th>
              <th>Invoices</th>
              <th className="text-right">Amount</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((item, idx) => (
                <tr key={item._id || idx} className="table-row-hover">
                  {/* Expense Name & Description */}
                  <td className="expense-primary-cell">
                    <div className="expense-title-text">{item.expenseName}</div>
                    {item.description && (
                      <div className="expense-desc-subtext">{item.description}</div>
                    )}
                  </td>

                  {/* Category */}
                  <td>
                    <span className={`category-badge ${CATEGORY_CLASSES[item.category] || "cat-others"}`}>
                      {CATEGORY_ICONS[item.category]}
                      <span>{item.category}</span>
                    </span>
                  </td>

                  {/* Trimester */}
                  <td>
                    {item.trimester ? (
                      <span
                        className={`trimester-pill ${
                          item.trimester === "First"
                            ? "tri-first"
                            : item.trimester === "Second"
                            ? "tri-second"
                            : "tri-third"
                        }`}
                      >
                        {item.trimester} Tri
                      </span>
                    ) : (
                      <span className="text-dim text-xs">—</span>
                    )}
                  </td>

                  {/* Payment Method */}
                  <td>
                    <span className="payment-badge">
                      {item.paymentMethod || "UPI"}
                    </span>
                  </td>

                  {/* Invoices */}
                  <td>
                    {item.bills && item.bills.length > 0 ? (
                      <span className="invoices-count-pill" title={`${item.bills.length} attached bills`}>
                        <FileTextIcon size={14} />
                        <span>{item.bills.length}</span>
                      </span>
                    ) : (
                      <span className="text-dim text-xs">—</span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="text-right">
                    <span className="expense-amount-highlight tabular-nums">
                      {formatCurrency(Number(item.amount))}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="text-muted text-sm whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </td>

                  {/* Action buttons */}
                  <td className="text-center">
                    <div className="action-buttons-group">
                      <button
                        className="btn-action-icon view"
                        onClick={() => onView(item)}
                        title="View Full Details"
                      >
                        <EyeIcon size={16} />
                      </button>
                      <button
                        className="btn-action-icon edit"
                        onClick={() => onEdit(item)}
                        title="Edit Expense"
                      >
                        <EditIcon size={16} />
                      </button>
                      <button
                        className="btn-action-icon delete"
                        onClick={() => onDelete(item)}
                        title="Delete Expense"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <div className="empty-state-wrap">
                    <div className="empty-icon-box">
                      <BabyIcon size={44} />
                    </div>
                    {/* Exact backend message when array is empty */}
                    <h3 className="empty-title">Can you Please create a expense</h3>
                    <p className="empty-desc">
                      No expense records found. Begin logging consultations, prenatal vitamins, scans, or hospital packages!
                    </p>
                    <button className="btn btn-primary" onClick={onAddNew}>
                      <PlusIcon size={18} />
                      <span>Log First Expense</span>
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer info */}
      <div className="table-footer">
        <span className="footer-count">
          Showing {filteredExpenses.length} of {expenses.length} maternal expenses
        </span>
        <div className="quick-tip-banner">
          <SparklesIcon size={14} />
          <span>Tip: Filter by Trimester to assess budget pacing per pregnancy phase</span>
        </div>
      </div>
    </section>
  );
};
