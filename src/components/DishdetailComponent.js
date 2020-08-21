import React,{Component} from'react';
import {Card, CardImg, CardText, CardBody,
  CardTitle } from 'reactstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';

class DishDetail extends Component{

constructor(props){
  super(props);

  this.state={


  }
}
 renderDish(selectedDish) {
  if (selectedDish!= null)
      return(
      <div key={selectedDish.id}>
   <Card >
              <CardImg top src={selectedDish.image} alt={selectedDish.name} />
              <CardBody>
                <CardTitle heading>{selectedDish.name}</CardTitle>
                <CardText>{selectedDish.description}</CardText>
              </CardBody>
          </Card>
      
      </div>
       
      );
  else
      return(
          <div></div>
      );
}




render(){
  
 function renderComments(selectedDish) {

    if (selectedDish!= null){
  const com=selectedDish.comments.map((coms)=>
  {
return(
     <div key={selectedDish.comments.id}>
 
 <div className="mb-3">{coms.comment}</div>
            <div className="mb-3">--{coms.author} <span>{coms.date}</span></div>
     </div>
)
  }
  )
        return(        
          <div>
            <h4 >Comments</h4>
            {com}
          </div>
        );}
    else
        return(
            <div></div>
        );
  }

  return (
    <div className="row">
      <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.selectedDish)}
      </div>
      <div className="col-12 col-md-5 m-1">
        {renderComments(this.props.selectedDish)}
      </div>
    </div>
  );
}
}
export default DishDetail;