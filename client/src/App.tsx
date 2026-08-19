import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { Home } from './UI/pages/Home';
import { Shop } from './UI/pages/Shop';
import { Product } from './UI/pages/Product';
import { Cart } from './UI/pages/Cart';
import { Checkout } from './UI/pages/Checkout';
import { Orders } from './UI/pages/Orders';
import { Profile } from './UI/pages/Profile';
import './setupApi';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
