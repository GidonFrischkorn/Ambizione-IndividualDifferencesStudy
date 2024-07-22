
// Import plugins to this file
import externalHtml from '@jspsych/plugin-external-html';

// Import functions
import { checkNotice, checkInputID } from '../task-fun/checkFun';

/**
 *  A notice screen, including several items that participants need to be noticed if they do the experiment online.
 */
export const notice_screen = {
type: externalHtml,
url: "assets/external-html/notice.html",
cont_btn: "ready",
check_fn: checkNotice,
data: { screenID: "notice"}
};

/**
 *  A screen to input random ID for session 1 and session 2
 */
export const inputID_screen = {
    type: externalHtml,
    url: "assets/external-html/inputID.html",
    cont_btn: "next",
    check_fn: checkInputID,
    data: { screenID: "inputID"}
    };
 
