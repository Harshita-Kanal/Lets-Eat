import React from 'react';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {DISHES} from '../shared/dishes'
import { FadeTransform } from 'react-animation-components';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

function RenderCard({item, isLoading, errMess}){

        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card className = "display">
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle className = "tit">{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
  
}


function Home(props){
    const dish = { 
        id: 0,
        name: 'Uthappizza',
        image: '/assets/images/uthappizza.png',
        category: 'mains',
        label: 'Hot',
        price: '4.99',
        featured: true,
        description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'}

    const leader = {
        id: 0,
        name: 'Peter Pan',
        image: '/assets/images/alberto.png',
        designation: 'Chief Epicurious Officer',
        abbr: 'CEO',
        featured: false,
        description: "Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future."
    }

    const promotion = {
            id: 0,
            name: 'Weekend Grand Buffet',
            image: '/assets/images/buffet.png',
            label: 'New',
            price: '19.99',
            featured: true,
            description: 'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person'
    }
    return(
        <div className="container">
            <div className="row">
                <div className = "col- col-md m-1 ">
                    <RenderCard item = {dish}
                        isLoading={props.dishesLoading} errMess={props.dishesErrMess}     
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={promotion} isLoading={props.promoLoading} errMess={props.promoErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={leader} isLoading={props.leadersLoading} errMess={props.leadersErrMess} />
                </div>
        
            </div>
            <br/>
            <br/>
        </div>
    )
}


export default Home;