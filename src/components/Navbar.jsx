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
            <nav className="navbar sticky-top bg-dark shadow-lg mb-3">
                <Container className="d-flex justify-content-between align-items-center py-3">
                    <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2 text-red">
                        <img src="/imgs/logo.svg" alt="Logo" width="35" height="35" />
                        <span className="fw-bold fs-4">TWS DevOps Junoon</span>
                    </NavLink>

                    <div className="d-flex align-items-center gap-4">
                        <Nav className="gap-4">
                            <NavLink to="/" className={({ isActive }) => `nav-link text-red ${isActive ? 'fw-bold' : ''}`}>
                                Store
                            </NavLink>
                            <NavLink to="/admin" className={({ isActive }) => `nav-link text-blue ${isActive ? 'fw-bold' : ''}`}>
                                Admin
                            </NavLink>
                        </Nav>

                        <a href="https://github.com/Vansh-13" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle hover-scale">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="https://www.linkedin.com/in/vansh-madaan-504a3424a/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-circle hover-scale">
                            <FontAwesomeIcon icon={faUser} />
                        </a>

                        <ThemeToggle />

                        {/* Cart Button */}
                        <Button variant="outline-light" className="position-relative hover-scale" onClick={handleCartToggle}>
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
            <Offcanvas show={showCart} onHide={handleClose} placement="end" className="cart-offcanvas">
                <Offcanvas.Header closeButton className="bg-dark text-white">
                    <Offcanvas.Title>Your Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="bg-light p-4">
                    {cartItems.length === 0 ? (
                        <p className="text-muted text-center">Your cart is empty.</p>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center border-0 shadow-sm mb-2">
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

            {/* CSS Enhancements */}
            <style>
                {`
                    .navbar {
                        background-color: #333 !important;
                    }

                    .navbar-brand {
                        transition: all 0.3s ease;
                    }

                    .navbar-brand:hover {
                        transform: scale(1.05);
                    }

                    .btn-outline-light {
                        transition: all 0.3s ease;
                    }

                    .btn-outline-light:hover {
                        background-color: #8a2be2;
                        color: white;
                        transform: scale(1.1);
                    }

                    .hover-scale:hover {
                        transform: scale(1.1);
                    }

                    .cart-offcanvas .offcanvas-body {
                        padding-top: 2rem;
                    }

                    .cart-offcanvas .offcanvas-title {
                        font-size: 1.25rem;
                        font-weight: bold;
                    }

                    .cart-offcanvas .btn-outline-danger:hover {
                        background-color: #e25555;
                    }
                `}
            </style>
        </>
    );
}
