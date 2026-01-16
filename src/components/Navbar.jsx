import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Hukum', path: '/hukum' },
        { name: 'Keamanan', path: '/keamanan' },
        { name: 'Kegiatan', path: '/kegiatan' },
        { name: 'Press Release', path: '/press-release' },
        { name: 'Inovasi', path: '/inovasi' },
        { name: 'Website Utama', path: 'http://localhost:5173', external: true },
    ];

    return (
        <header className="sticky top-0 z-50 bg-polres-maroon border-b-4 border-polres-gold shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center space-x-3 group">
                        <img
                            src="/src/assets/TBNewsSorkotWhite.png"
                            alt="TB News Polresta Sorong Kota"
                            className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            item.external ? (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative text-sm font-medium text-gray-300 transition-colors hover:text-white py-2 flex items-center gap-1"
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={cn(
                                        "relative text-sm font-medium transition-colors hover:text-polres-gold py-2",
                                        location.pathname === item.path ? "text-polres-gold" : "text-gray-300"
                                    )}
                                >
                                    {item.name}
                                    {location.pathname === item.path && (
                                        <motion.span
                                            layoutId="underline"
                                            className="absolute left-0 right-0 bottom-0 h-0.5 bg-polres-gold"
                                        />
                                    )}
                                </Link>
                            )
                        ))}
                    </nav>

                    {/* Mobile Menu & Actions */}
                    <div className="flex items-center gap-4">
                        {/* Actions */}
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full"
                            >
                                <Search className="w-4 h-4" />
                                <span className="text-sm font-medium">Cari berita</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-300 hover:text-white focus:outline-none"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-polres-maroon border-t border-gray-800"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                item.external ? (
                                    <a
                                        key={item.name}
                                        href={item.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                                            location.pathname === item.path
                                                ? "text-polres-gold bg-gray-900"
                                                : "text-gray-300 hover:text-white hover:bg-gray-800"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    );
};

export default Navbar;
