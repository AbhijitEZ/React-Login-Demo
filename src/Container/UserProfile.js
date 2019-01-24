import React,{Component} from 'react';
import {Breadcrumb,  Segment, Card, Image, Grid,  Header } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions';

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {dataProduct: null, loading: true}
  }
componentDidMount(){
  let fetchObj = {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
       'Authorization' : 'Bearer ' + localStorage.getItem('authen')
    }
  }

  this.props.userDetail(`http://139.59.87.122/modtod/beta/api/user/getUserProfile?user_id=${this.props.match.params.userid}`, fetchObj);

}
componentDidUpdate(prevProps){
  if(prevProps.userInfo !== this.props.userInfo ){
    this.setState({loading: false});
  }
}
    
    render(){
      return(
        <Segment secondary>
          
          <Segment >
              
          <Breadcrumb size = 'big'>
          <Link to = '/product/productListings'><Breadcrumb.Section >ProductListing</Breadcrumb.Section></Link>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>USER</Breadcrumb.Section>
        </Breadcrumb>
    </Segment>
    
       {!this.state.loading?( 
            <Grid  columns ={3}>
            <Grid.Row>
            <Grid.Column>
              <Header color = 'green' as = 'h2'>UserInformation</Header>
          <Card >
          <Header textAlign = 'center' size = 'huge'>{`${this.props.userInfo.username}`}</Header>
          
          <Image src={this.props.userInfo.profile_image} size = 'medium'/>
          <Card.Content>
            <Card.Header>{`${this.props.userInfo.first_name} ${this.props.userInfo.last_name}`}</Card.Header>
            <Card.Meta>
              created_at : <span className='date'>{this.props.userInfo.created_at}</span>
            </Card.Meta>
            <Card.Description  as = 'h5'><b>Social_id :</b> {this.props.userInfo.social_id}
        
            </Card.Description>
            <Card.Description as = 'h5'><b>E-mail:</b> {this.props.userInfo.email}</Card.Description>
          
            <Card.Description as = 'h5'><b>Account_id:</b> {this.props.userInfo.account_id}</Card.Description>
            <Card.Description as = 'h5'><b>ID :</b> {this.props.userInfo.id}
            </Card.Description>
            <Card.Description as = 'h5'><b>Referance_code:</b> {this.props.userInfo.referance_code}
            </Card.Description>
            
          </Card.Content>
      
          </Card>
        
          </Grid.Column>
          <Grid.Column>
          <Header color = 'purple' as = 'h2'>ProductInformation</Header>
                  {this.props.userInfo.products.map((product,index) => (
                    <Card.Group key ={index}>
                    <Card
                    image={product.images[0].url}
                    header={product.title}
                    meta={`Price: ${product.price}`}
                    description={`Description: ${product.description}`}
                    extra = {`Postal Code: ${product.postal_code}`}
                  />
                  </Card.Group>
                )
                )}
            
          </Grid.Column>
          <Grid.Column>
              <ul>
                <Header color = 'blue' as ='h2'>Attributes</Header>
                  {this.props.userInfo.products.map((product,index) => (
                  <Segment key ={index} inverted color = 'blue' compact> {product.attributes.map(ele => ` ${ele.name}`)} </Segment>
                )
                )}
              </ul>
          </Grid.Column>
          </Grid.Row>
            </Grid>
       ):null}
      
       </Segment>
      )
    }
  }

  let mapStateToProps = (state) => {
    return {
    userInfo: state.userInfo
    };
  };
  
  let mapStateToDispatch = (dispatch) => {
    return {
      userDetail : (url, data) => dispatch(actionCreators.userDetail(url, data))
    }
  }


export default connect(mapStateToProps,mapStateToDispatch)(UserProfile);