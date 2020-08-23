/**
 * author iWuzhi
 * date 2020-08-23 09:21:34
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loading_list = {};
const components = {};
const fetchComponentData = ({ appName, cdnPath, basePath }) => __awaiter(void 0, void 0, void 0, function* () {
    if (components[appName])
        return Promise.resolve(components[appName].default);
    if (loading_list[appName])
        return Promise.resolve(loading_list[appName]);
    const ps = new Promise((resolve, reject) => {
        const scriptTag = document.createElement('script');
        let srcURL = cdnPath;
        /**
         * TODO: Slash 处理
         * 先尾加/ 首不加/规则处理
         */
        if (basePath)
            srcURL = basePath + srcURL;
        scriptTag.src = srcURL;
        document.body.appendChild(scriptTag);
        scriptTag.onload = () => {
            components[appName] = window[appName].default;
            delete window[appName]; // 不要直接挂载到window上
            resolve(components[appName]);
            delete loading_list[appName];
        };
        scriptTag.onerror = (err) => {
            // TODO: Error Handle
            console.error(err);
            reject(err);
            delete loading_list[appName];
        };
    });
    loading_list[appName] = ps;
    return ps;
});
export default fetchComponentData;
