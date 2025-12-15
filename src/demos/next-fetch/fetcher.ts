// @ts-nocheck

import { saveAs } from 'file-saver';
import qs from 'qs';
import { isBlobResponse, isBrowser, parseFilenameFromHeaders } from './utils';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type RequestOptions = Omit<RequestInit, 'method' | 'body'>;

interface RequestProps {
  url: string;
  method: Method;
  params?: any;
  options?: RequestOptions;
}

interface DownloadPostOptions extends RequestOptions {
  filename?: string;
  method?: Method;
}

/**
 * 请求拦截器
 */
function interceptorsRequest({ url, method, params, options }: RequestProps) {
  let finalUrl = url;
  let payload: BodyInit | undefined = undefined;

  const headers: HeadersInit = {
    ...(options?.headers || {}),
  };

  const isGetLike = method === 'GET' || method === 'DELETE';
  const isFormData =
    params &&
    (Object.prototype.toString.call(params) === '[object FormData]' ||
      Object.prototype.toString.call(params) === '[object URLSearchParams]');

  // 处理 GET/DELETE Query 拼接
  if (isGetLike && params && Object.keys(params).length > 0) {
    finalUrl +=
      (finalUrl.includes('?') ? '&' : '?') + qs.stringify(params, { arrayFormat: 'indices' });
  } else if (params !== undefined && params !== null) {
    // 非 GET/DELETE，处理请求体
    if (isFormData) {
      payload = params;
      // 不设置 Content-Type, 让浏览器自动推断，避免边界问题
    } else {
      headers['Content-Type'] = 'application/json';
      payload = JSON.stringify(params);
    }
  }

  return {
    url: finalUrl,
    options: {
      ...options,
      method,
      body: isGetLike ? undefined : payload,
      headers,
    } as RequestInit,
  };
}

/**
 * 响应拦截器
 */
async function interceptorsResponse<T>(res: Response): Promise<T> {
  const requestUrl = res.url;

  // 判断返回是不是 blob
  const contentType = res.headers.get('content-type') || '';
  const isBlob = isBlobResponse(contentType);

  // 如果是 blob 类型，直接返回 blob，避免重复读取响应
  if (isBlob) {
    return (await res.blob()) as T;
  }

  // 非 blob 类型，读取文本内容用于 JSON 解析或错误处理
  const text = await res.text();

  if (res.ok) {
    try {
      const response = JSON.parse(text);

      if (response.code === 401) {
        throw new Error('未授权，请先登录');
      }

      return response as T;
    } catch (err) {
      console.error('akira.err', err);
      // 如果不是有效的 JSON，返回原始文本
      return text as T;
    }
  }

  // 处理错误响应
  try {
    const errorData = JSON.parse(text);
    throw {
      message: errorData?.message || errorData || '接口错误',
      url: requestUrl,
      status: res.status,
    };
  } catch {
    throw { message: text || '接口错误', url: requestUrl, status: res.status };
  }
}

/**
 * 主请求函数
 */
export async function request<T>({
  url = '',
  params = {},
  method,
  options,
}: RequestProps): Promise<T> {
  const req = interceptorsRequest({ url, method, params, options });
  const res = await fetch(req.url, req.options);
  return interceptorsResponse<T>(res);
}

export function get<T>(url: string, params?: any, options?: RequestOptions) {
  return request<T>({ url, method: 'GET', params, options });
}

export function post<T>(url: string, params?: any, options?: RequestOptions) {
  return request<T>({ url, method: 'POST', params, options });
}

export function put<T>(url: string, params?: any, options?: RequestOptions) {
  return request<T>({ url, method: 'PUT', params, options });
}

export function del<T>(url: string, params?: any, options?: RequestOptions) {
  return request<T>({ url, method: 'DELETE', params, options });
}

export function patch<T>(url: string, params?: any, options?: RequestOptions) {
  return request<T>({ url, method: 'PATCH', params, options });
}

export async function download(
  url: string,
  params?: any,
  options?: DownloadPostOptions,
): Promise<void> {
  if (!isBrowser) throw new Error('downloadPost 只能在浏览器环境中使用');

  const { method = 'POST', filename: defaultFilename = 'download' } = options || {};

  const req = interceptorsRequest({ url, method, params, options });
  const res = await fetch(req.url, req.options);

  // 检查响应状态
  if (!res.ok) {
    const text = await res.text();
    try {
      const errorData = JSON.parse(text);
      throw new Error(errorData?.message || errorData || '下载失败');
    } catch {
      throw new Error(text || '下载失败');
    }
  }
  // 获取 blob
  const blob = await res.blob();
  // 解析文件名
  const filename = parseFilenameFromHeaders(res.headers, defaultFilename);
  // 使用 file-saver 下载文件
  saveAs(blob, filename);
}
