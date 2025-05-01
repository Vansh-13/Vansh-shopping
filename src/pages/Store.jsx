import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useShoppingItems } from "../context/ShoppingItemsContext";
import { SearchBar } from "../components/SearchBar";
import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Store() {
    const { products, isLoadingProducts } = useShoppingItems();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState(null);
    const [visibleProducts, setVisibleProducts] = useState(20);

    const filteredProducts = useMemo(() => {
        let filtered = products;

        if (searchQuery.trim()) {
            const searchLower = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(product => (
                product.name.toLowerCase().includes(searchLower) ||
                product.brand.toLowerCase().includes(searchLower) ||
                product.category.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower)
            ));
        }

        if (activeFilters) {
            if (activeFilters.category.length > 0) {
                filtered = filtered.filter(product =>
                    activeFilters.category.includes(product.category)
                );
            }

            if (activeFilters.priceRange.min) {
                filtered = filtered.filter(product =>
                    product.price >= Number(activeFilters.priceRange.min)
                );
            }
            if (activeFilters.priceRange.max) {
                filtered = filtered.filter(product =>
                    product.price <= Number(activeFilters.priceRange.max)
                );
            }

            if (activeFilters.rating > 0) {
                filtered = filtered.filter(product =>
                    product.rating >= activeFilters.rating
                );
            }
        }

        return filtered;
    }, [products, searchQuery, activeFilters]);

    const displayedProducts = filteredProducts.slice(0, visibleProducts);

    const loadMore = () => {
        setVisibleProducts(prev => prev + 20);
    };

    if (isLoadingProducts) {
        return (
            <Container className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <SearchBar 
                    onSearch={setSearchQuery} 
                    onFilter={setActiveFilters}
                    placeholder="Search for products..."
                />
                <Button variant="outline-secondary" className="filter-btn">
                    <FontAwesomeIcon icon={faSearch} /> Filters
                </Button>
            </div>

            <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
                {displayedProducts.map(product => (
                    <Col key={product.id}>
                        <StoreItem {...product} />
                    </Col>
                ))}
            </Row>

            <div className="load-more-section mt-4 text-center">
                {filteredProducts.length === 0 && (searchQuery || activeFilters) ? (
                    <div>
                        <h4>No products found</h4>
                        <p>Try adjusting your search criteria or filters.</p>
                    </div>
                ) : filteredProducts.length > visibleProducts ? (
                    <>
                        <Button 
                            onClick={loadMore}
                            variant="primary" 
                            className="mt-3 px-4 py-2"
                        >
                            Load More Products
                        </Button>
                        <div className="mt-2 text-muted">
                            Showing {displayedProducts.length} of {filteredProducts.length} products
                        </div>
                    </>
                ) : (
                    <div className="mt-2 text-muted">
                        All {filteredProducts.length} products are displayed.
                    </div>
                )}
            </div>
        </Container>
    );
}
