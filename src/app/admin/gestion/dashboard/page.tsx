export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Panel de Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Productos" value="28" />
        <Card title="Categorías" value="6" />
        <Card title="Usuarios" value="104" />
      </div>
    </div>
  )
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-md shadow p-6">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-3xl font-bold text-zinc-900 mt-2">{value}</p>
    </div>
  )
}
