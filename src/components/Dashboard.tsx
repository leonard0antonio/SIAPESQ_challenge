import { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import type { Species } from '../types/species';

interface Props {
  species: Species[];
}

export function Dashboard({ species }: Props) {
  
  // 1. DADOS: Espécies mais registadas (Top 5)
  const topSpeciesData = useMemo(() => {
    const counts = species.reduce((acc, item) => {
      // Capitaliza a primeira letra para ficar bonito no gráfico
      const name = item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();
      acc[name] = (acc[name] || 0) + (Number(item.quantity) || 1);
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5); // Pega apenas os 5 mais registados
  }, [species]);

  // 2. DADOS: População por Categoria
  const categoryData = useMemo(() => {
    const counts = species.reduce((acc, item) => {
      const cat = item.category || 'Outros';
      acc[cat] = (acc[cat] || 0) + (Number(item.quantity) || 1);
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);
  }, [species]);

  // 3. DADOS: Espécies por Estado
  const stateData = useMemo(() => {
    const counts = species.reduce((acc, item) => {
      const st = item.state || 'N/A';
      acc[st] = (acc[st] || 0) + 1; 
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [species]);

  const PIE_COLORS = ['#16a34a', '#2563eb', '#0891b2', '#ca8a04', '#14b8a6', '#8b5cf6'];

  if (species.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-6">
        <span className="bg-blue-600 w-2 h-8 rounded-full"></span>
        <h2 className="text-2xl font-bold text-gray-800">Estatísticas do Sistema</h2>
      </div>

      {/* Grid com 3 colunas em ecrãs grandes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRÁFICO 1: Espécies mais registadas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 text-center">
            Top 5 Espécies
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSpeciesData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={90} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="total" fill="#2563eb" radius={[0, 4, 4, 0]} name="Quantidade" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO 2: Categorias */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 text-center">
            Por Categoria
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="total" fill="#16a34a" radius={[6, 6, 0, 0]} name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO 3: Estados (Pizza) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 text-center">
            Registos por Estado
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stateData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {stateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}