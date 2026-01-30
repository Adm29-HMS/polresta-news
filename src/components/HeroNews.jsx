import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

const HeroNews = ({ news }) => {
    if (!news || news.length === 0) return null;

    const mainNews = news[0];
    const sideNews = news.slice(1, 3);

    const getImageUrl = (item) => item.cover && !item.cover.includes('placehold.co')
        ? (item.cover.startsWith('http') ? item.cover : `${import.meta.env.VITE_API_URL}/storage/${item.cover}`)
        : null;

    const ImageWithFallback = ({ src, alt, className }) => {
        if (src) {
            return (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
            );
        }
        return (
            <div className={`w-full h-full flex items-center justify-center bg-gray-800 ${className}`}>
                <img src="/src/assets/TBNewsSorkotWhite.png" alt="Polresta Sorong Kota" className="w-1/3 h-auto opacity-50 object-contain" />
            </div>
        );
    };

    return (
        <section className="mb-12 pb-8 border-b border-gray-200/50">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-auto lg:h-[550px]">
                {/* Main Featured Article (Left - 2 Cols) */}
                <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl bg-gray-900 shadow-xl h-[450px] lg:h-auto">
                    <ImageWithFallback
                        src={getImageUrl(mainNews)}
                        alt={mainNews.judul}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                    
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                            <span className="inline-block bg-polres-gold/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 shadow-lg border border-white/20">
                                {mainNews.kategori?.nama || 'Berita Utama'}
                            </span>
                            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
                                <Link to={`/${mainNews.slug}`} className="hover:text-polres-gold transition-colors block">
                                    {mainNews.judul}
                                </Link>
                            </h2>
                            <div className="flex items-center text-gray-300 text-sm space-x-4 mb-2">
                                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5 text-polres-gold" /> {new Date(mainNews.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                <span className="hidden md:flex items-center"><User className="w-4 h-4 mr-1.5 text-polres-gold" /> {mainNews.penulis?.name || 'Admin'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Articles (Right - 1 Col on Desktop, 2 Cols on Mobile) */}
                <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 h-auto lg:h-full">
                    {sideNews.map((item) => (
                        <div key={item.id} className="relative group overflow-hidden rounded-2xl bg-gray-900 shadow-lg h-[220px] lg:h-full">
                            <ImageWithFallback
                                src={getImageUrl(item)}
                                alt={item.judul}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                            <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
                                <span className="hidden md:inline-block bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 border border-white/30">
                                    {item.kategori?.nama || 'Berita'}
                                </span>
                                <h3 className="text-sm md:text-lg font-bold text-white mb-1 leading-snug line-clamp-2 drop-shadow-md">
                                    <Link to={`/${item.slug}`} className="hover:text-polres-gold transition-colors">
                                        {item.judul}
                                    </Link>
                                </h3>
                                <div className="hidden md:flex items-center text-gray-400 text-xs mt-2">
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
