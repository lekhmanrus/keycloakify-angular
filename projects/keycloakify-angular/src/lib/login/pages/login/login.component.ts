import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, inject, input, signal } from '@angular/core';
import { ClassKey } from 'keycloakify/login';
import { KcContext } from 'keycloakify/login/KcContext';
import { ComponentReference } from '../../classes/component-reference.class';
import {
  KcInputDirective,
  PasswordWrapperComponent,
} from '../../components/password-wrapper/password-wrapper.component';
import { TemplateComponent } from '../../containers/template.component';
import { KcClassDirective } from '../../directives/kc-class.directive';
import { KcSanitizePipe } from '../../pipes/kc-sanitize.pipe';
import { MsgStrPipe } from '../../pipes/msg-str.pipe';
import { KC_CONTEXT } from '../../providers/keycloakify-angular.providers';

@Component({
  selector: 'kc-root',
  templateUrl: './login.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KcClassDirective,
    AsyncPipe,
    KcSanitizePipe,
    PasswordWrapperComponent,
    NgClass,
    TemplateComponent,
    KcInputDirective,
    MsgStrPipe,
  ],
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => LoginComponent),
    },
  ],
})
export class LoginComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'login.ftl' }>>(KC_CONTEXT);
  displayRequiredFields = input(false);
  documentTitle = input<string>();
  bodyClassName = input<string>();
  override doUseDefaultCss = input<boolean>();
  override classes = input<Partial<Record<ClassKey, string>>>();
  isLoginButtonDisabled = signal(false);
  displayInfo: boolean =
    !!this.kcContext?.realm?.password &&
    !!this.kcContext?.realm?.registrationAllowed &&
    !this.kcContext?.registrationDisabled;
  displayMessage: boolean = !this.kcContext?.messagesPerField?.existsError('username', 'password');
}
