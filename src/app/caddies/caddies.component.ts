import { Component, OnInit } from '@angular/core';
import{CaddyService} from'../services/caddy.service';
@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {
//product:any;
  constructor(public caddyService:CaddyService) { }

  ngOnInit(): void {
  }
getTotal(){}
}
