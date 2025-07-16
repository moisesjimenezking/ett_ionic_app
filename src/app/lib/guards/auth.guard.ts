import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";


export const authGuard: CanActivateFn = () => {
    const token = localStorage.getItem('token');
    const accountType = localStorage.getItem('accountType');
    const router = inject(Router);

    if (token) {
        const tab = accountType == 'COMPANY' ? '/bottom-tab-bar-company' : '/bottom-tab-bar';
        return router.createUrlTree([`${tab}/home`]);
    }

    return true;
}