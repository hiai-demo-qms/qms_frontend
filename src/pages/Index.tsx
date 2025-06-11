
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ChatbotButton from "@/components/ChatbotButton";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 md:text-5xl">
                Hệ thống Quản lý Tài liệu ISO
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Tối ưu hóa quy trình quản lý chất lượng của bạn với hệ thống quản lý tài liệu
                toàn diện được thiết kế để tuân thủ tiêu chuẩn ISO.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => navigate("/register")}
                  className="bg-qms-blue hover:bg-qms-lightBlue text-white px-8 py-6"
                  size="lg"
                >
                  Bắt đầu
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  className="px-8 py-6"
                  size="lg"
                >
                  Đăng nhập
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Tính năng chính</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Quản lý Tài liệu ISO</h3>
                <p className="text-gray-600">
                  Tổ chức và quản lý tất cả tài liệu ISO của bạn trong một hệ thống tập trung.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Kiểm soát Phiên bản</h3>
                <p className="text-gray-600">
                  Theo dõi các phiên bản và thay đổi tài liệu với lịch sử toàn diện.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Trợ lý AI</h3>
                <p className="text-gray-600">
                  Nhận hỗ trợ tức thì cho các câu hỏi về tài liệu ISO của bạn bằng chatbot của chúng tôi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ISO Standards section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Hỗ trợ Nhiều Tiêu chuẩn ISO
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border border-gray-200 text-center">
                <h3 className="text-xl font-semibold mb-3">ISO 9001:2015</h3>
                <p className="text-gray-600">
                  Hệ thống Quản lý Chất lượng
                </p>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 text-center">
                <h3 className="text-xl font-semibold mb-3">ISO 14001:2015</h3>
                <p className="text-gray-600">
                  Hệ thống Quản lý Môi trường
                </p>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 text-center">
                <h3 className="text-xl font-semibold mb-3">ISO 27001:2013</h3>
                <p className="text-gray-600">
                  Quản lý Bảo mật Thông tin
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2025 QMS Hub. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
      
      <ChatbotButton />
    </div>
  );
};

export default Index;
