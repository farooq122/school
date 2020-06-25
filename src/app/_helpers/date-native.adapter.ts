import { Injectable } from "@angular/core";

import { NgbDateAdapter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { isDate } from "./util";

@Injectable()
export class DateNativeAdapter extends NgbDateAdapter<Date> {
    public fromModel(date: Date | null): NgbDateStruct | null {
        return isDate(date) ?
            { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
            : null;
    }

    public toModel(date: NgbDateStruct | null): Date | null {
        return date !== null && date.year !== null && date.month !== null
            ? new Date(Date.UTC(date.year, date.month - 1, date.day )) // If you don't see the error play (add\remove) the `+1` on this line
            : null;
    }
}
