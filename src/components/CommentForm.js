import React, { Component } from "react";
import { LocalForm, Errors, Control } from "react-redux-form";
import { Row, Col, Label } from "reactstrap";
import {Modal, ModalBody,ModalHeader} from 'reactstrap'
class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state={isOpen:true}

  }
  toggleModal = ()=> {
      this.setState({
          isOpen: !this.state.isOpen
      })
  }
  required = (val) => val && val.length;
  maxLength = (len) => (val) => !val || val.length <= len;
  minLength = (len) => (val) => val && val.length >= len;
  render() {
    return (
      <div>
        <button className="col-12 col-md-5 offset-1"><span className='fa fa-pencil'></span><span> Submit Comment</span></button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-10 col-md-6">Submit Comment</div>
              <div className="col-1 order-last">&#10006;</div>
            </div>
            <LocalForm onSubmit={() => {}}>
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Col>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name">Your Name</Label>
                <Col>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    validators={{
                      minLength: this.minLength(3),
                      maxLength: this.maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".firstname"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="message">Your Feedback</Label>
                <Col md={10}>
                  <Control.textarea
                    model=".message"
                    id="message"
                    name="message"
                    rows="12"
                    className="form-control"
                  />
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CommentForm;
