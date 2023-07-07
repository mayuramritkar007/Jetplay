import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListUserAccountComponent } from './list-user-account.component';

describe('ListUserAccountComponent', () => {
  let component: ListUserAccountComponent;
  let fixture: ComponentFixture<ListUserAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});





// resetGameAppList(data) {
//   if (data === 'remove') {
//     if (this.apps_list.length > 0) {
//       this.apps_list.forEach((obj) => {
//         const existNotification = this.AdminGameList.some(x => x.id === obj.id);
//         if (existNotification) {
//           const index = this.AdminGameList.map((o) => o.id).indexOf(obj.id);
//           this.AdminGameList.splice(index, 1);
//         }
//       });
//       this.dataSourceGameApp = new MatTableDataSource(this.apps_list);
//     }
//   } else if (data === 'add') {
//     const selectGame = this.apps_list.filter(x => x.id === this.gameId);
//     if (selectGame.length !== 0) {
//       this.AdminGameList.push({
//         id: selectGame[0].id,
//         name: selectGame[0].name,
//         description: selectGame[0].description
//       });
//     }
//   }
// }