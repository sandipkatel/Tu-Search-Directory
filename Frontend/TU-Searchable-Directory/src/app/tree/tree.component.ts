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

  constructor(private authService: AuthService,private dataService: DataService) {
    this.isadmin=this.authService.admin;
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

    if(this.selectedFile.data.personnel || this.selectedFile.data.programmes) {
      this.select = true;
    }
  }

  onAddDetails(form :NgForm){
    let instituteName=form.value['name'];
    let parentName=form.value['parent-name']

    this.dataService.addNode(instituteName,parentName).subscribe((response)=>{
      console.log(response)
    })
  }

}
