import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  data: any[] = [];
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.loadData().subscribe(val => {
      this.data = val;
    })
  }

  onDelete(postImgPath, docId) {
    this.postService.deleteImage(postImgPath, docId);

  }
  onFeatured(isFeatured, docId) {
    let featured = {
      isFeatured: isFeatured
    }
    this.postService.onFeatured(featured, docId);
  }


}
