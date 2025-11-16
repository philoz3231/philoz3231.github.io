import { basic, initSidebar, initTopbar } from './modules/layouts';
import {
  loadImg,
  imgPopup,
  initClipboard,
  loadMermaid,
  initCompareTool
} from './modules/components';

loadImg();
imgPopup();
initSidebar();
initTopbar();
initClipboard();
loadMermaid();
initCompareTool();
basic();
