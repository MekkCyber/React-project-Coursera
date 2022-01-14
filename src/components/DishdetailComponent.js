import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


function renderDish(dish){
        return (dish ? 
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
            <h4><CardTitle>{dish.name}</CardTitle></h4>
            <CardText>{dish.description}</CardText>
            </CardBody>
        </Card> : <div></div>);
    }
    
function renderComments(comments){
        return (comments ? <Card>
            <h4> Comments </h4>
            <list class="list-unstyled">
                {comments.map(comment=>{
                    return <li>{comment.comment}<br/><br/>
                                --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                <br/><br/>
                                </li>
                })} 
            </list>
        </Card> : <div></div>);
    }

const DishDetail = (props) => {
            return(
                <div className="container">
                <div className="row">
                    <div className="col-md-5 col-12 m-1">
                       {renderDish(props.dish)} 
                    </div>
                    <div className="col-md-5 col-12 m-1">
                        {props.dish ? renderComments(props.dish.comments) : <div></div>}
                    </div>
                </div>
                </div>
            );
    };

export default DishDetail;