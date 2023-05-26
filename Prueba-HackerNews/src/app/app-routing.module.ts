import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { CommentsComponent } from './comments/comments.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [{ path: 'top', component: ArticlesComponent },{ path: '', component: ArticlesComponent },
{ path: 'story/:id', component: CommentsComponent },{ path: '**', pathMatch: 'full', 
component: PagenotfoundComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
