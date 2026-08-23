import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import PoliciesPage from './pages/PoliciesPage'
import ClaimsPage from './pages/ClaimsPage'
import DocumentsPage from './pages/DocumentsPage'
import MapPage from './pages/MapPage'
import ContactPage from './pages/ContactPage'
import './lib/bootstrap'
export default function App() {
  return <Layout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/policies" element={<PoliciesPage />} />
      <Route path="/claims" element={<ClaimsPage />} />
      <Route path="/documents" element={<DocumentsPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  </Layout>
}
