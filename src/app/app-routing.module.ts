import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipesRoutingModule} from "./recipes/recipes-routing.module";
import {AuthModule} from "./auth/auth.module";

const appRoutes: Routes = [
  {path:'', redirectTo:'/recipes', pathMatch:'full'},
  {path:'shopping-list', component:ShoppingListComponent},
  {path:'**', redirectTo: '/recipes'}
];

@NgModule({
  imports:[
    RecipesRoutingModule,
    AuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})

export class AppRoutingModule {}
