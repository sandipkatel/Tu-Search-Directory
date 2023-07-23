import { Component, Input, OnInit } from '@angular/core';

import { TreeNode } from 'primeng/api'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {

  isadmin:boolean;
  constructor(private authService: AuthService) {
    this.isadmin=this.authService.admin;
   }

  @Input() node: TreeNode;

  ngOnInit(): void {
    console.log(this.node);
  }


}
