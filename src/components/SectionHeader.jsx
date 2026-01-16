import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SectionHeader = ({ title, linkTo, linkText = "Lihat Semua" }) => {
    return (
        <div className="flex justify-between items-end mb-6 border-b-2 border-gray-100 pb-2">
            <h2 className="text-2xl font-bold text-polres-dark border-b-4 border-polres-gold -mb-[10px] pb-2 inline-block">
                {title}
            </h2>
            {linkTo && (
                <Link
                    to={linkTo}
                    className="text-sm font-semibold text-polres-gold hover:text-polres-dark flex items-center transition-colors mb-1"
                >
                    {linkText} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            )}
        </div>
    );
};

export default SectionHeader;
