"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export default function Charts({ transactions }) {
  const financeChartRef = useRef(null)
  const categoryChartRef = useRef(null)
  const financeChartInstance = useRef(null)
  const categoryChartInstance = useRef(null)

  useEffect(() => {
    if (financeChartRef.current && categoryChartRef.current) {
      const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
      const expense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

      const categories = [...new Set(transactions.map((t) => t.category))]
      const categoryData = categories.map((category) => {
        return transactions.filter((t) => t.category === category).reduce((sum, t) => sum + t.amount, 0)
      })

      // Destroy existing charts
      if (financeChartInstance.current) {
        financeChartInstance.current.destroy()
      }
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy()
      }

      // Create new charts
      financeChartInstance.current = new Chart(financeChartRef.current, {
        type: "bar",
        data: {
          labels: ["Receita", "Despesa"],
          datasets: [
            {
              label: "Valores",
              data: [income, expense],
              backgroundColor: ["#10B981", "#EF4444"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })

      categoryChartInstance.current = new Chart(categoryChartRef.current, {
        type: "pie",
        data: {
          labels: categories,
          datasets: [
            {
              label: "Gastos por Categoria",
              data: categoryData,
              backgroundColor: ["#F59E0B", "#3B82F6", "#EC4899", "#10B981", "#6366F1", "#8B5CF6"],
              borderWidth: 1,
            },
          ],
        },
      })
    }

    // Cleanup function to destroy charts when component unmounts
    return () => {
      if (financeChartInstance.current) {
        financeChartInstance.current.destroy()
      }
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy()
      }
    }
  }, [transactions])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Receitas vs Despesas</h3>
        <canvas ref={financeChartRef}></canvas>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Gastos por Categoria</h3>
        <canvas ref={categoryChartRef}></canvas>
      </div>
    </div>
  )
}

