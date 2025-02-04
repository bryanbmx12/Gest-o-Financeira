export default function FinancialSummary({ transactions }) {
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Resumo Financeiro</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Receitas</h3>
          <p className="text-2xl font-bold text-green-600">R$ {totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800">Despesas</h3>
          <p className="text-2xl font-bold text-red-600">R$ {totalExpenses.toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded-lg ${balance >= 0 ? "bg-blue-100" : "bg-yellow-100"}`}>
          <h3 className="text-lg font-semibold text-gray-800">Saldo</h3>
          <p className={`text-2xl font-bold ${balance >= 0 ? "text-blue-600" : "text-yellow-600"}`}>
            R$ {balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

