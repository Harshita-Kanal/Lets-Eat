//container component
// deals with states etc.
import React, {Component} from 'react';
import Menu from "./MenuComponents";
import Header from "./HeaderComponent";
import DishDetail from "./DishdetailComponent";
import Home from './HomeComponent';
import Contact from './ContactComponent'
import Footer from "./FooterComponent";
import About from './AboutComponent'
// import { addComment } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DISHES } from '../shared/dishes';
import {LEADERS} from '../shared/leaders';
import {COMMENTS} from '../shared/comments'
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  
  }
}



const mapDispatchToProps = dispatch => ({

  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => { dispatch(fetchLeaders()) },
});



class Main extends Component {

  constructor(props){
    super(props);
  
  }
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }


    render(){

      const HomePage = () => {
        return (
          <Home
            dish={DISHES[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promoLoading={this.props.promotions.isLoading}
            promoErrMess={this.props.promotions.errMess}
            leader={LEADERS.filter((leader) => leader.featured)[0]}
            leadersLoading={this.props.leaders.isLoading}
            leadersErrMess={this.props.leaders.errMess}
          />
        );
      }

      const DishWithId = ({ match }) => {
        return (
          // <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          //   comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          //  />

          <DishDetail 
            dish={DISHES.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={COMMENTS.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
          />
        );
      };

    return(
      <div >
      <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
       {/* <Menu  dishes = {this.state.dishes} onClick = {(dishId) => this.onDishSelect(dishId)}/> 
       <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/> */}   
            <Switch location={this.props.location}>
              <Route path = '/home' component = {HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={DISHES} />} />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}/>
              <Route exact path="/aboutus" component={() => <About leaders={LEADERS} 
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMess={this.props.leaders.errMess} />} />
              <Route path = '/menu/:dishId' component = {DishWithId} />
              <Redirect to = "/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
       <Footer />
      </div>
    );

  }
}

// export default withRouter(connect(mapStateToProps)(Main));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));