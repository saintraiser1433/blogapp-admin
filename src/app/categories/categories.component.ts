import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  data: any;
  formCategory: string;
  id: string;
  formStatus: string = "New";
  constructor(private catservice: CategoriesService) { }
  onSubmit(f: NgForm) {
    let cat: Category = {
      category: f.value.category,
      status: 'active'
    }
    if (this.formStatus == "New") {
      this.catservice.saveData(cat);
      f.resetForm();
    } else if (this.formStatus == "Edit") {
      this.catservice.updateData(this.id, cat);
      f.resetForm();
      this.formStatus = "New";
    } else {

    }

  }

  ngOnInit(): void {
    this.catservice.loadData().subscribe(val => {
      this.data = val;
    })
  }

  onDelete(index: string) {
    this.catservice.deleteData(index);
  }

  onUpdate(id: string, cat: string) {
    this.formCategory = cat;
    this.id = id;
    this.formStatus = "Edit";


  }



}
