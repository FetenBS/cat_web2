import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
	private users=[{username:'admin',password:'1234',roles:['ADMIN','USER']},
	               {username:'user1',password:'1234',roles:['USER']},
	               {username:'user2',password:'1234',roles:['USER']}
	
	];
	public isAuthenticated!:boolean;
	public userAuthenticated:any;
	public token:any;
	

  constructor() {
	  
   }
   public login(username:string,password:string){
	   let user;
	   this.users.forEach(u=>{
		   if (u.username==username && u.password==password){
			 user=u;  
			 //this.token={username:u.username,roles:u.roles};
			  this.token=btoa(JSON.stringify({username:u.username,roles:u.roles}));
		   }
		   
	   });
	   if(user){
		   this.isAuthenticated=true;
		   this.userAuthenticated=user;
	   }else{
		   this.isAuthenticated=false;
		   this.userAuthenticated=undefined;  
	   }
   }
  public isAdmin(){
      if(this.userAuthenticated){
          if(this.userAuthenticated.roles.indexOf('ADMIN')>-1){
              return true;
          }else{
          return false;}
      }return '';
  }
  public saveAuthenticatedUser(){
	  if (this.userAuthenticated){
		 
		  localStorage.setItem('authToken',this.token);
	  }
  }
  public loadAuthentificatedUserFromLocalStorage(){
	 
	  let t=localStorage.getItem('authToken');
	   if(t){
	  let user=JSON.parse(atob(t));
	  console.log(user);
	  this.userAuthenticated={username:user.username,roles:user.roles};
	  console.log(this.userAuthenticated);
	  this.isAuthenticated=true;
	  this.token=t;
  }
}
public removeTokenFromLocalStorage(){
	localStorage.removeItem('authToken');
	this.isAuthenticated=false;
	this.token=undefined;
	this.userAuthenticated=undefined;
}

}
