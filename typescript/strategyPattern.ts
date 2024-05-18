
interface PaymentProcessStrategy {
  processPayment(amount: number): void;
}

class CreditCardPayment implements PaymentProcessStrategy {
  private cardNumber: string;
  private expiryDate: string;
  private ccv: number;

  constructor(cardNumber: string, expiryDate: string, ccv: number) {
    this.cardNumber = cardNumber;
    this.expiryDate = expiryDate;
    this.ccv        = ccv;
  }

  processPayment(amount: number): void {
    console.log('Processing Credit Card Payment for ', amount);
  }
}

class PayPalPayment implements PaymentProcessStrategy {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  processPayment(amount: number): void {
    console.log('Processing PayPal Payment for ', amount);
  }
}

class BitcointPayment implements PaymentProcessStrategy {
  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  processPayment(amount: number): void {
    console.log('Processing Bitcoin Payment for ', amount);
  }
}

class PaymentContext {
  private processingStrategy: PaymentProcessStrategy | null = null;

  changeStrategy(strategy: PaymentProcessStrategy) {
    this.processingStrategy = strategy;
  }

  pay(amount: number) {
    if(this.processingStrategy) {
      this.processingStrategy.processPayment(amount);
    }
  }
}

function main() {
  const context = new PaymentContext();

  const creditCardPayment = new CreditCardPayment('712-122-3234', '11/23', 431);
  context.changeStrategy(creditCardPayment);
  context.pay(100);

  const bitcoinPayment = new BitcointPayment('@saddash14');
  context.changeStrategy(bitcoinPayment);
  context.pay(150);
}







