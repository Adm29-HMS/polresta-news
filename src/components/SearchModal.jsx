import React, { useState, useEffect } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getBerita } from '@/services/api';

const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchQuery.trim()) {
                searchBerita(searchQuery);
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const searchBerita = async (query) => {
        setIsLoading(true);
        try {
            const data = await getBerita({ search: query, limit: 10 });
            setResults(data);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setSearchQuery('');
        setResults([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[70vh] flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 p-4 border-b">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari berita..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 outline-none text-lg"
                            autoFocus
                        />
                        {isLoading && <Loader2 className="w-5 h-5 text-polres-gold animate-spin" />}
                        <button
                            onClick={handleClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="overflow-y-auto flex-1 p-4">
                        {searchQuery.trim() === '' ? (
                            <div className="text-center text-gray-500 py-12">
                                <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>Ketik untuk mencari berita</p>
                            </div>
                        ) : results.length === 0 && !isLoading ? (
                            <div className="text-center text-gray-500 py-12">
                                <p>Tidak ada hasil untuk "{searchQuery}"</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {results.map((berita) => (
                                    <Link
                                        key={berita.id}
                                        to={`/${berita.slug}`}
                                        onClick={handleClose}
                                        className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                                    >
                                        {berita.cover && (
                                            <img
                                                src={berita.cover.startsWith('http') ? berita.cover : `${import.meta.env.VITE_API_URL}/storage/${berita.cover}`}
                                                alt={berita.judul}
                                                className="w-20 h-20 object-cover rounded flex-shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 group-hover:text-polres-gold transition-colors line-clamp-2">
                                                {berita.judul}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                {berita.ringkasan}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-xs text-polres-gold font-medium">
                                                    {berita.kategori?.nama}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(berita.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SearchModal;
