export const cellPhonePattern = "#### ## ####";

export function removeCountryCodeAnd9FromRawPhone(rawPhone: string) {
  let result = rawPhone.slice(3); // loại bỏ mã vùng: 84

  // Loại bỏ số 9 nếu có
  result = result.replace(/^9/, ""); // loại bỏ số 9 nếu xuất hiện ở đầu chuỗi

  return result;
}
