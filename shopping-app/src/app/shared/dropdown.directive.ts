import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
    @HostBinding('class.show')
    open: boolean = false

    parentEle: any;
    
    @HostListener('click')
    changeState() {
        this.open = !this.open;
        const ddm = this.parentEle.getElementsByClassName('tgl')[0];
        if(this.open) {
            ddm.classList.add('show');
        } else {
            ddm.classList.remove('show');
        }
    }

    constructor(private elRef: ElementRef) { }

    ngOnInit() {
        this.parentEle = this.elRef.nativeElement.parentElement;
    }
}