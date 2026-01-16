import React, { useEffect, useState } from 'react';
import { getBerita } from '@/services/api';
import NewsCard from '@/components/NewsCard';
import HeroNews from '@/components/HeroNews';
import Sidebar from '@/components/Sidebar';
import SectionHeader from '@/components/SectionHeader';
import { Loader2 } from 'lucide-react';

const Home = () => {
    const [latestNews, setLatestNews] = useState([]);
    const [kegiatanNews, setKegiatanNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch general latest news (limit 9: 3 for hero, 6 for grid)
                const latestData = await getBerita({ limit: 9 });
                setLatestNews(Array.isArray(latestData) ? latestData : (latestData.data || []));

                // Fetch specific category: Kegiatan
                const kegiatanData = await getBerita({ kategori: 'Kegiatan', limit: 3 });
                setKegiatanNews(Array.isArray(kegiatanData) ? kegiatanData : (kegiatanData.data || []));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20 min-h-screen">
                <Loader2 className="w-12 h-12 text-polres-gold animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <HeroNews news={latestNews.slice(0, 3)} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Area (Left) */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Latest News Grid (Exclude those in Hero) */}
                    <section>
                        <SectionHeader title="Berita Terkini" linkTo="/press-release" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {latestNews.slice(3).map((item) => (
                                <NewsCard key={item.id} news={item} />
                            ))}
                        </div>
                    </section>

                    {/* Kegiatan Section */}
                    <section>
                        <SectionHeader title="Giat Polresta" linkTo="/kegiatan" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {kegiatanNews.map((item) => (
                                <NewsCard key={item.id} news={item} className="text-sm" />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar (Right) */}
                <div className="lg:col-span-4 pl-0 lg:pl-4">
                    <div className="sticky top-24">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
