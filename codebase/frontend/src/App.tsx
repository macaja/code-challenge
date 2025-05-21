import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment-history" element={<PaymentHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
