import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/mapTo";
import { map, startWith, scan } from "rxjs/operators";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  click$ = new Subject();

  clock;

  constructor() {
    this.clock = Observable.merge(
      this.click$.mapTo("hour"),
      Observable.interval(1000).mapTo("second")
    ).pipe(
      map(() => new Date()),
      startWith(new Date()),
      scan((acc, cur) => {
        const date = new Date(acc.getTime());
        if (cur === "second") {
          date.setSeconds(date.getSeconds() + 1);
        }
        if (cur === "hour") {
          date.setHours(date.getHours() + 1);
        }
        return date;
      })
    );
  }
}
