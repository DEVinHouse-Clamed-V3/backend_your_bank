class CreditCardUtils {
  static generateCvvNumber() {
    return Math.floor(100 + Math.random() * 900);
  }

  static generateCardNumber() {
    const cardNumber = Math.floor(
      1000000000000000 + Math.random() * 9000000000000000
    );
    return cardNumber.toString();
  }
}

export default CreditCardUtils;
