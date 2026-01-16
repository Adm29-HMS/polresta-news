import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

const HeroNews = ({ news }) => {
    if (!news || news.length === 0) return null;

    const mainNews = news[0];
    const sideNews = news.slice(1, 3);

    const getImageUrl = (item) => item.cover
        ? (item.cover.startsWith('http') ? item.cover : `${import.meta.env.VITE_API_URL}/storage/${item.cover}`)
        : 'https://placehold.co/800x500';

    return (
        <section className="mb-16 pb-8 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">
                {/* Main Featured Article (Left - 2 Cols) */}
                <div className="lg:col-span-2 relative group overflow-hidden rounded-xl bg-gray-900 border-b-4 border-polres-gold shadow-lg h-[300px] lg:h-auto">
                    <img
                        src={getImageUrl(mainNews)}
                        alt={mainNews.judul}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                        <span className="inline-block bg-polres-gold text-white text-xs font-bold px-3 py-1 rounded mb-3">
                            {mainNews.kategori?.nama || 'Berita Utama'}
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                            <Link to={`/${mainNews.slug}`} className="hover:text-polres-gold transition-colors">
                                {mainNews.judul}
                            </Link>
                        </h2>
                        <div className="flex items-center text-gray-300 text-sm space-x-4">
                            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {new Date(mainNews.created_at).toLocaleDateString()}</span>
                            <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {mainNews.penulis?.name || 'Admin'}</span>
                        </div>
                    </div>
                </div>

                {/* Side Articles (Right - 1 Col, Stacked) */}
                <div className="lg:col-span-1 grid grid-cols-1 gap-6 h-full">
                    {sideNews.map((item) => (
                        <div key={item.id} className="relative group overflow-hidden rounded-xl bg-gray-900 border-b-4 border-polres-gold shadow h-[240px] lg:h-full">
                            <img
                                src={getImageUrl(item)}
                                alt={item.judul}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                            <div className="absolute bottom-0 left-0 p-5 w-full">
                                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 border border-white/30">
                                    {item.kategori?.nama || 'Berita'}
                                </span>
                                <h3 className="text-lg font-bold text-white mb-1 leading-snug line-clamp-2">
                                    <Link to={`/${item.slug}`} className="hover:text-polres-gold transition-colors">
                                        {item.judul}
                                    </Link>
                                </h3>
                                <div className="flex items-center text-gray-400 text-xs">
                                    <Calendar className="w-3 h-3 mr-1" /> {new Date(item.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroNews;
