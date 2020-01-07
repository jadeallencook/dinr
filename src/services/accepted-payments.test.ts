import acceptedPayments from './accepted-payments';
import { Payment } from '../interfaces';

test('', ()=> {
    const payments: Payment = {
            cash: false,
            venmo: false,
            paypal: false,
            cashapp: false
    }
    expect(acceptedPayments(payments)).toBe('No Payment');
});

test('', ()=> {
    const payments: Payment = {
            cash: true,
            venmo: false,
            paypal: false,
            cashapp: false
    }
    expect(acceptedPayments(payments)).toBe('Only Cash');
});

test('', ()=> {
    const payments: Payment = {
            cash: true,
            venmo: true,
            paypal: false,
            cashapp: false
    }
    expect(acceptedPayments(payments)).toBe('Cash and Venmo');
});

test('', ()=> {
    const payments: Payment = {
            cash: true,
            venmo: true,
            paypal: true,
            cashapp: false
    }
    expect(acceptedPayments(payments)).toBe('Cash, Venmo, and Paypal');
});

test('', ()=> {
    const payments: Payment = {
            cash: true,
            venmo: true,
            paypal: true,
            cashapp: true
    }
    expect(acceptedPayments(payments)).toBe('Cash, Venmo, Paypal, and Cash App');
});

test('', ()=> {
    const payments: Payment = {
            cash: false,
            venmo: false,
            paypal: true,
            cashapp: true
    }
    expect(acceptedPayments(payments)).toBe('Paypal and Cash App');
});