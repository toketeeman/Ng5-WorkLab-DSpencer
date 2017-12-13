import { enableProdMode } from '@angular/core';
export { AppServerModule } from './app/app.server.module';    // An import-then-export here.
                                                              // Thus, essentially a "bootstrap'."
                                                              // (Compare to main.ts .)

enableProdMode();