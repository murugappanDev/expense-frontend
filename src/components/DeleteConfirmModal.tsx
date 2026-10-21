import React from "react";
import { AlertCircleIcon, TrashIcon, CloseIcon } from "./Icons";
import type { IExpense } from "../types/expense";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  expense: IExpense | null;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge danger">
              <AlertCircleIcon size={20} />
            </div>
            <div>
              <h2 className="modal-title">Delete Expense</h2>
              <p className="modal-subtitle">This action cannot be undone</p>
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="delete-modal-body">
          <p className="delete-warning-text">
            Are you sure you want to permanently remove this pregnancy expense record?
          </p>

          <div className="delete-target-preview">
            <div className="delete-target-name">{expense.expenseName}</div>
            <div className="delete-target-meta">
              <span>{expense.category}</span>
              <span>•</span>
              <span className="tabular-nums font-bold">
                {formatCurrency(Number(expense.amount))}
              </span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            <TrashIcon size={16} />
            <span>Delete Permanently</span>
          </button>
        </div>
      </div>
    </div>
  );
};
