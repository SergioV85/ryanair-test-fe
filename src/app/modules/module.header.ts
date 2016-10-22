import '../../../public/css/styles.css';
import { Component} from '@angular/core';

@Component({
    selector: 'header-module',
    styleUrls: ['./../views/view.header.module.less'],
    templateUrl: './../views/view.header.module.html',
})
export class Header {
    public isCollapsed: boolean = true;
}
