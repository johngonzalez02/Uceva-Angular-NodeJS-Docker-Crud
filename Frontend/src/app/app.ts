import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './modules/shared/components/navbar/navbar';
import { NavbarItem } from './modules/shared/interfaces/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
})
export class App {
  navbarItems: NavbarItem[] = [
    { title: 'Students', url: '/students' },
  ];
}
