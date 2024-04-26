import { Component, HostListener, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Typed from 'typed.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  fixedHeader: boolean = false;
  @ViewChild('typeIt') typeItElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Ensure the ViewChild is initialized and the DOM is ready
    if (isPlatformBrowser(this.platformId) && this.typeItElement) {
      console.log("Typed.js initialization started.");
      
      // Typed.js initialization code
      const options = {
        strings: ['Designer', 'Developer', 'Freelancer'],
        typeSpeed: 100,
        loop: true
      };

      const typedElement = this.typeItElement.nativeElement;
      // console.log("Typed element:", typedElement);
      
      new Typed(typedElement, options);
      // console.log("Typed.js initialization completed.");
    } else {
      // console.warn("Typed.js initialization skipped. Not in a browser environment or typeItElement is not available.");
    }
  }

  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollTop >= 80) {
        // Add a class to change color when scrolled down
        document.body.classList.add('fixed-header');
      } else {
        // Remove the class if scrolled back to top
        document.body.classList.remove('fixed-header');
      }
    }
  }
}
