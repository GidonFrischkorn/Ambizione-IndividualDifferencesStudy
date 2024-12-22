
// Import plugins to this file
import externalHtml from '@jspsych/plugin-external-html';

// Import functions
import { checkConsent, checkNotice, checkRandomID } from '../task-fun/checkFun';

/* informed consent */
export const consent_screen = {
type: externalHtml,
url: "assets/external-html/consent.html",
cont_btn: "agree",
check_fn: checkConsent,
data: { screenID: "consent" }
};


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
 *  A screen to display random ID for session 1 and session 2
 */

export const randomID_screen = {
    type: externalHtml,
    url: "assets/external-html/randomID.html",
    cont_btn: "next",
    check_fn: checkRandomID,
    execute_script: true,
    data: { screenID: "randomID"}
    };
 
