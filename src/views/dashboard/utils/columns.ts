import type { Ref } from 'vue'
import { h } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import type { RequestConfigures } from '@/types/request.ts'
import type { ITableColumn } from '@/components/ui/table'

export const normalDataTypes = [
  'string',
  'number',
  'boolean',
  'array',
  'object',
]

export function onCreateClick(
  refList: Ref<RequestConfigures> | RequestConfigures,
  getParams?: () => Record<string, any>,
) {
  return () => {
    unref(refList).push({
      key: '',
      value: '',
      enable: true,
      ...getParams?.(),
    })
  }
}

export function onRemoveClick(
  refList: Ref<RequestConfigures> | RequestConfigures,
) {
  return (idx: number) => {
    unref(refList).splice(idx, 1)
  }
}

export function getEnableColumn(
  refList: Ref<RequestConfigures> | RequestConfigures,
  type: 'checkbox' | 'switch' = 'checkbox',
): ITableColumn {
  const checkedAll = shallowRef(false)

  const column: ITableColumn = {
    title: '',
    field: 'enable',
    width: 40,
    headClass: 'text-center',
    cellClass: 'text-center',
    renderHead: () => h(type === 'switch' ? Switch : Checkbox, {
      'checked': checkedAll.value,
      'onUpdate:checked': function (value) {
        checkedAll.value = value

        unref(refList).forEach((item) => {
          item.enable = value
        })
      },
    }),
  }

  if (type === 'checkbox') {
    column.renderCell = ({ row }) => h(Checkbox, {
      'checked': row.enable,
      'onUpdate:checked': (value: boolean) => {
        row.enable = value
      },
    })
  } else if (type === 'switch') {
    column.width = 75
    column.title = 'Enable'
    column.renderCell = ({ row }) => h(Switch, {
      'checked': row.enable,
      'title': 'Non-enabled header do not appear in the table.',
      'onUpdate:checked': (value) => {
        row.enable = value
      },
    })
  }

  return column
}

export function getPrimaryKeyColumn(
  getAttrs?: (row: any, idx: number) => Record<string, any>,
): ITableColumn {
  return {
    title: 'Key',
    field: 'key',
    renderCell: ({ row, idx }) => h(Input, {
      ...getAttrs?.(row, idx),
      'name': String(Math.random()),
      'class': row.enable ? '' : 'opacity-50',
      'modelValue': row.key,
      'onUpdate:modelValue': (value) => {
        row.key = value
      },
    }),
  }
}

export function getRowValueColumn(
  getAttrs?: (row: any, idx: number) => Record<string, any>,
): ITableColumn {
  return {
    title: 'Value',
    field: 'value',
    renderCell: ({ row, idx }) => h(Input, {
      ...getAttrs?.(row, idx),
      'name': String(Math.random()),
      'type': row.dataType === 'file' ? 'file' : 'text',
      'class': row.enable ? '' : 'opacity-50',
      'modelValue': row.value,
      'onUpdate:modelValue': (value) => {
        row.value = value
      },
    }),
  }
}

export function getOperateColumn(
  onCreate: () => void,
  onRemove: (idx: number) => void,
): ITableColumn {
  return {
    title: '',
    field: 'operate',
    width: 50,
    headClass: 'text-center',
    cellClass: 'text-center',
    renderHead: () => h(Button, {
      variant: 'outline',
      class: 'size-7 p-1',
      onClick: onCreate,
    }, () => [h('i', { class: 'i-ph-plus-bold' })]),
    renderCell: ({ idx }) => h(Button, {
      variant: 'destructive',
      class: 'size-7 p-1',
      onClick: () => {
        onRemove(idx)
      },
    }, () => [h('i', { class: 'i-carbon-trash-can' })]),
  }
}

export function getDataTypeColumn(dataTypes: string[]): ITableColumn {
  return {
    title: 'Type',
    field: 'dataType',
    width: 110,
    renderCell: ({ row }) => h(Select, {
      'name': String(Math.random()),
      'readonly': !row.isCustom,
      'class': row.enable ? '' : 'opacity-50',
      'defaultValue': 'string',
      'modelValue': row.dataType,
      'onUpdate:modelValue': (value) => {
        row.dataType = value
      },
    }, () => [
      h(SelectTrigger, { class: 'capitalize' }, () => [h(SelectValue)]),
      h(SelectContent, null, () => dataTypes!.map(type => h(SelectItem, { class: 'capitalize', label: type, value: type }))),
    ]),
  }
}
