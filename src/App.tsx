import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { StatCards } from "./components/StatCards";
import { ExpenseTable } from "./components/ExpenseTable";
import { ExpenseFormModal } from "./components/ExpenseFormModal";
import { ExpenseDetailModal } from "./components/ExpenseDetailModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { AnalyticsView } from "./components/AnalyticsView";
import { AuthModal } from "./components/AuthModal";
import type { IExpense } from "./types/expense";
import "./App.css";

// Realistic sample data strictly conforming to backend models & enums
const INITIAL_EXPENSES: IExpense[] = [
  {
    _id: "exp_001",
    expenseName: "Dr. Maya - Level 2 Anomaly Scan & Consultation",
    amount: 4500,
    category: "Consultation",
    trimester: "Second",
    paymentMethod: "UPI",
    description: "Detailed fetal anatomy assessment, organ development, and cervical screening.",
    notes: "Everything within normal parameters. Fetal weight 420g. Next visit scheduled at 24 weeks.",
    bills: [
      {
        fileName: "Anomaly_Ultrasound_Report.pdf",
        url: "https://example.com/anomaly-report.pdf",
      },
      {
        fileName: "Clinic_Consultation_Invoice.pdf",
        url: "https://example.com/clinic-invoice.pdf",
      },
    ],
    createdAt: "2026-10-14T09:30:00.000Z",
  },
  {
    _id: "exp_002",
    expenseName: "Prenatal Multivitamins & DHA Capsules (3 Months)",
    amount: 2850,
    category: "Medicines",
    trimester: "Second",
    paymentMethod: "Credit Card",
    description: "Active methylfolate, calcium citrate, iron chelate, and plant-based omega-3 DHA.",
    notes: "Take 1 tablet after breakfast with citrus juice for optimal iron absorption.",
    bills: [
      {
        fileName: "Apollo_Pharmacy_Receipt.pdf",
        url: "https://example.com/pharmacy.pdf",
      },
    ],
    createdAt: "2026-10-10T14:15:00.000Z",
  },
  {
    _id: "exp_003",
    expenseName: "Maternity Hospital Delivery Suite Advance Booking",
    amount: 45000,
    category: "Delivery",
    trimester: "Third",
    paymentMethod: "Insurance",
    description: "Cloudnine Hospital private LDR suite reservation and maternity wellness package deposit.",
    notes: "Insurance pre-authorization initiated. Cashless claim filed with MediAssist TPA.",
    bills: [
      {
        fileName: "Hospital_Booking_Voucher.pdf",
        url: "https://example.com/hospital-booking.pdf",
      },
    ],
    createdAt: "2026-10-05T11:00:00.000Z",
  },
  {
    _id: "exp_004",
    expenseName: "NIPT Genetic Screening & Double Marker Test",
    amount: 14500,
    category: "Lab Tests",
    trimester: "First",
    paymentMethod: "Debit Card",
    description: "Non-Invasive Prenatal Testing for chromosomal trisomies and early genetic health markers.",
    notes: "Low risk across all genetic panels. Blood test sample collected at home by Metropolis Labs.",
    bills: [
      {
        fileName: "Metropolis_NIPT_Report.pdf",
        url: "https://example.com/nipt-report.pdf",
      },
    ],
    createdAt: "2026-08-20T16:45:00.000Z",
  },
  {
    _id: "exp_005",
    expenseName: "Organic Pregnancy Nutrition & Protein Supplements",
    amount: 3200,
    category: "Nutrition",
    trimester: "Second",
    paymentMethod: "UPI",
    description: "Whey isolate pregnancy protein mix, walnuts, chia seeds, and cold-pressed almond butter.",
    notes: "Targeting 75g of daily clean protein to support fetal tissue and placental growth.",
    bills: [],
    createdAt: "2026-10-18T18:20:00.000Z",
  },
  {
    _id: "exp_006",
    expenseName: "Ergonomic Nursing Pillow & Nursery Bassinet",
    amount: 12500,
    category: "Baby Essentials",
    trimester: "Third",
    paymentMethod: "Credit Card",
    description: "Breathable mesh bedside bassinet with rocking feature and orthopedic pregnancy pillow.",
    notes: "Set up in master bedroom. Cleaned and pre-washed with hypoallergenic baby laundry detergent.",
    bills: [
      {
        fileName: "FirstCry_BabyCare_Invoice.pdf",
        url: "https://example.com/firstcry-order.pdf",
      },
    ],
    createdAt: "2026-10-19T10:05:00.000Z",
  },
];

export function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "expenses" | "analytics">("dashboard");
  const [expenses, setExpenses] = useState<IExpense[]>(INITIAL_EXPENSES);

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Handlers for pure UI manipulation (without backend calls, as requested)
  const handleOpenAddModal = () => {
    setFormMode("create");
    setSelectedExpense(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (expense: IExpense) => {
    setFormMode("edit");
    setSelectedExpense(expense);
    setIsFormModalOpen(true);
  };

  const handleOpenDetailModal = (expense: IExpense) => {
    setSelectedExpense(expense);
    setIsDetailModalOpen(true);
  };

  const handleOpenDeleteModal = (expense: IExpense) => {
    setSelectedExpense(expense);
    setIsDeleteModalOpen(true);
  };

  // Pure UI mock state updates for design demonstration
  const handleSaveExpense = (expenseData: Partial<IExpense>) => {
    if (formMode === "edit" && selectedExpense) {
      setExpenses((prev) =>
        prev.map((e) =>
          e._id === selectedExpense._id
            ? ({ ...e, ...expenseData, updatedAt: new Date().toISOString() } as IExpense)
            : e
        )
      );
    } else {
      const newEntry: IExpense = {
        _id: `exp_${Date.now()}`,
        expenseName: expenseData.expenseName || "Unnamed Expense",
        amount: Number(expenseData.amount) || 0,
        category: expenseData.category || "Consultation",
        paymentMethod: expenseData.paymentMethod || "UPI",
        trimester: expenseData.trimester || "Second",
        description: expenseData.description,
        notes: expenseData.notes,
        bills: expenseData.bills || [],
        createdAt: new Date().toISOString(),
      };
      setExpenses((prev) => [newEntry, ...prev]);
    }
    setIsFormModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedExpense) {
      setExpenses((prev) => prev.filter((e) => e._id !== selectedExpense._id));
    }
    setIsDeleteModalOpen(false);
    setSelectedExpense(null);
  };

  return (
    <div className="app-container">
      {/* Navbar with brand, tabs, trimester tracker pill, and user profile */}
      <Navbar
        activeTab={activeTab as any}
        setActiveTab={(tab) => setActiveTab(tab as any)}
        onOpenAddModal={handleOpenAddModal}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        isLoggedIn={true}
        userName="Sarah & Alex"
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Page Intro Header */}
        <div className="page-intro">
          <div>
            <h1 className="page-title">
              {activeTab === "dashboard" && "Healthcare & Maternity Finances"}
              {activeTab === "expenses" && "Medical & Expense Records"}
              {activeTab === "analytics" && "Financial Analytics & Insights"}
            </h1>
            <p className="page-desc">
              {activeTab === "dashboard" && "Track prenatal consultations, lab diagnostics, medicines, and delivery milestones."}
              {activeTab === "expenses" && "Search, filter, and inspect detailed receipts and doctor prescriptions."}
              {activeTab === "analytics" && "Breakdown of expenditure across trimesters, medical categories, and payment channels."}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-secondary" onClick={() => setIsAuthModalOpen(true)}>
              Family Account
            </button>
            <button className="btn btn-primary" onClick={handleOpenAddModal}>
              + New Expense
            </button>
          </div>
        </div>

        {/* Render Tab Views */}
        {activeTab === "dashboard" && (
          <>
            {/* Stat Cards Overview */}
            <StatCards expenses={expenses} />

            {/* Expenses Management Table */}
            <ExpenseTable
              expenses={expenses}
              onView={handleOpenDetailModal}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
              onAddNew={handleOpenAddModal}
            />
          </>
        )}

        {activeTab === "expenses" && (
          <ExpenseTable
            expenses={expenses}
            onView={handleOpenDetailModal}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
            onAddNew={handleOpenAddModal}
          />
        )}

        {activeTab === "analytics" && (
          <AnalyticsView expenses={expenses} onOpenAddModal={handleOpenAddModal} />
        )}
      </main>

      {/* Modals for Add/Edit, View Detail, Delete Confirm, and Auth */}
      <ExpenseFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleSaveExpense}
        initialData={selectedExpense}
        mode={formMode}
      />

      <ExpenseDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={handleOpenEditModal}
        expense={selectedExpense}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        expense={selectedExpense}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(creds) => {
          console.log("Login submitted:", creds);
          setIsAuthModalOpen(false);
        }}
        onRegister={(data) => {
          console.log("Register submitted:", data);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;
