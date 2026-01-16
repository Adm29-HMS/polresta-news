import api from '@/lib/axios';

export const getBerita = async (params) => {
    const response = await api.get('/api/berita', { params });
    return response.data;
};

export const getBeritaBySlug = async (slug) => {
    const response = await api.get(`/api/berita/${slug}`);
    return response.data;
};

export const getKategoriBerita = async () => {
    const response = await api.get('/api/kategori-berita');
    return response.data;
};
