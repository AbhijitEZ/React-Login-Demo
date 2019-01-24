import React, {Component} from 'react';
import {Header,Icon,Form, Input,   Button,  Label, Grid,  Segment } from 'semantic-ui-react';
import './style/login.css';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions';
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {email: '',password: '',  auth : null};
  }
  email = '';
  password = '';


  handleEmail = (event) => {
    this.email = event.target.value;
  }

   handlePassword = (event,{name,value}) => {
    this.password = value
  }

  setValuesToState = (event) => {
    this.setState({email : this.email, password: this.password});
  }
  handleSubmit(){
    let {email, password} = this.state;
    let data = {
      'email' : email,
      'password' : password,
      'device_token': 'abcdeeeeeffffffgggghhhh',
      'os_type': 1
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
