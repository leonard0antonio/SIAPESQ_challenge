import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as BarTooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as PieTooltip, Legend } from 'recharts';
import type { Species } from '../types/species';

interface DashboardProps {
  species: Species[];
}

// Cores bonitas para o gráfico de pizza
const COLORS = ['#16a34a', '#2563eb', '#d97706', '#dc2626', '#7c3aed'];

export function Dashboard({ species }: DashboardProps) {
  
  // 1. Dados para o Gráfico de Barras (Por Categoria)
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    species.forEach((item) => {
      const qtd = Number(item.quantity) || 1;
      counts[item.category] = (counts[item.category] || 0) + qtd;
    });
    return Object.keys(counts).map(key => ({ categoria: key, quantidade: counts[key] }));
  }, [species]);

  // 2. Dados para o Gráfico de Pizza (Espécies mais registradas - Top 5)
  const topSpeciesData = useMemo(() => {
    // Cria um array com nome e quantidade, depois ordena do maior para o menor
    const sorted = [...species]
      .map(item => ({ nome: item.name, quantidade: Number(item.quantity) || 1 }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5); // Pega apenas os 5 primeiros
    return sorted;
  }, [species]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 w-full">
      
      {/* GRÁFICO 1: Espécies Mais Registradas */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800 w-full text-left">Espécies Mais Registradas</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topSpeciesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="quantidade"
                nameKey="nome"
                label
              >
                {topSpeciesData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <PieTooltip contentStyle={{ borderRadius: '8px' }} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRÁFICO 2: Distribuição por Categoria (O que já tínhamos) */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800 w-full text-left">Distribuição por Categoria</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="categoria" tick={{ fill: '#4b5563' }} />
              <YAxis tick={{ fill: '#4b5563' }} allowDecimals={false} />
              <BarTooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px' }} />
              <Bar dataKey="quantidade" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}