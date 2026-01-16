import React, { useEffect, useState } from 'react';
import { getBerita } from '@/services/api';
import NewsCard from '@/components/NewsCard';
import { Loader2 } from 'lucide-react';

const CategoryPage = ({ category }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                // Fetch news with category filter
                // Assuming API accepts 'kategori_id' or 'kategori_nama'. 
                // Based on plan, we filter by category name or fetch all and filter client side if API doesn't support generic search.
                // Better: Pass category name as query param if API supports it.
                // Assuming standard Laravel query: ?kategori=Name
                const data = await getBerita({ kategori: category });
                setNews(Array.isArray(data) ? data : (data.data || []));
            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [category]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-polres-dark border-b-4 border-polres-gold pb-2 inline-block w-fit">
                    {category}
                </h1>
                <p className="text-gray-600">
                    Berita dan informasi terkini seputar {category} di wilayah hukum Polresta Sorong Kota.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-12 h-12 text-polres-gold animate-spin" />
                </div>
            ) : news.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500 text-lg">Belum ada berita untuk kategori ini.</p>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
