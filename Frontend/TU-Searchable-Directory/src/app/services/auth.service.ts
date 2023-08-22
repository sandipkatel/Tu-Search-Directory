import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'; 

// import * as bcryptjs from 'bcryptjs';
// import { environment } from "src/environments/environment";


@Injectable()
export class AuthService {
    
    statusUpdate = new EventEmitter<boolean>();
    isLoggedIn: boolean;
    token:string;
    name: string;
    email: string;
    admin: boolean;

    constructor(private http: HttpClient) {
        this.name = '';
        this.email = '';
        this.admin = false;
    }

    logIn(email:string, password: string) {
        const url = 'http://localhost:7000/login/';
        // let SALT = '$2a$10$mLmYXYIw9FLvW7d4rXdple';
        // password = bcryptjs.hashSync(password, SALT)
        
        return this.http.post<{message:string, token:string, name:string, email:string, admin: boolean}>(url, {
            email: email,
            password: password
        })
    }

    signUp(name:string,email:string, password: string) {
        const url = 'http://localhost:7000/signup/';
        // let SALT = '$2a$10$mLmYXYIw9FLvW7d4rXdple';
        // password = bcryptjs.hashSync(password, SALT)
        
        return this.http.post<{message: string, isAuth: boolean}>(url, {
            name: name,
            email: email,
            password: password
        });
    }

    adminsignUp(name:string,email:string, password: string) {
        const url = 'http://localhost:7000/adminsignup/';
        // let SALT = '$2a$10$mLmYXYIw9FLvW7d4rXdple';
        // password = bcryptjs.hashSync(password, SALT)
        
        return this.http.post<{message: string, isAuth: boolean}>(url, {
            name: name,
            email: email,
            password: password
        });
    }

    signOut() {
        this.name = '';
        this.email = '';
        this.admin = false;
        this.token = '';
        this.isLoggedIn = false;
        this.statusUpdate.emit(this.isLoggedIn);

    }

    setLogIn() {
        this.isLoggedIn = true;
        this.statusUpdate.emit(this.isLoggedIn);
    }

    setToken(token:string) {
        this.token = token;
    }

    setInfo(name:string, email:string, admin:boolean) {
        this.name = name;
        this.email = email;
        this.admin = admin
    }
}