/**
 * author iWuzhi
 * date 2020-08-23 09:21:34
 */


interface keyValLike {
  [key: string]: any
}
/**
 * 每个独立的包都设置了libraryTarget=window
 * 每个APP会被首先挂在到window上
 */
declare global {
  interface Window {
    [key: string]: any
  }
}

const loading_list: keyValLike = {};

const components: keyValLike = {};

export interface params {
  appName: string,  // required for semantic && store key
  cdnPath: string,  // relative path
  basePath?: string,
}

const fetchComponentData = async ({
  appName,
  cdnPath,
  basePath
}: params) => {
  if (components[appName]) return Promise.resolve(components[appName].default);
  if (loading_list[appName]) return Promise.resolve(loading_list[appName]);
  const ps = new Promise((resolve, reject) => {
    const scriptTag = document.createElement('script');
    let srcURL = cdnPath;
    /**
     * TODO: Slash 处理
     * 先尾加/ 首不加/规则处理
     */
    if (basePath) srcURL = basePath + srcURL;  
    scriptTag.src = srcURL;
    document.body.appendChild(scriptTag);
    scriptTag.onload = () => {
      components[appName] = window[appName].default;
      delete window[appName];  // 不要直接挂载到window上
      resolve(components[appName]);
      delete loading_list[appName];
    }
    scriptTag.onerror = (err) => {
      // TODO: Error Handle
      console.error(err);
      reject(err);
      delete loading_list[appName];
    }
  });
  loading_list[appName] = ps;
  return ps;
}

export default fetchComponentData;