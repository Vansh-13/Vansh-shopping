import { useShoppingItems } from "../context/ShoppingItemsContext";
import { StoreItem } from "./StoreItem";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Search } from "react-bootstrap-icons";

export function Store() {
    const { products, isLoadingProducts, error } = useShoppingItems();
    const [searchQuery, setSearchQuery] = useState("");

    if (isLoadingProducts) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                <ClipLoader color="#8a2be2" size={50} />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <h3 className="text-danger">Error loading products</h3>
                <p>{error}</p>
            </Container>
        );
    }

    const filteredProducts = products?.filter(product =>
        !searchQuery ||
        (product?.name && product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

    if (!products || products.length === 0) {
        return (
            <Container className="text-center mt-5">
                <h3>No products available</h3>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => window.location.reload()}
                >
                    Refresh Page
                </button>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Row className="justify-content-center mb-4">
                <Col md={6}>
                    <InputGroup className="shadow-sm">
                        <InputGroup.Text>
                            <Search />
                        </InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>
                </Col>
            </Row>

            <Row md={2} xs={1} lg={3} className="g-4">
                {filteredProducts.map(item => (
                    <Col key={item.id || Math.random()}>
                        <div className="card h-100 border-0 shadow-sm p-3 rounded">
                            <StoreItem {...item} />
                        </div>
                    </Col>
                ))}
            </Row>

            {filteredProducts.length === 0 && searchQuery && (
                <div className="text-center mt-4">
                    <h5 className="text-muted">No products found matching "<strong>{searchQuery}</strong>"</h5>
                </div>
            )}
        </Container>
    );
}
