import React, {Component} from 'react';
import fire from '../config/fire';
class Login extends React.Component
{
    
    constructor(props)
    {
        super(props);
        // this.isLogin=false;
        this.state={
            username:'',
            passwaord:'',
            user:null,
            message:'',
            chat:[],
            loginpage:true,
            
        }
    }
    authListener = ()=>{
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
                console.log(user.email);
                this.setState({user:user});
            }
            else{
                this.setState({user:null});
            }
        })
    }
    componentDidMount = (isLogin)=>{
        this.authListener();
        
        fire.database().ref().child('messages').on('value',snapshot=>{
            console.log('there is a new message');
            if(snapshot.val() != null)
            {
                this.setState({chat:{...snapshot.val()}});
                console.log(this.state);
                if(this.state.username!=''){

        
                let interval= window.setInterval(function(){
                    var elem=document.getElementById('chatt');
                    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                    // console.log(snapshot.val());
                    // console.log(elem.val());
                    elem.scrollTop= elem.scrollHeight;
                    window.clearInterval(interval);
                

                    
                },1000)}
                this.forceUpdate();
                
            }
        })
    }
    handleChange = (e)=>{
    this.setState({[e.target.name]:e.target.value});
    console.log(this.state);
    }

    handleLogin = (e)=>{
        let emailerror="";
        
        e.preventDefault();
        if(this.state.username !='' && this.state.password!='')
        {
            fire.auth().signInWithEmailAndPassword(this.state.username,this.state.password).then((u)=>{
                let interval= window.setInterval(function(){
                    var elem=document.getElementById('chatt');
                    elem.scrollTop= elem.scrollHeight;
                    window.clearInterval(interval);

                    
                });
                
                // this.isLogin=true;
                console.log(u); 
                //this.setState(initialState);
                    
           }).catch(err=>{
               console.log(err);
               alert("Invalid credentials");
           })
        //    if(emailerror){
        //        this.setState({emailerror});
        //        return false;
        //    }
        //    return true;
        }
        else{
            alert("Please fill the details")
        }
        
    }
    handleSignUp = (e)=>{
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.username,this.state.password).then((u)=>{
            console.log(u);
        }).catch(err=>{
            console.log(err);
        })
    }
    addmsg=(obj)=>{
        fire.database().ref().child('messages').push(
            obj,
            err=>{
                if(err)
                {
                    console.log(err);
                }
            }
        )
    }
    sendmsg= (e)=>{
        console.log('send');
        var ob={username:this.state.user.email,message:this.state.message};
        this.addmsg(ob);
        this.setState({message:''});
        console.log(this.state);
        let interval=window.setInterval(function(){
                var elem=document.getElementById('chatt');
                elem.scrollTop= elem.scrollHeight;
                window.clearInterval(interval);
        },1000)

    }
    handleSignOut=(e)=>{
        fire.auth().signOut();
    }
    render()
    {
        return(
            
                this.state.user==null ? <div class="Title"><h1 style={{fontSize:'70px',fontFamily:'cursive'}}><img src="chat-icon.png" alt="chat" style={{width:'90px',height:'90px'}}/>WASSUP</h1><br></br>
                    <form style={{width:'50%',marginLeft:'25%',marginTop:'2%'}}>
                        <div class="form-group">
                            <label style={{fontFamily:'cursive'}} for="email" >Email Address:</label>
                            <input id="email" required onChange={this.handleChange} value={this.state.username} class ="form-control" name="username"  type="email"/>
                            
                        </div>
                        <div class="form-group">
                            <label style={{fontFamily:'cursive'}} for="pwd" > Password:</label>
                            <input type="password" className="form-control" onChange={this.handleChange}value={this.state.password} name="password" id="pwd" required/>
                        </div>
                        <div>
                            <button class="btn btn-primary" onClick={this.handleLogin} style={{width:'150px', marginLeft:'10px'}}>Login</button><br></br><br></br>
                            <button class="btn btn-primary" onClick={this.handleSignUp} style={{width:'150px', marginLeft:'10px'}}>SignUp</button>
                        </div>
                    </form>
                </div> : <div style={{width:'100',height:'100vh',background:'black'}}>
                        <div>
                            <header style={{display:'flex',height:'100px', width:'100%',color:'white',background:'darkblue'}}>
                            <h1 style={{fontFamily:'cursive',marginLeft:'45px'}}><img src="chat-icon.png" alt="chat" style={{width:'50px',height:'50px'}}/>WASSUP</h1>
                            
                            <button onClick={this.handleSignOut} style={{marginLeft:'auto'}} class="btn btn-warning">SignOut</button>
                            </header>
                            
                        </div>
                        <div id="chatt" style={{ scrollBehavior:'smooth',overflow:'scroll',height:'80%'}}>
                        {
                            Object.keys(this.state.chat).map(id=>{
                                if(this.state.user.email== this.state.chat[id].username)
                                {
                                    return<div style={{color:'white',marginLeft:'100px',borderRadius:'20px',width:'45%',flexWrap:'wrap',backgroundColor:'rgba(140,183,255,0.4)',marginBottom:'5px',padding:'10px',float:'right',position:'relative',display:'block',marginRight:'30px'}}key={id}>
                                    <small style={{fontSize:'12px',fontFamily:'cursive'}}>{this.state.chat[id].username}</small>
                                    <h5 style={{fontSize:'20px',fontFamily:'cursive'}}>{this.state.chat[id].message}</h5>
                                </div>
                                }
                                else{

                                return <div style={{marginBottom:'5px',padding:'10px',color:'black',backgroundColor:'rgb(240,240,240)',flexWrap:'wrap',marginRight:'100px',float:'left',width:'45%',borderRadius:'20px',marginLeft:'20px'}}key={id}>
                                    <small style={{fontSize:'12px',fontFamily:'cursive'}}>{this.state.chat[id].username}</small>
                                    <h5 style={{fontSize:'20px',fontFamily:'cursive'}}>{this.state.chat[id].message}</h5>
                                </div>
                                }
                            })
                        }
                        </div>
                        <footer style={{backgroundColor:'black'}}>
                            <input style={{marginLeft:'40px',width:'70%',float:'left'}} type="text" class="form-control" onChange={this.handleChange} name="message"value={this.state.message}/>
                            <button style={{width:'17%',marginRight:'30px'}} onClick={this.sendmsg} class="btn btn-primary">Send</button>
                        </footer>
                </div>
            
        );
    }
}
export default Login;
