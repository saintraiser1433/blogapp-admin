import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = "./assets/placeholder.jpg";
  selectedImg: string;
  cats: any[] = [];
  postForm: FormGroup;
  @Input() id: string;
  post: any;
  formStatus: string = "New";
  constructor(
    private catservice: CategoriesService,
    private postservice: PostsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {

  }

  get fc() {
    return this.postForm.controls;
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    this.postservice.uploadImages(this.selectedImg, postData, this.formStatus, this.id);
    this.postForm.reset();
    this.imgSrc = "./assets/placeholder.jpg";
  }


  ngOnInit(): void {
    if (this.id) {
      this.postservice.loadOneData(this.id).subscribe(post => {
        this.post = post;
        this.postForm = this.fb.group({
          title: [this.post.title, [Validators.required, Validators.minLength(10)]],
          permalink: [this.post.permalink, Validators.required],
          excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(10)]],
          category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
          postImg: ['', Validators.required],
          content: [this.post.content, Validators.required],
        })
        this.imgSrc = this.post.postImgPath;
        this.formStatus = "Edit";
      })
    } else {
      this.postForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(10)]],
        permalink: ['', Validators.required],
        excerpt: ['', [Validators.required, Validators.minLength(10)]],
        category: [``, Validators.required],
        postImg: ['', Validators.required],
        content: ['', Validators.required],
      })
    }
    this.catservice.loadData().subscribe(val => {
      this.cats = val;
    })
  }
  onTitleChange(e) {
    const title = e.target.value;
    this.permalink = title.replace(/\s/g, '-');

  }

  showPreview(e) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
    this.selectedImg = e.target.files[0];
  }
}
