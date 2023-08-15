import { Component, Input, OnInit } from '@angular/core';

import { TreeNode } from 'primeng/api'
import { AuthService } from '../../services/auth.service'
import { NgForm } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {

  titleOptions: ['Dean', 'Chancellor', 'Professor', 'Assistant Professor', 'Campus Chief'];

  isadmin:boolean;
  hasError:boolean;
  errorText:string; 
  select: boolean;

  constructor(private authService: AuthService,private dataService:DataService) {
    this.isadmin=this.authService.admin;
   }

  @Input() node: TreeNode;

  ngOnInit(): void {
    console.log(this.node);
  }

  onChangeDetails(form :NgForm,label?:string,personnel?:string,previousTitle?:string,previousUrl?:string){
    let personName=form.value['name'];
    let personTitle=form.value['title'];
    let personEmail=form.value['email'];
    if(personName==null){
      personName=personnel
    }
    if(personTitle==""){
      personTitle=previousTitle;
    }

    let imageUrl:string;
    let organization=label;
    organization=JSON.stringify(organization);
    organization=organization.replace(/^"(.*)"$/, '$1');
    let previousName=personnel;
    imageUrl=form.value['imageUrl'];

    this.dataService.editPersonnelDetails(personName,personTitle,imageUrl,personEmail,organization,previousName).subscribe((response)=>{
      console.log(response)
    })
  }

  onAddPersonnel(form :NgForm,label?:string){
    let personName=form.value['name'];
    let personTitle=form.value['title'];
    let personEmail=form.value['email'];
    let imageUrl:string;
    let organization=label;
    organization=JSON.stringify(organization);
    organization=organization.replace(/^"(.*)"$/, '$1');
    imageUrl=form.value['imageUrl'];
    this.dataService.addPersonnel(personName,personTitle,imageUrl,personEmail,organization).subscribe((response)=>{
      console.log(response)
    })
  }

  onDeleteDetails(personnel?:string){
    let previousName=personnel;
    this.dataService.deletePersonnel(previousName).subscribe((response)=>{
      console.log(response)
    })
  }

  onAddNode(form :NgForm,parentNode?:string){
    let instituteName=form.value['name'];
    let parentName=parentNode
    if(parentName==""){
      parentName="Tribhuvan University";
    }

    this.dataService.addNode(instituteName,parentName).subscribe(async (response)=>{
      console.log(response)
    },(errorResponse) => {
      console.log(errorResponse);
      this.hasError = true;
      this.errorText = errorResponse.error.message;
    })
  }

  onAddProgram(form:NgForm,label?:string){
    let programTitle=form.value['title'];
    let programDesc=form.value['desc'];
    let organization=label
    organization=JSON.stringify(organization);
    organization=organization.replace(/^"(.*)"$/, '$1');

    this.dataService.addProgram(programTitle,programDesc,organization).subscribe((response)=>{
      console.log(response)
    }) 
  }

  onDeleteProgram(program?:string,label?:string){
    let previousName=program;
    let organization=label
    organization=JSON.stringify(organization);
    organization=organization.replace(/^"(.*)"$/, '$1');
    this.dataService.deleteProgram(previousName,organization).subscribe((response)=>{
      console.log(response)
    })
  }

  // onDeleteNode(node?:string){
  //   let Node=node;
  //   this.dataService.deleteNode(node).subscribe((response)=>{
  //     console.log(response)
  //   })
  // }
}
