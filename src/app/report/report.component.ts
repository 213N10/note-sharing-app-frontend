import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  imports: [FormsModule],
  template:`
  
    <div class="report-container">
      <h2>Report a Violation</h2>
      <form (ngSubmit)="onSubmit()" #reportForm="ngForm">
        <div class="form-group">
          <select id="violationType" name="violationType" required [(ngModel)]="violationType">
            <option value="" disabled selected>Select Violation Type</option>
            <option value="post">Post</option>
            <option value="comment">Comment</option>
          </select> 
        </div>
        <div class="form-group">
          <label for="violationDescription">Description:</label>
          <textarea id="violationDescription" name="violationDescription" required [(ngModel)]="violationDescription"></textarea>
        </div>
      </form>
    </div>
    

  `
})
export class ReportComponent {
  violationType: string = '';
  violationDescription: string = '';

  onSubmit() {
    //this.violationType = '';

    //console.log('Form submitted', this.reportForm.value);
  }
}
