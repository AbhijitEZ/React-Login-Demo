import React,{Component} from 'react';
import {Breadcrumb,Icon,  Segment, Card, Image, Grid, Button, Header } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions';
class Product extends Component{
  constructor(props){
    super(props);
    this.state = {data: null, images : '',users : null, loading: true}
  }
componentDidMount(){
  let fetchObj = {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
       'Authorization' : 'Bearer ' + localStorage.getItem('authen')
    }
  }

  this.props.productData(`http://139.59.87.122/modtod/beta/api/product/detail/${this.props.match.params.id}`, fetchObj);

}
componentDidUpdate(prevProps){
  if(prevProps.productDetail !== this.props.productDetail ){
    this.setState({loading: false});
  }
}



  render(){
    return(
      <div>
        
              <Segment>
                  
                <Breadcrumb size = 'big'>
              <Link to = '/product/productListings'><Breadcrumb.Section >ProductListing</Breadcrumb.Section></Link>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Product</Breadcrumb.Section>
            </Breadcrumb>
        </Segment>
  
     {!this.state.loading?( 
       <Grid centered columns ={4}>
       <Grid.Row>
       <Grid.Column>
         <Link to = {`/user/getUserProfile/${this.props.productDetail.user_id}`}>
     <Card >
     <Header textAlign = 'center' size = 'huge'>{`${this.props.productDetail.title}`}</Header>
     
    <Image src={this.props.productImage.url} size = 'medium'/>
    <Card.Content>
      <Card.Header>{this.props.productDetail.username}</Card.Header>
      <Card.Meta>
        <span className='date'>{this.props.productDetail.birthdate}</span>
      </Card.Meta>
      <Card.Description as = 'h2'>{this.props.productDetail.description}</Card.Description>
      <Card.Description  as = 'h5'><b>Username:</b> {this.props.singleUser.username}
  
      </Card.Description>
      <Card.Description as = 'h5'><b>E-mail:</b> {this.props.singleUser.email}</Card.Description>
    
      <Card.Description as = 'h5'><b>Commision:</b> {this.props.productDetail.commision}</Card.Description>
      <Card.Description as = 'h5'><b>Postal code:</b> {this.props.productDetail.postal_code}
      </Card.Description>
      <Card.Description as = 'h5'><b>User Rating:</b> {this.props.productDetail.user_rating}
      </Card.Description>
      <Card.Description as = 'h5'><Button primary icon labelPosition='right' disabled>Price: <Icon name='money bill alternate outline' /></Button> {this.props.productDetail.price}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    DT: {this.props.productDetail.created_at}
    </Card.Content>

     </Card>
     </Link>
     </Grid.Column>
     </Grid.Row>
      </Grid>
     ):null}
    
     </div>
    )
  }
}
let mapStateToProps = (state) => {
  return {
  authen: state.auth,
  productDetail: state.productDetail,
  singleUser: state.singleUser,
  productImage: state.productImage
  };
};

let mapStateToDispatch = (dispatch) => {
  return {
    productData : (url, data) => dispatch(actionCreators.productData(url, data))
  }
}
export default connect(mapStateToProps, mapStateToDispatch)(Product)