import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Calendar, User } from 'lucide-react';

const NewsCard = ({ news, className }) => {
    // Determine image URL - handle full URL or storage path
    const imageUrl = news.cover && !news.cover.includes('placehold.co')
        ? (news.cover.startsWith('http') ? news.cover : `${import.meta.env.VITE_API_URL}/storage/${news.cover}`)
        : null;

    return (
        <div className={cn("group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300", className)}>
            <div className="relative aspect-video overflow-hidden bg-gray-100">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={news.judul}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                ) : null}
                
                {/* Fallback Container (Hidden by default if image loads) */}
                <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${imageUrl ? 'hidden' : 'flex'}`}>
                     <img src="/src/assets/TBNewsSorkot.png" alt="Polresta Sorong Kota" className="w-1/3 h-auto opacity-50 object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-2 right-2 bg-polres-gold text-white text-xs font-bold px-2 py-1 rounded">
                    {news.kategori?.nama || 'Berita'}
                </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center text-xs text-muted-foreground mb-2 space-x-3">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {new Date(news.created_at).toLocaleDateString('id-ID')}</span>
                    <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {news.penulis || 'Admin'}</span>
                </div>
                <h3 className="text-lg font-bold text-polres-dark line-clamp-2 mb-2 group-hover:text-polres-gold transition-colors">
                    <Link to={`/${news.slug}`}>
                        {news.judul}
                    </Link>
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                    {news.ringkasan || news.konten?.substring(0, 100) + '...'}
                </p>
                <Link
                    to={`/${news.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-polres-gold hover:text-polres-dark transition-colors mt-auto"
                >
                    Baca Selengkapnya &rarr;
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;
