import React from "react";
import { CloseIcon, EditIcon, FileTextIcon, HeartIcon } from "./Icons";
import type { IExpense } from "../types/expense";

interface ExpenseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (expense: IExpense) => void;
  expense: IExpense | null;
}

export const ExpenseDetailModal: React.FC<ExpenseDetailModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  expense,
}) => {
  if (!isOpen || !expense) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-md" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge">
              <HeartIcon size={20} />
            </div>
            <div>
              <h2 className="modal-title">Expense Summary</h2>
              <p className="modal-subtitle">Comprehensive record and medical documentation</p>
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="detail-modal-body">
          {/* Main Hero Card inside modal */}
          <div className="detail-hero-card">
            <div className="detail-hero-left">
              <span className="detail-category-badge">{expense.category}</span>
              <h3 className="detail-name-text">{expense.expenseName}</h3>
              {expense.trimester && (
                <span className="detail-trimester-tag">
                  {expense.trimester} Trimester Milestone
                </span>
              )}
            </div>
            <div className="detail-hero-right">
              <span className="detail-amount-label">Amount</span>
              <span className="detail-amount-number tabular-nums">
                {formatCurrency(Number(expense.amount))}
              </span>
            </div>
          </div>

          {/* Key Attributes Grid */}
          <div className="detail-attributes-grid">
            <div className="detail-attr-card">
              <span className="attr-label">Payment Mode</span>
              <span className="attr-value">{expense.paymentMethod || "UPI"}</span>
            </div>
            <div className="detail-attr-card">
              <span className="attr-label">Recorded At</span>
              <span className="attr-value">{formatDate(expense.createdAt)}</span>
            </div>
            {expense.updatedAt && (
              <div className="detail-attr-card">
                <span className="attr-label">Last Updated</span>
                <span className="attr-value">{formatDate(expense.updatedAt)}</span>
              </div>
            )}
            <div className="detail-attr-card">
              <span className="attr-label">Record ID</span>
              <span className="attr-value mono-text">{expense._id || "exp_draft_preview"}</span>
            </div>
          </div>

          {/* Description */}
          {expense.description && (
            <div className="detail-section-block">
              <span className="section-block-title">Description</span>
              <p className="section-block-text">{expense.description}</p>
            </div>
          )}

          {/* Medical / Doctor Notes */}
          {expense.notes && (
            <div className="detail-section-block doctor-notes-box">
              <span className="section-block-title doctor-title">
                Doctor Instructions / Clinical Observations
              </span>
              <p className="section-block-text">{expense.notes}</p>
            </div>
          )}

          {/* Attached Bills & Prescriptions */}
          <div className="detail-section-block">
            <span className="section-block-title">
              Attached Bills & Prescriptions ({expense.bills?.length || 0})
            </span>
            {expense.bills && expense.bills.length > 0 ? (
              <div className="detail-bills-grid">
                {expense.bills.map((bill, index) => (
                  <div key={index} className="detail-bill-card">
                    <div className="bill-icon-holder">
                      <FileTextIcon size={20} />
                    </div>
                    <div className="bill-info-text">
                      <span className="bill-card-name">
                        {bill.fileName || `Invoice_Document_${index + 1}`}
                      </span>
                      {bill.url && (
                        <a
                          href={bill.url}
                          target="_blank"
                          rel="noreferrer"
                          className="bill-card-link"
                        >
                          View Document ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-dim text-sm">No bill attachments provided for this expense.</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(expense);
            }}
          >
            <EditIcon size={16} />
            <span>Edit Entry</span>
          </button>
        </div>
      </div>
    </div>
  );
};
