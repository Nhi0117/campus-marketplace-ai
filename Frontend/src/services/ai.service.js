import { PRODUCTS } from '../data/products';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * AI01 - Trợ lý ảo tìm kiếm sản phẩm thông minh bằng ngôn ngữ tự nhiên
 */
export const chatWithAI = async (userMessage, chatHistory = []) => {
  const cleanMsg = userMessage.toLowerCase().trim();

  // 1. Nếu có cấu hình Gemini API Key thực tế
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `Bạn là trợ lý AI thông minh của nền tảng "Campus Marketplace AI" dành riêng cho sinh viên Đại học Quốc gia TP.HCM (ĐHQG-HCM, KTX Khu A, Khu B, Làng Đại Học Thủ Đức).
Dưới đây là danh sách sản phẩm hiện có trên hệ thống:
${JSON.stringify(PRODUCTS.map(p => ({ id: p.id, title: p.title, price: p.price, school: p.schoolName, location: p.location })))}

Hãy trả lời câu hỏi của bạn sinh viên: "${userMessage}".
Quy tắc:
- Trả lời thân thiện, gần gũi như một sinh viên khóa trên (dùng "mình", "bạn").
- Nếu tìm thấy sản phẩm phù hợp, hãy nhắc tên sản phẩm và mức giá.
- Đưa ra lời khuyên hữu ích về việc mua bán trong KTX hoặc Làng Đại Học.`
                  }
                ]
              }
            ]
          })
        }
      );
      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return {
          reply: data.candidates[0].content.parts[0].text,
          recommendedProducts: findMatchingProducts(cleanMsg)
        };
      }
    } catch (error) {
      console.warn('Lỗi gọi Gemini API, chuyển sang chế độ AI phản hồi thông minh nội bộ:', error);
    }
  }

  // 2. Chế độ AI phản hồi thông minh nội bộ (Intelligent Fallback Engine)
  // Phân tích từ khóa sinh viên
  await new Promise(res => setTimeout(res, 600)); // Hiệu ứng suy nghĩ

  let matched = findMatchingProducts(cleanMsg);
  let reply = '';

  if (cleanMsg.includes('chào') || cleanMsg.includes('hi') || cleanMsg.includes('hello')) {
    reply = 'Chào bạn nha! Mình là Campus AI Assistant 🎓. Bạn đang cần tìm giáo trình, đồ dùng KTX, laptop hay xe đạp đi học ở Làng Đại Học vậy? Cứ bảo mình nhé!';
  } else if (cleanMsg.includes('ktx') || cleanMsg.includes('khu b') || cleanMsg.includes('khu a')) {
    reply = `Ở KTX Khu A và Khu B đang có các món đồ gia dụng cực tiện này bạn ơi: ${matched.length > 0 ? matched.map(p => `"${p.title}"`).slice(0, 2).join(' và ') : 'quạt bàn, ấm siêu tốc, bàn học gấp gọn'}. Bạn có muốn hẹn người bán gặp ngay tại sảnh tòa nhà để xem đồ không?`;
  } else if (cleanMsg.includes('sách') || cleanMsg.includes('giáo trình') || cleanMsg.includes('giải tích') || cleanMsg.includes('ielts')) {
    reply = `Mình tìm thấy giáo trình và tài liệu học tập phù hợp cho bạn đây! Đa số là tài liệu của các bạn sinh viên Bách Khoa, KHTN vừa qua môn A+ nhượng lại, có sẵn ghi chú giải đề thi luôn đó:`;
  } else if (cleanMsg.includes('rẻ') || cleanMsg.includes('dưới 100k') || cleanMsg.includes('sinh viên')) {
    matched = PRODUCTS.filter(p => p.price <= 200000);
    reply = `Đây là các món đồ "hạt dẻ" giá sinh viên chỉ từ vài chục ngàn đến dưới 200k đang được pass nhiều nhất hôm nay:`;
  } else if (cleanMsg.includes('máy tính') || cleanMsg.includes('laptop') || cleanMsg.includes('màn hình') || cleanMsg.includes('code')) {
    reply = `Nếu bạn học khối Công nghệ Thông tin (UIT, Bách Khoa) thì nghía qua các món đồ công nghệ này nhé, rất tiện mang lên thư viện hoặc học nhóm:`;
  } else if (matched.length > 0) {
    reply = `Mình đã quét toàn bộ chợ sinh viên ĐHQG và tìm được ${matched.length} món đồ khớp với nhu cầu "${userMessage}" của bạn này:`;
  } else {
    reply = `Mình đã ghi nhận nhu cầu "${userMessage}". Hiện tại các bạn sinh viên chưa đăng đúng món này, nhưng mình gợi ý bạn xem các sản phẩm đang được quan tâm nhiều bên dưới, hoặc bạn thử gõ từ khóa như "giáo trình", "quạt KTX", "máy tính 580" xem sao nhé!`;
    matched = PRODUCTS.slice(0, 3);
  }

  return {
    reply,
    recommendedProducts: matched.slice(0, 3)
  };
};

/**
 * Trợ giúp tìm kiếm sản phẩm theo từ khóa
 */
function findMatchingProducts(keyword) {
  const words = keyword.toLowerCase().split(/\s+/);
  return PRODUCTS.filter(p => {
    const text = `${p.title} ${p.description} ${p.schoolName} ${p.location} ${p.tags.join(' ')}`.toLowerCase();
    return words.some(w => w.length > 2 && text.includes(w));
  });
}

/**
 * AI02 - Gợi ý sản phẩm thông minh dựa trên hành vi và trường học
 */
export const getAIRecommendations = (userSchool = 'ALL', currentProductId = null) => {
  let list = PRODUCTS.filter(p => p.id !== currentProductId);

  // Ưu tiên sản phẩm cùng trường hoặc sản phẩm nổi bật
  if (userSchool && userSchool !== 'ALL') {
    const sameSchool = list.filter(p => p.schoolId === userSchool);
    const others = list.filter(p => p.schoolId !== userSchool);
    return [...sameSchool, ...others].slice(0, 4);
  }

  return list.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);
};

/**
 * AI03 - Trợ lý tạo nội dung mô tả tin đăng tự động cho người bán
 */
export const generateProductDescription = async ({ title, category, condition, originalPrice, highlights }) => {
  await new Promise(res => setTimeout(res, 800)); // Giả lập AI sinh bài viết

  const intro = `Chào các bạn sinh viên ĐHQG-HCM,\n\nMình hiện tại đang cần pass lại món: **${title}** do không còn nhu cầu sử dụng.`;
  const status = `\n\n📌 **Tình trạng:** ${condition || 'Còn rất tốt, sử dụng bình thường'}\n📌 **Đặc điểm nổi bật:** ${highlights || 'Đồ giữ gìn cẩn thận, sạch sẽ, hoạt động hoàn hảo.'}`;
  const meet = `\n\n📍 **Giao dịch thuận tiện:**\n- Hẹn gặp trực tiếp tại KTX Khu A / KTX Khu B hoặc khuôn viên các trường ĐHQG (Bách Khoa, KHTN, UIT, Nhân Văn).\n- Ưu tiên các bạn qua xem tận nơi kiểm tra đồ thoải mái trước khi lấy.`;
  const outro = `\n\nBạn nào có nhu cầu thì inbox hoặc nhắn tin Zalo cho mình ngay nhé! Có fix nhẹ tiền xăng/xe bus cho bạn nào nhanh gọn! ✨`;

  return intro + status + meet + outro;
};
