import { Component, OnInit, inject, signal, HostListener, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from './book.service';
import { Book } from './book.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None
})
export class App implements OnInit {
  private bookService = inject(BookService);

  allBooks = signal<Book[]>([]);

  // UI State
  searchQuery = signal<string>('');
  currentPage = signal<number>(1);
  pageSize = 10;

  // Modals & Overlays State
  isModalOpen = signal<boolean>(false);
  deletingId = signal<number | null>(null);

  // Form model
  currentBook: Book = { title: '', author: '', isbn: '', publicationDate: '' };
  isEditing = false;

  // Filtered and paginated books (Infinite Scroll)
  displayedBooks = computed(() => {
    let filtered = this.allBooks();

    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        (b.isbn || '').toLowerCase().includes(query)
      );
    }

    return filtered.slice(0, this.currentPage() * this.pageSize);
  });

  // Total count for filtered results
  totalFilteredCount = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.allBooks().length;

    return this.allBooks().filter(b =>
      b.title.toLowerCase().includes(query) ||
      b.author.toLowerCase().includes(query) ||
      (b.isbn || '').toLowerCase().includes(query)
    ).length;
  });

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => this.allBooks.set(data),
      error: (err) => console.error('Failed to load books', err)
    });
  }

  // ================= SCROLL LISTENER =================
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
    const max = document.documentElement.scrollHeight;
    if (pos >= max - 100) {
      this.loadMore();
    }
  }

  loadMore() {
    if (this.displayedBooks().length < this.totalFilteredCount()) {
      this.currentPage.update(p => p + 1);
    }
  }

  onSearchInput(event: any) {
    this.searchQuery.set(event.target.value);
    this.currentPage.set(1);
  }

  // ================= MODAL ACTIONS =================
  openAdd() {
    this.resetForm();
    this.isEditing = false;
    this.isModalOpen.set(true);
  }

  openEdit(book: Book) {
    let pubDate = '';
    if (book.publicationDate) {
      const d = new Date(book.publicationDate);
      if (!isNaN(d.getTime())) {
        pubDate = d.toISOString().split('T')[0];
      }
    }
    this.currentBook = { ...book, publicationDate: pubDate };
    this.isEditing = true;
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  // ================= DELETE ACTIONS =================
  startDelete(id: number) {
    this.deletingId.set(id);
  }

  cancelDelete() {
    this.deletingId.set(null);
  }

  // ================= CRUD ACTIONS =================
  saveBook() {
    if (this.isEditing && this.currentBook.id) {
      this.bookService.updateBook(this.currentBook.id, this.currentBook).subscribe({
        next: () => {
          this.loadBooks();
          this.closeModal();
        },
        error: (err) => console.error('Failed to update book', err)
      });
    } else {
      this.bookService.createBook(this.currentBook).subscribe({
        next: () => {
          this.loadBooks();
          this.closeModal();
        },
        error: (err) => console.error('Failed to create book', err)
      });
    }
  }

  doDelete(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.loadBooks();
        this.deletingId.set(null);
      },
      error: (err) => console.error('Failed to delete book', err)
    });
  }

  resetForm() {
    this.currentBook = { title: '', author: '', isbn: '', publicationDate: '' };
    this.isEditing = false;
  }
}
