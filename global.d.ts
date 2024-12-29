/// <reference types="next-intl/typings" />

type Messages = typeof import('./messages/en.json')
declare interface IntlMessages extends Messages {}

