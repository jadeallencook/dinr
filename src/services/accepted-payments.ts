export default (payments: any): string => {
    let paymentOptions = [];

    paymentOptions.push(payments.cash ? `Cash` : null);
    paymentOptions.push(payments.venmo ? `Venmo` : null);
    paymentOptions.push(payments.paypal ? `Paypal` : null);
    paymentOptions.push(payments.cashapp ? `Cash App` : null);

    let filteredPaymentOptions = paymentOptions.filter(Boolean);

    if(filteredPaymentOptions.length === 1)
        return `Only ${filteredPaymentOptions[0]}`
    else if(filteredPaymentOptions.length === 2)
        return `${filteredPaymentOptions[0]} and ${filteredPaymentOptions[1]}`;
    else if(filteredPaymentOptions.length === 3)
        return `${filteredPaymentOptions[0]}, ${filteredPaymentOptions[1]}, and ${filteredPaymentOptions[2]}`;
    else if(filteredPaymentOptions.length === 4)
        return `${filteredPaymentOptions[0]}, ${filteredPaymentOptions[1]}, ${filteredPaymentOptions[2]}, and ${filteredPaymentOptions[3]}`;
    else
        return `No Payment`;
}