import React,{Component} from 'react';
import {Header,   Button,   Grid,  Segment, Card, Image,Container } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './style/Listing.css'
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions';

class ProductListing extends Component{

constructor(props){
  super(props);
  this.state = { loading : true};
}
  

setData(){
    let fetchObj = {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('authen')
      }
    }
    this.props.productsFetch('http://139.59.87.122/modtod/beta/api/product/productListings', fetchObj);
  
}
componentDidUpdate(prevProps){
  if(prevProps.productsData !== this.props.productsData ){
    this.setState({loading: false});
  }
}

    render(){
       
      return (
        <div>
        <Segment>
        <Header as = 'h2' color = 'purple'>Product</Header>
       
        </Segment>
        <Segment>
          <Button primary onClick ={() => this.setData()}>Data</Button>

          <Link to = '/user/savedAddress'><Button primary>Address</Button></Link>
          <Link to = '/'><Button color = 'red' >LogOut</Button></Link>
          </Segment>
          <Grid columns ={3}>
          {!this.state.loading  ? this.props.productsData.map(ele =>(
            <div key = {ele.id}>
              <Grid.Column>
              <Card className = 'card-view' color = 'blue'>
              <Link to ={`/product/detail/${ele.id}`}>
                <Image src={ele.images[0].url} />
                </Link>
                <Card.Content>
                  <Card.Header>{ele.title}</Card.Header>
                  <Card.Meta>
                    <span className='date'>Price: {ele.price}</span>
                  </Card.Meta>
                  <Card.Description>{ele.description}.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                {ele.created_at}
                </Card.Content>
              </Card>
              </Grid.Column>
      
            </div>
          )) : 
          <Container >
          <Header disabled textAlign = 'center'>Click the DATA to ACCESS the List</Header>
          </Container>}
          </Grid>
        
        </div>
      )
    }
}

let mapStateToProps = (state) => {
  return {
  authen: state.auth,
  productsData : state.productsData
  };
};let mapStateToDispatch = (dispatch) => {
  return {
    productsFetch : (url, data) => dispatch(actionCreators.productsFetch(url, data))
  }
};

export default connect(mapStateToProps, mapStateToDispatch)(ProductListing);