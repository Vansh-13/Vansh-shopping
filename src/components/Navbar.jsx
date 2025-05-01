import { Container, Nav, Offcanvas, Button, ListGroup, Badge } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ThemeToggle } from "./ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

export function Navbar() {
    const { cartQuantity, cartItems, removeFromCart } = useShoppingCart();
    const [showCart, setShowCart] = useState(false);
    const navigate = useNavigate();

    const handleCartToggle = () => setShowCart(!showCart);
    const handleClose = () => setShowCart(false);
    const handleCheckout = () => {
        setShowCart(false);
        navigate("/payment");
    };

    return (
        <>
            <nav className="navbar sticky-top bg-white shadow-sm mb-3">
                <Container className="d-flex justify-content-between align-items-center">
                    <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
                        <img src="/imgs/logo.svg" alt="Logo" width="30" height="30" />
                        <span className="fw-bold">TWS DevOps Junoon</span>
                    </NavLink>

                    <div className="d-flex align-items-center gap-3">
                        <Nav>
                            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>Store</NavLink>
                            <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>Admin</NavLink>
                        </Nav>

                        <a href="https://github.com/LondheShubham153/online_shop_hackathon" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm rounded-circle">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="https://www.trainwithshubham.com/s/pages/junoonbatch9" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm rounded-circle">
                            <FontAwesomeIcon icon={faUser} />
                        </a>

                        <ThemeToggle />

                        {/* Cart Button */}
                        <Button variant="outline-primary" className="position-relative" onClick={handleCartToggle}>
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {cartQuantity > 0 && (
                                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                                    {cartQuantity}
                                </Badge>
                            )}
                        </Button>
                    </div>
                </Container>
            </nav>

            {/* 🧾 Cart Side Drawer */}
            <Offcanvas show={showCart} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cartItems.length === 0 ? (
                        <p className="text-muted">Your cart is empty.</p>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="fw-bold">{item.name || `Product #${item.id}`}</div>
                                        <small className="text-muted">Quantity: {item.quantity}</small>
                                    </div>
                                    <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

                    {cartItems.length > 0 && (
                        <div className="mt-4">
                            <Button variant="success" className="w-100 py-2 fs-5 fw-semibold" onClick={handleCheckout}>
                                Proceed to Payment
                            </Button>
                        </div>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
