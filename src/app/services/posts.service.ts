import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore, private toastr: ToastrService, private router: Router) {

  }

  uploadImages(selectedImg, postData, status, docId) {
    const filepath = `postIMG/${Date.now()}`;
    this.storage.upload(filepath, selectedImg).then(() => {
      console.log('post image successfully');
      this.storage.ref(filepath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;
        if (status == "New") {
          this.saveData(postData);
        } else {
          this.updateData(docId, postData);
        }

      })
    });
  }
  saveData(postData) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success("Successfully added");
      this.router.navigate(['/post']);
    })

  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  loadOneData(id) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateData(docId, postData) {
    this.afs.doc(`posts/${docId}`).update(postData).then(() => {
      this.toastr.success("Successfully Updated");
      this.router.navigate(['/post']);
    })
  }


  onDelete(docId) {
    this.afs.doc(`posts/${docId}`).delete().then(() => {
      this.toastr.success("Successfully Deleted");
    })
  }

  deleteImage(postimgpath, docId) {
    this.storage.storage.refFromURL(postimgpath).delete().then(() => {
      this.onDelete(docId);
    })
  }
  onFeatured(isFeatured, docId) {
    this.afs.doc(`posts/${docId}`).update(isFeatured).then(() => {
      this.toastr.info("Successfully Updated");
    })

  }
}


