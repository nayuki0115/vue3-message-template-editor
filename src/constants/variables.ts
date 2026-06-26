import type { VariableKey } from '../types/variable'

interface SupportedVariable {
  key: VariableKey
  variableName: string
  template: `{{ ${string} }}`
  mockValue: string
}

export const supportedVariables = [
  {
    key: 'customerName',
    variableName: 'customer_name',
    template: '{{ customer_name }}',
    mockValue: 'Alex',
  },
  {
    key: 'orderId',
    variableName: 'order_id',
    template: '{{ order_id }}',
    mockValue: 'A1024',
  },
  {
    key: 'shopName',
    variableName: 'shop_name',
    template: '{{ shop_name }}',
    mockValue: 'Crystal Studio',
  },
] as const satisfies readonly SupportedVariable[]
