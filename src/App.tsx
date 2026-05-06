import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Register } from './pages/Register';

function App() {
  return (
    /* BrowserRouter envolve toda a aplicação para permitir o roteamento */
    <BrowserRouter>
      {/* O fundo cinza claro ajuda a dar contraste com os cards brancos da UI */}
      <div className="min-h-screen bg-gray-50">
        
        {/* O Header aparece em todas as páginas */}
        <Header />

        {/* Área principal de conteúdo onde as páginas serão renderizadas */}
        <main className="py-8">
          <Routes>
            {/* Rota principal: Listagem de Espécies */}
            <Route path="/" element={<Home />} />
            
            {/* Rota de cadastro: Formulário */}
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        {/* Rodapé simples para finalizar o layout */}
        <footer className="text-center py-8 text-gray-400 text-sm">
          © 2026 Desafio Técnico - Todos os direitos reservados.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;