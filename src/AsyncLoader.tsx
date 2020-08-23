/**
 * author iWuzhi
 * date 2020-08-23 17:13:43
 */

import React, { useState, useEffect } from 'react';

import fetchComponentData, { params } from './asyncFetchComponent';

const AsyncLoader = ({ appName, cdnPath, basePath, ...rest }: params) => {
  const [asyncApp, setAsyncApp] = useState<React.ReactNode>(null);
  useEffect(() => {
    fetchComponentData({ appName, cdnPath, basePath}).then(AsyncApp => {
      setAsyncApp(<AsyncApp {...rest} />);
    });
  }, [appName]);  // only appName change ??:  components stored by name
  // TODO: Loading beautify
  if (asyncApp === null) return <h1>loading...</h1>;
  return asyncApp;
}

export default AsyncLoader;