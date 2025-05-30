import { CalculateHashFromScrollPositionAndActivateTocHandler } from './calculate-hash-from-scroll-position-and-activate-toc';
import { GetAbsoluteTopToContainerHandler } from './get-absolute-top-to-container';
import { ScrollToElementInContainerHandler } from './scroll-to-element-in-container';
import { CalculateTableOfContentDataHandler } from './calculate-table-of-content-data';
import { ActivateTocByHashHandler } from './activate-toc-by-hash';
import { RenderDynamicComponentsHandler } from './render-dynamic-components';

export const SCROLLABLE_CONTAINER_FEATURES = [

  ActivateTocByHashHandler,

  CalculateHashFromScrollPositionAndActivateTocHandler,

  GetAbsoluteTopToContainerHandler,

  CalculateTableOfContentDataHandler,

  RenderDynamicComponentsHandler,

  ScrollToElementInContainerHandler,
];
