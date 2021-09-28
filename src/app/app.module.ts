import {PostService} from '../services/post.service';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {MenubarModule} from 'primeng/menubar';
import {FieldsetModule} from 'primeng/fieldset';
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {EditorModule} from 'primeng/editor';
import {PanelModule} from 'primeng/panel';
import {MenuModule} from 'primeng/menu';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';
import {TreeModule} from 'primeng/tree';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {ChipModule} from 'primeng/chip';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {ListboxModule} from 'primeng/listbox';
import { TagModule } from 'primeng/tag';
import {SplitButtonModule} from 'primeng/splitbutton';
import {PanelMenuModule} from 'primeng/panelmenu';


import {NavbarComponent} from './navbar/navbar.component';
import {NewsComponent} from './acreditation/news/news.component';
import {MessageService} from 'primeng/api';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {SafePipe} from "../pipes/safePipe.pipe";
import {TieredMenuModule} from "primeng/tieredmenu";
import {priorityIconPipe, PriorityPipe} from "../pipes/priority.pipe";
import {LoginService} from "../services/login.service";
import {UserService} from "../services/user.service";
import { HomeComponent } from './home/home.component';
import { AcreditationComponent } from './acreditation/acreditation.component';
import { ChartComponent } from './chart/chart.component';
import { PriceListComponent } from './price-list/price-list.component';
import {OfficesComponent} from "./offices/offices.component";




const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'acreditation' , component: AcreditationComponent, children: [
      {path: 'news', component: NewsComponent}
    ]},
  {path: 'chart' , component: ChartComponent},
  {path: 'priceList' , component: PriceListComponent},
  {path: 'offices' , component: OfficesComponent},
  {path: '**' , redirectTo: 'home' , pathMatch: 'full'}

];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewsComponent,
    AdminPanelComponent,
    SafePipe,
    PriorityPipe,
    PriorityPipe,
    priorityIconPipe,
    HomeComponent,
    AcreditationComponent,
    ChartComponent,
    PriceListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    TabViewModule,
    MenubarModule,
    FieldsetModule,
    DialogModule,
    ButtonModule,
    ToolbarModule,
    EditorModule,
    PanelModule,
    MenuModule,
    PasswordModule,
    ToastModule,
    RippleModule,
    RouterModule.forRoot(routes),
    TreeModule,
    ReactiveFormsModule,
    CascadeSelectModule,
    DropdownModule,
    HttpClientModule,
    FileUploadModule,
    ChipModule,
    CardModule,
    TieredMenuModule,
    CheckboxModule,
    ListboxModule,
    TagModule,
    SplitButtonModule,
    PanelMenuModule
  ],

  exports: [RouterModule],
  providers: [MessageService, PostService , LoginService , UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
