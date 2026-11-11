'use client';

import PCA from '../constant/pca.json';
import { useControl } from '@akira1ce/r-hooks';
import React, { useMemo } from 'react';

export interface RegionValue {
  /** 省 */
  province?: string;
  /** 市 */
  city?: string;
  /** 区 */
  district?: string;
  /** 详细地址 */
  detail?: string;
}

/**
 * 地区选择器组件的属性
 */
interface RegionSelectProps {
  /** 当前值 */
  value?: RegionValue;
  /** 值变化回调 */
  onChange?: (value: RegionValue) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 显示的层级，默认 3 */
  level?: number;
  /** 是否显示详细地址输入框 */
  showDetail?: boolean;
}

const selectCls =
  'surface-border bg-card text-fore min-w-0 flex-1 border border-solid px-2 py-1 text-sm disabled:opacity-50';
const inputCls =
  'surface-border bg-card text-fore w-full border border-solid px-2 py-1 text-sm disabled:opacity-50';

/**
 * 地区选择器组件
 * 支持省市区三级联动，可配置显示层级和详细地址输入
 * 适配 Form 的受控组件规范
 */
export const RegionSelect: React.FC<RegionSelectProps> = (props) => {
  const { disabled, level = 3, showDetail = false } = props;

  const [value, setValue] = useControl(props);

  const { province, city, district, detail } = value || {};

  const handleChangeValue = (val: Partial<RegionValue>) => {
    setValue((prev) => ({ ...prev, ...val }));
  };

  /* 省列表 */
  const provinces = useMemo(() => {
    return Object.keys(PCA);
  }, []);

  /* 市列表 */
  const cities = useMemo(() => {
    if (!province) return [];
    return Object.keys(PCA[province] || {});
  }, [province]);

  /* 区列表 */
  const districts = useMemo(() => {
    if (!province || !city) return [];
    return PCA[province]?.[city] || [];
  }, [province, city]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full gap-2">
        {/* 省份选择 */}
        {level >= 1 && (
          <select
            className={selectCls}
            value={province || ''}
            onChange={(e) =>
              handleChangeValue({
                province: e.target.value || undefined,
                city: undefined,
                district: undefined,
              })
            }
            disabled={disabled}
          >
            <option value="">请选择省份</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        )}

        {/* 城市选择 */}
        {level >= 2 && (
          <select
            className={selectCls}
            value={city || ''}
            onChange={(e) =>
              handleChangeValue({ city: e.target.value || undefined, district: undefined })
            }
            disabled={disabled || !cities.length}
          >
            <option value="">请选择城市</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}

        {/* 区县选择 */}
        {level >= 3 && (
          <select
            className={selectCls}
            value={district || ''}
            onChange={(e) => handleChangeValue({ district: e.target.value || undefined })}
            disabled={disabled || !districts.length}
          >
            <option value="">请选择区县</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* 详细地址输入 */}
      {showDetail && (
        <input
          className={inputCls}
          value={detail || ''}
          onChange={(e) => handleChangeValue({ detail: e.target.value || undefined })}
          placeholder="请输入详细地址"
          disabled={disabled}
        />
      )}
    </div>
  );
};
