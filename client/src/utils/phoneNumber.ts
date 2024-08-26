export const cellPhonePattern = "+84 (##) #### ####";

// Loại bỏ mã vùng và số 9 khỏi chuỗi số điện thoại thô
export function removeCountryCodeAnd9FromRawPhone(rawPhone: string) {
  // Loại bỏ mã vùng +84 (2 ký tự) khỏi chuỗi số điện thoại
  let result = rawPhone.slice(3); // loại bỏ mã vùng: 84

  // Loại bỏ số 9 nếu có
  result = result.replace(/^9/, ""); // loại bỏ số 9 nếu xuất hiện ở đầu chuỗi

  return result;
}
