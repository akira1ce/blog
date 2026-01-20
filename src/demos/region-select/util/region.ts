import PCA_CODE from '../constant/pca-code.json';

/**
 * 根据行政区划代码获取省市区信息
 * @param code 6位行政区划代码，如 110101
 * @returns 省市区信息对象，未找到返回 null
 */
export function getRegionByCode(code: string) {
  if (!code || code.length !== 6) {
    return null;
  }

  const provinceCode = code.substring(0, 2);
  const cityCode = code.substring(0, 4);
  const districtCode = code;

  return {
    province: PCA_CODE[provinceCode as keyof typeof PCA_CODE],
    city: PCA_CODE[cityCode as keyof typeof PCA_CODE],
    district: PCA_CODE[districtCode as keyof typeof PCA_CODE],
  };
}

/**
 * 根据行政区划代码获取完整路径字符串
 * @param code 6位行政区划代码
 * @param separator 分隔符，默认为 ' '
 */
export function getRegionPath(code: string, separator: string = ' ') {
  const region = getRegionByCode(code);
  if (!region) return '';

  return [region.province, region.city, region.district].filter(Boolean).join(separator);
}
