import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit{
  public hour: any;
  public min: any;
  public second: any;
  public ampm: string;
  public timeStart = true;

  private previousHour: any;
  private previousMin: any;
  private previousSecond: any;

  modifyTime() {
    this.previousHour = this.hour;
    this.previousMin = this.min;
    this.previousSecond = this.second;
    this.timeStart = false;
  }

  submitModification() {
    this.timeValidation();
    this.timeStart = true;
  }
  constructor() { }

  ngOnInit(): void {
    const date = new Date();
    this.updateDate(date);
    setInterval(() => {
      if (this.timeStart) {
        this.plusOneSecond();
      }
    }, 1000);
  }
  private updateDate(date: Date) {
    const hours = date.getHours();
    this.ampm = hours >= 12 ? 'PM' : 'AM';

    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;

    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;

    const minutes = date.getMinutes();
    this.min = minutes;

    const seconds = date.getSeconds();
    this.second = seconds;

  }

  private plusOneSecond() {
    const newSecond = this.second + 1;
    this.second = newSecond >= 60 ? newSecond % 60 : newSecond;

    const newMin = newSecond >= 60 ? this.min + 1 : this.min;
    this.min = newMin >= 60 ? newMin % 60 : newMin;

    const newHour = newMin >= 60 ? this.hour + 1 : this.hour;

    if (newHour === 12 && newMin === 60 && newSecond === 60) {
      this.reverseState();
    }
    this.hour = newHour % 12;
    this.hour = this.hour ? this.hour : 12;
  }
  private reverseState() {
    // tslint:disable-next-line:triple-equals
    this.ampm = this.ampm == 'PM' ? 'AM' : 'PM';
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }
  private timeValidation() {
    if (this.hour > 12 || this.min >= 60 || this.second >= 60) {
      this.hour = this.previousHour;
      this.min = this.previousMin;
      this.second = this.previousSecond;
    }
  }
}
