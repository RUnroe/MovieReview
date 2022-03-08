import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTree, MatTreeNestedDataSource} from '@angular/material/tree';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private router: Router) { 
    this.dataSource.data = TREE_DATA
  }

  routes(url: string) {
    this.router.navigate([url]);
  }

  ngOnInit(): void {
  }
  treeControl = new NestedTreeControl<NavNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavNode>();

  hasChild = (_: number, node: NavNode) => !!node.children && node.children.length > 0;

}
interface NavNode {
    name: string;
    children?: NavNode[];
    url: string;
}

var TreeChildren: NavNode[] = []

var TREE_DATA: NavNode[] = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Landing',
    url: '/landing'
  },
  {
    name: 'Login',
    url: '/login'
  },
  {
    name: 'Register',
    url: '/register'
  },
  {
    name: 'Delete Account',
    url: 'delete-account'
  },
  {
    name: 'Change Password',
    url: 'change-password'
  }
]