import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, ChevronDown, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { CATEGORIES } from '../../data/categories';
import { SCHOOLS } from '../../data/schools';
import { ProductCard } from '../../components/common/ProductCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/common/Button';

const LISTING_TYPES = [
  { id: 'sell',  label: 'Bán' },
  { id: 'give',  label: 'Tặng' },
  { id: 'trade', label: 'Trao đổi' },
];
const CONDITIONS = ['Mới', 'Như mới', 'Đã qua sử dụng'];
const ITEMS_PER_PAGE = 6; // Số sản phẩm hiển thị trên mỗi trang

export const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const [query,         setQuery]         = useState(searchParams.get('q')        || '');
  const [category,      setCategory]      = useState(searchParams.get('category') || 'all');
  const [school,        setSchool]        = useState(searchParams.get('school')   || 'ALL');
  const [listingTypes,  setListingTypes]  = useState({ sell: false, give: false, trade: false });
  const [conditions,    setConditions]    = useState({ 'Mới': false, 'Như mới': false, 'Đã qua sử dụng': false });
  const [priceFrom,     setPriceFrom]     = useState('');
  const [priceTo,       setPriceTo]       = useState('');
  const [sortBy,        setSortBy]        = useState('newest');
  const [currentPage,   setCurrentPage]   = useState(1);

  // Sync URL params
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    const sch = searchParams.get('school');
    const lt  = searchParams.get('listingType');
    if (q)   setQuery(q);
    if (cat) setCategory(cat);
    if (sch) setSchool(sch);
    if (lt)  setListingTypes(prev => ({ ...prev, [lt]: true }));
  }, [searchParams]);

  // Active filter chips (dùng useMemo để không tạo lại mảng mới mỗi lần render)
  const activeLT = useMemo(() => {
    return Object.entries(listingTypes).filter(([, v]) => v).map(([k]) => k);
  }, [listingTypes]);

  const activeCond = useMemo(() => {
    return Object.entries(conditions).filter(([, v]) => v).map(([k]) => k);
  }, [conditions]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      // Chỉ hiển thị các tin đăng đã được Admin duyệt (active) trên trang danh mục
      if (p.status && p.status !== 'active') return false;

      if (query.trim()) {
        const txt = `${p.title} ${p.description || ''} ${p.schoolName} ${p.location} ${(p.tags || []).join(' ')}`.toLowerCase();
        if (!txt.includes(query.toLowerCase())) return false;
      }
      if (category !== 'all' && p.categoryId !== category) return false;
if (school !== 'ALL' && p.schoolId !== school && p.schoolId !== 'ALL') return false;
      if (activeLT.length  && !activeLT.includes(p.listingType)) return false;
      if (activeCond.length && !activeCond.includes(p.condition)) return false;
      if (priceFrom && p.price < Number(priceFrom)) return false;
      if (priceTo   && p.price > Number(priceTo))   return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc')  return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [products, query, category, school, activeLT, activeCond, priceFrom, priceTo, sortBy]);

  // Chỉ quay về trang 1 khi người dùng thay đổi bộ lọc tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [query, category, school, listingTypes, conditions, priceFrom, priceTo, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const reset = () => {
    setQuery(''); setCategory('all'); setSchool('ALL');
    setListingTypes({ sell: false, give: false, trade: false });
    setConditions({ 'Mới': false, 'Như mới': false, 'Đã qua sử dụng': false });
    setPriceFrom(''); setPriceTo('');
    setSearchParams({});
  };

  const toggleLT   = id  => setListingTypes(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleCond = cnd => setConditions(prev   => ({ ...prev, [cnd]: !prev[cnd] }));

  const activeFilterChips = [
    ...activeLT.map(id  => ({ key: id,  label: `Loại tin: ${LISTING_TYPES.find(x=>x.id===id)?.label}`, onRemove: () => toggleLT(id) })),
    ...activeCond.map(c => ({ key: c,   label: `Tình trạng: ${c}`, onRemove: () => toggleCond(c) })),
    ...(category !== 'all' ? [{ key: 'cat', label: `Danh mục: ${CATEGORIES.find(c=>c.id===category)?.name}`, onRemove: () => setCategory('all') }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 mb-4 flex items-center gap-1">
        <a href="/" className="hover:text-[#1557A0]">Trang chủ</a>
        <span>/</span>
        <span className="text-slate-800 font-medium">Kết quả tìm kiếm{query ? ` / "${query}"` : ''}</span>
      </nav>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Kết quả tìm kiếm</h1>
          <p className="text-sm text-slate-500">{filtered.length} kết quả{query ? ` cho '${query}'` : ''}</p>
        </div>

        {/* Sort */}
<div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold">Sắp xếp:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none bg-white">
            <option value="newest">Mới nhất</option>
            <option value="priceAsc">Giá thấp → cao</option>
            <option value="priceDesc">Giá cao → thấp</option>
          </select>
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilterChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-slate-500 font-medium">Đang lọc theo:</span>
          {activeFilterChips.map(chip => (
            <button key={chip.key} onClick={chip.onRemove}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 hover:bg-blue-100 transition">
              {chip.label} ×
            </button>
          ))}
          <button onClick={reset} className="text-xs text-[#1557A0] font-semibold hover:underline">Xóa tất cả bộ lọc</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* ── Sidebar Filter ── */}
        <aside className="bg-white border border-slate-200 rounded-2xl p-5 h-fit space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
              <span>☰</span> Bộ lọc tìm kiếm
            </h3>
            <button onClick={reset} className="text-xs text-[#1557A0] font-semibold hover:underline flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Đặt lại
            </button>
          </div>

          {/* Loại tin */}
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <p className="text-xs font-black text-slate-700">Loại tin</p>
            {LISTING_TYPES.map(lt => (
              <label key={lt.id} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" checked={listingTypes[lt.id]} onChange={() => toggleLT(lt.id)}
                  className="accent-[#1557A0]" />
                {lt.label}
              </label>
            ))}
          </div>

          {/* Danh mục */}
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <p className="text-xs font-black text-slate-700">Danh mục</p>
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <label key={cat.id} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="radio" name="category" checked={category === cat.id} onChange={() => setCategory(cat.id)}
className="accent-[#1557A0]" />
                {cat.name}
              </label>
            ))}
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="radio" name="category" checked={category === 'all'} onChange={() => setCategory('all')} className="accent-[#1557A0]" />
              Tất cả danh mục
            </label>
          </div>

          {/* Khoảng giá */}
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <p className="text-xs font-black text-slate-700">Khoảng giá</p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <p className="text-[11px] text-slate-500 mb-1">Từ:</p>
                <div className="relative">
                  <input type="number" placeholder="0" value={priceFrom} onChange={e => setPriceFrom(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1557A0]" />
                  <span className="absolute right-2.5 top-1.5 text-[11px] text-slate-400">đ</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-slate-500 mb-1">Đến:</p>
                <div className="relative">
                  <input type="number" placeholder="150.000" value={priceTo} onChange={e => setPriceTo(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#1557A0]" />
                  <span className="absolute right-2.5 top-1.5 text-[11px] text-slate-400">đ</span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">Chỉ áp dụng cho tin Bán</p>
          </div>

          {/* Tình trạng */}
          <div className="space-y-2">
            <p className="text-xs font-black text-slate-700">Tình trạng</p>
            {CONDITIONS.map(cnd => (
              <label key={cnd} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" checked={conditions[cnd]} onChange={() => toggleCond(cnd)} className="accent-[#1557A0]" />
                {cnd}
              </label>
            ))}
          </div>

          <Button variant="campus" size="sm" className="w-full">Áp dụng</Button>
          <Button variant="outline" size="sm" className="w-full" onClick={reset}>Xóa lọc</Button>
        </aside>

        {/* ── Product Grid ── */}
        <div className="md:col-span-3 space-y-6">
          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
{/* AI suggestion banner */}
              {query && (
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
                  <div className="p-1.5 bg-[#1557A0] rounded-lg shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Gợi ý phù hợp từ Trợ lý AI <span className="text-[11px] bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded-full font-semibold">AI</span>
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Dựa trên tìm kiếm "{query}" tại ĐHQG-HCM, các bạn sinh viên KTX Khu B đang có nhóm chia sẻ combo kèm đề thi thử kinh tế và tài liệu photo ôn tập cuối kỳ với giá ưu đãi.
                    </p>
                    <button className="text-xs text-[#1557A0] font-semibold mt-1 hover:underline">
                      Xem 14 tài liệu bổ trợ cùng ngành →
                    </button>
                  </div>
                </div>
              )}

              {/* Phân trang động chuyển sản phẩm */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  Hiển thị {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} trên tổng số {filtered.length} sản phẩm
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:border-[#1557A0] rounded-xl text-xs font-bold text-slate-700 hover:text-[#1557A0] shadow-xs transition-all disabled:opacity-30 disabled:pointer-events-none group"
                    title="Về trang trước"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#1557A0] group-hover:-translate-x-0.5 transition-transform" />
                    <span>Trang trước</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                        currentPage === pageNumber
                          ? 'bg-[#1557A0] text-white shadow-md shadow-blue-500/25 scale-105'
: 'bg-white border border-slate-200 text-slate-700 hover:border-[#1557A0] hover:text-[#1557A0] hover:bg-blue-50/50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:border-[#1557A0] rounded-xl text-xs font-bold text-slate-700 hover:text-[#1557A0] shadow-xs transition-all disabled:opacity-30 disabled:pointer-events-none group"
                    title="Sang trang sau"
                  >
                    <span>Trang sau</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#1557A0] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState
              title="Không tìm thấy sản phẩm nào"
              description="Thử thay đổi từ khóa hoặc xóa bớt bộ lọc."
              actionText="Xóa tất cả bộ lọc"
              onAction={reset}
            />
          )}
        </div>
      </div>
    </div>
  );
};