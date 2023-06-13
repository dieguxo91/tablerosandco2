import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {StorageService} from "./Storage.service";

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  if (!storageService.isLoggedIn()) {
    router.navigateByUrl('/inicio').then();
    return false;
  } else {
    return true;
  }
}
