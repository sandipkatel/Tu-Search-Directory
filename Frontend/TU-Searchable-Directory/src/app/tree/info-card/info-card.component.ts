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

  isadmin:boolean;
  constructor(private authService: AuthService,private dataService:DataService) {
    this.isadmin=this.authService.admin;
   }

  @Input() node: TreeNode;

  ngOnInit(): void {
    console.log(this.node);
  }

  onChangeDetails(form :NgForm,label?:string,personnel?:string){
    let personName=form.value['name'];
    let personTitle=form.value['title'];
    let imageUrl:string;
    let organization=label;
    organization=JSON.stringify(organization);
    organization=organization.replace(/^"(.*)"$/, '$1');
    let previousName=personnel;
    imageUrl=form.value['imageUrl'];

    this.dataService.editPersonnelDetails(personName,personTitle,imageUrl,organization,previousName).subscribe((response)=>{
      console.log(response)
    })
  }

  onAddPersonnel(form :NgForm,label?:string){
    let personName=form.value['name'];
    let personTitle=form.value['title'];
    let imageUrl:string;
    let organization=label;
    organization=JSON.stringify(organization);
    organization=organization.replace(/^"(.*)"$/, '$1');
    imageUrl=form.value['imageUrl'];
    this.dataService.addPersonnel(personName,personTitle,imageUrl,organization).subscribe((response)=>{
      console.log(response)
    })
  }

  onDeleteDetails(personnel?:string){
    let previousName=personnel;
    this.dataService.deletePersonnel(previousName).subscribe((response)=>{
      console.log(response)
    })
  }
}
