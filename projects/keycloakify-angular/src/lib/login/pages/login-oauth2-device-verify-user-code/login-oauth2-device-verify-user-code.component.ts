import { ChangeDetectionStrategy, Component, forwardRef, inject, input } from '@angular/core';
import { ClassKey } from 'keycloakify/login';
import { KcContext } from 'keycloakify/login/KcContext';
import { ComponentReference } from '../../classes/component-reference.class';
import { KC_CONTEXT } from '../../providers/keycloakify-angular.providers';

@Component({
  standalone: true,
  imports: [],
  selector: 'kc-root',
  templateUrl: 'login-oauth2-device-verify-user-code.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => LoginOauth2DeviceVerifyUserCodeComponent),
    },
  ],
})
export class LoginOauth2DeviceVerifyUserCodeComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'login-oauth2-device-verify-user-code.ftl' }>>(KC_CONTEXT);
  override doUseDefaultCss = input<boolean>();
  override classes = input<Partial<Record<ClassKey, string>>>();
}
