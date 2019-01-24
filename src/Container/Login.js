import React, {Component} from 'react';
import {Header,Icon,Form, Input,   Button,  Label, Grid,  Segment } from 'semantic-ui-react';
import './style/login.css';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions';
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {email: '',password: '', device_token: '', os_type: '',  auth : null};
  }
  email = '';
  password = '';
  device_token = '';
  os_type = '';

  handleEmail = (event) => {
    this.email = event.target.value;
  }

   handlePassword = (event,{name,value}) => {
    this.password = value
  }
  handleDeviceToken = (event,{name,value}) => {
    this.device_token = value
  }
  handleOsType = (event,{name,value}) => {
    this.os_type = value
  }
  setValuesToState = (event) => {
    this.setState({email : this.email, password: this.password, device_token : this.device_token, os_type: this.os_type});
  }
  handleSubmit(){
    let {email, password, device_token, os_type} = this.state;
    let data = {
      'email' : email,
      'password' : password,
      'device_token': device_token,
      'os_type': os_type
    }
    let fetchObj = { 
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       
      }
  }
    this.props.dataAuth('http://139.59.87.122/modtod/beta/api/auth/login', fetchObj);
 
  }
  componentDidUpdate(prevProps){
    if(prevProps.authen !== this.props.authen){
      if(!this.props.authen ){
            alert('wrong');
            window.location.reload();
          }
          else{
            localStorage.setItem('authen',this.props.authen);
      
            this.props.history.push('/product/productListings');
          }
    }
  }

render(){
  return (
    <div className = 'container'>
      <Segment className = 'main-segment'>
   
    <Grid centered columns = {3}>
    
    <Grid.Column>
    <Header  as = 'h1' textAlign = 'center' color = 'blue' icon >
            <Icon  name = 'lock' />
            LOGIN
          </Header>
      <Form onSubmit={()=>this.handleSubmit()}>
          <Form.Field>
            <Label color = 'green' textalign = 'left'>Email</Label>
            <Input  type = 'text' placeholder='email' onChange = {this.handleEmail} />
          </Form.Field>
          <Form.Field>
            <Label  color = 'green'>Password</Label>
            <Input  type = 'password' placeholder='Password' name = 'password' onChange = {this.handlePassword} />
          </Form.Field>
          <Form.Field>
            <Label  color = 'green'>Device_token</Label>
            <Input  type = 'text' placeholder='devicetoken' name = 'device-token' onChange = {this.handleDeviceToken} />
          </Form.Field>
          <Form.Field>
            <Label  color = 'green'>OS_Type</Label>
            <Input  type = 'number' placeholder='OS Type' name = 'os-type' onChange = {this.handleOsType} />
          </Form.Field>
         
    
          <Button onClick = {() => this.setValuesToState()} inverted primary animated>
            <Button.Content  visible>SignIn</Button.Content>
            <Button.Content hidden>
              Login
            </Button.Content>
          </Button>
          
          
      </Form>
      </Grid.Column>
    </Grid>
    </Segment>
    </div>
  );
}
}

let mapStateToProps = (state) => {
  return {
  authen: state.auth
  };
};
let mapStateToDispatch = (dispatch) => {
  return {
    dataAuth : (url, data) => dispatch(actionCreators.authentication(url, data)),
  }
};

export default connect(mapStateToProps, mapStateToDispatch)(Login);
