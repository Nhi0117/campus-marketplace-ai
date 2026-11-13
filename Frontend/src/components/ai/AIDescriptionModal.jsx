import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { generateProductDescription } from '../../services/ai.service';

export const AIDescriptionModal = ({
  isOpen,
  onClose,
  initialData = {},
  onApply
}) => {
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const text = await generateProductDescription(initialData);
      setGeneratedText(text);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (onApply && generatedText) {
      onApply(generatedText);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✨ AI03 - Trợ lý sinh mô tả tin đăng"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        <p className="text-xs text-slate-500 leading-relaxed">
          AI sẽ tự động soạn một bài đăng chuyên nghiệp, đầy đủ thông tin, thân thiện với sinh viên ĐHQG dựa trên tiêu đề và thông tin sơ lược của bạn.
        </p>

        {/* Thông tin đầu vào tóm tắt */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
          <p><strong className="text-slate-700">Tên món đồ:</strong> {initialData.title || '(Chưa nhập)'}</p>
          <p><strong className="text-slate-700">Tình trạng:</strong> {initialData.condition || 'Còn tốt'}</p>
        </div>

        {/* Nút bấm sinh nội dung */}
        {!generatedText && (
          <div className="text-center py-4">
            <Button
              variant="primary"
              size="md"
              loading={loading}
              icon={Sparkles}
              onClick={handleGenerate}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white"
            >
              Bắt đầu tạo bài viết bằng AI
            </Button>
          </div>
        )}

        {/* Kết quả */}
        {generatedText && (
          <div className="space-y-3">
            <div className="relative">
              <textarea
                rows={8}
                value={generatedText}
                onChange={(e) => setGeneratedText(e.target.value)}
                className="w-full text-xs p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-sans leading-relaxed"
              />
              <button
                onClick={handleCopy}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-600 hover:text-blue-600 text-xs flex items-center gap-1 shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copied ? 'Đã copy' : 'Sao chép'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={handleGenerate} loading={loading}>
                Tạo lại mẫu khác
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Đóng
                </Button>
                <Button variant="primary" size="sm" onClick={handleApply}>
                  Áp dụng vào bài đăng
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
