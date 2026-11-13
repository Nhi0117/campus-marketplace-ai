import React, { useMemo } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAIRecommendations } from '../../services/ai.service';
import { ProductCard } from '../common/ProductCard';

export const AIRecommendation = ({ userSchool = 'ALL', currentProductId = null, title = "Gợi ý AI dành riêng cho bạn" }) => {
  const recommended = useMemo(() => {
    return getAIRecommendations(userSchool, currentProductId);
  }, [userSchool, currentProductId]);

  if (!recommended || recommended.length === 0) return null;

  return (
    <section className="my-10 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-purple-50/70 rounded-3xl p-6 sm:p-8 border border-blue-100/80 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {title}
              <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">AI02</span>
            </h2>
            <p className="text-xs text-slate-500">Dựa trên ngành học, lịch sử xem và xu hướng sinh viên ĐHQG</p>
          </div>
        </div>

        <Link
          to="/products"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
        >
          Xem tất cả <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recommended.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
