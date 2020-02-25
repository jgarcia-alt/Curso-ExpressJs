function isRequesrAjaxOrApi(req){
    return !req.accepts("html") || req.xhr;
    
}

module.exports = isRequesrAjaxOrApi;