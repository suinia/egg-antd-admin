import fetch from 'dva/fetch';
import { notification } from 'antd';

function checkJson(resp: Response) {
  if (!resp.ok) {
    if ([500, 502].includes(resp.status)) {
      notification.error({
        message: '系统故障，请稍候重试'
      });
    } else if (resp.status === 404) {
      notification.error({
        message: '系统正在维护中，请稍候重试'
      });
    }
    return Promise.reject({
      url: resp.url,
      code: resp.status,
      message: resp.statusText
    });
  }
  const json = resp.json().catch(_err => {
    return Promise.reject({
      url: resp.url,
      code: 500,
      message: 'json format error'
    });
  });

  return Promise.resolve(json).then(body => {
    const { state, data } = body;
    if (state.code !== 200 && state.code !== undefined) {
      const error = {
        url: resp.url,
        code: state.code,
        message: state.msg || '未知错误',
        data
      };
      return Promise.reject(error);
    }
    return Promise.resolve(body.data);
  });
}

export default function request(url: string, options?: any) {
  const deafultOpts: any = {
    method: 'post',
    credentials: 'include'
  };
  const newOptions = { ...deafultOpts, ...options };
  if (!(newOptions.body instanceof FormData)) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers
    };
    newOptions.body = JSON.stringify(newOptions.body);
  } else {
    newOptions.headers = {
      Accept: 'application/json',
      ...newOptions.headers
    };
  }
  let newUrl;
  // tslint:disable-next-line:prefer-conditional-expression
  if (/^http(s?):\/\//.test(url)) {
    newUrl = url;
  } else {
    newUrl = `${window.__CONFIG__.APIHOST}${url}`;
  }
  return fetch(newUrl, newOptions).then((response: any) => {
    return checkJson(response);
  });
}
