import { SmileySad } from "phosphor-react";

interface Props {
  text?: string;
}
export function ErrorAlert(props: Props) {
  return (
    <div className="alert alert-error shadow-lg">
      <SmileySad className="w-6 h-6" />
      <span className="text-error-content">{props.text ?? "Lỗi! Không tìm thấy dữ liệu."}</span>
    </div>
  );
}
