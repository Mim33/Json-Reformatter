import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locations;
  newJson: ATMLocations;
  isOpen: Boolean = false;
  convertedJson;
  constructor(private data: DataService) { }

  ngOnInit() {
    // this.data.getLocations().subscribe(
    //   data => this.locations = data
    // );
    this.data.getLocations().subscribe(data => {
        console.log(data)
        //data => this.locations = data
        this.locations = data;
        this.convertedJson = convertJsonFormat(data);
        saveLocalJson(this.convertedJson);
        
        return this.convertedJson;
     });

  }
  /*
  onClick(){
    console.log('this.convertedJson??: '+ this.convertedJson);
    document.getElementById('openjson').innerHTML = this.convertedJson;
  }
  toggleJson(){
    this.isOpen = !this.isOpen;
  }*/

}

function splitAddress(address){
  
  const addressArr = address.split('\n');
  const csz = addressArr[1].split(' ');
  //const ridMinus = csz[0].slice(0,-1);//**take out the last comma
  if (csz[0].indexOf(',') > -1)
  {
    csz[0] = csz[0].replace(',', '').trim();
    //csz[0] = csz[0].slice(0,-1);//**take out the last comma
  }
  addressArr.splice(1, 1, csz[0], csz[1], csz[2])
  return addressArr;
}
function convertJsonFormat(Obj){
  const result = {locations: []};
  const resultArr = [];
  let newJSONitem = {};
  let street = '';
  let state = '';
  let zipcode = '';
  let country = '';
  let hourTxt = '';
  let hourTab = '';
  //console.log('ConvertJson!');
  for(let key in Obj){
    const item = Obj[key];
    for(let key2 in item){
      if(key2==='external_id'){
        const idValue = item[key2];
        key2 = 'id';
        item[key2]= idValue;

        //delete item[];
      }
      if(key2 ==='address'){
        const test = splitAddress(item[key2]);
        street = test[0];
        state = test[2];
        zipcode = test[3];
        country = test[4];
        item.street = street;
        item.state = state;
        item.zipcode = zipcode;
        item.country = country;
      }
      if(key2 === 'place'){
        const temp = item[key2].split(' - ');
        item.name=temp[1];
      }
      if(key2 === 'open_hours'){
          if(item[key2] === "24/7"){
            item[key2] = [
              [0, 24],
              [0, 24],
              [0, 24],
              [0, 24],
              [0, 24],
              [0, 24],
              [0, 24]
            ];
            hourTxt = "<b>Mon-Sun:</b> 24 Hours"
          }else{
            if(item[key2].indexOf('\n') > -1){
              //hourTab = item[key2].replace('/\\n/g', '<br>');
              //hourTab = item[key2].replace('\u2013', '<br>');
              hourTab = item[key2].replace('\n', '<br>');
              console.log('Tab existed: ' +hourTab);
            }else{
              hourTab = item[key2];
              console.log('No Tab hour:' +hourTab);
            }
            hourTxt = hourTab;
          }
          console.log('this is hourTXT:' + hourTxt);
      }
      item.html = "<h3>";
      item.html += item['place'];
      item.html += "<img src='https://i.imgur.com/.jpg' style='max-height: 120px; margin:0 auto' class='img-responsive'><br /><p>";
      item.html += item['street'];
      item.html += "<br>";
      item.html += item['city'] + ", ";
      item.html += item['state'] +" ";
      item.html += item['zipcode'] + "<br>";
      item.html += hourTxt;
      item.html += "<br><b>Buy</b> Bitcoin and Litecoin Here</p>";
      //console.log(key2 + ':' + item[key2]);
      newJSONitem = {
        id: item['id'],
        lat: item['lat'],
        lon: item['long'],
        title: item['place'],
        name: item['name'],
        region: item['state'],
        address: item['address'],
        street: item['street'],
        city: item['city'],
        state: item['state'],
        zipcode: item['zipcode'],
        country: item['country'],
        img: null,
        html: item['html'],
        zoom: 12,
        hours: item['open_hours'],
        type: item['type'],
        is_twoway: item['is_twoway'],
        cryptos:item['cryptos'],
        fees:item['fees'],
        limits: item[''],
        url:item['url'],
        reference:item['reference'],
      }
    }
    resultArr.push(newJSONitem);
  }
  result.locations = resultArr;
  console.log(result);
  return result;
}

function saveLocalJson(data){
  var theJSON = JSON.stringify(data);
  var uri = "data:application/json;charset=UTF-8," + encodeURIComponent(theJSON);
  
  var a = document.createElement('a');
  a.href = uri;
  a.innerHTML = "Right-click to SaveAs";
  document.getElementById('export').appendChild(a);
}


interface ATMLocations{
  id: string,
  lat: number,
  lon: number,
  title: string,
  name: string,
  region: string,
  address: string,
  state: string,
  city: string,
  country: string,
  street: string,
  zipcode: string,
  img:string,
  html: string,
  zoom: number,
  open_hours: any,
  hours: any,
  type: string,
  is_twoway: boolean,
  cryptos:{  
     bitcoin: string,
     litecoin:string,
     dogecoin:string,
     ether:string
  },
  fees:string,
  limits: string,
  url:string,
  reference:string,
}