import { useState } from 'react';
function Checkout({ cart, placeOrder }) {
    const [name, setName] = useState('');
    const [shippingAddress, setShippingAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    function handleSubmit(e) {
        e.preventDefault();
        const order = { 
            name, 
            shippingAddress, 
            billingAddress, 
            paymentMethod, 
            items: cart, 
            total, 
            date: new Date().toLocaleDateString()
        };
        placeOrder(order);
    }

    return (
        <div>
            <h1>Checkout Page</h1>
            {cart.map((item) => (
                <div key={item.id}>
                <h3>{item.name}</h3>
                <p>৳{item.price.toFixed(2)}</p>
                <p>Qty: {item.quantity}</p>
                </div>
            ))}

            <h2>Total: ৳{total.toFixed(2)}</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Shipping Address:
                    <input type="text" name="shippingAddress" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} required />
                </label>
                <br />
                <label>
                    Billing Address:
                    <input type="text" name="billingAddress" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} required />
                </label>
                <br />
                <label>
                    Payment Method:
                    <select name="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bankTransfer">Bank Transfer</option>
                    </select>
                </label>
                <br />
                <button type="submit">Place Order</button>
            </form>
            <p>Thank you for your purchase!</p>
        </div>
    );
   
}

export default Checkout;