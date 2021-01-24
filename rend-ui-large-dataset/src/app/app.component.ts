import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'rend-ui-large-dataset';
  listData : Array<{"id":"","ruleName":""}> = [];
  loader : boolean = true;
  sortBy : string = 'id';
  sortDirection :any = 'desc';
  searchTerm : string = '';
  searchResults : Array<{"id":"","ruleName":""}> = [];
  constructor(private commonServ : CommonService){

  }
  ngOnInit(){
    this.commonServ.getAllData().subscribe((resp:any) => {
      console.log(resp);
      this.listData = resp['data'];
      this.searchResults = this.listData;
      this.triggerSortingLogic();
      this.loader = false;
    })
  }
  deleteItem(item:any):void{
    this.listData.splice(this.get_index(this.listData,item),1)
    this.searchResults.splice(this.get_index(this.searchResults,item),1)
  }
  get_index(list : any,item : any){
    let return_index : any;
    _.forEach(list,(l_item,i) => {
      if(l_item.id === item.id){
        return_index = i
      }
    })
    return return_index
  }
  cloneItem(item:any):void{
    this.listData.splice(this.get_index(this.listData,item),0,item)
    this.searchResults.splice(this.get_index(this.searchResults,item),0,item)
  }
  moveUpItem(item:any,i:number):void{
    let temp = this.searchResults[i-1]
    this.searchResults[i-1] = item;
    this.searchResults[i] = temp;
  }
  moveDownItem(item:any,i:number):void{
    let temp = this.searchResults[i+1]
    this.searchResults[i+1] = item;
    this.searchResults[i] = temp;
  }
  triggerSortingLogic():void{
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.searchResults = _.orderBy(this.searchResults,this.sortBy,[this.sortDirection])    
  }
  onChangeSearchTerm() : void{
    this.searchResults = [];
    _.forEach(this.listData,(item)=>{
      if(item.id.toUpperCase().indexOf(this.searchTerm.toUpperCase()) !== -1 
      || item.ruleName.toUpperCase().indexOf(this.searchTerm.toUpperCase()) !== -1){
        this.searchResults.push(item);
      }
    })
  }
}
