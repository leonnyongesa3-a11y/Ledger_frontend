import { useState, type ReactNode } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

type NavItemId = "dashboard" | "transactions" | "savings" | "profile"
type TxType = "credit" | "debit"

interface Transaction {
  id: string; merchant: string; category: string; date: string
  amount: number; type: TxType; icon: string
}
interface BudgetEntry { category: string; spent: number; limit: number; color: string }

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES = ["Groceries", "Dining", "Transport", "Shopping", "Subscriptions", "Health", "Utilities", "Other"]
const CATEGORY_COLORS: Record<string, string> = {
  Groceries: "#10d876", Dining: "#f59e0b", Transport: "#3b82f6",
  Shopping: "#f43f5e", Subscriptions: "#a855f7", Health: "#14b8a6",
  Utilities: "#f97316", Other: "#8892aa",
}
const CATEGORY_ICONS: Record<string, string> = {
  Groceries: "🛒", Dining: "🌯", Transport: "🚗", Shopping: "📦",
  Subscriptions: "📺", Health: "🏋️", Utilities: "⚡", Other: "💡",
  Income: "💳",
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}
function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="3" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="3" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="3" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}
function ArrowUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
    </svg>
  )
}
function PiggyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 10c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 2.39 1.2 4.5 3 5.74V19a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.26c1.8-1.24 3-3.35 3-5.74z" />
      <path d="M12 6v4" /><path d="M10 10h4" />
      <path d="M19 10h2" /><path d="M9 19v2" /><path d="M15 19v2" />
    </svg>
  )
}
function ArrowDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
    </svg>
  )
}

// ─── Nav config ───────────────────────────────────────────────────────────────

const NAV: { id: NavItemId; label: string; icon: () => ReactNode }[] = [
  { id: "dashboard",    label: "Dashboard",    icon: GridIcon },
  { id: "transactions", label: "Transactions", icon: ListIcon },
  { id: "savings",      label: "Savings",      icon: PiggyIcon },
  { id: "profile",      label: "Profile",      icon: UserIcon },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 2): string {
  return Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}
function parseAmount(s: string): number {
  const n = parseFloat(s.replace(/[^0-9.]/g, ""))
  return isNaN(n) ? 0 : n
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--color-muted)" }}>{label}</label>
      {children}
    </div>
  )
}

function Input({ value, onChange, placeholder, prefix }: {
  value: string; onChange: (v: string) => void; placeholder?: string; prefix?: string
}) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
      style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-bright)" }}
    >
      {prefix && <span className="text-sm flex-shrink-0" style={{ color: "var(--color-muted)" }}>{prefix}</span>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm"
        style={{ color: "var(--color-text)" }}
      />
    </div>
  )
}

function Select({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: string[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2.5 rounded-lg text-sm outline-none appearance-none"
      style={{
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-border-bright)",
        color: "var(--color-text)",
        width: "100%",
      }}
    >
      {options.map((o) => <option key={o} value={o} style={{ background: "var(--color-surface)" }}>{o}</option>)}
    </select>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

interface DashboardData {
  netWorth: string
  monthlyIncome: string
  monthlyExpenses: string
  budgets: BudgetEntry[]
  weeklySpend: { week: string; amount: string }[]
}

const DEFAULT_DASHBOARD: DashboardData = {
  netWorth: "",
  monthlyIncome: "",
  monthlyExpenses: "",
  budgets: CATEGORIES.slice(0, 4).map((c) => ({ category: c, spent: 0, limit: 0, color: CATEGORY_COLORS[c] })),
  weeklySpend: [
    { week: "W1", amount: "" },
    { week: "W2", amount: "" },
    { week: "W3", amount: "" },
    { week: "W4", amount: "" },
  ],
}

function KpiCard({ label, value, accent, delta }: { label: string; value: string; accent?: string; delta?: number }) {
  const positive = delta === undefined || delta >= 0
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
    >
      <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--color-muted)" }}>{label}</span>
      <span className="text-3xl font-bold tracking-tight font-mono" style={{ color: accent ?? "var(--color-text)" }}>
        {value || <span style={{ color: "var(--color-dim)" }}>—</span>}
      </span>
      {delta !== undefined && (
        <div className="flex items-center gap-1.5">
          <span
            className="flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-md"
            style={{
              color: positive ? "var(--color-green)" : "var(--color-red)",
              background: positive ? "var(--color-green-dim)" : "var(--color-red-dim)",
            }}
          >
            {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {Math.abs(delta).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  )
}

function Dashboard() {
  const [data, setData] = useState<DashboardData>(DEFAULT_DASHBOARD)
  const [editSection, setEditSection] = useState<string | null>(null)

  const income = parseAmount(data.monthlyIncome)
  const expenses = parseAmount(data.monthlyExpenses)
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : null

  const weekAmounts = data.weeklySpend.map((w) => parseAmount(w.amount))
  const weekMax = Math.max(...weekAmounts, 1)

  function setBudgetField(i: number, field: "spent" | "limit", val: string) {
    setData((d) => {
      const budgets = [...d.budgets]
      budgets[i] = { ...budgets[i], [field]: parseAmount(val) }
      return { ...d, budgets }
    })
  }

  const isEditing = editSection !== null

  return (
    <div className="flex flex-col gap-6">
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Net Worth"        value={data.netWorth ? `$${fmt(parseAmount(data.netWorth), 0)}` : ""} />
        <KpiCard label="Monthly Income"   value={data.monthlyIncome ? `$${fmt(income, 0)}` : ""}   accent="var(--color-green)" />
        <KpiCard label="Monthly Expenses" value={data.monthlyExpenses ? `$${fmt(expenses, 0)}` : ""} />
        <KpiCard
          label="Savings Rate"
          value={savingsRate !== null ? `${savingsRate.toFixed(1)}%` : ""}
          accent="var(--color-blue)"
        />
      </div>

      {/* Overview inputs */}
      <div
        className="rounded-xl"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 cursor-pointer"
          style={{ borderBottom: editSection === "overview" ? "1px solid var(--color-border)" : undefined }}
          onClick={() => setEditSection(editSection === "overview" ? null : "overview")}
        >
          <h2 className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>Overview</h2>
          <span className="text-xs" style={{ color: "var(--color-muted)" }}>
            {editSection === "overview" ? "Collapse ↑" : "Edit ↓"}
          </span>
        </div>
        {editSection === "overview" && (
          <div className="px-5 py-5 grid grid-cols-3 gap-4">
            <Field label="Net Worth">
              <Input value={data.netWorth} onChange={(v) => setData((d) => ({ ...d, netWorth: v }))} placeholder="0.00" prefix="$" />
            </Field>
            <Field label="Monthly Income">
              <Input value={data.monthlyIncome} onChange={(v) => setData((d) => ({ ...d, monthlyIncome: v }))} placeholder="0.00" prefix="$" />
            </Field>
            <Field label="Monthly Expenses">
              <Input value={data.monthlyExpenses} onChange={(v) => setData((d) => ({ ...d, monthlyExpenses: v }))} placeholder="0.00" prefix="$" />
            </Field>
          </div>
        )}
      </div>

      {/* Middle row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 380px" }}>
        {/* Budget inputs */}
        <div
          className="rounded-xl flex flex-col"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <h2 className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>Budget</h2>
            <button
              onClick={() => {
                const next = CATEGORIES.find((c) => !data.budgets.find((b) => b.category === c))
                if (next) setData((d) => ({
                  ...d,
                  budgets: [...d.budgets, { category: next, spent: 0, limit: 0, color: CATEGORY_COLORS[next] }]
                }))
              }}
              className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--color-green)" }}
            >
              <PlusIcon /> Add category
            </button>
          </div>

          <div className="flex flex-col divide-y" style={{ borderColor: "var(--color-border)" }}>
            {data.budgets.length === 0 && (
              <div className="px-5 py-8 text-center text-sm" style={{ color: "var(--color-dim)" }}>
                No budget categories yet — click "Add category" to start.
              </div>
            )}
            {data.budgets.map((b, i) => {
              const pct = b.limit > 0 ? Math.min((b.spent / b.limit) * 100, 100) : 0
              const over = b.limit > 0 && b.spent > b.limit * 0.9
              return (
                <div key={b.category} className="px-5 py-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <select
                        value={b.category}
                        onChange={(e) => setData((d) => {
                          const budgets = [...d.budgets]
                          const cat = e.target.value
                          budgets[i] = { ...budgets[i], category: cat, color: CATEGORY_COLORS[cat] }
                          return { ...d, budgets }
                        })}
                        className="text-sm font-medium bg-transparent outline-none appearance-none truncate"
                        style={{ color: b.color }}
                      >
                        {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: "var(--color-surface)", color: "var(--color-text)" }}>{c}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div
                        className="flex items-center gap-1.5 px-2 py-1 rounded"
                        style={{ background: "var(--color-surface-2)" }}
                      >
                        <span className="text-xs" style={{ color: "var(--color-muted)" }}>Spent $</span>
                        <input
                          type="text"
                          value={b.spent || ""}
                          onChange={(e) => setBudgetField(i, "spent", e.target.value)}
                          placeholder="0"
                          className="w-16 bg-transparent outline-none text-sm font-mono text-right"
                          style={{ color: over ? "var(--color-red)" : "var(--color-text)" }}
                        />
                      </div>
                      <div
                        className="flex items-center gap-1.5 px-2 py-1 rounded"
                        style={{ background: "var(--color-surface-2)" }}
                      >
                        <span className="text-xs" style={{ color: "var(--color-muted)" }}>Limit $</span>
                        <input
                          type="text"
                          value={b.limit || ""}
                          onChange={(e) => setBudgetField(i, "limit", e.target.value)}
                          placeholder="0"
                          className="w-16 bg-transparent outline-none text-sm font-mono text-right"
                          style={{ color: "var(--color-text)" }}
                        />
                      </div>
                      <button
                        onClick={() => setData((d) => ({ ...d, budgets: d.budgets.filter((_, j) => j !== i) }))}
                        className="transition-colors hover:text-red-400"
                        style={{ color: "var(--color-dim)" }}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                  {b.limit > 0 && (
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-surface-2)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${pct}%`, background: over ? "var(--color-red)" : b.color }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Weekly spend */}
        <div
          className="rounded-xl px-5 py-4 flex flex-col gap-4"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <h2 className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>Weekly Spend</h2>
          <div className="flex flex-col gap-3">
            {data.weeklySpend.map((w, i) => (
              <div key={w.week} className="flex items-center gap-3">
                <span className="text-xs font-mono w-6 flex-shrink-0" style={{ color: "var(--color-muted)" }}>{w.week}</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-surface-2)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: weekAmounts[i] > 0 ? `${(weekAmounts[i] / weekMax) * 100}%` : "0%",
                      background: "var(--color-blue)",
                    }}
                  />
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded flex-shrink-0"
                  style={{ background: "var(--color-surface-2)", minWidth: 80 }}
                >
                  <span className="text-xs" style={{ color: "var(--color-muted)" }}>$</span>
                  <input
                    type="text"
                    value={w.amount}
                    onChange={(e) => setData((d) => {
                      const weeklySpend = [...d.weeklySpend]
                      weeklySpend[i] = { ...weeklySpend[i], amount: e.target.value }
                      return { ...d, weeklySpend }
                    })}
                    placeholder="0"
                    className="w-14 bg-transparent outline-none text-sm font-mono text-right"
                    style={{ color: "var(--color-text)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Transactions page ────────────────────────────────────────────────────────

const BLANK_TX = { merchant: "", category: "Groceries", date: "", amount: "", type: "debit" as TxType }

function Transactions() {
  const [items, setItems] = useState<Transaction[]>([])
  const [form, setForm] = useState(BLANK_TX)
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all")

  function addTx() {
    if (!form.merchant || !form.amount || !form.date) return
    const tx: Transaction = {
      id: Date.now().toString(),
      merchant: form.merchant,
      category: form.type === "credit" ? "Income" : form.category,
      date: form.date,
      amount: parseAmount(form.amount),
      type: form.type,
      icon: form.type === "credit" ? "💳" : (CATEGORY_ICONS[form.category] ?? "💡"),
    }
    setItems((prev) => [tx, ...prev])
    setForm(BLANK_TX)
  }

  const visible = items.filter((t) => filter === "all" || t.type === filter)
  const totalIn  = items.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0)
  const totalOut = items.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Summary chips */}
      {items.length > 0 && (
        <div className="flex gap-3">
          {[
            { label: "Total In",  value: `+$${fmt(totalIn)}`,  color: "var(--color-green)", bg: "var(--color-green-dim)" },
            { label: "Total Out", value: `-$${fmt(totalOut)}`, color: "var(--color-red)",   bg: "var(--color-red-dim)" },
            { label: "Net",       value: `${totalIn - totalOut >= 0 ? "+" : ""}$${fmt(totalIn - totalOut)}`,
              color: totalIn >= totalOut ? "var(--color-green)" : "var(--color-red)",
              bg: totalIn >= totalOut ? "var(--color-green-dim)" : "var(--color-red-dim)" },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: bg }}>
              <span className="text-xs" style={{ color: "var(--color-muted)" }}>{label}</span>
              <span className="text-sm font-bold font-mono" style={{ color }}>{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Add transaction form */}
      <div
        className="rounded-xl p-5 flex flex-col gap-4"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <h2 className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>Add Transaction</h2>
        <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 160px 140px 140px 120px auto" }}>
          <Field label="Merchant / Description">
            <Input
              value={form.merchant}
              onChange={(v) => setForm((f) => ({ ...f, merchant: v }))}
              placeholder="e.g. Whole Foods"
            />
          </Field>
          <Field label="Date">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border-bright)",
                color: "var(--color-text)",
                colorScheme: "dark",
              }}
            />
          </Field>
          <Field label="Amount">
            <Input
              value={form.amount}
              onChange={(v) => setForm((f) => ({ ...f, amount: v }))}
              placeholder="0.00"
              prefix="$"
            />
          </Field>
          <Field label="Category">
            <Select
              value={form.type === "credit" ? "Income" : form.category}
              onChange={(v) => setForm((f) => ({ ...f, category: v }))}
              options={form.type === "credit" ? ["Income"] : CATEGORIES}
            />
          </Field>
          <Field label="Type">
            <Select
              value={form.type}
              onChange={(v) => setForm((f) => ({ ...f, type: v as TxType }))}
              options={["debit", "credit"]}
            />
          </Field>
          <Field label="&nbsp;">
            <button
              onClick={addTx}
              disabled={!form.merchant || !form.amount || !form.date}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-40"
              style={{ background: "var(--color-green)", color: "#060d1f" }}
            >
              <PlusIcon /> Add
            </button>
          </Field>
        </div>
      </div>

      {/* Transaction list */}
      <div
        className="rounded-xl flex flex-col"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
            Transactions {items.length > 0 && <span style={{ color: "var(--color-muted)" }}>({items.length})</span>}
          </h2>
          <div className="flex gap-1">
            {(["all", "credit", "debit"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1 rounded-md text-xs font-medium capitalize transition-all duration-150"
                style={{
                  background: filter === f ? "var(--color-surface-2)" : "transparent",
                  color: filter === f ? "var(--color-text)" : "var(--color-muted)",
                  border: filter === f ? "1px solid var(--color-border-bright)" : "1px solid transparent",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="px-5 py-12 text-center flex flex-col items-center gap-2">
            <span className="text-2xl">📋</span>
            <span className="text-sm" style={{ color: "var(--color-dim)" }}>
              {items.length === 0 ? "No transactions yet — add one above." : "No transactions match this filter."}
            </span>
          </div>
        ) : (
          <div className="px-2 py-2">
            {visible.map((tx) => (
              <div key={tx.id} className="flex items-center gap-4 py-3 px-4 rounded-lg transition-colors hover:bg-white/[0.03] group">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}
                >
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: "var(--color-text)" }}>{tx.merchant}</div>
                  <div className="text-xs" style={{ color: "var(--color-muted)" }}>{tx.category} · {tx.date}</div>
                </div>
                <div className="text-sm font-medium font-mono flex-shrink-0" style={{ color: tx.type === "credit" ? "var(--color-green)" : "var(--color-text)" }}>
                  {tx.type === "credit" ? "+" : "−"}${fmt(tx.amount)}
                </div>
                <button
                  onClick={() => setItems((prev) => prev.filter((t) => t.id !== tx.id))}
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                  style={{ color: "var(--color-dim)" }}
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Savings page ─────────────────────────────────────────────────────────────

const GOAL_COLORS = ["#10d876", "#3b82f6", "#a855f7", "#f59e0b", "#f43f5e", "#14b8a6", "#f97316", "#ec4899"]

interface SavingsGoal {
  id: string; name: string; target: string; saved: string; color: string; deadline: string; note: string
}

function Savings() {
  const [goals, setGoals] = useState<SavingsGoal[]>([])
  const [form, setForm] = useState({ name: "", target: "", saved: "", color: GOAL_COLORS[0], deadline: "", note: "" })
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  function saveGoal() {
    if (!form.name || !form.target) return
    if (editId) {
      setGoals((prev) => prev.map((g) => g.id === editId ? { ...form, id: editId } : g))
      setEditId(null)
    } else {
      setGoals((prev) => [...prev, { ...form, id: Date.now().toString() }])
    }
    setForm({ name: "", target: "", saved: "", color: GOAL_COLORS[0], deadline: "", note: "" })
    setShowForm(false)
  }

  function startEdit(goal: SavingsGoal) {
    setForm({ name: goal.name, target: goal.target, saved: goal.saved, color: goal.color, deadline: goal.deadline, note: goal.note })
    setEditId(goal.id)
    setShowForm(true)
  }

  const totalTarget = goals.reduce((s, g) => s + parseAmount(g.target), 0)
  const totalSaved  = goals.reduce((s, g) => s + parseAmount(g.saved), 0)
  const overallPct  = totalTarget > 0 ? Math.min((totalSaved / totalTarget) * 100, 100) : 0

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      {goals.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Saved",  value: `$${fmt(totalSaved, 0)}`,  accent: "var(--color-green)" },
            { label: "Total Target", value: `$${fmt(totalTarget, 0)}`, accent: "var(--color-text)" },
            { label: "Overall Progress", value: `${overallPct.toFixed(1)}%`, accent: "var(--color-blue)" },
          ].map(({ label, value, accent }) => (
            <div key={label} className="rounded-xl p-5 flex flex-col gap-2"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--color-muted)" }}>{label}</span>
              <span className="text-3xl font-bold font-mono" style={{ color: accent }}>{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit form */}
      {showForm && (
        <div className="rounded-xl p-5 flex flex-col gap-4"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
            {editId ? "Edit Goal" : "New Savings Goal"}
          </h2>
          <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            <Field label="Goal Name">
              <Input value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="e.g. Emergency Fund" />
            </Field>
            <Field label="Target Amount">
              <Input value={form.target} onChange={(v) => setForm((f) => ({ ...f, target: v }))} placeholder="0.00" prefix="$" />
            </Field>
            <Field label="Amount Saved">
              <Input value={form.saved} onChange={(v) => setForm((f) => ({ ...f, saved: v }))} placeholder="0.00" prefix="$" />
            </Field>
            <Field label="Deadline (optional)">
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
                className="px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-bright)", color: "var(--color-text)", colorScheme: "dark", width: "100%" }}
              />
            </Field>
            <Field label="Note (optional)">
              <Input value={form.note} onChange={(v) => setForm((f) => ({ ...f, note: v }))} placeholder="What is this for?" />
            </Field>
            <Field label="Colour">
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {GOAL_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setForm((f) => ({ ...f, color: c }))}
                    className="w-6 h-6 rounded-full transition-all duration-150"
                    style={{
                      background: c,
                      outline: form.color === c ? `2px solid ${c}` : "none",
                      outlineOffset: 2,
                      opacity: form.color === c ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
            </Field>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={saveGoal}
              disabled={!form.name || !form.target}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-40"
              style={{ background: "var(--color-green)", color: "#060d1f" }}
            >
              {editId ? "Save Changes" : "Add Goal"}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditId(null); setForm({ name: "", target: "", saved: "", color: GOAL_COLORS[0], deadline: "", note: "" }) }}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-70"
              style={{ background: "var(--color-surface-2)", color: "var(--color-text)", border: "1px solid var(--color-border)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Goals list */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
          Goals {goals.length > 0 && <span style={{ color: "var(--color-muted)" }}>({goals.length})</span>}
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--color-green)" }}
          >
            <PlusIcon /> New goal
          </button>
        )}
      </div>

      {goals.length === 0 && !showForm && (
        <div className="rounded-xl py-16 flex flex-col items-center gap-3"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
          <span className="text-3xl">🐷</span>
          <p className="text-sm" style={{ color: "var(--color-dim)" }}>No savings goals yet. Create one to get started.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-1 px-5 py-2 rounded-lg text-sm font-semibold"
            style={{ background: "var(--color-green)", color: "#060d1f" }}
          >
            + New goal
          </button>
        </div>
      )}

      {goals.length > 0 && (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {goals.map((goal) => {
            const saved  = parseAmount(goal.saved)
            const target = parseAmount(goal.target)
            const pct    = target > 0 ? Math.min((saved / target) * 100, 100) : 0
            const done   = pct >= 100
            const remaining = Math.max(target - saved, 0)

            return (
              <div
                key={goal.id}
                className="rounded-xl p-5 flex flex-col gap-4 transition-all duration-150 hover:-translate-y-0.5"
                style={{ background: "var(--color-surface)", border: `1px solid ${done ? goal.color + "55" : "var(--color-border)"}` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0"
                      style={{ background: goal.color + "22", border: `1px solid ${goal.color}44` }}>
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full" style={{ background: goal.color }} />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold leading-tight" style={{ color: "var(--color-text)" }}>{goal.name}</div>
                      {goal.deadline && (
                        <div className="text-xs font-mono" style={{ color: "var(--color-muted)" }}>by {goal.deadline}</div>
                      )}
                    </div>
                  </div>
                  {done && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: goal.color + "22", color: goal.color }}>
                      ✓ Done
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-end justify-between mb-1.5">
                    <span className="text-2xl font-bold font-mono" style={{ color: goal.color }}>${fmt(saved, 0)}</span>
                    <span className="text-sm font-mono" style={{ color: "var(--color-muted)" }}>of ${fmt(target, 0)}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--color-surface-2)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: goal.color }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs font-mono font-semibold" style={{ color: goal.color }}>{pct.toFixed(1)}%</span>
                    {!done && remaining > 0 && (
                      <span className="text-xs" style={{ color: "var(--color-muted)" }}>${fmt(remaining, 0)} to go</span>
                    )}
                  </div>
                </div>

                {goal.note && (
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>{goal.note}</p>
                )}

                <div className="flex gap-2 pt-1" style={{ borderTop: "1px solid var(--color-border)" }}>
                  <button
                    onClick={() => startEdit(goal)}
                    className="flex-1 py-1.5 rounded-md text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ background: "var(--color-surface-2)", color: "var(--color-text)", border: "1px solid var(--color-border)" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setGoals((prev) => prev.filter((g) => g.id !== goal.id))}
                    className="py-1.5 px-3 rounded-md text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ background: "var(--color-red-dim)", color: "var(--color-red)", border: "1px solid rgba(244,63,94,0.2)" }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Profile page ─────────────────────────────────────────────────────────────


function ProfileView() {
  const [profile, setProfile] = useState<Record<string, string>>({
    name: "", email: "", phone: "", dob: "", country: "", currency: "USD — US Dollar"
  })

  return (
    <div className="flex flex-col gap-6">
      <div
        className="rounded-xl p-6 flex items-center gap-6"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)", color: "#fff" }}
        >
          {profile.name ? profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "?"}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold tracking-tight" style={{ color: profile.name ? "var(--color-text)" : "var(--color-dim)" }}>
            {profile.name || "Your name"}
          </h2>
          <p className="text-sm" style={{ color: profile.email ? "var(--color-muted)" : "var(--color-dim)" }}>
            {profile.email || "your@email.com"}
          </p>
        </div>
      </div>

      <div
        className="rounded-xl p-5 grid gap-4"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", gridTemplateColumns: "1fr 1fr" }}
      >
        <h3 className="text-sm font-semibold col-span-2" style={{ color: "var(--color-text)" }}>Personal Information</h3>
        {[
          { key: "name",     label: "Full Name",     placeholder: "Alex Kim" },
          { key: "email",    label: "Email",         placeholder: "alex@example.com" },
          { key: "phone",    label: "Phone",         placeholder: "+1 (555) 000-0000" },
          { key: "dob",      label: "Date of Birth", placeholder: "YYYY-MM-DD" },
          { key: "country",  label: "Country",       placeholder: "United States" },
          { key: "currency", label: "Currency",      placeholder: "USD — US Dollar" },
        ].map(({ key, label, placeholder }) => (
          <Field key={key} label={label}>
            <Input
              value={profile[key]}
              onChange={(v) => setProfile((p) => ({ ...p, [key]: v }))}
              placeholder={placeholder}
            />
          </Field>
        ))}
      </div>
    </div>
  )
}

function Login({ onLogin, onBack, onGoToRegister }: { onLogin: () => void; onBack: () => void; onGoToRegister: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }
    setError("")
    onLogin()
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full"
      style={{ background: "var(--color-canvas)" }}
    >
      <div
        className="w-full max-w-sm rounded-xl p-8 flex flex-col gap-6"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-green)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#060d1f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="font-bold text-base tracking-tight" style={{ color: "var(--color-text)" }}>Ledger</span>
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--color-text)" }}>Welcome back</h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Email">
            <Input value={email} onChange={setEmail} placeholder="you@example.com" />
          </Field>
          <Field label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-bright)", color: "var(--color-text)" }}
            />
          </Field>

          {error && <p className="text-xs" style={{ color: "var(--color-red)" }}>{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--color-green)", color: "#060d1f" }}
          >
            Log In
          </button>
        </form>

        <button
          onClick={onBack}
          className="text-xs text-center transition-opacity hover:opacity-70"
          style={{ color: "var(--color-muted)" }}
        >
          ← Back to dashboard
        </button>
      </div>
    </div>
  )
}

function Register({ onRegister, onBack }: { onRegister: () => void; onBack: () => void }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    setError("")
    onRegister()
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full"
      style={{ background: "var(--color-canvas)" }}
    >
      <div
        className="w-full max-w-sm rounded-xl p-8 flex flex-col gap-6"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-green)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#060d1f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="font-bold text-base tracking-tight" style={{ color: "var(--color-text)" }}>Ledger</span>
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--color-text)" }}>Create your account</h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>Start tracking your finances</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Full Name">
            <Input value={name} onChange={setName} placeholder="Alex Kim" />
          </Field>
          <Field label="Email">
            <Input value={email} onChange={setEmail} placeholder="you@example.com" />
          </Field>
          <Field label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-3 py-2.5 rounded-lg text-sm outline-none w-full"
              style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-bright)", color: "var(--color-text)" }}
            />
          </Field>
          <Field label="Confirm Password">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="px-3 py-2.5 rounded-lg text-sm outline-none w-full"
              style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-bright)", color: "var(--color-text)" }}
            />
          </Field>

          {error && <p className="text-xs" style={{ color: "var(--color-red)" }}>{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--color-green)", color: "#060d1f" }}
          >
            Create Account
          </button>
        </form>

        <button
          onClick={onBack}
          className="text-xs text-center transition-opacity hover:opacity-70"
          style={{ color: "var(--color-muted)" }}
        >
          ← Back to log in
        </button>
      </div>
    </div>
  )
}
// ─── App shell ────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItemId>("dashboard")
  const [authView, setAuthView] = useState<"none" | "login" | "register">("none")

  if (authView === "login") {
    return (
      <Login
        onLogin={() => setAuthView("none")}
        onBack={() => setAuthView("none")}
        onGoToRegister={() => setAuthView("register")}
      />
    )
  }

  if (authView === "register") {
    return (
      <Register
        onRegister={() => setAuthView("none")}
        onBack={() => setAuthView("login")}
      />
    )
  }

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "var(--color-canvas)", color: "var(--color-text)", fontFamily: "var(--font-sans)" }}
    >
      <aside
        className="w-56 flex-shrink-0 flex flex-col fixed left-0 top-0 bottom-0 z-20"
        style={{ background: "var(--color-surface)", borderRight: "1px solid var(--color-border)" }}
      >
        <div className="px-5 py-5 flex items-center gap-2.5" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-green)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#060d1f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="font-bold text-base tracking-tight" style={{ color: "var(--color-text)" }}>Ledger</span>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = activeNav === id
            return (
              <button
                key={id}
                onClick={() => setActiveNav(id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left w-full"
                style={{
                  background: active ? "var(--color-green-dim)" : "transparent",
                  color: active ? "var(--color-green)" : "var(--color-muted)",
                  border: active ? "1px solid rgba(16,216,118,0.15)" : "1px solid transparent",
                }}
              >
                <span style={{ opacity: active ? 1 : 0.7 }}><Icon /></span>
                {label}
              </button>
            )
          })}
        </nav>

        <div className="p-3" style={{ borderTop: "1px solid var(--color-border)" }}>
          <div onClick={() => setAuthView("login")}
           className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.03] cursor-pointer transition-colors">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #3b82f6, #a855f7)", color: "#fff" }}
            >
              ?
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: "var(--color-text)" }}>Your Account</div>
              <div className="text-xs truncate" style={{ color: "var(--color-muted)" }}>Set up in Profile</div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveNav("profile") }}
              className="ml-auto flex-shrink-0 transition-colors hover:text-white"
              style={{ color: "var(--color-dim)" }}
            >
              <SettingsIcon />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col ml-56 min-h-screen">
        <header
          className="sticky top-0 z-10 flex items-center justify-between px-8 py-4"
          style={{ background: "var(--color-canvas)", borderBottom: "1px solid var(--color-border)" }}
        >
          <div>
            <h1 className="text-lg font-bold tracking-tight" style={{ color: "var(--color-text)" }}>
              {NAV.find((n) => n.id === activeNav)?.label}
            </h1>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-muted)" }}
            >
              <SearchIcon />
              <span>Search…</span>
            </div>
            <button
              className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/[0.05]"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-muted)" }}
            >
              <BellIcon />
            </button>
          </div>
        </header>

        <div className="flex-1 px-8 py-6 flex flex-col gap-6">
          {activeNav === "dashboard"    && <Dashboard />}
          {activeNav === "transactions" && <Transactions />}
          {activeNav === "savings"      && <Savings />}
          {activeNav === "profile"      && <ProfileView />}
        </div>
      </main>
    </div>
  )
}
