import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import {Link} from 'react-router-dom' ;
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { DISHES } from '../shared/dishes'
function RenderMenuItem({dish, onClick}){
return(
    <Card className = "mycard" >
        <Link to = {`/menu/${dish.id}`} >

            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay >
                <CardTitle  className = "myImage" >{dish.name}</CardTitle>
            </CardImgOverlay>
        </Link>
    </Card>
        
     );
} 

const Menu = (props) => { 
      
        const menu = DISHES.map( (dish) => {
            return (
                <div  className="col-12 col-md-5 m-1">
                   <RenderMenuItem dish = {dish} onClick = {props.onClick}/>
                </div>
            );
        });

   
        return(       
            <div className = "container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className = "col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>
                <div className = "row title">
             
                        {menu}
            
                </div>
            </div>
           
        );

    
}



export default Menu;