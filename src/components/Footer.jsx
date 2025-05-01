import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faMapMarkerAlt, faPhone, faArrowRight, faLink } from "@fortawesome/free-solid-svg-icons";

export function Footer() {
    return (
        <footer className="custom-footer text-white pt-5">
            <Container>
                <Row className="gy-4">
                    <Col md={4}>
                        <div className="footer-logo d-flex align-items-center mb-3">
                            <img src="/imgs/logo.svg" alt="Logo" width="40" height="40" className="me-2" />
                            <h4 className="mb-0"><span className="text-primary">Online</span> Shop</h4>
                        </div>
                        <p className="footer-description">
                            Your go-to destination for online shopping. Fast, reliable, and affordable.
                        </p>
                        <div className="footer-contact mt-3">
                       
                        </div>
                    </Col>

                    <Col md={2}>
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled footer-links">
                            <li><FontAwesomeIcon icon={faLink} className="me-2" /><a href="#">Privacy Policy</a></li>
                            <li><FontAwesomeIcon icon={faLink} className="me-2" /><a href="#">Terms & Conditions</a></li>
                            <li><FontAwesomeIcon icon={faLink} className="me-2" /><a href="#">Return Policy</a></li>
                        </ul>
                    </Col>

                    <Col md={2}>
                        <h5 className="mb-3">More Links</h5>
                        <ul className="list-unstyled footer-links">
                            <li><FontAwesomeIcon icon={faLink} className="me-2" /><a href="#">Shipping Info</a></li>
                            <li><FontAwesomeIcon icon={faLink} className="me-2" /><a href="#">FAQ</a></li>
                            <li><FontAwesomeIcon icon={faLink} className="me-2" /><a href="#">Support</a></li>
                        </ul>
                    </Col>

                    <Col md={4}>
                        <h5 className="mb-3">Connect With Us <FontAwesomeIcon icon={faArrowRight} className="ms-2" /></h5>
                        <div className="social-icons d-flex gap-3">
                            <a href="https://github.com/Vansh-13" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="https://www.linkedin.com/in/vansh-madaan-504a3424a/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            
                        </div>
                    </Col>
                </Row>

                <hr className="footer-divider my-4" />

                <div className="text-center small-text">
                    <p className="mb-1">Made with <FontAwesomeIcon icon={faHeart} className="text-danger" /> for the community</p>
                    <p>&copy; {new Date().getFullYear()} Online Shop. All rights reserved.</p>
                    
                </div>
            </Container>
        </footer>
    );
}
