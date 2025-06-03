import React from "react";
import { Spinner, Modal } from "react-bootstrap";

const Loader = ({ show, message }) => {
    return (
        <Modal show={show} centered>
            <Modal.Body className="text-center">
                <Spinner animation="border" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                {message && <p className="mt-3">{message}</p>}
            </Modal.Body>
        </Modal>
    );
};

export default Loader;
