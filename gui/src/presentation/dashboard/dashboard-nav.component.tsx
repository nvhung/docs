import { 
    Container, 
    Navbar, 
    Nav, 
    NavDropdown 
} from "react-bootstrap";

export const DashboardNav = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container className="ms-0">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Recently Added Documents" id="recently-added-documents">
                            <NavDropdown.Item href="/dashboard/recent/today">
                                Today
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/dashboard/recent/this-week">
                                This Week
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/dashboard/recent/this-month">
                                This Month
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    );
};
