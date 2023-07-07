import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { AuthService } from 'src/core/services/auth.service';
import { TestService } from 'src/core/services/test.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  NavItem:any = [];
  title: String='';
  currentUrl: string='';

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private test: TestService,
    private userIdle: UserIdleService) { }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      this.title = this.test.getTitleName();
      this.NavItem = this.test.getSubNavList(this.title);

    });
    this.NavItem = this.test.getSubNavList(this.test.getTitleName());
    this.currentUrl = this.router.url;
    console.log('NAV ITEM',this.NavItem);
    
  }

}
