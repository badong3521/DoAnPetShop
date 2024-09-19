import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

interface Props {
  transparentBg: boolean;
}
export function About({ transparentBg }: Props) {
  return (
    <ReactMarkdown
      className="markdown flex-1 break-words prose max-w-none text-white"
      remarkPlugins={[remarkGfm]}
    >
      {markdownData}
    </ReactMarkdown>
  );
}

const markdownData = `
# 🐾PETSHOP🐾

## 📜 Giới thiệu

Như được hiển thị trong Sơ đồ Quan hệ Thực thể ở trên, hệ thống petshop rất đơn giản, chúng ta có một Người dùng chịu trách nhiệm thực hiện tất cả các hành động có sẵn (xác thực và thực hiện các thao tác CRUD trên các thực thể khác).

- Người dùng có thể tạo, đọc, cập nhật và xóa (CRUD) Khách hàng, và mỗi Khách hàng có thể có nhiều Thú cưng (CRUD cho Thú cưng cũng có sẵn).
- Người dùng cũng có thể CRUD các Dịch vụ được sử dụng để lập lịch Cuộc hẹn cho một Thú cưng cụ thể.
- Người dùng cũng có thể cập nhật trạng thái Cuộc hẹn và lọc Cuộc hẹn theo ngày và trạng thái. Phân trang và sắp xếp cũng được thêm vào.

Dưới đây là một số tính năng tôi đã thêm vào mà tôi rất tự hào, vì chúng là các chủ đề nâng cao, hoặc kết quả cuối cùng rất tốt, hoặc vì nó trông đẹp từ quan điểm lập trình sạch (tính tái sử dụng, phân tách mối quan tâm, v.v.):

- Tôi đã thêm xác thực JWT với logic làm mới token.
- Để có trải nghiệm người dùng tốt hơn, tôi đã quản lý thêm lọc cuộc hẹn, phân trang và trạng thái sắp xếp được lưu trữ trong URL của khách hàng.
- Tôi đã làm mọi thứ trông đẹp mắt và tương thích với mọi thiết bị.
- Mã nguồn Backend tuân theo nhiều mẫu thiết kế DDD.
- Frontend với hệ thống thiết kế đẹp mắt và có cấu trúc tốt.
- Các điểm cuối API có lỗi rõ ràng và có ý nghĩa + DTO xác thực.

## 💻 Công nghệ

- **Typescript** — Ngôn ngữ lập trình mạnh mẽ dựa trên JavaScript.
- **Day.js** — Thư viện tiện ích ngày giờ cho JavaScript.

### 🌐 FRONTEND

- **Next.js** — Framework của React.
- **zustand** — Giải pháp quản lý trạng thái nhỏ gọn, nhanh chóng và mở rộng dựa trên nguyên tắc flux đơn giản.
- **React Query** — Quản lý trạng thái bất đồng bộ mạnh mẽ, các tiện ích trạng thái máy chủ và lấy dữ liệu.
- **tailwindcss** — Framework CSS ưu tiên tiện ích.
- **daisyUI** — Thư viện thành phần phổ biến nhất cho Tailwind CSS.
- **zod** — Xác thực schema đầu tiên của TypeScript với suy luận kiểu tĩnh.
- **React Hook Form** — Các biểu mẫu linh hoạt, hiệu quả và mở rộng với xác thực dễ sử dụng.

### ⚙ BACKEND

- **NestJS** — Framework Node.js để xây dựng các ứng dụng phía máy chủ hiệu quả, đáng tin cậy và có thể mở rộng.
- **MySQL** — Hệ quản trị cơ sở dữ liệu nổi tiếng sử dụng ngôn ngữ SQL.
- **Prisma** — ORM thế hệ tiếp theo cho Node.js và TypeScript.
- **Passport.js** — Xác thực đơn giản, không xâm phạm cho Node.js.
- **passport-JWT** — Chiến lược xác thực Passport sử dụng JSON Web Tokens.
- **class-validator** — Xác thực thuộc tính dựa trên decorator cho các lớp.

# DoAnPetShop
`;
