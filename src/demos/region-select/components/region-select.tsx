'use client';

import PCA from '../constant/pca.json';
import { useControl } from '@akira1ce/r-hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
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

/**
 * 地区选择器组件
 * 支持省市区三级联动，可配置显示层级和详细地址输入
 * 适配 Form 的受控组件规范
 */
export const RegionSelect: React.FC<RegionSelectProps> = props => {
  const { disabled, level = 3, showDetail = false } = props;

  const [value, setValue] = useControl(props);

  const { province, city, district, detail } = value || {};

  const handleChangeValue = (val: Partial<RegionValue>) => {
    setValue(prev => ({ ...prev, ...val }));
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
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 w-full">
        {/* 省份选择 */}
        {level >= 1 && (
          <Select
            value={province}
            onValueChange={val =>
              handleChangeValue({ province: val, city: undefined, district: undefined })
            }
            disabled={disabled}
          >
            <SelectTrigger className="flex-1 min-w-0">
              <SelectValue placeholder="请选择省份" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map(p => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* 城市选择 */}
        {level >= 2 && (
          <Select
            value={city}
            onValueChange={val => handleChangeValue({ city: val, district: undefined })}
            disabled={disabled || !cities.length}
          >
            <SelectTrigger className="flex-1 min-w-0">
              <SelectValue placeholder="请选择城市" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(c => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* 区县选择 */}
        {level >= 3 && (
          <Select
            value={district}
            onValueChange={val => handleChangeValue({ district: val })}
            disabled={disabled || !districts.length}
          >
            <SelectTrigger className="flex-1 min-w-0">
              <SelectValue placeholder="请选择区县" />
            </SelectTrigger>
            <SelectContent>
              {districts.map(d => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* 详细地址输入 */}
      {showDetail && (
        <Input
          value={detail}
          onChange={e => handleChangeValue({ detail: e.target.value })}
          placeholder="请输入详细地址"
          disabled={disabled}
        />
      )}
    </div>
  );
};
