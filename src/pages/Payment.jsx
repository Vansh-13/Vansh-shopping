import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function Payment() {
  const { cartItems, totalAmount, removeFromCart } = useShoppingCart();
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    // Handle payment logic here
    alert("Payment Successful!");
    navigate("/"); // Navigate to the homepage after payment
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          <h2 className="mb-4">Payment Information</h2>

          <Form onSubmit={handlePayment}>
            <Form.Group controlId="cardNumber" className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Card Number" required />
            </Form.Group>

            <Form.Group controlId="expiryDate" className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="text" placeholder="MM/YY" required />
            </Form.Group>

            <Form.Group controlId="cvv" className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control type="text" placeholder="CVV" required />
            </Form.Group>

            <Form.Group controlId="nameOnCard" className="mb-3">
              <Form.Label>Name on Card</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Proceed with Payment
            </Button>
          </Form>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header className="text-center">Order Summary</Card.Header>
            <Card.Body>
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                    <img
                      src={item.imageUrl} // Assuming each item has an imageUrl
                      alt={item.name}
                      style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
                    />
                    <div className="flex-grow-1">{item.name}</div>
                    <div>${item.price * item.quantity}</div>
                    <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </div>
                ))
              )}
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between">
                <div><strong>Total:</strong></div>
                <div><strong>${totalAmount.toFixed(2)}</strong></div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
