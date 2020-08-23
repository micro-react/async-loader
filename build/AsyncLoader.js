/**
 * author iWuzhi
 * date 2020-08-23 17:13:43
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect } from 'react';
import fetchComponentData from './asyncFetchComponent';
const AsyncLoader = (_a) => {
    var { appName, cdnPath, basePath } = _a, rest = __rest(_a, ["appName", "cdnPath", "basePath"]);
    const [asyncApp, setAsyncApp] = useState(null);
    useEffect(() => {
        fetchComponentData({ appName, cdnPath, basePath }).then(AsyncApp => {
            setAsyncApp(React.createElement(AsyncApp, Object.assign({}, rest)));
        });
    }, [appName]); // only appName change ??:  components stored by name
    // TODO: Loading beautify
    if (asyncApp === null)
        return React.createElement("h1", null, "loading...");
    return asyncApp;
};
export default AsyncLoader;
