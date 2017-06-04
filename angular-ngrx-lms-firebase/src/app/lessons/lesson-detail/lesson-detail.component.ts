import { Lesson } from './../models/lesson';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';
import { LessonsService } from './../lessons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/reducers';
import * as actions from './../store/lessons.actions';
import * as lessons from './../store/lessons.reducer';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit, OnDestroy {

  lesson$: Observable<Lesson>;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    /*this.subscription = this.route.params.switchMap(params => {
      const lessonUrl = params['url'];
      return this.lessonsService.findLessonByUrl(lessonUrl);
    })
      .subscribe(lesson => this.lesson = lesson);*/

    this.subscription = this.route.params
      .map(params => params['url'])
      .do(url => this.store.dispatch(
          new actions.LessonSelectedAction({url})
      ))
      .subscribe();

      this.lesson$ = this.store.select(lessons.getSelectedLesson);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
