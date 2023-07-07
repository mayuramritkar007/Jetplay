import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserprofileService } from 'src/core/services/userprofile.service';



@Component({
  selector: 'app-User-segment',
  templateUrl: './User-segment.component.html',
  styleUrls: ['./User-segment.component.css']
})
export class UserSegmentComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: any;
  @ViewChild(MatSort, { static: false }) sort: any;

  userSegmentDataSource = new MatTableDataSource<Object>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  private tableInit = false;
  public spinnerActive = false;



  // Searching = '';
  // filterId = '';
  // filterUserame = '';
  // filterEmail = '';
  // filterCountry = '';
  // searchStr = '';
  searchList:any = [];
  FieldList:any = [];

  online: boolean = false;
  offline: boolean = false;
  locked: boolean = false;
  unlocked: boolean = false;

  userSegmentData:any = [];

  displayedColumns = ['filename', 'valid_till', 'action'];

  fileUrl: any;

  constructor(
    private userSegment: UserprofileService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.resetUserSegmentList();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.resetUserSegmentList();
  }


  resetUserSegmentList() {
    this.userSegment.getSegmentList(this.currentPage + 1, this.pageSize).subscribe((response) => {
      this.userSegmentData = response.data.results;
      this.userSegmentDataSource = new MatTableDataSource(this.userSegmentData);
      this.totalSize = response.data.count;
      this.spinnerActive = false;
      if (!this.tableInit) {
        this.userSegmentDataSource.paginator = this.paginator;
        this.tableInit = true;
      }
    });
  }


  OnFieldChange($event:any) {
    if ($event.checked) {
      this.FieldList.push($event.source.value);
    } else {
      this.FieldList.splice(this.FieldList.indexOf($event.source.value), 1);
    }
  }

  OnChange($event:any) {
    if ($event.checked) {
      this.searchList.push($event.source.value);
    } else {
      this.searchList.splice(this.searchList.indexOf($event.source.value), 1);
    }

    this.searchList.forEach((element:any) => {
      if (element === 'online') {
        this.online = true;
      }
      if (element === 'offline') {
        this.online = false;
      }
      if (element === 'locked') {
        this.locked = true;
      }
      if (element === 'unlocked') {
        this.locked = false;
      }
    });

  }

  filterUser() {
    const data:any = {};
    data['filters'] = {};
    if ((this.searchList.includes('locked') || this.searchList.includes('unlocked')) &&
      !(this.searchList.includes('locked') && this.searchList.includes('unlocked'))) {
      data['filters']['locked'] = this.locked;
    }
    if ((this.searchList.includes('online') || this.searchList.includes('offline')) &&
      !(this.searchList.includes('online') && this.searchList.includes('offline'))) {
      data['filters']['online'] = this.online;
    }
    if ((this.searchList.includes('android') || this.searchList.includes('ios')) &&
      !(this.searchList.includes('android') && this.searchList.includes('ios'))) {
      data['filters']['platform'] = this.searchList.includes('android') ? 'android' : 'ios';
    }
    data['fields'] = this.FieldList;

    this.userSegment.exportSegmentList(data).subscribe(res => {
      this.snackbar.open('User Segment Created Successfully', 'Dismiss', { duration: 3000 });
      this.resetUserSegmentList();
    });
  }

}
