export default function TransactionList({ transactions, deleteTransaction }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold p-4 bg-gray-50 border-b text-gray-800">Transações</h2>
      <ul className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="p-4 hover:bg-gray-50 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">{transaction.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString("pt-BR")} - R$ {transaction.amount.toFixed(2)} -{" "}
                {transaction.category}
              </p>
            </div>
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

