import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss']
})
export class TabButtonComponent {
  myForm: FormGroup;
  @ViewChild('elementRef') elementRef!:ElementRef
  constructor() {
    this.myForm = new FormGroup({
      input1: new FormControl(''),
      input2: new FormControl(''),
      input3: new FormControl('')
    });
  }

  // Handle the Enter key press event
  onEnterKey(event:any) {
    event.preventDefault(); // Prevent the default Enter key behavior

    const currentInput = event.target as HTMLInputElement;

    // Find the next input element
    const formInputs = Array.from(this.elementRef.nativeElement.querySelectorAll('input'));
    const currentIndex = formInputs.indexOf(currentInput);
    const nextIndex = currentIndex + 1;

    if (nextIndex < formInputs.length) {
      const nextInput = formInputs[nextIndex] as HTMLInputElement;
      nextInput.focus(); // Focus on the next input
    }
  }
}
