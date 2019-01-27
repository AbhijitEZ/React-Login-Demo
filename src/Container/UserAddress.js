import React,{Component} from 'react';
import {Breadcrumb,  Segment, Card,  Grid,  Header,  Container,Button, Modal,Dropdown, Form, ModalDescription, Input } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions';


class UserAddress extends Component {
  constructor(props){
    super(props);
    this.state = {dataAddress: null,defaultAddress: null,otherAddress: null, loading: true,
      config : null ,stateID: null, cityID : null, configComp: null}
  }
  id = null;
  address_type = null;
  postal_code = null;
  name = null;
  address = null;
  mobile_number = null;
  is_default = null;

  configComp = null;
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
    this.setState({configComp : JSON.parse(localStorage.getItem('config'))});
   console.log(this.state.configComp)
    
 }
 stateOptions = null
 componentDidUpdate(prevProps){
   if(prevProps.userAddress !== this.props.userAddress){
    this.setState({dataAddress:this.props.userAddress})
    this.setState({defaultAddress: this.props.userAddress.filter(data => data.is_default === 1)})
    this.setState({otherAddress: this.props.userAddress.filter(data => data.is_default !== 1)})
    
    this.setState({config : this.props.commonConfig})
    
    
     
    
       
     
     console.log(this.state.configComp)
    this.setState({loading: false})
    
   }
 }
 onChangeID(event){
  this.id = event.target.value;
  console.log(this.id)
 }
 onChangeAddType(event){
  this.address_type = event.target.value
  console.log(this.address_type)
 }
 onChangeName(event){
  this.name = event.target.value
  console.log(this.name)
 }
 onChangeNum(event){
   this.mobile_number = event.target.value
   console.log(this.mobile_number)
 }
 onChangeADD(event){
   this.address = event.target.value
   console.log(this.address)
 }
 onChangeDefault(event){
   this.is_default = event.target.value
   console.log(this.is_default)
 }
 onChangePostal(event){
   this.postal_code = event.target.value
   console.log(this.postal_code)
 }
handleStateChange(event){
   console.log(event.target.value)
  this.setState({stateID : event.target.value})
}
handleCityChange(event){
 console.log(event.target.value)
  this.setState({cityID : event.target.value})
}
addAddress(){
  let fetchObj = {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('authen')
    }
  }
  this.props.addAddress(`http://139.59.87.122/modtod/beta/api/user/updateAddress?id=${this.id}&address_type=${this.address_type}&postal_code=${this.postal_code}&state_id=${this.state.stateID}&city_id=${this.state.cityID}&name=${this.name}&address=${this.address}&mobile_number=${this.mobile_number}&is_default=${this.is_default}`,fetchObj)

   
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
        { !this.state.loading ?
               <Modal trigger={<Button color = 'green' floated = 'left' >AddAddress</Button>}>
               
               <Modal.Header>ADD Address</Modal.Header>
               
                    <Form>
                      <Form.Field>
                        <label>ID</label>
                        <Input placeholder='ID' onChange ={(event) => this.onChangeID(event)}/>
                      </Form.Field>
                      <Form.Field>
                        <label>Address_type</label>
                        <Input placeholder='Address_type'onChange ={(event) => this.onChangeAddType(event)} />
                      </Form.Field>
                      <Form.Field>
                        <label>Name</label>
                        <Input placeholder='Name' onChange ={(event) => this.onChangeName(event)}/>
                      </Form.Field>
                      <Form.Field>
                        <label>postal_code</label>
                        <Input placeholder='postal_code' onChange ={(event) => this.onChangePostal(event)}/>
                      </Form.Field>
                      <Form.Field>
                        <label>address</label>
                        <Input placeholder='address'onChange ={(event) => this.onChangeADD(event)}/>
                      </Form.Field>
                      <Form.Field>
                        <label>mobile_number</label>
                        <Input placeholder='mobile_number' onChange ={(event) => this.onChangeNum(event)}/>
                      </Form.Field>
                      <Form.Field>
                        <label>is_default</label>
                        <input placeholder='is_default' onChange ={(event) => this.onChangeDefault(event)}/>
                      </Form.Field>
                      </Form>
                 <Modal.Content>
                 <Modal.Description>
                        <select onChange={(event) => this.handleStateChange(event)}  as='Dropdown'>
                    <option>--State--</option>
                    {
                        this.state.configComp.province.map( (data) => (
                            <option value={data.id} key={data.id}>{data.name}</option>
                        ))
                    }
                </select>
                      <select onChange={(event) => this.handleCityChange(event)} name='city_id' as='Dropdown'>
                  <option>--- CITY ---</option>
                  {
                      this.state.configComp.province.map( (data) =>{
                          return (data.id == this.state.stateID) ? data.cities.map( (city) => (
                              <option value={city.id} key={city.id} onSelect = {(event)=>this.handleCity(event,city.id)}>
                              {city.name}
                              </option>
                          )) : null
                      })
                  }
              </select>
                     </Modal.Description>
                 <Button onClick ={() => this.addAddress()}>Add Address</Button>
               </Modal.Content>
               
             </Modal>
          : null}
        </Grid.Column>
        

        </Grid.Row>
       
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
    userAddress: state.userAddress,
    commonConfig: state.commonConfig
  };
};

let mapStateToDispatch = (dispatch) => {
  return {
    userFetchAddress : (url, data) => dispatch(actionCreators.userFetchAddress(url, data)),
    commonConfigData : (url) => dispatch(actionCreators.commonConfigData(url)),
    addAddress : (url,data) => dispatch(actionCreators.addAddress(url, data)),
  }
}
export default connect(mapStateToProps, mapStateToDispatch)(UserAddress)