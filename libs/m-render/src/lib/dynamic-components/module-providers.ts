import { DynamicComponentsStore, PreviewGroupService, RenderDynamicComponent, RenderExternalComponent,
  RenderInternalComponents
} from '@foblex/m-render';

export const DYNAMIC_COMPONENTS_MODULE_PROVIDERS = [
  DynamicComponentsStore,

  PreviewGroupService,

  RenderDynamicComponent,

  RenderExternalComponent,

  RenderInternalComponents,
];
