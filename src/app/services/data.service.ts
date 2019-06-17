import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItem } from '../model/IItem';
import { log } from 'util';
import { Product } from '../model/Product';

Injectable();
export class DataService {

    private showLoadingIndicatorSource = new BehaviorSubject<boolean>(false);
    private showMySideBar = new BehaviorSubject<boolean>(false);
    private titleSource = new BehaviorSubject<string>('New arrivals');
    private totalSource = new BehaviorSubject<number>(0);
    private itemsCountSource = new BehaviorSubject<number>(0);
    private itemsSource = new BehaviorSubject<IItem[]>([]);
    private recentlyViewed = new BehaviorSubject<Product[]>([]);
    private expandNameSource = new BehaviorSubject<string>('');
    private tagsSource = new BehaviorSubject<string[]>(['Deleted', 'Old', 'Sale', 'New']);
    private tabIndexSource = new BehaviorSubject<number>(1);
    private user = new BehaviorSubject<Object>(JSON.parse(localStorage.getItem('currentUser')));
    private isCheckingout = new BehaviorSubject<boolean>(false);
    private url = new BehaviorSubject<string>('/');

    currentUser = this.user.asObservable();
    currentShowMySideBar = this.showMySideBar.asObservable();
    currentShowLoadingIndicator = this.showLoadingIndicatorSource.asObservable();
    currentTags = this.tagsSource.asObservable();
    currentItems = this.itemsSource.asObservable();
    currentExpandName = this.expandNameSource.asObservable();
    currentTotal = this.totalSource.asObservable();
    currentTitle = this.titleSource.asObservable();
    currentItemsCountSource = this.itemsCountSource.asObservable();
    currentTabIndexSource = this.tabIndexSource.asObservable();
    currentIsCheckout = this.isCheckingout.asObservable();
    currentUrl = this.url.asObservable();
    currentRecentlyViewed = this.recentlyViewed.asObservable();

    constructor() {
        const items = localStorage.getItem('items');
        const recentlyViewItems = sessionStorage.getItem('recentlyViews');
        this.recentlyViewed.next(JSON.parse(recentlyViewItems) || []);
        this.itemsSource.next(JSON.parse(items) || []);
        this.updateTotal();
    }

    changeUrl(value: string) {
        this.url.next(value);
    }

    changeIsCheckingout(value: boolean) {
        this.isCheckingout.next(value);
    }

    addCurrentUser(value: Object) {
        this.user.next(value);
    }

    changeTabIndexSource(value: number) {
        this.tabIndexSource.next(value);
    }

    changeShowMySideBar(value: boolean) {
        this.showMySideBar.next(value);
    }

    changeShowLoadingIndicator(value: boolean) {
        this.showLoadingIndicatorSource.next(value);
    }

    changeExpandName(expandName: string) {
        this.expandNameSource.next(expandName);
    }

    changeTitle(title: string) {
        this.titleSource.next(title);
    }

    addItem(item: IItem) {
        // const index = this.itemsSource.value.findIndex(i => i.id === item.id);
        // if (index === -1) {
            this.itemsSource.value.push(item);
            this.itemsCountSource.next(1 + this.itemsCountSource.value);
        // } else {
        //     this.itemsSource.value[index].quantity++;
        // }
        this.updateLocalStorage();
        this.updateTotal();
    }

    addRecentlyViewed(product: Product) {
        if (!this.recentlyViewed.value.find(p => p.id === product.id)) {
            this.recentlyViewed.value.push(product);
            sessionStorage.setItem('recentlyViews', JSON.stringify(this.recentlyViewed.value.map(p => {
                const newP = {id: p.id, sale: p.sale, state: p.state, url: p.url, price: p.price};
                return newP;
            })));
        }
    }

    updateTotal() {
        this.totalSource.next(
            Math.round(this.itemsSource.value ? this.itemsSource.value.reduce(
                (a, b) => ( (b.sale ? b.sale : b.price) * b.quantity) + a, 0) : 0)
        );
        this.itemsCountSource.next(
            this.itemsSource.value.reduce((a, b) => (a + b.quantity), 0)
        );
    }

    updateLocalStorage() {
        // this.itemsSource.next(this.itemsSource.getValue());
        localStorage.setItem('items', JSON.stringify(this.itemsSource.value));
    }
}
