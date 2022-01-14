import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Routes, Route} from 'react-router-dom';
import Contact from './ContactComponent'
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import DishDetail from "./DishdetailComponent"
import { withRouter } from "react-router";

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
    this.onDishSelect=this.onDishSelect.bind(this)
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }
  HomePage = () => {
    return(
        <Home 
            dish={this.state.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
            leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
    );
  }
  DishWithId = ({match}) => {
    return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
    );
  };
  render() {
    return (
      <div>
        <Header/>
        <Routes>
              <Route path='/home' element={<this.HomePage/>} />
              <Route exact path='/menu' element={<Menu dishes={this.state.dishes} onClick1={()=>(dishId)=>this.onDishSelect(dishId)} />} />
              <Route exact path='/contactus' element={<Contact/>}/>
              <Route path='/menu/:dishId' element={<this.DishWithId />} />
              <Route path='*' element={<Menu dishes={this.state.dishes} />} />
        </Routes>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(Main);