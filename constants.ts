
import data from './content.json' with { type: 'json' };

/**
 * MASTER CONTENT SOURCE
 * All site data is derived from the exported CONTENT object.
 * To update the site, edit content.json.
 */
export const CONTENT = data;
export const PROJECTS = data.projects;
export const EXPERIENCES = data.experience;
export const NAV_LINKS = data.navigation;
export const SITE_INFO = data.site_info;

// Global easing for high-fidelity motion (easeOutExpo)
export const EASING = [0.16, 1, 0.3, 1];
