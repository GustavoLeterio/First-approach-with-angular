import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableTemplateItem {
    id:number,
    author: string,
    title: string,
    description: string,
    presentationDate: Date,
    maintenanceDate: Date,
    degreeType:string,
    campus: string,
    degreeProgram: string,
    researchLine: string,
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableTemplateItem[] = [
  {
    id:1,
    author: "Texte de texto",
    title: "Texte de texto",
    description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    presentationDate: new Date(),
    maintenanceDate: new Date(),
    degreeType: "Texte de texto",
    campus: "Texte de texto",
    degreeProgram: "Texte de texto",
    researchLine: "Texte de texto",
  },
  {
    id:2,
    author: "Texte de texto",
    title: "Texte de texto",
    description: "Texte de texto",
    presentationDate: new Date(),
    maintenanceDate: new Date(),
    degreeType: "Texte de texto",
    campus: "Texte de texto",
    degreeProgram: "Texte de texto",
    researchLine: "Texte de texto",
  },
  {
    id:1,
    author: "Texte de texto",
    title: "Texte de texto",
    description: "Texte de texto",
    presentationDate: new Date(),
    maintenanceDate: new Date(),
    degreeType: "Texte de texto",
    campus: "Texte de texto",
    degreeProgram: "Texte de texto",
    researchLine: "Texte de texto",
  },
  {
    id:2,
    author: "Texte de texto",
    title: "Texte de texto",
    description: "Texte de texto",
    presentationDate: new Date(),
    maintenanceDate: new Date(),
    degreeType: "Texte de texto",
    campus: "Texte de texto",
    degreeProgram: "Texte de texto",
    researchLine: "Texte de texto",
  },
  {
    id:1,
    author: "Texte de texto",
    title: "Texte de texto",
    description: "Texte de texto",
    presentationDate: new Date(),
    maintenanceDate: new Date(),
    degreeType: "Texte de texto",
    campus: "Texte de texto",
    degreeProgram: "Texte de texto",
    researchLine: "Texte de texto",
  },
  {
    id:2,
    author: "Texte de texto",
    title: "Texte de texto",
    description: "Texte de texto",
    presentationDate: new Date(),
    maintenanceDate: new Date(),
    degreeType: "Texte de texto",
    campus: "Texte de texto",
    degreeProgram: "Texte de texto",
    researchLine: "Texte de texto",
  },
];

/**
 * Data source for the TableTemplate view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableTemplateDataSource extends DataSource<TableTemplateItem> {
  data: TableTemplateItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableTemplateItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableTemplateItem[]): TableTemplateItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableTemplateItem[]): TableTemplateItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'author': return compare(a.author, b.author, isAsc);
        case 'title': return compare(a.author, b.author, isAsc);
        case 'description': return compare(a.author, b.author, isAsc);
        // case 'presentationDate': return compare(a.author, b.author, isAsc);
        // case 'maintenanceDate': return compare(a.author, b.author, isAsc);
        case 'degreeType': return compare(a.author, b.author, isAsc);
        case 'campus': return compare(a.author, b.author, isAsc);
        case 'degreeProgram': return compare(a.author, b.author, isAsc);
        case 'researchLine': return compare(a.author, b.author, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
