import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  total = 0;

  @Input()
  currentPage = 1;

  @Input()
  itemsPerPage = 30;

  pagesCount = 0;

  @Output()
  pageChanged = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.pagesCount = Math.ceil(this.total / this.itemsPerPage);
  }

  get pages(): number[] {
    const pages: number[] = [];

    for(let i=0; i < this.pagesCount; i++) {
      pages.push(i + 1);
    }
    return pages;
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }
}
