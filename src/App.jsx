import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
// Import pages later, for now placeholders
import Home from '@/pages/Home';
import CategoryPage from '@/pages/CategoryPage';
import ArticleDetail from '@/pages/ArticleDetail';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Specific Categories - mapping to Generic Category Page with filter prop */}
        <Route path="/hukum" element={<CategoryPage category="Hukum" />} />
        <Route path="/keamanan" element={<CategoryPage category="Keamanan" />} />
        <Route path="/kegiatan" element={<CategoryPage category="Kegiatan" />} />
        <Route path="/press-release" element={<CategoryPage category="Press Release" />} />
        <Route path="/inovasi" element={<CategoryPage category="Inovasi" />} />

        {/* Dynamic Detail Page - Must be last to avoid matching other routes */}
        <Route path="/:slug" element={<ArticleDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
