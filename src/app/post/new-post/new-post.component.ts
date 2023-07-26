import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

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
  constructor(private catservice: CategoriesService, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    })

  }

  get fc() {
    return this.postForm.controls;
  }

  onSubmit() {
    console.log(this.postForm);
  }


  ngOnInit(): void {
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
