import React from "react"
import { CSSProp } from "styled-components"

declare module "react" {
  interface Attributes {
    name?: string
    css?: CSSProp
    id?: string
    style?: React.CSSProperties
  }
}
