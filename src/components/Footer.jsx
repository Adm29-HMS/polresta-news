import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-polres-dark text-gray-300 pt-12 pb-6 border-t-4 border-polres-gold">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <img
                                src="/src/assets/TBNewsSorkotWhite.png"
                                alt="Polresta Sorong Kota"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="text-sm text-gray-400">
                            Portal Berita Resmi Polresta Sorong Kota Obyektif, Partisipasi, terpercaya.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/polres.sorkot" className="text-gray-400 hover:text-polres-gold transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="https://www.instagram.com/polrestasorongkota/" className="text-gray-400 hover:text-polres-gold transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="https://twitter.com/polrestasorongkota" className="text-gray-400 hover:text-polres-gold transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="https://www.youtube.com/@humaspolrestasorongkota" className="text-gray-400 hover:text-polres-gold transition-colors"><Youtube className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Kategori</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/hukum" className="hover:text-polres-gold transition-colors">Hukum</Link></li>
                            <li><Link to="/keamanan" className="hover:text-polres-gold transition-colors">Keamanan</Link></li>
                            <li><Link to="/kegiatan" className="hover:text-polres-gold transition-colors">Kegiatan</Link></li>
                            <li><Link to="/press-release" className="hover:text-polres-gold transition-colors">Press Release</Link></li>
                            <li><Link to="/inovasi" className="hover:text-polres-gold transition-colors">Inovasi</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Kontak</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 text-polres-gold mr-2 flex-shrink-0" />
                                <span>Jl. Jend. Ahmad Yani No. 1, Sorong Kota, Papua Barat Daya</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-5 h-5 text-polres-gold mr-2 flex-shrink-0" />
                                <span>(0951) 321xxx</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 text-polres-gold mr-2 flex-shrink-0" />
                                <span>humas@polrestasorongkota.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter or Info */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Layanan Pengaduan</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Laporkan kejadian atau tindak kriminal secara online melalui layanan pengaduan kami.
                        </p>
                        <a
                            href="https://polrestasorongkota.com/hubungi"
                            className="inline-block bg-polres-gold hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                            Hubungi Kami
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Polresta Sorong Kota. All rights reserved.</p>
                    <p>Designed by Sihumas Polresta Sorong Kota</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
