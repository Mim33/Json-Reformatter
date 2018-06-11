import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Object;
  constructor(private data: DataService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.post = params.id);
  }

  ngOnInit() {
    this.data.getDetail(this.post).subscribe(
      data => this.post = data
    )
  }

}
