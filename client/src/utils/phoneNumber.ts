export const cellPhonePattern = "#### ## ####";

export function removeCountryCodeAnd9FromRawPhone(rawPhone: string) {
  let result = rawPhone.slice(3);

  result = result.replace(/^9/, ""); 

  return result;
}
