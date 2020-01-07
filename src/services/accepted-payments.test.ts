import acceptedPayments from './accepted-payments';
import { Payment } from '../interfaces';

test('No Payment', ()=> {
    const payments: Payment = {
            cash: false,
            venmo: false,
            paypal: false,
            cashapp: false
    }
    expect(acceptedPayments(payments)).toBe('No Payment');
});

test('Only Cash', ()=> {
    const payments: Payment = {
            cash: true,
            venmo: false,
            paypal: false,
            cashapp: false
    }
    expect(acceptedPayments(payments)).toBe('Only Cash');
});

test('Only Venmo', ()=> {
    const payments: Payment = {
            cash: false,
            venmo: true,
            paypal: false,
            cashapp: false
    }
    expect(acceptedPayments(payments)).toBe('Only Venmo');
});

test('Cash and Venmo', ()=> {
    const payments: Payment = {
            cash: true,
            venmo: true,
            paypal: false,
            cashapp: false
    }
    expect(acceptedPayments(payments)).toBe('Cash and Venmo');
});

test('Cash, Venmo, and PayPal', ()=> {
    const payments: Payment = {
            cash: true,
            venmo: true,
            paypal: true,
            cashapp: false
    }
    expect(acceptedPayments(payments)).toBe('Cash, Venmo, and PayPal');
});

test('Cash, Venmo, PayPal, and Cash App', ()=> {
    const payments: Payment = {
            cash: true,
            venmo: true,
            paypal: true,
            cashapp: true
    }
    expect(acceptedPayments(payments)).toBe('Cash, Venmo, PayPal, and Cash App');
});

test('PayPal and Cash App', ()=> {
    const payments: Payment = {
            cash: false,
            venmo: false,
            paypal: true,
            cashapp: true
    }
    expect(acceptedPayments(payments)).toBe('PayPal and Cash App');
});