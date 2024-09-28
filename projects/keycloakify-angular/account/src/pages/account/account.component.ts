import { NgClass } from '@angular/common';
import { Component, forwardRef, inject } from '@angular/core';
import { CLASSES, KC_CONTEXT, USE_DEFAULT_CSS } from 'keycloakify-angular';
import { ClassKey } from 'keycloakify/account';
import { KcContext } from 'keycloakify/account/KcContext';
import { ComponentReference } from '../../classes/component-reference.class';
import { TemplateComponent } from '../../containers/template.component';
import { KcClassDirective } from '../../directives';
import { MsgStrPipe } from '../../pipes';

@Component({
  standalone: true,
  imports: [KcClassDirective, TemplateComponent, MsgStrPipe, NgClass],
  selector: 'kc-root',
  templateUrl: 'account.component.html',
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => AccountComponent),
    },
  ],
})
export class AccountComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'account.ftl' }>>(KC_CONTEXT);
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(CLASSES);
  override additionalClasses: Partial<Record<ClassKey, string>> = {
    kcBodyClass: `${this.classes?.kcBodyClass} user`,
  };
}
