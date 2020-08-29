import React,{Component} from'react';
import {Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal, ModalHeader, ModalBody,Label, Col ,Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


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
             <li className="mb-3" >-- {coms.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(coms.date)))}</li>
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

class CommentForm extends Component{
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isModalOpen: false
    }
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));

}
    render(){
      return(
        <div>
          <Button outline  color="secondary" onClick={this.toggleModal}><i className="fa fa-lg fa-pencil" ></i> Submit Comments</Button>
<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
       <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
       <ModalBody>
       
<LocalForm onSubmit={(values) => this.handleSubmit(values)}>

     
    <Label  htmlFor="Rating" >Rating</Label>
    <Control.select model=".Rating" name="Rating"
         className="form-control" id="Rating">
         <option>1</option>
         <option>2</option>
         <option>3</option>
         <option>4</option>
         <option>5</option>
         </Control.select>
         <Label className="mt-2" htmlFor="name" >Your Name</Label>
         <Control.text model=".name" id="name" name="name"
         placeholder="Your Name"
         className="form-control mt-0"
            validators={{
             minLength: minLength(3), maxLength: maxLength(15)
                  }}/>
      <Errors
       className="text-danger"
       model=".name"
       show="touched"
       messages={{
   
      minLength: 'Must be greater than 2 characters',
      maxLength: 'Must be 15 characters or less'
       }}
     />         
      <Label className="mt-2" htmlFor="message" >Comment</Label>
      <Control.textarea model=".message" id="message" name="message" rows="6"
     className="form-control" />
     
     <Button className="mt-2" type="submit" color="primary">Submit</Button>
   
  
       </LocalForm>
           

       </ModalBody>
   </Modal>
        </div>
       

      );
    }

  
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
            <CommentForm />
        </div>
        </div>
    </div>
  );
}

export default DishDetail;
