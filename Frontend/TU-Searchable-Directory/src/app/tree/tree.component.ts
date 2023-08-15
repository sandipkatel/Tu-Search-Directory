import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  files: TreeNode[];

  selectedFile: TreeNode;
  select: boolean;
  isadmin:boolean;
  hasError:boolean;
  errorText:string; 
  showAddSubCampus:boolean;

  constructor(private authService: AuthService,private dataService: DataService) {
    this.isadmin=this.authService.admin;
    this.showAddSubCampus=true;
   }

  ngOnInit(): void {
    this.select = false;

    this.dataService.getNodes().subscribe(
      result => {
        console.log(result)
        this.files = [JSON.parse(result.body)];
      }
    )
  }

  onNodeSelect(event: Event) {
    console.log(this.selectedFile.data)
    this.showAddSubCampus=false;
    if(this.selectedFile.data.personnel || this.selectedFile.data.programmes) {
      this.select = true;
    }
  }

  reload(){
    this.select = false;
    this.dataService.getNodes().subscribe(
      result => {
        console.log(result.body)
        this.files = [JSON.parse(result.body)];
      }
    )
  }

  onAddNode(form :NgForm){
    let instituteName=form.value['name'];
    let parentName=form.value['typeSelect']
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

}
