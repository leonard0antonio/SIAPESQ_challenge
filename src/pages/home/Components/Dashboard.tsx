import { useMemo, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { Species } from "../../../types/species";

// --- COMPONENTE DE DASHBOARD COM GRÁFICOS RECHARTS ---

interface Props {
  species: Species[];
}

export function Dashboard({ species }: Props) {
  // ✨ FIX: Estado para controlar a renderização após a animação do Framer Motion
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. DADOS: Espécies mais registadas (Top 5)
  const topSpeciesData = useMemo(() => {
    const counts = species.reduce(
      (acc, item) => {
        const name =
          item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();
        acc[name] = (acc[name] || 0) + (Number(item.quantity) || 1);
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(counts)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [species]);

  // 2. DADOS: População por Categoria
  const categoryData = useMemo(() => {
    const counts = species.reduce(
      (acc, item) => {
        const cat = item.category || "Outros";
        acc[cat] = (acc[cat] || 0) + (Number(item.quantity) || 1);
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(counts)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);
  }, [species]);

  // 3. DADOS: Espécies por Estado
  const stateData = useMemo(() => {
    const counts = species.reduce(
      (acc, item) => {
        const st = item.state || "N/A";
        acc[st] = (acc[st] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [species]);

  // ✨ PALETA PREMIUM EMERALD
  const PIE_COLORS = ['#059669', '#10b981', '#34d399', '#0f766e', '#14b8a6', '#64748b'];

  if (species.length === 0) return null;

  // === RENDERIZAÇÃO DOS GRÁFICOS ===
  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-md">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Estatísticas do Sistema</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRÁFICO 1: Espécies mais registadas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Top 5 Espécies</h3>
          <div className="h-64 w-full">
            {/* ✨ Envolvido com isMounted */}
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSpeciesData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f8fafc" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={90} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="total" fill="#064e3b" radius={[0, 4, 4, 0]} name="Quantidade" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* GRÁFICO 2: Categorias */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Por Categoria</h3>
          <div className="h-64 w-full">
            {/* ✨ Envolvido com isMounted */}
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="total" fill="#10b981" radius={[6, 6, 0, 0]} name="Total" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* GRÁFICO 3: Estados (Pizza) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Registos por Estado</h3>
          <div className="h-64 w-full">
            {/* ✨ Envolvido com isMounted */}
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stateData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                    {stateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}