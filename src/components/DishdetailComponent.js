import React from'react';
import {Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
function RenderDish({dish}) {
  if (dish!= null)
      return(
      <div key={dish.id}>
   <Card >
              <CardImg top src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle heading="true">{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
          </Card>
      
      </div>
       
      );
  else
      return(
          <div></div>
      );
}

function RenderComments({comments}) {
  if (comments!= null){
const com=comments.map(coms=>{
  return (
    
  <div key={coms.id}>

  <li className="mb-3" >{coms.comment}</li>
             <li className="mb-3" >--{coms.author} -{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(coms.date)))}</li>
      </div>
  );


})
      return(        
        <div>
          <h4 >Comments</h4>
          <ul className="list-unstyled">
         {com}
          </ul>
         
        </div>
      );}
  else
      return(
          <div></div>
      );
}
function DishDetail(props) {
 



  return (
    <div className="container">
    <div className="row">
        <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
        </div>                
    </div>
    <div className="row">
        <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
        </div>
        </div>
    </div>
  );
}

export default DishDetail;