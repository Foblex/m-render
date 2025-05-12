import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { unregisterServiceWorkers } from './unregister-service-workers';

unregisterServiceWorkers()
  .then(hadServiceWorker => hadServiceWorker && location.reload());

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
// const JSON: IWalkthroughStep[] = [
//   {
//     tooltips: [ {
//       content: "Нажмите сюда, чтобы зарегистрироваться",
//       origin: {
//         selector: "h2",
//         position: {
//           x: "center",
//           y: "center",
//         }
//       }
//     } ],
//     animations: [
//       { type: "Translate", "source": "h1", "target": "h2", "duration": 800 },
//       { type: "Click", "target": "h2" },
//       { type: "Translate", "source": "h2", "target": "h1", "duration": 800 },
//       { type: "DragAndDrop", "source": "h1", "target": "h2", "duration": 800, "holdTime": 300 },
//     ]
//   },
//   {
//     tooltips: [ {
//       content: "Нажмите сюда, чтобы зарегистрироваться",
//       origin: {
//         selector: "h1",
//         position: {
//           x: "center",
//           y: "center",
//         }
//       }
//     } ],
//     animations: [
//       { type: "Translate", "source": "h2", "target": "h1", "duration": 800 },
//       { type: "Click", "target": "h1" }
//     ],
//     waitFor: {
//       type: "event",
//       event: "click",
//       selector: "h1",
//     }
//   },
//   // {
//   //   "id": "step-2",
//   //   "path": "/profile",
//   //   "origin": "h2",
//   //   "tooltip": {
//   //     "title": "Ваш Профиль",
//   //     "text": "Поздравляем! Это ваша страница профиля",
//   //     "position": "top"
//   //   },
//   //   "actions": [
//   //     { "type": "MoveCursor", "to": "h1", "duration": 800 },
//   //     { "type": "Click", "selector": "h2" }
//   //   ],
//   //   "advance": { "type": "auto", "delay": 2000 }
//   // }
// ];
