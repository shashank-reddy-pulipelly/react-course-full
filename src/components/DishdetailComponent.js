import React,{Component} from'react';
import {Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal, ModalHeader, ModalBody,Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function RenderDish({dish}) {
  
      return(
      <div key={dish.id}>
         <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
   <Card >
              <CardImg top src={baseUrl+dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle heading="true">{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
          </Card>
          </FadeTransform>
      
      </div>
       
      );
 
}



function RenderComments({comments, postComment, dishId}) {

const com=comments.map(coms=>{
  return (
    <Fade in>
  <div key={coms.id}>
  <li className="mb-3" >{coms.comment}</li>
             <li className="mb-3" >-- {coms.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(coms.date)))}</li>
      </div>
      </Fade>
  );


})

      return(        
        <div>
          <h4 >Comments</h4>
          <ul className="list-unstyled">
            <Stagger in>
            {com}
            </Stagger>
         
          </ul>
          <CommentForm dishId={dishId} postComment={postComment} />
        </div>
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
      
    this.props.postComment(this.props.dishId, values.Rating, values.name, values.message);

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
  if(props.isLoading){
    return(
      <div className="container">
        <div className="row">
        <Loading />
        </div>
      </div>
    );
  }
  else if(props.errMess){
      return(
        <div className="container">
        <div className="row">
         <h4>{props.errMess}</h4>
        </div>
      </div>
      );
  }
  else if(props.dish!=null){
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
            <RenderComments comments={props.comments} postComment={props.postComment}
        dishId={props.dish.id}/>
         
        </div>
        </div>
    </div>
  );}
  else
  return <div></div>;
  
}

export default DishDetail;
