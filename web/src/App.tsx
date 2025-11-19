import { Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import OrdersPage from './pages/OrdersPage';
import AppointmentsPage from './pages/AppointmentsPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Pet Marketplace</h2>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/products">Produtos</Link>
          <Link to="/services">Serviços</Link>
          <Link to="/orders">Pedidos</Link>
          <Link to="/appointments">Agendamentos</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}
