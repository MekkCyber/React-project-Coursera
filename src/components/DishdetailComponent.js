import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { LocalForm, Errors, Control } from "react-redux-form";
import { Row, Col, Label } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Component } from "react";
import { Loading } from './LoadingComponent';


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  handleSubmit=(values)=>{
    this.props.addComment(this.props.dishId,values.rating,values.author,values.comment)
  }
  required = (val) => val && val.length;
  maxLength = (len) => (val) => !val || val.length <= len;
  minLength = (len) => (val) => val && val.length >= len;
  render() {
    return (
      <div>
        <button className="col-12 col-md-5 offset-1" onClick={this.toggleModal}>
          <span className="fa fa-pencil"></span>
          <span> Submit Comment</span>
        </button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader>
            Submit Comment
            <button 
              className="offset-11s"
              onClick={this.toggleModal}
              type="button"
              class="close"
              aria-label="Close"
            >
              <span className="order-last" aria-hidden="true">
                &times;
              </span>
            </button>
          </ModalHeader>

          <ModalBody>
            <LocalForm onSubmit={() => {}}>
              <Row className="form-group">
                <Label className="col-12" htmlFor="rating">
                  Rating
                </Label>
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
                <Label className="col-12" htmlFor="name">
                  Your Name
                </Label>
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
                    model=".name"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label className="col-12" htmlFor="message">
                  Comment
                </Label>
                <Col>
                  <Control.textarea
                    model=".message"
                    id="message"
                    name="message"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
            </LocalForm>
            <button type="submit" className="col-6 col-sm-2 button btn-primary" >
              Submit
            </button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function renderDish(dish) {
  return dish ? (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <h4>
          <CardTitle>{dish.name}</CardTitle>
        </h4>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  ) : (
    <div></div>
  );
}

function RenderComments({comments,addComment,dishId}) {
  return (
    <div>
      {comments ? (
        <Card>
          <h4> Comments </h4>
          <list class="list-unstyled">
            {comments.map((comment) => {
              return (
                <li>
                  {comment.comment}
                  <br />
                  <br />
                  --{comment.author},{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                  <br />
                  <br />
                </li>
              );
            })}
          </list>
        </Card>
      ) : (
        <div></div>
      )}
      <CommentForm addComment={addComment} dishId={dishId}/>
    </div>
  );
}

const DishDetail = (props) => {
    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  }
  else if (props.dish != null) 
    <div className="container">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/menu">Menu</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
      </Breadcrumb>
      <div className="row">
        <div className="col-md-5 col-12 m-1">{renderDish(props.dish)}</div>
        <div className="col-md-5 col-12 m-1">
          {props.dish ? <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/> : <div></div>}
        </div>
      </div>
    </div>
  
};

export default DishDetail;
