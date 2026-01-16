import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getBeritaBySlug } from '@/services/api';
import { Loader2, Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';

const ArticleDetail = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const data = await getBeritaBySlug(slug);
                setArticle(data.data || data); // Handle if data is wrapped or direct
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="w-12 h-12 text-polres-gold animate-spin" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700">Berita tidak ditemukan</h2>
                <Link to="/" className="text-polres-gold hover:underline mt-4 inline-block">Kembali ke Beranda</Link>
            </div>
        );
    }

    const imageUrl = article.cover
        ? (article.cover.startsWith('http') ? article.cover : `${import.meta.env.VITE_API_URL}/storage/${article.cover}`)
        : 'https://placehold.co/800x500';

    const pageUrl = window.location.href;
    const siteName = 'TBNews Polri - Polresta Sorong Kota';

    return (
        <>
            <Helmet>
                <title>{article.judul} | {siteName}</title>
                <meta name="description" content={article.ringkasan || article.konten?.substring(0, 160)} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={article.judul} />
                <meta property="og:description" content={article.ringkasan || article.konten?.substring(0, 160)} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:site_name" content={siteName} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={pageUrl} />
                <meta name="twitter:title" content={article.judul} />
                <meta name="twitter:description" content={article.ringkasan || article.konten?.substring(0, 160)} />
                <meta name="twitter:image" content={imageUrl} />
            </Helmet>

            <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Header Image */}
                <div className="relative w-full aspect-video md:aspect-[21/9]">
                    <img
                        src={imageUrl}
                        alt={article.judul}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-6 md:p-8 lg:p-10 space-y-6">
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-4">
                        <span className="flex items-center text-polres-gold font-semibold bg-yellow-50 px-3 py-1 rounded-full">
                            <Tag className="w-4 h-4 mr-2" />
                            {article.kategori?.nama || 'Berita'}
                        </span>
                        <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(article.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>

                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-polres-dark leading-tight">
                        {article.judul}
                    </h1>

                    {/* Content */}
                    <div
                        className="prose prose-lg prose-yellow max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: article.konten }}
                    />

                    {/* Author Section */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                            <span className="text-sm text-gray-500 mr-2">Penulis:</span>
                            <span className="flex items-center font-semibold text-gray-900">
                                <User className="w-4 h-4 mr-2 text-polres-gold" />
                                {article.penulis || 'Admin'}
                            </span>
                        </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="pt-4">
                        <ShareButtons title={article.judul} url={window.location.href} />
                    </div>

                    {/* Footer Navigation */}
                    <div className="border-t border-gray-200 pt-8 mt-8">
                        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-polres-gold font-medium transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Berita Utama
                        </Link>
                    </div>
                </div>
            </article>
        </>
    );
};

export default ArticleDetail;
