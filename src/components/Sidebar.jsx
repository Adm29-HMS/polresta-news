import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBerita } from '@/services/api';
import { Calendar, ArrowRight } from 'lucide-react';

const Sidebar = () => {
    const [popularNews, setPopularNews] = useState([]);

    useEffect(() => {
        // Mocking popular news by fetching random/latest for now
        // Ideally API should support /berita?sort=views
        const fetchPopular = async () => {
            try {
                const data = await getBerita({ limit: 5 });
                const newsArray = Array.isArray(data) ? data : (data.data || []);
                setPopularNews(newsArray.slice(0, 5));
            } catch (error) {
                console.error("Sidebar fetch error", error);
            }
        };
        fetchPopular();
    }, []);

    return (
        <aside className="space-y-8">
            {/* Search (Optional, maybe in Navbar is enough) */}

            {/* Popular News */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-polres-gold">
                <h3 className="text-lg font-bold text-polres-dark mb-4 pb-2 border-b border-gray-100 flex justify-between items-center">
                    <span>Terpopuler</span>
                </h3>
                <div className="space-y-4">
                    {popularNews.map((news, index) => (
                        <div key={news.id} className="flex gap-4 group">
                            <span className="text-2xl font-bold text-gray-200 group-hover:text-polres-gold transition-colors font-mono">
                                0{index + 1}
                            </span>
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-polres-gold transition-colors">
                                    <Link to={`/${news.slug}`}>
                                        {news.judul}
                                    </Link>
                                </h4>
                                <span className="text-xs text-gray-400 mt-1 flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(news.created_at).toLocaleDateString('id-ID')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-polres-dark">
                <h3 className="text-lg font-bold text-polres-dark mb-4 border-b border-gray-100 pb-2">
                    Kategori
                </h3>
                <ul className="space-y-2">
                    {['Hukum', 'Keamanan', 'Kegiatan', 'Press Release', 'Inovasi'].map((cat) => (
                        <li key={cat}>
                            <Link
                                to={`/${cat.toLowerCase().replace(' ', '-')}`}
                                className="flex justify-between items-center text-sm font-medium text-gray-600 hover:text-polres-gold hover:translate-x-1 transition-all p-2 rounded hover:bg-yellow-50"
                            >
                                <span>{cat}</span>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Info Banner / Important Link */}
            <div className="bg-polres-dark rounded-lg p-6 text-white text-center">
                <h3 className="font-bold text-lg mb-2">Layanan Darurat</h3>
                <p className="text-sm text-gray-300 mb-4">Butuh bantuan polisi segera? Hubungi Call Center 110.</p>
                <div className="bg-polres-gold text-white font-bold py-3 rounded text-xl">
                    110
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
