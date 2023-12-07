export function formatCelular( phoneNumber: string ) :string {
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
    const isValid = /^(0?[1-9]{2})[9]{1}\d{8}$/.test(numericPhoneNumber);
    if (!isValid) {
      return '--';
    }
    const areaCode = numericPhoneNumber.substring(0, 2);
    const firstDigit = numericPhoneNumber.substring(2, 3);
    const nextDigits = numericPhoneNumber.substring(3, 7);
    const lastDigits = numericPhoneNumber.substring(7);
    const formattedNumber = `(${areaCode}) ${firstDigit} ${nextDigits}-${lastDigits}`;
    return formattedNumber;
  }