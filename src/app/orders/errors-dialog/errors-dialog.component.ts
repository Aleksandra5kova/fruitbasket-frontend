import { Component, OnInit, Input, Output, EventEmitter, trigger, transition, style, animate } from '@angular/core';

@Component({
  selector: 'app-errors-dialog',
  templateUrl: './errors-dialog.component.html',
  styleUrls: ['./errors-dialog.component.css'],
  animations: [
  trigger('dialog', [
    transition('void => *', [
      style({ transform: 'scale3d(.3, .3, .3)' }),
      animate(100)
    ]),
    transition('* => void', [
      animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
    ])
  ])
]

})
export class ErrorsDialogComponent implements OnInit{
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit() { }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
}
