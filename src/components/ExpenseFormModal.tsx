import React, { useState, useEffect } from "react";
import { CloseIcon, UploadCloudIcon, SparklesIcon, FileTextIcon } from "./Icons";
import type { ExpenseCategory, PaymentMethod, Trimester, IExpense, IBill } from "../types/expense";

interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (expenseData: Partial<IExpense>) => void;
  initialData?: IExpense | null;
  mode?: "create" | "edit";
}

const CATEGORIES: ExpenseCategory[] = [
  "Consultation",
  "Medicines",
  "Supplements",
  "Lab Tests",
  "Nutrition",
  "Delivery",
  "Baby Essentials",
  "Travel",
  "Insurance",
  "Others",
];

const PAYMENT_METHODS: PaymentMethod[] = [
  "UPI",
  "Credit Card",
  "Debit Card",
  "Cash",
  "Insurance",
  "Other",
];

const TRIMESTERS: Trimester[] = ["First", "Second", "Third"];

export const ExpenseFormModal: React.FC<ExpenseFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}) => {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [category, setCategory] = useState<ExpenseCategory>("Consultation");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
  const [trimester, setTrimester] = useState<Trimester>("Second");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [bills, setBills] = useState<IBill[]>([]);
  const [newBillUrl, setNewBillUrl] = useState("");
  const [newBillName, setNewBillName] = useState("");

  useEffect(() => {
    if (initialData) {
      setExpenseName(initialData.expenseName || "");
      setAmount(initialData.amount || "");
      setCategory(initialData.category || "Consultation");
      setPaymentMethod(initialData.paymentMethod || "UPI");
      setTrimester(initialData.trimester || "Second");
      setDescription(initialData.description || "");
      setNotes(initialData.notes || "");
      setBills(initialData.bills || []);
    } else {
      setExpenseName("");
      setAmount("");
      setCategory("Consultation");
      setPaymentMethod("UPI");
      setTrimester("Second");
      setDescription("");
      setNotes("");
      setBills([]);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBillName) return;
    setBills([
      ...bills,
      {
        fileName: newBillName,
        url: newBillUrl || "https://example.com/receipt.pdf",
      },
    ]);
    setNewBillName("");
    setNewBillUrl("");
  };

  const handleRemoveBill = (index: number) => {
    setBills(bills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        expenseName,
        amount: Number(amount),
        category,
        paymentMethod,
        trimester,
        description,
        notes,
        bills,
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge">
              <SparklesIcon size={20} />
            </div>
            <div>
              <h2 className="modal-title">
                {mode === "edit" ? "Update Expense Entry" : "Log Pregnancy Expense"}
              </h2>
              <p className="modal-subtitle">
                Record medical visits, tests, vitamins, maternity gear, or delivery packages
              </p>
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="modal-form-body">
          <div className="form-grid-2">
            {/* Expense Name */}
            <div className="form-group span-2">
              <label htmlFor="expenseName" className="form-label">
                <span>Expense / Item Name</span>
                <span className="req">* Required (max 100 chars)</span>
              </label>
              <input
                id="expenseName"
                name="expenseName"
                type="text"
                className="form-input"
                placeholder="e.g. Dr. Maya Anomaly Scan & Consultation"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                maxLength={100}
                required
              />
            </div>

            {/* Amount */}
            <div className="form-group">
              <label htmlFor="amount" className="form-label">
                <span>Amount (₹ / $)</span>
                <span className="req">* Required</span>
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                className="form-input tabular-nums font-bold"
                placeholder="e.g. 4500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                max="1000000000"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                <span>Maternity Category</span>
                <span className="req">* Required</span>
              </label>
              <select
                id="category"
                name="category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Trimester Milestone */}
            <div className="form-group">
              <label htmlFor="trimester" className="form-label">
                <span>Trimester Milestone</span>
              </label>
              <select
                id="trimester"
                name="trimester"
                className="form-select"
                value={trimester}
                onChange={(e) => setTrimester(e.target.value as Trimester)}
              >
                {TRIMESTERS.map((tri) => (
                  <option key={tri} value={tri}>
                    {tri} Trimester
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div className="form-group">
              <label htmlFor="paymentMethod" className="form-label">
                <span>Payment Method</span>
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              >
                {PAYMENT_METHODS.map((pm) => (
                  <option key={pm} value={pm}>
                    {pm}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="form-group span-2">
              <label htmlFor="description" className="form-label">
                <span>Brief Description</span>
                <span className="text-dim">Max 500 chars</span>
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                rows={2}
                placeholder="e.g. Routine 2nd trimester anomaly ultrasound, cervical length check & blood panel"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
              />
            </div>

            {/* Doctor / Medical Notes */}
            <div className="form-group span-2">
              <label htmlFor="notes" className="form-label">
                <span>Doctor Advice / Prescription Notes</span>
                <span className="text-dim">Optional medical notes</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                className="form-textarea"
                rows={2}
                placeholder="e.g. Doctor prescribed Iron + Folate supplement 1x daily after food. Next scan in 4 weeks."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Bills & Reports Attachment Zone */}
            <div className="form-group span-2 bills-section">
              <label className="form-label">
                <span>Receipts, Invoices & Lab Reports</span>
                <span className="text-dim">{bills.length} attached</span>
              </label>

              {/* Bills list */}
              {bills.length > 0 && (
                <div className="bills-list-preview">
                  {bills.map((bill, idx) => (
                    <div key={idx} className="bill-chip-item">
                      <FileTextIcon size={16} />
                      <span className="bill-name">{bill.fileName || `Invoice_${idx + 1}`}</span>
                      <button
                        type="button"
                        className="btn-bill-remove"
                        onClick={() => handleRemoveBill(idx)}
                        title="Remove file"
                      >
                        <CloseIcon size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add bill inputs */}
              <div className="bill-upload-inline">
                <input
                  type="text"
                  className="form-input bill-input"
                  placeholder="File name (e.g. Ultrasound_Report.pdf)"
                  value={newBillName}
                  onChange={(e) => setNewBillName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-input bill-input"
                  placeholder="URL / File Link"
                  value={newBillUrl}
                  onChange={(e) => setNewBillUrl(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleAddBill}
                  disabled={!newBillName}
                >
                  <UploadCloudIcon size={16} />
                  <span>Attach</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <SparklesIcon size={16} />
              <span>{mode === "edit" ? "Save Changes" : "Log Expense"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
