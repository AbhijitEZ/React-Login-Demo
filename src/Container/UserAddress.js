import React,{Component} from 'react';
import {Breadcrumb,  Segment, Card,  Grid,  Header,  Container,Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions';


class UserAddress extends Component {
  constructor(props){
    super(props);
    this.state = {dataAddress: null,defaultAddress: null,otherAddress: null, loading: true}
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
  
    this.props.userFetchAddress(`http://139.59.87.122/modtod/beta/api/user/savedAddress`, fetchObj);
    setTimeout(() => {
      
      this.setState({dataAddress:this.props.userAddress})
      this.setState({defaultAddress: this.state.dataAddress.filter(data => data.is_default === 1)})
      this.setState({otherAddress: this.state.dataAddress.filter(data => data.is_default !== 1)})
      this.setState({loading: false})
    },1200)
 }


 


  render(){

    return (
      <Container>
        <Segment>
            
            <Breadcrumb size = 'big'>
            <Link to = '/product/productListings'><Breadcrumb.Section >ProductListing</Breadcrumb.Section></Link>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>User-Address</Breadcrumb.Section>
          </Breadcrumb>
          <Link to = '/'><Button color = 'red' floated = 'right' >LogOut</Button></Link>
          </Segment>
        <Grid columns={2}>
        <Grid.Row>
        <Grid.Column>
        <Header>Saved Addresses</Header>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            
            <Grid.Column>
             
              
            {!this.state.loading ? this.state.defaultAddress.map(data =>(
               <Segment key = {data.id} secondary>
              <Header color ='purple'>Default</Header>
              <Card color = 'green'>
              <Card.Content>
                <Card.Header as = 'h1'>{data.name}</Card.Header>
                <Card.Meta>
                  <span className='date'>{data.created_at}</span>
                </Card.Meta>
                <Card.Description><Header>Address: {data.address}</Header></Card.Description>
                <Card.Description>UserID: {data.user_id}</Card.Description>
                <Card.Description>Postal-Code: {data.postal_code}</Card.Description>
                <Card.Description>State-ID: {data.state_id}</Card.Description>
                <Card.Description>MobileNo: {data.mobile_number}</Card.Description>
                <Card.Description>BillingInfo: {data.is_billing}</Card.Description>
              </Card.Content>
              <Card.Content extra>
            
                  <span>Address-type:- </span>
                  {data.address_type}
               
              </Card.Content>
            </Card>
            </Segment>
               )
             
            ):null}
           
            </Grid.Column>
            <Grid.Column>
            
            {!this.state.loading ? this.state.otherAddress.map(data =>(
              <div key = {data.id} >
              <Header color = 'purple'>Other</Header>
              <Card >
              <Card.Content>
                <Card.Header as = 'h1'>{data.name}</Card.Header>
                <Card.Meta>
                  <span className='date'>{data.created_at}</span>
                </Card.Meta>
                <Card.Description><Header>Address: {data.address}</Header></Card.Description>
                <Card.Description>UserID: {data.user_id}</Card.Description>
                <Card.Description>Postal-Code: {data.postal_code}</Card.Description>
                <Card.Description>State-ID: {data.state_id}</Card.Description>
                <Card.Description>MobileNo: {data.mobile_number}</Card.Description>
                <Card.Description>BillingInfo: {data.is_billing}</Card.Description>
              </Card.Content>
              <Card.Content extra>
            
                  <span>Address-type:- </span>
                  {data.address_type}
               
              </Card.Content>
            </Card>
            </div>
              
             )
             
            ):null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    userAddress: state.userAddress
  };
};

let mapStateToDispatch = (dispatch) => {
  return {
    userFetchAddress : (url, data) => dispatch(actionCreators.userFetchAddress(url, data))
  }
}
export default connect(mapStateToProps, mapStateToDispatch)(UserAddress)