document.documentElement.className = 'js';


var et_site_url = 'https://dentalwings.com';
var et_post_id = '227';
function et_core_page_resource_fallback(a, b) {
    "undefined" === typeof b && (b = a.sheet.cssRules && 0 === a.sheet.cssRules.length); b && (a.onerror = null, a.onload = null, a.href ? a.href = et_site_url + "/?et_core_page_resource=" + a.id + et_post_id : a.src && (a.src = et_site_url + "/?et_core_page_resource=" + a.id + et_post_id))
}