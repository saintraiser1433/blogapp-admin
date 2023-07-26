import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveData(data) {
    this.afs.collection('categories').add(data).then(docRef => {
      // for subcategory
      // this.afs.collection('categories').doc(docRef.id).collection('subcategory').add(subCat)
      this.toastr.success('Data insert successfully');
    })
      .catch(err => {
        console.log(err);
      })

  }
  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  updateData(id, data) {
    this.afs.doc(`categories/${id}`).update(data).then(val => {
      this.toastr.success('Data updated successfully');
    }).catch(err => {
      console.log(err);
    });


  }

  deleteData(index) {
    this.afs.doc(`categories/${index}`).delete().then(docRef => {
      // for subcategory
      // this.afs.collection('categories').doc(docRef.id).collection('subcategory').add(subCat)
      this.toastr.success('Data deleted successfully');
    })
      .catch(err => {
        console.log(err);
      })


  }

}
