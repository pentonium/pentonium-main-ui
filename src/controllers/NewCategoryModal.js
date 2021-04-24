import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col , Form } from 'react-bootstrap';

export const NewCategoryModal = (props) => {
    return (
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton onClick={props.onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Category
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <h4>Create Your Own Category</h4>
          <Form noValidate validated={props.validation} onSubmit={props.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validation01">
                    <Form.Label>New Category Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="newcat"
                        placeholder="Enter New Category Name"
                        onChange={props.myChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a category name.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={props.handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }