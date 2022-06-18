import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  statusOptions = [
    { value: 'stable', label: 'Stable' },
    { value: 'critical', label: 'Critical' },
    { value: 'finished', label: 'Finished' }
  ];

  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required, this.checkProjectName),
      'projectEmail': new FormControl(null, Validators.required),
      'projectStatus': new FormControl('stable', Validators.required)
    })
  }

  checkProjectName(projectName: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (projectName.value === 'Test' || projectName.value === 'test') {
          resolve({ 'forbiddenName': true });
        }
        resolve(null);
      }, 2000);
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }
}
