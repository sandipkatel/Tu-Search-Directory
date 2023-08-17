import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Organization } from "../models/organization.model";


@Injectable()
export class DataService {
    constructor(private http: HttpClient) {}

    url = 'http://localhost:7000/';

    getNodes() {
        let url = this.url + 'nodes';
        return this.http.get<{message:string, body:string}>(url)
    }

    search(keyword: string, searchBy='General') {
        let url = this.url + 'search/';
        switch (searchBy) {
            case 'Personnel':
                url += 'personnel/';
                break;
            case 'Program':
                url += 'program/';
                break;
            case 'Organization':
                url += 'organization_name/';
                break;
            default:
                url += 'general/';
                break;
        }
        let query = new HttpParams().append('keyword', keyword);
        return this.http.get<{message:string, body:Organization[]}>(url, {
            params: query
        });
    }

    editPersonnelDetails(personName:string,personTitle:string,imageUrl:string,personEmail:string,organization?:string,previousName?:string){
        let url=this.url+'editPersonnel/'
        const body = {
            personName: personName,
            personTitle: personTitle,
            imageUrl: imageUrl,
            personEmail:personEmail,
            organization:organization,
            previousName:previousName
          };
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
        };
        return this.http.post(url,body,httpOptions)
    }

    addPersonnel(personName:string,personTitle:string,imageUrl:string,personEmail:string,organization:string){
        let url=this.url+'addPersonnel/'
        const body = {
            personName: personName,
            personTitle: personTitle,
            imageUrl: imageUrl,
            personEmail:personEmail,
            organization:organization
          };
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
        };
        return this.http.post(url,body,httpOptions)
    }

    deletePersonnel(previousName?:string){
        let url=this.url+'deletePersonnel/'
        const body = {
            previousName:previousName
          };
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
        };
        return this.http.post(url,body,httpOptions)
    }

    // deleteNode(Node?:string){
    //     let url=this.url+'deleteNode/'
    //     const body = {
    //         Node:Node
    //       };
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //           'Content-Type': 'application/json',
    //         }),
    //     };
    //     return this.http.post(url,body,httpOptions)
    // }

    addNode(instituteName:string,parentName?:string){
        let url=this.url+'add/'
        const body={
            instituteName:instituteName,
            info:{
                personnel:[],
                programmes:[]
            },
            children:[],
            root:false,
            parentName:parentName
        }
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
        };
        return this.http.post(url,body,httpOptions)
    }

    addProgram(programTitle:string,programDesc:string,organization:string){
        let url=this.url+'addProgram/'
        const body = {
            programTitle:programTitle,
            programDesc:programDesc,
            organization:organization
          };
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
        };
        return this.http.post(url,body,httpOptions)
    }

    deleteProgram(previousName?:string,organization?:string){
        let url=this.url+'deleteProgram/'
        const body = {
            previousName:previousName,
            organization:organization
          };
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
        };
        return this.http.post(url,body,httpOptions)
    }
}