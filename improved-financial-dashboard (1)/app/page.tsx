"use client"

import { useState, useEffect } from "react"
import TransactionForm from "./components/TransactionForm"
import TransactionList from "./components/TransactionList"
import Charts from "./components/Charts"
import Filters from "./components/Filters"
import FinancialSummary from "./components/FinancialSummary"

export default function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7))

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions")
    if (savedTransactions) {
      const parsedTransactions = JSON.parse(savedTransactions)
      setTransactions(parsedTransactions)
      filterTransactionsByMonth(parsedTransactions, currentMonth)
    }
  }, [currentMonth])

  const filterTransactionsByMonth = (transactionsToFilter, month) => {
    const filtered = transactionsToFilter.filter((t) => t.date.startsWith(month))
    setFilteredTransactions(filtered)
  }

  const addTransaction = (transaction) => {
    const newTransaction = { ...transaction, id: Date.now(), date: new Date().toISOString().slice(0, 10) }
    const newTransactions = [...transactions, newTransaction]
    setTransactions(newTransactions)
    filterTransactionsByMonth(newTransactions, currentMonth)
    localStorage.setItem("transactions", JSON.stringify(newTransactions))
  }

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter((t) => t.id !== id)
    setTransactions(newTransactions)
    filterTransactionsByMonth(newTransactions, currentMonth)
    localStorage.setItem("transactions", JSON.stringify(newTransactions))
  }

  const exportToCSV = () => {
    const headers = ["ID", "Data", "Descrição", "Valor", "Tipo", "Categoria"]
    const rows = transactions.map((t) => [t.id, t.date, t.description, t.amount, t.type, t.category])

    const csvContent =
      "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map((row) => row.join(",")).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "transacoes.csv")
    document.body.appendChild(link)
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Gestão Financeira</h1>
          <FinancialSummary transactions={filteredTransactions} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Charts transactions={filteredTransactions} />
              <Filters
                transactions={transactions}
                setFilteredTransactions={setFilteredTransactions}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
              />
            </div>
            <div>
              <TransactionForm addTransaction={addTransaction} />
              <TransactionList transactions={filteredTransactions} deleteTransaction={deleteTransaction} />
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={exportToCSV}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Exportar para CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

