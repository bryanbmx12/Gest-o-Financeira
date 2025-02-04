import { useState, useEffect } from "react"

export default function Filters({ transactions, setFilteredTransactions, currentMonth, setCurrentMonth }) {
  const [filterCategory, setFilterCategory] = useState("")
  const [filterType, setFilterType] = useState("")

  useEffect(() => {
    applyFilters()
  }, [filterCategory, filterType]) // Removed unnecessary dependencies: currentMonth

  const applyFilters = () => {
    let filteredTransactions = transactions.filter((t) => t.date.startsWith(currentMonth))

    if (filterCategory) {
      filteredTransactions = filteredTransactions.filter((t) => t.category === filterCategory)
    }

    if (filterType) {
      filteredTransactions = filteredTransactions.filter((t) => t.type === filterType)
    }

    setFilteredTransactions(filteredTransactions)
  }

  const resetFilters = () => {
    setFilterCategory("")
    setFilterType("")
    setFilteredTransactions(transactions.filter((t) => t.date.startsWith(currentMonth)))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="currentMonth" className="block text-gray-700 text-sm font-bold mb-2">
            Mês:
          </label>
          <input
            type="month"
            id="currentMonth"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="filterCategory" className="block text-gray-700 text-sm font-bold mb-2">
            Filtrar por Categoria:
          </label>
          <select
            id="filterCategory"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Todas</option>
            <option value="Contas">Contas</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Transporte">Transporte</option>
            <option value="Lazer">Lazer</option>
            <option value="Saúde">Saúde</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <div>
          <label htmlFor="filterType" className="block text-gray-700 text-sm font-bold mb-2">
            Filtrar por Tipo:
          </label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Todos</option>
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={applyFilters}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  )
}

